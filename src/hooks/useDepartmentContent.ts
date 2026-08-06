import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DepartmentContent {
  hero?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
  };
  stats?: Array<{ value: string; label: string }>;
  chairman?: {
    name?: string;
    designation?: string;
    image?: string;
    message?: string;
  };
  overview?: {
    content?: string;
    features?: string[];
  };
  facilities?: Array<{ name: string }>;
  programs?: Array<{
    name: string;
    duration: string;
    credits: string;
    description: string;
    concentrations?: string[];
  }>;
  researchAreas?: string[];
  industryPartners?: string[];
  notices?: Array<{ title: string; date: string; type: string }>;
  contact?: {
    address?: string;
    phone?: string;
    email?: string;
    hours?: string;
  };
  quickLinks?: Array<{ label: string; url: string }>;
}

export function useDepartmentContent(slug: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['page-content', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('content')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();
      if (error) throw error;
      return (data?.content as DepartmentContent) || {};
    },
  });

  return { content: data || {}, isLoading };
}

/** Merge DB content over defaults — only replaces fields that are actually set */
export function mergeContent<T>(defaults: T, overrides: Partial<T> | undefined): T {
  if (!overrides) return defaults;
  const result = { ...defaults };
  for (const key in overrides) {
    const val = overrides[key];
    if (val !== undefined && val !== null && val !== '') {
      (result as any)[key] = val;
    }
  }
  return result;
}
