import { Utensils } from 'lucide-react';

export function HeroBanner() {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl overflow-hidden">
      <div className="flex items-center justify-between gap-6">
        {/* Left side - Content */}
        <div className="flex-1">
          <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
            Reagerer du på mat?
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-md">
            Finn matvarer som passer dine behov. Få tips for bedre toleranse og helse.
          </p>
        </div>

        {/* Right side - Illustration */}
        <div className="flex-shrink-0 hidden md:flex">
          <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Utensils className="w-16 h-16 lg:w-20 lg:h-20 text-primary opacity-80" />
          </div>
        </div>
      </div>
    </section>
  );
}
