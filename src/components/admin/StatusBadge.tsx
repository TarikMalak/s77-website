'use client';

type StatusColor = 'green' | 'yellow' | 'red';

export default function StatusBadge({
  color,
  label,
}: {
  color: StatusColor;
  label: string;
}) {
  const dotColor = {
    green: 'bg-green-400',
    yellow: 'bg-yellow-400',
    red: 'bg-red-400',
  }[color];

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-white/60">
      <span className={`w-2 h-2 rounded-full ${dotColor}`} />
      {label}
    </span>
  );
}
