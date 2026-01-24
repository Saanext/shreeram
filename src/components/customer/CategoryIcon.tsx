import React from 'react';

// Simple Shirt SVG for Men
const MenIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M20,21V3H4V21" />
        <path d="M16,3,12,7,8,3" />
    </svg>
);

// Simple Dress SVG for Women
const WomenIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12,3,8,9H16Z" />
        <path d="M8,9,6,21H18L16,9" />
    </svg>
);

// Simple Romper/Onesie SVG for Kids
const KidsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9,3h6V7H9Z" />
        <path d="M9,7,6,12H18L15,7" />
        <path d="M6,12v9H9v-5a3,3,0,0,1,6,0v5h3V12" />
    </svg>
);


export const CategoryIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name.toLowerCase()) {
    case 'men':
      return <MenIcon className={className} />;
    case 'women':
      return <WomenIcon className={className} />;
    case 'kids':
      return <KidsIcon className={className} />;
    default:
        // A generic icon for other categories
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            </svg>
        );
  }
};
