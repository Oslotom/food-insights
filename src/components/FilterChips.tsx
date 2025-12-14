import { cn } from '@/lib/utils';
import { Wheat, Droplets, Beaker, Activity } from 'lucide-react';

interface FilterChipsProps {
  glutenFree: boolean;
  lactoseFree: boolean;
  histaminSafe: boolean;
  lowFodmap: boolean;
  onToggle: (filter: 'glutenFree' | 'lactoseFree' | 'histaminSafe' | 'lowFodmap') => void;
}

const filters = [
  { key: 'glutenFree' as const, label: 'Glutenfri', icon: Wheat },
  { key: 'lactoseFree' as const, label: 'Laktosefri', icon: Droplets },
  { key: 'histaminSafe' as const, label: 'Lav histamin', icon: Beaker },
  { key: 'lowFodmap' as const, label: 'Lav FODMAP', icon: Activity },
];

export function FilterChips({ glutenFree, lactoseFree, histaminSafe, lowFodmap, onToggle }: FilterChipsProps) {
  const states = { glutenFree, lactoseFree, histaminSafe, lowFodmap };

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onToggle(key)}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
            'transition-all duration-200 active:scale-95',
            states[key]
              ? 'bg-safe text-primary-foreground shadow-soft'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
