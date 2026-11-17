import React, { useEffect } from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

export const DeleteConfirmModal = ({
  isOpen,
  title = 'Delete Item',
  itemName = '',
  itemSubtitle = '',
  itemImage = null,
  warningMessage = 'Are you sure you want to delete this record? This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  onConfirm,
  onClose
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px] z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      {/* Backdrop overlay */}
      <div
        className="fixed top-10 bottom-0 right-0 left-0 md:left-[76px]"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#0D152D] rounded-2xl shadow-2xl border border-[#E5EAF2] dark:border-[#1A2548] p-5 sm:p-6 z-10 animate-in zoom-in-95 duration-150 text-center">
        {/* Close 'X' Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Warning Icon Badge */}
        <div className="w-13 h-13 sm:w-14 sm:h-14 mx-auto rounded-full bg-red-50 dark:bg-rose-950/50 border border-red-200 dark:border-rose-900/60 flex items-center justify-center text-red-600 dark:text-rose-400 mb-3.5 shadow-xs">
          <Trash2 className="w-6 h-6 sm:w-6.5 sm:h-6.5 stroke-[2]" />
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-[#172033] dark:text-white tracking-tight">
          {title}
        </h3>

        {/* Warning Prose */}
        <p className="text-xs text-[#8292AD] dark:text-slate-400 mt-2 leading-relaxed px-1 sm:px-3">
          {warningMessage}
        </p>

        {/* Item Target Preview Card */}
        {itemName && (
          <div className="mt-4 p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#0A1128] border border-[#E5EAF2] dark:border-[#1A2548] flex items-center gap-3 text-left">
            {itemImage ? (
              <img
                src={itemImage}
                alt={itemName}
                className="w-10 h-10 rounded-xl object-cover border border-[#E5EAF2] dark:border-[#1E2D54] flex-shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-rose-950/80 text-red-600 dark:text-rose-400 font-bold flex items-center justify-center text-sm flex-shrink-0 border border-red-200 dark:border-rose-900">
                {itemName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-bold text-[#172033] dark:text-white truncate">
                {itemName}
              </p>
              {itemSubtitle && (
                <p className="text-[11px] text-[#8292AD] dark:text-slate-400 truncate mt-0.5">
                  {itemSubtitle}
                </p>
              )}
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 flex-shrink-0">
              Confirm Delete
            </span>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="mt-5 pt-3 border-t border-[#E5EAF2] dark:border-[#1A2548] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold text-[#8292AD] dark:text-slate-400 hover:text-[#172033] dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-[#E5EAF2] dark:border-[#1A2548] cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 sm:flex-initial px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

