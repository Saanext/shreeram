import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className, iconClassName }: { className?: string; iconClassName?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
        <svg
            className={cn("h-7 w-auto", iconClassName)}
            viewBox="0 0 53 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
                d="M26.48 36.48a2.93 2.93 0 01-2.14-1L.59 11.41a2.93 2.93 0 01-.03-4.14L10.29.59a2.93 2.93 0 014.14 0l12.05 12.04a2.93 2.93 0 010 4.14L16.75 36.5a2.93 2.93 0 01-2.14 1z"
                fill="#F26A10"
            ></path>
            <path
                d="M52.41 11.41L42.68.59a2.93 2.93 0 00-4.14 0L26.48 12.64a2.93 2.93 0 000 4.14l9.73 9.73a2.93 2.93 0 004.14 0l12.05-12.05a2.93 2.93 0 00-.02-4.05z"
                fill="#F26A10"
            ></path>
            <path
                d="M42.13 36.48a2.93 2.93 0 01-2.14-1L27.94 23.43a2.93 2.93 0 010-4.14l11.92-11.92a2.93 2.93 0 014.14 0l2.55 2.55a2.93 2.93 0 010 4.14L32.23 35.46a2.93 2.93 0 01-2.14 1.02z"
                fill="#EF4444"
            ></path>
        </svg>
    </Link>
  );
}
