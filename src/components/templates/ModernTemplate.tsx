import React from 'react'
import { CVData, LanguageCode } from '@/types/cv'
import { CVTemplate } from '@/types/templates'
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react'
import { getTranslations } from '@/lib/translations'

interface ModernTemplateProps {
  data: CVData
  template: CVTemplate
  language?: LanguageCode
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data, template, language = 'spanish' }) => {
  const t = getTranslations(language)

  // Función para traducir categorías de habilidades
  const translateSkillCategory = (category: string): string => {
    const categoryMap: Record<string, keyof typeof t.skillCategories> = {
      'Habilidades Técnicas': 'technical',
      'Technical Skills': 'technical',
      'Habilidades Blandas': 'soft',
      'Soft Skills': 'soft',
      'Herramientas': 'tools',
      'Tools': 'tools',
      'Idiomas': 'languages',
      'Languages': 'languages'
    }

    const key = categoryMap[category]
    return key ? t.skillCategories[key] : category
  }
  const { personalInfo, experience, education, skills, languages, projects } = data

  // Función helper para ordenamiento
  const getDateForSort = (item: any) => {
    if (item.current) return new Date('9999-12-31')
    if (item.endDate) return new Date(item.endDate)
    if (item.startDate) return new Date(item.startDate)
    return new Date('1900-01-01')
  }

  // Ordenar experiencia por fecha (más reciente primero)
  const sortedExperience = [...experience].sort((a, b) => {
    // Si ambos son trabajos actuales, ordenar por startDate (más reciente primero)
    if (a.current && b.current) {
      const startA = a.startDate ? new Date(a.startDate) : new Date('1900-01-01')
      const startB = b.startDate ? new Date(b.startDate) : new Date('1900-01-01')
      return startB.getTime() - startA.getTime()
    }

    // Si solo uno es actual, va primero
    if (a.current && !b.current) return -1
    if (!a.current && b.current) return 1

    // Para trabajos no actuales, ordenar por endDate (más reciente primero)
    const dateA = getDateForSort(a)
    const dateB = getDateForSort(b)
    return dateB.getTime() - dateA.getTime()
  })

  const sortedEducation = [...education].sort((a, b) => {
    const dateA = getDateForSort(a)
    const dateB = getDateForSort(b)
    return dateB.getTime() - dateA.getTime()
  })

  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = getDateForSort(a)
    const dateB = getDateForSort(b)
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <div className="w-full lg:max-w-[280mm] min-h-screen sm:min-h-[396mm] bg-white shadow-lg rounded-lg overflow-hidden" id="cv-content">
      {/* Header del CV */}
      <div
        className="text-white p-3 sm:p-4 md:p-6 lg:p-8 text-center"
        style={{
          background: `linear-gradient(135deg, ${template.colors.primary} 0%, ${template.colors.secondary} 100%)`
        }}
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-white">{personalInfo.fullName}</h1>
        
        {/* Información de contacto */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
        {/* Perfil Profesional */}
        {data.summary && (
          <section>
            <h2
              className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 pb-2 text-gray-900"
              style={{
                borderBottom: `2px solid ${template.colors.primary}`
              }}
            >
              {t.sections.professionalProfile}
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
              {data.summary}
            </p>
          </section>
        )}

        {/* Experiencia */}
        {sortedExperience.length > 0 && (
          <section>
            <h2
              className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 pb-2 text-gray-900"
              style={{
                borderBottom: `2px solid ${template.colors.primary}`
              }}
            >
              {t.sections.experience}
            </h2>
            <div className="space-y-4">
              {sortedExperience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{exp.position}</h3>
                      <p
                        className="font-medium"
                        style={{ color: template.colors.primary }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {exp.startDate} - {exp.current ? t.common.present : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{exp.description}</p>
                  {exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Educación */}
        {sortedEducation.length > 0 && (
          <section>
            <h2
              className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 pb-2 text-gray-900"
              style={{
                borderBottom: `2px solid ${template.colors.primary}`
              }}
            >
              {t.sections.education}
            </h2>
            <div className="space-y-4">
              {sortedEducation.map((edu) => (
                <div key={edu.id} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{edu.degree}</h3>
                      <p
                        className="font-medium"
                        style={{ color: template.colors.primary }}
                      >
                        {edu.institution}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {edu.startDate} - {edu.current ? t.common.present : edu.endDate}
                    </span>
                  </div>
                  {edu.details && (
                    <p className="text-gray-700 text-sm">{edu.details}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Habilidades */}
          {skills.length > 0 && (
            <section>
              <h2
                className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 pb-2 text-gray-900"
                style={{
                  borderBottom: `2px solid ${template.colors.primary}`
                }}
              >
                {t.sections.skills}
              </h2>
              <div className="space-y-3">
                {Object.entries(
                  skills.reduce((acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = []
                    acc[skill.category].push(skill)
                    return acc
                  }, {} as Record<string, typeof skills>)
                ).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="font-medium text-gray-900 mb-2">{translateSkillCategory(category)}</h3>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <span
                          key={skill.id}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{
                            backgroundColor: `${template.colors.primary}20`,
                            color: template.colors.primary
                          }}
                        >
                          {skill.name} ({skill.level})
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Idiomas */}
          {languages.length > 0 && (
            <section>
              <h2
                className="text-xl font-bold mb-4 pb-2 text-gray-900"
                style={{
                  borderBottom: `2px solid ${template.colors.primary}`
                }}
              >
                {t.sections.languages}
              </h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span className="font-medium text-gray-900">{lang.name}</span>
                    <span className="text-gray-600">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Proyectos */}
        {sortedProjects.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold mb-4 pb-2 text-gray-900"
              style={{
                borderBottom: `2px solid ${template.colors.primary}`
              }}
            >
              {t.sections.projects}
            </h2>
            <div className="space-y-4">
              {sortedProjects.map((project) => (
                <div key={project.id} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{project.name}</h3>
                      {project.url && (
                        <a
                          href={project.url}
                          className="text-sm break-all hover:underline"
                          style={{ color: template.colors.primary }}
                        >
                          {project.url}
                        </a>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {project.startDate} - {project.endDate || t.common.present}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded text-xs"
                          style={{
                            backgroundColor: `${template.colors.secondary}20`,
                            color: template.colors.secondary
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
