import React from 'react'
import { CVData, LanguageCode } from '@/types/cv'
import { CVTemplate } from '@/types/templates'
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react'
import { getTranslations } from '@/lib/translations'

interface ProfessionalTemplateProps {
  data: CVData
  template: CVTemplate
  language?: LanguageCode
}

export const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data, template, language = 'spanish' }) => {
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
  // Ordenar experiencia laboral por fecha (más reciente primero)
  const sortedWorkExperience = [...(data.experience || [])].sort((a, b) => {
    // Función para obtener la fecha más relevante para ordenamiento
    const getDateForSort = (item: any) => {
      // Para trabajos actuales, usar startDate para ordenar correctamente
      if (item.current) {
        return item.startDate ? new Date(item.startDate) : new Date('1900-01-01')
      }
      // Para trabajos terminados, usar endDate
      if (item.endDate) return new Date(item.endDate)
      // Fallback a startDate
      if (item.startDate) return new Date(item.startDate)
      return new Date('1900-01-01')
    }

    const dateA = getDateForSort(a)
    const dateB = getDateForSort(b)

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
    return dateB.getTime() - dateA.getTime()
  })

  // Ordenar educación por fecha (más reciente primero)
  const sortedEducation = [...(data.education || [])].sort((a, b) => {
    const getDateForSort = (item: any) => {
      if (item.current) return new Date('9999-12-31')
      if (item.endDate) return new Date(item.endDate)
      if (item.startDate) return new Date(item.startDate)
      return new Date('1900-01-01')
    }

    const dateA = getDateForSort(a)
    const dateB = getDateForSort(b)
    return dateB.getTime() - dateA.getTime()
  })

  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) return dateString

    const locale = language === 'spanish' ? 'es-ES' : 'en-US'
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long'
    })
  }

  const formatDateRange = (startDate: string, endDate: string, current?: boolean) => {
    const start = formatDate(startDate)
    const end = current ? t.common.present : (endDate ? formatDate(endDate) : t.common.present)
    return `${start} - ${end}`
  }

  return (
    <div className="w-full mx-auto bg-white shadow-lg overflow-hidden" style={{ minHeight: '297mm' }}>
      <div className="flex flex-row min-h-full">
        {/* Columna Principal (Izquierda) */}
        <div className="flex-1 p-3 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
          {/* Header con nombre */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {data.personalInfo.fullName}
            </h1>
          </div>

          {/* Perfil Profesional */}
          {data.summary && (
            <div className="space-y-3">
              <h2 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-1">
                {t.sections.professionalProfile}
              </h2>
              <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed text-justify">
                {data.summary}
              </p>
            </div>
          )}

          {/* Experiencia Laboral */}
          {sortedWorkExperience.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-1">
                {t.sections.experience}
              </h2>
              {sortedWorkExperience.map((exp, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm md:text-base">
                        {exp.position}, {exp.company}
                      </h3>
                      {exp.location && (
                        <p className="text-gray-600 text-xs md:text-sm">{exp.location}</p>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs md:text-sm font-medium whitespace-nowrap">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 text-xs md:text-sm leading-relaxed mb-2">
                      {exp.description}
                    </p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-xs md:text-sm">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="leading-relaxed">{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Educación */}
          {sortedEducation.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-1">
                {t.sections.education}
              </h2>
              {sortedEducation.map((edu, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm md:text-base">
                        {edu.degree}, {edu.institution}
                      </h3>
                      {edu.location && (
                        <p className="text-gray-600 text-xs md:text-sm">{edu.location}</p>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs md:text-sm font-medium whitespace-nowrap">
                      {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                    </p>
                  </div>
                  {edu.details && (
                    <p className="text-gray-700 text-xs md:text-sm">{edu.details}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Proyectos */}
          {data.projects && data.projects.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 border-b-2 border-gray-200 pb-1">
                {t.sections.projects}
              </h2>
              {data.projects.map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm md:text-base">
                        {project.name}
                      </h3>
                      {project.url && (
                        <p className="text-gray-600 text-xs md:text-sm break-all">{project.url}</p>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs md:text-sm font-medium whitespace-nowrap">
                      {project.startDate} - {project.endDate || t.common.present}
                    </p>
                  </div>
                  <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                    {project.description}
                  </p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Derecho */}
        <div
          className="w-full sm:w-64 md:w-80 p-3 sm:p-6 md:p-8 text-white space-y-4 sm:space-y-6"
          style={{ backgroundColor: template.colors.primary }}
        >
          {/* Información de Contacto */}
          <div className="space-y-4">
            <h2 className="text-sm sm:text-lg md:text-xl font-bold border-b-2 border-white/30 pb-2">
              {language === 'spanish' ? 'Contacto' : 'Contact'}
            </h2>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base">
              {data.personalInfo.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="break-words">{data.personalInfo.location}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span className="break-words">{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="break-words">{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-center gap-3">
                  <Linkedin className="h-4 w-4 flex-shrink-0" />
                  <span className="break-words">{data.personalInfo.linkedin}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 flex-shrink-0" />
                  <span className="break-words">{data.personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Habilidades */}
          {data.skills && data.skills.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm sm:text-lg md:text-xl font-bold border-b-2 border-white/30 pb-2">
                {t.sections.skills}
              </h2>
              <div className="space-y-4">
                {Object.entries(
                  data.skills.reduce((acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = []
                    acc[skill.category].push(skill)
                    return acc
                  }, {} as Record<string, typeof data.skills>)
                ).map(([category, categorySkills]) => (
                  <div key={category} className="space-y-2">
                    <h3 className="text-sm md:text-base font-bold text-white/90 border-b border-white/20 pb-1">
                      {translateSkillCategory(category)}
                    </h3>
                    <div className="space-y-2">
                      {categorySkills.slice(0, 4).map((skill, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs md:text-sm font-medium">{skill.name}</span>
                            <span className="text-xs text-white/80">{skill.level}</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <div
                              className="bg-white rounded-full h-2 transition-all duration-300"
                              style={{
                                width: skill.level === 'Experto' ? '100%' :
                                       skill.level === 'Avanzado' ? '80%' :
                                       skill.level === 'Intermedio' ? '60%' : '40%'
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Idiomas */}
          {data.languages && data.languages.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm sm:text-lg md:text-xl font-bold border-b-2 border-white/30 pb-2">
                {t.sections.languages}
              </h2>
              <div className="space-y-2">
                {data.languages.map((language, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm md:text-base">{language.name}</span>
                    <span className="text-xs text-white/80">{language.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  )
}
