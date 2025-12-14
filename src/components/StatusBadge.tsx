import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  level: 'Lav' | 'Middels' | 'Høy' | 'God' | 'Variabel' | 'Dårlig' | string;
  label?: string;
  size?: 'sm' | 'md';
  inverted?: boolean;
}

export function StatusBadge({ level, label, size = 'md', inverted = false }: StatusBadgeProps) {
  const getStatusColor = () => {
    const normalizedLevel = level.toLowerCase();
    
    // For tolerance levels (God = good, Dårlig = bad)
    if (normalizedLevel === 'god' || (inverted && normalizedLevel === 'lav')) {
      return 'bg-safe-bg text-safe';
    }
    if (normalizedLevel === 'variabel' || normalizedLevel === 'middels') {
      return 'bg-caution-bg text-caution';
    }
    if (normalizedLevel === 'dårlig' || normalizedLevel === 'høy' || (inverted && normalizedLevel === 'høy')) {
      return 'bg-danger-bg text-danger';
    }
    if (normalizedLevel === 'lav') {
      return 'bg-safe-bg text-safe';
    }
    
    return 'bg-muted text-muted-foreground';
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium transition-all',
        getStatusColor(),
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      )}
    >
      {label && <span className="opacity-70">{label}:</span>}
      <span>{level}</span>
    </span>
  );
}
