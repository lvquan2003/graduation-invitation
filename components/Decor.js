export const Sparkle = ({ className = "", style }) => (
  <svg className={`spark ${className}`} style={style} viewBox="0 0 24 24" aria-hidden>
    <path d="M12 0C13 8 16 11 24 12 16 13 13 16 12 24 11 16 8 13 0 12 8 11 11 8 12 0Z" />
  </svg>
);
export const Tulip = ({ className = "", flip }) => (
  <svg className={className} style={flip ? { transform: "scaleX(-1)" } : null} viewBox="0 0 80 140" aria-hidden>
    <path d="M40 138C40 100 40 70 40 50" stroke="#8fb39a" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M40 120C20 112 12 92 14 76 28 84 38 98 40 120Z" fill="#a9c9b2" />
    <path d="M40 108C58 100 66 84 64 70 52 78 42 90 40 108Z" fill="#b9d6c0" />
    <path d="M18 34C16 52 26 66 40 66 54 66 64 52 62 34 56 40 50 30 40 22 30 30 24 40 18 34Z" fill="#9fc0e6" />
    <path d="M40 22C34 34 34 52 40 66 46 52 46 34 40 22Z" fill="#c4daf3" />
  </svg>
);
export const Sprig = ({ className = "", flip }) => (
  <svg className={className} style={flip ? { transform: "scaleX(-1)" } : null} viewBox="0 0 120 60" aria-hidden>
    <path d="M4 52C40 46 80 34 116 8" stroke="#8fb39a" strokeWidth="2" fill="none" strokeLinecap="round" />
    {[[24,46,-30],[44,41,30],[62,35,-30],[82,27,30],[100,17,-30]].map(([x, y, r], i) => (
      <ellipse key={i} cx={x} cy={y} rx="9" ry="4" fill={i % 2 ? "#b9d6c0" : "#a9c9b2"} transform={`rotate(${r} ${x} ${y})`} />
    ))}
  </svg>
);
export const Cloud = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 120 50" aria-hidden>
    <path d="M24 44a16 16 0 0 1 2-32 22 22 0 0 1 42-4 18 18 0 0 1 28 14 14 14 0 0 1-2 22Z" fill="#fff" />
  </svg>
);
