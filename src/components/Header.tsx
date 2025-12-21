import { Salad, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onAddClick: () => void;
}

export function Header({ onAddClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 glass-strong">
      <div className="container px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center
                shadow-glow">
                <Salad className="h-5 w-5 text-primary-foreground" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-caution animate-pulse-slow" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">
                MatGuide
              </h1>
              <p className="text-xs text-muted-foreground">
                Lær om matintoleranse
              </p>
            </div>
          </div>
          <Button onClick={onAddClick}>Legg til</Button>
        </div>
      </div>
    </header>
  );
}
