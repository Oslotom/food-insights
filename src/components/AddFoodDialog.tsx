import { useState, useEffect } from 'react';
import { Food } from '@/types/food';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Loader2, Sparkles } from 'lucide-react';

interface AddFoodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddFood: (food: Food) => void;
  searchQuery?: string;
}

export function AddFoodDialog({ open, onOpenChange, onAddFood, searchQuery = '' }: AddFoodDialogProps) {
  const [foodName, setFoodName] = useState(searchQuery);
  const [loading, setLoading] = useState(false);

  // Update foodName when dialog opens with new searchQuery
  useEffect(() => {
    if (open) {
      setFoodName(searchQuery);
    }
  }, [open, searchQuery]);

  const handleAddFood = async () => {
    if (!foodName.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/analyze-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foodName: foodName.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze food');
      }

      const analyzedData = await response.json();
      
      const newFood: Food = {
        id: `custom-${Date.now()}`,
        navn: foodName.trim(),
        ...analyzedData,
      };

      onAddFood(newFood);
      setFoodName('');
      onOpenChange(false);
    } catch (error) {
      console.error('Error adding food:', error);
      alert('Kunne ikke legge til matvare. Prøv igjen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Legg til ny matvare</DialogTitle>
          <DialogDescription>
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              AI analyserer matvaren og fyller inn riktig informasjon
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="food-name">Matvarenavn</Label>
            <Input
              id="food-name"
              placeholder="f.eks. Brokkoli, Kyllingbryst, etc."
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !loading) {
                  handleAddFood();
                }
              }}
              disabled={loading}
              autoFocus
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Avbryt
          </Button>
          <Button
            onClick={handleAddFood}
            disabled={!foodName.trim() || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyserer...
              </>
            ) : (
              'Legg til'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
