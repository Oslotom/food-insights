import { cn } from '@/lib/utils';
import { categoryEmojis } from '@/data/foodData';
import { Category } from '@/types/food';

interface CategoryPillProps {
  category: Category;
  isActive: boolean;
  onClick: () => void;
}

export function CategoryPill({ category, isActive, onClick }: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium',
        'transition-all duration-300 ease-out whitespace-nowrap',
        'active:scale-95',
        isActive
          ? 'bg-primary text-primary-foreground shadow-medium'
          : 'bg-card text-foreground border border-border hover:bg-secondary hover:border-primary/30'
      )}
    >
      <span className="text-base">{categoryEmojis[category] || '🍽️'}</span>
      <span>{category}</span>
    </button>
  );
}
