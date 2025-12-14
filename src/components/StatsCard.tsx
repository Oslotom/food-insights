import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: 'primary' | 'safe' | 'caution' | 'warning';
}

export function StatsCard({ icon: Icon, label, value, color }: StatsCardProps) {
  const colorStyles = {
    primary: 'bg-primary/10 text-primary',
    safe: 'bg-safe-bg text-safe',
    caution: 'bg-caution-bg text-caution',
    warning: 'bg-warning-bg text-warning',
  };

  return (
    <div className="flex-1 p-4 rounded-2xl bg-card border border-border/50 shadow-soft">
      <div className={cn(
        'w-10 h-10 rounded-xl flex items-center justify-center mb-3',
        colorStyles[color]
      )}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-2xl font-display font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
