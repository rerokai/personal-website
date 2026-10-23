export default function SvgTitle({ children, width = 400 }) {
  return (
    <svg
      width={width}
      height="100"
      viewBox={`0 0 ${width} 100`}
      role="img"
      aria-label={children}
    >
      <text
        x="10"
        y="75"
        fontSize="85"
        fontFamily="Bai Jamjuree"
        fontWeight="600"
        fill="black"
        stroke="black"
        strokeWidth="1.5"
        strokeDasharray="6 6"
      >
        {children}
      </text>
    </svg>
  );
}
