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

  memberCount?: number;
  achievementCount?: number;
  yearEstablished?: number;
  meetingsPerWeek?: number;

  coach?: string;
  schedule?: string;
  location?: string;
  fullDescription?: string;

  requirements?: string[];
  activities?: ExtracurricularActivity[];

  registrationOpen?: boolean;
  registrationPeriod?: string;
  contactInfo?: string;

  statistics?: ExtracurricularStats;
  registrationInfo?: ExtracurricularInfo;
}
