import fs from "node:fs/promises";
import path from "node:path";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const OUT_ROOT = "/Users/lx/Documents/GitHub/vibe-game/output/brochures_2026_metabolic";
const WORK_ROOT = path.join(OUT_ROOT, "_work");
const SOURCE_DECK = "/Users/lx/Downloads/2026南模生物代谢模型数据总结 -liuxia-2026-07-09.pptx";
const PAGE_DIR = path.join(WORK_ROOT, "wps_pages");
const BRAND_DIR = "/Users/lx/.codex/skills/brochure-blueprint/assets/brand";
const LOGO_PATH = path.join(BRAND_DIR, "logo_southern.png");
const FOOTER_PATH = path.join(BRAND_DIR, "footer_southern.png");

const W = 720;
const H = 960;
const COLORS = {
  navy: "#1F4E9C",
  blue: "#4874CB",
  teal: "#30C0B4",
  orange: "#EE822F",
  purple: "#7E1FAD",
  text: "#24324A",
  muted: "#55657B",
  border: "#D6E0EF",
  pale: "#F3F7FC",
  white: "#FFFFFF",
};

async function bytes(filePath) {
  const data = await fs.readFile(filePath);
  return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
}

async function writeBlob(filePath, blob) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

function addText(slide, name, text, position, options = {}) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    name,
    position,
    fill: options.fill ?? "none",
    line: options.line ?? { style: "solid", fill: "none", width: 0 },
  });
  shape.text = text;
  shape.text.style = {
    fontFamily: options.fontFamily ?? "Aptos",
    fontSize: options.fontSize ?? 14,
    bold: options.bold ?? false,
    color: options.color ?? COLORS.text,
    alignment: options.alignment ?? "left",
  };
  return shape;
}

function addBase(slide, page, logoBytes, footerBytes) {
  slide.background.fill = COLORS.white;

  addText(
    slide,
    `title-${page.index}`,
    page.title,
    { left: 16, top: 30, width: 462, height: page.first ? 48 : 44 },
    { fontSize: page.first ? 20 : 18, bold: true, color: COLORS.navy }
  );

  slide.images.add({
    blob: logoBytes,
    contentType: "image/png",
    alt: "Southern Model Organisms logo",
    fit: "contain",
    position: { left: 485, top: 27, width: 228, height: 43 },
  });

  if (page.first) {
    slide.shapes.add({
      geometry: "rect",
      name: `header-band-${page.index}`,
      position: { left: 0, top: 86, width: W, height: 94 },
      fill: COLORS.blue,
      line: { style: "solid", fill: "none", width: 0 },
    });
    addText(
      slide,
      `description-${page.index}`,
      page.description,
      { left: 14, top: 94, width: 692, height: 79 },
      { fontSize: 14, color: COLORS.white }
    );
  }

  const bannerY = page.first ? 187 : 91;
  slide.shapes.add({
    geometry: "rightArrow",
    name: `study-banner-${page.index}`,
    position: { left: 53, top: bannerY, width: 662, height: 40 },
    fill: COLORS.teal,
    line: { style: "solid", fill: "none", width: 0 },
  });
  addText(
    slide,
    `study-banner-text-${page.index}`,
    page.banner,
    { left: 68, top: bannerY + 7, width: 625, height: 26 },
    { fontSize: page.banner.length > 49 ? 13 : 15, bold: true, color: COLORS.white }
  );

  const introY = page.first ? 230 : 134;
  addText(
    slide,
    `intro-${page.index}`,
    page.intro,
    { left: 67, top: introY, width: 634, height: 40 },
    { fontSize: 12.5, color: COLORS.muted }
  );

  const tabY = page.first ? 264 : 178;
  const tabH = page.first ? 533 : 619;
  slide.shapes.add({
    geometry: "roundRect",
    name: `side-tab-${page.index}`,
    position: { left: 3, top: tabY, width: 39, height: tabH },
    fill: page.tabColor,
    line: { style: "solid", fill: "none", width: 0 },
    borderRadius: 7,
  });
  addText(
    slide,
    `side-tab-text-${page.index}`,
    page.tabText.replaceAll("\n", " "),
    {
      left: 3 + 19.5 - (tabH - 32) / 2,
      top: tabY + tabH / 2 - 15,
      width: tabH - 32,
      height: 30,
      rotation: 270,
    },
    { fontSize: 11.5, bold: true, color: COLORS.white, alignment: "center" }
  );

  const figureY = page.first ? 271 : 178;
  const figureH = page.first ? 527 : 619;
  slide.shapes.add({
    geometry: "roundRect",
    name: `figure-frame-${page.index}`,
    position: { left: 57, top: figureY, width: 650, height: figureH },
    fill: COLORS.white,
    line: { style: "solid", fill: COLORS.border, width: 1 },
    borderRadius: 5,
  });

  slide.images.add({
    blob: page.figureBytes,
    contentType: "image/png",
    alt: page.figureAlt,
    fit: "contain",
    crop: page.crop,
    position: { left: 61, top: figureY + 4, width: 642, height: figureH - 8 },
  });

  addText(
    slide,
    `caption-${page.index}`,
    page.caption,
    { left: 53, top: 803, width: 658, height: 53 },
    { fontSize: 10.5, color: COLORS.text }
  );

  slide.images.add({
    blob: footerBytes,
    contentType: "image/png",
    alt: "Southern Model Organisms contact footer",
    fit: "cover",
    position: { left: 0, top: 861, width: W, height: 99 },
  });

  const notes = [
    "[Sources]",
    `- ${SOURCE_DECK}, slide ${page.sourceSlide} (primary figure and treatment-group evidence).`,
    "- /Users/lx/.codex/skills/brochure-blueprint/assets/layout.json (brochure geometry).",
    "- /Users/lx/.codex/skills/brochure-blueprint/assets/brand/ (logo and English footer artwork).",
    "[/Sources]",
  ].join("\n");
  slide.speakerNotes.textFrame.setText(notes);
  slide.speakerNotes.setVisible(true);
}

async function buildDeck(deck) {
  const logoBytes = await bytes(LOGO_PATH);
  const footerBytes = await bytes(FOOTER_PATH);
  const presentation = Presentation.create({ slideSize: { width: W, height: H } });

  for (const page of deck.pages) {
    const slide = presentation.slides.add();
    addBase(slide, page, logoBytes, footerBytes);
  }

  const outDir = path.join(OUT_ROOT, deck.folder);
  const renderDir = path.join(WORK_ROOT, "renders", deck.slug);
  await fs.mkdir(outDir, { recursive: true });
  await fs.mkdir(renderDir, { recursive: true });

  for (const [i, slide] of presentation.slides.items.entries()) {
    const stem = `slide-${String(i + 1).padStart(2, "0")}`;
    await writeBlob(
      path.join(renderDir, `${stem}.png`),
      await presentation.export({ slide, format: "png", scale: 2 })
    );
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(path.join(renderDir, `${stem}.layout.json`), await layout.text());
  }

  await writeBlob(
    path.join(renderDir, "montage.webp"),
    await presentation.export({ format: "webp", montage: true, scale: 1 })
  );

  const pptx = await PresentationFile.exportPptx(presentation);
  const finalPath = path.join(outDir, deck.filename);
  await pptx.save(finalPath);
  return finalPath;
}

const figureFiles = {
  dio1: path.join(PAGE_DIR, "slide-11.png"),
  dio2: path.join(PAGE_DIR, "slide-12.png"),
  cardio1: path.join(PAGE_DIR, "slide-28.png"),
  cardio2: path.join(PAGE_DIR, "slide-29.png"),
  mash1: path.join(PAGE_DIR, "slide-31.png"),
  mash2: path.join(PAGE_DIR, "slide-32.png"),
};

const figureBytes = {};
for (const [key, value] of Object.entries(figureFiles)) {
  figureBytes[key] = await bytes(value);
}

const decks = [
  {
    slug: "dio",
    folder: "DIO_Obesity_Model",
    filename: "DIO_Obesity_2page_brochure.pptx",
    pages: [
      {
        index: 1,
        first: true,
        title: "HFD-Induced C57BL/6 Obese Mouse Model",
        description:
          "Validated diet-induced obesity platform for body-weight and body-composition pharmacology. The study compares saline, semaglutide, bimagrumab and combination treatment across longitudinal weight, food intake, fat mass, lean mass and terminal tissue endpoints.",
        banner: "Body-weight and composition response",
        intro:
          "A 28-day study quantifies body weight and cumulative intake alongside fat- and lean-mass trajectories.",
        tabText: "28-DAY\nDIO\nSTUDY",
        tabColor: COLORS.orange,
        figureBytes: figureBytes.dio1,
        figureAlt:
          "Eight-panel longitudinal DIO study showing body weight, food intake, fat mass and lean mass for saline, semaglutide, bimagrumab and combination treatment.",
        crop: { left: 0.02, top: 0.07, right: 0.02, bottom: 0.11 },
        caption:
          "Fig. 1. Semaglutide reduced body weight and fat mass; adding bimagrumab produced the largest fat-mass decline while supporting lean mass relative to semaglutide alone. Source slide 11.",
        sourceSlide: 11,
      },
      {
        index: 2,
        first: false,
        title: "DIO Mouse Model | Terminal Endpoints",
        description: "",
        banner: "Organ and adipose-depot pharmacodynamics",
        intro:
          "Endpoint liver, adipose-depot and tissue weights support organ-level interpretation of the treatment response.",
        tabText: "TERMINAL\nENDPOINTS",
        tabColor: COLORS.purple,
        figureBytes: figureBytes.dio2,
        figureAlt:
          "Ten-panel terminal organ and adipose depot weights in the HFD-induced C57BL/6 obese mouse model.",
        crop: { left: 0.02, top: 0.07, right: 0.02, bottom: 0.1 },
        caption:
          "Fig. 2. Semaglutide-containing arms reduced multiple adipose depots and organ weights; the combination arm paired broad fat-depot reductions with bimagrumab-supported lean-tissue outcomes. Source slide 12.",
        sourceSlide: 12,
      },
    ],
  },
  {
    slug: "cardio",
    folder: "Cardiovascular_Atherosclerosis_Model",
    filename: "ApoE_KO_Atherosclerosis_2page_brochure.pptx",
    pages: [
      {
        index: 1,
        first: true,
        title: "ApoE-KO Atherosclerosis Mouse Model",
        description:
          "Western-diet ApoE-knockout mice provide an integrated cardiovascular efficacy model spanning serum lipids, longitudinal body weight, en face aortic plaque burden and aortic-root histology. Atorvastatin serves as the pharmacological validation control.",
        banner: "Systemic lipid response and plaque burden",
        intro:
          "Atorvastatin (10 mg/kg, p.o., bid) is benchmarked against western-diet vehicle and chow controls through day 55.",
        tabText: "55-DAY\nATORVASTATIN",
        tabColor: COLORS.orange,
        figureBytes: figureBytes.cardio1,
        figureAlt:
          "ApoE-knockout atherosclerosis study with lipid panels, longitudinal body weight and en face aorta plaque images.",
        crop: { left: 0.01, top: 0.07, right: 0.01, bottom: 0.01 },
        caption:
          "Fig. 1. Western-diet ApoE-KO mice developed adverse lipid profiles and extensive aortic lipid staining; atorvastatin partially normalized circulating lipids and reduced visible plaque burden. Source slide 28.",
        sourceSlide: 28,
      },
      {
        index: 2,
        first: false,
        title: "Atherosclerosis Model | Histopathology",
        description: "",
        banner: "Aortic-root histology confirms lesion burden",
        intro:
          "Oil Red O staining and quantitative lesion area provide tissue-level validation of disease severity and treatment response.",
        tabText: "OIL RED O\nHISTOLOGY",
        tabColor: COLORS.purple,
        figureBytes: figureBytes.cardio2,
        figureAlt:
          "Aortic-root Oil Red O histology and plaque area quantification for chow, ApoE-KO western-diet vehicle and atorvastatin groups.",
        crop: { left: 0.01, top: 0.07, right: 0.01, bottom: 0.02 },
        caption:
          "Fig. 2. Aortic-root Oil Red O staining and lesion-area quantification distinguish chow controls from western-diet ApoE-KO mice and show a partial atorvastatin response. Source slide 29.",
        sourceSlide: 29,
      },
    ],
  },
  {
    slug: "mash",
    folder: "MASH_GAN_Diet_Model",
    filename: "GAN_Diet_MASH_2page_brochure.pptx",
    pages: [
      {
        index: 1,
        first: true,
        title: "GAN Diet-Induced MASH Mouse Model",
        description:
          "Translational MASH platform combining systemic metabolic measures, liver biochemistry and histopathology. The source studies profile FGF21-pathway efficacy across body weight, glucose, insulin, AST/ALT, liver triglycerides, steatosis, fibrosis and NAS components.",
        banner: "FGF21 pathway efficacy in GAN diet-induced MASH",
        intro:
          "A 42-day study compares chow/PBS, GAN/PBS and GAN/FGF21 groups across systemic and hepatic endpoints.",
        tabText: "42-DAY\nFGF21\nSTUDY",
        tabColor: COLORS.orange,
        figureBytes: figureBytes.mash1,
        figureAlt:
          "FGF21 mechanism graphic and nine efficacy panels in GAN-diet mice, including body weight, glucose, insulin, liver enzymes and liver lipid endpoints.",
        crop: { left: 0.01, top: 0.07, right: 0.01, bottom: 0.03 },
        caption:
          "Fig. 1. FGF21 treatment produced sustained weight loss and improved fasting glucose, insulin, liver enzymes and hepatic lipid measures versus GAN-diet vehicle. Source slide 31.",
        sourceSlide: 31,
      },
      {
        index: 2,
        first: false,
        title: "MASH Model | Liver Histopathology",
        description: "",
        banner: "FGF21 improves steatosis and histopathology",
        intro:
          "Sirius Red and H&E panels benchmark diet-induced pathology against treated animals with quantitative fibrosis, steatosis and NAS readouts.",
        tabText: "LIVER\nHISTOPATHOLOGY",
        tabColor: COLORS.purple,
        figureBytes: figureBytes.mash2,
        figureAlt:
          "Sirius Red and H&E liver histology with fibrosis, steatosis and NAS quantification in GAN-diet mice.",
        crop: { left: 0.01, top: 0.07, right: 0.01, bottom: 0.02 },
        caption:
          "Fig. 2. FGF21-treated GAN-diet mice show less steatosis and improved H&E appearance, with lower fibrosis and NAS-related pathology than GAN-diet vehicle animals. Source slide 32.",
        sourceSlide: 32,
      },
    ],
  },
];

const outputs = [];
for (const deck of decks) {
  outputs.push(await buildDeck(deck));
}
console.log(JSON.stringify(outputs, null, 2));
