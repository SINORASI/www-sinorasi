import type { MajorName } from "~/models/MajorName";

export interface MajorColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  light: string;
  text: string;
  bg: string;
  hoverBg: string;
  border: string;
  headerBg: string;
  gradient: string;
}

export const majorColors: Record<
  MajorName,
  { primary: string; secondary: string; gradient: string }
> = {
  rpl: {
    primary: "#F78B21",
    secondary: "#E67E00",
    gradient: "linear-gradient(135deg, #F78B21, #E67E00)",
  },
  tkj: {
    primary: "#FFC911",
    secondary: "#E6B800",
    gradient: "linear-gradient(135deg, #FFC911, #E6B800)",
  },
  dkv: {
    primary: "#3598F9",
    secondary: "#2E7CE6",
    gradient: "linear-gradient(135deg, #3598F9, #2E7CE6)",
  },
  animasi: {
    primary: "#D93F92",
    secondary: "#C73682",
    gradient: "linear-gradient(135deg, #D93F92, #C73682)",
  },
  broadcasting: {
    primary: "#E14648",
    secondary: "#C93E40",
    gradient: "linear-gradient(135deg, #E14648, #C93E40)",
  },
  tei: {
    primary: "#059451",
    secondary: "#047B42",
    gradient: "linear-gradient(135deg, #059451, #047B42)",
  },
  mekatronika: {
    primary: "#57A77C",
    secondary: "#4E9670",
    gradient: "linear-gradient(135deg, #57A77C, #4E9670)",
  },
  tav: {
    primary: "#4FA898",
    secondary: "#469788",
    gradient: "linear-gradient(135deg, #4FA898, #469788)",
  },
};

export const majorColorSchemes: Record<MajorName, MajorColorScheme> = {
  rpl: {
    primary: "#F78B21",
    secondary: "#E67E00",
    accent: "#FFB366",
    light: "#FFF3E8",
    text: "#F78B21",
    bg: "#F78B21",
    hoverBg: "#E67E00",
    border: "#F78B21",
    headerBg: "rgba(247, 139, 33, 0.3)",
    gradient: "linear-gradient(135deg, #F78B21, #E67E00)",
  },
  tkj: {
    primary: "#FFC911",
    secondary: "#E6B800",
    accent: "#FFD84D",
    light: "#FFF9E5",
    text: "#FFC911",
    bg: "#FFC911",
    hoverBg: "#E6B800",
    border: "#FFC911",
    headerBg: "rgba(255, 201, 17, 0.3)",
    gradient: "linear-gradient(135deg, #FFC911, #E6B800)",
  },
  dkv: {
    primary: "#3598F9",
    secondary: "#2E7CE6",
    accent: "#6BB4FF",
    light: "#E8F4FF",
    text: "#3598F9",
    bg: "#3598F9",
    hoverBg: "#2E7CE6",
    border: "#3598F9",
    headerBg: "rgba(53, 152, 249, 0.3)",
    gradient: "linear-gradient(135deg, #3598F9, #2E7CE6)",
  },
  animasi: {
    primary: "#D93F92",
    secondary: "#C73682",
    accent: "#E86BB4",
    light: "#FCE9F3",
    text: "#D93F92",
    bg: "#D93F92",
    hoverBg: "#C73682",
    border: "#D93F92",
    headerBg: "rgba(217, 63, 146, 0.3)",
    gradient: "linear-gradient(135deg, #D93F92, #C73682)",
  },
  broadcasting: {
    primary: "#E14648",
    secondary: "#C93E40",
    accent: "#ED7275",
    light: "#FEEBEB",
    text: "#E14648",
    bg: "#E14648",
    hoverBg: "#C93E40",
    border: "#E14648",
    headerBg: "rgba(225, 70, 72, 0.3)",
    gradient: "linear-gradient(135deg, #E14648, #C93E40)",
  },
  tei: {
    primary: "#059451",
    secondary: "#047B42",
    accent: "#3BAA73",
    light: "#E7F7EF",
    text: "#059451",
    bg: "#059451",
    hoverBg: "#047B42",
    border: "#059451",
    headerBg: "rgba(5, 148, 81, 0.3)",
    gradient: "linear-gradient(135deg, #059451, #047B42)",
  },
  mekatronika: {
    primary: "#57A77C",
    secondary: "#4E9670",
    accent: "#7FC09D",
    light: "#EDF7F2",
    text: "#57A77C",
    bg: "#57A77C",
    hoverBg: "#4E9670",
    border: "#57A77C",
    headerBg: "rgba(87, 167, 124, 0.3)",
    gradient: "linear-gradient(135deg, #57A77C, #4E9670)",
  },
  tav: {
    primary: "#4FA898",
    secondary: "#469788",
    accent: "#74BDB1",
    light: "#ECF6F4",
    text: "#4FA898",
    bg: "#4FA898",
    hoverBg: "#469788",
    border: "#4FA898",
    headerBg: "rgba(79, 168, 152, 0.3)",
    gradient: "linear-gradient(135deg, #4FA898, #469788)",
  },
};

export const getMajorIconFilter = (major: MajorName): string => {
  const colors = majorColorSchemes[major];
  if (!colors) return "";

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const rgb = hexToRgb(colors.primary);
  const brightness = Math.round((rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000);

  const filters: string[] = [];

  if (brightness < 128) {
    filters.push("brightness(1.2)");
  } else {
    filters.push("brightness(0.9)");
  }

  filters.push("saturate(1.3)");

  const hueRotateMap: Record<MajorName, number> = {
    rpl: 25,
    tkj: 45,
    dkv: 220,
    animasi: 320,
    broadcasting: 355,
    tei: 140,
    mekatronika: 150,
    tav: 165,
  };

  filters.push(`hue-rotate(${hueRotateMap[major]}deg)`);

  return filters.join(" ");
};
