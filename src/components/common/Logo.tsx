import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Briefcase } from 'lucide-react';

export function Logo({ className, iconClassName }: { className?: string; iconClassName?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-primary", className)}>
      <Briefcase className={cn("h-6 w-6", iconClassName)} />
      <span className="font-headline text-xl font-bold">
        Shree Ram Enterprise
      </span>
    </Link>
  );
}
