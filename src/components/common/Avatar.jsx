import React, { useState } from 'react';

export const CompanyAvatar = ({ src, name, className = "w-9 h-9" }) => {
  const [hasError, setHasError] = useState(false);

  const initials = name
    ? name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'CO';

  // Deterministic pastel color based on name
  const colors = [
    'from-blue-500 to-blue-700',
    'from-indigo-500 to-purple-600',
    'from-cyan-500 to-blue-600',
    'from-emerald-500 to-teal-700',
    'from-violet-500 to-purple-700',
  ];
  const charCode = name ? name.charCodeAt(0) : 0;
  const gradient = colors[charCode % colors.length];

  if (hasError || !src) {
    return (
      <div
        className={`${className} rounded-xl bg-gradient-to-br ${gradient} text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs border border-white/20`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setHasError(true)}
      className={`${className} rounded-xl object-cover border border-[#E5EAF2] flex-shrink-0 bg-slate-50`}
    />
  );
};
