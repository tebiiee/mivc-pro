import { pdf } from '@react-pdf/renderer'
import { CVData } from '@/types/cv'
import { CVTemplate } from '@/types/templates'
import { CVPDF } from '@/components/cv-pdf'

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
