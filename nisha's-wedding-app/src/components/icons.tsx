type IconProps = {
  className?: string;
};

const base = "h-6 w-6";

export function ShieldIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <path d="M12 3l7 3v5.2c0 4.6-3 7.8-7 9.3-4-1.5-7-4.7-7-9.3V6l7-3z" strokeLinejoin="round" />
      <path d="M9 12.2l2 2 4-4.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UsersIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <circle cx="8.5" cy="8" r="2.6" />
      <circle cx="16" cy="9" r="2.1" />
      <path d="M3.5 19c.4-3 2.4-4.8 5-4.8s4.6 1.8 5 4.8" strokeLinecap="round" />
      <path d="M14.2 14.6c2.1.2 3.7 1.8 4.1 4.4" strokeLinecap="round" />
    </svg>
  );
}

export function BadgeIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <circle cx="12" cy="9.5" r="5" />
      <path d="M9 13.8L7.5 21l4.5-2.4 4.5 2.4-1.5-7.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeartIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <path
        d="M12 20s-7.5-4.6-9.6-9.4C1.2 7.2 3 4.2 6.2 3.8c2-.3 3.6.7 5.8 3 2.2-2.3 3.8-3.3 5.8-3 3.2.4 5 3.4 3.8 6.8C19.5 15.4 12 20 12 20z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MandapIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <path d="M12 2l2.6 3H9.4L12 2z" strokeLinejoin="round" />
      <path d="M4 6h16" strokeLinecap="round" />
      <path d="M6 6v14M18 6v14M12 6v14" strokeLinecap="round" />
      <path d="M4 20h16" strokeLinecap="round" />
    </svg>
  );
}

export function PlatterIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <ellipse cx="12" cy="12" rx="9" ry="3.4" />
      <ellipse cx="12" cy="12" rx="4.2" ry="1.6" />
      <path d="M3 12v3c0 1.9 4 3.4 9 3.4s9-1.5 9-3.4v-3" strokeLinecap="round" />
    </svg>
  );
}

export function LotusIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <path d="M12 4c1.6 2 1.6 5 0 7-1.6-2-1.6-5 0-7z" />
      <path d="M6 8c2.4.8 4 2.8 4.4 5.2C7.8 13 5.6 11.2 5 8.8" />
      <path d="M18 8c-2.4.8-4 2.8-4.4 5.2 2.6.2 4.8-1.6 5.4-4" />
      <path d="M4 15c3 3.4 13 3.4 16 0" strokeLinecap="round" />
    </svg>
  );
}

export function BellIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <path d="M6 17c0-3.6.8-6.8 6-6.8s6 3.2 6 6.8" strokeLinecap="round" />
      <path d="M4.5 17h15" strokeLinecap="round" />
      <path d="M12 10.2V7.5" strokeLinecap="round" />
      <circle cx="12" cy="6" r="1.3" />
    </svg>
  );
}

export function PaletteIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <path
        d="M12 4c-4.6 0-8 3.2-8 7.2 0 3.9 3.2 6.8 7.2 6.8.8 0 1.3-.6 1.1-1.4-.2-.7 0-1.2.7-1.2H14c3.3 0 6-2.4 6-6.1C20 6.5 16.6 4 12 4z"
        strokeLinejoin="round"
      />
      <circle cx="8.6" cy="9.4" r=".9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.6" r=".9" fill="currentColor" stroke="none" />
      <circle cx="15.4" cy="9.4" r=".9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ChairIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <path d="M7 5v8c0 1.8 1 3 3 3h4c2 0 3-1.2 3-3V5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 16v4M16 16v4" strokeLinecap="round" />
      <path d="M7 9h10" strokeLinecap="round" />
    </svg>
  );
}

export function KeyIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <circle cx="7" cy="12" r="3.2" />
      <path d="M10.2 12H20M16.5 12v3M19 12v3" strokeLinecap="round" />
    </svg>
  );
}

export function TruckIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <path d="M3 7h10v8H3z" strokeLinejoin="round" />
      <path d="M13 11h4l3 3v1h-7z" strokeLinejoin="round" />
      <circle cx="7" cy="17" r="1.6" />
      <circle cx="16.5" cy="17" r="1.6" />
    </svg>
  );
}

export function BoltIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <path d="M12 3L5 13h5l-1 8 8-11h-5l0-7z" strokeLinejoin="round" />
    </svg>
  );
}

export function CloudIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <path d="M7 17h10a3.6 3.6 0 0 0 .6-7.1 4.6 4.6 0 0 0-8.9-1.2A4 4 0 0 0 7 17z" strokeLinejoin="round" />
    </svg>
  );
}

export function CompassIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M14.6 9.4l-1.8 4.8-4.8 1.8 1.8-4.8z" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon({ className = base, filled = true }: IconProps & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.2}
    >
      <path d="M12 3.4l2.6 5.6 6 .7-4.4 4.1 1.2 6-5.4-3-5.4 3 1.2-6-4.4-4.1 6-.7z" strokeLinejoin="round" />
    </svg>
  );
}

export function QuoteIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M7.2 6C4.6 7.4 3 9.7 3 12.6c0 2.4 1.5 4 3.5 4 1.7 0 3-1.3 3-3 0-1.6-1.1-2.8-2.6-3-.2-1.2.6-2.4 2.1-3.3L7.2 6zm9 0c-2.6 1.4-4.2 3.7-4.2 6.6 0 2.4 1.5 4 3.5 4 1.7 0 3-1.3 3-3 0-1.6-1.1-2.8-2.6-3-.2-1.2.6-2.4 2.1-3.3L16.2 6z" />
    </svg>
  );
}

export function TagIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <path d="M11.5 4h-5A2.5 2.5 0 0 0 4 6.5v5c0 .5.2 1 .6 1.4l7.5 7.5c.8.8 2 .8 2.8 0l5-5c.8-.8.8-2 0-2.8l-7.5-7.5c-.4-.4-.9-.6-1.4-.6z" strokeLinejoin="round" />
      <circle cx="8.5" cy="8.5" r="1.3" />
    </svg>
  );
}

export function DocumentIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <path d="M7 3.5h7l3 3v13.5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" strokeLinejoin="round" />
      <path d="M14 3.5V7h3" strokeLinejoin="round" />
      <path d="M9 12h6M9 15h6M9 18h4" strokeLinecap="round" />
    </svg>
  );
}

export function ChefHatIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <path
        d="M7 11a3.5 3.5 0 0 1 1-6.7 3 3 0 0 1 5.7-1.3A3 3 0 0 1 18 6a3.5 3.5 0 0 1 1 6.9V16H7z"
        strokeLinejoin="round"
      />
      <path d="M7 19.5h10M7.6 16h8.8" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.8}>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.8}>
      <path d="M4 12h16M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.8}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

export function PhoneIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <path
        d="M5 4h3.2l1.4 4-2 1.6a11 11 0 0 0 5 5l1.6-2 4 1.4V17c0 1.7-1.3 3-3 3C8.6 20 4 15.4 4 9c0-1.7 1.3-3 1-5z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.6" />
      <path d="M4.5 6.5L12 12.5l7.5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PinIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <path d="M12 21s-6.5-5.9-6.5-11a6.5 6.5 0 0 1 13 0c0 5.1-6.5 11-6.5 11z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

export function ClockIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.4}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 8v4.5l3 1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WhatsAppIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.1a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-2.8.7.7-2.7-.2-.3A8.1 8.1 0 1 1 12 20.1zm4.5-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.1-.3.2-.5.1-1.6-.8-2.6-1.4-3.7-3.1-.1-.2 0-.3.1-.5l.4-.5c.1-.2.1-.3 0-.5-.1-.2-.6-1.4-.8-1.9-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.9 4.5 4 2.7 1 2.7.7 3.2.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1-.1-.1-.2-.2-.4-.3z" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.8H7.8V15h2.4v6h3.3z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.5}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M21.6 8.2s-.2-1.5-.8-2.1c-.8-.8-1.6-.8-2-.9C15.9 5 12 5 12 5s-3.9 0-6.8.2c-.4.1-1.2.1-2 .9-.6.6-.8 2.1-.8 2.1S2.2 10 2.2 11.8v1.4c0 1.8.2 3.6.2 3.6s.2 1.5.8 2.1c.8.8 1.8.8 2.3.9 1.6.2 6.5.2 6.5.2s3.9 0 6.8-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2.1.8-2.1s.2-1.8.2-3.6v-1.4c0-1.8-.2-3.6-.2-3.6zM9.9 15V9l5.4 3z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M4.5 3.5A1.8 1.8 0 1 0 4.5 7a1.8 1.8 0 0 0 0-3.5zM3 8.7h3V20H3zM9 8.7h2.9v1.6h.04c.4-.8 1.5-1.9 3.2-1.9 3.4 0 4 2.2 4 5.1V20h-3v-5.7c0-1.4 0-3.1-2-3.1-2 0-2.3 1.5-2.3 3v5.8H9z" />
    </svg>
  );
}

export function PinterestIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.3-5.4s-.3-.6-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.6 0 .9-.6 2.3-.9 3.6-.3 1 .5 1.9 1.6 1.9 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.2-3.8-3.1 0-5 2.3-5 4.8 0 .9.3 1.5.6 2 .2.2.2.3.1.5l-.3 1c-.1.3-.3.4-.6.3-1.4-.6-2.1-2.2-2.1-4 0-3 2.5-6.5 7.4-6.5 4 0 6.5 2.8 6.5 5.9 0 4-2.3 7-5.6 7-1.1 0-2.2-.6-2.5-1.3 0 0-.6 2.3-.7 2.8-.3.9-.9 1.9-1.4 2.6A10 10 0 1 0 12 2z" />
    </svg>
  );
}
