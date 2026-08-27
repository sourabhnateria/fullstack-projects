import Image from "next/image";

type SectionHeadingProps = {
  title: string;
  className?: string;
  light?: boolean;
};

export default function SectionHeading({ title, className = "", light = false }: SectionHeadingProps) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className={`font-display text-2xl font-semibold sm:text-3xl ${light ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      <Image
        src="/images/divider.png"
        alt=""
        width={1000}
        height={150}
        className="mx-auto mt-3 h-6 w-48"
      />
    </div>
  );
}
