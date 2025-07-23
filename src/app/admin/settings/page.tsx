import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminSettingsPage() {
    return (
        <div className="flex flex-col gap-4">
             <div>
                <h1 className="text-2xl font-headline font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage platform settings and appearance.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Site Information</CardTitle>
                    <CardDescription>Update your site's name and contact details.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4 max-w-lg">
                        <div className="space-y-2">
                            <Label htmlFor="site-name">Site Name</Label>
                            <Input id="site-name" defaultValue="RoleCraft" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="contact-email">Contact Email</Label>
                            <Input id="contact-email" type="email" defaultValue="support@rolecraft.com" />
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save Changes</Button>
                </CardFooter>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Theme Control</CardTitle>
                    <CardDescription>Customize the main colors of the website.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg">
                        <div className="space-y-2">
                            <Label htmlFor="primary-color">Primary Color</Label>
                            <Input id="primary-color" type="color" defaultValue="#3F51B5" className="h-12" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="accent-color">Accent Color</Label>
                            <Input id="accent-color" type="color" defaultValue="#9575CD" className="h-12" />
                        </div>
                    </div>
                </CardContent>
                 <CardFooter className="border-t px-6 py-4">
                    <Button>Apply Theme</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
