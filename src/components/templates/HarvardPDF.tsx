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
      padding: '20mm 25mm',
      fontFamily: 'Times-Roman',
      fontSize: 11,
      lineHeight: 1.3,
    },
    header: {
      textAlign: 'center',
      marginBottom: 24,
    },
    headerName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      fontFamily: 'Times-Bold',
    },
    headerContact: {
      fontSize: 10,
      color: '#000000',
    },
    separator: {
      borderBottomWidth: 2,
      borderBottomColor: '#000000',
      marginBottom: 16,
    },
    summary: {
      fontSize: 11,
      fontStyle: 'italic',
      textAlign: 'justify',
      marginBottom: 24,
      fontFamily: 'Times-Italic',
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 12,
      fontFamily: 'Times-Bold',
    },
    sectionSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: '#000000',
      marginBottom: 12,
    },
    experienceItem: {
      marginBottom: 16,
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
      fontSize: 10,
    },
    companyName: {
      fontSize: 11,
      fontWeight: 'bold',
      fontFamily: 'Times-Bold',
    },
    position: {
      fontSize: 11,
      fontWeight: 'normal',
      fontFamily: 'Times-Roman',
    },
    location: {
      fontSize: 10,
      fontWeight: 'normal',
    },
    dateRange: {
      fontSize: 10,
      fontStyle: 'italic',
      fontFamily: 'Times-Italic',
    },
    responsibilities: {
      marginTop: 8,
      marginLeft: 24,
    },
    responsibility: {
      fontSize: 10,
      marginBottom: 4,
      textAlign: 'justify',
    },
    educationItem: {
      marginBottom: 12,
    },
    educationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    institutionName: {
      fontSize: 11,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontFamily: 'Times-Bold',
    },
    degree: {
      fontSize: 11,
      fontFamily: 'Times-Roman',
    },
    details: {
      fontSize: 10,
      fontStyle: 'italic',
      fontFamily: 'Times-Italic',
    },
    skillsSection: {
      marginBottom: 16,
    },
    skillsList: {
      marginLeft: 24,
    },
    skill: {
      fontSize: 10,
      marginBottom: 4,
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
                
                {(job.responsibilities || job.achievements) && (
                  <View style={styles.responsibilities}>
                    {(job.responsibilities || job.achievements || []).map((item, idx) => (
                      <Text key={idx} style={styles.responsibility}>
                        • {item}
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
      </Page>
    </Document>
  )
}
