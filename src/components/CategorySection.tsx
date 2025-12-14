import { Link } from 'react-router-dom';
import { categories, categoryEmojis, foods } from '@/data/foodData';

export function CategorySection() {
  const visible = categories.filter(c => c !== 'Alle');

  const counts = visible.reduce<Record<string, number>>((acc, c) => {
    acc[c] = foods.filter(f => f.kategori === c).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <section className="mb-6">
      <h2 className="font-display font-semibold text-foreground mb-3">Kategorier</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {visible.map((cat) => (
          <Link
            key={cat}
            to={`/category/${encodeURIComponent(cat)}`}
            className="flex items-start gap-3 p-3 rounded-2xl bg-card hover:shadow-md hover:-translate-y-0.5 transform transition"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-xl">
              {categoryEmojis[cat] || '🍽️'}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">{cat}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
