import { CVData, LanguageCode } from '@/types/cv'
import { CVTemplate } from '@/types/templates'
import { Button } from '@/components/ui/button'
import { Download, Mail, Phone, MapPin, Globe, Linkedin, Palette, Home } from 'lucide-react'
import { HarvardTemplate } from '@/components/templates/HarvardTemplate'
import { ProfessionalTemplate } from '@/components/templates/ProfessionalTemplate'
import { LanguageToggle } from '@/components/LanguageToggle'
import { getTranslations } from '@/lib/translations'

interface CVPreviewProps {
  data: CVData
  template: CVTemplate
  language?: LanguageCode
  onDownload: () => void
  onEdit: () => void
  onChangeTemplate: () => void
  onHome: () => void
  showLanguageToggle?: boolean
  currentLanguage?: LanguageCode
  onLanguageChange?: (language: LanguageCode) => void
  isBilingual?: boolean
}

export function CVPreview({
  data,
  template,
  language = 'spanish',
  onDownload,
  onEdit,
  onChangeTemplate,
  onHome,
  showLanguageToggle = false,
  currentLanguage = 'spanish',
  onLanguageChange,
  isBilingual = false
}: CVPreviewProps) {
  const { personalInfo, experience, education, skills, languages, projects } = data
  const t = getTranslations(language)

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
    <div className="w-full max-w-7xl mx-auto space-y-8 px-4">
      {/* Header elegante con título */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Vista previa de tu CV</h2>
        <p className="text-gray-600 text-sm sm:text-base">Tu currículum está listo. Revisa, personaliza y descarga.</p>
      </div>

      {/* Panel de control organizado */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col gap-6">

          {/* Language Toggle - Solo mostrar si hay datos bilingües */}
          {showLanguageToggle && onLanguageChange && (
            <div className="flex justify-center">
              <LanguageToggle
                currentLanguage={currentLanguage}
                onLanguageChange={onLanguageChange}
              />
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Grupo de navegación */}
            <div className="flex flex-col sm:flex-row gap-3 order-2 lg:order-1">
              <Button
                variant="outline"
                onClick={onHome}
                className="gap-2 text-sm hover:bg-gray-50 border-gray-300"
              >
                <Home className="h-4 w-4" />
                {t.buttons.backToHome}
              </Button>
              <Button
                variant="outline"
                onClick={onEdit}
                className="gap-2 text-sm hover:bg-gray-50 border-gray-300"
              >
                {t.buttons.editInfo}
              </Button>
            </div>

            {/* Grupo de personalización */}
            <div className="flex flex-col sm:flex-row gap-3 order-1 lg:order-2">
              <Button
                variant="outline"
                onClick={onChangeTemplate}
                className="gap-2 text-sm hover:bg-blue-50 border-blue-300 text-blue-700"
              >
                <Palette className="h-4 w-4" />
                {t.buttons.changeTemplate}
              </Button>
              <Button
                onClick={onDownload}
                className="gap-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
              >
                <Download className="h-4 w-4" />
                {isBilingual ? t.buttons.downloadBilingualPDF : t.buttons.downloadPDF}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CV Preview - Optimizado para móviles */}
      <div className="w-full px-2 sm:px-4 lg:flex lg:justify-center">
        {template.layout === 'harvard' ? (
          <div className="w-full lg:max-w-[280mm] min-h-screen sm:min-h-[396mm] shadow-lg">
            <HarvardTemplate data={data} template={template} language={language} />
          </div>
        ) : template.layout === 'professional' ? (
          <div className="w-full lg:max-w-[280mm] min-h-screen sm:min-h-[396mm] shadow-lg">
            <ProfessionalTemplate data={data} template={template} language={language} />
          </div>
        ) : (
          <div className="w-full lg:max-w-[280mm] min-h-screen sm:min-h-[396mm] bg-white shadow-lg rounded-lg overflow-hidden" id="cv-content">
          {/* Header del CV */}
          <div
            className="text-white p-3 sm:p-4 md:p-6 lg:p-8"
            style={{
              background: `linear-gradient(135deg, ${template.colors.primary} 0%, ${template.colors.secondary} 100%)`
            }}
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-white">{personalInfo.fullName}</h1>

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
          {projects.length > 0 && (
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
