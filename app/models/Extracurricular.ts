import type { Activity } from './Activity';

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

export interface Extracurricular {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  established?: string;
  statistics: ExtracurricularStats;
  registrationInfo: ExtracurricularInfo;
  activities: Activity[];
}
