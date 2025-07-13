import React from 'react'
import { CVData } from '@/types/cv'
import { CVTemplate } from '@/types/templates'

interface HarvardTemplateProps {
  data: CVData
  template: CVTemplate
}

export const HarvardTemplate: React.FC<HarvardTemplateProps> = ({ data }) => {
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
      className="w-full max-w-[210mm] mx-auto bg-white text-black font-serif leading-tight"
      style={{ 
        minHeight: '297mm',
        padding: '20mm 25mm',
        fontSize: '11pt',
        lineHeight: '1.3'
      }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2" style={{ fontSize: '18pt' }}>
          {data.personalInfo.fullName}
        </h1>
        <div className="text-sm" style={{ fontSize: '10pt' }}>
          {data.personalInfo.location && (
            <span>{data.personalInfo.location} • </span>
          )}
          {data.personalInfo.linkedin && (
            <span>{data.personalInfo.linkedin} • </span>
          )}
          {data.personalInfo.phone && (
            <span>{data.personalInfo.phone} • </span>
          )}
          {data.personalInfo.email && (
            <span>{data.personalInfo.email}</span>
          )}
        </div>
      </div>

      {/* Línea separadora */}
      <hr className="border-black border-t-2 mb-4" />

      {/* Resumen profesional */}
      {data.summary && (
        <div className="mb-6">
          <p className="text-justify italic" style={{ fontSize: '11pt' }}>
            {data.summary}
          </p>
        </div>
      )}

      {/* Experiencia Profesional */}
      {sortedWorkExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ fontSize: '12pt' }}>
            EXPERIENCIA PROFESIONAL
          </h2>
          <hr className="border-black mb-3" />
          
          {sortedWorkExperience.map((job, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-bold" style={{ fontSize: '11pt' }}>
                    {job.company}
                  </h3>
                  <p className="font-medium" style={{ fontSize: '11pt' }}>
                    {job.position}
                  </p>
                </div>
                <div className="text-right text-sm" style={{ fontSize: '10pt' }}>
                  <p className="font-medium">{job.location}</p>
                  <p className="italic">{formatDateRange(job.startDate, job.endDate)}</p>
                </div>
              </div>
              
              {job.responsibilities && job.responsibilities.length > 0 && (
                <ul className="list-disc ml-6 mt-2 space-y-1" style={{ fontSize: '10pt' }}>
                  {job.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="text-justify">
                      {responsibility}
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
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ fontSize: '12pt' }}>
            EDUCACIÓN
          </h2>
          <hr className="border-black mb-3" />
          
          {sortedEducation.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold uppercase" style={{ fontSize: '11pt' }}>
                    {edu.institution}
                  </h3>
                  <p style={{ fontSize: '11pt' }}>
                    {edu.degree}
                  </p>
                  {edu.details && (
                    <p className="italic" style={{ fontSize: '10pt' }}>
                      {edu.details}
                    </p>
                  )}
                </div>
                <div className="text-right text-sm" style={{ fontSize: '10pt' }}>
                  <p className="font-medium">{edu.location}</p>
                  <p className="italic">{formatDate(edu.endDate)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills Adicionales */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ fontSize: '12pt' }}>
            SKILLS ADICIONALES
          </h2>
          <hr className="border-black mb-3" />

          <ul className="list-disc ml-6 space-y-1" style={{ fontSize: '10pt' }}>
            {data.skills.map((skill, index) => (
              <li key={index} className="text-justify">
                {typeof skill === 'string' ? skill : skill.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Idiomas */}
      {data.languages && data.languages.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ fontSize: '12pt' }}>
            IDIOMAS
          </h2>
          <hr className="border-black mb-3" />

          <ul className="list-disc ml-6 space-y-1" style={{ fontSize: '10pt' }}>
            {data.languages.map((language, index) => (
              <li key={index} className="text-justify">
                {language.name} - {language.level}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Proyectos */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ fontSize: '12pt' }}>
            PROYECTOS
          </h2>
          <hr className="border-black mb-3" />

          {data.projects.map((project, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-bold" style={{ fontSize: '11pt' }}>
                    {project.name}
                  </h3>
                  {project.url && (
                    <p className="text-sm" style={{ fontSize: '10pt' }}>
                      {project.url}
                    </p>
                  )}
                </div>
                <div className="text-right text-sm" style={{ fontSize: '10pt' }}>
                  <p className="italic">
                    {formatDateRange(project.startDate, project.endDate || '')}
                  </p>
                </div>
              </div>
              <p className="text-justify mb-2" style={{ fontSize: '10pt' }}>
                {project.description}
              </p>
              {project.technologies && project.technologies.length > 0 && (
                <p className="text-sm" style={{ fontSize: '9pt' }}>
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
