import { Food } from '@/types/food';
import { StatusBadge } from './StatusBadge';
import { categoryEmojis } from '@/data/foodData';
import { cn } from '@/lib/utils';
import { ChevronRight, Check, AlertTriangle, X } from 'lucide-react';

interface FoodCardProps {
  food: Food;
  onClick: () => void;
  index: number;
}

export function FoodCard({ food, onClick, index }: FoodCardProps) {
  const getOverallStatus = () => {
    const issues = [];
    if (food.histamin_innhold === 'Høy') issues.push('histamin');
    if (food.fodmap_niva === 'Høy') issues.push('FODMAP');
    if (food.toleranse_ved_ibs === 'Dårlig') issues.push('IBS');
    if (food.inneholder_gluten === 'Ja') issues.push('gluten');
    if (food.inneholder_laktose === 'Ja' && food.mengde_laktose === 'Høy') issues.push('laktose');

    if (issues.length === 0) return { status: 'safe', label: 'Godt tolerert' };
    if (issues.length <= 2) return { status: 'caution', label: 'Variabel toleranse' };
    return { status: 'warning', label: 'Forsiktig' };
  };

  const { status, label } = getOverallStatus();

  const statusIcon = {
    safe: <Check className="h-4 w-4" />,
    caution: <AlertTriangle className="h-4 w-4" />,
    warning: <X className="h-4 w-4" />,
  };

  const statusColors = {
    safe: 'bg-safe-bg text-safe',
    caution: 'bg-caution-bg text-caution',
    warning: 'bg-danger-bg text-danger',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full p-3 rounded-2xl bg-card border border-border/50',
        'flex items-center gap-3 text-left',
        'transition-all duration-300 ease-out',
        'hover:shadow-medium hover:border-primary/20 hover:-translate-y-0.5',
        'active:scale-[0.98] animate-fade-in',
        'group'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Emoji avatar */}
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl
        group-hover:scale-110 transition-transform duration-300">
        {categoryEmojis[food.kategori] || '🍽️'}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Name and Histamine bar in same line */}
        <div className="flex items-center gap-2">
          <h3 className="font-display font-semibold text-foreground truncate text-base">
            {food.navn}
          </h3>
          <div className="flex items-center gap-1.5 flex-1">
            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all',
                  food.histamin_innhold === 'Lav' && 'w-1/3 bg-safe',
                  food.histamin_innhold === 'Middels' && 'w-2/3 bg-caution',
                  food.histamin_innhold === 'Høy' && 'w-full bg-danger'
                )}
              />
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{food.histamin_innhold}</span>
          </div>
        </div>
        
        {/* Quick status badges - only show if not safe */}
        {status !== 'safe' && (
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            <span className={cn(
              'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
              statusColors[status]
            )}>
              {statusIcon[status]}
              {label}
            </span>
          </div>
        )}
      </div>

      {/* Arrow */}
      <ChevronRight className="flex-shrink-0 h-5 w-5 text-muted-foreground 
        group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </button>
  );
}
