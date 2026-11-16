import React, { useState, useEffect } from 'react';
import {
  Download,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  Code2,
  Terminal,
  Database,
  Cpu,
  Layers,
  Award,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Sparkles,
  Send,
  Copy,
  Check,
  X,
  Menu,
  ArrowUp,
  Volume2,
  VolumeX,
  Briefcase
} from 'lucide-react';

import './App.css';
import CertificationsPage from './pages/CertificationsPage';
import EducationTimeline from './components/EducationTimeline';

const CURRENT_YEAR = 2026;

// Brand SVGs
const LinkedinIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const GithubIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

// Audio feedback generator
const playTone = (freq = 820) => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, audioCtx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch {
    // Audio context silently handled
  }
};

export default function App() {
  const [currentView, setCurrentView] = useState('portfolio'); // 'portfolio' | 'certifications'
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [skillCategoryFilter, setSkillCategoryFilter] = useState('all');
  const [certFilter, setCertFilter] = useState('all');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSound = (freq = 820) => {
    if (soundEnabled) playTone(freq);
  };

  // Hash change listener for single-page routing & GitHub Pages
  useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash;
      if (h === '#certifications-page' || h === '#certifications-deck' || h === '#deck') {
        setCurrentView('certifications');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('portfolio');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Scroll listener for sticky header & active nav section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'skills', 'projects', 'certifications', 'education', 'contact'];
      const scrollPos = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    handleSound(850);
    setMobileMenuOpen(false);

    if (currentView !== 'portfolio') {
      setCurrentView('portfolio');
      window.location.hash = `#${id}`;
      setTimeout(() => {
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return;
    }

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmailToClipboard = () => {
    handleSound(950);
    navigator.clipboard.writeText('gowthams9380@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSound(880);

    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) errors.subject = 'Please provide a subject.';
    if (!formData.message.trim()) errors.message = 'Please provide your message.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setFormSubmitted(true);

    const mailtoUrl = `mailto:gowthams9380@gmail.com?subject=${encodeURIComponent(
      formData.subject + ' - via Portfolio from ' + formData.name
    )}&body=${encodeURIComponent(formData.message + '\n\nSender Email: ' + formData.email)}`;
    window.location.href = mailtoUrl;
  };

  // Projects Data strictly from resume
  const projectsData = [
    {
      id: 1,
      num: 'PROJECT 01',
      title: 'College Bus Tracking Application',
      description:
        'Completed a role-based transport application for students, drivers and administrators, with GPS-based bus location tracking and map visualization.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Python', 'FastAPI', 'PostgreSQL', 'Leaflet', 'OpenStreetMap'],
      thumbnail: './assets/projects/bus-tracking.jpg',
      github: 'https://github.com/gowthams9380-max',
      details: {
        architecture: 'Role-based microservice architecture connecting dynamic real-time transport logs with interactive mapping.',
        keyFeatures: [
          'Role-based authentication & authorization for students, drivers, and transport administrators.',
          'Live GPS bus location streaming and route tracking with OpenStreetMap & Leaflet integration.',
          'Responsive dashboard built with React, TypeScript, and Tailwind CSS.',
          'High-performance backend API powered by Python & FastAPI with PostgreSQL persistence.'
        ]
      }
    },
    {
      id: 2,
      num: 'PROJECT 02',
      title: 'AI-Based Land Acquisition Delay Prediction & Early Warning System',
      description:
        'A location-based predictive analytics project that processes state, district and village inputs to estimate potential land-acquisition delay risk as a percentage.',
      technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
      thumbnail: './assets/projects/land-acquisition.jpg',
      github: 'https://github.com/gowthams9380-max',
      details: {
        architecture: 'End-to-end predictive analytics pipeline utilizing regression models to forecast project latency risk.',
        keyFeatures: [
          'Hierarchical geographical data ingestion across state, district, and village parameters.',
          'Comprehensive data cleaning, feature engineering, and statistical modeling with Pandas and NumPy.',
          'Machine-learning predictive risk calculation yielding precise delay probability percentages.',
          'Early warning reporting system to alert stakeholders to high-risk bureaucratic and acquisition bottlenecks.'
        ]
      }
    },
    {
      id: 3,
      num: 'PROJECT 03',
      title: 'AI Handwriting Verification System',
      description:
        'Built a handwriting image-comparison tool using pixel-level image differences without a CNN model.',
      technologies: ['Python', 'PIL', 'NumPy'],
      thumbnail: './assets/projects/handwriting-verification.jpg',
      github: 'https://github.com/gowthams9380-max',
      details: {
        architecture: 'Algorithmic computer vision engine relying on statistical pixel disparity matrices and structural matching.',
        keyFeatures: [
          'High-speed image pre-processing, grayscale thresholding, and binarization via Python Imaging Library (PIL).',
          'Matrix-based pixel disparity calculations implemented with vectorized NumPy operations.',
          'Lightweight, high-efficiency verification algorithm operating without heavy deep learning overhead.',
          'Clear similarity score generation indicating probability of signature or handwriting match.'
        ]
      }
    },
    {
      id: 4,
      num: 'PROJECT 04',
      title: 'Library Management System',
      description:
        'Developed a database-backed application to manage library records and basic operations.',
      technologies: ['Python', 'MySQL'],
      thumbnail: './assets/projects/library-management.jpg',
      github: 'https://github.com/gowthams9380-max',
      details: {
        architecture: 'Relational database management application with structured CRUD workflows and data validation.',
        keyFeatures: [
          'Normalized relational database schema designed and managed with MySQL.',
          'Python data layer handling book checkouts, returns, inventory tracking, and member registries.',
          'Validation logic preventing duplicate entries, lost books, and unreturned item discrepancies.',
          'Clean, reliable interface for quick library administration queries and auditing.'
        ]
      }
    }
  ];

  // Technical Skills Data strictly from resume
  const skillsCategories = [
    {
      id: 'programming',
      title: 'Programming',
      icon: Terminal,
      skills: ['Python', 'Java', 'C', 'C++']
    },
    {
      id: 'fundamentals',
      title: 'CS Fundamentals',
      icon: Cpu,
      skills: [
        'Object-Oriented Programming',
        'SQL',
        'Data Structures & Algorithms (Currently Learning)'
      ]
    },
    {
      id: 'web-backend',
      title: 'Web & Backend',
      icon: Layers,
      skills: [
        'HTML',
        'CSS',
        'JavaScript',
        'React',
        'TypeScript',
        'FastAPI',
        'Django',
        'Flask'
      ]
    },
    {
      id: 'databases-mapping',
      title: 'Databases & Mapping',
      icon: Database,
      skills: ['MySQL', 'PostgreSQL', 'Leaflet', 'OpenStreetMap']
    },
    {
      id: 'libraries-tools',
      title: 'Libraries & Tools',
      icon: Code2,
      skills: [
        'Pandas',
        'NumPy',
        'Scikit-learn',
        'PIL',
        'TensorFlow',
        'Keras',
        'OpenCV',
        'Jupyter Notebook',
        'VS Code'
      ]
    }
  ];

  const displayedSkillCategories =
    skillCategoryFilter === 'all'
      ? skillsCategories
      : skillsCategories.filter((cat) => cat.id === skillCategoryFilter);

  // Certifications Data strictly from resume
  const certificationsData = [
    {
      id: 1,
      org: 'Red Hat Academy',
      title: 'Application Development Programming in Java EE (AD183)',
      year: null,
      provider: 'redhat',
      description:
        'Enterprise Java programming, modular architecture, servlets, JPA, and enterprise application lifecycle standards.'
    },
    {
      id: 2,
      org: 'Anthropic',
      title: 'Claude 101',
      year: null,
      provider: 'anthropic',
      description:
        'Foundational principles of generative AI, large language models, prompt engineering, and API integration.'
    },
    {
      id: 3,
      org: 'Cisco Networking Academy',
      title: 'Introduction to Modern AI',
      year: '2026',
      provider: 'cisco',
      description:
        'Exploration of modern artificial intelligence principles, neural networks, machine learning paradigms, and data workflows.'
    },
    {
      id: 4,
      org: 'Cisco Networking Academy',
      title: 'C Essentials 1',
      year: '2025',
      provider: 'cisco',
      description:
        'Foundational low-level systems programming in C, memory management, pointers, and structured algorithm design.'
    },
    {
      id: 5,
      org: 'Cisco Networking Academy',
      title: 'Python Essentials 1',
      year: '2025',
      provider: 'cisco',
      description:
        'Core Python syntax, data types, control flow, functions, modular programming, and procedural logic.'
    },
    {
      id: 6,
      org: 'Hack & Fix Academy',
      title: 'Cybersecurity Career Starter Certification (CCSC)',
      year: '2025',
      provider: 'hackfix',
      description:
        'Core network defense, fundamental cybersecurity hygiene, threat modeling, vulnerability assessment, and host security.'
    },
    {
      id: 7,
      org: 'Infosys Springboard',
      title: 'Software Engineering',
      year: '2026',
      provider: 'infosys',
      description:
        'Software Development Life Cycle (SDLC), requirement analysis, system architecture, testing, and industry software practices.'
    },
    {
      id: 8,
      org: 'Infosys Springboard',
      title: 'Overview of Agile & DevOps',
      year: '2026',
      provider: 'infosys',
      description:
        'Agile methodologies, sprint cycles, continuous integration/continuous delivery (CI/CD), and modern DevOps principles.'
    },
    {
      id: 9,
      org: 'Infosys Springboard',
      title: 'Network & Host Analysis: Network Protocols',
      year: '2026',
      provider: 'infosys',
      description:
        'Deep packet and protocol inspection, OSI layers, TCP/IP architecture, socket communications, and host auditing.'
    }
  ];

  const displayedCertifications =
    certFilter === 'all'
      ? certificationsData
      : certificationsData.filter((cert) => cert.provider === certFilter);

  return (
    <div className="portfolio-root">
      {/* ====================================================================
          STICKY NAVIGATION BAR
          ==================================================================== */}
      <header className={`header-wrapper ${isScrolled ? 'header-scrolled' : ''}`}>
        <nav className="nav-container" aria-label="Main Navigation">
          {/* Brand Pill */}
          <a
            href="#home"
            className="nav-logo-group"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
          >
            <div className="nav-logo-pill">GS</div>
            <span className="nav-logo-name">Gowtham S</span>
          </a>

          {/* Desktop Nav Items */}
          <div className="nav-links-desktop">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'certifications', label: 'Certifications' },
              { id: 'education', label: 'Education' },
              { id: 'contact', label: 'Contact' }
            ].map((link) => (
              <button
                key={link.id}
                className={`nav-item-btn ${currentView === 'portfolio' && activeSection === link.id ? 'active' : ''}`}
                onClick={() => scrollToSection(link.id)}
              >
                {link.label}
              </button>
            ))}

            {/* Direct Switch to Interactive Deck Page */}
            <button
              className={`nav-item-btn ${currentView === 'certifications' ? 'active' : ''}`}
              onClick={() => {
                handleSound(900);
                window.location.hash = '#certifications-page';
                setCurrentView('certifications');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: currentView === 'certifications' ? '#925800' : 'inherit',
                fontWeight: currentView === 'certifications' ? 700 : 600,
                background: currentView === 'certifications' ? 'rgba(229,155,16,0.15)' : 'rgba(0,0,0,0.03)',
                border: '1px solid rgba(229,155,16,0.3)',
                borderRadius: '20px'
              }}
              title="Open Interactive Certifications Deck"
            >
              <Sparkles size={12} color="#e59b10" />
              <span>Deck Showcase</span>
            </button>
          </div>

          {/* Action Utilities */}
          <div className="nav-actions">
            {/* Audio Toggle */}
            <button
              className="icon-toggle-btn"
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) playTone(900);
              }}
              title={soundEnabled ? 'Mute audio clicks' : 'Enable luxury sound feedback'}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Resume Action */}
            <a
              href="./Gowtham_Intern_Resume.pdf"
              download="Gowtham_S_Resume.pdf"
              className="nav-resume-btn"
              onClick={() => handleSound(920)}
            >
              <Download size={14} />
              <span>Resume</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => {
                handleSound(800);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle mobile menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-panel" onClick={(e) => e.stopPropagation()}>
            <div>
              <div className="mobile-nav-header">
                <div className="nav-logo-group">
                  <div className="nav-logo-pill">GS</div>
                  <span className="nav-logo-name">Gowtham S</span>
                </div>
                <button
                  className="modal-close-pill"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mobile-nav-links">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'about', label: 'About Me' },
                  { id: 'skills', label: 'Technical Skills' },
                  { id: 'projects', label: 'Featured Projects' },
                  { id: 'certifications', label: 'Certifications' },
                  { id: 'education', label: 'Education' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`mobile-nav-link ${currentView === 'portfolio' && activeSection === item.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={16} color="#e59b10" />
                  </a>
                ))}

                <button
                  className={`mobile-nav-link ${currentView === 'certifications' ? 'active' : ''}`}
                  onClick={() => {
                    handleSound(900);
                    setMobileMenuOpen(false);
                    window.location.hash = '#certifications-page';
                    setCurrentView('certifications');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    background: currentView === 'certifications' ? 'var(--gold-light)' : '#fdf8ee',
                    fontWeight: 700,
                    border: '1px solid rgba(229,155,16,0.3)',
                    color: '#925800',
                    marginTop: '8px'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={15} color="#e59b10" />
                    <span>Certifications Deck (Gallery)</span>
                  </span>
                  <ChevronRight size={16} color="#e59b10" />
                </button>
              </div>
            </div>

            <div style={{ marginTop: '30px' }}>
              <a
                href="./Gowtham_Intern_Resume.pdf"
                download="Gowtham_S_Resume.pdf"
                className="hero-download-btn"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Download size={15} />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          PAGE ROUTING: CERTIFICATIONS SHOWCASE VS MAIN PORTFOLIO
          ==================================================================== */}
      {currentView === 'certifications' ? (
        <CertificationsPage
          onBackToPortfolio={() => {
            handleSound(800);
            setCurrentView('portfolio');
            window.location.hash = '#certifications';
          }}
        />
      ) : (
        <>
          {/* ====================================================================
              HERO SECTION (Luxury Editorial with Reference Aesthetic)
              ==================================================================== */}
          <section id="home" className="hero-section">
            <div className="hero-grid">
              {/* Left Column: Typography & Story */}
              <div className="hero-left">
                <div className="hero-badge-row">
                  <div className="hero-pill-category">
                    <Sparkles size={12} color="#e59b10" />
                    <span>Computer Science &amp; Engineering Student</span>
                  </div>
                  <div className="hero-pill-cgpa">
                    <Award size={13} />
                    <span>CGPA: 8.2 / 10</span>
                  </div>
                </div>

                <div className="hero-title-group">
                  <h1 className="hero-main-name">Gowtham S</h1>
                </div>

                <div className="hero-meta-strip">
                  <div className="hero-meta-item">
                    <GraduationCap size={15} color="#e59b10" />
                    <span>B.E. CSE | 2024–2028 (Expected)</span>
                  </div>
                  <div className="hero-meta-dot" />
                  <div className="hero-meta-item">
                    <MapPin size={15} color="#e59b10" />
                    <span>Bengaluru, Karnataka, India</span>
                  </div>
                </div>

                <div className="hero-cta-group">
                  <a
                    href="./Gowtham_Intern_Resume.pdf"
                    download="Gowtham_S_Resume.pdf"
                    className="hero-download-btn"
                    onClick={() => handleSound(950)}
                  >
                    <Download size={16} />
                    <span>DOWNLOAD RESUME (PDF)</span>
                  </a>

                  <div className="hero-social-strip">
                    <a
                      href="https://linkedin.com/in/gowtham-s-89179b386"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-social-pill"
                      title="LinkedIn Profile"
                      aria-label="LinkedIn"
                      onClick={() => handleSound(750)}
                    >
                      <LinkedinIcon size={18} />
                    </a>

                    <a
                      href="https://github.com/gowthams9380-max"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-social-pill"
                      title="GitHub Profile"
                      aria-label="GitHub"
                      onClick={() => handleSound(750)}
                    >
                      <GithubIcon size={18} />
                    </a>

                    <a
                      href="mailto:gowthams9380@gmail.com"
                      className="hero-social-pill"
                      title="Send Email"
                      aria-label="Email"
                      onClick={() => handleSound(750)}
                    >
                      <Mail size={18} />
                    </a>
                  </div>
                </div>

                <div className="hero-intro-card">
                  <p className="hero-intro-text">
                    &ldquo;Third-year Computer Science and Engineering student passionate about software engineering, predictive analytics, artificial intelligence and building practical technology solutions. I enjoy transforming ideas into useful applications while continuously improving my programming and problem-solving skills.&rdquo;
                  </p>
                </div>
              </div>

              {/* Right Column: Professional Portrait Stage */}
              <div className="hero-right">
                <div className="portrait-glow-circle" />

                <div className="portrait-frame-container">
                  <div className="portrait-inner-window">
                    <img
                      src="./user_portrait.jpg"
                      alt="Gowtham S - Computer Science and Engineering Student"
                      className="hero-portrait-image"
                    />

                    <div className="portrait-floating-badge">
                      <div className="badge-text-left">
                        <h4>Open for Internship</h4>
                        <p>Software Engineering • Bengaluru</p>
                      </div>
                      <div className="badge-status-dot" title="Available for opportunities" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================================
              STATISTICS STRIP SECTION
              ==================================================================== */}
          <section className="stats-strip-section" aria-label="Quick Highlights">
            <div className="stats-container">
              <div className="stats-brand-col">
                <span className="stats-brand-label">SINCE 2024</span>
                <h3 className="stats-brand-heading">Impact at a glance</h3>
              </div>

              <div className="stat-item">
                <div className="stat-number-row">
                  <span className="stat-num stat-num-gold">4</span>
                  <span className="stat-num">+</span>
                </div>
                <span className="stat-label">Engineered Projects</span>
              </div>

              <div className="stat-item">
                <div className="stat-number-row">
                  <span className="stat-num stat-num-gold">8.2</span>
                  <span className="stat-label" style={{ fontSize: '18px', color: '#fff', marginLeft: '2px' }}>/10</span>
                </div>
                <span className="stat-label">Academic CGPA</span>
              </div>

              <div className="stat-item">
                <div className="stat-number-row">
                  <span className="stat-num stat-num-gold">9</span>
                </div>
                <span className="stat-label">Listed Certifications / Credentials</span>
              </div>

              <div className="stat-item">
                <div className="stat-number-row">
                  <span className="stat-num stat-num-gold">2028</span>
                </div>
                <span className="stat-label">Expected Graduation</span>
              </div>
            </div>
          </section>

          {/* ====================================================================
              SECTION 01: ABOUT ME
              ==================================================================== */}
          <section id="about" className="section-wrapper">
            <div className="section-tag-row">
              <span className="section-tag-num">01</span>
              <div className="section-tag-line" />
              <span className="section-tag-num">About Me</span>
            </div>

            <h2 className="section-heading-main">Committed to Engineering Practical Technological Solutions</h2>
            <p className="section-subtext">
              Blending strong computer science fundamentals with hands-on development in full-stack web applications, machine learning workflows, and database architecture.
            </p>

            <div className="about-grid">
              <div className="about-editorial-text">
                <blockquote className="about-lead-quote">
                  &ldquo;Transforming conceptual ideas into useful, high-impact applications while continuously refining algorithmic depth.&rdquo;
                </blockquote>

                <p className="about-body-paragraph">
                  I am Gowtham S, a third-year Computer Science and Engineering student at Nagarjuna College of Engineering and Technology, Bengaluru. I have an academic CGPA of 8.2/10 and have completed projects involving predictive analytics, GPS-enabled tracking, image comparison and database-backed applications.
                </p>

                <p className="about-body-paragraph">
                  I am familiar with Python, Java, C, C++, SQL, web technologies and machine-learning libraries. I am currently strengthening my Data Structures and Algorithms skills and actively seeking opportunities to grow as a Software Engineer.
                </p>
              </div>

              <div className="about-highlights-grid">
                <div className="about-highlight-card">
                  <div className="about-card-icon">
                    <GraduationCap size={22} />
                  </div>
                  <h3 className="about-card-title">Academic Excellence</h3>
                  <p className="about-card-desc">
                    Consistent 8.2/10 CGPA in Bachelor of Engineering (Computer Science &amp; Engineering) at NCET Bengaluru.
                  </p>
                </div>

                <div className="about-highlight-card">
                  <div className="about-card-icon">
                    <Code2 size={22} />
                  </div>
                  <h3 className="about-card-title">Diverse Solutions</h3>
                  <p className="about-card-desc">
                    Hands-on project experience spanning GPS bus tracking, predictive analytics, image analysis, and relational database systems.
                  </p>
                </div>

                <div className="about-highlight-card">
                  <div className="about-card-icon">
                    <Cpu size={22} />
                  </div>
                  <h3 className="about-card-title">Core Foundations</h3>
                  <p className="about-card-desc">
                    Proficient in Python, Java, C, C++, and SQL, with strong grounding in Object-Oriented Programming and systems design.
                  </p>
                </div>

                <div className="about-highlight-card">
                  <div className="about-card-icon">
                    <Briefcase size={22} />
                  </div>
                  <h3 className="about-card-title">Active Internship Search</h3>
                  <p className="about-card-desc">
                    Eager to contribute technical skills, collaborate with experienced engineers, and drive measurable value on real-world projects.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================================
              SECTION 02: TECHNICAL SKILLS
              ==================================================================== */}
          <section id="skills" className="section-wrapper" style={{ background: '#fdfcf9' }}>
            <div className="section-tag-row">
              <span className="section-tag-num">02</span>
              <div className="section-tag-line" />
              <span className="section-tag-num">Technical Capabilities</span>
            </div>

            <h2 className="section-heading-main">Technical Skills &amp; Core Toolset</h2>
            <p className="section-subtext">
              Carefully cultivated skills across programming languages, system fundamentals, full-stack web technologies, databases, and machine learning libraries.
            </p>

            <div className="skills-filter-tabs">
              {[
                { id: 'all', label: 'All Disciplines' },
                { id: 'programming', label: 'Programming' },
                { id: 'fundamentals', label: 'CS Fundamentals' },
                { id: 'web-backend', label: 'Web & Backend' },
                { id: 'databases-mapping', label: 'Databases & Mapping' },
                { id: 'libraries-tools', label: 'Libraries & Tools' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`skills-tab-btn ${skillCategoryFilter === tab.id ? 'active' : ''}`}
                  onClick={() => {
                    handleSound(800);
                    setSkillCategoryFilter(tab.id);
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="skills-categories-grid">
              {displayedSkillCategories.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <div key={cat.id} className="skill-category-card">
                    <div className="skill-category-header">
                      <div className="skill-cat-icon">
                        <IconComponent size={24} />
                      </div>
                      <h3 className="skill-cat-title">{cat.title}</h3>
                      <span className="skill-cat-badge-count">{cat.skills.length} skills</span>
                    </div>

                    <div className="skill-items-container">
                      {cat.skills.map((skill, idx) => (
                        <div key={idx} className="skill-tag-pill">
                          <span className="skill-tag-dot" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ====================================================================
              SECTION 03: FEATURED PROJECTS
              ==================================================================== */}
          <section id="projects" className="section-wrapper">
            <div className="section-tag-row">
              <span className="section-tag-num">03</span>
              <div className="section-tag-line" />
              <span className="section-tag-num">Featured Work</span>
            </div>

            <h2 className="section-heading-main">Engineered Software Projects</h2>
            <p className="section-subtext">
              Practical applications built from the ground up, highlighting full-stack engineering, location intelligence, predictive analytics, and algorithmic image comparison.
            </p>

            <div className="projects-grid">
              {projectsData.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-thumb-window">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="project-thumb-img"
                      loading="lazy"
                    />
                    <span className="project-num-badge">{project.num}</span>
                  </div>

                  <div className="project-body">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>

                    <div className="project-tech-badges">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="tech-badge-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="project-actions-row">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-github-btn"
                        onClick={() => handleSound(750)}
                      >
                        <GithubIcon size={15} />
                        <span>Repository</span>
                      </a>

                      <button
                        className="project-details-btn"
                        onClick={() => {
                          handleSound(880);
                          setSelectedProject(project);
                        }}
                      >
                        <span>View Architecture</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ====================================================================
              SECTION 04: CERTIFICATIONS (With Interactive Deck Launch Banner)
              ==================================================================== */}
          <section id="certifications" className="section-wrapper" style={{ background: '#fdfcf9' }}>
            <div className="section-tag-row">
              <span className="section-tag-num">04</span>
              <div className="section-tag-line" />
              <span className="section-tag-num">Credentials &amp; Learning</span>
            </div>

            <h2 className="section-heading-main">Accredited Certifications</h2>
            <p className="section-subtext">
              Formal credentials earned from recognized industry bodies including Red Hat Academy, Anthropic, Cisco Networking Academy, Hack &amp; Fix Academy, and Infosys Springboard.
            </p>

            {/* Interactive Deck Launch Banner */}
            <div
              style={{
                background: 'linear-gradient(135deg, #181715 0%, #252422 100%)',
                color: '#ffffff',
                borderRadius: '24px',
                padding: '30px 34px',
                margin: '28px 0 36px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '20px',
                boxShadow: '0 16px 40px rgba(0,0,0,0.18)',
                border: '1px solid rgba(229,155,16,0.3)'
              }}
            >
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#e59b10', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  <Sparkles size={14} />
                  <span>Interactive Physical Deck Experience</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700, color: '#fff', margin: '0 0 6px 0' }}>
                  Explore the Certifications Gallery
                </h3>
                <p style={{ fontSize: '14px', color: '#b5b2a9', margin: 0, maxWidth: '580px', lineHeight: 1.6 }}>
                  Interact with the stacked cards, watch issuer logos fly to their cards with FLIP motion, review detailed &ldquo;What I learned&rdquo; points, and inspect high-resolution certificates in a lightbox.
                </p>
              </div>

              <button
                className="hero-download-btn"
                onClick={() => {
                  handleSound(950);
                  window.location.hash = '#certifications-page';
                  setCurrentView('certifications');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  padding: '14px 28px',
                  fontSize: '13px',
                  borderRadius: '30px',
                  whiteSpace: 'nowrap'
                }}
              >
                <Layers size={16} />
                <span>Launch Interactive Deck</span>
              </button>
            </div>

            {/* Filter by provider */}
            <div className="cert-filter-row">
              {[
                { id: 'all', label: 'All Providers (9)' },
                { id: 'cisco', label: 'Cisco Networking Academy (3)' },
                { id: 'infosys', label: 'Infosys Springboard (3)' },
                { id: 'redhat', label: 'Red Hat Academy (1)' },
                { id: 'anthropic', label: 'Anthropic (1)' },
                { id: 'hackfix', label: 'Hack & Fix Academy (1)' }
              ].map((item) => (
                <button
                  key={item.id}
                  className={`cert-filter-btn ${certFilter === item.id ? 'active' : ''}`}
                  onClick={() => {
                    handleSound(800);
                    setCertFilter(item.id);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Certifications Grid */}
            <div className="certifications-grid">
              {displayedCertifications.map((cert) => (
                <div key={cert.id} className="cert-card">
                  <div>
                    <div className="cert-header">
                      <span className="cert-issuer-badge">{cert.org}</span>
                      {cert.year && <span className="cert-year-tag">{cert.year}</span>}
                    </div>

                    <h3 className="cert-title">{cert.title}</h3>
                    <p style={{ fontSize: '13.5px', color: '#666', lineHeight: 1.55 }}>
                      {cert.description}
                    </p>
                  </div>

                  <div className="cert-footer-row">
                    <span className="cert-verified-label">
                      <CheckCircle2 size={14} />
                      <span>Resume Verified</span>
                    </span>

                    <button
                      className="cert-view-btn"
                      onClick={() => {
                        handleSound(880);
                        setSelectedCert(cert);
                      }}
                    >
                      <span>View Details</span>
                      <ExternalLink size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ====================================================================
              SECTION 05: TRAINING & PARTICIPATION
              ==================================================================== */}
          <section className="section-wrapper">
            <div className="section-tag-row">
              <span className="section-tag-num">05</span>
              <div className="section-tag-line" />
              <span className="section-tag-num">Training &amp; Participation</span>
            </div>

            <h2 className="section-heading-main">Hackathons &amp; Academic Contests</h2>
            <p className="section-subtext">
              Active participation in state-level technical challenges, competitive hackathons, and technology forums.
            </p>

            <div className="participation-grid">
              <div className="participation-card">
                <div className="part-icon-box">
                  <Award size={26} />
                </div>
                <div className="part-content">
                  <span className="part-date-badge">2 MAY 2025</span>
                  <h3 className="part-title">CodeAthon Series-1</h3>
                  <p className="part-organization">TechHub Bangalore</p>
                  <div className="part-type-pill">
                    <CheckCircle2 size={13} />
                    <span>Participation Certificate</span>
                  </div>
                </div>
              </div>

              <div className="participation-card">
                <div className="part-icon-box">
                  <Sparkles size={26} />
                </div>
                <div className="part-content">
                  <span className="part-date-badge">27 SEPTEMBER 2024</span>
                  <h3 className="part-title">India Inspires Online Quiz Competition</h3>
                  <p className="part-organization">State-Level Technical &amp; General Knowledge</p>
                  <div className="part-type-pill">
                    <CheckCircle2 size={13} />
                    <span>Certificate of Appreciation</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================================
              SECTION 06: EDUCATION
              ==================================================================== */}
          <section id="education" className="section-wrapper" style={{ background: '#fdfcf9' }}>
            <div className="section-tag-row">
              <span className="section-tag-num">06</span>
              <div className="section-tag-line" />
              <span className="section-tag-num">Academic Roadmap</span>
            </div>

            <h2 className="section-heading-main">Education</h2>
            <p className="section-subtext">
              A progressive journey of academic excellence, continuous learning, and software engineering discipline, tracing key milestones from foundational schooling to B.E. in Computer Science.
            </p>

            <EducationTimeline onSound={handleSound} />
          </section>

          {/* ====================================================================
              SECTION: CAREER OBJECTIVE BANNER
              ==================================================================== */}
          <section className="career-banner-section">
            <div className="career-banner-card">
              <div>
                <div className="banner-tag-seeking">Immediate Opportunity</div>
                <h2 className="banner-heading-main">
                  Currently Seeking Software Engineering Internship Opportunities
                </h2>
                <p className="banner-subtext-bio">
                  &ldquo;I am looking for an opportunity to apply my programming, software development and problem-solving skills in a professional engineering environment while learning from experienced developers.&rdquo;
                </p>
              </div>

              <div className="banner-cta-col">
                <a
                  href="#contact"
                  className="banner-connect-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                >
                  <span>LET&apos;S CONNECT</span>
                  <ChevronRight size={16} />
                </a>
              </div>
            </div>
          </section>

          {/* ====================================================================
              SECTION 07: CONTACT
              ==================================================================== */}
          <section id="contact" className="section-wrapper">
            <div className="section-tag-row">
              <span className="section-tag-num">07</span>
              <div className="section-tag-line" />
              <span className="section-tag-num">Get in Touch</span>
            </div>

            <h2 className="section-heading-main">Let&apos;s Connect</h2>
            <p className="section-subtext">
              I am actively available for Software Engineering Internships and would welcome the opportunity to discuss how my skill set can support your team.
            </p>

            <div className="contact-grid">
              <div className="contact-info-col">
                <div className="contact-card-item">
                  <div className="contact-card-icon">
                    <Mail size={22} />
                  </div>
                  <div className="contact-card-text">
                    <h5>Email Address</h5>
                    <a href="mailto:gowthams9380@gmail.com">gowthams9380@gmail.com</a>
                  </div>
                  <button
                    className="contact-copy-btn"
                    onClick={copyEmailToClipboard}
                    title="Copy email to clipboard"
                    aria-label="Copy Email"
                  >
                    {copiedEmail ? <Check size={18} color="#16a34a" /> : <Copy size={18} />}
                  </button>
                </div>

                <div className="contact-card-item">
                  <div className="contact-card-icon">
                    <Phone size={22} />
                  </div>
                  <div className="contact-card-text">
                    <h5>Phone Number</h5>
                    <a href="tel:+919380702374">+91 9380702374</a>
                  </div>
                </div>

                <div className="contact-card-item">
                  <div className="contact-card-icon">
                    <MapPin size={22} />
                  </div>
                  <div className="contact-card-text">
                    <h5>Current Location</h5>
                    <p>Bengaluru, Karnataka, India</p>
                  </div>
                </div>

                <div className="contact-card-item">
                  <div className="contact-card-icon">
                    <LinkedinIcon size={22} />
                  </div>
                  <div className="contact-card-text">
                    <h5>LinkedIn Network</h5>
                    <a
                      href="https://linkedin.com/in/gowtham-s-89179b386"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      linkedin.com/in/gowtham-s-89179b386
                    </a>
                  </div>
                  <ExternalLink size={16} color="#888" style={{ marginLeft: 'auto' }} />
                </div>

                <div className="contact-card-item">
                  <div className="contact-card-icon">
                    <GithubIcon size={22} />
                  </div>
                  <div className="contact-card-text">
                    <h5>GitHub Repositories</h5>
                    <a
                      href="https://github.com/gowthams9380-max"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      github.com/gowthams9380-max
                    </a>
                  </div>
                  <ExternalLink size={16} color="#888" style={{ marginLeft: 'auto' }} />
                </div>
              </div>

              <div className="contact-form-box">
                <h3 className="contact-form-title">Send a Direct Message</h3>

                {formSubmitted && (
                  <div className="form-feedback-banner feedback-success">
                    <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
                    <div>
                      <strong>Thank you for reaching out!</strong> Your email client will open with your pre-filled inquiry. You can also contact me directly at <strong>gowthams9380@gmail.com</strong>.
                    </div>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} noValidate>
                  <div className="form-group-grid">
                    <div className="form-field-wrapper">
                      <label className="form-field-label">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="e.g. Sarah Jenkins"
                        className="form-text-input"
                      />
                      {formErrors.name && <span className="form-error-msg">{formErrors.name}</span>}
                    </div>

                    <div className="form-field-wrapper">
                      <label className="form-field-label">Your Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="e.g. sarah@company.com"
                        className="form-text-input"
                      />
                      {formErrors.email && <span className="form-error-msg">{formErrors.email}</span>}
                    </div>
                  </div>

                  <div className="form-field-wrapper">
                    <label className="form-field-label">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleFormChange}
                      placeholder="e.g. Software Engineering Internship Inquiry"
                      className="form-text-input"
                    />
                    {formErrors.subject && (
                      <span className="form-error-msg">{formErrors.subject}</span>
                    )}
                  </div>

                  <div className="form-field-wrapper">
                    <label className="form-field-label">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Please write your note, internship opportunity details, or questions..."
                      className="form-textarea-input"
                    />
                    {formErrors.message && (
                      <span className="form-error-msg">{formErrors.message}</span>
                    )}
                  </div>

                  <button type="submit" className="form-submit-btn">
                    <Send size={16} />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* ====================================================================
              EDITORIAL FOOTER
              ==================================================================== */}
          <footer className="editorial-footer">
            <div className="footer-inner-container">
              <div className="footer-top-row">
                <div>
                  <div className="footer-brand-title">Gowtham S</div>
                  <p className="footer-tagline">
                    Computer Science &amp; Engineering Student • Nagarjuna College of Engineering and Technology, Bengaluru
                  </p>
                </div>

                <div className="footer-social-links">
                  <a
                    href="https://linkedin.com/in/gowtham-s-89179b386"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-icon"
                    title="LinkedIn"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon size={18} />
                  </a>

                  <a
                    href="https://github.com/gowthams9380-max"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-icon"
                    title="GitHub"
                    aria-label="GitHub"
                  >
                    <GithubIcon size={18} />
                  </a>

                  <a
                    href="mailto:gowthams9380@gmail.com"
                    className="footer-social-icon"
                    title="Email"
                    aria-label="Email"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>

              <div className="footer-divider-line" />

              <div className="footer-bottom-row">
                <div>
                  © {CURRENT_YEAR} Gowtham S. All rights reserved. Designed with luxury editorial aesthetic.
                </div>

                <button
                  className="footer-jump-top-btn"
                  onClick={() => {
                    handleSound(900);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>Back to Top</span>
                  <ArrowUp size={14} />
                </button>
              </div>
            </div>
          </footer>

          {/* ====================================================================
              PROJECT DETAILS MODAL
              ==================================================================== */}
          {selectedProject && (
            <div className="modal-backdrop-layer" onClick={() => setSelectedProject(null)}>
              <div className="modal-window-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header-bar">
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--gold)',
                        fontWeight: 700
                      }}
                    >
                      {selectedProject.num}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '22px',
                        fontWeight: 700,
                        margin: '4px 0 0 0'
                      }}
                    >
                      {selectedProject.title}
                    </h3>
                  </div>

                  <button
                    className="modal-close-pill"
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="modal-scrollable-content">
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>
                      Architecture &amp; Implementation
                    </h4>
                    <p style={{ fontSize: '14.5px', color: '#555', lineHeight: 1.7 }}>
                      {selectedProject.details.architecture}
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>
                      Key Capabilities
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedProject.details.keyFeatures.map((feat, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                            fontSize: '14px',
                            color: '#444'
                          }}
                        >
                          <CheckCircle2 size={16} color="#e59b10" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>
                      Technology Stack
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {selectedProject.technologies.map((t, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: '#f4f3ec',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '12.5px',
                            fontWeight: 600,
                            color: '#333'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '12px',
                      marginTop: '16px',
                      paddingTop: '16px',
                      borderTop: '1px solid #f0eee6'
                    }}
                  >
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-download-btn"
                      style={{
                        padding: '12px 24px',
                        fontSize: '13px',
                        borderRadius: '24px'
                      }}
                    >
                      <GithubIcon size={15} />
                      <span>View on GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ====================================================================
              CERTIFICATE DETAILS MODAL
              ==================================================================== */}
          {selectedCert && (
            <div className="modal-backdrop-layer" onClick={() => setSelectedCert(null)}>
              <div className="modal-window-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header-bar">
                  <div>
                    <span className="cert-issuer-badge">{selectedCert.org}</span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '20px',
                        fontWeight: 700,
                        margin: '6px 0 0 0'
                      }}
                    >
                      {selectedCert.title}
                    </h3>
                  </div>

                  <button
                    className="modal-close-pill"
                    onClick={() => setSelectedCert(null)}
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="modal-scrollable-content">
                  <div
                    style={{
                      background: '#f9f8f4',
                      border: '1px solid #ede8de',
                      borderRadius: '16px',
                      padding: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px'
                    }}
                  >
                    <Award size={36} color="#e59b10" style={{ flexShrink: 0 }} />
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>
                        Verified Curriculum Credential
                      </h4>
                      <p style={{ fontSize: '13px', color: '#666', margin: '4px 0 0 0' }}>
                        Listed directly on Gowtham S&apos;s academic resume. Completion year:{' '}
                        {selectedCert.year ? selectedCert.year : 'Verified coursework'}.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>
                      Course Syllabus &amp; Core Competency
                    </h4>
                    <p style={{ fontSize: '14.5px', color: '#555', lineHeight: 1.7 }}>
                      {selectedCert.description}
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '12px',
                      marginTop: '10px'
                    }}
                  >
                    <button
                      className="hero-download-btn"
                      style={{
                        padding: '10px 22px',
                        fontSize: '13px',
                        borderRadius: '24px'
                      }}
                      onClick={() => setSelectedCert(null)}
                    >
                      <span>Close Credential</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
