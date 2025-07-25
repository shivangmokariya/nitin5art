import React from 'react';

const Loader: React.FC = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin-slow"
    >
      {/* Brush handle */}
      <rect x="28" y="8" width="8" height="32" rx="4" fill="#8B5C2A" />
      {/* Brush ferrule */}
      <rect x="28" y="40" width="8" height="6" rx="3" fill="#C0C0C0" />
      {/* Brush bristles */}
      <ellipse cx="32" cy="50" rx="12" ry="6" fill="#3B82F6">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 32 32"
          to="360 32 32"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </ellipse>
      {/* Paint drop */}
      <circle cx="32" cy="60" r="3" fill="#F59E42">
        <animate
          attributeName="cy"
          values="60;54;60"
          dur="1.2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;0.7;1"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
    <style jsx>{`
      .animate-spin-slow {
        animation: spin 1.2s linear infinite;
      }
      @keyframes spin {
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default Loader; 