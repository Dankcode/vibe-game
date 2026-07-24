from __future__ import annotations

import sys
from pathlib import Path

from pypdf import PdfReader, PdfWriter


def main() -> None:
    source = Path(sys.argv[1])
    reader = PdfReader(source)
    for item in sys.argv[2:]:
        page_text, output_text = item.split(":", 1)
        page_number = int(page_text)
        output = Path(output_text)
        output.parent.mkdir(parents=True, exist_ok=True)
        writer = PdfWriter()
        writer.add_page(reader.pages[page_number - 1])
        with output.open("wb") as stream:
            writer.write(stream)
        print(output)


if __name__ == "__main__":
    main()
