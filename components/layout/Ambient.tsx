/* Fond "deep space" : orbes lumineux, grille et grain. 100 % CSS, zéro JS. */
export function Ambient() {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
        <div
          className="absolute -top-[12vw] -left-[14vw] size-[52vw] rounded-full opacity-40 blur-[90px] will-change-transform"
          style={{
            background: "radial-gradient(circle,#1F5FD6 0%,transparent 65%)",
            animation: "drift-a 22s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute top-[30vh] -right-[12vw] size-[44vw] rounded-full opacity-35 blur-[90px] will-change-transform"
          style={{
            background: "radial-gradient(circle,#3D5A8A 0%,transparent 65%)",
            animation: "drift-b 26s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute -bottom-[18vw] left-[30vw] size-[38vw] rounded-full opacity-20 blur-[90px] will-change-transform"
          style={{
            background: "radial-gradient(circle,#1E88E5 0%,transparent 65%)",
            animation: "drift-a 30s ease-in-out infinite alternate-reverse",
          }}
        />
      </div>
      <div aria-hidden className="grid-bg pointer-events-none fixed inset-0 -z-10 opacity-50" />
      <div aria-hidden className="grain z-[100]" />
    </>
  );
}
