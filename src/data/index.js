export const personalInfo = {
  name: 'Sagar Padia',
  title: 'Front-End Developer',
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
    github: 'https://github.com/sagarpadia',
    linkedin: 'https://linkedin.com/in/sagarpadia',
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
      'AI-powered chatbot platform with real-time streaming responses, multi-session management, and a premium conversational UI.',
    tech: ['React', 'Tailwind CSS', 'MUI', 'Context API', 'SSE'],
    github: 'https://github.com/sagarpadia',
    live: null,
    featured: true,
  },
  {
    id: 2,
    name: 'VahanYaar',
    rank: 'A+',
    description:
      'Desktop-grade vehicle trading application built with Tauri for native performance, secure local storage, and offline-first architecture.',
    tech: ['Tauri', 'React', 'Bootstrap', 'Rust'],
    github: 'https://github.com/sagarpadia',
    live: null,
    featured: true,
  },
  {
    id: 3,
    name: 'BuildYaar',
    rank: 'A',
    description:
      'Property management desktop app with integrated PDF viewing, contract generation, and real estate workflow automation.',
    tech: ['Tauri', 'React', 'React-PDF-Viewer', 'Bootstrap'],
    github: 'https://github.com/sagarpadia',
    live: null,
    featured: true,
  },
  {
    id: 4,
    name: 'Punctualiti',
    rank: 'A',
    description:
      'Next.js form builder with dynamic field composition, validation schemas, and export-ready output for enterprise workflows.',
    tech: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/sagarpadia',
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
