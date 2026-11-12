"""Build the Week 14 Packet, Persona, and Buildchat PDFs from Markdown."""

from __future__ import annotations

import html
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    Image,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf"
FONT = "/System/Library/Fonts/Supplemental/Arial.ttf"
BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
ITALIC = "/System/Library/Fonts/Supplemental/Arial Italic.ttf"

pdfmetrics.registerFont(TTFont("Course", FONT))
pdfmetrics.registerFont(TTFont("Course-Bold", BOLD))
pdfmetrics.registerFont(TTFont("Course-Italic", ITALIC))
pdfmetrics.registerFontFamily("Course", normal="Course", bold="Course-Bold", italic="Course-Italic")

NAVY = colors.HexColor("#102D3F")
TEAL = colors.HexColor("#147C75")
INK = colors.HexColor("#18252E")
MUTED = colors.HexColor("#526572")
LINE = colors.HexColor("#D9D5CC")
CREAM = colors.HexColor("#F7F2E8")
PALE_TEAL = colors.HexColor("#DFF1EB")
PALE_AMBER = colors.HexColor("#F7EAD4")


def normalize(value: str) -> str:
    return (value.replace("\u2011", "-").replace("\u2012", "-")
            .replace("\u2013", "-").replace("\u2014", "-")
            .replace("\u2212", "-").replace("\u00a0", " "))


def markup(value: str) -> str:
    value = html.escape(normalize(value), quote=False)
    value = re.sub(r"\[([^]]+)\]\((https?://[^)]+)\)", r'<link href="\2" color="#147C75"><u>\1</u></link>', value)
    value = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", value)
    value = re.sub(r"`([^`]+)`", r'<font name="Courier">\1</font>', value)
    return value


def styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("title", parent=base["Title"], fontName="Course-Bold", fontSize=20, leading=22, textColor=NAVY, spaceAfter=5),
        "deck": ParagraphStyle("deck", parent=base["Normal"], fontName="Course", fontSize=8.5, leading=10.5, textColor=MUTED, spaceAfter=10),
        "h2": ParagraphStyle("h2", parent=base["Heading2"], fontName="Course-Bold", fontSize=12, leading=14, textColor=TEAL, spaceBefore=9, spaceAfter=4, keepWithNext=True),
        "h3": ParagraphStyle("h3", parent=base["Heading3"], fontName="Course-Bold", fontSize=9.7, leading=11.5, textColor=NAVY, spaceBefore=6, spaceAfter=3, keepWithNext=True),
        "body": ParagraphStyle("body", parent=base["BodyText"], fontName="Course", fontSize=8.25, leading=10.6, textColor=INK, spaceAfter=4),
        "bullet": ParagraphStyle("bullet", parent=base["BodyText"], fontName="Course", fontSize=8.1, leading=10.3, textColor=INK, leftIndent=13, firstLineIndent=-7, bulletIndent=3, spaceAfter=2.5),
        "quote": ParagraphStyle("quote", parent=base["BodyText"], fontName="Course-Italic", fontSize=8.2, leading=10.7, textColor=NAVY, leftIndent=16, rightIndent=12, borderColor=TEAL, borderWidth=1.5, borderPadding=(6, 8, 6, 9), backColor=PALE_TEAL, spaceBefore=4, spaceAfter=7),
        "code": ParagraphStyle("code", parent=base["Code"], fontName="Courier", fontSize=6.4, leading=8, textColor=NAVY, backColor=CREAM, borderPadding=6, spaceAfter=6),
        "cell": ParagraphStyle("cell", parent=base["BodyText"], fontName="Course", fontSize=6.7, leading=8.2, textColor=INK),
        "cellhead": ParagraphStyle("cellhead", parent=base["BodyText"], fontName="Course-Bold", fontSize=6.7, leading=8.2, textColor=colors.white),
    }


def parse_markdown(path: Path, doc_styles: dict[str, ParagraphStyle]):
    lines = normalize(path.read_text(encoding="utf-8")).splitlines()
    story = []
    index = 0
    first_heading = True
    while index < len(lines):
        line = lines[index].rstrip()
        if not line:
            index += 1
            continue
        if line.startswith("```"):
            code = []
            index += 1
            while index < len(lines) and not lines[index].startswith("```"):
                code.append(lines[index])
                index += 1
            index += 1
            story.append(Paragraph(html.escape("\n".join(code)).replace("\n", "<br/>"), doc_styles["code"]))
            continue
        if line.startswith("!["):
            match = re.match(r"!\[([^]]*)\]\(([^)]+)\)", line)
            if match:
                image_path = (path.parent / match.group(2)).resolve()
                if image_path.exists():
                    image = Image(str(image_path))
                    max_width, max_height = 7.15 * inch, 4.55 * inch
                    scale = min(max_width / image.imageWidth, max_height / image.imageHeight)
                    image.drawWidth = image.imageWidth * scale
                    image.drawHeight = image.imageHeight * scale
                    image.hAlign = "CENTER"
                    story.extend([image, Spacer(1, 6)])
            index += 1
            continue
        if line.startswith("|"):
            rows = []
            while index < len(lines) and lines[index].startswith("|"):
                raw = [cell.strip() for cell in lines[index].strip("|").split("|")]
                if not all(re.fullmatch(r"[-: ]+", cell or "-") for cell in raw):
                    rows.append(raw)
                index += 1
            if rows:
                cols = max(len(row) for row in rows)
                data = []
                for row_index, row in enumerate(rows):
                    style = doc_styles["cellhead"] if row_index == 0 else doc_styles["cell"]
                    data.append([Paragraph(markup(cell), style) for cell in row + [""] * (cols - len(row))])
                table = Table(data, colWidths=[7.15 * inch / cols] * cols, repeatRows=1)
                table.setStyle(TableStyle([
                    ("BACKGROUND", (0, 0), (-1, 0), NAVY),
                    ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                    ("GRID", (0, 0), (-1, -1), .35, LINE),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 5), ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                    ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ]))
                story.extend([table, Spacer(1, 7)])
            continue
        if line.startswith("# "):
            if not first_heading:
                story.append(PageBreak())
            story.append(Paragraph(markup(line[2:]), doc_styles["title"]))
            first_heading = False
            index += 1
            continue
        if line.startswith("## "):
            story.append(Paragraph(markup(line[3:]), doc_styles["h2"]))
            index += 1
            continue
        if line.startswith("### "):
            story.append(Paragraph(markup(line[4:]), doc_styles["h3"]))
            index += 1
            continue
        if line.startswith("> "):
            quote = []
            while index < len(lines) and lines[index].startswith("> "):
                quote.append(lines[index][2:])
                index += 1
            story.append(Paragraph(markup(" ".join(quote)), doc_styles["quote"]))
            continue
        if re.match(r"^(?:[-*]|\d+\.) ", line):
            text = re.sub(r"^(?:[-*]|\d+\.) ", "", line)
            story.append(Paragraph(markup(text), doc_styles["bullet"], bulletText="-"))
            index += 1
            continue
        paragraph = [line]
        index += 1
        while index < len(lines) and lines[index].strip() and not re.match(r"^(#|>|```|!\[|\||[-*] |\d+\. )", lines[index]):
            paragraph.append(lines[index].strip())
            index += 1
        story.append(Paragraph(markup(" ".join(paragraph)), doc_styles["body"]))
    return story


def build(source: str, output: str, label: str) -> None:
    doc_styles = styles()
    source_path = ROOT / source
    output_path = OUT / output
    OUT.mkdir(parents=True, exist_ok=True)

    def footer(canvas, document):
        canvas.saveState()
        width, height = letter
        canvas.setFillColor(NAVY)
        canvas.rect(0, height - .17 * inch, width, .17 * inch, fill=1, stroke=0)
        canvas.setStrokeColor(LINE)
        canvas.line(.55 * inch, .45 * inch, width - .55 * inch, .45 * inch)
        canvas.setFont("Course", 6.8)
        canvas.setFillColor(MUTED)
        canvas.drawString(.55 * inch, .28 * inch, label)
        canvas.drawRightString(width - .55 * inch, .28 * inch, f"Page {document.page}")
        canvas.restoreState()

    document = SimpleDocTemplate(
        str(output_path), pagesize=letter, leftMargin=.58 * inch, rightMargin=.58 * inch,
        topMargin=.48 * inch, bottomMargin=.62 * inch, title=output_path.stem,
        author="David Buzali", subject="Primer Peldano Week 14 coursework",
    )
    document.build(parse_markdown(source_path, doc_styles), onFirstPage=footer, onLaterPages=footer)


if __name__ == "__main__":
    build("docs/PACKET.md", "PACKET_David_Buzali.pdf", "PRIMER PELDANO / WEEK 14 / PACKET")
    build("docs/PERSONA.md", "PERSONA_David_Buzali.pdf", "PRIMER PELDANO / WEEK 14 / PERSONA - INCOMPLETE")
    build("docs/BUILDCHAT.md", "BUILDCHAT_David_Buzali.pdf", "PRIMER PELDANO / WEEK 14 / BUILDCHAT")
    for output in ("PACKET_David_Buzali.pdf", "PERSONA_David_Buzali.pdf", "BUILDCHAT_David_Buzali.pdf"):
        print(OUT / output)
