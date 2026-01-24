'use client';

import { Sparkles } from 'lucide-react';
import { ScrollAnimation } from './ScrollAnimation';

export function AnimatedDivider() {
  return (
    <ScrollAnimation className="container py-16">
      <div className="relative flex items-center justify-center">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute flex items-center justify-center">
          <span className="bg-background p-2 rounded-full ring-1 ring-border animate-sparkle-pulse">
            <Sparkles className="h-5 w-5 text-accent" />
          </span>
        </div>
      </div>
    </ScrollAnimation>
  );
}
