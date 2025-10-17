import type { Activity } from "./Activity";

export interface OrganizationMember {
  id: string;
  name: string;
  image: string;
  position: string;
}

export interface OrganizationSection {
  id: string;
  name: string;
  image?: string;
  visi?: string;
  misi?: string;
  tasks?: string;
  programs?: string[];
  members: OrganizationMember[];
}

export interface Organization {
  id: string;
  slug: string;
  name: string;
  nickname?: string;
  logo: string;
  logoDescription?: string;
  logoDescriptions?: {
    maknaSimbol: string[];
    maknaWarna: string[];
  };
  maknaSimbol?: string[];
  maknaWarna?: string[];
  description: string;
  vision?: string;
  mission?: string;
  history?: string;
  established?: string;
  contactInfo?: {
    instagram?: { label: string; handle: string }[];
    whatsapp?: { label: string; number: string }[];
    socialMedia?: { platform: string; handle: string }[];
  };
  statistics: {
    members?: number;
    programs?: number;
    years?: number;
    meetings?: number;
  };
  leadership: {
    sekretaris?: OrganizationMember[];
    ketua?: OrganizationMember[];
    wakil?: OrganizationMember[];
    bendahara?: OrganizationMember[];
  };
  sections: OrganizationSection[];
  activities: Activity[];
  photos?: string[];
  recruitmentPoster?: string;
  recruitmentPeriod?: string;
}
