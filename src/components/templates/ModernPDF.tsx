import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { CVData, LanguageCode } from '@/types/cv'
import { CVTemplate } from '@/types/templates'
import { getTranslations } from '@/lib/translations'

interface ModernPDFProps {
  data: CVData
  template: CVTemplate
  language?: LanguageCode
}

export const ModernPDF: React.FC<ModernPDFProps> = ({ data, template, language = 'spanish' }) => {
  const t = getTranslations(language)

  // Función para traducir categorías de habilidades
  const translateSkillCategory = (category: string): string => {
    const categoryMap: Record<string, keyof typeof t.skillCategories> = {
      'Habilidades Técnicas': 'technical',
      'Technical Skills': 'technical',
      'Habilidades Blandas': 'soft',
      'Soft Skills': 'soft',
      'Herramientas': 'tools',
      'Tools': 'tools'
    }

    const key = categoryMap[category]
    return key ? t.skillCategories[key] : category
  }
  
  // Función helper para ordenamiento
  const getDateForSort = (item: { current?: boolean; endDate?: string; startDate?: string }) => {
    if (item.current) return new Date('9999-12-31')
    if (item.endDate) return new Date(item.endDate)
    if (item.startDate) return new Date(item.startDate)
    return new Date('1900-01-01')
  }

  // Ordenar experiencia laboral por fecha (más reciente primero)
  const sortedWorkExperience = [...(data.experience || [])].sort((a, b) => {
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

  // Ordenar educación por fecha (más reciente primero)
  const sortedEducation = [...(data.education || [])].sort((a, b) => {
    const dateA = getDateForSort(a)
    const dateB = getDateForSort(b)
    return dateB.getTime() - dateA.getTime()
  })

  // Ordenar proyectos por fecha (más reciente primero)
  const sortedProjects = [...(data.projects || [])].sort((a, b) => {
    const dateA = getDateForSort(a)
    const dateB = getDateForSort(b)
    return dateB.getTime() - dateA.getTime()
  })

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

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      fontFamily: 'Helvetica',
      fontSize: 9,
      lineHeight: 1.3,
      padding: '15mm 20mm',
    },
    header: {
      backgroundColor: template.colors.primary,
      color: '#ffffff',
      padding: 15,
      marginBottom: 15,
      borderRadius: 4,
    },
    headerName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    headerContact: {
      fontSize: 9,
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
      marginBottom: 3,
    },
    section: {
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: template.colors.primary,
      marginBottom: 6,
      paddingBottom: 2,
      borderBottomWidth: 1,
      borderBottomColor: template.colors.primary,
    },
    subsection: {
      marginBottom: 8,
      paddingLeft: 8,
      borderLeftWidth: 2,
      borderLeftColor: '#e5e7eb',
    },
    jobTitle: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 2,
    },
    company: {
      fontSize: 9,
      fontWeight: 'bold',
      color: template.colors.primary,
      marginBottom: 2,
    },
    dateRange: {
      fontSize: 8,
      color: '#6b7280',
      marginBottom: 4,
    },
    description: {
      fontSize: 8,
      color: '#374151',
      marginBottom: 4,
      textAlign: 'justify',
    },
    achievement: {
      fontSize: 8,
      color: '#374151',
      marginBottom: 2,
      marginLeft: 10,
    },
    skillsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    skillCategory: {
      marginBottom: 6,
    },
    skillCategoryTitle: {
      fontSize: 9,
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 3,
    },
    skillTags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 4,
    },
    skillTag: {
      backgroundColor: `${template.colors.primary}20`,
      color: template.colors.primary,
      padding: '2 6',
      borderRadius: 8,
      fontSize: 7,
    },
    languageItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 3,
    },
    languageName: {
      fontSize: 9,
      fontWeight: 'bold',
      color: '#111827',
    },
    languageLevel: {
      fontSize: 8,
      color: '#6b7280',
    },
    projectTech: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 3,
      marginTop: 3,
    },
    techTag: {
      backgroundColor: `${template.colors.secondary}20`,
      color: template.colors.secondary,
      padding: '1 4',
      borderRadius: 6,
      fontSize: 6,
    },
    twoColumns: {
      flexDirection: 'row',
      gap: 15,
    },
    leftColumn: {
      flex: 1,
    },
    rightColumn: {
      flex: 1,
    },
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerName}>{data.personalInfo.fullName}</Text>
          <View style={styles.headerContact}>
            {data.personalInfo.location && (
              <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
            )}
            {data.personalInfo.phone && (
              <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
            )}
            {data.personalInfo.email && (
              <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
            )}
            {data.personalInfo.linkedin && (
              <Text style={styles.contactItem}>{data.personalInfo.linkedin}</Text>
            )}
            {data.personalInfo.website && (
              <Text style={styles.contactItem}>{data.personalInfo.website}</Text>
            )}
          </View>
        </View>

        {/* Perfil Profesional */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.sections.professionalProfile}</Text>
            <Text style={styles.description}>{data.summary}</Text>
          </View>
        )}

        {/* Experiencia */}
        {sortedWorkExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.sections.experience}</Text>
            {sortedWorkExperience.map((exp, index) => (
              <View key={index} style={styles.subsection}>
                <Text style={styles.jobTitle}>{exp.position}</Text>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.dateRange}>
                  {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                </Text>
                {exp.description && (
                  <Text style={styles.description}>{exp.description}</Text>
                )}
                {exp.achievements && exp.achievements.map((achievement, idx) => (
                  <Text key={idx} style={styles.achievement}>• {achievement}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Educación */}
        {sortedEducation.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.sections.education}</Text>
            {sortedEducation.map((edu, index) => (
              <View key={index} style={styles.subsection}>
                <Text style={styles.jobTitle}>{edu.degree}</Text>
                <Text style={styles.company}>{edu.institution}</Text>
                <Text style={styles.dateRange}>
                  {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                </Text>
                {edu.details && (
                  <Text style={styles.description}>{edu.details}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Habilidades e Idiomas en dos columnas */}
        <View style={styles.twoColumns}>
          {/* Habilidades */}
          {data.skills && data.skills.length > 0 && (
            <View style={[styles.section, styles.leftColumn]}>
              <Text style={styles.sectionTitle}>{t.sections.skills}</Text>
              {Object.entries(
                data.skills.reduce((acc, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = []
                  acc[skill.category].push(skill)
                  return acc
                }, {} as Record<string, typeof data.skills>)
              ).map(([category, categorySkills]) => (
                <View key={category} style={styles.skillCategory}>
                  <Text style={styles.skillCategoryTitle}>{translateSkillCategory(category)}</Text>
                  <View style={styles.skillTags}>
                    {categorySkills.map((skill, index) => (
                      <Text key={index} style={styles.skillTag}>
                        {skill.name} ({skill.level})
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Idiomas */}
          {data.languages && data.languages.length > 0 && (
            <View style={[styles.section, styles.rightColumn]}>
              <Text style={styles.sectionTitle}>{t.sections.languages}</Text>
              {data.languages.map((language, index) => (
                <View key={index} style={styles.languageItem}>
                  <Text style={styles.languageName}>{language.name}</Text>
                  <Text style={styles.languageLevel}>{language.level}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Proyectos */}
        {sortedProjects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.sections.projects}</Text>
            {sortedProjects.map((project, index) => (
              <View key={index} style={styles.subsection}>
                <Text style={styles.jobTitle}>{project.name}</Text>
                {project.url && (
                  <Text style={styles.company}>{project.url}</Text>
                )}
                <Text style={styles.dateRange}>
                  {project.startDate} - {project.endDate || t.common.present}
                </Text>
                <Text style={styles.description}>{project.description}</Text>
                {project.technologies && project.technologies.length > 0 && (
                  <View style={styles.projectTech}>
                    {project.technologies.map((tech, idx) => (
                      <Text key={idx} style={styles.techTag}>{tech}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
}
