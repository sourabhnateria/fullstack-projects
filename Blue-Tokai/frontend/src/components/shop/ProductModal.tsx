"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const close = useCallback(() => router.back(), [router]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [close]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 py-10 overflow-y-auto bg-black/50"
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl p-8 bg-white rounded-lg shadow-xl"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute flex items-center justify-center w-8 h-8 text-gray-500 rounded-full top-4 right-4 hover:bg-gray-100"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
