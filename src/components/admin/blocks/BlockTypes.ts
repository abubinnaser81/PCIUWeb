export interface BlockContent {
  [key: string]: unknown;
}

export interface Block {
  id: string;
  block_type: string;
  content: BlockContent;
  order_index: number;
}

export const BLOCK_TYPES = [
  {
    type: 'hero',
    label: 'Hero Section',
    icon: 'Image',
    defaultContent: {
      title: 'Welcome',
      subtitle: 'Add a subtitle here',
      backgroundImage: '',
      buttonText: 'Learn More',
      buttonLink: '#',
      badge: '',
    },
  },
  {
    type: 'stats',
    label: 'Statistics Row',
    icon: 'LayoutGrid',
    defaultContent: {
      items: [
        { value: '100+', label: 'Students' },
        { value: '10+', label: 'Faculty' },
        { value: '2', label: 'Programs' },
        { value: '90%', label: 'Placement Rate' },
      ],
    },
  },
  {
    type: 'richtext',
    label: 'Rich Text',
    icon: 'Type',
    defaultContent: {
      heading: '',
      content: '<p>Start writing your content here...</p>',
    },
  },
  {
    type: 'text',
    label: 'Text Block',
    icon: 'Type',
    defaultContent: {
      heading: '',
      content: 'Add your content here...',
      alignment: 'left',
    },
  },
  {
    type: 'image',
    label: 'Image',
    icon: 'Image',
    defaultContent: {
      src: '',
      alt: '',
      caption: '',
    },
  },
  {
    type: 'cards',
    label: 'Card Grid',
    icon: 'LayoutGrid',
    defaultContent: {
      columns: 3,
      cards: [
        { title: 'Card 1', description: 'Description', icon: '', link: '' },
        { title: 'Card 2', description: 'Description', icon: '', link: '' },
        { title: 'Card 3', description: 'Description', icon: '', link: '' },
      ],
    },
  },
  {
    type: 'programs',
    label: 'Programs List',
    icon: 'List',
    defaultContent: {
      programs: [
        {
          name: 'Program Name',
          duration: '4 Years',
          credits: '120 Credits',
          description: 'Program description...',
          concentrations: [],
        },
      ],
    },
  },
  {
    type: 'cta',
    label: 'Call to Action',
    icon: 'MousePointer',
    defaultContent: {
      title: 'Ready to get started?',
      description: 'Join us today',
      buttonText: 'Get Started',
      buttonLink: '#',
      variant: 'primary',
    },
  },
  {
    type: 'accordion',
    label: 'FAQ/Accordion',
    icon: 'List',
    defaultContent: {
      title: 'Frequently Asked Questions',
      items: [
        { question: 'Question 1?', answer: 'Answer 1' },
        { question: 'Question 2?', answer: 'Answer 2' },
      ],
    },
  },
  {
    type: 'gallery',
    label: 'Image Gallery',
    icon: 'Images',
    defaultContent: {
      columns: 3,
      images: [],
    },
  },
  {
    type: 'contact',
    label: 'Contact Section',
    icon: 'Mail',
    defaultContent: {
      title: 'Contact Us',
      email: '',
      phone: '',
      address: '',
      hours: '',
      showForm: true,
    },
  },
  {
    type: 'notices',
    label: 'Notices List',
    icon: 'List',
    defaultContent: {
      title: 'Notices',
      items: [
        { title: 'Notice title', date: '2024-01-01', type: 'general' },
      ],
    },
  },
  {
    type: 'quicklinks',
    label: 'Quick Links',
    icon: 'List',
    defaultContent: {
      title: 'Quick Links',
      links: [
        { label: 'Link 1', url: '#' },
      ],
    },
  },
] as const;

export type BlockType = typeof BLOCK_TYPES[number]['type'];
