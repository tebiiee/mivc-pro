'use client'

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { CVData } from '@/types/cv'
import { CVTemplate } from '@/types/templates'

interface HarvardPDFProps {
  data: CVData
  template: CVTemplate
}

export function HarvardPDF({ data }: HarvardPDFProps) {
  // Ordenar experiencia laboral por fecha (más reciente primero)
  const sortedWorkExperience = [...(data.workExperience || data.experience || [])].sort((a, b) => {
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

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      padding: '15mm 20mm',
      fontFamily: 'Helvetica',
      fontSize: 9,
      lineHeight: 1.2,
    },
    header: {
      textAlign: 'center',
      marginBottom: 16,
    },
    headerName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 6,
      fontFamily: 'Helvetica-Bold',
    },
    headerContact: {
      fontSize: 9,
      color: '#000000',
    },
    separator: {
      borderBottomWidth: 2,
      borderBottomColor: '#000000',
      marginBottom: 12,
    },
    summary: {
      fontSize: 9,
      fontStyle: 'italic',
      textAlign: 'justify',
      marginBottom: 16,
      fontFamily: 'Helvetica',
    },
    sectionTitle: {
      fontSize: 10,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 8,
      fontFamily: 'Helvetica-Bold',
    },
    sectionSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: '#000000',
      marginBottom: 8,
    },
    experienceItem: {
      marginBottom: 10,
    },
    experienceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 4,
    },
    experienceLeft: {
      flex: 1,
    },
    experienceRight: {
      textAlign: 'right',
      fontSize: 8,
    },
    companyName: {
      fontSize: 9,
      fontWeight: 'bold',
      fontFamily: 'Helvetica-Bold',
    },
    position: {
      fontSize: 9,
      fontWeight: 'normal',
      fontFamily: 'Helvetica',
    },
    location: {
      fontSize: 8,
      fontWeight: 'normal',
    },
    dateRange: {
      fontSize: 8,
      fontStyle: 'italic',
      fontFamily: 'Helvetica',
    },
    responsibilities: {
      marginTop: 4,
      marginLeft: 16,
    },
    responsibility: {
      fontSize: 8,
      marginBottom: 2,
      textAlign: 'justify',
    },
    educationItem: {
      marginBottom: 8,
    },
    educationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    institutionName: {
      fontSize: 9,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontFamily: 'Helvetica-Bold',
    },
    degree: {
      fontSize: 9,
      fontFamily: 'Helvetica',
    },
    details: {
      fontSize: 8,
      fontStyle: 'italic',
      fontFamily: 'Helvetica',
    },
    skillsSection: {
      marginBottom: 10,
    },
    skillsList: {
      marginLeft: 16,
    },
    skill: {
      fontSize: 8,
      marginBottom: 2,
      textAlign: 'justify',
    },
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerName}>{data.personalInfo.fullName}</Text>
          <Text style={styles.headerContact}>
            {[
              data.personalInfo.location,
              data.personalInfo.linkedin,
              data.personalInfo.phone,
              data.personalInfo.email
            ].filter(Boolean).join(' • ')}
          </Text>
        </View>

        {/* Línea separadora */}
        <View style={styles.separator} />

        {/* Resumen profesional */}
        {data.summary && (
          <Text style={styles.summary}>{data.summary}</Text>
        )}

        {/* Experiencia Profesional */}
        {sortedWorkExperience.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>EXPERIENCIA PROFESIONAL</Text>
            <View style={styles.sectionSeparator} />
            
            {sortedWorkExperience.map((job, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View style={styles.experienceLeft}>
                    <Text style={styles.companyName}>{job.company}</Text>
                    <Text style={styles.position}>{job.position}</Text>
                  </View>
                  <View style={styles.experienceRight}>
                    <Text style={styles.location}>{job.location}</Text>
                    <Text style={styles.dateRange}>
                      {formatDateRange(job.startDate, job.endDate)}
                    </Text>
                  </View>
                </View>
                
                {job.description && (
                  <Text style={[styles.responsibility, { marginTop: 4, marginLeft: 0 }]}>
                    {job.description}
                  </Text>
                )}
                {job.achievements && job.achievements.length > 0 && (
                  <View style={styles.responsibilities}>
                    {job.achievements.map((achievement, idx) => (
                      <Text key={idx} style={styles.responsibility}>
                        • {achievement}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Educación */}
        {sortedEducation.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>EDUCACIÓN</Text>
            <View style={styles.sectionSeparator} />
            
            {sortedEducation.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <View style={styles.experienceLeft}>
                    <Text style={styles.institutionName}>{edu.institution}</Text>
                    <Text style={styles.degree}>{edu.degree}</Text>
                    {edu.details && (
                      <Text style={styles.details}>{edu.details}</Text>
                    )}
                  </View>
                  <View style={styles.experienceRight}>
                    <Text style={styles.location}>{edu.location}</Text>
                    <Text style={styles.dateRange}>{formatDate(edu.endDate)}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills Adicionales */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.skillsSection}>
            <Text style={styles.sectionTitle}>SKILLS ADICIONALES</Text>
            <View style={styles.sectionSeparator} />

            <View style={styles.skillsList}>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  • {typeof skill === 'string' ? skill : skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Idiomas */}
        {data.languages && data.languages.length > 0 && (
          <View style={styles.skillsSection}>
            <Text style={styles.sectionTitle}>IDIOMAS</Text>
            <View style={styles.sectionSeparator} />

            <View style={styles.skillsList}>
              {data.languages.map((language, index) => (
                <Text key={index} style={styles.skill}>
                  • {language.name} - {language.level}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Proyectos */}
        {data.projects && data.projects.length > 0 && (
          <View style={styles.skillsSection}>
            <Text style={styles.sectionTitle}>PROYECTOS</Text>
            <View style={styles.sectionSeparator} />

            {data.projects.map((project, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View style={styles.experienceLeft}>
                    <Text style={styles.companyName}>{project.name}</Text>
                    {project.url && (
                      <Text style={styles.details}>{project.url}</Text>
                    )}
                  </View>
                  <View style={styles.experienceRight}>
                    <Text style={styles.dateRange}>
                      {formatDateRange(project.startDate, project.endDate || '')}
                    </Text>
                  </View>
                </View>
                <Text style={styles.responsibility}>{project.description}</Text>
                {project.technologies && project.technologies.length > 0 && (
                  <Text style={styles.details}>
                    Tecnologías: {project.technologies.join(', ')}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
}
