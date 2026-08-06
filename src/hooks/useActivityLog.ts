import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export function useActivityLog() {
  const { user } = useAuth();

  const logActivity = useCallback(async (
    action: string,
    entityType: string,
    entityId?: string,
    entityTitle?: string,
    details?: Record<string, any>
  ) => {
    if (!user) return;
    try {
      await supabase.from('activity_log').insert({
        user_id: user.id,
        action,
        entity_type: entityType,
        entity_id: entityId,
        entity_title: entityTitle,
        details: details || {},
      });
    } catch {
      // Silent fail for logging
    }
  }, [user]);

  return { logActivity };
}
