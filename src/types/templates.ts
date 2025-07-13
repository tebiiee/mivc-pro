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
  layout: 'modern' | 'harvard'
}

export const CV_TEMPLATES: CVTemplate[] = [
  {
    id: 'modern-blue',
    name: 'Moderna',
    description: 'Diseño moderno con acentos azules, ideal para profesionales de tecnología',
    preview: '/templates/modern-blue.png',
    colors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6',
      text: '#1f2937',
      background: '#ffffff'
    },
    layout: 'modern'
  },
  {
    id: 'classic-gray',
    name: 'Moderna Gris',
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
