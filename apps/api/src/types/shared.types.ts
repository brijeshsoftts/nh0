import { Category, UserRole } from './prisma.types';

export interface CurrentUser {
  id: string;
  email: string;
  role: UserRole;
  category?: Category;
}
type Tone = 'emerald' | 'gold' | 'rose' | 'sky' | 'teal' | 'violet';

export interface StatItem {
  id: string;
  title: string;
  value: string;
  description: string;
  icon: string;
  link?: string;
  tone?: Tone;
}
