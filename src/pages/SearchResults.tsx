import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { foods } from '@/data/foodData';
import { Food, FilterState } from '@/types/food';
import { Header } from '@/components/Header';
import { FoodCard } from '@/components/FoodCard';
import { FoodDetail } from '@/components/FoodDetail';
import { FilterChips } from '@/components/FilterChips';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const { favorites } = useFavorites();

  const [filters, setFilters] = useState<Pick<FilterState, 'glutenFree' | 'lactoseFree' | 'histaminSafe' | 'lowFodmap'>>({
    histaminSafe: false,
    glutenFree: false,
    lactoseFree: false,
    lowFodmap: false,
  });

  const handleToggleFilter = (filter: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
  };

  const results = useMemo(() => {
    if (!query) return [];

    const searchLower = query.toLowerCase();
    const matched = foods.filter((food) => {
      // Search filter
      if (!food.navn.toLowerCase().includes(searchLower) &&
          !food.kategori.toLowerCase().includes(searchLower)) {
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
  }, [query, filters, favorites]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 pb-8">
        {/* Back button and title */}
        <section className="mb-6">
          <Button
            variant="ghost"
            className="mb-4 -ml-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tilbake
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Søkeresultater
            </h1>
          </div>
          <p className="text-muted-foreground">
            {results.length} treff for "{query}"
          </p>
        </section>

        {/* Filter chips */}
        <section className="mb-6">
          <FilterChips
            glutenFree={filters.glutenFree}
            lactoseFree={filters.lactoseFree}
            histaminSafe={filters.histaminSafe}
            lowFodmap={filters.lowFodmap}
            onToggle={handleToggleFilter}
          />
        </section>

        {/* Results grid */}
        {results.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((food, index) => (
              <FoodCard
                key={food.id}
                food={food}
                onClick={() => setSelectedFood(food)}
                index={index}
              />
            ))}
          </section>
        ) : (
          <section className="text-center py-12">
            <div className="p-4 bg-muted rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Ingen resultater
            </h2>
            <p className="text-muted-foreground">
              Prøv et annet søkeord eller juster filtrene
            </p>
          </section>
        )}
      </main>

      {/* Food detail modal */}
      {selectedFood && (
        <FoodDetail 
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
        />
      )}
    </div>
  );
};

export default SearchResultsPage;
