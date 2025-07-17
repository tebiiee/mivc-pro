import { CVData, AIGeneratedCV, PersonalInfo, Experience, Education, Skill, Language as CVLanguage, Project } from '@/types/cv';

/**
 * Convierte los datos generados por la IA al formato CVData que esperan las plantillas
 */
export function convertAIDataToCVData(aiData: AIGeneratedCV): CVData {
  // Convertir información personal
  const personalInfo: PersonalInfo = {
    fullName: aiData.personalInfo.fullName,
    email: aiData.personalInfo.email,
    phone: aiData.personalInfo.phone,
    location: aiData.personalInfo.location,
    summary: aiData.summary,
    linkedin: '',
    website: ''
  };

  // Convertir experiencia laboral
  const experience: Experience[] = aiData.experience.map((exp, index) => ({
    id: `exp_${String(index + 1).padStart(3, '0')}`,
    company: exp.company,
    position: exp.position,
    location: '',
    startDate: exp.startDate,
    endDate: exp.endDate,
    current: exp.endDate === '' || exp.endDate.toLowerCase().includes('presente') || exp.endDate.toLowerCase().includes('actual'),
    description: exp.achievements.join('. '),
    achievements: exp.achievements,
    responsibilities: []
  }));

  // Convertir educación
  const education: Education[] = aiData.education.map((edu, index) => ({
    id: `edu_${String(index + 1).padStart(3, '0')}`,
    institution: edu.institution,
    degree: edu.degree,
    field: '',
    location: '',
    startDate: edu.startDate,
    endDate: edu.endDate,
    current: edu.endDate === '' || edu.endDate.toLowerCase().includes('presente') || edu.endDate.toLowerCase().includes('actual'),
    gpa: '',
    description: '',
    details: ''
  }));

  // Convertir habilidades técnicas
  const technicalSkills: Skill[] = aiData.skills.technical.map((skill, index) => ({
    id: `skill_tech_${String(index + 1).padStart(3, '0')}`,
    name: skill,
    level: 'Avanzado' as const,
    category: 'Habilidades Técnicas'
  }));

  // Convertir habilidades blandas
  const softSkills: Skill[] = aiData.skills.soft.map((skill, index) => ({
    id: `skill_soft_${String(index + 1).padStart(3, '0')}`,
    name: skill,
    level: 'Avanzado' as const,
    category: 'Habilidades Blandas'
  }));

  // Combinar todas las habilidades
  const skills: Skill[] = [...technicalSkills, ...softSkills];

  // Convertir idiomas
  const languages: CVLanguage[] = aiData.languages.map((lang, index) => ({
    id: `lang_${String(index + 1).padStart(3, '0')}`,
    name: lang.language,
    level: mapLanguageLevel(lang.level)
  }));

  // Convertir certificaciones a proyectos (ya que no hay sección de certificaciones en CVData)
  const projects: Project[] = aiData.certifications.map((cert, index) => ({
    id: `cert_${String(index + 1).padStart(3, '0')}`,
    name: cert,
    description: `Certificación profesional: ${cert}`,
    technologies: [],
    url: '',
    startDate: '',
    endDate: ''
  }));

  return {
    personalInfo,
    summary: aiData.summary,
    workExperience: experience, // Para compatibilidad con código legacy
    experience,
    education,
    skills,
    languages,
    projects
  };
}

/**
 * Mapea los niveles de idioma de la IA a los niveles esperados por CVData
 */
function mapLanguageLevel(aiLevel: string): 'Básico' | 'Intermedio' | 'Avanzado' | 'Nativo' {
  const level = aiLevel.toLowerCase();
  
  if (level.includes('nativ') || level.includes('native')) {
    return 'Nativo';
  }
  if (level.includes('avanz') || level.includes('advanced') || level.includes('fluent')) {
    return 'Avanzado';
  }
  if (level.includes('intermedi') || level.includes('intermediate')) {
    return 'Intermedio';
  }
  
  return 'Básico';
}
