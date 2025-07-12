import React from "react";

interface BeeMascotProps {
  className?: string;
}

const BeeMascot: React.FC<BeeMascotProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="32" cy="40" rx="18" ry="12" fill="#FFD600" stroke="#1e293b" strokeWidth="2" />
    <ellipse cx="32" cy="32" rx="14" ry="18" fill="#FFD600" stroke="#1e293b" strokeWidth="2" />
    <ellipse cx="22" cy="28" rx="4" ry="8" fill="#fff" stroke="#2563eb" strokeWidth="2" />
    <ellipse cx="42" cy="28" rx="4" ry="8" fill="#fff" stroke="#2563eb" strokeWidth="2" />
    <ellipse cx="32" cy="36" rx="3" ry="8" fill="#1e293b" />
    <circle cx="26" cy="24" r="2" fill="#1e293b" />
    <circle cx="38" cy="24" r="2" fill="#1e293b" />
    <path d="M28 20 Q32 18 36 20" stroke="#1e293b" strokeWidth="2" fill="none" />
    <path d="M16 12 Q20 8 24 12" stroke="#2563eb" strokeWidth="2" fill="none" />
    <path d="M48 12 Q44 8 40 12" stroke="#2563eb" strokeWidth="2" fill="none" />
  </svg>
);

export default BeeMascot; 