"use client";

import { createContext, useCallback, useContext, useState } from "react";

type ToastType = "success" | "info" | "warning";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

const ToastContext = createContext<{
  addToast: (message: string, type?: ToastType) => void;
}>({ addToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

let nextId = 0;

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "success") => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  return (
    <ToastContext value={{ addToast }}>
      {children}
      <div className="toastContainer">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <span className="toastIcon">
              {toast.type === "success" ? "✓" : toast.type === "warning" ? "!" : "i"}
            </span>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext>
  );
}
