/* Illustrations vectorielles des cartes projets.
   Pour une vraie capture : remplacer <ProjectArt /> par <img src="/mon-projet.png" alt="…" className="absolute inset-0 size-full object-cover" />. */
import type { ProjectArtKind } from "@/lib/data";

const mono = "var(--font-mono)";

export function ProjectArt({ kind }: { kind: ProjectArtKind }) {
  const common = { className: "absolute inset-0 size-full", viewBox: "0 0 400 250", fill: "none", "aria-hidden": true } as const;

  if (kind === "rag")
    return (
      <svg {...common}>
        <g stroke="rgba(255,255,255,.7)">
          <rect x="62" y="58" width="74" height="96" rx="6" fill="rgba(255,255,255,.04)" transform="rotate(-8 99 106)" />
          <rect x="70" y="62" width="74" height="96" rx="6" fill="#0F1522" />
        </g>
        <g fill="rgba(255,255,255,.3)">
          <rect x="82" y="78" width="50" height="4" rx="2" />
          <rect x="82" y="88" width="40" height="4" rx="2" />
          <rect x="82" y="98" width="46" height="4" rx="2" />
          <rect x="82" y="124" width="44" height="4" rx="2" />
        </g>
        <rect className="svg-ping" x="78" y="106" width="58" height="12" rx="3" fill="rgba(255,168,0,.35)" stroke="#FFA800" />
        <path className="svg-flow" d="M150 110 C180 110 186 96 214 96" stroke="#7FA7E8" strokeWidth="1.5" strokeDasharray="5 6" />
        <g transform="translate(218 52)">
          <rect width="128" height="92" rx="14" fill="rgba(37,99,235,.2)" stroke="rgba(127,167,232,.6)" />
          <g fill="rgba(255,255,255,.55)">
            <rect x="14" y="16" width="96" height="6" rx="3" />
            <rect x="14" y="30" width="80" height="6" rx="3" />
            <rect x="14" y="44" width="90" height="6" rx="3" />
          </g>
          <rect x="14" y="62" width="32" height="16" rx="8" fill="rgba(255,168,0,.15)" stroke="#FFA800" />
          <rect x="52" y="62" width="32" height="16" rx="8" fill="rgba(255,168,0,.15)" stroke="#FFA800" />
          <g fontFamily={mono} fontSize="9" fill="#FFA800">
            <text x="22" y="74">[1]</text>
            <text x="60" y="74">[2]</text>
          </g>
        </g>
        <rect x="218" y="160" width="92" height="18" fill="#00FFE0" />
        <text x="224" y="173" fontFamily={mono} fontSize="11" fill="#0B0B12">answer · src</text>
      </svg>
    );

  if (kind === "doc")
    return (
      <svg {...common}>
        <g transform="translate(56 70)" stroke="rgba(255,255,255,.75)" strokeWidth="1.3">
          <rect width="86" height="60" rx="8" fill="rgba(255,255,255,.05)" />
          <path d="M0 4l43 30 43-30" />
        </g>
        <path className="svg-flow" d="M146 100 H176" stroke="#7FFFEF" strokeWidth="1.5" strokeDasharray="5 6" />
        <g transform="translate(180 50)">
          <rect width="76" height="100" rx="6" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.7)" />
          <g fill="rgba(255,255,255,.3)">
            <rect x="10" y="14" width="40" height="6" rx="2" />
            <rect x="10" y="30" width="56" height="4" rx="2" />
            <rect x="10" y="40" width="48" height="4" rx="2" />
            <rect x="10" y="62" width="30" height="4" rx="2" />
            <rect x="44" y="62" width="22" height="4" rx="2" />
          </g>
          <rect className="svg-scan" x="-4" y="0" width="84" height="3" fill="#7FFFEF" />
        </g>
        <path className="svg-flow" d="M260 100 H284" stroke="#FFA800" strokeWidth="1.5" strokeDasharray="5 6" />
        <g transform="translate(288 78)" stroke="rgba(255,255,255,.85)" strokeWidth="1.3">
          <ellipse cx="26" cy="8" rx="26" ry="8" fill="rgba(11,15,25,.8)" />
          <path d="M0 8v44c0 4 12 8 26 8s26-4 26-8V8M0 30c0 4 12 8 26 8s26-4 26-8" />
        </g>
        <rect x="56" y="160" width="112" height="18" fill="#FFA800" />
        <text x="62" y="173" fontFamily={mono} fontSize="11" fill="#0B0B12">invoice · total</text>
      </svg>
    );

  if (kind === "chef")
    return (
      <svg {...common}>
        <g transform="translate(52 64)">
          <rect width="96" height="34" rx="16" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.5)" />
          <text x="14" y="21" fontFamily={mono} fontSize="10" fill="rgba(255,255,255,.8)">flour, eggs…</text>
        </g>
        <g transform="translate(52 112)">
          <rect width="96" height="34" rx="16" fill="rgba(255,168,0,.1)" stroke="#FFA800" />
          <text x="14" y="21" fontFamily={mono} fontSize="10" fill="#FFA800">no peanuts</text>
        </g>
        <path className="svg-flow" d="M152 81 C180 81 180 105 204 105 M152 129 C180 129 180 105 204 105" stroke="rgba(255,255,255,.4)" strokeDasharray="5 6" />
        <g transform="translate(236 105)">
          <rect x="-28" y="-28" width="56" height="56" rx="10" transform="rotate(45)" fill="rgba(37,99,235,.2)" stroke="#7FA7E8" strokeWidth="1.5" />
          <text x="-16" y="4" fontFamily={mono} fontSize="10" fill="#7FA7E8">RULES</text>
        </g>
        <path className="svg-flow" d="M276 105 H300" stroke="#7FFFEF" strokeWidth="1.5" strokeDasharray="5 6" />
        <g transform="translate(304 82)">
          <circle cx="23" cy="23" r="23" fill="rgba(0,255,224,.1)" stroke="#7FFFEF" strokeWidth="1.5" />
          <path d="M13 23l7 7 14-15" stroke="#7FFFEF" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <rect x="236" y="170" width="112" height="18" fill="#00FFE0" />
        <text x="242" y="183" fontFamily={mono} fontSize="11" fill="#0B0B12">0% violation</text>
      </svg>
    );

  if (kind === "gmao")
    return (
      <svg {...common}>
        <rect x="58" y="40" width="284" height="170" rx="10" fill="rgba(11,15,25,.7)" stroke="rgba(255,255,255,.45)" />
        <g fontFamily={mono} fontSize="9" fill="rgba(255,255,255,.55)">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => (
            <text key={m} x={124 + i * 36} y="60">{m}</text>
          ))}
          {["Doors", "Brakes", "HVAC", "Panto"].map((t, i) => (
            <text key={t} x="70" y={90 + i * 30}>{t}</text>
          ))}
        </g>
        <path d="M118 68H330M118 98H330M118 128H330M118 158H330M118 188H330" stroke="rgba(255,255,255,.08)" />
        <rect x="124" y="80" width="70" height="14" rx="4" fill="rgba(255,168,0,.85)" />
        <rect x="190" y="110" width="96" height="14" rx="4" fill="rgba(0,255,224,.55)" />
        <rect x="140" y="140" width="54" height="14" rx="4" fill="rgba(127,167,232,.7)" />
        <rect x="230" y="170" width="84" height="14" rx="4" fill="rgba(143,169,214,.6)" />
        <path className="svg-flow" d="M258 66V196" stroke="#FFA800" strokeDasharray="3 4" />
      </svg>
    );

  if (kind === "leaf")
    return (
      <svg {...common}>
        <g transform="translate(200 128) rotate(-28)" stroke="rgba(255,255,255,.85)" strokeWidth="1.3">
          <path d="M-120 0C-70-70 60-75 120 0C60 75-70 70-120 0Z" fill="rgba(255,255,255,.05)" />
          <path d="M-120 0H120" />
          <path
            d="M-80 0l20-30M-40 0l22-40M0 0l22-42M40 0l20-36M80 0l14-22M-80 0l20 30M-40 0l22 40M0 0l22 42M40 0l20 36M80 0l14 22"
            strokeOpacity=".6"
          />
        </g>
        <rect x="70" y="40" width="260" height="170" rx="6" stroke="#FFA800" strokeDasharray="6 6" className="svg-flow" />
        <rect x="70" y="24" width="138" height="18" fill="#FFA800" />
        <text x="76" y="37" fontFamily={mono} fontSize="11" fill="#0B0B12">species · prediction</text>
      </svg>
    );

  if (kind === "face")
    return (
      <svg {...common}>
        <path d="M0 50H400M0 100H400M0 150H400M0 200H400M80 0V250M160 0V250M240 0V250M320 0V250" stroke="rgba(255,255,255,.18)" />
        <ellipse cx="200" cy="128" rx="54" ry="70" stroke="rgba(255,255,255,.85)" strokeWidth="1.3" fill="rgba(255,255,255,.04)" />
        <circle cx="181" cy="118" r="4" fill="#fff" />
        <circle cx="219" cy="118" r="4" fill="#fff" />
        <path d="M200 125v18M185 158q15 10 30 0" stroke="rgba(255,255,255,.8)" strokeWidth="1.3" />
        <path d="M130 52h22M130 52v22M270 52h-22M270 52v22M130 204h22M130 204v-22M270 204h-22M270 204v-22" stroke="#00FFE0" strokeWidth="2.5" />
        <g fill="#7FFFEF" className="svg-ping">
          <circle cx="181" cy="118" r="2" />
          <circle cx="219" cy="118" r="2" />
          <circle cx="200" cy="143" r="2" />
          <circle cx="185" cy="158" r="2" />
          <circle cx="215" cy="158" r="2" />
        </g>
        <rect x="276" y="52" width="92" height="18" fill="#00FFE0" />
        <text x="282" y="65" fontFamily={mono} fontSize="11" fill="#0B0B12">class · conf</text>
      </svg>
    );

  if (kind === "batirpro")
    return (
      <svg {...common}>
        <rect x="60" y="40" width="200" height="150" rx="10" fill="rgba(11,15,25,.7)" stroke="rgba(255,255,255,.5)" />
        <rect x="60" y="40" width="200" height="22" rx="10" fill="rgba(255,255,255,.08)" />
        <circle cx="74" cy="51" r="3" fill="#3D5A8A" />
        <circle cx="85" cy="51" r="3" fill="#FFA800" />
        <circle cx="96" cy="51" r="3" fill="#00FFE0" />
        <rect x="74" y="74" width="50" height="104" rx="5" fill="rgba(255,255,255,.06)" />
        <rect x="134" y="74" width="112" height="40" rx="5" fill="rgba(255,168,0,.85)" />
        <rect x="134" y="122" width="52" height="56" rx="5" fill="rgba(255,255,255,.08)" />
        <rect x="194" y="122" width="52" height="56" rx="5" fill="rgba(0,255,224,.35)" />
        <g transform="translate(290 70)" stroke="rgba(255,255,255,.85)" strokeWidth="1.3">
          <ellipse cx="30" cy="10" rx="30" ry="10" fill="rgba(11,15,25,.8)" />
          <path d="M0 10v70c0 6 13 10 30 10s30-4 30-10V10" />
          <path d="M0 34c0 6 13 10 30 10s30-4 30-10M0 58c0 6 13 10 30 10s30-4 30-10" />
        </g>
        <path d="M260 120h30" stroke="#FFA800" strokeDasharray="4 4" className="svg-flow" />
        <text x="292" y="186" fontFamily={mono} fontSize="11" fill="rgba(255,255,255,.7)">SQL</text>
      </svg>
    );

  return (
    <svg {...common}>
      <g stroke="rgba(255,255,255,.25)">
        <rect x="100" y="35" width="200" height="180" />
        <path d="M140 35v180M180 35v180M220 35v180M260 35v180M100 71h200M100 107h200M100 143h200M100 179h200" />
      </g>
      <rect x="140" y="107" width="40" height="36" fill="rgba(255,255,255,.12)" />
      <rect x="220" y="71" width="40" height="36" fill="rgba(255,255,255,.12)" />
      <rect x="180" y="179" width="40" height="36" fill="rgba(255,255,255,.12)" />
      <path
        d="M120 197H160V161H200V125H200V89H240V53H280"
        stroke="#FFA800"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeDasharray="6 5"
        className="svg-flow"
      />
      <circle cx="120" cy="197" r="8" fill="#3D5A8A" />
      <path d="M272 45l16 16M288 45l-16 16" stroke="#FFA800" strokeWidth="2.5" />
      <text x="306" y="58" fontFamily={mono} fontSize="11" fill="rgba(255,255,255,.75)">+R</text>
    </svg>
  );
}
