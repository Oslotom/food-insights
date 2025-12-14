import { Food } from '@/types/food';
import { categoryEmojis } from '@/data/foodData';
import { cn } from '@/lib/utils';

interface FoodTileProps {
  food: Food;
  onClick: () => void;
}

export function FoodTile({ food, onClick }: FoodTileProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full p-4 rounded-2xl bg-card border border-border/50',
        'flex items-center gap-3 text-left hover:shadow-md hover:-translate-y-0.5 transform transition'
      )}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-2xl">
        {categoryEmojis[food.kategori] || '🍽️'}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display font-semibold text-foreground truncate text-base">{food.navn}</h3>
        </div>

        <div className="flex items-center gap-2 mt-2">
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
    </button>
  );
}
