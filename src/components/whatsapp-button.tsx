type WhatsAppButtonProps = {
  href: string;
  label?: string;
  floating?: boolean;
};

export function WhatsAppButton({
  href,
  label = "Falar no WhatsApp",
  floating = false,
}: WhatsAppButtonProps) {
  if (floating) {
    return (
      <a
        aria-label={label}
        className="fixed bottom-24 right-4 z-50 flex size-14 items-center justify-center rounded-full bg-acid text-ink shadow-xl transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
        href={href}
        rel="noreferrer"
        target="_blank"
      >
        <WhatsAppIcon />
      </a>
    );
  }

  return (
    <a
      className="mt-3 flex h-12 items-center justify-center gap-3 border border-black/20 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors hover:border-ink hover:bg-ink hover:text-white sm:tracking-[0.18em]"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <WhatsAppIcon className="size-4" />
      {label}
    </a>
  );
}

function WhatsAppIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.6Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M9 8.2c.2-.4.4-.4.7-.4h.4c.2 0 .4.1.5.4l.8 1.8c.1.3 0 .5-.2.7l-.6.7c.8 1.5 1.9 2.5 3.5 3.1l.6-.8c.2-.3.5-.3.8-.2l1.8.9c.3.1.4.3.4.6 0 .6-.3 1.4-.9 1.7-.6.4-1.5.5-2.3.3-1.4-.4-3.3-1.2-5-3-1.4-1.5-2.1-3.2-2.2-4.3 0-.6.3-1.1.7-1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
