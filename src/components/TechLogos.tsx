import React from 'react';

export const TechLogo: React.FC<{ iconId: string; className?: string }> = ({
  iconId,
  className = 'w-6 h-6',
}) => {
  switch (iconId) {
    case 'react':
      return (
        <svg className={className} viewBox="0 0 115.3 100" fill="#00d8ff">
          <ellipse cx="57.65" cy="50" rx="16.5" ry="16.5" />
          <ellipse cx="57.65" cy="50" rx="55" ry="21" fill="none" stroke="#00d8ff" strokeWidth="6" transform="rotate(30 57.65 50)" />
          <ellipse cx="57.65" cy="50" rx="55" ry="21" fill="none" stroke="#00d8ff" strokeWidth="6" transform="rotate(90 57.65 50)" />
          <ellipse cx="57.65" cy="50" rx="55" ry="21" fill="none" stroke="#00d8ff" strokeWidth="6" transform="rotate(150 57.65 50)" />
        </svg>
      );
    case 'typescript':
      return (
        <svg className={className} viewBox="0 0 100 100">
          <rect width="100" height="100" fill="#3178c6" />
          <text
            x="92"
            y="88"
            textAnchor="end"
            fill="#ffffff"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight="700"
            fontSize="50"
            letterSpacing="-2"
          >
            TS
          </text>
        </svg>
      );
    case 'firebase':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path d="M3.89 15.672L6.255.932a.715.715 0 011.341-.184l2.84 5.412zm16.55 4.398l-1.93-12.07a.714.714 0 00-1.228-.396L3.642 20.07zM13.565 8.784l-2.457-4.75a.713.713 0 00-1.272.016L3.63 20.07l9.935-11.286z" fill="#FFA000" />
          <path d="M13.565 8.784l-2.457-4.75a.713.713 0 00-1.272.016L3.63 20.07z" fill="#F57C00" />
          <path d="M12.003 24a.714.714 0 01-.468-.176L3.63 20.07l8.373 3.93z" fill="#FFCA28" />
        </svg>
      );
    case 'nodejs':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path
            d="M12 1.6 21 6.8v10.4l-9 5.2-9-5.2V6.8z"
            fill="none"
            stroke="#539e43"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <text
            x="12"
            y="15.4"
            textAnchor="middle"
            fill="#8cc84b"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight="700"
            fontSize="8.5"
          >
            JS
          </text>
        </svg>
      );
    case 'python':
      return (
        <svg className={className} viewBox="0 0 110 110">
          <path d="M54.5 2C27.8 2 29.5 13.5 29.5 13.5l.03 12h25.4v3.6H20.4S2 27 2 54.3c0 27.2 16.1 26.3 16.1 26.3h9.6v-13.5s-.5-16.1 15.8-16.1h25.2s15.2.2 15.2-14.8V16.8S84.8 2 54.5 2zm-14.1 8.2c2.6 0 4.7 2.1 4.7 4.7 0 2.6-2.1 4.7-4.7 4.7-2.6 0-4.7-2.1-4.7-4.7 0-2.6 2.1-4.7 4.7-4.7z" fill="#3776ab" />
          <path d="M55.5 108c26.7 0 25-11.5 25-11.5l-.03-12H55.07v-3.6h34.53S108 83 108 55.7c0-27.2-16.1-26.3-16.1-26.3h-9.6v13.5s.5 16.1-15.8 16.1H41.3s-15.2-.2-15.2 14.8v19.4S25.2 108 55.5 108zm14.1-8.2c-2.6 0-4.7-2.1-4.7-4.7 0-2.6 2.1-4.7 4.7-4.7 2.6 0 4.7 2.1 4.7 4.7 0 2.6-2.1 4.7-4.7 4.7z" fill="#ffd438" />
        </svg>
      );
    case 'cpp':
      return (
        <svg className={className} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="#00599c" />
          <path d="M68 35c-4-5-10-8-18-8-14 0-25 10-25 23s11 23 25 23c8 0 14-3 18-8l-7-6c-3 3-6 5-11 5-9 0-16-6-16-14s7-14 16-14c5 0 8 2 11 5l7-7z" fill="#ffffff" />
          <path d="M72 46h4v-4h3v4h4v3h-4v4h-3v-4h-4v-3zM85 46h4v-4h3v4h4v3h-4v4h-3v-4h-4v-3z" fill="#ffffff" />
        </svg>
      );
    case 'java':
      return <img src="/images/tech/java.svg" alt="" className={className} loading="lazy" />;
    case 'tailwind':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#06b6d4">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
      );
    case 'mongodb':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#47a248">
          <path d="M12 0c-.3 0-.6.1-.9.2C8.7 1.5 4 6.7 4 13.2c0 5.3 3.5 10 8 10.8 4.5-.8 8-5.5 8-10.8 0-6.5-4.7-11.7-7.1-13C12.6.1 12.3 0 12 0zm.6 21.6v-7.3c1.7-.5 2.7-2.1 2.2-3.8-.4-1.4-1.6-2.3-3-2.3v-5c1.8 1.2 5.2 5.1 5.2 9.9 0 4.1-2.4 7.6-4.4 8.5z" />
        </svg>
      );
    case 'mysql':
      return <img src="/images/tech/mysql.svg" alt="" className={`tech-logo-mysql ${className}`} loading="lazy" />;
    case 'esp32':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.8">
          <rect x="5" y="5" width="14" height="14" rx="0" fill="#10b981" fillOpacity="0.15" />
          <rect x="8" y="8" width="8" height="8" />
          <path d="M2 9h3M2 12h3M2 15h3M19 9h3M19 12h3M19 15h3M9 2v3M12 2v3M15 2v3M9 19v3M12 19v3M15 19v3" />
        </svg>
      );
    case 'git':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#f05032">
          <path d="M23.546 10.93L13.067.452a1.5 1.5 0 00-2.121 0L8.831 2.568l3.197 3.197a1.782 1.782 0 011.833.398 1.78 1.78 0 01.398 1.833l3.078 3.078a1.78 1.78 0 011.833.398 1.786 1.786 0 010 2.525 1.786 1.786 0 01-2.525 0 1.784 1.784 0 01-.398-1.833L13.16 9.088v5.82a1.786 1.786 0 01.444.606 1.786 1.786 0 01-.893 2.348 1.786 1.786 0 01-2.348-.893 1.786 1.786 0 01.606-2.348v-5.87L7.747 5.529.452 12.824a1.5 1.5 0 000 2.121l10.479 10.479a1.5 1.5 0 002.121 0l10.494-10.494a1.5 1.5 0 000-2.121z" />
        </svg>
      );
    case 'figma':
      return (
        <svg className={className} viewBox="0 0 38 57">
          <path d="M19 28.5a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z" fill="#1abcfe" />
          <path d="M0 47.5A9.5 9.5 0 019.5 38H19v9.5a9.5 9.5 0 11-19 0z" fill="#0acf83" />
          <path d="M19 0v19h9.5a9.5 9.5 0 100-19H19z" fill="#ff7262" />
          <path d="M0 9.5A9.5 9.5 0 009.5 19H19V0H9.5A9.5 9.5 0 000 9.5z" fill="#f24e1e" />
          <path d="M0 28.5A9.5 9.5 0 009.5 38H19V19H9.5A9.5 9.5 0 000 28.5z" fill="#a259ff" />
        </svg>
      );
    case 'vercel':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 22.525H0l12-21.05 12 21.05z" />
        </svg>
      );
    case 'linux':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#fcc624">
          <path d="M12 2c-3.3 0-6 2.7-6 6v3c-.6.3-1 .9-1 1.6 0 .8.5 1.5 1.3 1.8-.2.5-.3 1.1-.3 1.6 0 2.2 2.7 4 6 4s6-1.8 6-4c0-.5-.1-1.1-.3-1.6.8-.3 1.3-1 1.3-1.8 0-.7-.4-1.3-1-1.6V8c0-3.3-2.7-6-6-6zm-1.8 7.5c.7 0 1.2.6 1.2 1.3s-.5 1.2-1.2 1.2c-.6 0-1.2-.5-1.2-1.2s.6-1.3 1.2-1.3zm3.6 0c.7 0 1.2.6 1.2 1.3s-.5 1.2-1.2 1.2c-.7 0-1.2-.5-1.2-1.2s.5-1.3 1.2-1.3z" />
        </svg>
      );
    default:
      return null;
  }
};

export default TechLogo;
