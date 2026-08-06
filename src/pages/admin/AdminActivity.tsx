import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Search, Activity, FileText, Image, Users, Settings, Loader2, Clock } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

const actionColors: Record<string, string> = {
  created: 'bg-green-500/15 text-green-700',
  updated: 'bg-blue-500/15 text-blue-700',
  deleted: 'bg-red-500/15 text-red-700',
  published: 'bg-purple-500/15 text-purple-700',
  unpublished: 'bg-yellow-500/15 text-yellow-700',
};

const entityIcons: Record<string, any> = {
  page: FileText,
  media: Image,
  user: Users,
  setting: Settings,
};

export default function AdminActivity() {
  const [search, setSearch] = useState('');
  const [entityFilter, setEntityFilter] = useState('all');

  const { data: logs, isLoading } = useQuery({
    queryKey: ['activity-log', entityFilter],
    queryFn: async () => {
      let query = supabase.from('activity_log').select('*').order('created_at', { ascending: false }).limit(100);
      if (entityFilter !== 'all') query = query.eq('entity_type', entityFilter);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const { data: profiles } = useQuery({
    queryKey: ['admin-profiles-activity'],
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select('id, full_name, email');
      if (error) throw error;
      return data;
    },
  });

  const getUserName = (userId: string | null) => {
    if (!userId) return 'System';
    const profile = profiles?.find(p => p.id === userId);
    return profile?.full_name || profile?.email || 'Unknown';
  };

  const filtered = logs?.filter(log =>
    log.entity_title?.toLowerCase().includes(search.toLowerCase()) ||
    log.action.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Activity Log</h1>
          <p className="text-sm text-muted-foreground">Track all content changes and admin actions</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search activity..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={entityFilter} onValueChange={setEntityFilter}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="page">Pages</SelectItem>
              <SelectItem value="media">Media</SelectItem>
              <SelectItem value="user">Users</SelectItem>
              <SelectItem value="setting">Settings</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
        ) : filtered && filtered.length > 0 ? (
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filtered.map(log => {
                  const EntityIcon = entityIcons[log.entity_type] || Activity;
                  return (
                    <div key={log.id} className="flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors">
                      <div className="mt-0.5 p-2 rounded-lg bg-muted">
                        <EntityIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium">{getUserName(log.user_id)}</span>
                          <Badge variant="secondary" className={`text-[10px] ${actionColors[log.action] || ''}`}>{log.action}</Badge>
                          <span className="text-sm text-muted-foreground">{log.entity_type}</span>
                        </div>
                        {log.entity_title && (
                          <p className="text-sm mt-0.5">"{log.entity_title}"</p>
                        )}
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}</span>
                          <span className="text-xs text-muted-foreground">· {format(new Date(log.created_at), 'MMM d, h:mm a')}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg bg-muted/20">
            <Activity className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">No activity recorded yet</p>
            <p className="text-xs text-muted-foreground">Actions will appear here as you manage content</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
