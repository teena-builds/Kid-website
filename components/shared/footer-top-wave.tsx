export function FooterTopWave() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 overflow-hidden bg-white sm:h-36 lg:h-44"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 2880 220"
        className="footer-top-wave relative h-full w-[200%] text-[#fdebd5]"
        preserveAspectRatio="none"
      >
        <path
          d="M0,96 C160,28 320,164 480,96 C640,28 800,164 960,96 C1120,28 1280,164 1440,96 L1440,220 L0,220 Z M1440,96 C1600,28 1760,164 1920,96 C2080,28 2240,164 2400,96 C2560,28 2720,164 2880,96 L2880,220 L1440,220 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
