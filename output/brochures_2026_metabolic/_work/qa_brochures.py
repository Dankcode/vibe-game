from __future__ import annotations

import json
import posixpath
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from zipfile import ZipFile

PML = "http://schemas.openxmlformats.org/presentationml/2006/main"
DML = "http://schemas.openxmlformats.org/drawingml/2006/main"
PKG_REL = "http://schemas.openxmlformats.org/package/2006/relationships"
NS = {"p": PML, "a": DML, "pr": PKG_REL}

ROOT = Path("/Users/lx/Documents/GitHub/vibe-game/output/brochures_2026_metabolic")
DECKS = {
    "dio": ROOT / "DIO_Obesity_Model/DIO_Obesity_2page_brochure.pptx",
    "cardio": ROOT
    / "Cardiovascular_Atherosclerosis_Model/ApoE_KO_Atherosclerosis_2page_brochure.pptx",
    "mash": ROOT / "MASH_GAN_Diet_Model/GAN_Diet_MASH_2page_brochure.pptx",
}


def rels_name(part: str) -> str:
    directory, filename = posixpath.split(part)
    return posixpath.join(directory, "_rels", filename + ".rels")


def inspect_deck(slug: str, deck_path: Path) -> dict:
    issues: list[str] = []
    with ZipFile(deck_path) as zf:
        names = set(zf.namelist())
        presentation = ET.fromstring(zf.read("ppt/presentation.xml"))
        size = presentation.find("p:sldSz", NS)
        emu = 914400
        width = round(int(size.attrib["cx"]) / emu, 4)
        height = round(int(size.attrib["cy"]) / emu, 4)
        if (width, height) != (7.5, 10.0):
            issues.append(f"unexpected slide size {width} x {height}")

        slide_names = sorted(
            (name for name in names if name.startswith("ppt/slides/slide") and name.endswith(".xml")),
            key=lambda value: int(Path(value).stem.removeprefix("slide")),
        )
        if len(slide_names) != 2:
            issues.append(f"expected 2 slides, found {len(slide_names)}")

        slide_checks = []
        for slide_name in slide_names:
            slide = ET.fromstring(zf.read(slide_name))
            ph_nodes = slide.findall(".//p:ph", NS)
            if ph_nodes:
                issues.append(f"{slide_name} contains {len(ph_nodes)} structural placeholders")

            pics = slide.findall(".//p:pic", NS)
            shapes = slide.findall(".//p:sp", NS)
            if len(pics) != 3:
                issues.append(f"{slide_name} expected 3 pictures, found {len(pics)}")

            rel_name = rels_name(slide_name)
            rel_root = ET.fromstring(zf.read(rel_name))
            rels = rel_root.findall(f"{{{PKG_REL}}}Relationship")
            note_targets = []
            missing_targets = []
            for rel in rels:
                target = posixpath.normpath(
                    posixpath.join(posixpath.dirname(slide_name), rel.attrib.get("Target", ""))
                ).lstrip("/")
                if rel.attrib.get("TargetMode") != "External" and target not in names:
                    missing_targets.append(target)
                if rel.attrib.get("Type", "").endswith("/notesSlide"):
                    note_targets.append(target)
            if missing_targets:
                issues.append(f"{slide_name} has missing relationship targets: {missing_targets}")
            if len(note_targets) != 1:
                issues.append(f"{slide_name} expected one notes slide, found {len(note_targets)}")
            else:
                note_root = ET.fromstring(zf.read(note_targets[0]))
                note_text = "\n".join(node.text or "" for node in note_root.findall(".//a:t", NS))
                if "[Sources]" not in note_text or "[/Sources]" not in note_text:
                    issues.append(f"{slide_name} is missing a complete [Sources] block")

            slide_checks.append(
                {
                    "slide_part": slide_name,
                    "pictures": len(pics),
                    "shapes": len(shapes),
                    "placeholders": len(ph_nodes),
                    "notes": len(note_targets),
                }
            )

    render_dir = ROOT / "_work/renders" / slug
    layout_checks = []
    for layout_path in sorted(render_dir.glob("slide-*.layout.json")):
        layout = json.loads(layout_path.read_text(encoding="utf-8"))
        for element in layout.get("elements", []):
            bbox = element.get("bbox")
            if bbox:
                x, y, w, h = bbox
                rotation = int(round(element.get("rotation", 0))) % 360
                if rotation in (90, 270):
                    center_x = x + w / 2
                    center_y = y + h / 2
                    visual_bbox = [
                        center_x - h / 2,
                        center_y - w / 2,
                        h,
                        w,
                    ]
                else:
                    visual_bbox = [x, y, w, h]
                vx, vy, vw, vh = visual_bbox
                if vx < -0.01 or vy < -0.01 or vx + vw > 720.01 or vy + vh > 960.01:
                    issues.append(
                        f"{layout_path.name}:{element.get('name')} is outside the slide after rotation: {visual_bbox}"
                    )
            text_layout = element.get("textLayout") or {}
            name = element.get("name") or ""
            if (name.startswith("title-") or name.startswith("study-banner-text-")) and (
                text_layout.get("lineCount") != 1
            ):
                issues.append(
                    f"{layout_path.name}:{name} wraps to {text_layout.get('lineCount')} lines"
                )
            if name.startswith("side-tab-text-") and text_layout.get("lineCount") != 1:
                issues.append(
                    f"{layout_path.name}:{name} wraps to {text_layout.get('lineCount')} lines"
                )
            if text_layout.get("overflow") or text_layout.get("clipped"):
                issues.append(f"{layout_path.name}:{name} reports text overflow/clipping")

        layout_checks.append(
            {
                "layout": layout_path.name,
                "elements": len(layout.get("elements", [])),
                "slide_frame": layout["slide"]["frame"],
            }
        )

    return {
        "deck": str(deck_path),
        "size_bytes": deck_path.stat().st_size,
        "issues": issues,
        "slide_checks": slide_checks,
        "layout_checks": layout_checks,
    }


def main() -> None:
    report = {slug: inspect_deck(slug, path) for slug, path in DECKS.items()}
    report["passed"] = all(not result["issues"] for result in report.values() if isinstance(result, dict))
    output = Path(sys.argv[1])
    output.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
