import React, { useState, useEffect } from 'react';
import { ToastContext } from './useToast';

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed right-7 top-8 bg-[#1d1d1f] text-white px-4 py-3 rounded-xl text-[13px] font-medium flex items-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.2)] z-[999] animate-[slideIn_0.3s_ease]">
          {toast.type === "success" ? <CheckIcon /> : <XIcon />}
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
