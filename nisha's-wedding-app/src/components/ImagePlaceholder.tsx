type ImagePlaceholderProps = {
  label: string;
  className?: string;
  tone?: "warm" | "dark" | "deep";
};

const tones: Record<string, string> = {
  warm: "from-[#caa666] via-[#8a5a3c] to-[#3c2a24]",
  dark: "from-[#2b3a5c] via-[#182642] to-[#0a1529]",
  deep: "from-[#4a3320] via-[#241a14] to-[#120e0b]",
};

export default function ImagePlaceholder({ label, className = "", tone = "warm" }: ImagePlaceholderProps) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${tones[tone]} ${className}`}
    >
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.5),transparent_40%)]" />
      <span className="relative px-4 text-center text-xs font-medium uppercase tracking-wide-xs text-white/70">
        {label}
      </span>
    </div>
  );
}
