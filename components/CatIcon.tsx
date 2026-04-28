// Shared category icons — green-stroke line style, consistent across Hero + Menu
export function CatIcon({ name }: { name: string }) {
  switch (name) {
    case "all":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "percent":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="6.5" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.5" cy="17.5" r="2.5" stroke="currentColor" strokeWidth="2" />
          <path d="M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "pizza":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 3a9 9 0 019 9l-9 9-9-9a9 9 0 019-9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="9" cy="10" r="1.2" fill="currentColor" />
          <circle cx="14" cy="9" r="1.2" fill="currentColor" />
          <circle cx="11" cy="14" r="1.2" fill="currentColor" />
        </svg>
      );
    case "drumstick":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M16 4a5 5 0 015 5c0 4-5 5-5 5l-1 4-3 1-1-3-3-1 1-3s1-5 5-5a5 5 0 011-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "cookie":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 3a9 9 0 109 9c0-1-3 1-4-2s-4-1-4-3-1-4 2-4-2-1-3 0z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="9" cy="13" r="1" fill="currentColor" />
          <circle cx="14" cy="15" r="1" fill="currentColor" />
          <circle cx="13" cy="10" r="1" fill="currentColor" />
        </svg>
      );
    case "bowl":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 11h18a8 8 0 01-8 8h-2a8 8 0 01-8-8z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M7 8c1-2 3-2 4 0M13 8c1-2 3-2 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "drink":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M6 4h12l-1 17H7L6 4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M7 9h10" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "gift":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}
