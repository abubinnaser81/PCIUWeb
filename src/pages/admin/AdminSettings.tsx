import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminSettings() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: 'Settings saved successfully' });
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your website settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>Basic information about your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Site Name</Label>
                <Input defaultValue="Port City International University" />
              </div>
              <div>
                <Label>Tagline</Label>
                <Input defaultValue="Excellence in Education" />
              </div>
              <div>
                <Label>Contact Email</Label>
                <Input type="email" defaultValue="info@portcity.edu.bd" />
              </div>
              <div>
                <Label>Contact Phone</Label>
                <Input defaultValue="+880-31-123456" />
              </div>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Search engine optimization settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Default Meta Title</Label>
                <Input defaultValue="Port City International University" />
              </div>
              <div>
                <Label>Default Meta Description</Label>
                <Textarea
                  defaultValue="Port City International University offers world-class education in Bangladesh."
                  rows={3}
                />
              </div>
              <div>
                <Label>Keywords</Label>
                <Input defaultValue="university, education, bangladesh, chittagong" />
              </div>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>Useful shortcuts for managing content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/admin/pages/new">
                  Create New Page
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/admin/pages">
                  Manage All Pages
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/admin/users">
                  Manage Users
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/" target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Website
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>Technical details about your system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Framework</span>
                <span className="font-medium">React 18</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Build Tool</span>
                <span className="font-medium">Vite</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Styling</span>
                <span className="font-medium">Tailwind CSS</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Backend</span>
                <span className="font-medium">Supabase Cloud</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Database</span>
                <span className="font-medium">PostgreSQL</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}

