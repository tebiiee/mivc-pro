'use client'

import { Document, Page, Text, View } from '@react-pdf/renderer'
import { CVData, LanguageCode } from '@/types/cv'
import { CVTemplate } from '@/types/templates'
import { HarvardPDF } from '@/components/templates/HarvardPDF'
import { ProfessionalPDF } from '@/components/templates/ProfessionalPDF'
import { ModernPDF } from '@/components/templates/ModernPDF'

interface CVPDFProps {
  data: CVData
  template: CVTemplate
  language?: LanguageCode
}

export function CVPDF({ data, template, language = 'spanish' }: CVPDFProps) {
  // Si es plantilla Harvard, usar el componente específico
  if (template.layout === 'harvard') {
    return <HarvardPDF data={data} template={template} language={language} />
  }

  // Si es plantilla Professional, usar el componente específico
  if (template.layout === 'professional') {
    return <ProfessionalPDF data={data} template={template} language={language} />
  }

  // Si es plantilla Modern, usar el componente específico
  if (template.layout === 'modern') {
    return <ModernPDF data={data} template={template} language={language} />
  }

  // Fallback simple para plantillas no específicas (no debería llegar aquí)
  console.warn('Using fallback PDF template for layout:', template.layout)

  return (
    <Document>
      <Page size="A4" style={{ padding: 30, fontFamily: 'Helvetica' }}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
            {data.personalInfo.fullName}
          </Text>
          <Text style={{ fontSize: 12, color: '#666' }}>
            Plantilla no encontrada: {template.layout}
          </Text>
        </View>
      </Page>
    </Document>
  )
}