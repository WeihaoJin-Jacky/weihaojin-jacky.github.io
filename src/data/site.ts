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
    'Computer Science student at the University of Michigan working on machine learning systems, ML evaluation, and applied research.',
  // Path is relative to `public/` (served at the site root), not a filesystem path.
  photo: 'IMG_1247.JPG' as string | null,
  monogram: 'WJ',
  // Set to a link once a CV is available, e.g. { label: 'CV', href: '/cv.pdf' }.
  cv: null as PlaceholderLink | null,
  contact: [
    { label: 'Email', href: 'mailto:jackyjin@umich.com' },
    { label: 'GitHub', href: 'https://github.com/WeihaoJin-Jacky' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/weihao-jin/' },
    { label: 'Résumé', href: '/2026-Summer.pdf' }
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
      { label: 'Paper', href: 'VeilLens.pdf' },
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
    links: [{ label: 'Poster', href: 'DIAG_GBM.pdf' }],
  },
  {
    slug: 'gpr-reconstruction',
    title: 'Ground-Penetrating Radar Reconstruction',
    role: 'ML Algorithm Development Intern',
    org: 'Research Institute of Tsinghua, Pearl River Delta',
    dates: 'May 2024 – Jul 2024',
    summary:
      'Developed deep-learning methods and synthetic-data pipelines for ground-penetrating radar reconstruction, increasing acceptable outputs from 55% to 76% and reducing false detections by 15%.',
    links: [{ label: 'GitHub', href: 'https://github.com/WeihaoJin-Jacky/Radar-Model' }],
  },
];

// Smaller, curiosity-driven projects — exploratory by design, separate from the
// main research track above.
export const sideProjects: Project[] = [
  {
    slug: 'ai-news-podcast',
    title: 'AI News Podcast Generator',
    role: 'Independent Project',
    org: 'Personal',
    dates: 'May 2025 – Sep 2025',
    summary:
      'An end-to-end news-to-podcast pipeline using semantic retrieval, LLM-generated dialogue, multi-voice TTS, and automated fact-checking — turns the day’s news into a 3–5 minute episode in 60–90 seconds.',
    links: [{ label: 'Code', href: 'https://github.com/WeihaoJin-Jacky/CustomNews' }],
  },
  {
    slug: 'pubmedqa-distillation',
    title: 'PubMedQA with Knowledge Distillation',
    role: 'Project Lead',
    org: 'Four-person team',
    dates: 'Jan 2025 – Apr 2025',
    summary:
      'Led a four-person team building a PyTorch distillation pipeline that compresses an 8B teacher into a 220M student for biomedical question answering.',
    links: [{ label: 'Code', href: 'https://github.com/WeihaoJin-Jacky/Step-by-Step-Distillation-on-PubMedQA' }],
  },
];

export const publications: Publication[] = [
  {
    title: 'VeilLens: A Multimodal Visual Privacy Defense System',
    authors: 'Weihao Jin, et al.',
    venue: 'In submission',
    year: 2026,
    links: [
      { label: 'Paper', href: 'VeilLens.pdf' },
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

// Paragraphs support inline `[label](href)` links. An href that is not yet a
// real URL (like ADVISOR_URL) renders as pending text until it is filled in.
export const about = [
  'I am a Computer Science student at the [University of Michigan, Ann Arbor](https://www.engin.umich.edu/) working across machine learning research and engineering.',
  'I am currently a member of the [Ambient Intelligence Lab](https://ambient-intelligence-lab-umich-eecs.github.io/ami_lab_website/), where I am advised by [Professor Sun Ke](https://samsonsjarkal.github.io/KeSun/) and lead the development of [VeilLens](https://github.com/Ambient-Intelligence-Lab-UMich-EECS/GeoPrivacy), a multimodal system for analyzing and reducing visual privacy risks. I also work as a Research Engineer at [Square Kettle LLC](https://www.squarekettle.com/), building market-structure algorithms, backtesting infrastructure, and AI-assisted experimentation workflows.',
  'Previously, I developed deep-learning methods and synthetic-data pipelines for ground-penetrating radar reconstruction at the [Research Institute of Tsinghua, Pearl River Delta](http://www.tsinghua-gd.org/).',
  'My interests include ML systems, reliable evaluation, computer vision, and turning research ideas into usable systems. I am currently preparing for research-oriented graduate study and seeking opportunities in applied ML research and ML infrastructure.',
];
