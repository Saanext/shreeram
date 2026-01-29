import { CustomerHeader } from '@/components/customer/CustomerHeader';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <CustomerHeader />
      <main className="flex-1 container py-12 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="space-y-6">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">About SRE Clothing</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Founded in 2024, SRE Clothing was born from a vision to create a multi-faceted e-commerce platform that caters to diverse needs. Our mission is to seamlessly connect admins, vendors, and customers in a unified, intuitive, and stylish online marketplace.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We believe in the power of technology to simplify commerce. Our platform is built on a robust, role-based architecture that empowers vendors to manage their products, provides admins with comprehensive oversight, and offers customers a delightful shopping experience.
            </p>
             <p className="text-muted-foreground text-lg leading-relaxed">
              At SRE Clothing, we are committed to quality, innovation, and customer satisfaction. We are more than just a marketplace; we are a community.
            </p>
          </div>
           <div className="flex items-center justify-center">
            <Image
                src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg"
                data-ai-hint="team work business"
                alt="About Us"
                width={600}
                height={400}
                className="rounded-xl object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
