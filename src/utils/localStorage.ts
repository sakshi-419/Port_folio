import { Profile, Skill, Project, AIFilm, Certificate, TimelineEntry, Resume, Contact } from '../types';

// Default Data Initializers
const defaultProfile: Profile = {
  id: 'sakshi-profile',
  name: 'Sakshi Choudhary',
  education: [
    'IIT Madras BS Degree in Data Science and Applications',
    'Institute of Innovation Bengaluru'
  ],
  shortIntro: "Hi, I'm Sakshi! I am a passionate student explorer deep-diving into Data Science at IIT Madras and building product skills at Institute of Innovation Bengaluru. I build responsive web systems and create custom AI films.",
  currentLearning: [
    'Python', 'OOPs', 'SQL', 'DBMS', 'React', 'Data Analytics', 'Machine Learning Basics', 'Generative AI', 'AI Film Creation'
  ],
  careerGoals: 'To blend data science intelligence with beautiful web structures and creative AI filmmaking tools to craft professional, high-impact user experiences.',
  aboutText: 'I am currently pursuing my BS Degree in Data Science and Applications from IIT Madras. Simultaneously, I am developing my hands-on software development and product management skills at the Institute of Innovation Bengaluru. As an aspiring software engineer and data analytics specialist, I focus heavily on writing clean, object-oriented code, designing SQL databases, and developing dynamic modern web layouts using React and Tailwind CSS. I also have an immense passion for generative art and video production.',
  profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400'
};

const defaultSkills: Skill[] = [
  { id: 's1', name: 'Python', category: 'Programming' },
  { id: 's2', name: 'OOPs', category: 'Programming' },
  { id: 's3', name: 'React', category: 'Web Development' },
  { id: 's4', name: 'Tailwind CSS', category: 'Web Development' },
  { id: 's5', name: 'SQL', category: 'Databases' },
  { id: 's6', name: 'DBMS', category: 'Databases' },
  { id: 's7', name: 'Data Analytics', category: 'Data Analytics' },
  { id: 's8', name: 'Machine Learning Basics', category: 'Machine Learning' },
  { id: 's9', name: 'Generative AI Tools', category: 'AI Tools' },
  { id: 's10', name: 'AI Film Synthesis', category: 'AI Tools' }
];

const defaultProjects: Project[] = [
  {
    id: 'p1',
    title: 'Pink Portfolio CMS',
    description: 'A beautiful, fully responsive Portfolio Website for students with an integrated local-persistence admin control panel.',
    category: 'React',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Context API'],
    githubLink: 'https://github.com',
    liveDemoLink: 'https://ais-pre-d3653vhax62mvw2n2aehdb-839786792711.asia-east1.run.app',
    imageUrl: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=600'
  },
  {
    id: 'p2',
    title: 'Student Academic DBMS Project',
    description: 'A clean database schemas modeling student academic metrics and performance records with dynamic data queries.',
    category: 'University Project',
    techStack: ['SQL', 'DBMS', 'Python', 'Relational Schemas'],
    githubLink: 'https://github.com',
    liveDemoLink: '#',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600'
  },
  {
    id: 'p3',
    title: 'The Solitary Horizon AI Visualizer',
    description: 'An interactive concept website framing generative imagery and scripting stories for an AI-produced cinematic intro.',
    category: 'AI Film',
    techStack: ['Midjourney', 'Runway', 'Generative AI', 'Tailwind CSS'],
    githubLink: 'https://github.com',
    liveDemoLink: '#',
    imageUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=600'
  }
];

const defaultFilms: AIFilm[] = [
  {
    id: 'f1',
    title: 'Ethereal Bengaluru - AI Cinematic Story',
    description: 'A conceptual AI film narrating Bengaluru’s rapid synthesis of traditional heritage and cutting-edge silicon hubs.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    aiToolsUsed: ['Midjourney', 'Runway Gen-3', 'ElevenLabs', 'CapCut']
  }
];

const defaultCertificates: Certificate[] = [
  {
    id: 'c1',
    name: 'BS Matriculation & Foundation Certificate',
    issuer: 'IIT Madras',
    date: '2025-05',
    certificateLink: 'https://onlinedegree.iitm.ac.in/',
    imageUrl: 'https://images.unsplash.com/photo-1589330694653-ded6df53f6ee?q=80&w=800'
  }
];

const defaultTimeline: TimelineEntry[] = [
  {
    id: 't1',
    year: '2024',
    title: 'IIT Madras Admission',
    description: 'Successfully joined the BS Degree program in Data Science and Applications at IIT Madras, mastering Python programming, statistical analysis, and algorithmic mathematics.'
  },
  {
    id: 't2',
    year: '2025',
    title: 'Enrolled at Institute of Innovation Bengaluru',
    description: 'Began real-world product training, modern UI layouts with React, building deep competencies in interactive applications and DBMS structures.'
  },
  {
    id: 't3',
    year: '2026',
    title: 'Fusing Data Analytics with Creative AI Filmmaking',
    description: 'Active explorer creating short AI cinematic scripts, combining technical DBMS foundations with generative narrative layouts.'
  }
];

const defaultResumes: Resume[] = [
  {
    id: 'r1',
    title: 'Sakshi Choudhary - Modern Portfolio Resume',
    description: 'Academic student developer resume targeting entry-level Software Developer and Data Associate roles.',
    pdfUrl: '#'
  }
];

const defaultContact: Contact = {
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  youtube: 'https://youtube.com',
  email: 'sakshi.sot.2428@pwioi.com'
};

// LocalStorage Helper functions
export function getData<T>(key: string, defaultValue: T): T {
  try {
    const rawData = localStorage.getItem(key);
    if (!rawData) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(rawData) as T;
  } catch (error) {
    console.error(`Error loading data for key "${key}":`, error);
    return defaultValue;
  }
}

export function saveData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data for key "${key}":`, error);
  }
}

// Global initialization function to check and bootstrap storage with default honest data
export function initializeStorage(): void {
  getData<Profile>('profile', defaultProfile);
  getData<Skill[]>('skills', defaultSkills);
  getData<Project[]>('projects', defaultProjects);
  getData<AIFilm[]>('films', defaultFilms);
  getData<Certificate[]>('certificates', defaultCertificates);
  getData<TimelineEntry[]>('timeline', defaultTimeline);
  getData<Resume[]>('resumes', defaultResumes);
  getData<Contact>('contact', defaultContact);
}
