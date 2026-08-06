import type { Block } from '@/components/admin/blocks/BlockTypes';

const PAGE_ROUTE_MAP: Record<string, string> = {
  home: '/',
  iqac: '/iqac',
  library: '/library',
  notices: '/notices',
  faculty: '/faculty',
  management: '/management',
  'admission-requirement': '/admission/requirement',
  'vice-chancellors-message': '/vice-chancellors-message',
  'department-bba': '/department/bba',
  'department-civil': '/department/civil',
  'department-cse': '/department/cse',
  'department-eee': '/department/eee',
  'department-english': '/department/english',
  'department-fashion': '/department/fashion',
  'department-journalism': '/department/journalism',
  'department-law': '/department/law',
  'department-textile': '/department/textile',
};

const PAGE_NAV_ORDER = [
  'home',
  'management',
  'vice-chancellors-message',
  'department-bba',
  'department-english',
  'department-law',
  'department-journalism',
  'department-cse',
  'department-eee',
  'department-civil',
  'department-textile',
  'department-fashion',
  'admission-requirement',
  'library',
  'iqac',
  'notices',
  'faculty',
] as const;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function isFixedRouteSlug(slug: string) {
  return slug in PAGE_ROUTE_MAP;
}

export function getPublicPathForSlug(slug: string) {
  return PAGE_ROUTE_MAP[slug] ?? `/page/${slug}`;
}

export function getAdminEditPath(page: { id: string; slug: string }) {
  if (page.slug === 'home') return '/admin/homepage';
  if (isFixedRouteSlug(page.slug)) return `/admin/visual/${page.id}`;
  return `/admin/pages/${page.id}`;
}

export function getPageSortOrder(slug: string) {
  const index = PAGE_NAV_ORDER.indexOf(slug as (typeof PAGE_NAV_ORDER)[number]);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

export function createStarterBlocks(page: {
  title: string;
  meta_description?: string | null;
}): Block[] {
  const subtitle = page.meta_description?.trim() || `Start building the editable version of ${page.title}.`;

  return [
    {
      id: crypto.randomUUID(),
      block_type: 'hero',
      content: {
        title: page.title,
        subtitle,
        backgroundImage: '',
        buttonText: '',
        buttonLink: '',
      },
      order_index: 0,
    },
    {
      id: crypto.randomUUID(),
      block_type: 'richtext',
      content: {
        heading: 'Overview',
        content: `<p>${escapeHtml(subtitle)}</p><p>Add and reorder blocks here. When you save, this route will use the editable CMS version instead of the old hardcoded layout.</p>`,
      },
      order_index: 1,
    },
  ];
}
