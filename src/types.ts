export interface Profile {
  id: string;
  name: string;
  education: string[];
  shortIntro: string;
  currentLearning: string[];
  careerGoals: string;
  aboutText: string;
  profilePhoto: string;
}

export type SkillCategory = 'Programming' | 'Web Development' | 'Databases' | 'Data Analytics' | 'AI Tools' | 'Machine Learning';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
}

export type ProjectCategory = 'React' | 'Web Development' | 'AI Film' | 'AI/ML' | 'Data Analytics' | 'University Project' | 'Personal Project';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  techStack: string[];
  githubLink: string;
  liveDemoLink: string;
  imageUrl: string;
}

export interface AIFilm {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  youtubeUrl: string;
  aiToolsUsed: string[];
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  certificateLink: string;
  imageUrl: string;
}

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface Resume {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
}

export interface Contact {
  github: string;
  linkedin: string;
  youtube: string;
  email: string;
}
