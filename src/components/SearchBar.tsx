import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Søk etter matvare..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 pr-10 h-14 rounded-2xl bg-card border-border/50 text-base
          focus:ring-2 focus:ring-primary/20 focus:border-primary
          placeholder:text-muted-foreground/60 shadow-soft"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full
            bg-muted hover:bg-muted/80 transition-colors"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </div>
  );
}
