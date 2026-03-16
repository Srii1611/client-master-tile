"""
Marketing Audit PDF Report Generator
Generates a professional, client-ready PDF marketing audit report.
Usage: python scripts/generate_pdf_report.py <data.json> <output.pdf>
"""

import json
import sys
import math
from datetime import datetime

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak, KeepTogether
)
from reportlab.graphics.shapes import Drawing, Circle, String, Rect, Line
from reportlab.graphics.charts.barcharts import HorizontalBarChart
from reportlab.graphics import renderPDF
from reportlab.platypus.flowables import Flowable

# ── Colour palette ────────────────────────────────────────────────────────────
C_NAVY   = colors.HexColor("#1B2A4A")
C_BLUE   = colors.HexColor("#2D5BFF")
C_ORANGE = colors.HexColor("#FF6B35")
C_GREEN  = colors.HexColor("#00C853")
C_AMBER  = colors.HexColor("#FFB300")
C_RED    = colors.HexColor("#FF1744")
C_LGRAY  = colors.HexColor("#F5F7FA")
C_BODY   = colors.HexColor("#2C3E50")
C_MUTED  = colors.HexColor("#7F8C9B")
C_BORDER = colors.HexColor("#E0E6ED")
C_WHITE  = colors.white

def score_color(s):
    if s >= 80: return C_GREEN
    if s >= 60: return C_BLUE
    if s >= 40: return C_AMBER
    return C_RED

def score_grade(s):
    if s >= 95: return "A+"
    if s >= 85: return "A"
    if s >= 80: return "A-"
    if s >= 77: return "B+"
    if s >= 70: return "B"
    if s >= 67: return "B-"
    if s >= 64: return "C+"
    if s >= 57: return "C"
    if s >= 54: return "C-"
    if s >= 50: return "D+"
    if s >= 40: return "D"
    return "F"

def score_label(s):
    if s >= 80: return "Strong"
    if s >= 60: return "Solid"
    if s >= 40: return "Needs Work"
    return "Critical"

# ── Score gauge flowable ──────────────────────────────────────────────────────
class ScoreGauge(Flowable):
    def __init__(self, score, size=160):
        super().__init__()
        self.score = score
        self.size  = size
        self.width  = size
        self.height = size

    def draw(self):
        s = self.score
        cx = self.size / 2
        cy = self.size / 2
        r  = self.size * 0.38

        # Background track arc (grey ring)
        d_bg = Drawing(self.size, self.size)
        for i in range(180):
            angle_deg = 225 - i * (270 / 180)
            angle_rad = math.radians(angle_deg)
            nx = cx + r * math.cos(angle_rad)
            ny = cy + r * math.sin(angle_rad)
            seg = Circle(nx, ny, self.size * 0.035)
            seg.fillColor = colors.HexColor("#DDE3ED")
            seg.strokeColor = None
            d_bg.add(seg)

        # Score arc
        filled = int(180 * s / 100)
        col = score_color(s)
        for i in range(filled):
            angle_deg = 225 - i * (270 / 180)
            angle_rad = math.radians(angle_deg)
            nx = cx + r * math.cos(angle_rad)
            ny = cy + r * math.sin(angle_rad)
            seg = Circle(nx, ny, self.size * 0.038)
            seg.fillColor = col
            seg.strokeColor = None
            d_bg.add(seg)

        # Centre white circle
        inner = Circle(cx, cy, r * 0.68)
        inner.fillColor = C_WHITE
        inner.strokeColor = None
        d_bg.add(inner)

        # Score number
        score_str = str(s)
        txt = String(cx, cy + self.size * 0.04, score_str,
                     fontName="Helvetica-Bold",
                     fontSize=self.size * 0.22,
                     fillColor=col,
                     textAnchor="middle")
        d_bg.add(txt)

        # "/100" label
        sub = String(cx, cy - self.size * 0.10, "/100",
                     fontName="Helvetica",
                     fontSize=self.size * 0.09,
                     fillColor=C_MUTED,
                     textAnchor="middle")
        d_bg.add(sub)

        # Grade label
        grade = score_grade(s)
        gtxt = String(cx, cy - self.size * 0.25, f"Grade: {grade}",
                      fontName="Helvetica-Bold",
                      fontSize=self.size * 0.095,
                      fillColor=col,
                      textAnchor="middle")
        d_bg.add(gtxt)

        renderPDF.draw(d_bg, self.canv, 0, 0)


# ── Bar chart for categories ──────────────────────────────────────────────────
def build_bar_chart(categories):
    names  = list(categories.keys())
    scores = [categories[n]["score"] for n in names]
    short  = [n.replace(" & ", " &\n").replace("Conversion Optimization","Conversion\nOptimization")
               .replace("Competitive Positioning","Competitive\nPositioning") for n in names]

    chart_w = 5.8 * inch
    chart_h = 2.6 * inch
    d = Drawing(chart_w + 1.5 * inch, chart_h + 0.4 * inch)

    bar = HorizontalBarChart()
    bar.x = 1.55 * inch
    bar.y = 0.15 * inch
    bar.width  = chart_w
    bar.height = chart_h
    bar.data   = [scores]
    bar.valueAxis.valueMin = 0
    bar.valueAxis.valueMax = 100
    bar.valueAxis.valueStep = 20
    bar.valueAxis.labels.fontName = "Helvetica"
    bar.valueAxis.labels.fontSize = 7
    bar.valueAxis.labels.fillColor = C_MUTED
    bar.categoryAxis.categoryNames = short
    bar.categoryAxis.labels.fontName = "Helvetica"
    bar.categoryAxis.labels.fontSize = 7.5
    bar.categoryAxis.labels.fillColor = C_BODY
    bar.categoryAxis.labels.dx = -4
    bar.categoryAxis.labels.textAnchor = "end"
    bar.categoryAxis.labels.maxWidth   = 1.3 * inch
    bar.categoryAxis.visibleTicks = False
    bar.categoryAxis.visibleAxis  = False
    bar.valueAxis.visibleGrid      = True
    bar.valueAxis.gridStrokeColor  = C_BORDER
    bar.valueAxis.gridStrokeWidth  = 0.5
    bar.bars[0].fillColor  = C_BLUE
    bar.bars[0].strokeColor = None

    # Colour each bar individually
    for i, sc in enumerate(scores):
        bar.bars[(0, i)].fillColor = score_color(sc)

    bar.barWidth = 0.55
    bar.groupSpacing = 0.3
    d.add(bar)
    return d


# ── Severity badge ────────────────────────────────────────────────────────────
SEV_COLOR = {
    "Critical": C_RED,
    "High":     C_ORANGE,
    "Medium":   C_AMBER,
    "Low":      C_BLUE,
}

# ── Page header/footer ────────────────────────────────────────────────────────
def _header_footer(canvas, doc):
    canvas.saveState()
    w, h = letter
    # Top bar
    canvas.setFillColor(C_NAVY)
    canvas.rect(0, h - 0.45 * inch, w, 0.45 * inch, fill=1, stroke=0)
    canvas.setFillColor(C_WHITE)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawString(0.4 * inch, h - 0.28 * inch, "MARKETING AUDIT REPORT")
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(w - 0.4 * inch, h - 0.28 * inch,
                           getattr(doc, '_brand', 'Brand'))
    # Footer
    canvas.setFillColor(C_LGRAY)
    canvas.rect(0, 0, w, 0.35 * inch, fill=1, stroke=0)
    canvas.setFillColor(C_MUTED)
    canvas.setFont("Helvetica", 7)
    canvas.drawString(0.4 * inch, 0.12 * inch,
                      "Generated by AI Marketing Suite · Claude Code")
    canvas.drawRightString(w - 0.4 * inch, 0.12 * inch,
                           f"Page {canvas.getPageNumber()}")
    canvas.restoreState()


# ── Main builder ──────────────────────────────────────────────────────────────
def build_pdf(data: dict, output_path: str):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=0.55 * inch,
        leftMargin=0.55 * inch,
        topMargin=0.65 * inch,
        bottomMargin=0.55 * inch,
    )
    doc._brand = data.get("brand_name", "Brand")

    styles = getSampleStyleSheet()
    base   = ParagraphStyle("base", fontName="Helvetica", fontSize=9,
                             leading=13, textColor=C_BODY)
    h1     = ParagraphStyle("h1", fontName="Helvetica-Bold", fontSize=18,
                             textColor=C_NAVY, leading=22, spaceAfter=4)
    h2     = ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=13,
                             textColor=C_NAVY, leading=17, spaceAfter=4,
                             spaceBefore=12)
    h3     = ParagraphStyle("h3", fontName="Helvetica-Bold", fontSize=10,
                             textColor=C_NAVY, leading=14, spaceAfter=2,
                             spaceBefore=8)
    muted  = ParagraphStyle("muted", fontName="Helvetica", fontSize=8,
                             textColor=C_MUTED, leading=11)
    bold9  = ParagraphStyle("bold9", fontName="Helvetica-Bold", fontSize=9,
                             textColor=C_BODY, leading=13)

    story = []

    # ─── COVER PAGE ──────────────────────────────────────────────────────────
    story.append(Spacer(1, 0.15 * inch))

    # Title block
    story.append(Paragraph("Marketing Audit Report", h1))
    story.append(Paragraph(
        f'<font color="#FF6B35"><b>{data.get("brand_name","Brand")}</b></font> · '
        f'<font color="#7F8C9B">{data.get("url","")}</font>', base))
    story.append(Paragraph(
        f'<font color="#7F8C9B">Generated: {data.get("date", datetime.today().strftime("%B %d, %Y"))}</font>',
        muted))
    story.append(HRFlowable(width="100%", thickness=1.5,
                            color=C_ORANGE, spaceAfter=12))

    # Gauge + summary side by side
    gauge_score = data.get("overall_score", 0)
    gauge = ScoreGauge(gauge_score, size=155)

    summary_text = data.get("executive_summary", "")
    summary_para = Paragraph(summary_text,
                             ParagraphStyle("sum", fontName="Helvetica",
                                            fontSize=9.5, leading=15,
                                            textColor=C_BODY))

    cover_table = Table(
        [[gauge, summary_para]],
        colWidths=[1.85 * inch, 5.4 * inch],
    )
    cover_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING",  (0, 0), (0, 0), 0),
        ("RIGHTPADDING", (0, 0), (0, 0), 14),
    ]))
    story.append(cover_table)
    story.append(Spacer(1, 0.18 * inch))

    # ─── SCORE BREAKDOWN PAGE ────────────────────────────────────────────────
    story.append(PageBreak())
    story.append(Paragraph("Score Breakdown", h2))
    story.append(HRFlowable(width="100%", thickness=1, color=C_BORDER,
                            spaceAfter=8))

    cats = data.get("categories", {})
    if cats:
        chart = build_bar_chart(cats)
        story.append(chart)
        story.append(Spacer(1, 0.1 * inch))

        # Score table
        tbl_data = [
            [Paragraph("<b>Category</b>", bold9),
             Paragraph("<b>Score</b>", bold9),
             Paragraph("<b>Weight</b>", bold9),
             Paragraph("<b>Status</b>", bold9)],
        ]
        for cat, info in cats.items():
            sc = info.get("score", 0)
            col = score_color(sc)
            tbl_data.append([
                Paragraph(cat, base),
                Paragraph(f"<b>{sc}/100</b>", bold9),
                Paragraph(info.get("weight", ""), muted),
                Paragraph(score_label(sc),
                          ParagraphStyle("lbl", fontName="Helvetica-Bold",
                                         fontSize=8.5, textColor=col)),
            ])

        sc_tbl = Table(tbl_data, colWidths=[2.8*inch, 0.85*inch,
                                             0.7*inch, 1.25*inch])
        sc_tbl.setStyle(TableStyle([
            ("BACKGROUND",   (0, 0), (-1, 0), C_NAVY),
            ("TEXTCOLOR",    (0, 0), (-1, 0), C_WHITE),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [C_WHITE, C_LGRAY]),
            ("GRID",         (0, 0), (-1, -1), 0.4, C_BORDER),
            ("VALIGN",       (0, 0), (-1, -1), "MIDDLE"),
            ("TOPPADDING",   (0, 0), (-1, -1), 5),
            ("BOTTOMPADDING",(0, 0), (-1, -1), 5),
            ("LEFTPADDING",  (0, 0), (-1, -1), 8),
        ]))
        story.append(sc_tbl)

    # ─── KEY FINDINGS ────────────────────────────────────────────────────────
    story.append(PageBreak())
    story.append(Paragraph("Key Findings", h2))
    story.append(HRFlowable(width="100%", thickness=1, color=C_BORDER,
                            spaceAfter=8))

    findings = data.get("findings", [])
    if findings:
        f_data = [[Paragraph("<b>Severity</b>", bold9),
                   Paragraph("<b>Finding</b>", bold9)]]
        for f in findings:
            sev = f.get("severity", "Medium")
            col = SEV_COLOR.get(sev, C_BLUE)
            f_data.append([
                Paragraph(f"<b>{sev}</b>",
                          ParagraphStyle("sev", fontName="Helvetica-Bold",
                                         fontSize=8.5, textColor=col)),
                Paragraph(f.get("finding", ""), base),
            ])
        f_tbl = Table(f_data, colWidths=[0.95*inch, 6.35*inch])
        f_tbl.setStyle(TableStyle([
            ("BACKGROUND",   (0, 0), (-1, 0), C_NAVY),
            ("TEXTCOLOR",    (0, 0), (-1, 0), C_WHITE),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [C_WHITE, C_LGRAY]),
            ("GRID",         (0, 0), (-1, -1), 0.4, C_BORDER),
            ("VALIGN",       (0, 0), (-1, -1), "TOP"),
            ("TOPPADDING",   (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING",(0, 0), (-1, -1), 6),
            ("LEFTPADDING",  (0, 0), (-1, -1), 8),
        ]))
        story.append(f_tbl)

    # ─── ACTION PLAN ─────────────────────────────────────────────────────────
    story.append(PageBreak())
    story.append(Paragraph("Prioritised Action Plan", h2))
    story.append(HRFlowable(width="100%", thickness=1, color=C_BORDER,
                            spaceAfter=8))

    def action_section(title, items, accent):
        if not items:
            return
        story.append(Paragraph(title, h3))
        for i, item in enumerate(items, 1):
            row = Table(
                [[Paragraph(f"<b>{i}</b>",
                            ParagraphStyle("num", fontName="Helvetica-Bold",
                                           fontSize=10, textColor=C_WHITE,
                                           alignment=1)),
                  Paragraph(item, base)]],
                colWidths=[0.28*inch, 6.9*inch],
            )
            row.setStyle(TableStyle([
                ("BACKGROUND",   (0, 0), (0, 0), accent),
                ("VALIGN",       (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING",  (0, 0), (0, 0), 0),
                ("RIGHTPADDING", (0, 0), (0, 0), 0),
                ("TOPPADDING",   (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING",(0, 0), (-1, -1), 5),
                ("LEFTPADDING",  (1, 0), (1, 0), 8),
                ("LINEBELOW",    (1, 0), (1, 0), 0.4, C_BORDER),
            ]))
            story.append(row)
            story.append(Spacer(1, 3))

    action_section("⚡ Quick Wins — This Week",
                   data.get("quick_wins", []), C_GREEN)
    action_section("📈 Medium-Term — 1–3 Months",
                   data.get("medium_term", []), C_BLUE)
    action_section("🚀 Strategic — 3–6 Months",
                   data.get("strategic", []), C_NAVY)

    # ─── COMPETITIVE LANDSCAPE ───────────────────────────────────────────────
    competitors = data.get("competitors", [])
    if competitors:
        story.append(PageBreak())
        story.append(Paragraph("Competitive Landscape", h2))
        story.append(HRFlowable(width="100%", thickness=1, color=C_BORDER,
                                spaceAfter=8))

        brand  = data.get("brand_name", "Brand")
        c_names = [c.get("name", f"Competitor {i+1}")
                   for i, c in enumerate(competitors[:3])]
        headers = [Paragraph(f"<b>{h}</b>", bold9)
                   for h in ["", brand] + c_names]
        rows_def = [
            ("Positioning", "positioning"),
            ("Pricing",     "pricing"),
            ("Social Proof","social_proof"),
            ("Content",     "content"),
        ]
        comp_data = [headers]
        for label, key in rows_def:
            row = [Paragraph(f"<b>{label}</b>", bold9),
                   Paragraph(data.get(key, "—"), base)]
            for c in competitors[:3]:
                row.append(Paragraph(c.get(key, "—"), base))
            comp_data.append(row)

        n_cols = 2 + len(competitors[:3])
        col_w  = 7.3 * inch / n_cols
        col_w0 = 1.0 * inch
        rest_w = (7.3 * inch - col_w0) / (n_cols - 1)

        comp_tbl = Table(comp_data,
                         colWidths=[col_w0] + [rest_w] * (n_cols - 1))
        comp_tbl.setStyle(TableStyle([
            ("BACKGROUND",   (0, 0), (-1, 0), C_NAVY),
            ("TEXTCOLOR",    (0, 0), (-1, 0), C_WHITE),
            ("BACKGROUND",   (1, 1), (1, -1), colors.HexColor("#EEF4FF")),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [C_WHITE, C_LGRAY]),
            ("BACKGROUND",   (1, 1), (1, -1), colors.HexColor("#EEF4FF")),
            ("GRID",         (0, 0), (-1, -1), 0.4, C_BORDER),
            ("VALIGN",       (0, 0), (-1, -1), "TOP"),
            ("TOPPADDING",   (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING",(0, 0), (-1, -1), 6),
            ("LEFTPADDING",  (0, 0), (-1, -1), 7),
        ]))
        story.append(comp_tbl)

    # ─── METHODOLOGY ─────────────────────────────────────────────────────────
    story.append(PageBreak())
    story.append(Paragraph("Methodology", h2))
    story.append(HRFlowable(width="100%", thickness=1, color=C_BORDER,
                            spaceAfter=8))

    meth_text = (
        "This report was generated using the AI Marketing Suite audit framework. "
        "Five specialist analysis agents evaluated the target website independently "
        "across six weighted dimensions. Scores reflect the quality of marketing "
        "execution observable from public-facing pages and content at the time of audit."
    )
    story.append(Paragraph(meth_text, base))
    story.append(Spacer(1, 0.1 * inch))

    weight_data = [
        [Paragraph("<b>Category</b>", bold9),
         Paragraph("<b>Weight</b>", bold9),
         Paragraph("<b>What It Measures</b>", bold9)],
        ["Content & Messaging",     "25%",
         "Headlines, value prop, CTA copy, social proof, brand voice"],
        ["Conversion Optimization", "20%",
         "Form design, CTA placement, trust signals, pricing clarity"],
        ["SEO & Discoverability",   "20%",
         "Title tags, schema, hreflang, crawl health, content gaps"],
        ["Competitive Positioning", "15%",
         "Differentiation, comparison content, market category ownership"],
        ["Brand & Trust",           "10%",
         "Certifications, customer proof, leadership visibility"],
        ["Growth & Strategy",       "10%",
         "Growth loops, retention mechanics, market timing"],
    ]
    w_tbl = Table(weight_data, colWidths=[2.0*inch, 0.7*inch, 4.6*inch])
    w_tbl.setStyle(TableStyle([
        ("BACKGROUND",   (0, 0), (-1, 0), C_NAVY),
        ("TEXTCOLOR",    (0, 0), (-1, 0), C_WHITE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [C_WHITE, C_LGRAY]),
        ("GRID",         (0, 0), (-1, -1), 0.4, C_BORDER),
        ("FONTNAME",     (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE",     (0, 1), (-1, -1), 8.5),
        ("TEXTCOLOR",    (0, 1), (-1, -1), C_BODY),
        ("VALIGN",       (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING",   (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING",(0, 0), (-1, -1), 5),
        ("LEFTPADDING",  (0, 0), (-1, -1), 8),
    ]))
    story.append(w_tbl)

    story.append(Spacer(1, 0.15 * inch))
    story.append(Paragraph(
        '<font color="#7F8C9B">Score interpretation: '
        '85–100 = A (Excellent) · 70–84 = B (Good) · '
        '55–69 = C (Average) · 40–54 = D (Below average) · '
        '0–39 = F (Critical)</font>', muted))

    # ─── BUILD ───────────────────────────────────────────────────────────────
    doc.build(story, onFirstPage=_header_footer, onLaterPages=_header_footer)
    print(f"PDF generated: {output_path}")


# ── Entry point ───────────────────────────────────────────────────────────────
def main():
    if len(sys.argv) >= 3:
        json_path = sys.argv[1]
        out_path  = sys.argv[2]
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    elif len(sys.argv) == 2:
        json_path = sys.argv[1]
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        out_path = "MARKETING-REPORT-output.pdf"
    else:
        # Demo mode
        data = {
            "url": "https://example.com",
            "date": datetime.today().strftime("%B %d, %Y"),
            "brand_name": "Example Co",
            "overall_score": 62,
            "executive_summary": (
                "Example Co scores 62/100 — solid foundations but meaningful "
                "conversion and SEO gaps. The biggest opportunities are CTA "
                "rewrites, schema markup, and a pricing FAQ page. Implementing "
                "all recommendations could add $30,000–$80,000 in monthly pipeline."
            ),
            "categories": {
                "Content & Messaging":     {"score": 68, "weight": "25%"},
                "Conversion Optimization": {"score": 52, "weight": "20%"},
                "SEO & Discoverability":   {"score": 74, "weight": "20%"},
                "Competitive Positioning": {"score": 48, "weight": "15%"},
                "Brand & Trust":           {"score": 70, "weight": "10%"},
                "Growth & Strategy":       {"score": 55, "weight": "10%"},
            },
            "findings": [
                {"severity": "Critical",
                 "finding": "Homepage headline is generic and fails the 5-second test."},
                {"severity": "High",
                 "finding": "No pricing signals anywhere — forces all budget-curious visitors into a sales call."},
                {"severity": "High",
                 "finding": "Zero schema markup — missing rich result eligibility across all pages."},
                {"severity": "Medium",
                 "finding": "/about returns a 404 — PageRank being discarded."},
                {"severity": "Low",
                 "finding": "Newsletter signup has no stated value incentive."},
            ],
            "quick_wins": [
                "Replace all 'Learn more' CTAs with outcome-specific verbs.",
                "Add 'We respond within 1 business day' below the contact form.",
                "301-redirect /about to /company.",
            ],
            "medium_term": [
                "Implement Organization, Product, and Event schema markup.",
                "Redesign contact form as a two-step progressive experience.",
                "Publish a Pricing FAQ page explaining configuration-based pricing.",
            ],
            "strategic": [
                "Build dedicated industry landing pages for top 3 verticals.",
                "Launch YouTube channel repurposing existing webinar content.",
                "Develop a self-service configuration estimator tool.",
            ],
            "competitors": [
                {"name": "Competitor A", "positioning": "Market leader",
                 "pricing": "Opaque", "social_proof": "Strong", "content": "Deep"},
                {"name": "Competitor B", "positioning": "Price challenger",
                 "pricing": "Partial", "social_proof": "Moderate", "content": "Shallow"},
            ],
        }
        out_path = "MARKETING-REPORT-sample.pdf"

    build_pdf(data, out_path)


if __name__ == "__main__":
    main()
