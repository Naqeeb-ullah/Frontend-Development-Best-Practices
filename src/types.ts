export type ActiveSection = 'responsive' | 'animations' | 'navigation' | 'forms' | 'dynamic';

export interface SectionMeta {
  id: ActiveSection;
  title: string;
  description: string;
  practiceTitle: string;
  practiceDescription: string;
}

export interface AnimationPreset {
  name: string;
  description: string;
  keyframes: any;
  code: string;
}

export interface FormValues {
  fullName: string;
  email: string;
  password: string;
  category: string;
  agreeToTerms: boolean;
  honeypot: string; // Anti-spam honeypot
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  category?: string;
  agreeToTerms?: string;
}

export interface DemoItem {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  complexity: 'Easy' | 'Medium' | 'Hard';
  readTime: number;
}
