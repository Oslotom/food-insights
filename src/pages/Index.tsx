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
import { FoodDetail } from '@/components/FoodDetail';
import { AddFoodDialog } from '@/components/AddFoodDialog';
import { FoodTile } from '@/components/FoodTile';

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'Alle',
    histaminSafe: false,
    glutenFree: false,
    lactoseFree: false,
    lowFodmap: false,
  });

  const [submittedSearch, setSubmittedSearch] = useState('');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [customFoods, setCustomFoods] = useState<Food[]>([]);
  const [addFoodOpen, setAddFoodOpen] = useState(false);
  const { favorites } = useFavorites();

  const searchResults = useMemo(() => {
    if (!submittedSearch) {
      return [];
    }
    const allFoods = [...foods, ...customFoods];
    const matched = allFoods.filter((food) => {
      // Search filter
      if (submittedSearch) {
        const searchLower = submittedSearch.toLowerCase();
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
  }, [submittedSearch, filters.category, filters.histaminSafe, filters.glutenFree, filters.lactoseFree, filters.lowFodmap, favorites, customFoods]);

  const handleSearch = () => {
    setSubmittedSearch(filters.search);
  };

  const handleClearSearch = () => {
    setFilters(prev => ({ ...prev, search: '' }));
    setSubmittedSearch('');
  };

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
        {/* Hero Banner with Search */}
        <section className="mb-6">
          <HeroBanner
            searchValue={filters.search}
            onSearchChange={(value) => setFilters(prev => ({ ...prev, search: value }))}
            onSearch={handleSearch}
            onClear={handleClearSearch}
          />
        </section>

        {/* Categories */}
        <CategorySection />

        {/* Category filters */}
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
