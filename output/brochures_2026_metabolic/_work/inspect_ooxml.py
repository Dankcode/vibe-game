from __future__ import annotations

import json
import posixpath
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from zipfile import ZipFile

PML = "http://schemas.openxmlformats.org/presentationml/2006/main"
DML = "http://schemas.openxmlformats.org/drawingml/2006/main"
REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
PKG_REL = "http://schemas.openxmlformats.org/package/2006/relationships"

NS = {"p": PML, "a": DML, "r": REL, "pr": PKG_REL}
SELECTED = (11, 12, 28, 29, 31, 32)


def rels_name(part_name: str) -> str:
    directory, filename = posixpath.split(part_name)
    return posixpath.join(directory, "_rels", filename + ".rels")


def normalize_target(part_name: str, target: str) -> str:
    return posixpath.normpath(posixpath.join(posixpath.dirname(part_name), target))


def parse_rels(zf: ZipFile, part_name: str) -> dict[str, dict[str, str]]:
    name = rels_name(part_name)
    if name not in zf.namelist():
        return {}
    root = ET.fromstring(zf.read(name))
    result = {}
    for rel in root.findall(f"{{{PKG_REL}}}Relationship"):
        result[rel.attrib["Id"]] = {
            "type": rel.attrib.get("Type", ""),
            "target": normalize_target(part_name, rel.attrib.get("Target", "")),
        }
    return result


def shape_position(node: ET.Element) -> dict[str, float] | None:
    xfrm = node.find(".//a:xfrm", NS)
    if xfrm is None:
        xfrm = node.find(".//p:xfrm", NS)
    if xfrm is None:
        return None
    off = xfrm.find("a:off", NS)
    ext = xfrm.find("a:ext", NS)
    if off is None or ext is None:
        return None
    emu = 914400
    return {
        "x_in": round(int(off.attrib.get("x", 0)) / emu, 4),
        "y_in": round(int(off.attrib.get("y", 0)) / emu, 4),
        "w_in": round(int(ext.attrib.get("cx", 0)) / emu, 4),
        "h_in": round(int(ext.attrib.get("cy", 0)) / emu, 4),
    }


def inspect_slide(zf: ZipFile, slide_no: int) -> dict:
    part = f"ppt/slides/slide{slide_no}.xml"
    root = ET.fromstring(zf.read(part))
    rels = parse_rels(zf, part)
    texts = [node.text or "" for node in root.findall(".//a:t", NS)]

    pictures = []
    for pic in root.findall(".//p:pic", NS):
        c_nv_pr = pic.find("./p:nvPicPr/p:cNvPr", NS)
        blip = pic.find(".//a:blip", NS)
        rel_id = blip.attrib.get(f"{{{REL}}}embed", "") if blip is not None else ""
        rel = rels.get(rel_id, {})
        pictures.append(
            {
                "name": c_nv_pr.attrib.get("name", "") if c_nv_pr is not None else "",
                "description": c_nv_pr.attrib.get("descr", "") if c_nv_pr is not None else "",
                "relationship_id": rel_id,
                "target": rel.get("target", ""),
                "extension": Path(rel.get("target", "")).suffix.lower(),
                "position": shape_position(pic),
            }
        )

    shapes = []
    for shape in root.findall(".//p:sp", NS):
        c_nv_pr = shape.find("./p:nvSpPr/p:cNvPr", NS)
        shape_text = " ".join(node.text or "" for node in shape.findall(".//a:t", NS)).strip()
        shapes.append(
            {
                "name": c_nv_pr.attrib.get("name", "") if c_nv_pr is not None else "",
                "text": shape_text,
                "position": shape_position(shape),
            }
        )

    return {
        "slide": slide_no,
        "text": texts,
        "picture_count": len(pictures),
        "pictures": pictures,
        "shape_count": len(shapes),
        "shapes": shapes,
        "relationships": rels,
    }


def main() -> None:
    source = Path(sys.argv[1]).resolve()
    output = Path(sys.argv[2]).resolve()
    with ZipFile(source) as zf:
        presentation = ET.fromstring(zf.read("ppt/presentation.xml"))
        size = presentation.find("p:sldSz", NS)
        emu = 914400
        result = {
            "source": str(source),
            "slide_size_in": {
                "width": round(int(size.attrib["cx"]) / emu, 4),
                "height": round(int(size.attrib["cy"]) / emu, 4),
            },
            "selected_slides": [inspect_slide(zf, n) for n in SELECTED],
        }
    output.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(output)


if __name__ == "__main__":
    main()
