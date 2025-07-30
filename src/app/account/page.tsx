
import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { CategoryNav } from '@/components/customer/CategoryNav';
import { Card } from '@/components/ui/card';
import { mockUsers } from '@/lib/data';
import Link from 'next/link';
import { KeyRound, ShoppingBag, User, MapPin } from 'lucide-react';

const accountSections = [
    {
        icon: ShoppingBag,
        title: 'Your Orders',
        description: 'Track, return, or buy things again',
        href: '/orders'
    },
    {
        icon: MapPin,
        title: 'Your Addresses',
        description: 'Edit addresses for orders and gifts',
        href: '/addresses'
    },
    {
        icon: User,
        title: 'Your Profile',
        description: 'Manage your public profile and preferences',
        href: '/account'
    },
     {
        icon: KeyRound,
        title: 'Change Password',
        description: 'Update your account password for security',
        href: '/account'
    }
]

export default function AccountPage() {
  const customer = mockUsers.find(u => u.role === 'customer'); // Mock a logged-in user

  return (
    <div className="flex min-h-screen w-full flex-col">
      <CustomerHeader />
      <CategoryNav />
      <main className="flex-1 container py-12 md:py-16">
        <div className="mb-12">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Your Account</h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl mt-2">
            Welcome back, {customer?.name}! Manage your profile, orders, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {accountSections.map((section) => (
                <Link href={section.href} key={section.title} className="group">
                    <Card className="h-full flex flex-col justify-center p-6 hover:bg-muted/50 transition-colors hover:shadow-md border-2 border-transparent hover:border-primary/20">
                        <div className="flex items-center">
                            <section.icon className="w-12 h-12 text-primary mr-6" />
                            <div>
                                <h2 className="font-headline text-lg font-semibold">{section.title}</h2>
                                <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                            </div>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
      </main>
    </div>
  );
}
