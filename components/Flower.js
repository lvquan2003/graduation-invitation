// Hoa baby tự vẽ bằng SVG
export default function Flower({ className = "", flip = false }) {
  const dots = [[40,40,9],[62,30,7],[84,44,10],[104,32,6],[52,64,6],[76,66,8],[96,62,6],[30,62,5],[118,52,5],[66,48,5]];
  return (
    <svg className={className} viewBox="0 0 150 120" style={flip ? { transform: "scaleX(-1)" } : null} aria-hidden>
      <g stroke="#9db08a" strokeWidth="1.4" fill="none" strokeLinecap="round">
        <path d="M75 118 C70 90 50 70 40 40" /><path d="M75 118 C78 90 90 70 84 44" />
        <path d="M75 118 C85 95 105 80 104 32" /><path d="M75 118 C60 100 40 90 30 62" />
      </g>
      {dots.map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill="#f3d3d0" />
          <circle cx={x} cy={y} r={r * 0.45} fill="#e6a9ab" />
        </g>
      ))}
    </svg>
  );
}
