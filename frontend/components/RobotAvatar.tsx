interface RobotAvatarProps {
  size?: number;
  className?: string;
}

export default function RobotAvatar({ size = 42, className = '' }: RobotAvatarProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Cute robot assistant"
    >
      <defs>
        <linearGradient id="robotFace" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f7fbff" />
          <stop offset="1" stopColor="#e0ecff" />
        </linearGradient>
        <linearGradient id="robotBody" x1="32" y1="66" x2="88" y2="110" gradientUnits="userSpaceOnUse">
          <stop stopColor="#eaf3ff" />
          <stop offset="1" stopColor="#d9e7ff" />
        </linearGradient>
      </defs>

      <rect x="42" y="7" width="36" height="10" rx="5" fill="#8fb8f7" />
      <circle cx="60" cy="7" r="6" fill="#1f7fed" />
      <rect x="16" y="16" width="88" height="60" rx="26" fill="url(#robotFace)" stroke="#b7cff5" strokeWidth="3" />
      <circle cx="44" cy="43" r="15" fill="#1f7fed" />
      <circle cx="76" cy="43" r="15" fill="#1f7fed" />
      <circle cx="44" cy="43" r="8" fill="#072c61" />
      <circle cx="76" cy="43" r="8" fill="#072c61" />
      <circle cx="48" cy="39" r="3.5" fill="#fff" />
      <circle cx="80" cy="39" r="3.5" fill="#fff" />
      <path d="M44 62C48.5 67.2 53.8 70 60 70C66.2 70 71.5 67.2 76 62" stroke="#1a4f92" strokeWidth="4" strokeLinecap="round" />
      <rect x="31" y="75" width="58" height="35" rx="17" fill="url(#robotBody)" stroke="#b7cff5" strokeWidth="3" />
      <rect x="54" y="82" width="12" height="20" rx="5" fill="#1aa9c4" />
      <circle cx="27" cy="91" r="7" fill="#1f7fed" />
      <circle cx="93" cy="91" r="7" fill="#1f7fed" />
      <path d="M19 24L8 34" stroke="#97b8ea" strokeWidth="4" strokeLinecap="round" />
      <path d="M101 24L112 34" stroke="#97b8ea" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
