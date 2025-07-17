export interface CVTemplate {
  id: string
  name: string
  description: string
  preview: string
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
  }
  layout: 'modern' | 'harvard' | 'professional'
}

export const CV_TEMPLATES: CVTemplate[] = [
  {
    id: 'professional',
    name: 'Profesional',
    description: 'Diseño profesional de dos columnas con sidebar azul, ideal para cualquier sector',
    preview: '/templates/professional.png',
    colors: {
      primary: '#1e3a8a',
      secondary: '#3b82f6',
      accent: '#60a5fa',
      text: '#1f2937',
      background: '#ffffff'
    },
    layout: 'professional'
  },
  {
    id: 'classic-gray',
    name: 'Moderna',
    description: 'Diseño moderno en tonos grises, elegante y profesional',
    preview: '/templates/classic-gray.png',
    colors: {
      primary: '#374151',
      secondary: '#4b5563',
      accent: '#6b7280',
      text: '#111827',
      background: '#ffffff'
    },
    layout: 'modern'
  },
  {
    id: 'harvard',
    name: 'Harvard',
    description: 'Formato académico tradicional, inspirado en universidades de élite',
    preview: '/templates/harvard.png',
    colors: {
      primary: '#000000',
      secondary: '#333333',
      accent: '#666666',
      text: '#000000',
      background: '#ffffff'
    },
    layout: 'harvard'
  }
]
