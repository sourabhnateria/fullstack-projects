"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Variant = "up" | "down" | "left" | "right" | "zoom" | "fade" | "growX";

type ScrollRevealProps = {
  children?: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: Variant;
  style?: CSSProperties;
};

const hiddenStyles: Record<Variant, string> = {
  up: "translate-y-6 opacity-0",
  down: "-translate-y-6 opacity-0",
  left: "translate-x-6 opacity-0",
  right: "-translate-x-6 opacity-0",
  zoom: "scale-95 opacity-0",
  fade: "opacity-0",
  growX: "origin-left scale-x-0",
};

const visibleStyles: Record<Variant, string> = {
  up: "translate-y-0 opacity-100",
  down: "translate-y-0 opacity-100",
  left: "translate-x-0 opacity-100",
  right: "translate-x-0 opacity-100",
  zoom: "scale-100 opacity-100",
  fade: "opacity-100",
  growX: "origin-left scale-x-100",
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 1300,
  variant = "up",
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all ${
        visible ? visibleStyles[variant] : hiddenStyles[variant]
      } ${className}`}
      style={{
        ...style,
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {children}
    </div>
  );
}
