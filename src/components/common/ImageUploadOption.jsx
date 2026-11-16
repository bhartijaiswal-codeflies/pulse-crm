import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, Check, RefreshCw, X } from 'lucide-react';

const COMPANY_PRESETS = [
  { name: 'AI Gradient', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&h=120&fit=crop' },
  { name: 'Cloud Blue', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=120&h=120&fit=crop' },
  { name: 'Creative Purple', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=120&h=120&fit=crop' },
  { name: 'Cyber Security', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&h=120&fit=crop' },
  { name: 'Logistics Teal', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=120&h=120&fit=crop' },
  { name: 'FinTech Indigo', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=120&h=120&fit=crop' },
  { name: 'Health Orange', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=120&h=120&fit=crop' },
  { name: 'Corporate Clean', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&h=120&fit=crop' }
];

const USER_PRESETS = [
  { name: 'Bobby Singh', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces' },
  { name: 'Elena Rostova', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces' },
  { name: 'Aisha Al-Mansoor', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces' },
  { name: 'Tech Lead', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces' },
  { name: 'Product Spec', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces' },
  { name: 'Operations Lead', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=faces' }
];

export const ImageUploadOption = ({
  value,
  onChange,
  label = 'Logo / Avatar Image',
  shape = 'rounded-xl',
  type = 'company'
}) => {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [customUrl, setCustomUrl] = useState(value || '');
  const fileInputRef = useRef(null);

  const presets = type === 'user' ? USER_PRESETS : COMPANY_PRESETS;
  const fallbackImage = presets[0].url;
  const displayImage = value || fallbackImage;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onChange(reader.result);
          setCustomUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = (e) => {
    e?.preventDefault();
    if (customUrl.trim()) {
      onChange(customUrl.trim());
      setShowUrlInput(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-[#172033] flex items-center justify-between">
        <span>{label}</span>
        <span className="text-[10px] text-[#8292AD] font-normal">PNG, JPG, WebP or presets</span>
      </label>

      <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-xl p-3 flex flex-col gap-3">
        {/* Top: Current Image Preview & Action Buttons */}
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0 group">
            <img
              src={displayImage}
              alt="Logo Preview"
              className={`w-14 h-14 ${shape} object-cover border border-[#E5EAF2] bg-white shadow-xs transition-transform group-hover:scale-105`}
              onError={(e) => {
                e.target.src = fallbackImage;
              }}
            />
            {value && (
              <button
                type="button"
                onClick={() => onChange(fallbackImage)}
                title="Reset to default"
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] shadow hover:bg-red-600 transition-colors"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            )}
          </div>

          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white hover:bg-slate-50 text-[#172033] border border-[#E5EAF2] rounded-lg shadow-2xs hover:border-blue-400 transition-all"
              >
                <Upload className="w-3.5 h-3.5 text-blue-600" />
                <span>Upload File</span>
              </button>

              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                  showUrlInput
                    ? 'bg-blue-50 text-blue-700 border-blue-300 font-semibold'
                    : 'bg-white text-slate-600 border-[#E5EAF2] hover:text-[#172033]'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>URL</span>
              </button>
            </div>
            <p className="text-[11px] text-[#8292AD] truncate">
              {value && value.startsWith('data:') ? 'Custom local image uploaded' : 'Select an image or pick a preset'}
            </p>
          </div>
        </div>

        {/* Optional URL Input */}
        {showUrlInput && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-100">
            <input
              type="url"
              placeholder="https://example.com/logo.png"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs bg-white rounded-lg border border-[#E5EAF2] focus:border-blue-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleApplyUrl}
              className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Apply
            </button>
          </div>
        )}

        {/* Presets Grid */}
        <div className="pt-2 border-t border-[#E5EAF2]/60">
          <p className="text-[10px] font-bold text-[#8292AD] uppercase tracking-wider mb-1.5">
            Quick Presets
          </p>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {presets.map((preset) => {
              const isSelected = value === preset.url;
              return (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    onChange(preset.url);
                    setCustomUrl(preset.url);
                  }}
                  title={preset.name}
                  className={`relative flex-shrink-0 w-8 h-8 ${shape} overflow-hidden border transition-all ${
                    isSelected
                      ? 'ring-2 ring-blue-600 border-white scale-105'
                      : 'border-[#E5EAF2] hover:border-blue-400 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-blue-600/30 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
