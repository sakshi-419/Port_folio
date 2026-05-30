import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, User, Code, FolderGit2, Sparkles, Award, 
  Calendar, FileText, Mail, Plus, Trash2, Edit3, Search, X, 
  Save, Heart, GraduationCap, Link2, Download, CheckCircle, TrendingUp
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { usePortfolio } from '../context/PortfolioContext';
import { Skill, Project, AIFilm, Certificate, TimelineEntry, Resume, SkillCategory, ProjectCategory } from '../types';

type AdminTab = 'dashboard' | 'profile' | 'skills' | 'projects' | 'films' | 'certificates' | 'timeline' | 'resumes' | 'contact';

export default function AdminDashboard() {
  const {
    profile, updateProfile,
    skills, addSkill, updateSkill, deleteSkill,
    projects, addProject, updateProject, deleteProject,
    films, addFilm, updateFilm, deleteFilm,
    certificates, addCertificate, updateCertificate, deleteCertificate,
    timeline, addTimelineEntry, updateTimelineEntry, deleteTimelineEntry,
    resumes, addResume, updateResume, deleteResume,
    contact, updateContact
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Search/Filter states inside Admin workspace
  const [adminSearchQuery, setAdminSearchQuery] = useState('');

  // Editing Item modal helper states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form temporary bindings
  const [profileForm, setProfileForm] = useState({ ...profile });
  const [contactForm, setContactForm] = useState({ ...contact });

  // Entity initial templates
  const [skillForm, setSkillForm] = useState<{ name: string; category: SkillCategory }>({ name: '', category: 'Programming' });
  const [projectForm, setProjectForm] = useState<{
    title: string; description: string; category: ProjectCategory; techStack: string; githubLink: string; liveDemoLink: string; imageUrl: string;
  }>({ title: '', description: '', category: 'React', techStack: '', githubLink: '', liveDemoLink: '', imageUrl: '' });
  const [filmForm, setFilmForm] = useState({ title: '', description: '', thumbnailUrl: '', youtubeUrl: '', aiToolsUsed: '' });
  const [certificateForm, setCertificateForm] = useState({ name: '', issuer: '', date: '', certificateLink: '', imageUrl: '' });
  const [timelineForm, setTimelineForm] = useState({ year: '', title: '', description: '' });
  const [resumeForm, setResumeForm] = useState({ title: '', description: '', pdfUrl: '' });

  // Toast notifier helper
  const triggerToast = (message: string) => {
    setToastMsg(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  // Profile Save
  const handleProfileSave = (e: FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    triggerToast('Profile updated successfully!');
  };

  // Image Upload Handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      triggerToast('Please upload a valid image file (JPG, PNG, or WEBP).');
      return;
    }

    // Limit size for localStorage limits (e.g., 2.5MB maximum)
    if (file.size > 2.5 * 1024 * 1024) {
      triggerToast('Image is too large. Please select a photo under 2.5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const base64String = event.target.result as string;
        setProfileForm(prev => ({ ...prev, profilePhoto: base64String }));
        triggerToast('Image preview loaded! Click "Save Bio Profile" or "Save Picture" to apply.');
      }
    };
    reader.onerror = () => {
      triggerToast('Error reading file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  // Contact Save
  const handleContactSave = (e: FormEvent) => {
    e.preventDefault();
    updateContact(contactForm);
    triggerToast('Contact information saved!');
  };

  // Chart Data Synthesis for Recharts
  const chartData = [
    { name: 'Skills', count: skills.length, color: '#FF4FA3' },
    { name: 'Projects', count: projects.length, color: '#FF85C2' },
    { name: 'AI Films', count: films.length, color: '#FFD6E8' },
    { name: 'Certificates', count: certificates.length, color: '#FF4FA3' },
    { name: 'Timeline', count: timeline.length, color: '#FF85C2' },
    { name: 'Resumes', count: resumes.length, color: '#2D2D2D' }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#FFF9FC]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-white border border-pink-border/50 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 px-2.5 rounded-full bg-light-pink text-primary-pink text-[10px] font-black uppercase tracking-wider">CMS Mode</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-text-muted font-mono">Live Sync Connected</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display text-text-dark mt-1">
              Portfolio Content Manager
            </h1>
            <p className="text-xs text-text-muted mt-0.5">
              Reflect updates onto public pages instantly without writing React code. Powered by client-only Local Storage.
            </p>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-text-muted">Administrator:</span>
            <div className="px-3.5 py-1.5 bg-light-pink font-bold text-primary-pink text-xs rounded-xl border border-pink-border/10">
              Sakshi Choudhary
            </div>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          
          {/* Admin Sidebar Navigation */}
          <div className="w-full lg:w-64 shrink-0 bg-white border border-pink-border/60 rounded-3xl p-4 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-black tracking-widest text-text-muted px-4 py-2 block">Manager Tabs</span>
            
            <button
              onClick={() => { setActiveTab('dashboard'); setAdminSearchQuery(''); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'dashboard' ? 'pink-gradient text-white shadow-sm' : 'text-text-muted hover:bg-light-pink/20 hover:text-primary-pink'}`}
            >
              <LayoutDashboard size={14} />
              <span>Overview Stats</span>
            </button>

            <button
              onClick={() => { setActiveTab('profile'); setAdminSearchQuery(''); setProfileForm({ ...profile }); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'profile' ? 'pink-gradient text-white shadow-sm' : 'text-text-muted hover:bg-light-pink/20 hover:text-primary-pink'}`}
            >
              <User size={14} />
              <span>Bio Profile</span>
            </button>

            <button
              onClick={() => { setActiveTab('skills'); setAdminSearchQuery(''); setShowAddForm(false); setEditingId(null); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'skills' ? 'pink-gradient text-white shadow-sm' : 'text-text-muted hover:bg-light-pink/20 hover:text-primary-pink'}`}
            >
              <Code size={14} />
              <span>Skills Matrix</span>
              <span className="ml-auto text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">{skills.length}</span>
            </button>

            <button
              onClick={() => { setActiveTab('projects'); setAdminSearchQuery(''); setShowAddForm(false); setEditingId(null); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'projects' ? 'pink-gradient text-white shadow-sm' : 'text-text-muted hover:bg-light-pink/20 hover:text-primary-pink'}`}
            >
              <FolderGit2 size={14} />
              <span>Projects Catalog</span>
              <span className="ml-auto text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">{projects.length}</span>
            </button>

            <button
              onClick={() => { setActiveTab('films'); setAdminSearchQuery(''); setShowAddForm(false); setEditingId(null); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'films' ? 'pink-gradient text-white shadow-sm' : 'text-text-muted hover:bg-light-pink/20 hover:text-primary-pink'}`}
            >
              <Sparkles size={14} />
              <span>AI Films Studio</span>
              <span className="ml-auto text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">{films.length}</span>
            </button>

            <button
              onClick={() => { setActiveTab('certificates'); setAdminSearchQuery(''); setShowAddForm(false); setEditingId(null); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'certificates' ? 'pink-gradient text-white shadow-sm' : 'text-text-muted hover:bg-light-pink/20 hover:text-primary-pink'}`}
            >
              <Award size={14} />
              <span>Certifications</span>
              <span className="ml-auto text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">{certificates.length}</span>
            </button>

            <button
              onClick={() => { setActiveTab('timeline'); setAdminSearchQuery(''); setShowAddForm(false); setEditingId(null); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'timeline' ? 'pink-gradient text-white shadow-sm' : 'text-text-muted hover:bg-light-pink/20 hover:text-primary-pink'}`}
            >
              <Calendar size={14} />
              <span>Study Timeline</span>
              <span className="ml-auto text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">{timeline.length}</span>
            </button>

            <button
              onClick={() => { setActiveTab('resumes'); setAdminSearchQuery(''); setShowAddForm(false); setEditingId(null); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'resumes' ? 'pink-gradient text-white shadow-sm' : 'text-text-muted hover:bg-light-pink/20 hover:text-primary-pink'}`}
            >
              <FileText size={14} />
              <span>CV Document List</span>
              <span className="ml-auto text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">{resumes.length}</span>
            </button>

            <button
              onClick={() => { setActiveTab('contact'); setAdminSearchQuery(''); setContactForm({ ...contact }); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'contact' ? 'pink-gradient text-white shadow-sm' : 'text-text-muted hover:bg-light-pink/20 hover:text-primary-pink'}`}
            >
              <Mail size={14} />
              <span>Contact Coordinates</span>
            </button>
          </div>

          {/* Tab Content Canvas panel */}
          <div className="flex-grow w-full bg-white border border-pink-border/60 rounded-3xl p-6 md:p-8 shadow-sm">
            
            {/* Dashboard Overview Section */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-extrabold text-text-dark tracking-tight">Executive Dashboard Stats</h2>
                  <p className="text-xs text-text-muted">High-level quantitative synthesis of the current portfolio collections details.</p>
                </div>

                {/* Counters Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4.5 bg-[#FFF9FC] rounded-2xl border border-pink-border/40 text-center">
                    <Code className="text-primary-pink mx-auto mb-1" size={20} />
                    <span className="text-2xl font-extrabold tracking-tight block text-text-dark">{skills.length}</span>
                    <span className="text-[10px] font-bold text-text-muted uppercase">Skills Log</span>
                  </div>
                  <div className="p-4.5 bg-[#FFF9FC] rounded-2xl border border-pink-border/40 text-center">
                    <FolderGit2 className="text-primary-pink mx-auto mb-1" size={20} />
                    <span className="text-2xl font-extrabold tracking-tight block text-text-dark">{projects.length}</span>
                    <span className="text-[10px] font-bold text-text-muted uppercase">Projects Active</span>
                  </div>
                  <div className="p-4.5 bg-[#FFF9FC] rounded-2xl border border-pink-border/40 text-center">
                    <Sparkles className="text-primary-pink mx-auto mb-1" size={20} />
                    <span className="text-2xl font-extrabold tracking-tight block text-text-dark">{films.length}</span>
                    <span className="text-[10px] font-bold text-text-muted uppercase">AI Films Produced</span>
                  </div>
                  <div className="p-4.5 bg-[#FFF9FC] rounded-2xl border border-pink-border/40 text-center">
                    <Award className="text-primary-pink mx-auto mb-1" size={20} />
                    <span className="text-2xl font-extrabold tracking-tight block text-text-dark">{certificates.length}</span>
                    <span className="text-[10px] font-bold text-text-muted uppercase">Certificates Uploaded</span>
                  </div>
                  <div className="p-4.5 bg-[#FFF9FC] rounded-2xl border border-pink-border/40 text-center">
                    <Calendar className="text-primary-pink mx-auto mb-1" size={20} />
                    <span className="text-2xl font-extrabold tracking-tight block text-text-dark">{timeline.length}</span>
                    <span className="text-[10px] font-bold text-text-muted uppercase">Timeline Nodes</span>
                  </div>
                  <div className="p-4.5 bg-[#FFF9FC] rounded-2xl border border-pink-border/40 text-center">
                    <FileText className="text-primary-pink mx-auto mb-1" size={20} />
                    <span className="text-2xl font-extrabold tracking-tight block text-text-dark">{resumes.length}</span>
                    <span className="text-[10px] font-bold text-text-muted uppercase">Resumes Registered</span>
                  </div>
                </div>

                {/* Recharts Analytics Module */}
                <div className="p-5 border border-pink-border/30 bg-white rounded-3xl shadow-xs">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp size={16} className="text-primary-pink" />
                    <h3 className="font-display font-extrabold text-sm text-text-dark">Collections Volumetric Weight</h3>
                  </div>

                  <div className="h-48 md:h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                        <XAxis dataKey="name" stroke="#666666" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="#666666" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                        <Tooltip cursor={{ fill: 'rgba(255, 79, 163, 0.04)' }} contentStyle={{ fontSize: '11px', borderRadius: '12px', border: '1px solid #FFD6E8' }} />
                        <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={24}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab Editor */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold text-text-dark tracking-tight">Edit Bio Profile Card</h2>
                  <p className="text-xs text-text-muted font-medium">Configure primary bio strings, learning lists, profile photos.</p>
                </div>

                <form onSubmit={handleProfileSave} className="space-y-5">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[11px] font-extrabold text-[#2d2d2d] uppercase tracking-wider mb-1.5">(Display) Professional Name</label>
                      <input 
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full text-xs p-3 border border-pink-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-pink text-[#2d2d2d] bg-white font-medium"
                      />
                    </div>
                  </div>

                  {/* Profile Settings - Avatar Upload, Preview, Remove & Save */}
                  <div className="bg-[#FFF9FC] rounded-2xl border border-pink-border/40 p-5 space-y-4">
                    <h3 className="text-xs font-extrabold text-primary-pink uppercase tracking-widest font-sans">Profile Settings</h3>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      {/* Current Picture Preview or Initials fallback SC */}
                      <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden shrink-0 aspect-square flex items-center justify-center bg-white">
                        {profileForm.profilePhoto ? (
                          <img 
                            src={profileForm.profilePhoto} 
                            alt="Profile Preview" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full pink-gradient flex items-center justify-center text-white text-3xl font-extrabold font-display select-none">
                            SC
                          </div>
                        )}
                      </div>

                      {/* Control buttons & guidelines */}
                      <div className="space-y-1.5 text-center sm:text-left flex-grow">
                        <p className="text-sm font-bold text-text-dark font-sans">Profile Picture</p>
                        <p className="text-xs text-text-muted font-medium">Supports JPG, PNG or WEBP formats under 2.5MB.</p>
                        
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
                          <label className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-pink-border hover:border-primary-pink text-text-dark hover:text-primary-pink transition-colors rounded-xl text-xs font-bold cursor-pointer shadow-sm">
                            <Plus size={13} />
                            <span>Change Photo</span>
                            <input 
                              type="file" 
                              accept="image/png, image/jpeg, image/jpg, image/webp" 
                              onChange={handleImageChange} 
                              className="hidden"
                            />
                          </label>

                          {profileForm.profilePhoto && (
                            <button
                              type="button"
                              onClick={() => {
                                setProfileForm(prev => ({ ...prev, profilePhoto: '' }));
                                triggerToast('Photo preview removed. Save to apply.');
                              }}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-colors rounded-xl text-xs font-bold cursor-pointer shadow-sm"
                            >
                              <Trash2 size={13} />
                              <span>Remove Photo</span>
                            </button>
                          )}

                          {profileForm.profilePhoto !== profile.profilePhoto && (
                            <button
                              type="button"
                              onClick={() => {
                                updateProfile({ ...profile, profilePhoto: profileForm.profilePhoto });
                                triggerToast('Profile picture saved successfully!');
                              }}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 transition-colors rounded-xl text-xs font-bold cursor-pointer shadow-sm"
                            >
                              <CheckCircle size={13} />
                              <span>Save Picture</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-[#2d2d2d] uppercase tracking-wider mb-1.5">Education List (Separated by enters or new lines)</label>
                    <textarea 
                      rows={2}
                      value={profileForm.education ? profileForm.education.join('\n') : ''}
                      onChange={(e) => setProfileForm({ ...profileForm, education: e.target.value.split('\n').filter(Boolean) })}
                      className="w-full text-xs p-3 border border-pink-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-pink text-[#2d2d2d] bg-white resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[11px] font-extrabold text-[#2d2d2d] uppercase tracking-wider mb-1.5">Short Introduction Text (Hero display)</label>
                      <textarea 
                        rows={2}
                        value={profileForm.shortIntro}
                        onChange={(e) => setProfileForm({ ...profileForm, shortIntro: e.target.value })}
                        className="w-full text-xs p-3 border border-pink-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-pink text-[#2d2d2d] bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-[#2d2d2d] uppercase tracking-wider mb-1.5">Current Active Learning Focus (Comma separated values)</label>
                    <input 
                      type="text"
                      value={profileForm.currentLearning ? profileForm.currentLearning.join(', ') : ''}
                      onChange={(e) => setProfileForm({ ...profileForm, currentLearning: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                      className="w-full text-xs p-3 border border-pink-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-pink text-[#2d2d2d] bg-white"
                      placeholder="Python, SQL, React"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-extrabold text-[#2d2d2d] uppercase tracking-wider mb-1.5">Career & Academic Aspirations</label>
                      <textarea 
                        rows={4}
                        value={profileForm.careerGoals}
                        onChange={(e) => setProfileForm({ ...profileForm, careerGoals: e.target.value })}
                        className="w-full text-xs p-3 border border-pink-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-pink text-[#2d2d2d] bg-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-extrabold text-[#2d2d2d] uppercase tracking-wider mb-1.5">About Details Summary Text (About page panel)</label>
                      <textarea 
                        rows={4}
                        value={profileForm.aboutText}
                        onChange={(e) => setProfileForm({ ...profileForm, aboutText: e.target.value })}
                        className="w-full text-xs p-3 border border-pink-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-pink text-[#2d2d2d] bg-white resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 pink-gradient hover:brightness-105 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <Save size={14} />
                      <span>Save Bio Profile</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Contacts Tab Editor */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold text-text-dark tracking-tight">Contact Channels coordinates</h2>
                  <p className="text-xs text-text-muted">Link social profiles for recruiters mapping.</p>
                </div>

                <form onSubmit={handleContactSave} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-extrabold text-[#2d2d2d] uppercase tracking-wider mb-1.5">Personal / Work Email Address</label>
                      <input 
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full text-xs p-3 border border-pink-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-pink text-[#2d2d2d] bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-extrabold text-[#2d2d2d] uppercase tracking-wider mb-1.5">LinkedIn Profile Link</label>
                      <input 
                        type="text"
                        value={contactForm.linkedin}
                        onChange={(e) => setContactForm({ ...contactForm, linkedin: e.target.value })}
                        className="w-full text-xs p-3 border border-pink-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-pink text-[#2d2d2d] bg-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-extrabold text-[#2d2d2d] uppercase tracking-wider mb-1.5">GitHub developer Profile URL</label>
                      <input 
                        type="text"
                        value={contactForm.github}
                        onChange={(e) => setContactForm({ ...contactForm, github: e.target.value })}
                        className="w-full text-xs p-3 border border-pink-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-pink text-[#2d2d2d] bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-extrabold text-[#2d2d2d] uppercase tracking-wider mb-1.5">YouTube Stream Channel Link</label>
                      <input 
                        type="text"
                        value={contactForm.youtube}
                        onChange={(e) => setContactForm({ ...contactForm, youtube: e.target.value })}
                        className="w-full text-xs p-3 border border-pink-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-pink text-[#2d2d2d] bg-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 pink-gradient hover:brightness-105 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <Save size={14} />
                      <span>Save Coordinates</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Dynamic Skills CRUD tab */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-text-dark tracking-tight">Skills Inventory</h2>
                    <p className="text-xs text-text-muted">Perform secure CRUD updates on educational proficiencies listing.</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setSkillForm({ name: '', category: 'Programming' });
                      setShowAddForm(!showAddForm);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2 pink-gradient text-white font-bold text-xs rounded-xl hover:brightness-105 transition-all text-center cursor-pointer"
                  >
                    {showAddForm ? <X size={13} /> : <Plus size={13} />}
                    <span>{showAddForm ? 'Close panel' : 'Add New Skill'}</span>
                  </button>
                </div>

                {/* Adding/Editing Skill Form Box */}
                {showAddForm && (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!skillForm.name.trim()) return;
                    if (editingId) {
                      updateSkill({ id: editingId, ...skillForm });
                      triggerToast('Skill updated successfully.');
                    } else {
                      addSkill(skillForm);
                      triggerToast('Added new skill record definition.');
                    }
                    setSkillForm({ name: '', category: 'Programming' });
                    setEditingId(null);
                    setShowAddForm(false);
                  }} className="p-5 border border-pink-border bg-[#FFF9FC] rounded-2xl space-y-4">
                    <h3 className="font-display font-extrabold text-sm text-text-dark">
                      {editingId ? 'Modify Skill Entry' : 'Write new Skill specification'}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">Skill Name</label>
                        <input
                          type="text"
                          required
                          value={skillForm.name}
                          onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                          className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                          placeholder="e.g. Pandas, TypeScript"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">Category Group</label>
                        <select
                          value={skillForm.category}
                          onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value as SkillCategory })}
                          className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none appearance-none"
                        >
                          <option value="Programming">Programming</option>
                          <option value="Web Development">Web Development</option>
                          <option value="Databases">Databases</option>
                          <option value="Data Analytics">Data Analytics</option>
                          <option value="AI Tools">AI Tools</option>
                          <option value="Machine Learning">Machine Learning</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-2 flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => { setShowAddForm(false); setEditingId(null); }}
                        className="px-4 py-2 text-xs font-bold text-text-muted hover:text-text-dark"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-text-dark hover:bg-black text-white text-xs font-bold rounded-xl"
                      >
                        {editingId ? 'Modify Record' : 'Save Definition'}
                      </button>
                    </div>
                  </form>
                )}

                {/* Live Searching */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted">
                    <Search size={14} className="text-[#FF85C2]" />
                  </span>
                  <input
                    type="text"
                    value={adminSearchQuery}
                    onChange={(e) => setAdminSearchQuery(e.target.value)}
                    placeholder="Search in skills indexes..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-pink-border rounded-xl focus:outline-none"
                  />
                </div>

                {/* Table list */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-text-dark">
                    <thead className="bg-[#FFF9FC] text-text-muted text-[10px] uppercase font-bold border-b border-pink-border/30">
                      <tr>
                        <th className="p-4">Competency Name</th>
                        <th className="p-4">Skill Category Group</th>
                        <th className="p-4 text-right">Actions Panel</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-border/10">
                      {skills.filter(s => s.name.toLowerCase().includes(adminSearchQuery.toLowerCase()))
                        .map((s) => (
                          <tr key={s.id} className="hover:bg-slate-50/55">
                            <td className="p-4 font-semibold">{s.name}</td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 bg-light-pink/40 text-primary-pink rounded font-semibold text-[10px] tracking-wide">
                                {s.category}
                              </span>
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => {
                                  setEditingId(s.id);
                                  setSkillForm({ name: s.name, category: s.category });
                                  setShowAddForm(true);
                                }}
                                className="p-1 px-2.5 text-[10px] font-bold border border-[#FF85C2]/40 rounded hover:bg-light-pink/10 hover:text-primary-pink text-text-muted cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  deleteSkill(s.id);
                                  triggerToast('Deleted skill index.');
                                }}
                                className="p-1 px-2.5 text-[10px] font-bold text-red-600 border border-red-200 rounded hover:bg-red-50 cursor-pointer"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Dynamic Projects CRUD tab */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-text-dark tracking-tight">Projects Repository</h2>
                    <p className="text-xs text-text-muted">Add, Edit, or Delete projects in your responsive portfolio showcase list.</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setProjectForm({ title: '', description: '', category: 'React', techStack: '', githubLink: '', liveDemoLink: '', imageUrl: '' });
                      setShowAddForm(!showAddForm);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2 pink-gradient text-white font-bold text-xs rounded-xl hover:brightness-105 transition-all text-center cursor-pointer"
                  >
                    {showAddForm ? <X size={13} /> : <Plus size={13} />}
                    <span>{showAddForm ? 'Close panel' : 'Add New Project'}</span>
                  </button>
                </div>

                {/* Projects Form Box */}
                {showAddForm && (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!projectForm.title.trim()) return;
                    const finalPayload = {
                      ...projectForm,
                      techStack: projectForm.techStack.split(',').map(s => s.trim()).filter(Boolean)
                    };
                    if (editingId) {
                      updateProject({ id: editingId, ...finalPayload });
                      triggerToast('Project modified successfully!');
                    } else {
                      addProject(finalPayload);
                      triggerToast('Added new project profile details.');
                    }
                    setProjectForm({ title: '', description: '', category: 'React', techStack: '', githubLink: '', liveDemoLink: '', imageUrl: '' });
                    setEditingId(null);
                    setShowAddForm(false);
                  }} className="p-5 border border-pink-border bg-[#FFF9FC] rounded-2xl space-y-4">
                    <h3 className="font-display font-extrabold text-sm text-text-dark">
                      {editingId ? 'Modify Project Entry' : 'Deploy new Project profile'}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">Project Title</label>
                        <input
                          type="text"
                          required
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">Category Group</label>
                        <select
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as ProjectCategory })}
                          className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none appearance-none"
                        >
                          <option value="React">React</option>
                          <option value="Web Development">Web Development</option>
                          <option value="AI Film">AI Film</option>
                          <option value="AI/ML">AI/ML</option>
                          <option value="Data Analytics">Data Analytics</option>
                          <option value="University Project">University Project</option>
                          <option value="Personal Project">Personal Project</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">Description summary</label>
                      <textarea
                        rows={2}
                        required
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">Tech Stack (comma separated values)</label>
                        <input
                          type="text"
                          required
                          value={projectForm.techStack}
                          onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                          className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                          placeholder="React, CSS, Vite"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">Feature Cover Image URL</label>
                        <input
                          type="text"
                          value={projectForm.imageUrl}
                          onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                          className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                          placeholder="Paste custom image link"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">GitHub repository Link</label>
                        <input
                          type="text"
                          value={projectForm.githubLink}
                          onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                          className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                          placeholder="e.g. https://github.com..."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">Live Deployment Demo Link</label>
                        <input
                          type="text"
                          value={projectForm.liveDemoLink}
                          onChange={(e) => setProjectForm({ ...projectForm, liveDemoLink: e.target.value })}
                          className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                          placeholder="e.g. https://domain.vercel.app..."
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => { setShowAddForm(false); setEditingId(null); }}
                        className="px-4 py-2 text-xs font-bold text-text-muted"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-text-dark hover:bg-black text-white text-xs font-bold rounded-xl"
                      >
                        Deploy Record
                      </button>
                    </div>
                  </form>
                )}

                {/* Search */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted">
                    <Search size={14} className="text-[#FF85C2]" />
                  </span>
                  <input
                    type="text"
                    value={adminSearchQuery}
                    onChange={(e) => setAdminSearchQuery(e.target.value)}
                    placeholder="Search in projects catalog..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-pink-border rounded-xl focus:outline-none"
                  />
                </div>

                {/* Catalog rows list */}
                <div className="space-y-3">
                  {projects.filter(p => p.title.toLowerCase().includes(adminSearchQuery.toLowerCase()))
                    .map((p) => (
                      <div key={p.id} className="p-4 border border-pink-border/40 rounded-2xl bg-white hover:shadow-xs transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={p.imageUrl || 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=600'} 
                            alt={p.title} 
                            className="w-12 h-12 rounded-xl object-cover border border-pink-border/20"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-text-dark text-sm">{p.title}</h4>
                              <span className="text-[9px] font-extrabold bg-[#FFF9FC] border border-[#FF85C2]/40 text-primary-pink px-2 py-0.5 rounded-full uppercase tracking-wider">
                                {p.category}
                              </span>
                            </div>
                            <p className="text-[11px] text-text-muted line-clamp-1 mt-0.5">{p.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 md:self-center">
                          <button
                            onClick={() => {
                              setEditingId(p.id);
                              setProjectForm({
                                title: p.title,
                                description: p.description,
                                category: p.category,
                                techStack: p.techStack ? p.techStack.join(', ') : '',
                                githubLink: p.githubLink || '',
                                liveDemoLink: p.liveDemoLink || '',
                                imageUrl: p.imageUrl || ''
                              });
                              setShowAddForm(true);
                            }}
                            className="p-1.5 px-3 text-[10px] font-bold border border-[#FF85C2]/40 rounded hover:bg-light-pink/10 hover:text-primary-pink text-text-muted cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              deleteProject(p.id);
                              triggerToast('Project removed.');
                            }}
                            className="p-1.5 px-3 text-[10px] font-bold text-red-600 border border-red-200 rounded hover:bg-red-50 cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic AI Films CRUD Tab */}
            {activeTab === 'films' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-text-dark tracking-tight">AI Films Studio catalog</h2>
                    <p className="text-xs text-text-muted">Configure cinema shorts, description summaries, YouTube links.</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setFilmForm({ title: '', description: '', thumbnailUrl: '', youtubeUrl: '', aiToolsUsed: '' });
                      setShowAddForm(!showAddForm);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2 pink-gradient text-white font-bold text-xs rounded-xl hover:brightness-105 transition-all text-center cursor-pointer"
                  >
                    {showAddForm ? <X size={13} /> : <Plus size={13} />}
                    <span>{showAddForm ? 'Close panel' : 'Add New Film'}</span>
                  </button>
                </div>

                {/* Form Box */}
                {showAddForm && (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!filmForm.title.trim()) return;
                    const finalPayload = {
                      ...filmForm,
                      aiToolsUsed: filmForm.aiToolsUsed.split(',').map(s => s.trim()).filter(Boolean)
                    };
                    if (editingId) {
                      updateFilm({ id: editingId, ...finalPayload });
                      triggerToast('AI Film catalog updated.');
                    } else {
                      addFilm(finalPayload);
                      triggerToast('AI Film submitted successfully.');
                    }
                    setFilmForm({ title: '', description: '', thumbnailUrl: '', youtubeUrl: '', aiToolsUsed: '' });
                    setEditingId(null);
                    setShowAddForm(false);
                  }} className="p-5 border border-pink-border bg-[#FFF9FC] rounded-2xl space-y-4">
                    <h3 className="font-display font-extrabold text-sm text-text-dark">
                      {editingId ? 'Modify Film Index' : 'Register Cinema Short'}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">Film Title</label>
                        <input
                          type="text"
                          required
                          value={filmForm.title}
                          onChange={(e) => setFilmForm({ ...filmForm, title: e.target.value })}
                          className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">YouTube Video URL</label>
                        <input
                          type="text"
                          required
                          value={filmForm.youtubeUrl}
                          onChange={(e) => setFilmForm({ ...filmForm, youtubeUrl: e.target.value })}
                          className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                          placeholder="e.g. https://www.youtube.com/watch?v=..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">Cinematic Script Narrative Summary</label>
                      <textarea
                        rows={2}
                        required
                        value={filmForm.description}
                        onChange={(e) => setFilmForm({ ...filmForm, description: e.target.value })}
                        className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                        placeholder="Draft the film concept..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">Thumbnail Cover URL (Landscape)</label>
                        <input
                          type="text"
                          value={filmForm.thumbnailUrl}
                          onChange={(e) => setFilmForm({ ...filmForm, thumbnailUrl: e.target.value })}
                          className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">AI Tools Applied (comma separated)</label>
                        <input
                          type="text"
                          required
                          value={filmForm.aiToolsUsed}
                          onChange={(e) => setFilmForm({ ...filmForm, aiToolsUsed: e.target.value })}
                          className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                          placeholder="Midjourney, Elevenlabs, Runway"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => { setShowAddForm(false); setEditingId(null); }}
                        className="px-4 py-2 text-xs font-bold text-text-muted"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-text-dark hover:bg-black text-white text-xs font-bold rounded-xl"
                      >
                        Deploy Film
                      </button>
                    </div>
                  </form>
                )}

                {/* List rows */}
                <div className="space-y-3">
                  {films.filter(f => f.title.toLowerCase().includes(adminSearchQuery.toLowerCase()))
                    .map((f) => (
                      <div key={f.id} className="p-4 border border-pink-border/40 rounded-2xl bg-white hover:shadow-xs transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={f.thumbnailUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800'} 
                            alt={f.title} 
                            className="w-16 h-9 rounded-md object-cover border border-pink-border/20"
                          />
                          <div>
                            <h4 className="font-bold text-text-dark text-sm">{f.title}</h4>
                            <p className="text-[11px] text-text-muted line-clamp-1 mt-0.5">{f.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingId(f.id);
                              setFilmForm({
                                title: f.title,
                                description: f.description,
                                youtubeUrl: f.youtubeUrl || '',
                                thumbnailUrl: f.thumbnailUrl || '',
                                aiToolsUsed: f.aiToolsUsed ? f.aiToolsUsed.join(', ') : ''
                              });
                              setShowAddForm(true);
                            }}
                            className="p-1.5 px-3 text-[10px] font-bold border border-[#FF85C2]/40 rounded hover:bg-light-pink/10 hover:text-primary-pink text-text-muted cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              deleteFilm(f.id);
                              triggerToast('Removed cinematic short.');
                            }}
                            className="p-1.5 px-3 text-[10px] font-bold text-red-600 border border-red-200 rounded hover:bg-red-50 cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic Certificates CRUD */}
            {activeTab === 'certificates' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-text-dark tracking-tight">Certifications Dashboard</h2>
                    <p className="text-xs text-text-muted">Register verified IIT Madras foundations, Python courses badges.</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setCertificateForm({ name: '', issuer: '', date: '', certificateLink: '', imageUrl: '' });
                      setShowAddForm(!showAddForm);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2 pink-gradient text-white font-bold text-xs rounded-xl hover:brightness-105 transition-all text-center cursor-pointer"
                  >
                    {showAddForm ? <X size={13} /> : <Plus size={13} />}
                    <span>{showAddForm ? 'Close panel' : 'Add New'}</span>
                  </button>
                </div>

                {showAddForm && (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!certificateForm.name.trim()) return;
                    if (editingId) {
                      updateCertificate({ id: editingId, ...certificateForm });
                      triggerToast('Certificate modified.');
                    } else {
                      addCertificate(certificateForm);
                      triggerToast('Certification logged successfully.');
                    }
                    setCertificateForm({ name: '', issuer: '', date: '', certificateLink: '', imageUrl: '' });
                    setEditingId(null);
                    setShowAddForm(false);
                  }} className="p-5 border border-pink-border bg-[#FFF9FC] rounded-2xl space-y-4">
                    <h3 className="font-display font-extrabold text-sm text-text-dark">Logging Certificate</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">Award Title</label>
                        <input
                          type="text"
                          required
                          value={certificateForm.name}
                          onChange={(e) => setCertificateForm({ ...certificateForm, name: e.target.value })}
                          className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                          placeholder="e.g. Foundations of Data Analytics"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">Issuer Platform</label>
                        <input
                          type="text"
                          required
                          value={certificateForm.issuer}
                          onChange={(e) => setCertificateForm({ ...certificateForm, issuer: e.target.value })}
                          className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                          placeholder="e.g. IIT Madras"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">Issue Date (YYYY-MM)</label>
                        <input
                          type="text"
                          required
                          value={certificateForm.date}
                          onChange={(e) => setCertificateForm({ ...certificateForm, date: e.target.value })}
                          className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                          placeholder="2026-05"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">Verification URL Link</label>
                        <input
                          type="text"
                          value={certificateForm.certificateLink}
                          onChange={(e) => setCertificateForm({ ...certificateForm, certificateLink: e.target.value })}
                          className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">Certificate Image preview URL</label>
                      <input
                        type="text"
                        value={certificateForm.imageUrl}
                        onChange={(e) => setCertificateForm({ ...certificateForm, imageUrl: e.target.value })}
                        className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                      />
                    </div>

                    <div className="pt-2 flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => { setShowAddForm(false); setEditingId(null); }}
                        className="px-4 py-2 text-xs font-bold text-text-muted"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-text-dark hover:bg-black text-white text-xs font-bold rounded-xl"
                      >
                        Save Certificate
                      </button>
                    </div>
                  </form>
                )}

                {/* Rows list */}
                <div className="space-y-3">
                  {certificates.filter(c => c.name.toLowerCase().includes(adminSearchQuery.toLowerCase()))
                    .map((c) => (
                      <div key={c.id} className="p-4 border border-pink-border/40 rounded-2xl bg-white hover:shadow-xs flex items-center justify-between gap-4">
                        <div>
                          <h4 className="font-bold text-text-dark text-sm">{c.name}</h4>
                          <span className="text-[10px] text-text-muted mt-0.5 block">{c.issuer} &bull; {c.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingId(c.id);
                              setCertificateForm({
                                name: c.name,
                                issuer: c.issuer,
                                date: c.date,
                                certificateLink: c.certificateLink || '',
                                imageUrl: c.imageUrl || ''
                              });
                              setShowAddForm(true);
                            }}
                            className="p-1 px-2.5 text-[10px] font-bold border border-[#FF85C2]/40 rounded hover:bg-light-pink/10 hover:text-primary-pink text-text-muted cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              deleteCertificate(c.id);
                              triggerToast('Removed certificate definition.');
                            }}
                            className="p-1 px-2.5 text-[10px] font-bold text-red-600 border border-red-200 rounded hover:bg-red-50 cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic Timeline CRUD Tab */}
            {activeTab === 'timeline' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-text-dark tracking-tight">Academic Timeline Milestones</h2>
                    <p className="text-xs text-text-muted">Register education years, scholastic announcements, degrees details.</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setTimelineForm({ year: '', title: '', description: '' });
                      setShowAddForm(!showAddForm);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2 pink-gradient text-white font-bold text-xs rounded-xl hover:brightness-105 transition-all text-center cursor-pointer"
                  >
                    {showAddForm ? <X size={13} /> : <Plus size={13} />}
                    <span>{showAddForm ? 'Close panel' : 'Add New Node'}</span>
                  </button>
                </div>

                {/* Form Box */}
                {showAddForm && (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!timelineForm.year.trim() || !timelineForm.title.trim()) return;
                    if (editingId) {
                      updateTimelineEntry({ id: editingId, ...timelineForm });
                      triggerToast('Timeline record updated.');
                    } else {
                      addTimelineEntry(timelineForm);
                      triggerToast('Timeline event registered.');
                    }
                    setTimelineForm({ year: '', title: '', description: '' });
                    setEditingId(null);
                    setShowAddForm(false);
                  }} className="p-5 border border-pink-border bg-[#FFF9FC] rounded-2xl space-y-4">
                    <h3 className="font-display font-extrabold text-sm text-text-dark">Registrating Timeline Node</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">Academic Year</label>
                        <input
                          type="text"
                          required
                          value={timelineForm.year}
                          onChange={(e) => setTimelineForm({ ...timelineForm, year: e.target.value })}
                          className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                          placeholder="e.g. 2026"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">Milestone Heading Title</label>
                        <input
                          type="text"
                          required
                          value={timelineForm.title}
                          onChange={(e) => setTimelineForm({ ...timelineForm, title: e.target.value })}
                          className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                          placeholder="e.g. Admitted to BS course at IIT Madras"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">Details description</label>
                      <textarea
                        rows={3}
                        required
                        value={timelineForm.description}
                        onChange={(e) => setTimelineForm({ ...timelineForm, description: e.target.value })}
                        className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                      />
                    </div>

                    <div className="pt-2 flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => { setShowAddForm(false); setEditingId(null); }}
                        className="px-4 py-2 text-xs font-bold text-text-muted"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-text-dark hover:bg-black text-white text-xs font-bold rounded-xl"
                      >
                        Save Milestone
                      </button>
                    </div>
                  </form>
                )}

                {/* Rows list */}
                <div className="space-y-3">
                  {[...timeline].sort((a,b) => parseInt(b.year) - parseInt(a.year)).map((t) => (
                    <div key={t.id} className="p-4 border border-pink-border/40 rounded-2xl bg-white hover:shadow-xs flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 bg-light-pink text-primary-pink rounded-md font-bold text-[10px] tracking-wide shrink-0">
                            {t.year}
                          </span>
                          <h4 className="font-bold text-text-dark text-sm">{t.title}</h4>
                        </div>
                        <p className="text-[11px] text-text-muted mt-1 leading-relaxed">{t.description}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setEditingId(t.id);
                            setTimelineForm({
                              year: t.year,
                              title: t.title,
                              description: t.description
                            });
                            setShowAddForm(true);
                          }}
                          className="p-1 px-2.5 text-[10px] font-bold border border-[#FF85C2]/40 rounded hover:bg-light-pink/10 hover:text-primary-pink text-text-muted cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            deleteTimelineEntry(t.id);
                            triggerToast('Milestone removed.');
                          }}
                          className="p-1 px-2.5 text-[10px] font-bold text-red-600 border border-red-200 rounded hover:bg-red-50 cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic Resumes CRUD Tab */}
            {activeTab === 'resumes' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-text-dark tracking-tight">CV & Resumes document links</h2>
                    <p className="text-xs text-text-muted">Configure student downloadable Google Drive or hosted PDF references.</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setResumeForm({ title: '', description: '', pdfUrl: '' });
                      setShowAddForm(!showAddForm);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2 pink-gradient text-white font-bold text-xs rounded-xl hover:brightness-105 transition-all text-center cursor-pointer"
                  >
                    {showAddForm ? <X size={13} /> : <Plus size={13} />}
                    <span>{showAddForm ? 'Close panel' : 'Add New Link'}</span>
                  </button>
                </div>

                {showAddForm && (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!resumeForm.title.trim()) return;
                    if (editingId) {
                      updateResume({ id: editingId, ...resumeForm });
                      triggerToast('Resume modified successfully!');
                    } else {
                      addResume(resumeForm);
                      triggerToast('Resume document link registered.');
                    }
                    setResumeForm({ title: '', description: '', pdfUrl: '' });
                    setEditingId(null);
                    setShowAddForm(false);
                  }} className="p-5 border border-pink-border bg-[#FFF9FC] rounded-2xl space-y-4">
                    <h3 className="font-display font-extrabold text-sm text-text-dark">Registrating PDF Resume hook</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">Resume Label Title</label>
                        <input
                          type="text"
                          required
                          value={resumeForm.title}
                          onChange={(e) => setResumeForm({ ...resumeForm, title: e.target.value })}
                          className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                          placeholder="e.g. Sakshi Choudhary - General Developer Resume"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">PDF File URL (G-Drive or OneDrive link)</label>
                        <input
                          type="text"
                          required
                          value={resumeForm.pdfUrl}
                          onChange={(e) => setResumeForm({ ...resumeForm, pdfUrl: e.target.value })}
                          className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                          placeholder="e.g. https://drive.google.com/myfile..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-text-dark uppercase tracking-wide mb-1">Description summary details</label>
                      <textarea
                        rows={2}
                        required
                        value={resumeForm.description}
                        onChange={(e) => setResumeForm({ ...resumeForm, description: e.target.value })}
                        className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none"
                      />
                    </div>

                    <div className="pt-2 flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => { setShowAddForm(false); setEditingId(null); }}
                        className="px-4 py-2 text-xs font-bold text-text-muted"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-text-dark hover:bg-black text-white text-xs font-bold rounded-xl"
                      >
                        Deploy Resume PDF Link
                      </button>
                    </div>
                  </form>
                )}

                {/* Rows list */}
                <div className="space-y-3">
                  {resumes.map((r) => (
                    <div key={r.id} className="p-4 border border-pink-border/40 rounded-2xl bg-white hover:shadow-xs flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-text-dark text-sm">{r.title}</h4>
                        <p className="text-[11px] text-text-muted mt-0.5 line-clamp-1">{r.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingId(r.id);
                            setResumeForm({
                              title: r.title,
                              description: r.description,
                              pdfUrl: r.pdfUrl || ''
                            });
                            setShowAddForm(true);
                          }}
                          className="p-1 px-2.5 text-[10px] font-bold border border-[#FF85C2]/40 rounded hover:bg-light-pink/10 hover:text-primary-pink text-text-muted cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            deleteResume(r.id);
                            triggerToast('Removed resume link.');
                          }}
                          className="p-1 px-2.5 text-[10px] font-bold text-red-600 border border-red-200 rounded hover:bg-red-50 cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Synchronizing Success Toast Box Banner */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 p-4 border border-pink-border bg-white text-text-dark rounded-2xl shadow-xl flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
              <CheckCircle size={18} />
            </div>
            <div>
              <p className="text-xs font-extrabold">CMS Event Sync Complete</p>
              <p className="text-[10px] text-text-muted mt-0.5">{toastMsg}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
