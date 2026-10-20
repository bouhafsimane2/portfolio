/* Mini-schémas animés des deux modules du projet phare. */
const mono = "var(--font-mono)";

export function MiniAnalytics() {
  return (
    <svg className="block h-auto w-full" viewBox="0 0 320 120" fill="none" aria-hidden>
      <g fontFamily={mono} fontSize="8.5" fill="#9AA7BD">
        <text x="0" y="22">pass. dr</text>
        <text x="0" y="46">brakng</text>
        <text x="0" y="70">HVAC FLT</text>
        <text x="0" y="94">panto dwn</text>
      </g>
      <path className="svg-flow" d="M50 19 H78 M54 43 H78 M48 67 H78 M50 91 H78" stroke="#5C6B84" strokeDasharray="3 4" />
      <rect x="80" y="8" width="64" height="16" rx="4" fill="rgba(255,168,0,.9)" />
      <rect x="84" y="28" width="56" height="16" rx="4" fill="rgba(127,255,239,.75)" />
      <rect x="88" y="48" width="48" height="16" rx="4" fill="rgba(147,180,232,.75)" />
      <rect x="92" y="68" width="40" height="16" rx="4" fill="rgba(127,167,232,.75)" />
      <rect x="96" y="88" width="32" height="16" rx="4" fill="rgba(143,169,214,.75)" />
      <g fontFamily={mono} fontSize="8" fill="#0B0F19" fontWeight="600">
        <text x="105" y="19.5">T1</text>
        <text x="105" y="39.5">T2</text>
        <text x="105" y="59.5">T3</text>
        <text x="105" y="79.5">T4</text>
        <text x="105" y="99.5">T5</text>
      </g>
      <path className="svg-flow" d="M148 56 H176" stroke="#FFA800" strokeWidth="1.5" strokeDasharray="4 4" />
      <g fontFamily={mono} fontSize="7.5" fill="#F2F5FA">
        {[["Doors", 22], ["Braking", 49], ["HVAC", 76]].map(([label, y]) => (
          <g key={label}>
            <rect x="178" y={y} width="62" height="14" rx="7" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.25)" />
            <text x="186" y={Number(y) + 10}>{label}</text>
          </g>
        ))}
      </g>
      <path className="svg-flow" d="M244 56 H262" stroke="#FFA800" strokeWidth="1.5" strokeDasharray="4 4" />
      <g className="svg-bars">
        <rect x="266" y="30" width="9" height="66" rx="2" fill="#FFA800" />
        <rect x="278" y="50" width="9" height="46" rx="2" fill="rgba(255,168,0,.7)" />
        <rect x="290" y="66" width="9" height="30" rx="2" fill="rgba(255,168,0,.5)" />
        <rect x="302" y="78" width="9" height="18" rx="2" fill="rgba(255,168,0,.35)" />
      </g>
      <path d="M270 30 Q285 18 306 14" stroke="#7FFFEF" strokeWidth="1.3" />
      <g fontFamily={mono} fontSize="7" fill="#5C6B84">
        <text x="0" y="116">raw reports</text>
        <text x="86" y="116">cascade</text>
        <text x="182" y="116">families</text>
        <text x="270" y="116">Pareto</text>
      </g>
    </svg>
  );
}

export function MiniRag() {
  return (
    <svg className="block h-auto w-full" viewBox="0 0 420 120" fill="none" aria-hidden>
      <g stroke="rgba(255,255,255,.6)">
        <rect x="4" y="32" width="28" height="38" rx="3" fill="rgba(255,255,255,.04)" transform="rotate(-6 18 51)" />
        <rect x="8" y="34" width="28" height="38" rx="3" fill="#0F1522" />
      </g>
      <g fill="rgba(255,255,255,.3)">
        <rect x="13" y="42" width="18" height="3" rx="1" />
        <rect x="13" y="49" width="14" height="3" rx="1" />
        <rect x="13" y="56" width="18" height="3" rx="1" />
      </g>
      <path className="svg-flow" d="M40 53 H52" stroke="#5C6B84" strokeDasharray="3 4" />
      <rect x="54" y="41" width="38" height="24" rx="6" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.3)" />
      <text x="62" y="56" fontFamily={mono} fontSize="8" fill="#F2F5FA">OCR</text>
      <path className="svg-flow" d="M94 53 H106" stroke="#5C6B84" strokeDasharray="3 4" />
      <g stroke="#93B4E8" fill="rgba(147,180,232,.15)">
        <rect x="108" y="34" width="34" height="10" rx="3" />
        <rect x="108" y="48" width="34" height="10" rx="3" />
        <rect x="108" y="62" width="34" height="10" rx="3" />
      </g>
      <path className="svg-flow" d="M146 53 H158" stroke="#5C6B84" strokeDasharray="3 4" />
      <g transform="translate(160 36)">
        <rect width="40" height="34" rx="6" fill="rgba(37,99,235,.25)" stroke="#7FA7E8" />
        <g fill="#7FFFEF">
          {[10, 18, 26].flatMap((cy, r) =>
            [9, 17, 25, 33].map((cx, c) => (
              <circle key={`${r}-${c}`} cx={cx} cy={cy} r="2" opacity={[1, 0.6, 1, 0.4, 0.5, 1, 0.7, 1, 1, 0.4, 1, 0.6][r * 4 + c]} />
            )),
          )}
        </g>
      </g>
      <path className="svg-flow" d="M202 53 C214 53 214 30 226 30 M202 53 C214 53 214 76 226 76" stroke="#5C6B84" strokeDasharray="3 4" />
      <rect x="228" y="20" width="50" height="20" rx="6" fill="rgba(37,99,235,.3)" stroke="#7FA7E8" />
      <text x="235" y="33" fontFamily={mono} fontSize="7.5" fill="#F2F5FA">Dense</text>
      <rect x="228" y="66" width="50" height="20" rx="6" fill="rgba(0,255,224,.12)" stroke="#7FFFEF" />
      <text x="236" y="79" fontFamily={mono} fontSize="7.5" fill="#F2F5FA">BM25</text>
      <path className="svg-flow" d="M280 30 C292 30 292 53 302 53 M280 76 C292 76 292 53 302 53" stroke="#FFA800" strokeWidth="1.4" strokeDasharray="4 4" />
      <circle cx="312" cy="53" r="10" fill="rgba(255,168,0,.18)" stroke="#FFA800" />
      <text x="307" y="56" fontFamily={mono} fontSize="8" fill="#FFA800">∑</text>
      <path className="svg-flow" d="M323 53 H336" stroke="#FFA800" strokeWidth="1.4" strokeDasharray="4 4" />
      <rect x="338" y="34" width="78" height="38" rx="9" fill="rgba(37,99,235,.22)" stroke="#7FA7E8" />
      <text x="346" y="46" fontFamily={mono} fontSize="7" fill="#7FA7E8">LLM</text>
      <rect x="346" y="51" width="50" height="3" rx="1.5" fill="rgba(255,255,255,.55)" />
      <rect x="346" y="58" width="14" height="8" rx="4" fill="rgba(255,168,0,.2)" stroke="#FFA800" />
      <rect x="364" y="58" width="14" height="8" rx="4" fill="rgba(255,168,0,.2)" stroke="#FFA800" />
      <g fontFamily={mono} fontSize="7" fill="#5C6B84">
        <text x="6" y="104">docs</text>
        <text x="60" y="104">OCR</text>
        <text x="104" y="104">chunks</text>
        <text x="160" y="104">embedding</text>
        <text x="232" y="104">hybrid</text>
        <text x="300" y="104">fusion</text>
        <text x="354" y="104">answer</text>
      </g>
    </svg>
  );
}
