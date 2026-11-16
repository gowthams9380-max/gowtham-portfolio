import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  Sparkles,
  RotateCcw,
  ExternalLink,
  ZoomIn,
  X,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  Eye
} from 'lucide-react';

import certificationsData from '../data/certifications.json';
import IssuerLogo from '../components/IssuerLogo';
import '../styles/CertificationsPage.css';

// Audio feedback helper
const playChime = (freq = 820, type = 'sine') => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // Audio handled silently
  }
};

export default function CertificationsPage({ onBackToPortfolio }) {
  const [isStacked, setIsStacked] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxCert, setLightboxCert] = useState(null);
  const [pointsRevealed, setPointsRevealed] = useState(false);

  // Flight proxies state for active animation layer
  const [flyingProjectiles, setFlyingProjectiles] = useState([]);

  // DOM Refs
  const deckWrapperRef = useRef(null);
  const cardsGridRef = useRef(null);
  const cardRefs = useRef({});
  const clusterLogoRefs = useRef({});
  const targetBadgeRefs = useRef({});

  // Cluster layout coordinates in a circular constellation (in % or px)
  const clusterPositions = [
    { top: '15%', left: '46%' },
    { top: '28%', left: '72%' },
    { top: '56%', left: '80%' },
    { top: '78%', left: '60%' },
    { top: '78%', left: '32%' },
    { top: '56%', left: '12%' },
    { top: '28%', left: '20%' },
    { top: '48%', left: '35%' },
    { top: '48%', left: '57%' },
    { top: '30%', left: '46%' },
    { top: '68%', left: '46%' }
  ];

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered certifications
  const filteredCerts =
    activeFilter === 'all'
      ? certificationsData
      : certificationsData.filter(
          (c) =>
            c.logoType === activeFilter ||
            c.issuer.toLowerCase().includes(activeFilter.toLowerCase())
        );

  // =========================================================================
  // UNPACK ANIMATION (FLIP + Curved Logo Flight)
  // =========================================================================
  const unpackDeck = () => {
    if (!isStacked || isAnimating) return;
    setIsAnimating(true);
    playChime(950);

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Record starting positions of cluster logos & deck center
    const startPositions = {};
    certificationsData.forEach((cert) => {
      const el = clusterLogoRefs.current[cert.id];
      if (el) {
        startPositions[cert.id] = el.getBoundingClientRect();
      }
    });

    const deckRect = deckWrapperRef.current
      ? deckWrapperRef.current.getBoundingClientRect()
      : { left: window.innerWidth / 2, top: window.innerHeight / 2 };

    // 2. Switch state to expanded grid view
    setIsStacked(false);
    setPointsRevealed(false);

    if (prefersReducedMotion) {
      setTimeout(() => {
        setIsAnimating(false);
        setPointsRevealed(true);
      }, 300);
      return;
    }

    // 3. Coordinate flight in next frame after DOM mounts grid elements
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const projectiles = [];

        certificationsData.forEach((cert, idx) => {
          const cardEl = cardRefs.current[cert.id];
          const targetBadgeEl = targetBadgeRefs.current[cert.id];
          const startRect = startPositions[cert.id];

          if (cardEl) {
            const cardRect = cardEl.getBoundingClientRect();
            // Calculate delta from deck center to target grid position
            const deltaX = (deckRect.left + deckRect.width / 2) - (cardRect.left + cardRect.width / 2);
            const deltaY = (deckRect.top + deckRect.height / 2) - (cardRect.top + cardRect.height / 2);

            // Staggered card flight
            gsap.fromTo(
              cardEl,
              {
                x: deltaX,
                y: deltaY,
                scale: 0.5,
                rotation: (idx % 2 === 0 ? -1 : 1) * (6 + (idx * 2)),
                opacity: 0.2
              },
              {
                x: 0,
                y: 0,
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 0.95,
                delay: idx * 0.055,
                ease: 'back.out(1.25)'
              }
            );
          }

          // Setup Flying Logo
          if (startRect && targetBadgeEl) {
            const endRect = targetBadgeEl.getBoundingClientRect();
            projectiles.push({
              cert,
              startX: startRect.left,
              startY: startRect.top,
              endX: endRect.left,
              endY: endRect.top,
              delay: idx * 0.05
            });
          }
        });

        setFlyingProjectiles(projectiles);

        // Execute GSAP curved flight arcs for each logo
        projectiles.forEach((proj, idx) => {
          const el = document.getElementById(`projectile-${proj.cert.id}`);
          if (el) {
            const arcMidX = (proj.startX + proj.endX) / 2 + (idx % 2 === 0 ? 35 : -35);
            const arcMidY = Math.min(proj.startY, proj.endY) - 50;

            gsap.fromTo(
              el,
              {
                x: proj.startX,
                y: proj.startY,
                scale: 1.15,
                rotation: (idx % 2 === 0 ? 25 : -25),
                opacity: 1
              },
              {
                keyframes: [
                  {
                    x: arcMidX,
                    y: arcMidY,
                    scale: 1.25,
                    duration: 0.45,
                    ease: 'power2.out'
                  },
                  {
                    x: proj.endX,
                    y: proj.endY,
                    scale: 1,
                    rotation: 0,
                    duration: 0.45,
                    ease: 'back.out(1.8)'
                  }
                ],
                delay: proj.delay,
                onComplete: () => {
                  // Tiny bounce upon settling into the target badge
                  const badge = targetBadgeRefs.current[proj.cert.id];
                  if (badge) {
                    gsap.fromTo(
                      badge,
                      { scale: 1.35 },
                      { scale: 1, duration: 0.4, ease: 'elastic.out(1.6, 0.4)' }
                    );
                  }
                }
              }
            );
          }
        });

        // Clear flight layer and reveal points once flight completes
        setTimeout(() => {
          setFlyingProjectiles([]);
          setIsAnimating(false);
          setPointsRevealed(true);
        }, 1150);
      });
    });
  };

  // =========================================================================
  // RESTACK ANIMATION (In Reverse back to Deck)
  // =========================================================================
  const restackDeck = () => {
    if (isStacked || isAnimating) return;
    setIsAnimating(true);
    setPointsRevealed(false);
    playChime(780);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsStacked(true);
      setIsAnimating(false);
      return;
    }

    // Animate cards returning to deck
    certificationsData.forEach((cert, idx) => {
      const cardEl = cardRefs.current[cert.id];
      if (cardEl) {
        gsap.to(cardEl, {
          scale: 0.6,
          y: -40,
          opacity: 0,
          duration: 0.5,
          delay: idx * 0.03,
          ease: 'power2.in'
        });
      }
    });

    setTimeout(() => {
      setIsStacked(true);
      setIsAnimating(false);
    }, 650);
  };

  return (
    <div className="cert-page-root">
      {/* ===================================================================
          PAGE TOP HEADER & NAVIGATION BACK
          =================================================================== */}
      <div className="cert-page-header">
        {onBackToPortfolio && (
          <button
            className="stack-back-btn"
            style={{ marginBottom: '20px', alignSelf: 'flex-start' }}
            onClick={() => {
              playChime(750);
              onBackToPortfolio();
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Main Portfolio</span>
          </button>
        )}

        <div className="cert-page-badge">
          <Sparkles size={14} color="#e59b10" />
          <span>Interactive Credentials Deck</span>
        </div>

        <h1 className="cert-page-title">Verified Certifications</h1>
        <p className="cert-page-subtitle">
          An interactive physical card deck showcasing accredited engineering credentials from Cisco Networking Academy, Red Hat Academy, Anthropic, Infosys Springboard, and Hack &amp; Fix Academy.
        </p>
      </div>

      {/* ===================================================================
          FLYING LOGO ACTIVE ANIMATION LAYER
          =================================================================== */}
      {flyingProjectiles.length > 0 && (
        <div className="flying-logo-stage" aria-hidden="true">
          {flyingProjectiles.map((proj) => (
            <div
              key={proj.cert.id}
              id={`projectile-${proj.cert.id}`}
              className="flying-logo-projectile"
              style={{
                left: 0,
                top: 0,
                borderColor: proj.cert.badgeColor
              }}
            >
              <IssuerLogo
                logoType={proj.cert.logoType}
                issuerShort={proj.cert.issuerShort}
                issuerInitials={proj.cert.issuerInitials}
                size={42}
              />
            </div>
          ))}
        </div>
      )}

      {/* ===================================================================
          DECK VIEW (STACKED MODE)
          =================================================================== */}
      {isStacked ? (
        <div className="deck-stage-container">
          <div
            ref={deckWrapperRef}
            className="deck-cards-wrapper breathing"
            onClick={unpackDeck}
            role="button"
            tabIndex={0}
            aria-label="Interactive certifications deck. Tap to explore."
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                unpackDeck();
              }
            }}
          >
            {/* Layered Silhouette Cards Behind Front Card */}
            <div
              className="stacked-card-layer layer-1"
              style={{ transform: 'translate(-10px, 10px) rotate(-6deg)', zIndex: 1 }}
            />
            <div
              className="stacked-card-layer layer-2"
              style={{ transform: 'translate(12px, 12px) rotate(7deg)', zIndex: 2 }}
            />
            <div
              className="stacked-card-layer layer-3"
              style={{ transform: 'translate(-6px, -8px) rotate(-3deg)', zIndex: 3 }}
            />
            <div
              className="stacked-card-layer layer-4"
              style={{ transform: 'translate(8px, -6px) rotate(4deg)', zIndex: 4 }}
            />

            {/* FRONT CARD with Badge Cluster */}
            <div className="front-deck-card">
              <div className="front-card-header">
                <span className="front-card-label">Accredited Credentials</span>
                <h2 className="front-card-heading">My Certifications</h2>
                <p className="front-card-subheading">
                  {certificationsData.length} Verified Credentials • Tap to Explore
                </p>
              </div>

              {/* The Badge Cluster Constellation */}
              <div className="badge-cluster-area">
                <div className="cluster-center-ring" />

                {certificationsData.map((cert, idx) => {
                  const pos = clusterPositions[idx % clusterPositions.length];
                  return (
                    <div
                      key={cert.id}
                      ref={(el) => (clusterLogoRefs.current[cert.id] = el)}
                      id={`cluster-logo-${cert.id}`}
                      className="cluster-logo-bubble"
                      style={{
                        top: pos.top,
                        left: pos.left,
                        transform: 'translate(-50%, -50%)',
                        borderColor: cert.badgeColor
                      }}
                      title={`${cert.issuer} • ${cert.title}`}
                    >
                      <IssuerLogo
                        logoType={cert.logoType}
                        issuerShort={cert.issuerShort}
                        issuerInitials={cert.issuerInitials}
                        size={32}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Front Card Action Prompt */}
              <div className="front-card-footer">
                <div className="tap-explore-pill">
                  <Sparkles size={14} />
                  <span>Tap to Explore Deck</span>
                  <ChevronRight size={15} />
                </div>
                <span className="front-card-count">
                  Physics-animated card dispersal &amp; logo flight
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ===================================================================
           GALLERY VIEW (UNFOLDED RESPONSIVE GRID)
           =================================================================== */
        <div>
          {/* Sticky Controls Bar */}
          <div className="cert-controls-bar">
            <div className="controls-glass-panel">
              <button
                className="stack-back-btn"
                onClick={restackDeck}
                title="Stack cards back into a physical deck"
              >
                <RotateCcw size={15} />
                <span>Stack them back</span>
              </button>

              <div className="controls-status-text">
                <span className="controls-status-dot" />
                <span>{filteredCerts.length} of {certificationsData.length} Credentials Unfolded</span>
              </div>

              {/* Quick Filter Pills */}
              <div className="controls-filter-group">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'cisco', label: 'Cisco' },
                  { id: 'infosys', label: 'Infosys' },
                  { id: 'redhat', label: 'Red Hat' },
                  { id: 'anthropic', label: 'Anthropic' },
                  { id: 'hackfix', label: 'Hack & Fix' }
                ].map((f) => (
                  <button
                    key={f.id}
                    className={`control-filter-pill ${activeFilter === f.id ? 'active' : ''}`}
                    onClick={() => {
                      playChime(850);
                      setActiveFilter(f.id);
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards Gallery Grid */}
          <div className="cert-gallery-container">
            <div ref={cardsGridRef} className="cert-cards-grid">
              {filteredCerts.map((cert) => (
                <div
                  key={cert.id}
                  ref={(el) => (cardRefs.current[cert.id] = el)}
                  className="cert-gallery-card"
                >
                  {/* Certificate Image Window with Lightbox Click */}
                  <div
                    className="cert-card-image-box"
                    onClick={() => {
                      playChime(900);
                      setLightboxCert(cert);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open certificate image for ${cert.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setLightboxCert(cert);
                    }}
                  >
                    <img
                      src={cert.image}
                      alt={`${cert.title} Certificate`}
                      className="cert-card-thumb-img"
                      loading="lazy"
                    />

                    <div className="cert-card-image-overlay">
                      <span className="cert-inspect-chip">
                        <ZoomIn size={12} />
                        <span>Inspect Certificate</span>
                      </span>
                    </div>

                    {/* Target Logo Badge settled at top-right corner */}
                    <div
                      ref={(el) => (targetBadgeRefs.current[cert.id] = el)}
                      id={`target-badge-${cert.id}`}
                      className="cert-card-target-badge"
                    >
                      <IssuerLogo
                        logoType={cert.logoType}
                        issuerShort={cert.issuerShort}
                        issuerInitials={cert.issuerInitials}
                        size={40}
                      />
                    </div>
                  </div>

                  {/* Card Content & Details */}
                  <div className="cert-card-content">
                    <div className="cert-card-meta-row">
                      <span className="cert-card-issuer-pill">{cert.issuerShort}</span>
                      {cert.year && (
                        <span className="cert-card-year">
                          <Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} />
                          {cert.year}
                        </span>
                      )}
                    </div>

                    <h3 className="cert-card-title">{cert.title}</h3>

                    {/* "What I learned" Staggered Points */}
                    <div className="cert-learned-section">
                      <div className="cert-learned-header">
                        <Sparkles size={12} />
                        <span>What I learned</span>
                      </div>

                      <div className="cert-learned-list">
                        {cert.learned.map((point, idx) => (
                          <div
                            key={idx}
                            className="cert-learned-item"
                            style={{
                              opacity: pointsRevealed ? 1 : 0,
                              transform: pointsRevealed ? 'translateY(0)' : 'translateY(8px)',
                              transitionDelay: `${idx * 75}ms`
                            }}
                          >
                            <CheckCircle2 className="cert-learned-item-check" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer with Verification Status */}
                    <div className="cert-card-footer">
                      <span className="cert-verified-tag">
                        <ShieldCheck size={14} />
                        <span>Resume Verified</span>
                      </span>

                      {cert.verificationUrl ? (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cert-verify-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Verify</span>
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <button
                          className="cert-verify-link"
                          onClick={() => {
                            playChime(850);
                            setLightboxCert(cert);
                          }}
                        >
                          <span>View Full</span>
                          <Eye size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          LIGHTBOX MODAL (Full Certificate Inspection)
          =================================================================== */}
      {lightboxCert && (
        <div
          className="cert-lightbox-overlay"
          onClick={() => setLightboxCert(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="cert-lightbox-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cert-lightbox-header">
              <div className="lightbox-title-area">
                <span className="cert-card-issuer-pill">{lightboxCert.issuer}</span>
                <h3>{lightboxCert.title}</h3>
                <p>
                  Official credential issued to Gowtham S • {lightboxCert.year || 'Verified Program'}
                </p>
              </div>

              <button
                className="lightbox-close-btn"
                onClick={() => setLightboxCert(null)}
                aria-label="Close certificate lightbox"
              >
                <X size={20} />
              </button>
            </div>

            <div className="cert-lightbox-body">
              <img
                src={lightboxCert.image}
                alt={`${lightboxCert.title} High Resolution Certificate`}
                className="lightbox-full-img"
              />
            </div>

            <div className="cert-lightbox-footer">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {lightboxCert.certId && (
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#666' }}>
                    Credential ID: <strong>{lightboxCert.certId}</strong>
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                {lightboxCert.verificationUrl && (
                  <a
                    href={lightboxCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="stack-back-btn"
                    style={{ background: 'var(--gold)', color: '#111' }}
                  >
                    <span>Verify Credential on Issuer Site</span>
                    <ExternalLink size={14} />
                  </a>
                )}
                <button
                  className="stack-back-btn"
                  onClick={() => setLightboxCert(null)}
                >
                  <span>Close Viewer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
