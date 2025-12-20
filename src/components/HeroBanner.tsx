import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Apple, Carrot, Fish, Salad, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { foods } from '@/data/foodData';
import { Food } from '@/types/food';

interface HeroBannerProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearch?: () => void;
  onClear?: () => void;
}

export function HeroBanner({ searchValue = '', onSearchChange, onSearch, onClear }: HeroBannerProps) {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = useMemo(() => {
    if (!searchValue || searchValue.length < 1) return [];
    const searchLower = searchValue.toLowerCase();
    return foods
      .filter(food => 
        food.navn.toLowerCase().includes(searchLower) ||
        food.kategori.toLowerCase().includes(searchLower)
      )
      .slice(0, 6);
  }, [searchValue]);

  const handleSelectSuggestion = (food: Food) => {
    onSearchChange?.(food.navn);
    setIsFocused(false);
    navigate(`/search?q=${encodeURIComponent(food.navn)}`);
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      setIsFocused(false);
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
    onSearch?.();
  };

  const handleClear = () => {
    onClear?.();
    setIsFocused(false);
  };

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

        {/* Search bar with suggestions */}
        <div className="relative max-w-2xl">
          <div className="relative flex items-center">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Søk etter matvare..."
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="pl-12 pr-28 h-14 rounded-2xl bg-white/95 backdrop-blur-sm border-0 text-base
                focus:ring-2 focus:ring-white/50 placeholder:text-muted-foreground/60 shadow-lg"
            />
            {searchValue && (
              <button
                onClick={handleClear}
                className="absolute right-24 top-1/2 -translate-y-1/2 p-1 rounded-full
                  bg-muted hover:bg-muted/80 transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
            <Button onClick={handleSearch} className="absolute right-2 top-1/2 -translate-y-1/2">
              Søk
            </Button>
          </div>

          {/* Suggestions dropdown */}
          {isFocused && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-xl border border-border overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <ul className="py-2">
                {suggestions.map((food) => (
                  <li
                    key={food.id}
                    className="px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors flex items-center gap-3"
                    onMouseDown={() => handleSelectSuggestion(food)}
                  >
                    <span className="text-lg">{getCategoryEmoji(food.kategori)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{food.navn}</p>
                      <p className="text-sm text-muted-foreground">{food.kategori}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function getCategoryEmoji(category: string): string {
  const emojiMap: Record<string, string> = {
    'Kjøtt': '🥩',
    'Fisk': '🐟',
    'Egg': '🥚',
    'Meieri': '🥛',
    'Korn': '🌾',
    'Grønnsak': '🥬',
    'Frukt': '🍎',
    'Belgfrukt': '🫘',
    'Nøtter/Frø': '🥜',
  };
  return emojiMap[category] || '🍽️';
}
