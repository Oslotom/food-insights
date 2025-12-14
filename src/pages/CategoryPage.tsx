import { useMemo, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { foods, categoryEmojis, drinkSubcategoryEmojis } from '@/data/foodData';
import { FoodCard } from '@/components/FoodCard';
import { FoodTile } from '@/components/FoodTile';
import { Header } from '@/components/Header';
import { FoodDetail } from '@/components/FoodDetail';
import { ArrowLeft } from 'lucide-react';
import { Food } from '@/types/food';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const decodedCategory = category ? decodeURIComponent(category) : '';
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const navigate = useNavigate();

  const categoryFoods = useMemo(() => {
    return foods.filter(f => f.kategori === decodedCategory);
  }, [decodedCategory]);

  const subcategories = useMemo(() => {
    const set = new Set<string>();
    categoryFoods.forEach(f => {
      const key = (f.underkategori && f.underkategori.trim()) ? f.underkategori : (f.bearbeidingsgrad || 'Ukjent');
      set.add(key);
    });
    return Array.from(set);
  }, [categoryFoods]);

  const displayed = useMemo(() => {
    if (!selectedSub) return categoryFoods;
    return categoryFoods.filter(f => {
      const key = (f.underkategori && f.underkategori.trim()) ? f.underkategori : f.bearbeidingsgrad;
      return key === selectedSub;
    });
  }, [categoryFoods, selectedSub]);

  // Initialize selectedSub from route param if provided
  const { subcategory } = useParams<{ subcategory?: string }>();
  useEffect(() => {
    if (subcategory) {
      setSelectedSub(decodeURIComponent(subcategory));
    } else {
      setSelectedSub(null);
    }
  }, [subcategory]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Tilbake
          </Link>
          <h1 className="font-display text-2xl font-bold">{decodedCategory}</h1>
        </div>

        <div className="mb-6">
          <h3 className="text-sm text-muted-foreground mb-3">Underkategorier</h3>
          <div className="flex flex-wrap gap-3 justify-start">
            <button
              onClick={() => navigate(`/category/${encodeURIComponent(decodedCategory)}`)}
              className={`flex items-start gap-3 p-3 rounded-2xl bg-card hover:shadow-md hover:-translate-y-0.5 transform transition ${selectedSub === null ? 'ring-2 ring-primary/30' : ''}`}
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-xl">{categoryEmojis[decodedCategory] || '🍽️'}</div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">Alle</div>
              </div>
            </button>

            {subcategories.map(sub => (
              <button
                key={sub}
                onClick={() => navigate(`/category/${encodeURIComponent(decodedCategory)}/${encodeURIComponent(sub)}`)}
                className={`flex items-start gap-3 p-3 rounded-2xl bg-card hover:shadow-md hover:-translate-y-0.5 transform transition ${selectedSub === sub ? 'ring-2 ring-primary/30' : ''}`}
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-xl">{decodedCategory === 'Drikke' ? (drinkSubcategoryEmojis[sub] || '🥤') : '📦'}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {displayed.length > 0 ? (
            displayed.map((food: Food, i) => (
              <FoodTile key={food.id} food={food} onClick={() => setSelectedFood(food)} />
            ))
          ) : (
            <div className="text-center py-16 col-span-full">
              Ingen matvarer funnet i denne kategorien.
            </div>
          )}
        </section>
      </main>
      {/* Food detail modal */}
      {selectedFood && (
        <FoodDetail food={selectedFood} onClose={() => setSelectedFood(null)} />
      )}
    </div>
  );
};

export default CategoryPage;
