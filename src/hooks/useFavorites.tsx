import { useEffect, useState } from 'react';

const STORAGE_KEY = 'food_insights_favorites_v1';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Could not persist favorites', e);
    }
  }, [favorites]);

  const isFavorite = (id: string) => favorites.includes(id);
  const toggleFavorite = (id: string) => {
    setFavorites(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [id, ...prev]));
  };

  return { favorites, isFavorite, toggleFavorite };
}
