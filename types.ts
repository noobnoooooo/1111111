
export enum View {
  HOME = 'HOME',
  COMMUNITY = 'COMMUNITY',
  PROFILE = 'PROFILE',
  DETAIL = 'DETAIL',
  CERTIFICATE = 'CERTIFICATE',
  PROJECT_LIST = 'PROJECT_LIST',
  FUND_LIST = 'FUND_LIST',
  SPECIAL_FUND_LIST = 'SPECIAL_FUND_LIST',
  MARKET_LIST = 'MARKET_LIST',
  // Fix: Added missing views for desktop dashboard components
  CHAT = 'CHAT',
  IMAGES = 'IMAGES',
  ANALYTICS = 'ANALYTICS',
  SETTINGS = 'SETTINGS'
}

export type EntityType = 'PROJECT' | 'FUND' | 'SPECIAL_FUND' | 'MARKET';

export interface CharityEntity {
  id: string;
  type: EntityType;
  title: string;
  cover: string;
  target: number;
  current: number;
  spent?: number; // Financial disclosure: money already spent
  donorsCount: number;
  category?: string;
  description: string;
  org: string;
  dateRange?: string;
}

export interface Project extends CharityEntity {}

export interface Donation {
  id: string;
  userName: string;
  amount: number;
  time: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Fix: Added missing interface for ImageStudio
export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: Date;
}
