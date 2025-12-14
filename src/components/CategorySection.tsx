import { Link } from 'react-router-dom';
import { categories, categoryEmojis } from '@/data/foodData';

export function CategorySection() {
  const visible = categories.filter(c => c !== 'Alle');

  return (
    <section className="mb-6">
      <h2 className="font-display font-semibold text-foreground mb-3">Kategorier</h2>
      <div className="grid grid-cols-3 gap-3">
        {visible.map((cat) => (
          <Link
            key={cat}
            to={`/category/${encodeURIComponent(cat)}`}
            className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-card hover:shadow-md hover:-translate-y-0.5 transform transition"
          >
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-2xl">
              {categoryEmojis[cat] || '🍽️'}
            </div>
            <div className="text-sm font-medium text-foreground text-center">{cat}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
