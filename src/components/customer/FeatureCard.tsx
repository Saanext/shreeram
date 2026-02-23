
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="text-left group bg-transparent border-none shadow-none rounded-none">
      <CardHeader className="p-0 pb-4">
        <div className="text-black transform transition-transform duration-300 group-hover:-translate-y-1">
          <Icon className="h-8 w-8 stroke-[1.5px]" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <CardTitle className="text-lg font-headline font-bold uppercase tracking-wide mb-2">{title}</CardTitle>
        <p className="text-gray-500 text-sm font-light leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
