import React from 'react';

/**
 * IssuerLogo Component
 * Renders official issuer SVG logos or clean circular badges with issuer initials.
 */
export default function IssuerLogo({ logoType, issuerShort, issuerInitials, size = 36, className = '' }) {
  const s = size;

  switch (logoType) {
    case 'redhat':
      return (
        <div
          className={`issuer-logo-container ${className}`}
          style={{ width: s, height: s }}
          title="Red Hat Academy"
        >
          <svg viewBox="0 0 100 100" width={s} height={s} fill="none">
            <circle cx="50" cy="50" r="48" fill="#111111" stroke="#EE0000" strokeWidth="3" />
            {/* Red Hat iconic fedora ribbon & shape */}
            <path
              d="M22 64 C30 68 70 68 78 64 C82 62 76 56 68 56 C64 42 60 30 50 30 C40 30 36 42 32 56 C24 56 18 62 22 64 Z"
              fill="#EE0000"
            />
            <path
              d="M32 56 C38 58 62 58 68 56 C66 45 61 35 50 35 C39 35 34 45 32 56 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      );

    case 'cisco':
      return (
        <div
          className={`issuer-logo-container ${className}`}
          style={{ width: s, height: s }}
          title="Cisco Networking Academy"
        >
          <svg viewBox="0 0 100 100" width={s} height={s} fill="none">
            <circle cx="50" cy="50" r="48" fill="#0A192F" stroke="#049FD9" strokeWidth="3" />
            {/* Cisco iconic bridge wave bars */}
            <rect x="23" y="46" width="6" height="18" rx="3" fill="#049FD9" />
            <rect x="32" y="36" width="6" height="28" rx="3" fill="#049FD9" />
            <rect x="41" y="44" width="6" height="20" rx="3" fill="#049FD9" />
            <rect x="50" y="28" width="6" height="36" rx="3" fill="#049FD9" />
            <rect x="59" y="44" width="6" height="20" rx="3" fill="#049FD9" />
            <rect x="68" y="36" width="6" height="28" rx="3" fill="#049FD9" />
            <rect x="77" y="46" width="6" height="18" rx="3" fill="#049FD9" />
          </svg>
        </div>
      );

    case 'anthropic':
      return (
        <div
          className={`issuer-logo-container ${className}`}
          style={{ width: s, height: s }}
          title="Anthropic"
        >
          <svg viewBox="0 0 100 100" width={s} height={s} fill="none">
            <circle cx="50" cy="50" r="48" fill="#1C1917" stroke="#CC785C" strokeWidth="3" />
            {/* Anthropic geometric A symbol */}
            <path
              d="M34 68 L48 30 L54 30 L68 68 L60 68 L56 56 L44 56 L40 68 Z M46 50 L54 50 L50 38 Z"
              fill="#CC785C"
            />
          </svg>
        </div>
      );

    case 'infosys':
      return (
        <div
          className={`issuer-logo-container ${className}`}
          style={{ width: s, height: s }}
          title="Infosys Springboard"
        >
          <svg viewBox="0 0 100 100" width={s} height={s} fill="none">
            <circle cx="50" cy="50" r="48" fill="#051D40" stroke="#007CC3" strokeWidth="3" />
            {/* Infosys stylized 'i' mark */}
            <circle cx="50" cy="34" r="6" fill="#007CC3" />
            <rect x="46" y="45" width="8" height="26" rx="4" fill="#007CC3" />
          </svg>
        </div>
      );

    case 'hackfix':
      return (
        <div
          className={`issuer-logo-container ${className}`}
          style={{ width: s, height: s }}
          title="Hack & Fix Academy"
        >
          <svg viewBox="0 0 100 100" width={s} height={s} fill="none">
            <circle cx="50" cy="50" r="48" fill="#064E3B" stroke="#10B981" strokeWidth="3" />
            {/* Shield & Keyhole */}
            <path
              d="M50 25 L68 33 C68 53 50 67 50 75 C50 67 32 53 32 33 Z"
              fill="#10B981"
            />
            <circle cx="50" cy="45" r="4" fill="#064E3B" />
            <path d="M48 48 L52 48 L53 58 L47 58 Z" fill="#064E3B" />
          </svg>
        </div>
      );

    case 'techhub':
      return (
        <div
          className={`issuer-logo-container ${className}`}
          style={{ width: s, height: s }}
          title="TechHub Bangalore"
        >
          <svg viewBox="0 0 100 100" width={s} height={s} fill="none">
            <circle cx="50" cy="50" r="48" fill="#2E1065" stroke="#8B5CF6" strokeWidth="3" />
            {/* Code Brackets */}
            <path
              d="M42 38 L30 50 L42 62 M58 38 L70 50 L58 62"
              stroke="#8B5CF6"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );

    case 'indiainspires':
      return (
        <div
          className={`issuer-logo-container ${className}`}
          style={{ width: s, height: s }}
          title="India Inspires"
        >
          <svg viewBox="0 0 100 100" width={s} height={s} fill="none">
            <circle cx="50" cy="50" r="48" fill="#451A03" stroke="#F59E0B" strokeWidth="3" />
            {/* Star & Laurel */}
            <polygon
              points="50,28 55,42 70,42 58,52 62,66 50,56 38,66 42,52 30,42 45,42"
              fill="#F59E0B"
            />
          </svg>
        </div>
      );

    default:
      return (
        <div
          className={`issuer-logo-container fallback-badge ${className}`}
          style={{
            width: s,
            height: s,
            borderRadius: '50%',
            background: '#111111',
            color: '#e59b10',
            border: '2px solid #e59b10',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Space Grotesk', monospace",
            fontWeight: 700,
            fontSize: `${s * 0.38}px`
          }}
          title={issuerShort || 'Certification Issuer'}
        >
          {issuerInitials || 'CERT'}
        </div>
      );
  }
}
