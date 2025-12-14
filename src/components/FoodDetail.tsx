import { Food } from '@/types/food';
import { StatusBadge } from './StatusBadge';
import { categoryEmojis } from '@/data/foodData';
import { X, Wheat, Droplets, Beaker, Activity, Flame, Dumbbell, Apple } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

interface FoodDetailProps {
  food: Food;
  onClose: () => void;
}

export function FoodDetail({ food, onClose }: FoodDetailProps) {
  const levelToNumber = (level: string) => {
    switch (level.toLowerCase()) {
      case 'lav': return 1;
      case 'middels': return 2;
      case 'høy': return 3;
      default: return 0;
    }
  };

  const nutritionData = [
    { name: 'Fiber', value: levelToNumber(food.fiberinnhold), color: '#22c55e' },
    { name: 'Protein', value: food.proteinkilde === 'Ja' ? 3 : 1, color: '#3b82f6' },
    { name: 'Fett', value: food.fettkilde === 'Ja' ? 3 : 1, color: '#f59e0b' },
    { name: 'Karbo', value: food.karbo_kilde === 'Ja' ? 3 : 1, color: '#8b5cf6' },
  ];

  const toleranceData = [
    { name: 'Histamin', value: levelToNumber(food.histamin_innhold), inverted: true },
    { name: 'FODMAP', value: levelToNumber(food.fodmap_niva), inverted: true },
    { name: 'Gass', value: levelToNumber(food.gassdannende), inverted: true },
  ];

  const getBarColor = (value: number, inverted: boolean) => {
    if (inverted) {
      if (value === 1) return 'hsl(158, 64%, 42%)';
      if (value === 2) return 'hsl(45, 93%, 47%)';
      return 'hsl(0, 72%, 51%)';
    }
    if (value === 3) return 'hsl(158, 64%, 42%)';
    if (value === 2) return 'hsl(45, 93%, 47%)';
    return 'hsl(var(--muted-foreground))';
  };

  const infoItems = [
    { 
      icon: Wheat, 
      label: 'Gluten', 
      value: food.naturlig_glutenfri === 'Ja' ? 'Glutenfri' : 'Inneholder gluten',
      safe: food.naturlig_glutenfri === 'Ja'
    },
    { 
      icon: Droplets, 
      label: 'Laktose', 
      value: food.inneholder_laktose === 'Nei' ? 'Laktosefri' : `Inneholder laktose (${food.mengde_laktose || 'ukjent mengde'})`,
      safe: food.inneholder_laktose === 'Nei'
    },
    { 
      icon: Beaker, 
      label: 'Histamin', 
      value: food.histamin_innhold,
      safe: food.histamin_innhold === 'Lav'
    },
    { 
      icon: Activity, 
      label: 'IBS-toleranse', 
      value: food.toleranse_ved_ibs,
      safe: food.toleranse_ved_ibs === 'God'
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div className="relative w-full max-w-lg max-h-[90vh] bg-card rounded-t-3xl sm:rounded-3xl 
        shadow-large overflow-hidden animate-slide-in-bottom">
        
        {/* Handle bar (mobile) */}
        <div className="flex justify-center pt-3 pb-2 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-secondary hover:bg-muted 
            transition-colors z-10"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* Content */}
        <div className="overflow-y-auto max-h-[85vh] px-6 pb-8">
          {/* Header */}
          <div className="flex items-center gap-4 pt-4 pb-6">
            <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center text-4xl">
              {categoryEmojis[food.kategori] || '🍽️'}
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                {food.navn}
              </h2>
              <p className="text-muted-foreground mt-1">
                {food.kategori} · {food.bearbeidingsgrad}
              </p>
            </div>
          </div>

          {/* Typical reaction */}
          <div className="p-4 rounded-2xl bg-secondary/50 mb-6">
            <p className="text-sm text-muted-foreground mb-1">Typisk reaksjon</p>
            <p className="font-medium text-foreground">{food.typisk_reaksjon}</p>
          </div>

          {/* Quick status */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {infoItems.map(({ icon: Icon, label, value, safe }) => (
              <div 
                key={label}
                className={cn(
                  'p-3 rounded-xl border',
                  safe ? 'bg-safe-bg/50 border-safe/20' : 'bg-muted/50 border-border'
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={cn('h-4 w-4', safe ? 'text-safe' : 'text-muted-foreground')} />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
                <p className={cn(
                  'text-sm font-medium',
                  safe ? 'text-safe' : 'text-foreground'
                )}>
                  {typeof value === 'string' ? value : value}
                </p>
              </div>
            ))}
          </div>

          {/* Tolerance chart */}
          <div className="mb-6">
            <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Toleransenivåer
            </h3>
            <div className="bg-secondary/30 rounded-2xl p-4">
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={toleranceData} layout="vertical">
                  <XAxis type="number" domain={[0, 3]} hide />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    width={70}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                    {toleranceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(entry.value, entry.inverted)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-between text-xs text-muted-foreground mt-2 px-[70px]">
                <span>Lav</span>
                <span>Middels</span>
                <span>Høy</span>
              </div>
            </div>
          </div>

          {/* Nutrition chart */}
          <div className="mb-6">
            <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
              <Apple className="h-5 w-5 text-primary" />
              Næringsprofil
            </h3>
            <div className="bg-secondary/30 rounded-2xl p-4">
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={nutritionData}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis hide domain={[0, 3]} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={40}>
                    {nutritionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Micronutrients */}
          <div className="mb-6">
            <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
              <Flame className="h-5 w-5 text-primary" />
              Viktige mikronæringsstoffer
            </h3>
            <div className="flex flex-wrap gap-2">
              {food.viktige_mikronæringsstoffer.split(',').map((nutrient, i) => (
                <span 
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {nutrient.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Additional info */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-primary" />
              Flere detaljer
            </h3>
            
            <div className="grid gap-2 text-sm">
              {food.fodmap_typer && (
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">FODMAP-typer</span>
                  <span className="font-medium text-foreground">{food.fodmap_typer}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Kaloritetthet</span>
                <StatusBadge level={food.kaloritetthet} size="sm" />
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Gassdannende</span>
                <StatusBadge level={food.gassdannende} size="sm" inverted />
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Cøliaki-trygg</span>
                <span className={cn(
                  'font-medium',
                  food.trygg_for_coliaki === 'Ja' ? 'text-safe' : 'text-danger'
                )}>
                  {food.trygg_for_coliaki}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
