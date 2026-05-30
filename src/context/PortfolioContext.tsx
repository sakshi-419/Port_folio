import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Profile, Skill, Project, AIFilm, Certificate, TimelineEntry, Resume, Contact } from '../types';
import { initializeStorage, getData, saveData } from '../utils/localStorage';

interface PortfolioContextType {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  films: AIFilm[];
  certificates: Certificate[];
  timeline: TimelineEntry[];
  resumes: Resume[];
  contact: Contact;
  
  // Update handlers
  updateProfile: (profile: Profile) => void;
  updateContact: (contact: Contact) => void;

  // Skills CRUD
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (skill: Skill) => void;
  deleteSkill: (id: string) => void;

  // Projects CRUD
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;

  // AI Films CRUD
  addFilm: (film: Omit<AIFilm, 'id'>) => void;
  updateFilm: (film: AIFilm) => void;
  deleteFilm: (id: string) => void;

  // Certificates CRUD
  addCertificate: (cert: Omit<Certificate, 'id'>) => void;
  updateCertificate: (cert: Certificate) => void;
  deleteCertificate: (id: string) => void;

  // Timeline CRUD
  addTimelineEntry: (entry: Omit<TimelineEntry, 'id'>) => void;
  updateTimelineEntry: (entry: TimelineEntry) => void;
  deleteTimelineEntry: (id: string) => void;

  // Resumes CRUD
  addResume: (resume: Omit<Resume, 'id'>) => void;
  updateResume: (resume: Resume) => void;
  deleteResume: (id: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  // Ensure storage is bootstrapped with our honest default datasets
  useEffect(() => {
    initializeStorage();
  }, []);

  const [profile, setProfile] = useState<Profile>(() => {
    initializeStorage();
    return getData<Profile>('profile', {} as Profile);
  });

  const [skills, setSkills] = useState<Skill[]>(() => {
    return getData<Skill[]>('skills', []);
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    return getData<Project[]>('projects', []);
  });

  const [films, setFilms] = useState<AIFilm[]>(() => {
    return getData<AIFilm[]>('films', []);
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    return getData<Certificate[]>('certificates', []);
  });

  const [timeline, setTimeline] = useState<TimelineEntry[]>(() => {
    return getData<TimelineEntry[]>('timeline', []);
  });

  const [resumes, setResumes] = useState<Resume[]>(() => {
    return getData<Resume[]>('resumes', []);
  });

  const [contact, setContact] = useState<Contact>(() => {
    return getData<Contact>('contact', {} as Contact);
  });

  // Profile
  const updateProfile = (newProfile: Profile) => {
    setProfile(newProfile);
    saveData('profile', newProfile);
  };

  // Contact
  const updateContact = (newContact: Contact) => {
    setContact(newContact);
    saveData('contact', newContact);
  };

  // Skills
  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill: Skill = { ...skill, id: `skill-${Date.now()}` };
    const updated = [...skills, newSkill];
    setSkills(updated);
    saveData('skills', updated);
  };

  const updateSkill = (updatedSkill: Skill) => {
    const updated = skills.map(s => s.id === updatedSkill.id ? updatedSkill : s);
    setSkills(updated);
    saveData('skills', updated);
  };

  const deleteSkill = (id: string) => {
    const updated = skills.filter(s => s.id !== id);
    setSkills(updated);
    saveData('skills', updated);
  };

  // Projects
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = { ...project, id: `project-${Date.now()}` };
    const updated = [...projects, newProject];
    setProjects(updated);
    saveData('projects', updated);
  };

  const updateProject = (updatedProject: Project) => {
    const updated = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
    setProjects(updated);
    saveData('projects', updated);
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    saveData('projects', updated);
  };

  // Films
  const addFilm = (film: Omit<AIFilm, 'id'>) => {
    const newFilm: AIFilm = { ...film, id: `film-${Date.now()}` };
    const updated = [...films, newFilm];
    setFilms(updated);
    saveData('films', updated);
  };

  const updateFilm = (updatedFilm: AIFilm) => {
    const updated = films.map(f => f.id === updatedFilm.id ? updatedFilm : f);
    setFilms(updated);
    saveData('films', updated);
  };

  const deleteFilm = (id: string) => {
    const updated = films.filter(f => f.id !== id);
    setFilms(updated);
    saveData('films', updated);
  };

  // Certificates
  const addCertificate = (cert: Omit<Certificate, 'id'>) => {
    const newCert: Certificate = { ...cert, id: `cert-${Date.now()}` };
    const updated = [...certificates, newCert];
    setCertificates(updated);
    saveData('certificates', updated);
  };

  const updateCertificate = (updatedCert: Certificate) => {
    const updated = certificates.map(c => c.id === updatedCert.id ? updatedCert : c);
    setCertificates(updated);
    saveData('certificates', updated);
  };

  const deleteCertificate = (id: string) => {
    const updated = certificates.filter(c => c.id !== id);
    setCertificates(updated);
    saveData('certificates', updated);
  };

  // Timeline
  const addTimelineEntry = (entry: Omit<TimelineEntry, 'id'>) => {
    const newEntry: TimelineEntry = { ...entry, id: `timeline-${Date.now()}` };
    const updated = [...timeline, newEntry];
    setTimeline(updated);
    saveData('timeline', updated);
  };

  const updateTimelineEntry = (updatedEntry: TimelineEntry) => {
    const updated = timeline.map(t => t.id === updatedEntry.id ? updatedEntry : t);
    setTimeline(updated);
    saveData('timeline', updated);
  };

  const deleteTimelineEntry = (id: string) => {
    const updated = timeline.filter(t => t.id !== id);
    setTimeline(updated);
    saveData('timeline', updated);
  };

  // Resumes
  const addResume = (resume: Omit<Resume, 'id'>) => {
    const newResume: Resume = { ...resume, id: `resume-${Date.now()}` };
    const updated = [...resumes, newResume];
    setResumes(updated);
    saveData('resumes', updated);
  };

  const updateResume = (updatedResume: Resume) => {
    const updated = resumes.map(r => r.id === updatedResume.id ? updatedResume : r);
    setResumes(updated);
    saveData('resumes', updated);
  };

  const deleteResume = (id: string) => {
    const updated = resumes.filter(r => r.id !== id);
    setResumes(updated);
    saveData('resumes', updated);
  };

  return (
    <PortfolioContext.Provider value={{
      profile,
      skills,
      projects,
      films,
      certificates,
      timeline,
      resumes,
      contact,
      updateProfile,
      updateContact,
      addSkill,
      updateSkill,
      deleteSkill,
      addProject,
      updateProject,
      deleteProject,
      addFilm,
      updateFilm,
      deleteFilm,
      addCertificate,
      updateCertificate,
      deleteCertificate,
      addTimelineEntry,
      updateTimelineEntry,
      deleteTimelineEntry,
      addResume,
      updateResume,
      deleteResume
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
