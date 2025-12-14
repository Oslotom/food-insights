import { useState, useMemo } from 'react';
import { foods, categories } from '@/data/foodData';
import { useFavorites } from '@/hooks/useFavorites';
import { Food, Category, FilterState } from '@/types/food';
import { Header } from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import { CategorySection } from '@/components/CategorySection';
import { SearchBar } from '@/components/SearchBar';
import { CategoryPill } from '@/components/CategoryPill';
import { FilterChips } from '@/components/FilterChips';
import { FoodCard } from '@/components/FoodCard';
import { FoodDetail } from '@/components/FoodDetail';
import { StatsCard } from '@/components/StatsCard';
import { AddFoodDialog } from '@/components/AddFoodDialog';
import { Apple, ShieldCheck, AlertTriangle, Utensils } from 'lucide-react';

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'Alle',
    histaminSafe: false,
    glutenFree: false,
    lactoseFree: false,
    lowFodmap: false,
  });

  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [customFoods, setCustomFoods] = useState<Food[]>([]);
  const [addFoodOpen, setAddFoodOpen] = useState(false);
  const { favorites } = useFavorites();

  const filteredFoods = useMemo(() => {
    const allFoods = [...foods, ...customFoods];
    const matched = allFoods.filter((food) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (!food.navn.toLowerCase().includes(searchLower) &&
            !food.kategori.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Category filter
      if (filters.category !== 'Alle' && food.kategori !== filters.category) {
        return false;
      }

      // Tolerance filters
      if (filters.histaminSafe && food.histamin_innhold !== 'Lav') {
        return false;
      }
      if (filters.glutenFree && food.naturlig_glutenfri !== 'Ja') {
        return false;
      }
      if (filters.lactoseFree && food.inneholder_laktose === 'Ja') {
        return false;
      }
      if (filters.lowFodmap && food.fodmap_niva !== 'Lav') {
        return false;
      }

      return true;
    });

    // sort favorites to top
    matched.sort((a, b) => {
      const aFav = favorites.includes(a.id) ? 0 : 1;
      const bFav = favorites.includes(b.id) ? 0 : 1;
      if (aFav !== bFav) return aFav - bFav;
      return a.navn.localeCompare(b.navn);
    });

    return matched;
  }, [filters, favorites]);

  const stats = useMemo(() => {
    const safeCount = foods.filter(f => 
      f.histamin_innhold === 'Lav' && 
      f.fodmap_niva === 'Lav' && 
      f.toleranse_ved_ibs === 'God'
    ).length;
    
    const cautionCount = foods.filter(f => 
      f.histamin_innhold === 'Middels' || 
      f.fodmap_niva === 'Middels' || 
      f.toleranse_ved_ibs === 'Variabel'
    ).length;

    return {
      total: foods.length,
      safe: safeCount,
      caution: cautionCount,
    };
  }, []);

  const handleToggleFilter = (filter: keyof Pick<FilterState, 'glutenFree' | 'lactoseFree' | 'histaminSafe' | 'lowFodmap'>) => {
    setFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
  };

  const handleAddFood = (newFood: Food) => {
    setCustomFoods(prev => [...prev, newFood]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 pb-8">
        {/* Hero Banner */}
        <section className="mb-6">
          <HeroBanner />
        </section>

        {/* Search - right after hero */}
        <section className="mb-4">
          <SearchBar 
            value={filters.search}
            onChange={(value) => setFilters(prev => ({ ...prev, search: value }))}
          />
        </section>

        {/* Filter chips */}
        <section className="mb-4">
          <FilterChips
            glutenFree={filters.glutenFree}
            lactoseFree={filters.lactoseFree}
            histaminSafe={filters.histaminSafe}
            lowFodmap={filters.lowFodmap}
            onToggle={handleToggleFilter}
          />
        </section>

        {/* Category pills */}
        <section className="mb-6">
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 py-1">
            {categories.map((category) => (
              <CategoryPill
                key={category}
                category={category as Category}
                isActive={filters.category === category}
                onClick={() => setFilters(prev => ({ 
                  ...prev, 
                  category: category as Category 
                }))}
              />
            ))}
          </div>
        </section>

        {/* Results count */}
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <h2 className="font-display font-semibold text-foreground">
            {filteredFoods.length} matvarer
          </h2>
          {filters.search || filters.category !== 'Alle' || 
           filters.glutenFree || filters.lactoseFree || 
           filters.histaminSafe || filters.lowFodmap ? (
            <button
              onClick={() => setFilters({
                search: '',
                category: 'Alle',
                histaminSafe: false,
                glutenFree: false,
                lactoseFree: false,
                lowFodmap: false,
              })}
              className="text-sm text-primary font-medium hover:underline"
            >
              Nullstill filter
            </button>
          ) : null}
        </div>

        {/* Food list - search results */}
        <section className="space-y-3 mb-8">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food, index) => (
              <FoodCard
                key={food.id}
                food={food}
                onClick={() => setSelectedFood(food)}
                index={index}
              />
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Apple className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                Ingen matvarer funnet
              </h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-6">
                Prøv å justere søket eller filtrene for å finne det du leter etter.
              </p>
              <button
                onClick={() => setAddFoodOpen(true)}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Legg til
              </button>
            </div>
          )}
        </section>

        {/* Categories section */}
        <CategorySection />

        {/* Stats section */}
        <section className="py-6">
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4">
            <StatsCard 
              icon={Utensils}
              label="Matvarer"
              value={stats.total}
              color="primary"
            />
            <StatsCard 
              icon={ShieldCheck}
              label="Trygge valg"
              value={stats.safe}
              color="safe"
            />
            <StatsCard 
              icon={AlertTriangle}
              label="Vær forsiktig"
              value={stats.caution}
              color="caution"
            />
          </div>
        </section>
      </main>

      {/* Food detail modal */}
      {selectedFood && (
        <FoodDetail 
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
        />
      )}

      {/* Add food dialog */}
      <AddFoodDialog
        open={addFoodOpen}
        onOpenChange={setAddFoodOpen}
        onAddFood={handleAddFood}
        searchQuery={filters.search}
      />
    </div>
  );
};

export default Index;
