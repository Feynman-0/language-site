const GlobeSvg = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <ellipse cx="50" cy="50" rx="30" ry="45" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <ellipse cx="50" cy="50" rx="15" ry="45" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="5" y1="35" x2="95" y2="35" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="5" y1="65" x2="95" y2="65" stroke="currentColor" strokeWidth="1" opacity="0.3" />
  </svg>
);

export default GlobeSvg;
