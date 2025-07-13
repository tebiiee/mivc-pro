'use client'

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { CVData } from '@/types/cv'
import { CVTemplate } from '@/types/templates'
import { HarvardPDF } from '@/components/templates/HarvardPDF'

interface CVPDFProps {
  data: CVData
  template: CVTemplate
}

// Registrar fuentes (opcional, para mejor tipografía)
// Font.register({
//   family: 'Open Sans',
//   src: 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf'
// })

export function CVPDF({ data, template }: CVPDFProps) {
  // Si es plantilla Harvard, usar el componente específico
  if (template.layout === 'harvard') {
    return <HarvardPDF data={data} template={template} />
  }

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

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: template.colors.background,
      padding: 0,
      fontFamily: 'Helvetica',
    },
    header: {
      backgroundColor: template.colors.primary,
      color: 'white',
      padding: 30,
      marginBottom: 0,
    },
    headerName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    headerSummary: {
      fontSize: 12,
      marginBottom: 15,
      lineHeight: 1.4,
    },
    headerContact: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 15,
      fontSize: 10,
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    content: {
      padding: 30,
      flex: 1,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: template.colors.text,
      borderBottomWidth: 2,
      borderBottomColor: template.colors.primary,
      paddingBottom: 5,
      marginBottom: 15,
    },
    experienceItem: {
      marginBottom: 15,
      paddingLeft: 10,
      borderLeftWidth: 2,
      borderLeftColor: '#E5E7EB',
    },
    experienceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 5,
    },
    experienceTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: template.colors.text,
    },
    experienceCompany: {
      fontSize: 11,
      color: template.colors.primary,
      fontWeight: 'bold',
    },
    experienceDate: {
      fontSize: 9,
      color: '#6B7280',
    },
    experienceDescription: {
      fontSize: 10,
      color: template.colors.text,
      marginBottom: 5,
      lineHeight: 1.3,
    },
    achievementsList: {
      paddingLeft: 10,
    },
    achievement: {
      fontSize: 9,
      color: '#4B5563',
      marginBottom: 2,
      lineHeight: 1.2,
    },
    skillsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    skillCategory: {
      marginBottom: 10,
    },
    skillCategoryTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: template.colors.text,
      marginBottom: 5,
    },
    skillTags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 5,
    },
    skillTag: {
      backgroundColor: `${template.colors.primary}20`,
      color: template.colors.primary,
      padding: '3 8',
      borderRadius: 10,
      fontSize: 8,
    },
    languageItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    languageName: {
      fontSize: 10,
      fontWeight: 'bold',
      color: template.colors.text,
    },
    languageLevel: {
      fontSize: 10,
      color: '#6B7280',
    },
    projectItem: {
      marginBottom: 12,
      paddingLeft: 10,
      borderLeftWidth: 2,
      borderLeftColor: '#E5E7EB',
    },
    projectHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 5,
    },
    projectTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: template.colors.text,
    },
    projectUrl: {
      fontSize: 9,
      color: template.colors.primary,
    },
    projectDate: {
      fontSize: 9,
      color: '#6B7280',
    },
    projectDescription: {
      fontSize: 10,
      color: template.colors.text,
      marginBottom: 5,
      lineHeight: 1.3,
    },
    techTags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 3,
    },
    techTag: {
      backgroundColor: '#F3F4F6',
      color: '#374151',
      padding: '2 6',
      borderRadius: 5,
      fontSize: 8,
    },
    twoColumns: {
      flexDirection: 'row',
      gap: 20,
    },
    column: {
      flex: 1,
    },
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerName}>{personalInfo.fullName}</Text>
          <Text style={styles.headerSummary}>{personalInfo.summary}</Text>
          <View style={styles.headerContact}>
            {personalInfo.email && (
              <View style={styles.contactItem}>
                <Text>{personalInfo.email}</Text>
              </View>
            )}
            {personalInfo.phone && (
              <View style={styles.contactItem}>
                <Text>{personalInfo.phone}</Text>
              </View>
            )}
            {personalInfo.location && (
              <View style={styles.contactItem}>
                <Text>{personalInfo.location}</Text>
              </View>
            )}
            {personalInfo.linkedin && (
              <View style={styles.contactItem}>
                <Text>{personalInfo.linkedin}</Text>
              </View>
            )}
            {personalInfo.website && (
              <View style={styles.contactItem}>
                <Text>{personalInfo.website}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Experience */}
          {sortedExperience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experiencia Profesional</Text>
              {sortedExperience.map((exp) => (
                <View key={exp.id} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <View>
                      <Text style={styles.experienceTitle}>{exp.position}</Text>
                      <Text style={styles.experienceCompany}>{exp.company}</Text>
                    </View>
                    <Text style={styles.experienceDate}>
                      {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
                    </Text>
                  </View>
                  <Text style={styles.experienceDescription}>{exp.description}</Text>
                  {exp.achievements.length > 0 && (
                    <View style={styles.achievementsList}>
                      {exp.achievements.map((achievement, index) => (
                        <Text key={index} style={styles.achievement}>
                          • {achievement}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {sortedEducation.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Educación</Text>
              {sortedEducation.map((edu) => (
                <View key={edu.id} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <View>
                      <Text style={styles.experienceTitle}>{edu.degree}</Text>
                      <Text style={styles.experienceCompany}>{edu.institution}</Text>
                      <Text style={styles.experienceDescription}>{edu.field}</Text>
                    </View>
                    <Text style={styles.experienceDate}>
                      {edu.startDate} - {edu.current ? 'Presente' : edu.endDate}
                    </Text>
                  </View>
                  {edu.gpa && (
                    <Text style={styles.experienceDescription}>GPA: {edu.gpa}</Text>
                  )}
                  {edu.description && (
                    <Text style={styles.experienceDescription}>{edu.description}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Skills and Languages in two columns */}
          <View style={styles.twoColumns}>
            {/* Skills */}
            {skills.length > 0 && (
              <View style={[styles.section, styles.column]}>
                <Text style={styles.sectionTitle}>Habilidades</Text>
                {Object.entries(
                  skills.reduce((acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = []
                    acc[skill.category].push(skill)
                    return acc
                  }, {} as Record<string, typeof skills>)
                ).map(([category, categorySkills]) => (
                  <View key={category} style={styles.skillCategory}>
                    <Text style={styles.skillCategoryTitle}>{category}</Text>
                    <View style={styles.skillTags}>
                      {categorySkills.map((skill) => (
                        <Text key={skill.id} style={styles.skillTag}>
                          {skill.name} ({skill.level})
                        </Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <View style={[styles.section, styles.column]}>
                <Text style={styles.sectionTitle}>Idiomas</Text>
                {languages.map((lang) => (
                  <View key={lang.id} style={styles.languageItem}>
                    <Text style={styles.languageName}>{lang.name}</Text>
                    <Text style={styles.languageLevel}>{lang.level}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Projects */}
          {projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Proyectos</Text>
              {projects.map((project) => (
                <View key={project.id} style={styles.projectItem}>
                  <View style={styles.projectHeader}>
                    <View>
                      <Text style={styles.projectTitle}>{project.name}</Text>
                      {project.url && (
                        <Text style={styles.projectUrl}>{project.url}</Text>
                      )}
                    </View>
                    <Text style={styles.projectDate}>
                      {project.startDate} - {project.endDate || 'Presente'}
                    </Text>
                  </View>
                  <Text style={styles.projectDescription}>{project.description}</Text>
                  <View style={styles.techTags}>
                    {project.technologies.map((tech, index) => (
                      <Text key={index} style={styles.techTag}>
                        {tech}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}
