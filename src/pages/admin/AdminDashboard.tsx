import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Eye, Clock, Plus, ArrowRight, Home, Users, Settings, Image, Activity, LayoutTemplate } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const { data: pagesCount } = useQuery({
    queryKey: ['pages-count'],
    queryFn: async () => {
      const { count } = await supabase.from('pages').select('*', { count: 'exact', head: true });
      return count || 0;
    },
  });

  const { data: publishedCount } = useQuery({
    queryKey: ['published-count'],
    queryFn: async () => {
      const { count } = await supabase.from('pages').select('*', { count: 'exact', head: true }).eq('is_published', true);
      return count || 0;
    },
  });

  const { data: recentPages } = useQuery({
    queryKey: ['recent-pages'],
    queryFn: async () => {
      const { data } = await supabase.from('pages').select('*').order('updated_at', { ascending: false }).limit(5);
      return data || [];
    },
  });

  const stats = [
    { title: 'Total Pages', value: pagesCount ?? 0, icon: FileText, color: 'text-primary' },
    { title: 'Published', value: publishedCount ?? 0, icon: Eye, color: 'text-accent' },
    { title: 'Drafts', value: (pagesCount ?? 0) - (publishedCount ?? 0), icon: Clock, color: 'text-muted-foreground' },
  ];

  const quickActions = [
    { title: 'Create Page', href: '/admin/pages/new', icon: Plus, desc: 'Build a new page' },
    { title: 'Manage Homepage', href: '/admin/homepage', icon: Home, desc: 'Edit homepage sections' },
    { title: 'Media Library', href: '/admin/media', icon: Image, desc: 'Upload & manage files' },
    { title: 'Templates', href: '/admin/templates', icon: LayoutTemplate, desc: 'Reusable layouts' },
    { title: 'Activity Log', href: '/admin/activity', icon: Activity, desc: 'Track changes' },
    { title: 'Users', href: '/admin/users', icon: Users, desc: 'Manage user roles' },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome to the content management system</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <Button key={action.href} asChild variant="outline" className="h-auto py-3 flex-col items-start text-left">
                  <Link to={action.href}>
                    <action.icon className="h-4 w-4 mb-1" />
                    <span className="text-xs font-medium">{action.title}</span>
                    <span className="text-[10px] text-muted-foreground">{action.desc}</span>
                  </Link>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Recent Pages */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Recent Pages</CardTitle>
              <Button asChild variant="ghost" size="sm" className="h-7 text-xs">
                <Link to="/admin/pages">View all <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </CardHeader>
            <CardContent>
              {recentPages && recentPages.length > 0 ? (
                <div className="space-y-2">
                  {recentPages.map((page) => (
                    <Link
                      key={page.id}
                      to={`/admin/pages/${page.id}`}
                      className="flex items-center justify-between p-2.5 rounded-md hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium">{page.title}</p>
                        <p className="text-[10px] text-muted-foreground">/{page.slug} · {format(new Date(page.updated_at), 'MMM d')}</p>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${page.is_published ? 'bg-accent/15 text-accent' : 'bg-muted text-muted-foreground'}`}>
                        {page.is_published ? 'Live' : 'Draft'}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-6">No pages yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
