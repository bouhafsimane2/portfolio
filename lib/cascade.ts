import type { TierId } from "./data";

/* ------------------------------------------------------------------
   Mini-cascade that runs in the browser for the interactive demo.
   A toy version (small vocabulary) of the real T1 → T5 cascade:
   each report is resolved by the cheapest level that can handle it.
   ------------------------------------------------------------------ */

export type CascadeResult = { tier: TierId; fam: string; how: string };

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokens = (s: string) => normalize(s).split(" ").filter(Boolean);

/* T1 — dictionary of known reports */
const dictionary: Record<string, string> = {
  "passenger door fault": "Passenger doors",
  "door stuck": "Passenger doors",
  "braking fault": "Braking",
  "air conditioning failure": "Air conditioning (HVAC)",
  "pantograph fault": "Pantograph",
  "lighting failure": "Lighting",
  "traction fault": "Traction",
  "radio failure": "Signalling / radio",
};

/* T2 — domain abbreviations and keywords */
const rules: Record<string, { fam: string; expand: string }> = {
  ac: { fam: "Air conditioning (HVAC)", expand: "air conditioning" },
  hvac: { fam: "Air conditioning (HVAC)", expand: "air conditioning" },
  aircon: { fam: "Air conditioning (HVAC)", expand: "air conditioning" },
  panto: { fam: "Pantograph", expand: "pantograph" },
  pantograph: { fam: "Pantograph", expand: "pantograph" },
  brake: { fam: "Braking", expand: "brake" },
  brakes: { fam: "Braking", expand: "brake" },
  braking: { fam: "Braking", expand: "braking" },
  emergency: { fam: "Braking", expand: "emergency braking" },
  eb: { fam: "Braking", expand: "emergency braking" },
  dr: { fam: "Passenger doors", expand: "door" },
  door: { fam: "Passenger doors", expand: "door" },
  doors: { fam: "Passenger doors", expand: "door" },
  traction: { fam: "Traction", expand: "traction" },
  motor: { fam: "Traction", expand: "traction motor" },
  lighting: { fam: "Lighting", expand: "lighting" },
  lights: { fam: "Lighting", expand: "lighting" },
  radio: { fam: "Signalling / radio", expand: "radio" },
  signalling: { fam: "Signalling / radio", expand: "signalling" },
};

/* T4 — "semantic neighbours" (simulated with a bag of related words) */
const semantic: Record<string, string[]> = {
  "Passenger doors": ["leaf", "shut", "closes", "opens", "platform", "jammed", "stuck"],
  "Air conditioning (HVAC)": ["hot", "cold", "ventilation", "temperature", "fan", "heat"],
  Pantograph: ["catenary", "overhead", "collector", "arc", "wire"],
  Braking: ["pads", "slide", "slows", "stop", "wheel", "skid"],
  Lighting: ["light", "bulb", "dark", "lamp"],
  Traction: ["start", "accelerate", "power", "move", "reverse"],
  "Signalling / radio": ["communication", "announcement", "intercom", "speaker"],
};

/* T5 — families allowed for the LLM (closed list) */
const llmHints: Record<string, string[]> = {
  "Electrical equipment": ["burning", "smell", "smoke", "spark", "breaker", "fuse", "cable", "short"],
};

function levenshtein(a: string, b: string) {
  const dp = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return dp[b.length];
}

export function classify(raw: string): CascadeResult {
  const norm = normalize(raw);
  const toks = tokens(raw);

  // T1
  if (dictionary[norm]) return { tier: 1, fam: dictionary[norm], how: "exact" };

  // T2
  for (const t of toks) {
    const r = rules[t];
    if (r) return { tier: 2, fam: r.fam, how: `rule “${t}” → ${r.expand}` };
  }

  // T3
  let best: { tok: string; key: string; score: number } | null = null;
  for (const t of toks) {
    if (t.length < 5) continue;
    for (const key of Object.keys(rules)) {
      if (key.length < 5) continue;
      const score = 1 - levenshtein(t, key) / Math.max(t.length, key.length);
      if (score >= 0.78 && (!best || score > best.score)) best = { tok: t, key, score };
    }
  }
  if (best) return { tier: 3, fam: rules[best.key].fam, how: `fuzzy “${best.tok}” ≈ ${best.key} (${Math.round(best.score * 100)}%)` };

  // T4
  for (const [fam, words] of Object.entries(semantic)) {
    const hit = toks.find((t) => words.includes(t));
    if (hit) return { tier: 4, fam, how: `semantic neighbour “${hit}”` };
  }

  // T5
  for (const [fam, words] of Object.entries(llmHints)) {
    if (toks.some((t) => words.includes(t))) return { tier: 5, fam, how: "LLM · closed list" };
  }
  return { tier: 5, fam: "To be reviewed (human check)", how: "LLM · no confident family" };
}
