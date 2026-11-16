import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  School, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Award, 
  RotateCcw,
  Star,
  CheckCircle2
} from 'lucide-react';
import '../styles/EducationTimeline.css';

const milestonesData = [
  {
    step: '01',
    year: '2022',
    title: 'Class 10th (State Board)',
    institution: 'Sri Vasavi Vidhyanikethan School, Chintamani, Karnataka',
    score: '88%',
    metricLabel: 'SSLC Board Score',
    metricBadge: 'Distinction',
    position: 'above',
    icon: BookOpen,
    description: 'Built foundational academic excellence with top distinction in Mathematics, Science, and Analytical reasoning.',
    tags: ['Mathematics', 'Science', 'English', 'Distinction (88%)'],
    isActive: false,

    // Vibrant Teal / Cyan Palette
    cardBgGradient: 'linear-gradient(145deg, #ffffff 40%, #f0fdfa 100%)',
    cardBarGradient: 'linear-gradient(90deg, #06b6d4, #0d9488, #14b8a6)',
    badgeGradient: 'linear-gradient(135deg, #06b6d4, #0d9488)',
    badgeShadow: 'rgba(13, 148, 136, 0.35)',
    cardAccentColor: '#0f766e',
    cardBorder: 'rgba(204, 251, 241, 0.95)',
    cardHoverBorder: '#0d9488',
    cardShadow: 'rgba(13, 148, 136, 0.08)',
    cardHoverShadow: 'rgba(13, 148, 136, 0.22)',
    nodeColor: '#0d9488',
    nodeHalo: 'rgba(13, 148, 136, 0.12)',
    nodeGlow: 'rgba(13, 148, 136, 0.35)',
    nodeGlowStrong: 'rgba(13, 148, 136, 0.6)',
    stemColor: '#0d9488',
    stemGlow: 'rgba(13, 148, 136, 0.4)',
    metricBg: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
    metricBorder: 'rgba(94, 234, 212, 0.7)',
    metricLabelColor: '#0f766e',
    tagBgColor: '#f0fdfa',
    tagBorderColor: 'rgba(94, 234, 212, 0.6)',
    tagTextColor: '#0f766e'
  },
  {
    step: '02',
    year: '2024',
    title: 'Class 12th (State Board)',
    institution: 'Venkatadri Independent PU College, Chintamani, Karnataka',
    score: '80%',
    metricLabel: 'Pre-University (PCMB)',
    metricBadge: 'First Class',
    position: 'below',
    icon: School,
    description: 'Completed Pre-University course with dedicated analytical focus in Physics, Chemistry, Mathematics, and Computer Science.',
    tags: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
    isActive: false,

    // Warm Amber / Orange Palette
    cardBgGradient: 'linear-gradient(145deg, #ffffff 40%, #fffbeb 100%)',
    cardBarGradient: 'linear-gradient(90deg, #f59e0b, #ea580c, #f97316)',
    badgeGradient: 'linear-gradient(135deg, #f59e0b, #ea580c)',
    badgeShadow: 'rgba(234, 88, 12, 0.35)',
    cardAccentColor: '#c2410c',
    cardBorder: 'rgba(254, 243, 199, 0.95)',
    cardHoverBorder: '#ea580c',
    cardShadow: 'rgba(234, 88, 12, 0.08)',
    cardHoverShadow: 'rgba(234, 88, 12, 0.22)',
    nodeColor: '#ea580c',
    nodeHalo: 'rgba(234, 88, 12, 0.12)',
    nodeGlow: 'rgba(234, 88, 12, 0.35)',
    nodeGlowStrong: 'rgba(234, 88, 12, 0.6)',
    stemColor: '#ea580c',
    stemGlow: 'rgba(234, 88, 12, 0.4)',
    metricBg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    metricBorder: 'rgba(252, 211, 77, 0.7)',
    metricLabelColor: '#b45309',
    tagBgColor: '#fffbeb',
    tagBorderColor: 'rgba(252, 211, 77, 0.6)',
    tagTextColor: '#b45309'
  },
  {
    step: '03',
    year: '2024 – 2028',
    title: 'B.E. in Computer Science and Engineering',
    institution: 'Nagarjuna College of Engineering and Technology, Bengaluru, Karnataka',
    score: 'CGPA: 8.4',
    metricLabel: 'Academic Score / 10',
    metricBadge: 'Active Program',
    position: 'above',
    icon: GraduationCap,
    description: 'Four-year engineering degree curriculum focusing on Data Structures & Algorithms, predictive modeling, full-stack systems, and practical technology solutions.',
    tags: ['DSA & OOP', 'Predictive Analytics', 'FastAPI & React', 'System Design'],
    isActive: true,

    // Vibrant Violet / Indigo Palette
    cardBgGradient: 'linear-gradient(145deg, #ffffff 40%, #faf5ff 100%)',
    cardBarGradient: 'linear-gradient(90deg, #8b5cf6, #6366f1, #4f46e5)',
    badgeGradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
    badgeShadow: 'rgba(124, 58, 237, 0.35)',
    cardAccentColor: '#6d28d9',
    cardBorder: 'rgba(237, 233, 254, 0.95)',
    cardHoverBorder: '#7c3aed',
    cardShadow: 'rgba(124, 58, 237, 0.08)',
    cardHoverShadow: 'rgba(124, 58, 237, 0.24)',
    nodeColor: '#7c3aed',
    nodeHalo: 'rgba(124, 58, 237, 0.12)',
    nodeGlow: 'rgba(124, 58, 237, 0.4)',
    nodeGlowStrong: 'rgba(124, 58, 237, 0.65)',
    stemColor: '#7c3aed',
    stemGlow: 'rgba(124, 58, 237, 0.45)',
    metricBg: 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)',
    metricBorder: 'rgba(216, 180, 254, 0.7)',
    metricLabelColor: '#6d28d9',
    tagBgColor: '#faf5ff',
    tagBorderColor: 'rgba(216, 180, 254, 0.6)',
    tagTextColor: '#6d28d9'
  }
];

export default function EducationTimeline({ onSound }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [animStage, setAnimStage] = useState(0); // 0 = start, 1 = node 1, 2 = node 2, 3 = node 3
  const [hasTriggered, setHasTriggered] = useState(false);
  const containerRef = useRef(null);

  // Trigger sequential animation when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          startSequence();
        }
      },
      { threshold: 0.15 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasTriggered]);

  const startSequence = () => {
    setAnimStage(0);

    // Stage 1: Line to Node 1, pop Node 1, pop Card 1
    const t1 = setTimeout(() => {
      setAnimStage(1);
      if (onSound) onSound(620);
    }, 280);

    // Stage 2: Line to Node 2, pop Node 2, pop Card 2
    const t2 = setTimeout(() => {
      setAnimStage(2);
      if (onSound) onSound(740);
    }, 980);

    // Stage 3: Line to Node 3, pop Node 3, pop Card 3
    const t3 = setTimeout(() => {
      setAnimStage(3);
      if (onSound) onSound(880);
    }, 1680);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  const handleReplay = (e) => {
    e.stopPropagation();
    if (onSound) onSound(540);
    startSequence();
  };

  const handleCardHover = (index) => {
    setHoveredIndex(index);
    if (onSound) onSound(700 + index * 90);
  };

  const handleCardLeave = () => {
    setHoveredIndex(null);
  };

  // Progress track width on desktop
  const getProgressWidthDesktop = () => {
    if (animStage === 0) return '0%';
    if (animStage === 1) return '0%'; // Node 1
    if (animStage === 2) return '50%'; // Node 2
    return '100%'; // Reaches Node 3
  };

  // Progress track height on mobile
  const getProgressHeightMobile = () => {
    if (animStage === 0) return '0%';
    if (animStage === 1) return '16%';
    if (animStage === 2) return '56%';
    return '100%';
  };

  return (
    <div className="edu-timeline-section" ref={containerRef}>
      {/* Soft ambient background glow */}
      <div className="edu-ambient-glow" />

      {/* Top Toolbar */}
      <div className="edu-timeline-toolbar">
        <div className="edu-toolbar-summary">
          <Sparkles size={13} color="#e59b10" />
          <span>Interactive Milestone Path</span>
        </div>

        <button
          onClick={handleReplay}
          className="edu-replay-btn"
          title="Replay sequence animation"
        >
          <RotateCcw size={13} />
          <span>Replay Journey</span>
        </button>
      </div>

      {/* ====================================================================
          DESKTOP HORIZONTAL ROADMAP (Alternating Above / Below)
          ==================================================================== */}
      <div className="edu-horizontal-roadmap" aria-label="Education Milestones Infographic">
        {/* ROW 1: CARDS ABOVE CENTRAL AXIS */}
        <div className="edu-cards-track-above">
          {/* Milestone 01 (Class 10th - Above) */}
          <div
            className={`edu-card-wrapper ${animStage >= 1 ? 'edu-anim-visible' : 'edu-anim-hidden'}`}
            onMouseEnter={() => handleCardHover(0)}
            onMouseLeave={handleCardLeave}
          >
            <MilestoneCard
              milestone={milestonesData[0]}
              isHovered={hoveredIndex === 0}
            />
          </div>

          {/* Placeholder for column 2 (Milestone 02 is below) */}
          <div className="edu-slot-empty" aria-hidden="true" />

          {/* Milestone 03 (B.E. CSE - Above) */}
          <div
            className={`edu-card-wrapper ${animStage >= 3 ? 'edu-anim-visible' : 'edu-anim-hidden'}`}
            onMouseEnter={() => handleCardHover(2)}
            onMouseLeave={handleCardLeave}
          >
            <MilestoneCard
              milestone={milestonesData[2]}
              isHovered={hoveredIndex === 2}
            />
          </div>
        </div>

        {/* ROW 2: CENTRAL AXIS TRACK WITH STEMS & NODES */}
        <div className="edu-central-axis-wrapper">
          {/* Base track */}
          <div className="edu-base-track-line" />

          {/* Animated gradient progress track line */}
          <div
            className="edu-progress-track-line"
            style={{ width: getProgressWidthDesktop() }}
          />

          {/* Nodes Grid */}
          <div className="edu-nodes-axis">
            {milestonesData.map((m, idx) => {
              const isNodeVisible = animStage >= idx + 1;
              const isCardHovered = hoveredIndex === idx;

              return (
                <div key={m.step} className="edu-node-cell">
                  {/* Stem Above (for Milestone 01 and 03) */}
                  {m.position === 'above' && (
                    <div
                      className={`edu-stem-above ${isNodeVisible ? 'edu-stem-visible' : 'edu-stem-hidden'} ${
                        isCardHovered ? 'edu-stem-active' : ''
                      }`}
                      style={{
                        '--stem-color': m.stemColor,
                        '--stem-glow': m.stemGlow
                      }}
                    />
                  )}

                  {/* Stem Below (for Milestone 02) */}
                  {m.position === 'below' && (
                    <div
                      className={`edu-stem-below ${isNodeVisible ? 'edu-stem-visible' : 'edu-stem-hidden'} ${
                        isCardHovered ? 'edu-stem-active' : ''
                      }`}
                      style={{
                        '--stem-color': m.stemColor,
                        '--stem-glow': m.stemGlow
                      }}
                    />
                  )}

                  {/* Node Circle Marker */}
                  <div
                    className={`edu-node-marker ${isNodeVisible ? 'edu-node-visible' : 'edu-node-hidden'} ${
                      isCardHovered ? 'is-hovered' : ''
                    }`}
                    style={{
                      '--node-color': m.nodeColor,
                      '--node-halo': m.nodeHalo,
                      '--node-glow': m.nodeGlow,
                      '--node-glow-strong': m.nodeGlowStrong
                    }}
                    onMouseEnter={() => handleCardHover(idx)}
                    onMouseLeave={handleCardLeave}
                    title={`Milestone ${m.step}: ${m.title}`}
                  >
                    <div className="edu-node-inner-halo" />
                    <span className="edu-node-step-text">{m.step}</span>

                    {/* Active Milestone 03 Dual-Wave Radar Halo */}
                    {m.isActive && animStage >= 3 && (
                      <>
                        <div
                          className="edu-node-pulse-ring-1"
                          style={{ '--node-color': m.nodeColor }}
                        />
                        <div
                          className="edu-node-pulse-ring-2"
                          style={{ '--node-color': m.nodeColor }}
                        />
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 3: CARDS BELOW CENTRAL AXIS */}
        <div className="edu-cards-track-below">
          {/* Placeholder for column 1 */}
          <div className="edu-slot-empty" aria-hidden="true" />

          {/* Milestone 02 (Class 12th - Below) */}
          <div
            className={`edu-card-wrapper ${animStage >= 2 ? 'edu-anim-visible' : 'edu-anim-hidden'}`}
            onMouseEnter={() => handleCardHover(1)}
            onMouseLeave={handleCardLeave}
          >
            <MilestoneCard
              milestone={milestonesData[1]}
              isHovered={hoveredIndex === 1}
            />
          </div>

          {/* Placeholder for column 3 */}
          <div className="edu-slot-empty" aria-hidden="true" />
        </div>
      </div>

      {/* ====================================================================
          MOBILE VERTICAL ROADMAP (Below 768px)
          ==================================================================== */}
      <div className="edu-vertical-roadmap" aria-label="Education Milestones Timeline">
        <div className="edu-vertical-track-line" />
        <div
          className="edu-vertical-progress-line"
          style={{ height: getProgressHeightMobile() }}
        />

        {milestonesData.map((m, idx) => {
          const isRowVisible = animStage >= idx + 1;
          const isCardHovered = hoveredIndex === idx;

          return (
            <div
              key={m.step}
              className={`edu-vertical-step-row ${isRowVisible ? 'edu-anim-visible' : 'edu-anim-hidden'}`}
            >
              <div className="edu-vertical-node-col">
                <div
                  className="edu-vertical-stem"
                  style={{
                    '--stem-color': m.stemColor,
                    '--stem-glow': m.stemGlow
                  }}
                />

                <div
                  className={`edu-node-marker ${isCardHovered ? 'is-hovered' : ''}`}
                  style={{
                    '--node-color': m.nodeColor,
                    '--node-halo': m.nodeHalo,
                    '--node-glow': m.nodeGlow,
                    '--node-glow-strong': m.nodeGlowStrong
                  }}
                  onMouseEnter={() => handleCardHover(idx)}
                  onMouseLeave={handleCardLeave}
                >
                  <div className="edu-node-inner-halo" />
                  <span className="edu-node-step-text">{m.step}</span>

                  {m.isActive && animStage >= 3 && (
                    <>
                      <div
                        className="edu-node-pulse-ring-1"
                        style={{ '--node-color': m.nodeColor }}
                      />
                      <div
                        className="edu-node-pulse-ring-2"
                        style={{ '--node-color': m.nodeColor }}
                      />
                    </>
                  )}
                </div>
              </div>

              <div
                className="edu-vertical-card-col"
                onMouseEnter={() => handleCardHover(idx)}
                onMouseLeave={handleCardLeave}
              >
                <MilestoneCard
                  milestone={m}
                  isHovered={isCardHovered}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// Sub-component: Colorful, High-Contrast Milestone Card
// --------------------------------------------------------------------------
function MilestoneCard({ milestone, isHovered }) {
  const IconComponent = milestone.icon;

  return (
    <article
      className={`edu-milestone-card ${isHovered ? 'is-hovered' : ''}`}
      style={{
        '--card-bg-gradient': milestone.cardBgGradient,
        '--card-bar-gradient': milestone.cardBarGradient,
        '--card-border': isHovered ? milestone.cardHoverBorder : milestone.cardBorder,
        '--card-shadow': milestone.cardShadow,
        '--card-hover-shadow': milestone.cardHoverShadow,
        '--card-accent-color': milestone.cardAccentColor,
        '--badge-gradient': milestone.badgeGradient,
        '--badge-shadow': milestone.badgeShadow,
        '--metric-bg': milestone.metricBg,
        '--metric-border': milestone.metricBorder,
        '--metric-label-color': milestone.metricLabelColor,
        '--tag-bg-color': milestone.tagBgColor,
        '--tag-border-color': milestone.tagBorderColor,
        '--tag-text-color': milestone.tagTextColor
      }}
    >
      {/* Top Colorful Gradient Strip */}
      <div className="edu-card-accent-bar" />

      {/* Header: Numbered Step Badge & Year */}
      <div className="edu-card-header">
        <span className="edu-card-step-badge">
          <IconComponent size={13} />
          <span>STEP {milestone.step}</span>
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {milestone.isActive && (
            <span className="edu-live-tag">
              <span className="edu-live-beacon" />
              <span>Current</span>
            </span>
          )}
          <span className="edu-card-year-pill">
            <Calendar size={12} color="#64748b" />
            <span>{milestone.year}</span>
          </span>
        </div>
      </div>

      {/* Body: Title & Institution */}
      <div className="edu-card-body">
        <h3 className="edu-card-title">{milestone.title}</h3>
        <p className="edu-card-institution">
          <MapPin size={15} color={milestone.nodeColor} />
          <span>{milestone.institution}</span>
        </p>
      </div>

      {/* Description */}
      <p className="edu-card-desc">
        {milestone.description}
      </p>

      {/* Metric / Score Banner (Vibrant Highlight) */}
      <div className="edu-card-metric-banner">
        <div className="edu-metric-label-group">
          <Award size={15} color={milestone.nodeColor} />
          <span className="edu-metric-label">{milestone.metricLabel}</span>
        </div>
        <span className="edu-metric-value">{milestone.score}</span>
      </div>

      {/* Subject / Highlights Tags */}
      <div className="edu-card-tags-row">
        {milestone.tags.map((tag, i) => (
          <span key={i} className="edu-card-tag">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
