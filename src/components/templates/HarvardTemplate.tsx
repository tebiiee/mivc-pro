import React from 'react'
import { CVData, LanguageCode } from '@/types/cv'
import { CVTemplate } from '@/types/templates'
import { getTranslations } from '@/lib/translations'

interface HarvardTemplateProps {
  data: CVData
  template: CVTemplate
  language?: LanguageCode
}

export const HarvardTemplate: React.FC<HarvardTemplateProps> = ({ data, language = 'spanish' }) => {
  const t = getTranslations(language)
  // Ordenar experiencia laboral por fecha (más reciente primero)
  const sortedWorkExperience = [...(data.experience || [])].sort((a, b) => {
    const dateA = new Date(a.endDate || '9999-12-31')
    const dateB = new Date(b.endDate || '9999-12-31')
    return dateB.getTime() - dateA.getTime()
  })

  // Ordenar educación por fecha (más reciente primero)
  const sortedEducation = [...(data.education || [])].sort((a, b) => {
    const dateA = new Date(a.endDate || '9999-12-31')
    const dateB = new Date(b.endDate || '9999-12-31')
    return dateB.getTime() - dateA.getTime()
  })

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { 
      month: 'long', 
      year: 'numeric' 
    }).replace(/^\w/, c => c.toUpperCase())
  }

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = formatDate(startDate)
    const end = endDate ? formatDate(endDate) : 'Presente'
    return `${start} – ${end}`
  }

  return (
    <div
      className="w-full mx-auto bg-white text-black font-serif leading-tight px-2 sm:px-4 md:px-8 lg:px-12"
      style={{
        minHeight: '297mm',
        padding: '8mm 10mm sm:15mm sm:20mm',
        fontSize: 'clamp(9pt, 2.5vw, 11pt)',
        lineHeight: '1.3'
      }}
    >
      {/* Header */}
      <div className="text-center mb-3 sm:mb-4 md:mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-2" style={{ fontSize: 'clamp(14pt, 4vw, 18pt)' }}>
          {data.personalInfo.fullName}
        </h1>
        <div className="text-xs md:text-sm flex flex-wrap justify-center gap-1 md:gap-2" style={{ fontSize: 'clamp(9pt, 2.5vw, 10pt)' }}>
          {data.personalInfo.location && (
            <span className="whitespace-nowrap">{data.personalInfo.location}</span>
          )}
          {data.personalInfo.location && (data.personalInfo.linkedin || data.personalInfo.phone || data.personalInfo.email) && (
            <span className="hidden md:inline">•</span>
          )}
          {data.personalInfo.linkedin && (
            <span className="whitespace-nowrap">{data.personalInfo.linkedin}</span>
          )}
          {data.personalInfo.linkedin && (data.personalInfo.phone || data.personalInfo.email) && (
            <span className="hidden md:inline">•</span>
          )}
          {data.personalInfo.phone && (
            <span className="whitespace-nowrap">{data.personalInfo.phone}</span>
          )}
          {data.personalInfo.phone && data.personalInfo.email && (
            <span className="hidden md:inline">•</span>
          )}
          {data.personalInfo.email && (
            <span className="whitespace-nowrap break-all">{data.personalInfo.email}</span>
          )}
        </div>
      </div>

      {/* Línea separadora */}
      <hr className="border-black border-t-2 mb-3 md:mb-4" />

      {/* Resumen profesional */}
      {data.summary && (
        <div className="mb-4 md:mb-6">
          <p className="text-justify italic leading-relaxed" style={{ fontSize: 'clamp(10pt, 2.8vw, 11pt)' }}>
            {data.summary}
          </p>
        </div>
      )}

      {/* Experiencia Profesional */}
      {sortedWorkExperience.length > 0 && (
        <div className="mb-4 md:mb-6">
          <h2 className="text-base md:text-lg font-bold mb-2 md:mb-3 uppercase tracking-wide" style={{ fontSize: 'clamp(11pt, 3vw, 12pt)' }}>
            {t.sections.experience.toUpperCase()}
          </h2>
          <hr className="border-black mb-2 md:mb-3" />

          {sortedWorkExperience.map((job, index) => (
            <div key={index} className="mb-3 md:mb-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1 gap-1 md:gap-0">
                <div className="flex-1">
                  <h3 className="font-bold" style={{ fontSize: 'clamp(10pt, 2.8vw, 11pt)' }}>
                    {job.company}
                  </h3>
                  <p className="font-medium" style={{ fontSize: 'clamp(10pt, 2.8vw, 11pt)' }}>
                    {job.position}
                  </p>
                </div>
                <div className="text-left md:text-right text-sm md:flex-shrink-0" style={{ fontSize: 'clamp(9pt, 2.5vw, 10pt)' }}>
                  <p className="font-medium">{job.location}</p>
                  <p className="italic">{formatDateRange(job.startDate, job.endDate)}</p>
                </div>
              </div>
              
              {job.description && (
                <p className="text-justify mb-2 leading-relaxed" style={{ fontSize: 'clamp(9pt, 2.5vw, 10pt)' }}>
                  {job.description}
                </p>
              )}
              {job.achievements && job.achievements.length > 0 && (
                <ul className="list-disc ml-4 md:ml-6 mt-2 space-y-1" style={{ fontSize: 'clamp(9pt, 2.5vw, 10pt)' }}>
                  {job.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-justify leading-relaxed">
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Educación */}
      {sortedEducation.length > 0 && (
        <div className="mb-4 md:mb-6">
          <h2 className="text-base md:text-lg font-bold mb-2 md:mb-3 uppercase tracking-wide" style={{ fontSize: 'clamp(11pt, 3vw, 12pt)' }}>
            {t.sections.education.toUpperCase()}
          </h2>
          <hr className="border-black mb-2 md:mb-3" />
          
          {sortedEducation.map((edu, index) => (
            <div key={index} className="mb-2 md:mb-3">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 md:gap-0">
                <div className="flex-1">
                  <h3 className="font-bold uppercase" style={{ fontSize: 'clamp(10pt, 2.8vw, 11pt)' }}>
                    {edu.institution}
                  </h3>
                  <p style={{ fontSize: 'clamp(10pt, 2.8vw, 11pt)' }}>
                    {edu.degree}
                  </p>
                  {edu.details && (
                    <p className="italic" style={{ fontSize: 'clamp(9pt, 2.5vw, 10pt)' }}>
                      {edu.details}
                    </p>
                  )}
                </div>
                <div className="text-left md:text-right text-sm md:flex-shrink-0" style={{ fontSize: 'clamp(9pt, 2.5vw, 10pt)' }}>
                  <p className="font-medium">{edu.location}</p>
                  <p className="italic">{formatDate(edu.endDate)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Habilidades */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-3 md:mb-4">
          <h2 className="text-base md:text-lg font-bold mb-2 md:mb-3 uppercase tracking-wide" style={{ fontSize: 'clamp(11pt, 3vw, 12pt)' }}>
            {t.sections.skills.toUpperCase()}
          </h2>
          <hr className="border-black mb-2 md:mb-3" />

          <div className="space-y-3">
            {Object.entries(
              data.skills.reduce((acc, skill) => {
                if (!acc[skill.category]) acc[skill.category] = []
                acc[skill.category].push(skill)
                return acc
              }, {} as Record<string, typeof data.skills>)
            ).map(([category, categorySkills]) => (
              <div key={category}>
                <h3 className="font-bold mb-1" style={{ fontSize: 'clamp(10pt, 2.8vw, 11pt)' }}>
                  {category}
                </h3>
                <ul className="list-disc ml-4 md:ml-6 space-y-1" style={{ fontSize: 'clamp(9pt, 2.5vw, 10pt)' }}>
                  {categorySkills.map((skill, index) => (
                    <li key={index} className="text-justify leading-relaxed">
                      {skill.name} ({skill.level})
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Idiomas */}
      {data.languages && data.languages.length > 0 && (
        <div className="mb-3 md:mb-4">
          <h2 className="text-base md:text-lg font-bold mb-2 md:mb-3 uppercase tracking-wide" style={{ fontSize: 'clamp(11pt, 3vw, 12pt)' }}>
            {t.sections.languages.toUpperCase()}
          </h2>
          <hr className="border-black mb-2 md:mb-3" />

          <ul className="list-disc ml-4 md:ml-6 space-y-1" style={{ fontSize: 'clamp(9pt, 2.5vw, 10pt)' }}>
            {data.languages.map((language, index) => (
              <li key={index} className="text-justify leading-relaxed">
                {language.name} - {language.level}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Proyectos */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-3 md:mb-4">
          <h2 className="text-base md:text-lg font-bold mb-2 md:mb-3 uppercase tracking-wide" style={{ fontSize: 'clamp(11pt, 3vw, 12pt)' }}>
            PROYECTOS
          </h2>
          <hr className="border-black mb-2 md:mb-3" />

          {data.projects.map((project, index) => (
            <div key={index} className="mb-2 md:mb-3">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1 gap-1 md:gap-0">
                <div className="flex-1">
                  <h3 className="font-bold" style={{ fontSize: 'clamp(10pt, 2.8vw, 11pt)' }}>
                    {project.name}
                  </h3>
                  {project.url && (
                    <p className="text-sm break-all" style={{ fontSize: 'clamp(9pt, 2.5vw, 10pt)' }}>
                      {project.url}
                    </p>
                  )}
                </div>
                <div className="text-left md:text-right text-sm md:flex-shrink-0" style={{ fontSize: 'clamp(9pt, 2.5vw, 10pt)' }}>
                  <p className="italic">
                    {formatDateRange(project.startDate, project.endDate || '')}
                  </p>
                </div>
              </div>
              <p className="text-justify mb-2 leading-relaxed" style={{ fontSize: 'clamp(9pt, 2.5vw, 10pt)' }}>
                {project.description}
              </p>
              {project.technologies && project.technologies.length > 0 && (
                <p className="text-sm" style={{ fontSize: 'clamp(8pt, 2.2vw, 9pt)' }}>
                  <strong>Tecnologías:</strong> {project.technologies.join(', ')}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
