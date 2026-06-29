export const personalInfo = {
  name: 'Sagar Padia',
  title: 'Front-End Developer',
  resumeUrl: 'https://drive.google.com/file/d/1w5hnRRhTsyb8AAi-SxlsvyTvlM_8CJe3/view?usp=drive_link',
  taglines: [
    'Front-End Developer',
    'UI/UX Craftsman',
    'React Specialist',
    'Desktop App Builder',
    'Performance Engineer',
  ],
  bio: `I build precision-crafted web experiences with React, TypeScript, and Tailwind.
  2+ years shipping production apps — from AI-powered platforms to cross-platform desktop tools.
  I obsess over the details that make users feel the difference.`,
  location: 'Ahmedabad, India',
  email: 'sagarpadia7@gmail.com',
  phone: '+91 86906 74159',
  socials: {
    github: 'https://github.com/sagarpadia17',
    linkedin: 'https://www.linkedin.com/in/sagar-padia/',
  },
  stats: [
    { value: '2+', label: 'Years Experience' },
    { value: '30+', label: 'Pages Shipped' },
    { value: '4', label: 'Production Apps' },
  ],
}

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const skills = [
  {
    key: 'C',
    label: 'Frontend',
    description: 'Precision-engineered UIs',
    techs: ['React', 'Next.js', 'TypeScript', 'Vite'],
    proficiency: 92,
    color: 'gold',
  },
  {
    key: 'Q',
    label: 'Styling',
    description: 'Premium visual systems',
    techs: ['Tailwind CSS', 'Bootstrap', 'MUI', 'Framer Motion'],
    proficiency: 90,
    color: 'blue',
  },
  {
    key: 'E',
    label: 'Desktop',
    description: 'Cross-platform delivery',
    techs: ['Tauri', 'Auto-update', 'Rust bindings', 'Electron'],
    proficiency: 85,
    color: 'gold',
  },
  {
    key: 'X',
    label: 'APIs & Tooling',
    description: 'Full stack integration',
    techs: ['REST', 'SSE', 'Git', 'Docker', 'AWS'],
    proficiency: 83,
    color: 'blue',
  },
]

export const projects = [
  {
    id: 1,
    name: 'Soika Mockingjay',
    rank: 'MVP',
    description:
      'Soika Mockingjay is a production-ready AI desktop platform that delivers a smooth, enterprise-grade conversational experience with real-time SSE streaming, multi-session chats, and secure workspace management.',
    longDescription:
      'Soika Mockingjay is a production-ready AI desktop platform built to streamline conversational workflows, workspace management, and model configuration in one secure application. It provides a seamless chat experience with persistent sessions, dataset and knowledge management, user and profile administration, authentication flows, and environment setup through a polished desktop interface. Built as the sole front-end engineer from MVP to production, I shaped the application architecture, UX, and component system to support a scalable, enterprise-style product experience.',
    tech: ['React', 'Tailwind CSS', 'TypeScript', 'Context API', 'SSE', 'Vite', 'React Markdown'],
    video: 'https://drive.google.com/file/d/1jqmMwIxAQp2AVRty1gMzKAiT-3Nxa6XH/view?usp=drive_link',
    images: [],
    live: null,
    featured: true,
  },
  {
    id: 2,
    name: 'VahanYaar',
    rank: 'A+',
    description:
      'VahanYaar is a desktop-based dealership management platform that centralizes vehicle purchase, sales, inventory, customer follow-ups, accounting, and partner transactions in one system.',
    longDescription:
      'VahanYaar is a desktop-first dealership management system built to centralize the full vehicle lifecycle in one workflow-driven platform. Designed for day-to-day operational use, it brings together inventory tracking, purchase and sales processing, customer and enquiry management, follow-up coordination, accounting ledgers, partner transactions, and profit-sharing into a single interface. It also includes reminder flows for time-sensitive dealership tasks such as RTO, insurance, and RUC, helping teams stay on top of compliance and post-sale operations without switching between disconnected tools. The application was built to reduce manual coordination, improve visibility across stock and financial records, and make dealership operations faster, more organized, and easier to manage at scale.',
    tech: ['Tauri', 'React', 'Bootstrap', 'Rust', 'React-PDF-Viewer', 'Ant Design'],
    video: 'https://www.youtube.com/watch?v=KjHinIJxPpY',
    images: [],
    live: null,
    featured: true,
  },
  {
    id: 3,
    name: 'BuildYaar',
    rank: 'A',
    description:
      'Property management desktop app with integrated PDF viewing, contract generation, and real estate workflow automation.',
    longDescription:
      'BuildYaar is a desktop-first property management solution targeting real estate professionals. Built with Tauri and React, it provides in-app PDF viewing via React-PDF-Viewer, automated contract generation from templates, and a full property listing and client management workflow. The offline-capable architecture ensures data availability even without connectivity, while Bootstrap powers a clean and familiar UI for non-technical users.',
    tech: ['Tauri', 'React', 'React-PDF-Viewer', 'Bootstrap'],
    images: [],
    live: null,
    featured: true,
  },
  {
    id: 4,
    name: 'Punctualiti',
    rank: 'A',
    description:
      'Next.js form builder with dynamic field composition, validation schemas, and export-ready output for enterprise workflows.',
    longDescription:
      'Punctualiti is a dynamic form builder built with Next.js and TypeScript, designed for enterprise teams that need flexible, validated data collection. Users can compose forms from a library of field types, configure validation schemas visually, and export completed forms in multiple formats. The builder uses a declarative schema approach under the hood, making it easy to version and programmatically generate forms from external configuration.',
    tech: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    images: [],
    live: null,
    featured: false,
  },
]

export const experience = [
  {
    id: 1,
    role: 'Front-End Developer',
    company: 'Soika Labs',
    period: 'Mar 2025 – Oct 2025',
    type: 'Full-Time',
    description:
      'Led front-end architecture for an AI chatbot platform. Built real-time streaming UI with SSE, designed a scalable component library, and owned the full product front-end from MVP to launch.',
    highlights: [
      'Built real-time SSE streaming chat interface',
      'Architected reusable component library',
      'Shipped from MVP to production',
    ],
  },
  {
    id: 2,
    role: 'Front-End Developer',
    company: 'MB Infoways',
    period: 'May 2023 – Feb 2025',
    type: 'Full-Time',
    description:
      'Developed multiple production-grade desktop and web applications using React, Tauri, and Bootstrap. Owned full UI delivery for 4 client-facing products.',
    highlights: [
      'Shipped 4 production desktop apps with Tauri',
      'Reduced load time 40% via optimization',
      'Mentored junior developers on React patterns',
    ],
  },
  {
    id: 3,
    role: 'B.E. Computer Science',
    company: 'VTU',
    period: 'Aug 2022',
    type: 'Education',
    description:
      'Bachelor of Engineering in Computer Science. Foundation in algorithms, data structures, OS, and software engineering principles.',
    highlights: ['Data Structures & Algorithms', 'Software Engineering', 'Computer Networks'],
  },
]
