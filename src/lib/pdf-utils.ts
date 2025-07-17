import { pdf } from '@react-pdf/renderer'
import { CVData, BilingualCVResponse } from '@/types/cv'
import { CVTemplate } from '@/types/templates'
import { CVPDF } from '@/components/cv-pdf'
import { convertAIDataToCVData } from './cv-converter'

export async function generateAndDownloadPDF(data: CVData, template: CVTemplate) {
  try {
    // Generar el PDF
    const pdfBlob = await pdf(CVPDF({ data, template })).toBlob()
    
    // Crear URL para descarga
    const url = URL.createObjectURL(pdfBlob)
    
    // Crear elemento de descarga
    const link = document.createElement('a')
    link.href = url
    // Sanitizar el nombre del archivo removiendo caracteres especiales
    const sanitizedName = data.personalInfo.fullName
      .replace(/[^a-zA-Z0-9\s]/g, '') // Remover caracteres especiales
      .replace(/\s+/g, '_') // Reemplazar espacios con guiones bajos
      .trim() // Remover espacios al inicio y final
    link.download = `CV_${sanitizedName || 'documento'}.pdf`
    
    // Simular click para descargar
    document.body.appendChild(link)
    link.click()
    
    // Limpiar
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    return true
  } catch (error) {
    console.error('Error generando PDF:', error)
    return false
  }
}

export async function generateAndDownloadBilingualPDF(
  bilingualData: BilingualCVResponse,
  template: CVTemplate
) {
  try {
    // Convertir datos de IA a formato CVData para ambos idiomas
    const spanishData = convertAIDataToCVData(bilingualData.spanish)
    const englishData = convertAIDataToCVData(bilingualData.english)

    // Sanitizar el nombre del archivo
    const sanitizedName = spanishData.personalInfo.fullName
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '_')
      .trim()

    // Generar PDF en español
    const spanishPdfBlob = await pdf(CVPDF({ data: spanishData, template })).toBlob()
    const spanishUrl = URL.createObjectURL(spanishPdfBlob)

    // Generar PDF en inglés
    const englishPdfBlob = await pdf(CVPDF({ data: englishData, template })).toBlob()
    const englishUrl = URL.createObjectURL(englishPdfBlob)

    // Descargar PDF en español
    const spanishLink = document.createElement('a')
    spanishLink.href = spanishUrl
    spanishLink.download = `CV_${sanitizedName || 'documento'}_ES.pdf`
    document.body.appendChild(spanishLink)
    spanishLink.click()

    // Pequeña pausa entre descargas
    await new Promise(resolve => setTimeout(resolve, 500))

    // Descargar PDF en inglés
    const englishLink = document.createElement('a')
    englishLink.href = englishUrl
    englishLink.download = `CV_${sanitizedName || 'documento'}_EN.pdf`
    document.body.appendChild(englishLink)
    englishLink.click()

    // Limpiar
    document.body.removeChild(spanishLink)
    document.body.removeChild(englishLink)
    URL.revokeObjectURL(spanishUrl)
    URL.revokeObjectURL(englishUrl)

    return true
  } catch (error) {
    console.error('Error generando PDFs bilingües:', error)
    return false
  }
}
