/**
 * All site content lives in this file. To publish a link that is still a
 * placeholder, replace its `href: null` with the real URL — nothing else
 * needs to change.
 */

export type PlaceholderLink = {
  label: string;
  href: string | null;
};

export type Project = {
  slug: string;
  title: string;
  role: string;
  org: string;
  orgShort?: string;
  advisor?: string;
  dates: string;
  summary: string;
  links: PlaceholderLink[];
  status?: 'in-development';
};

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  links: PlaceholderLink[];
};

export type NewsItem = {
  date: string;
  text: string;
};

export const profile = {
  name: 'Weihao Jin',
  tagline:
    'Computer Science student at the University of Michigan working on machine learning systems, trustworthy AI, and applied research.',
  photo: null as string | null,
  monogram: 'WJ',
  // Set to a link once a CV is available, e.g. { label: 'CV', href: '/cv.pdf' }.
  cv: null as PlaceholderLink | null,
  contact: [
    { label: 'Email', href: 'mailto:jackyjin@umich.com' },
    { label: 'GitHub', href: 'https://github.com/jackyjin1234' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/weihao-jin/' },
  ] satisfies PlaceholderLink[],
};

export const selectedWork: Project[] = [
  {
    slug: 'algorithmic-trading',
    title: 'Algorithmic Trading Research and Infrastructure',
    role: 'Research Engineer',
    org: 'Square Kettle LLC',
    dates: 'Aug 2025 – Present',
    summary:
      'Built market-structure algorithms, rigorous backtesting infrastructure, and AI-assisted experimentation workflows using NautilusTrader, Docker, and AWS.',
    links: [],
  },
  {
    slug: 'veillens',
    title: 'VeilLens',
    role: 'Undergraduate Student Researcher',
    org: 'University of Michigan',
    advisor: 'Advised by Sun Ke',
    dates: 'May 2025 – Present',
    summary:
      'Led the development and evaluation of VeilLens, a multimodal visual privacy defense system that reduced compositional privacy risk by 48.7%.',
    links: [
      { label: 'Project Website', href: null },
      { label: 'GitHub', href: 'https://github.com/Ambient-Intelligence-Lab-UMich-EECS/GeoPrivacy' },
      { label: 'Paper', href: null },
    ],
  },
  {
    slug: 'glioblastoma-pathology',
    title: 'Computational Pathology for Glioblastoma',
    role: 'Undergraduate Research Assistant',
    org: 'Diagnostic Intelligent Assistance for Global Health Research Team',
    orgShort: 'DIA for Global Health, U-M',
    dates: 'Jan 2025 – Nov 2025',
    summary:
      'Contributed to a pipeline for analyzing glioblastoma gene expression and predicting molecular patterns from pathology images.',
    links: [{ label: 'Poster', href: null }],
  },
  {
    slug: 'gpr-reconstruction',
    title: 'Ground-Penetrating Radar Reconstruction',
    role: 'ML Algorithm Development Intern',
    org: 'Research Institute of Tsinghua, Pearl River Delta',
    dates: 'May 2024 – Jul 2024',
    summary:
      'Developed deep-learning methods and synthetic-data pipelines for ground-penetrating radar reconstruction, increasing acceptable outputs from 55% to 76% and reducing false detections by 15%.',
    links: [{ label: 'GitHub', href: null }],
  },
];

export const currentlyBuilding: Project[] = [
  {
    slug: 'personal-project',
    title: 'Personal Project Name',
    role: 'Creator',
    org: 'Independent',
    dates: '2026 – Present',
    summary:
      'One sentence explaining the problem, what the project does, and what is currently being developed.',
    links: [{ label: 'GitHub', href: 'https://github.com/jackyjin1234/CustomNews' }],
    status: 'in-development',
  },
];

export const publications: Publication[] = [
  {
    title: 'VeilLens: A Multimodal Visual Privacy Defense System',
    authors: 'Weihao Jin, et al.',
    venue: 'In submission',
    year: 2026,
    links: [
      { label: 'Paper', href: null },
      { label: 'Code', href: 'https://github.com/Ambient-Intelligence-Lab-UMich-EECS/GeoPrivacy' },
    ],
  },
];

export const news: NewsItem[] = [
  {
    date: 'Aug 2025',
    text: 'Joined Square Kettle LLC as a Research Engineer working on algorithmic trading research.',
  },
  {
    date: 'May 2025',
    text: 'Started leading the VeilLens visual privacy project at the University of Michigan.',
  },
  {
    date: 'Jan 2025',
    text: 'Joined the Diagnostic Intelligent Assistance for Global Health research team.',
  },
];

export const about = [
  'Computer Science student at the University of Michigan working across machine learning research and engineering.',
  'My recent work includes first-author research on visual privacy, ML evaluation pipelines, and engineering infrastructure for systematic trading research. I am particularly interested in ML systems, reliable evaluation, computer vision, and building research ideas into usable systems.',
  'I am currently preparing for research-oriented graduate study and seeking opportunities involving applied ML research or ML infrastructure.',
];
