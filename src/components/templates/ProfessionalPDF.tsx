import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { CVData } from '@/types/cv'
import { CVTemplate } from '@/types/templates'

interface ProfessionalPDFProps {
  data: CVData
  template: CVTemplate
}

export const ProfessionalPDF: React.FC<ProfessionalPDFProps> = ({ data, template }) => {
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

  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long' 
    })
  }

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = formatDate(startDate)
    const end = endDate ? formatDate(endDate) : 'Presente'
    return `${start} - ${end}`
  }

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      fontFamily: 'Helvetica',
      fontSize: 9,
      lineHeight: 1.3,
    },
    leftColumn: {
      flex: 2,
      padding: 20,
      paddingRight: 15,
    },
    rightColumn: {
      flex: 1,
      backgroundColor: template.colors.primary,
      padding: 20,
      paddingLeft: 15,
      color: '#ffffff',
    },
    header: {
      marginBottom: 20,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 8,
      paddingBottom: 3,
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
    },
    sectionTitleWhite: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: 8,
      paddingBottom: 3,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    },
    sectionContent: {
      marginBottom: 15,
    },
    jobTitle: {
      fontSize: 9,
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 2,
    },
    jobLocation: {
      fontSize: 8,
      color: '#6b7280',
      marginBottom: 2,
    },
    jobDate: {
      fontSize: 8,
      color: '#6b7280',
      marginBottom: 5,
    },
    bulletPoint: {
      fontSize: 8,
      color: '#374151',
      marginBottom: 2,
      paddingLeft: 10,
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      fontSize: 8,
    },
    contactText: {
      marginLeft: 8,
      color: '#ffffff',
      flex: 1,
    },
    skillItem: {
      marginBottom: 8,
    },
    skillName: {
      fontSize: 8,
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: 2,
    },
    skillLevel: {
      fontSize: 7,
      color: 'rgba(255, 255, 255, 0.8)',
    },
    skillBar: {
      width: '100%',
      height: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      marginTop: 2,
    },
    skillProgress: {
      height: 4,
      backgroundColor: '#ffffff',
    },
    languageItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },
    languageName: {
      fontSize: 8,
      color: '#ffffff',
    },
    languageLevel: {
      fontSize: 7,
      color: 'rgba(255, 255, 255, 0.8)',
    },
    profileText: {
      fontSize: 8,
      color: '#374151',
      lineHeight: 1.4,
      textAlign: 'justify',
    },
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Columna Izquierda */}
        <View style={styles.leftColumn}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          </View>

          {/* Perfil Profesional */}
          {data.summary && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>Perfil Profesional</Text>
              <Text style={styles.profileText}>{data.summary}</Text>
            </View>
          )}

          {/* Experiencia Laboral */}
          {sortedWorkExperience.length > 0 && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>Experiencia Laboral</Text>
              {sortedWorkExperience.map((exp, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text style={styles.jobTitle}>
                    {exp.position}, {exp.company}
                  </Text>
                  {exp.location && (
                    <Text style={styles.jobLocation}>{exp.location}</Text>
                  )}
                  <Text style={styles.jobDate}>
                    {formatDateRange(exp.startDate, exp.endDate)}
                  </Text>
                  {exp.description && (
                    <Text style={[styles.bulletPoint, { marginBottom: 4 }]}>
                      {exp.description}
                    </Text>
                  )}
                  {exp.achievements && exp.achievements.slice(0, 4).map((achievement, i) => (
                    <Text key={i} style={styles.bulletPoint}>
                      • {achievement}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Educación */}
          {sortedEducation.length > 0 && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>Educación</Text>
              {sortedEducation.map((edu, index) => (
                <View key={index} style={{ marginBottom: 8 }}>
                  <Text style={styles.jobTitle}>
                    {edu.degree}, {edu.institution}
                  </Text>
                  {edu.location && (
                    <Text style={styles.jobLocation}>{edu.location}</Text>
                  )}
                  <Text style={styles.jobDate}>
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </Text>
                  {edu.details && (
                    <Text style={styles.bulletPoint}>{edu.details}</Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Columna Derecha */}
        <View style={styles.rightColumn}>
          {/* Contacto */}
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitleWhite}>Contacto</Text>
            {data.personalInfo.location && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>{data.personalInfo.location}</Text>
              </View>
            )}
            {data.personalInfo.phone && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>{data.personalInfo.phone}</Text>
              </View>
            )}
            {data.personalInfo.email && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>{data.personalInfo.email}</Text>
              </View>
            )}
            {data.personalInfo.linkedin && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>{data.personalInfo.linkedin}</Text>
              </View>
            )}
          </View>

          {/* Habilidades */}
          {data.skills && data.skills.length > 0 && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitleWhite}>Habilidades</Text>
              {data.skills.slice(0, 8).map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.skillName}>{skill.name}</Text>
                    <Text style={styles.skillLevel}>{skill.level}</Text>
                  </View>
                  <View style={styles.skillBar}>
                    <View 
                      style={[
                        styles.skillProgress,
                        { 
                          width: skill.level === 'Experto' ? '100%' : 
                                 skill.level === 'Avanzado' ? '80%' : 
                                 skill.level === 'Intermedio' ? '60%' : '40%' 
                        }
                      ]} 
                    />
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Idiomas */}
          {data.languages && data.languages.length > 0 && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitleWhite}>Idiomas</Text>
              {data.languages.map((language, index) => (
                <View key={index} style={styles.languageItem}>
                  <Text style={styles.languageName}>{language.name}</Text>
                  <Text style={styles.languageLevel}>{language.level}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}
