import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AddFoodProps {
  onAdd: (foodName: string) => void;
}

export const AddFood: React.FC<AddFoodProps> = ({ onAdd }) => {
  const [foodName, setFoodName] = useState('');

  const handleAdd = () => {
    if (foodName.trim()) {
      onAdd(foodName.trim());
      setFoodName('');
    }
  };

  return (
    <div className="p-4 bg-card rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Legg til ny matvare</h3>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Navn på matvare..."
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAdd();
            }
          }}
        />
        <Button onClick={handleAdd}>Legg til</Button>
      </div>
    </div>
  );
};
