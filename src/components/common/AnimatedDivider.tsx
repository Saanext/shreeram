
'use client';

import { Sparkles } from 'lucide-react';
import { ScrollAnimation } from './ScrollAnimation';
import { Separator } from '@/components/ui/separator';

export function AnimatedDivider() {
  return (
    <ScrollAnimation className="container py-16">
      <div className="relative">
        <Separator />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-background px-4 text-primary">
            <Sparkles className="h-6 w-6" />
          </span>
        </div>
      </div>
    </ScrollAnimation>
  );
}
