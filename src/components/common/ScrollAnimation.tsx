
'use client';
import { cn } from '@/lib/utils';
import React, { useRef, useEffect, useState, CSSProperties, ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children, className, style }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-5',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};
