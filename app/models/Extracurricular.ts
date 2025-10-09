import type { Activity } from "./Activity";

export interface ExtracurricularStats {
  members: number;
  achievements: number;
  years: number;
  meetings: number;
}

export interface ExtracurricularInfo {
  schedule: string;
  time: string;
  location: string;
  fee: string;
  requirements: string[];
  contact: {
    name: string;
    phone: string;
  }[];
}

export interface ExtracurricularActivity {
  id: string;
  image: string;
  title: string;
  description: string;
  date: string;
}

export interface Extracurricular {
  id: string;
  slug: string;
  name: string;
  description: string;
  category?: string;
  icon?: string;
  image?: string;
  established?: string;

  // Stats
  memberCount?: number;
  achievementCount?: number;
  yearEstablished?: number;
  meetingsPerWeek?: number;

  // Details
  coach?: string;
  schedule?: string;
  location?: string;
  fee?: string;
  fullDescription?: string;

  // Lists
  requirements?: string[];
  activities?: ExtracurricularActivity[];

  // Registration
  registrationOpen?: boolean;
  registrationPeriod?: string;
  contactInfo?: string;

  // Legacy support
  statistics?: ExtracurricularStats;
  registrationInfo?: ExtracurricularInfo;
}
