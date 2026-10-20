/* ------------------------------------------------------------------
   All portfolio content lives here.
   Edit this file to update texts, links and projects.
   ------------------------------------------------------------------ */

export const profile = {
  name: "Imane Bouhafs",
  role: "AI & Data Science Engineer",
  email: "bouhafsimane2@gmail.com",
  linkedinName: "Bouhafs Imane",
  linkedin: "https://www.linkedin.com/in/imane-bouhafs-372607363",
  github: "https://github.com/bouhafsimane2",
};

export const navLinks = [
  { id: "skills", label: "Skills" },
  { id: "flagship", label: "Flagship Project" },
  { id: "projects", label: "Data & Dev Projects" },
  { id: "automation", label: "AI Automation" },
  { id: "about", label: "About" },
] as const;

export const skillsBand = [
  "Python", "PyTorch", "TensorFlow", "scikit-learn", "Transformers", "NLP", "Computer Vision",
  "Pandas", "NumPy", "SQL", "Power BI", "Streamlit", "RAG", "LLMs", "Embeddings", "Hybrid Search",
  "OCR", "n8n", "APIs", "Webhooks", "FastAPI", "Flask", "Docker", "PostgreSQL", "React", "Node.js",
  "UX/UI", "Figma", "Canva", "Problem Solving",
];

/* ---------------------------------------------------------- Flagship */

export const pfe = {
  tag: "Final-year project",
  title: "Industrial Maintenance",
  titleAccent: "Intelligence",
  pitch:
    "An AI that helps a tram network's maintenance teams understand their failures and find the right procedure in seconds.",
  meta: [
    { k: "Context", v: "Multi-site tram operator" },
    { k: "My role", v: "AI & Data Science Engineer" },
    { k: "Deliverables", v: "2 tools: failure analytics + documentation assistant" },
    { k: "Stack", v: "Python · NLP · Embeddings · LLM · OCR · FastAPI" },
  ],
  summary: [
    { k: "Problem", v: "Hand-typed failure reports that can't be analysed, and manuals too long to search." },
    { k: "Solution", v: "An AI that sorts every failure into the right family, and an assistant that answers from the manuals." },
    { k: "Impact", v: "Reliable data for decisions, and sourced technical answers in seconds." },
  ],
  problems: [
    {
      title: "Messy failure reports",
      text: "Every technician writes in their own way: typos, abbreviations, site-specific vocabulary. Result: no way to know which failures happen most.",
      examples: ["PASSENGER DOOR FAULT", "pass. dr flt", "door stuck", "the leaf won't shut anymore"],
      note: "4 ways to write the same failure",
    },
    {
      title: "Documentation that is too heavy",
      text: "Procedures are spread across hundreds of pages of PDF manuals, some of them scanned. Finding the right information takes time, out in the field.",
      examples: ["Braking manual.pdf", "Doors manual.pdf", "Maintenance plan.pdf", "Inspection sheets (scans)"],
      note: "Hundreds of pages to go through",
    },
  ],
  modules: [
    {
      n: "Module 1",
      title: "Understand failures",
      tech: "Maintenance Analytics",
      oneLiner: "Every report is automatically sorted into a failure family, so failures can finally be counted and prioritised.",
      steps: [
        { t: "Read the report", d: "We take the text exactly as the technician typed it." },
        { t: "Classify it the cheapest way", d: "Dictionary → rules → typos → meaning. Generative AI only steps in as a last resort." },
        { t: "Analyse", d: "With reliable families, we build Pareto, 5M and FMEA analyses." },
      ],
      before: "emergancy brakng problem",
      after: "Braking",
      afterNote: "fixed at level 3 (typos)",
    },
    {
      n: "Module 2",
      title: "Ask the manuals",
      tech: "Technical RAG",
      oneLiner: "The technician asks a question in plain language; the assistant answers from the manuals and cites its sources.",
      steps: [
        { t: "Read the manuals", d: "PDFs, even scanned ones, are read (OCR) and split into passages." },
        { t: "Find the right passages", d: "Search by meaning and by keywords, then rank the best results." },
        { t: "Answer with sources", d: "The AI writes a short answer based only on the passages found." },
      ],
      before: "How do I check brake pad wear?",
      after: "Measure the thickness at each inspection and replace at the minimum limit.",
      afterNote: "Sources: Braking manual §4.2 · Inspection sheet §3",
    },
  ],
  results: [
    { v: "5", u: "levels", l: "of classification, from cheapest to smartest: generative AI only as a last resort" },
    { v: "Pareto", u: "", l: "5M and FMEA finally possible, thanks to reliable failure families" },
    { v: "Sources", u: "", l: "cited in every answer, so the technician can check" },
    { v: "Seconds", u: "", l: "to find a procedure, instead of going through hundreds of pages" },
  ],
  stack: ["Python", "Pandas", "NLP", "Fuzzy matching", "Embeddings", "LLM", "Docling OCR", "Qdrant", "BM25", "FastAPI", "React", "n8n", "Docker"],
};

export type TierId = 1 | 2 | 3 | 4 | 5;

export const tiers: {
  id: TierId;
  name: string;
  short: string;
  desc: string;
  more: string;
  example?: string;
  color: string;
}[] = [
  { id: 1, name: "Exact Match", short: "Exact", desc: "Reports already in the dictionary", more: "Direct match after normalising case and accents.", example: '"PASSENGER DOOR FAULT" → Passenger doors', color: "#FFA800" },
  { id: 2, name: "Rule-Based", short: "Rules", desc: "Abbreviations & regular expressions", more: "Expands domain abbreviations and regex patterns.", example: '"hvac cab drv." → air conditioning, driver cab', color: "#7FFFEF" },
  { id: 3, name: "Fuzzy Matching", short: "Fuzzy", desc: "Typos and spelling variants", more: "Edit distance with a similarity threshold.", example: '"emergancy brakng" → emergency braking', color: "#93B4E8" },
  { id: 4, name: "Semantic Matching", short: "Semantic", desc: "Embeddings & semantic similarity", more: "Nearest-neighbour search in the embedding space.", example: '"the leaf won\'t shut anymore" → Passenger doors', color: "#7FA7E8" },
  { id: 5, name: "LLM Fallback", short: "LLM", desc: "LLM for the remaining cases", more: "The LLM only handles the long tail, with a closed list of families to limit hallucinations.", color: "#8FA9D6" },
];

/* Demo reports: classification is computed live by lib/cascade.ts */
export const cascadeSamples = [
  "PASSENGER DOOR FAULT",
  "hvac cab drv. fault",
  "PANTO DOWN WONT RISE",
  "emergancy brakng problem",
  "the leaf won't shut anymore on platform side",
  "burning smell after workshop visit, see night shift",
];

export type RagScenario = {
  q: string;
  dense: { label: string; score: number }[];
  bm25: { label: string; score: number }[];
  answer: string;
  sources: string[];
};

export const ragScenarios: RagScenario[] = [
  {
    q: "How do I check brake pad wear?",
    dense: [
      { label: "§ Pad wear", score: 92 },
      { label: "§ Periodic inspection", score: 74 },
      { label: "§ Brake discs", score: 51 },
    ],
    bm25: [
      { label: "§ Minimum thickness", score: 88 },
      { label: "§ Pad wear", score: 80 },
      { label: "§ Linings", score: 43 },
    ],
    answer:
      "Measure the remaining thickness at each periodic inspection and replace the pad as soon as it reaches the minimum limit given in the manual [1]. Record the measurement on the inspection sheet [2].",
    sources: ["[1] Braking manual · §4.2", "[2] Inspection sheet · §3"],
  },
  {
    q: "What to do if a passenger door stays stuck open?",
    dense: [
      { label: "§ Doors: degraded modes", score: 89 },
      { label: "§ Limit switches", score: 71 },
      { label: "§ Door isolation", score: 58 },
    ],
    bm25: [
      { label: "§ Stuck door", score: 91 },
      { label: "§ Door isolation", score: 66 },
      { label: "§ Safety loop", score: 40 },
    ],
    answer:
      "Isolate the door in degraded mode from the driver's desk, check the limit switch, then reset the door safety loop [1]. If the fault persists, lock out the leaf and report it to the control centre [2].",
    sources: ["[1] Doors manual · §2.7", "[2] Control-centre procedure · §5"],
  },
  {
    q: "How often should the pantograph be greased?",
    dense: [
      { label: "§ Pantograph servicing", score: 86 },
      { label: "§ Maintenance plan", score: 77 },
      { label: "§ Contact strips", score: 49 },
    ],
    bm25: [
      { label: "§ Joint greasing", score: 93 },
      { label: "§ Pantograph servicing", score: 72 },
      { label: "§ Approved lubricants", score: 45 },
    ],
    answer:
      "Grease the pantograph joints at every level-2 inspection, using an approved lubricant [1]. Check the wear of the contact strips at the same time [2].",
    sources: ["[1] Maintenance plan · §6.1", "[2] Current collection manual · §3.4"],
  },
];

/* ---------------------------------------------------------- Projects */
/* Source: public repositories on github.com/bouhafsimane2 (each project's README). */

export type ProjectCategory = "vision" | "genai" | "web" | "rnd";

export type PipelineStage = {
  label: string;
  icon: string; // Lucide icon name (see components/ui/Icon.tsx)
  title: string;
  detail: string;
  tech: string[];
  log?: string; // line shown in the request simulation (architecture)
};

export type ProjectArtKind = "leaf" | "face" | "batirpro" | "rl" | "rag" | "doc" | "chef" | "gmao";

export type Project = {
  id: string;
  index: string;
  cat: ProjectCategory;
  title: string;
  subtitle: string;
  tag: string;
  desc: string;
  highlight?: string; // key figure shown in the detail panel
  chips: string[];
  art: ProjectArtKind;
  bg: string;
  repo: string;
  demo?: string;
  diagram: { kind: "pipeline" | "architecture" | "loop"; title: string; caption: string };
  stages: PipelineStage[];
};

export const projectFilters: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "genai", label: "Generative AI" },
  { id: "vision", label: "AI & Vision" },
  { id: "web", label: "Full-Stack & Web" },
  { id: "rnd", label: "R&D" },
];

const gh = (repo: string) => `https://github.com/bouhafsimane2/${repo}`;

const bgs = {
  aqua: "radial-gradient(80% 90% at 30% 70%,rgba(0,255,224,.45),transparent 60%),radial-gradient(70% 70% at 90% 10%,rgba(0,255,224,.35),transparent 60%),linear-gradient(135deg,#0a1820,#0a0f1d)",
  blue: "radial-gradient(80% 90% at 70% 70%,rgba(37,99,235,.55),transparent 60%),radial-gradient(60% 70% at 10% 10%,rgba(61,90,138,.4),transparent 60%),linear-gradient(135deg,#0d1424,#0a0f1a)",
  orange: "radial-gradient(80% 90% at 20% 30%,rgba(255,168,0,.28),transparent 55%),radial-gradient(70% 80% at 90% 90%,rgba(0,255,224,.45),transparent 60%),linear-gradient(135deg,#0c1420,#0a0f1a)",
  steel: "radial-gradient(80% 90% at 80% 30%,rgba(61,90,138,.45),transparent 60%),radial-gradient(70% 80% at 10% 90%,rgba(37,99,235,.5),transparent 60%),linear-gradient(135deg,#0f1526,#0a0f1a)",
  mixed: "radial-gradient(80% 90% at 80% 20%,rgba(37,99,235,.5),transparent 60%),radial-gradient(60% 70% at 0% 100%,rgba(0,255,224,.22),transparent 60%),linear-gradient(135deg,#0d1424,#0a0f1a)",
  warm: "radial-gradient(80% 90% at 70% 80%,rgba(255,168,0,.3),transparent 55%),radial-gradient(60% 70% at 10% 10%,rgba(37,99,235,.35),transparent 60%),linear-gradient(135deg,#101522,#0a0f1a)",
  docflow: "radial-gradient(80% 90% at 20% 20%,rgba(0,255,224,.4),transparent 60%),radial-gradient(60% 70% at 100% 100%,rgba(37,99,235,.3),transparent 60%),linear-gradient(135deg,#0b1622,#0a0f1a)",
};

export const projects: Project[] = [
  {
    id: "nesychef",
    index: "01",
    cat: "genai",
    title: "NeSyChef",
    subtitle: "Neuro-symbolic expert system",
    tag: "LLM + Rules",
    desc: "A recipe assistant in English, French and Algerian Arabic. The LLM understands the request, a rule engine decides, and a verifier checks the answer: no forbidden allergen is ever suggested.",
    highlight: "0% diet / allergy violations",
    chips: ["Python", "FastAPI", "React 19", "TypeScript", "LLM", "Hypothesis"],
    art: "chef",
    bg: bgs.warm,
    repo: gh("recipies_expert_system"),
    diagram: { kind: "pipeline", title: "The LLM understands, the rules decide", caption: "Benchmark: 28% violations for an LLM alone, 0% for NeSyChef." },
    stages: [
      { label: "Request", icon: "MessageSquare", title: "Natural-language request", detail: "The user describes what is in their kitchen, in EN, FR or Darija. Prompt Guard filters injections.", tech: ["Llama Prompt Guard 2"] },
      { label: "Parsing", icon: "Brain", title: "LLM parsing", detail: "The LLM extracts ingredients, diets and allergies, grounded on a controlled vocabulary.", tech: ["gpt-oss-20b"] },
      { label: "Rules", icon: "Workflow", title: "Expert engine", detail: "Forward and backward chaining, allowed substitutions: a forbidden ingredient cannot get through.", tech: ["Expert system", "Hypothesis"] },
      { label: "Writing", icon: "Sparkles", title: "Written answer", detail: "The LLM writes the answer using only the facts produced by the engine.", tech: ["gpt-oss-120b"] },
      { label: "Verification", icon: "ShieldCheck", title: "Verifier", detail: "Any recipe or ingredient not in the result is rejected, with a template answer as fallback.", tech: ["Verifier", "Vitest"] },
    ],
  },
  {
    id: "emotions",
    index: "02",
    cat: "vision",
    title: "Emotion Detection",
    subtitle: "Computer Vision & Deep Learning",
    tag: "Computer Vision",
    desc: "A web app that detects faces in a photo or through the webcam and recognises 8 emotions (happiness, surprise, anger…).",
    highlight: "8 emotions · multiple faces",
    chips: ["PyTorch", "ResNet18", "OpenCV YuNet", "Streamlit"],
    art: "face",
    bg: bgs.blue,
    repo: gh("model_facial"),
    demo: "https://detection-emotions.streamlit.app",
    diagram: { kind: "pipeline", title: "From photo to emotion", caption: "From the raw image to the prediction." },
    stages: [
      { label: "Photo", icon: "Image", title: "Input image", detail: "Uploaded photo (JPG, PNG, WEBP) or webcam shot; orientation is fixed automatically.", tech: ["Streamlit"] },
      { label: "Detection", icon: "ScanFace", title: "Face detection", detail: "YuNet finds up to 8 faces and their key points (eyes, nose, mouth).", tech: ["OpenCV", "YuNet"] },
      { label: "Alignment", icon: "Scissors", title: "Alignment", detail: "Each face is straightened and cropped like the training images.", tech: ["OpenCV"] },
      { label: "Classification", icon: "Brain", title: "ResNet18", detail: "The network predicts the emotion; the prediction is averaged with the mirrored face for stability.", tech: ["PyTorch", "ResNet18", "FER+"] },
    ],
  },
  {
    id: "leaf",
    index: "03",
    cat: "vision",
    title: "Leaf Classification",
    subtitle: "Computer Vision & Deep Learning",
    tag: "Computer Vision",
    desc: "Classifies a leaf by the shape of its edge (toothed or smooth) and rejects images that are not leaves.",
    highlight: "98.7% test accuracy",
    chips: ["PyTorch", "ResNeXt-101", "CLIP", "Streamlit"],
    art: "leaf",
    bg: bgs.aqua,
    repo: gh("leaf_classification"),
    demo: "https://leaf-margin-classifier.streamlit.app",
    diagram: { kind: "pipeline", title: "Data → Model → App pipeline", caption: "Click a step to see what happens there." },
    stages: [
      { label: "Dataset", icon: "Image", title: "≈ 6,500 images", detail: "Herbarium leaves split into train / validation / test (15% test set never seen in training).", tech: ["Python", "Pandas"] },
      { label: "Model", icon: "Brain", title: "ResNeXt-101 fine-tuning", detail: "A ResNeXt-101 pretrained on ImageNet, fine-tuned on the two classes.", tech: ["PyTorch", "ResNeXt-101"] },
      { label: "Evaluation", icon: "Gauge", title: "98.68% accuracy", detail: "F1 0.986 on 984 test images, with a confusion matrix.", tech: ["scikit-learn"] },
      { label: "Guardrail", icon: "ShieldCheck", title: "Is it a leaf?", detail: "Zero-shot CLIP rejects off-topic images; a Mahalanobis distance flags photos far from the training data.", tech: ["CLIP", "Mahalanobis"] },
      { label: "App", icon: "Monitor", title: "Streamlit demo", detail: "Drop a photo, the app returns the class and a confidence score.", tech: ["Streamlit"] },
    ],
  },
  {
    id: "batirpro",
    index: "04",
    cat: "web",
    title: "BatirPro",
    subtitle: "Construction web platform",
    tag: "Full-Stack",
    desc: "Building-materials marketplace, craftsman search with reviews, cart and orders, recruitment, real-time messaging and an admin area.",
    highlight: "Live on Render",
    chips: ["React", "Node.js", "Express", "Socket.IO", "SQL", "UX/UI"],
    art: "batirpro",
    bg: bgs.orange,
    repo: gh("batipro"),
    demo: "https://batipro-web.onrender.com",
    diagram: { kind: "architecture", title: "Full-stack architecture", caption: "Follow a request from the browser to the database, layer by layer." },
    stages: [
      { label: "UI", icon: "Palette", title: "UX/UI design", detail: "User journeys, mock-ups and design system designed before the first line of code.", tech: ["Figma", "UX/UI"], log: "user  → clicks “Post a listing”" },
      { label: "Client", icon: "Monitor", title: "React SPA", detail: "React app with client-side routing, API calls through Axios and real-time messaging.", tech: ["React", "React Router", "Axios", "Socket.IO client"], log: "react → POST /api/listings (axios + token)" },
      { label: "API", icon: "Server", title: "Express REST API", detail: "REST routes, auth and upload middlewares, and a Socket.IO server for messaging.", tech: ["Node.js", "Express", "Socket.IO", "Multer"], log: "express → auth ✓ → multer (3 photos) → controller" },
      { label: "Data", icon: "Database", title: "SQL database", detail: "Hand-designed relational schema: users, listings, orders, messages. Media stored separately.", tech: ["SQL", "SQLite"], log: "sql   → INSERT INTO listings (…) → id 128" },
      { label: "Deploy", icon: "Cloud", title: "Deployment", detail: "Front-end and API deployed separately on Render, with automatic deploys on every push.", tech: ["Render", "GitHub"], log: "http  ← 201 Created · served by Render" },
    ],
  },
  {
    id: "gmao",
    index: "05",
    cat: "web",
    title: "CMMS Planning",
    subtitle: "Maintenance planning platform",
    tag: "Full-Stack",
    desc: "Maintenance planning platform for a tram network: import of yearly Excel plans, technician workload, leave, intervention closing and dashboards.",
    highlight: "React 19 · Express 5 · Supabase",
    chips: ["React 19", "TypeScript", "Tailwind", "Express 5", "Supabase", "Vercel"],
    art: "gmao",
    bg: bgs.steel,
    repo: gh("GMAO_planification"),
    diagram: { kind: "architecture", title: "Full-stack architecture", caption: "From the Excel file to the dashboard, layer by layer." },
    stages: [
      { label: "Import", icon: "FileSpreadsheet", title: "Yearly Excel plans", detail: "Yearly maintenance plans are imported from Excel and turned into occurrences.", tech: ["Excel", "Import"], log: "user  → imports plan_2026.xlsx" },
      { label: "Client", icon: "Monitor", title: "React + TypeScript SPA", detail: "Planning, Dashboard and Import pages; Recharts charts, React Router 7 routing.", tech: ["React 19", "TypeScript", "Vite", "Recharts"], log: "react → POST /api/import (Idempotency-Key)" },
      { label: "API", icon: "Server", title: "Express 5 API", detail: "One route per file, rate limiting, idempotency and request logging with secrets redacted.", tech: ["Express 5", "express-rate-limit"], log: "express → rate-limit ✓ → idempotency ✓ → handler" },
      { label: "Data", icon: "Database", title: "Supabase", detail: "PostgreSQL, authentication and realtime for occurrences, technicians and leave.", tech: ["Supabase", "PostgreSQL"], log: "postgres → INSERT 412 occurrences" },
      { label: "Dashboards", icon: "ChartColumn", title: "Dashboards", detail: "Technician workload, closed interventions, plan progress.", tech: ["Recharts", "Vercel"], log: "http  ← 200 OK · dashboard updated" },
    ],
  },
  {
    id: "dqn",
    index: "06",
    cat: "rnd",
    title: "DQN Lane Change",
    subtitle: "Reinforcement Learning · SUMO",
    tag: "Reinforcement Learning",
    desc: "A DQN agent that learns to change lanes on a highway with obstacles, simulated with SUMO. It finishes the route about 20% faster than the default model, with no collisions.",
    highlight: "≈ 20% faster than SUMO",
    chips: ["Python", "stable-baselines3", "Gymnasium", "SUMO"],
    art: "rl",
    bg: bgs.steel,
    repo: gh("ProjetRLOC_DQN"),
    diagram: { kind: "loop", title: "Learning loop", caption: "The agent acts, the simulation responds, the policy improves." },
    stages: [
      { label: "State", icon: "Eye", title: "Observation", detail: "Vehicle position, current lane and obstacles visible ahead.", tech: ["SUMO", "Gymnasium"] },
      { label: "Agent", icon: "Bot", title: "DQN network", detail: "The network picks the action: stay in lane or change lanes.", tech: ["stable-baselines3", "DQN"] },
      { label: "Action", icon: "Zap", title: "Lane change", detail: "SUMO applies the action and controls the vehicle's speed.", tech: ["SUMO / TraCI"] },
      { label: "Reward", icon: "Sparkles", title: "Reward signal", detail: "Bonus for moving fast, −1 penalty per lane change to avoid zigzagging.", tech: ["Reward shaping"] },
      { label: "Update", icon: "RotateCcw", title: "Learning", detail: "150,000 training steps; evaluated on 50 episodes: 73.1 s vs 93.7 s for SUMO.", tech: ["PyTorch", "TensorBoard"] },
    ],
  },
];

/* -------------------------------------------------------- Automation */

export type Automation = Project & {
  num: string;
  status: string;
  accent: string;
  steps: string[]; // workflow shown on the card
  autoArt: "doc" | "rag";
};

export const automations: Automation[] = [
  {
    id: "doc",
    num: "01",
    index: "01",
    cat: "genai",
    title: "AI Document Intelligence",
    subtitle: "n8n workflow + OCR",
    tag: "Automation",
    desc: "Reads a mailbox, extracts and checks the data in each document, then saves it.",
    highlight: "Evaluated on 40 documents",
    chips: ["n8n", "FastAPI", "Docling", "RapidOCR", "Supabase", "Docker"],
    art: "doc",
    autoArt: "doc",
    bg: bgs.docflow,
    repo: gh("Document_extraction_workflow"),
    status: "Open source",
    accent: "#7FFFEF",
    steps: ["Document", "OCR", "Extraction", "Validation", "Database", "Notification"],
    diagram: { kind: "pipeline", title: "From email to database", caption: "Every document goes through these steps, with no human in the loop." },
    stages: [
      { label: "Email", icon: "Mail", title: "Reception", detail: "n8n watches the mailbox (IMAP) and downloads the attachments.", tech: ["n8n", "IMAP"] },
      { label: "OCR", icon: "ScanText", title: "Reading the document", detail: "A FastAPI service reads the text with Docling and RapidOCR, even on scans.", tech: ["Docling", "RapidOCR", "FastAPI"] },
      { label: "Classification", icon: "Layers", title: "Document type", detail: "The LLM identifies the type: invoice, receipt or other document.", tech: ["LLM", "Groq"] },
      { label: "Extraction", icon: "Target", title: "Key fields", detail: "Supplier, date, amounts… extracted, then validated before saving.", tech: ["LLM", "Validation"] },
      { label: "Database", icon: "Database", title: "Storage & alerts", detail: "Data goes to Supabase; an error workflow sends an alert if anything fails.", tech: ["Supabase", "PostgreSQL"] },
    ],
  },
  {
    id: "rag",
    num: "02",
    index: "02",
    cat: "genai",
    title: "Knowledge & RAG Assistant",
    subtitle: "Technical documentation",
    tag: "RAG · LLM",
    desc: "Indexes manuals automatically, finds the right passages and cites its sources.",
    highlight: "11/11 reference questions passed",
    chips: ["FastAPI", "Qdrant", "BM25", "Docling", "n8n", "React", "Docker"],
    art: "rag",
    autoArt: "rag",
    bg: bgs.mixed,
    repo: gh("assistant-rag-documentation"),
    status: "Open source",
    accent: "#7FA7E8",
    steps: ["Documents", "Indexing", "Hybrid Search", "Reranking", "LLM", "Sources"],
    diagram: { kind: "pipeline", title: "From PDF to sourced answer", caption: "Click a step to see what happens there." },
    stages: [
      { label: "Ingestion", icon: "Cloud", title: "Google Drive watched by n8n", detail: "Every 5 minutes, n8n sends new or modified PDFs to the API and removes deleted ones.", tech: ["n8n", "Google Drive"] },
      { label: "OCR", icon: "ScanText", title: "Reading the manuals", detail: "Docling extracts text and tables, and removes repeated headers and footers.", tech: ["Docling"] },
      { label: "Chunking", icon: "Scissors", title: "Coherent sections", detail: "An LLM splits the text into sections and keeps the heading path of each passage.", tech: ["Mistral"] },
      { label: "Search", icon: "Search", title: "Hybrid search", detail: "Search by meaning (Qdrant, bge-m3) and by keywords (BM25), RRF fusion then re-ranking.", tech: ["Qdrant", "BM25", "Cross-encoder"] },
      { label: "Answer", icon: "MessageSquare", title: "Answer with guardrails", detail: "The LLM answers only from the passages found, with anti-hallucination rules and cited sources.", tech: ["GPT-OSS 120B", "Groq"] },
    ],
  },
];

/* ------------------------------------------------------------- About */

export const about = {
  lead: "AI & Data Science Engineer, graduate of ESTIN.",
  text: "I build applied AI solutions: industrial data classification, RAG assistants, computer vision. I deliver them as web tools that are simple to use.",
};

export const aboutRows = [
  { n: "01", title: "AI", color: "#7FA7E8", chips: ["Python", "PyTorch", "TensorFlow", "scikit-learn", "Transformers", "NLP", "Computer Vision"] },
  { n: "02", title: "Data", color: "#7FFFEF", chips: ["Pandas", "NumPy", "SQL", "Analytics", "Power BI", "Streamlit"] },
  { n: "03", title: "Generative AI", color: "#8FA9D6", chips: ["RAG", "LLMs", "Embeddings", "Hybrid Search", "OCR"] },
  { n: "04", title: "Automation", color: "#FFA800", chips: ["n8n", "APIs", "Webhooks", "Workflow Design"] },
  { n: "05", title: "Engineering", color: "#93B4E8", chips: ["FastAPI", "Flask", "Docker", "PostgreSQL", "React", "Node.js"] },
];
