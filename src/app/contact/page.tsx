import { CustomerHeader } from '@/components/customer/CustomerHeader';
import { CategoryNav } from '@/components/customer/CategoryNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <CustomerHeader />
      <CategoryNav />
      <main className="flex-1 container py-12 md:py-24">
        <div className="text-center mb-12">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Contact Us</h1>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">We'd love to hear from you. Reach out to us with any questions or feedback.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
            <Card>
                <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Your Name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="your@email.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" placeholder="What is your message about?" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Type your message here..." className="min-h-[150px]" />
                        </div>
                        <Button type="submit" size="lg">Send Message</Button>
                    </form>
                </CardContent>
            </Card>
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Our Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-4">
                            <Mail className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p className="text-muted-foreground">support@shreeramenterprise.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold">Phone</h3>
                                <p className="text-muted-foreground">+91 123 456 7890</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold">Address</h3>
                                <p className="text-muted-foreground">123 Commerce Lane, Business City, 110001</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}
