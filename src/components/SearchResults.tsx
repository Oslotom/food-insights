import React from 'react';
import { Food } from '@/types/food';

interface SearchResultsProps {
  results: Food[];
  onSelect: (food: Food) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelect }) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-card rounded-md shadow-lg">
      <ul className="py-1">
        {results.map((food) => (
          <li
            key={food.id}
            className="px-3 py-2 cursor-pointer hover:bg-muted"
            onClick={() => onSelect(food)}
          >
            {food.navn}
          </li>
        ))}
      </ul>
    </div>
  );
};
