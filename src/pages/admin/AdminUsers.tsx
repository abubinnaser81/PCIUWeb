import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Search, UserPlus, Shield, ShieldOff, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profiles, isLoading } = useQuery({
    queryKey: ['admin-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: userRoles } = useQuery({
    queryKey: ['user-roles'],
    queryFn: async () => {
      const { data, error } = await supabase.from('user_roles').select('*');
      if (error) throw error;
      return data;
    },
  });

  const addAdminMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase.from('user_roles').insert({
        user_id: userId,
        role: 'admin',
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-roles'] });
      toast({ title: 'Admin role granted successfully' });
    },
    onError: (error: any) => {
      toast({ title: 'Failed to grant admin role', description: error.message, variant: 'destructive' });
    },
  });

  const removeAdminMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', 'admin');
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-roles'] });
      toast({ title: 'Admin role removed successfully' });
    },
    onError: (error: any) => {
      toast({ title: 'Failed to remove admin role', description: error.message, variant: 'destructive' });
    },
  });

  const isAdmin = (userId: string) => {
    return userRoles?.some((r) => r.user_id === userId && r.role === 'admin');
  };

  const filteredProfiles = profiles?.filter(
    (profile) =>
      profile.email?.toLowerCase().includes(search.toLowerCase()) ||
      profile.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleGrantAdmin = async () => {
    const profile = profiles?.find((p) => p.email === newAdminEmail);
    if (!profile) {
      toast({ title: 'User not found', variant: 'destructive' });
      return;
    }
    await addAdminMutation.mutateAsync(profile.id);
    setNewAdminEmail('');
    setIsDialogOpen(false);
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Users</h1>
            <p className="text-muted-foreground">Manage user roles and permissions</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Grant Admin Access</DialogTitle>
                <DialogDescription>
                  Enter the email of a registered user to grant them admin access.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label>User Email</Label>
                  <Input
                    type="email"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    placeholder="user@example.com"
                  />
                </div>
                <Button onClick={handleGrantAdmin} className="w-full">
                  Grant Admin Access
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : filteredProfiles && filteredProfiles.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProfiles.map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{profile.full_name || 'No name'}</p>
                          <p className="text-sm text-muted-foreground">{profile.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {isAdmin(profile.id) ? (
                          <Badge className="bg-primary">Admin</Badge>
                        ) : (
                          <Badge variant="secondary">User</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(profile.created_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>
                        {isAdmin(profile.id) ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAdminMutation.mutate(profile.id)}
                          >
                            <ShieldOff className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addAdminMutation.mutate(profile.id)}
                          >
                            <Shield className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No users found
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
