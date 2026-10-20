/** Marca: velocímetro estilizado + nome. Cores herdadas de `currentColor`/tokens. */
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <circle cx="24" cy="26" r="20" fill="var(--color-primary)" />
      <path d="M10 30 A14 14 0 0 1 38 30" fill="none" stroke="var(--color-on-primary)" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
      <path d="M12.5 30 A11.5 11.5 0 0 1 24 18.5" fill="none" stroke="var(--color-on-primary)" strokeWidth="3" strokeLinecap="round" />
      <line x1="24" y1="30" x2="32" y2="20" stroke="var(--color-on-primary)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="30" r="2.6" fill="var(--color-on-primary)" />
    </svg>
  );
}
