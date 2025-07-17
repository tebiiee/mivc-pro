import { LanguageCode } from '@/types/cv';

export interface CVTranslations {
  sections: {
    professionalProfile: string;
    experience: string;
    education: string;
    skills: string;
    languages: string;
    projects: string;
    certifications: string;
  };
  buttons: {
    downloadPDF: string;
    downloadBilingualPDF: string;
    editInfo: string;
    changeTemplate: string;
    backToHome: string;
    language: string;
  };
  skillCategories: {
    technical: string;
    soft: string;
    tools: string;
    methodologies: string;
  };
  levels: {
    basic: string;
    intermediate: string;
    advanced: string;
    expert: string;
    native: string;
  };
  common: {
    present: string;
    current: string;
    to: string;
  };
}

export const translations: Record<LanguageCode, CVTranslations> = {
  spanish: {
    sections: {
      professionalProfile: 'Perfil Profesional',
      experience: 'Experiencia Profesional',
      education: 'Educación',
      skills: 'Habilidades',
      languages: 'Idiomas',
      projects: 'Proyectos',
      certifications: 'Certificaciones'
    },
    buttons: {
      downloadPDF: 'Descargar PDF',
      downloadBilingualPDF: 'Descargar PDFs (ES + EN)',
      editInfo: 'Editar información',
      changeTemplate: 'Cambiar plantilla',
      backToHome: 'Volver al inicio',
      language: 'Idioma'
    },
    skillCategories: {
      technical: 'Habilidades Técnicas',
      soft: 'Habilidades Blandas',
      tools: 'Herramientas',
      methodologies: 'Metodologías'
    },
    levels: {
      basic: 'Básico',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
      expert: 'Experto',
      native: 'Nativo'
    },
    common: {
      present: 'Presente',
      current: 'Actual',
      to: 'a'
    }
  },
  english: {
    sections: {
      professionalProfile: 'Professional Profile',
      experience: 'Professional Experience',
      education: 'Education',
      skills: 'Skills',
      languages: 'Languages',
      projects: 'Projects',
      certifications: 'Certifications'
    },
    buttons: {
      downloadPDF: 'Download PDF',
      downloadBilingualPDF: 'Download PDFs (ES + EN)',
      editInfo: 'Edit information',
      changeTemplate: 'Change template',
      backToHome: 'Back to home',
      language: 'Language'
    },
    skillCategories: {
      technical: 'Technical Skills',
      soft: 'Soft Skills',
      tools: 'Tools',
      methodologies: 'Methodologies'
    },
    levels: {
      basic: 'Basic',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      expert: 'Expert',
      native: 'Native'
    },
    common: {
      present: 'Present',
      current: 'Current',
      to: 'to'
    }
  }
};

export function getTranslations(language: LanguageCode): CVTranslations {
  return translations[language];
}

export function t(language: LanguageCode, key: string): string {
  const keys = key.split('.');
  let value: unknown = translations[language];

  for (const k of keys) {
    value = (value as Record<string, unknown>)?.[k];
  }

  return (typeof value === 'string' ? value : key);
}
