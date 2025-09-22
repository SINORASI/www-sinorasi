import type { MajorName } from '~/models/MajorName';

export interface MajorColorScheme {
  primary: string;
  secondary: string;
  text: string;
  bg: string;
  hoverBg: string;
  border: string;
  headerBg: string;
}

export const majorColorSchemes: Record<MajorName, MajorColorScheme> = {
  rpl: {
    primary: '#F78B21',
    secondary: '#E67E00',
    text: '#F78B21',
    bg: '#F78B21',
    hoverBg: '#E67E00',
    border: '#F78B21',
    headerBg: 'rgba(247, 139, 33, 0.3)'
  },
  tkj: {
    primary: '#FFC911',
    secondary: '#E6B800',
    text: '#FFC911',
    bg: '#FFC911',
    hoverBg: '#E6B800',
    border: '#FFC911',
    headerBg: 'rgba(255, 201, 17, 0.3)'
  },
  dkv: {
    primary: '#3598F9',
    secondary: '#2E7CE6',
    text: '#3598F9',
    bg: '#3598F9',
    hoverBg: '#2E7CE6',
    border: '#3598F9',
    headerBg: 'rgba(53, 152, 249, 0.3)'
  },
  animasi: {
    primary: '#D93F92',
    secondary: '#C73682',
    text: '#D93F92',
    bg: '#D93F92',
    hoverBg: '#C73682',
    border: '#D93F92',
    headerBg: 'rgba(217, 63, 146, 0.3)'
  },
  broadcasting: {
    primary: '#E14648',
    secondary: '#C93E40',
    text: '#E14648',
    bg: '#E14648',
    hoverBg: '#C93E40',
    border: '#E14648',
    headerBg: 'rgba(225, 70, 72, 0.3)'
  },
  tei: {
    primary: '#059451',
    secondary: '#047B42',
    text: '#059451',
    bg: '#059451',
    hoverBg: '#047B42',
    border: '#059451',
    headerBg: 'rgba(5, 148, 81, 0.3)'
  },
  mekatronika: {
    primary: '#57A77C',
    secondary: '#4E9670',
    text: '#57A77C',
    bg: '#57A77C',
    hoverBg: '#4E9670',
    border: '#57A77C',
    headerBg: 'rgba(87, 167, 124, 0.3)'
  },
  tav: {
    primary: '#4FA898',
    secondary: '#469788',
    text: '#4FA898',
    bg: '#4FA898',
    hoverBg: '#469788',
    border: '#4FA898',
    headerBg: 'rgba(79, 168, 152, 0.3)'
  }
};

export const getMajorIconFilter = (major: MajorName): string => {
  const colors = majorColorSchemes[major];
  if (!colors) return '';

  // Convert hex to RGB for filter calculation
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const rgb = hexToRgb(colors.primary);
  const brightness = Math.round((rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000);

  // Calculate filter values based on target color
  const filters: string[] = [];

  // Adjust brightness and saturation
  if (brightness < 128) {
    filters.push('brightness(1.2)');
  } else {
    filters.push('brightness(0.9)');
  }

  filters.push('saturate(1.3)');

  // Add hue rotation if needed for better color matching
  const hueRotateMap: Record<MajorName, number> = {
    rpl: 25,      // Orange
    tkj: 45,      // Yellow
    dkv: 220,     // Blue
    animasi: 320, // Pink
    broadcasting: 355, // Red
    tei: 140,     // Green
    mekatronika: 150,  // Dark green
    tav: 165      // Light green
  };

  filters.push(`hue-rotate(${hueRotateMap[major]}deg)`);

  return filters.join(' ');
};
