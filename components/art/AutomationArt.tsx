/* Illustrations animées des workflows de l'Automation Lab. */
const mono = "var(--font-mono)";

export function AutomationArt({ kind }: { kind: "doc" | "rag" | "support" }) {
  const common = { className: "absolute inset-x-0 bottom-0 top-[38px] h-[calc(100%-38px)] w-full", viewBox: "0 0 400 220", fill: "none", "aria-hidden": true } as const;

  if (kind === "doc")
    return (
      <svg {...common}>
        <g transform="translate(40 26)">
          <rect width="104" height="136" rx="8" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.7)" />
          <path d="M78 0v24h26" stroke="rgba(255,255,255,.7)" />
          <rect x="14" y="20" width="44" height="7" rx="2" fill="rgba(255,255,255,.55)" />
          <g fill="rgba(255,255,255,.25)">
            <rect x="14" y="40" width="76" height="5" rx="2" />
            <rect x="14" y="52" width="62" height="5" rx="2" />
            <rect x="14" y="64" width="70" height="5" rx="2" />
            <rect x="14" y="84" width="40" height="5" rx="2" />
            <rect x="60" y="84" width="30" height="5" rx="2" />
            <rect x="14" y="96" width="40" height="5" rx="2" />
            <rect x="60" y="96" width="30" height="5" rx="2" />
          </g>
          <rect x="58" y="108" width="34" height="16" rx="3" stroke="#7FFFEF" />
          <rect className="svg-scan" x="-6" y="0" width="116" height="3" fill="#7FFFEF" />
        </g>
        <path className="svg-flow" d="M152 94 C190 94 190 70 228 70" stroke="#7FFFEF" strokeWidth="1.5" strokeDasharray="5 6" />
        <g transform="translate(232 40)">
          <rect width="92" height="62" rx="8" fill="rgba(11,15,25,.75)" stroke="rgba(103,232,249,.6)" />
          <g fontFamily={mono} fontSize="9" fill="#7FFFEF">
            <text x="10" y="18">invoice_no</text>
            <text x="10" y="34">date</text>
            <text x="10" y="50">total</text>
          </g>
          <g fill="rgba(255,255,255,.4)">
            <rect x="62" y="11" width="22" height="8" rx="2" />
            <rect x="48" y="27" width="36" height="8" rx="2" />
            <rect x="52" y="43" width="32" height="8" rx="2" />
          </g>
        </g>
        <g transform="translate(250 122)" stroke="rgba(255,255,255,.8)" strokeWidth="1.3">
          <ellipse cx="22" cy="7" rx="22" ry="7" fill="rgba(11,15,25,.8)" />
          <path d="M0 7v40c0 4 10 7 22 7s22-3 22-7V7M0 27c0 4 10 7 22 7s22-3 22-7" />
        </g>
        <circle cx="306" cy="168" r="11" fill="#FFA800" />
        <path d="M301 168l4 4 7-8" stroke="#0B0B12" strokeWidth="2" strokeLinecap="round" />
        <g transform="translate(340 120)">
          <path d="M10 26V16a10 10 0 0120 0v10l4 5H6z" stroke="rgba(255,255,255,.8)" strokeWidth="1.3" fill="rgba(255,255,255,.06)" />
          <circle className="svg-ping" cx="30" cy="8" r="5" fill="#3D5A8A" />
        </g>
      </svg>
    );

  if (kind === "rag")
    return (
      <svg {...common}>
        <g transform="translate(34 50)" stroke="rgba(255,255,255,.7)">
          <rect x="16" y="0" width="70" height="92" rx="6" fill="rgba(255,255,255,.04)" transform="rotate(8 51 46)" />
          <rect x="8" y="4" width="70" height="92" rx="6" fill="rgba(255,255,255,.05)" transform="rotate(-4 43 50)" />
          <rect x="0" y="10" width="70" height="92" rx="6" fill="rgba(20,16,36,.95)" />
        </g>
        <g fill="rgba(255,255,255,.25)">
          <rect x="44" y="76" width="50" height="4" rx="2" />
          <rect x="44" y="86" width="40" height="4" rx="2" />
          <rect x="44" y="96" width="46" height="4" rx="2" />
          <rect x="44" y="122" width="44" height="4" rx="2" />
          <rect x="44" y="132" width="50" height="4" rx="2" />
        </g>
        <rect className="svg-ping" x="40" y="104" width="58" height="12" rx="3" fill="rgba(255,168,0,.35)" stroke="#FFA800" />
        <g transform="translate(108 64)">
          <circle cx="20" cy="20" r="15" stroke="#7FA7E8" strokeWidth="2.5" fill="rgba(37,99,235,.15)" />
          <path d="M31 31l12 12" stroke="#7FA7E8" strokeWidth="3" strokeLinecap="round" />
        </g>
        <path className="svg-flow" d="M162 110 C190 110 196 100 218 100" stroke="#7FA7E8" strokeWidth="1.5" strokeDasharray="5 6" />
        <g transform="translate(222 46)">
          <rect width="150" height="96" rx="14" fill="rgba(37,99,235,.18)" stroke="rgba(127,167,232,.6)" />
          <g fill="rgba(255,255,255,.55)">
            <rect x="14" y="16" width="112" height="6" rx="3" />
            <rect x="14" y="30" width="96" height="6" rx="3" />
            <rect x="14" y="44" width="104" height="6" rx="3" />
          </g>
          <rect x="14" y="64" width="34" height="16" rx="8" fill="rgba(255,168,0,.15)" stroke="#FFA800" />
          <rect x="54" y="64" width="34" height="16" rx="8" fill="rgba(255,168,0,.15)" stroke="#FFA800" />
          <g fontFamily={mono} fontSize="9" fill="#FFA800">
            <text x="23" y="76">[1]</text>
            <text x="63" y="76">[2]</text>
          </g>
        </g>
        <path d="M236 142l-6 12 16-12" fill="rgba(37,99,235,.18)" stroke="rgba(127,167,232,.6)" />
      </svg>
    );

  return (
    <svg {...common}>
      {[
        [26, 44, 56],
        [36, 86, 48],
        [26, 128, 60],
      ].map(([x, y, w]) => (
        <g key={y} transform={`translate(${x} ${y})`}>
          <rect width="88" height="26" rx="12" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.5)" />
          <rect x="12" y="11" width={w} height="5" rx="2" fill="rgba(255,255,255,.45)" />
        </g>
      ))}
      <path d="M120 57 C150 57 150 99 172 99M130 99H172M120 141 C150 141 150 99 172 99" stroke="rgba(255,255,255,.35)" strokeWidth="1.3" />
      <g transform="translate(200 99)">
        <rect x="-26" y="-26" width="52" height="52" rx="10" transform="rotate(45)" fill="rgba(61,90,138,.18)" stroke="#8FA9D6" strokeWidth="1.5" />
        <text x="-13" y="4" fontFamily={mono} fontSize="10" fill="#8FA9D6">NLP</text>
      </g>
      <path className="svg-flow" d="M237 99 C262 99 262 58 290 58" stroke="#FFA800" strokeWidth="1.5" strokeDasharray="5 6" />
      <path className="svg-flow" d="M237 99 C262 99 262 142 290 142" stroke="#8FA9D6" strokeWidth="1.5" strokeDasharray="5 6" />
      <g transform="translate(294 34)">
        <rect width="76" height="46" rx="10" fill="rgba(255,168,0,.1)" stroke="#FFA800" />
        <rect x="12" y="12" width="20" height="16" rx="4" stroke="#FFA800" strokeWidth="1.5" />
        <circle cx="18" cy="20" r="1.8" fill="#FFA800" />
        <circle cx="26" cy="20" r="1.8" fill="#FFA800" />
        <text x="38" y="25" fontFamily={mono} fontSize="9" fill="#FFA800">FAQ</text>
      </g>
      <g transform="translate(294 118)">
        <rect width="76" height="46" rx="10" fill="rgba(61,90,138,.12)" stroke="#8FA9D6" />
        <circle cx="22" cy="18" r="6" stroke="#8FA9D6" strokeWidth="1.5" />
        <path d="M12 36c2-6 6-8 10-8s8 2 10 8" stroke="#8FA9D6" strokeWidth="1.5" />
        <text x="38" y="27" fontFamily={mono} fontSize="9" fill="#8FA9D6">Agent</text>
      </g>
    </svg>
  );
}
