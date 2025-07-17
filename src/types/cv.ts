export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  linkedin?: string;
  website?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  responsibilities?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  description?: string;
  details?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto';
  category: string;
}

export interface Language {
  id: string;
  name: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado' | 'Nativo';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  startDate: string;
  endDate?: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary?: string;
  workExperience?: Experience[];
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
}

// Estructura simplificada para la respuesta de la IA
export interface AIGeneratedCV {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    achievements: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
  }[];
  skills: {
    technical: string[];
    soft: string[];
  };
  languages: {
    language: string;
    level: string;
  }[];
  certifications: string[];
}

// Estructura bilingüe para la respuesta de la IA
export interface BilingualCVResponse {
  spanish: AIGeneratedCV;
  english: AIGeneratedCV;
}

export interface AIProcessingResponse {
  success: boolean;
  data?: CVData;
  bilingualData?: BilingualCVResponse;
  error?: string;
}

// Tipo para el idioma actual
export type LanguageCode = 'spanish' | 'english';

// Contexto bilingüe
export interface BilingualContext {
  currentLanguage: LanguageCode;
  data: BilingualCVResponse | null;
}
