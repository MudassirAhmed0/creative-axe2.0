export function LogoIcon({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background rounded square */}
      <rect width="120" height="120" rx="24" fill="#f97316" />

      {/* Letter C - left side, bold geometric */}
      <path
        d="M52 32C36.536 32 24 44.536 24 60C24 75.464 36.536 88 52 88C58.4 88 64.3 85.8 69 82.2L62 73.6C59.2 75.8 55.7 77 52 77C42.611 77 35 69.389 35 60C35 50.611 42.611 43 52 43C55.7 43 59.2 44.2 62 46.4L69 37.8C64.3 34.2 58.4 32 52 32Z"
        fill="#09090b"
      />

      {/* Letter A - right side, with axe blade cut */}
      <path
        d="M72 88L58 52H58L52 36H64L78 72H88L76 36H88L96 60L88 88H78L82 77H68L72 88Z"
        fill="#09090b"
      />

      {/* Axe blade - diagonal slash cutting through */}
      <path
        d="M78 24L68 48L86 32L78 24Z"
        fill="#fafafa"
        opacity="0.95"
      />
      <path
        d="M70 46L66 56L78 44L70 46Z"
        fill="#fafafa"
        opacity="0.6"
      />
    </svg>
  );
}

export function LogoIconDark({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Dark background */}
      <rect width="120" height="120" rx="24" fill="#18181b" />

      {/* Letter C */}
      <path
        d="M50 34C35.641 34 24 45.641 24 60C24 74.359 35.641 86 50 86C56 86 61.5 84 66 80.6L60 73C57.5 75 54 76.2 50 76.2C41.163 76.2 34 69.037 34 60.2C34 51.363 41.163 44.2 50 44.2C54 44.2 57.5 45.4 60 47.4L66 39.8C61.5 36.4 56 34 50 34Z"
        fill="#f97316"
      />

      {/* Letter A */}
      <path
        d="M80 86L66 50L60 34H70L84 70H92L80 34H90L98 58L90 86H82L86 74H72L76 86H80Z"
        fill="#fafafa"
      />

      {/* Axe blade accent */}
      <path
        d="M82 24L72 46L90 30L82 24Z"
        fill="#f97316"
        opacity="0.8"
      />
    </svg>
  );
}

export function LogoFull({
  height = 32,
  className = "",
  variant = "dark",
}: {
  height?: number;
  className?: string;
  variant?: "dark" | "light";
}) {
  const scale = height / 32;
  const width = 200 * scale;
  const textColor = variant === "dark" ? "#fafafa" : "#09090b";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Icon mark */}
      <rect width="32" height="32" rx="7" fill="#f97316" />
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fill="#09090b"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="16"
      >
        CA
      </text>
      {/* Axe slash on icon */}
      <path d="M22 4L18 14L26 8L22 4Z" fill="#fafafa" opacity="0.9" />

      {/* Text: Creative */}
      <text
        x="44"
        y="22"
        fill={textColor}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="16"
        letterSpacing="-0.02em"
      >
        Creative
      </text>

      {/* Text: Axe */}
      <text
        x="120"
        y="22"
        fill="#f97316"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="16"
        letterSpacing="-0.02em"
      >
        Axe
      </text>
    </svg>
  );
}

export function LogoMark({
  size = 48,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer ring */}
      <circle cx="100" cy="100" r="96" stroke="#27272a" strokeWidth="2" />

      {/* Background */}
      <circle cx="100" cy="100" r="88" fill="#18181b" />

      {/* Axe shape - the main brand element */}
      {/* Axe handle */}
      <rect
        x="92"
        y="70"
        width="8"
        height="80"
        rx="3"
        fill="#71717a"
        transform="rotate(-15 96 110)"
      />

      {/* Axe head - sharp geometric blade */}
      <path
        d="M70 45L105 65L100 85L60 70Z"
        fill="#f97316"
      />
      {/* Blade edge highlight */}
      <path
        d="M65 50L70 45L60 70L55 60Z"
        fill="#fb923c"
      />
      {/* Blade back */}
      <path
        d="M105 65L110 55L108 70L100 85Z"
        fill="#ea580c"
      />

      {/* C letter overlay */}
      <text
        x="78"
        y="138"
        fill="#fafafa"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="52"
        letterSpacing="-0.03em"
      >
        C
      </text>

      {/* A letter overlay */}
      <text
        x="112"
        y="138"
        fill="#f97316"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="52"
        letterSpacing="-0.03em"
      >
        A
      </text>
    </svg>
  );
}

export function LogoStacked({
  width = 160,
  className = "",
}: {
  width?: number;
  className?: string;
}) {
  const scale = width / 160;
  const height = 100 * scale;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 160 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Icon centered */}
      <rect x="52" y="2" width="56" height="56" rx="14" fill="#f97316" />

      {/* CA text on icon */}
      <text
        x="80"
        y="40"
        textAnchor="middle"
        fill="#09090b"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="28"
        letterSpacing="-0.03em"
      >
        CA
      </text>

      {/* Axe slash on icon */}
      <path d="M92 8L82 28L100 16L92 8Z" fill="#fafafa" opacity="0.85" />

      {/* CREATIVE text */}
      <text
        x="80"
        y="80"
        textAnchor="middle"
        fill="#fafafa"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="14"
        letterSpacing="0.08em"
      >
        CREATIVE
      </text>

      {/* AXE text */}
      <text
        x="80"
        y="96"
        textAnchor="middle"
        fill="#f97316"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="14"
        letterSpacing="0.12em"
      >
        AXE
      </text>
    </svg>
  );
}
