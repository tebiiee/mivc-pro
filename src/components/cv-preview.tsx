import { CVData } from '@/types/cv'
import { CVTemplate } from '@/types/templates'
import { Button } from '@/components/ui/button'
import { Download, Mail, Phone, MapPin, Globe, Linkedin, Palette, Home } from 'lucide-react'
import { HarvardTemplate } from '@/components/templates/HarvardTemplate'

interface CVPreviewProps {
  data: CVData
  template: CVTemplate
  onDownload: () => void
  onEdit: () => void
  onChangeTemplate: () => void
  onHome: () => void
}

export function CVPreview({ data, template, onDownload, onEdit, onChangeTemplate, onHome }: CVPreviewProps) {
  const { personalInfo, experience, education, skills, languages, projects } = data

  // Ordenar experiencia y educación por fecha (más reciente primero)
  const sortedExperience = [...experience].sort((a, b) => {
    const dateA = new Date(a.endDate || '9999-12-31')
    const dateB = new Date(b.endDate || '9999-12-31')
    return dateB.getTime() - dateA.getTime()
  })

  const sortedEducation = [...education].sort((a, b) => {
    const dateA = new Date(a.endDate || '9999-12-31')
    const dateB = new Date(b.endDate || '9999-12-31')
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <div className="max-w-6xl mx-auto space-y-6 px-4">
      {/* Header con botones de acción */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Vista previa de tu CV</h2>
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-end">
          <Button variant="outline" onClick={onHome} className="gap-2 text-xs sm:text-sm">
            <Home className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Volver al inicio</span>
            <span className="sm:hidden">Inicio</span>
          </Button>
          <Button variant="outline" onClick={onChangeTemplate} className="gap-2 text-xs sm:text-sm">
            <Palette className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Cambiar plantilla</span>
            <span className="sm:hidden">Plantilla</span>
          </Button>
          <Button variant="outline" onClick={onEdit} className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Editar información</span>
            <span className="sm:hidden">Editar</span>
          </Button>
          <Button onClick={onDownload} className="gap-2 text-xs sm:text-sm">
            <Download className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Descargar PDF</span>
            <span className="sm:hidden">PDF</span>
          </Button>
        </div>
      </div>

      {/* CV Preview - Optimizado para móviles */}
      <div className="flex justify-center">
        {template.layout === 'harvard' ? (
          <div className="w-full max-w-[210mm] min-h-[297mm]">
            <HarvardTemplate data={data} template={template} />
          </div>
        ) : (
          <div className="w-full max-w-[210mm] min-h-[297mm] bg-white shadow-lg rounded-lg overflow-hidden" id="cv-content">
          {/* Header del CV */}
          <div
            className="text-white p-4 sm:p-6 md:p-8"
            style={{
              background: `linear-gradient(135deg, ${template.colors.primary} 0%, ${template.colors.secondary} 100%)`
            }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white">{personalInfo.fullName}</h1>
            <p className="text-white/95 text-base sm:text-lg mb-4">{personalInfo.summary}</p>

          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-white/95">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

          <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8">
            {/* Experiencia */}
            {sortedExperience.length > 0 && (
              <section>
                <h2
                  className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 pb-2 text-gray-900"
                  style={{
                    borderBottom: `2px solid ${template.colors.primary}`
                  }}
                >
                  Experiencia Profesional
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
                          {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
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
                  className="text-xl font-bold mb-4 pb-2 text-gray-900"
                  style={{
                    borderBottom: `2px solid ${template.colors.primary}`
                  }}
                >
                  Educación
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
                          <p className="text-gray-600">{edu.field}</p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {edu.startDate} - {edu.current ? 'Presente' : edu.endDate}
                        </span>
                      </div>
                      {edu.gpa && (
                        <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                      )}
                      {edu.description && (
                        <p className="text-gray-700 text-sm mt-1">{edu.description}</p>
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
                  className="text-xl font-bold mb-4 pb-2 text-gray-900"
                  style={{
                    borderBottom: `2px solid ${template.colors.primary}`
                  }}
                >
                  Habilidades
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
                      <h3 className="font-medium text-gray-900 mb-2">{category}</h3>
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
                  Idiomas
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
          {projects.length > 0 && (
            <section>
              <h2
                className="text-xl font-bold mb-4 pb-2 text-gray-900"
                style={{
                  borderBottom: `2px solid ${template.colors.primary}`
                }}
              >
                Proyectos
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{project.name}</h3>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline text-sm"
                            style={{ color: template.colors.primary }}
                          >
                            {project.url}
                          </a>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {project.startDate} - {project.endDate || 'Presente'}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              </section>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  )
}
