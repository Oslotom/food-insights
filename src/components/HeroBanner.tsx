import { Leaf, Apple, Carrot, Fish, Salad, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface HeroBannerProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearch?: () => void;
  onClear?: () => void;
}

export function HeroBanner({ searchValue = '', onSearchChange, onSearch, onClear }: HeroBannerProps) {
  return (
    <section className="relative py-10 md:py-14 px-6 md:px-10 bg-gradient-to-br from-primary via-primary/90 to-emerald-600 rounded-3xl overflow-hidden shadow-xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Floating food icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-6 right-[15%] animate-bounce" style={{ animationDuration: '3s' }}>
          <Apple className="w-8 h-8 text-white/20" />
        </div>
        <div className="absolute bottom-8 right-[25%] animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
          <Carrot className="w-6 h-6 text-white/15" />
        </div>
        <div className="absolute top-1/3 right-[8%] animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
          <Fish className="w-7 h-7 text-white/15" />
        </div>
      </div>

      <div className="relative z-10">
        {/* Content */}
        <div className="flex items-center justify-between gap-8 mb-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <Leaf className="w-4 h-4 text-white" />
              <span className="text-white/90 text-sm font-medium">Din matguide</span>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4">
              Reagerer du på mat?
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-md leading-relaxed">
              Finn matvarer som passer dine behov. Få tips for bedre toleranse og helse.
            </p>
          </div>

          {/* Right side - Illustration */}
          <div className="flex-shrink-0 hidden md:flex">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-110" />
              <div className="relative w-36 h-36 lg:w-44 lg:h-44 rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <Salad className="w-16 h-16 lg:w-20 lg:h-20 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative flex items-center max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Søk etter matvare..."
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSearch?.();
              }
            }}
            className="pl-12 pr-28 h-14 rounded-2xl bg-white/95 backdrop-blur-sm border-0 text-base
              focus:ring-2 focus:ring-white/50 placeholder:text-muted-foreground/60 shadow-lg"
          />
          {searchValue && (
            <button
              onClick={onClear}
              className="absolute right-24 top-1/2 -translate-y-1/2 p-1 rounded-full
                bg-muted hover:bg-muted/80 transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
          <Button onClick={onSearch} className="absolute right-2 top-1/2 -translate-y-1/2">
            Søk
          </Button>
        </div>
      </div>
    </section>
  );
}
