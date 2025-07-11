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
  layout: 'modern' | 'classic' | 'creative' | 'minimal'
}

export const CV_TEMPLATES: CVTemplate[] = [
  {
    id: 'modern-blue',
    name: 'Moderno Azul',
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
    name: 'Clásico Gris',
    description: 'Diseño tradicional y elegante, perfecto para cualquier industria',
    preview: '/templates/classic-gray.png',
    colors: {
      primary: '#374151',
      secondary: '#4b5563',
      accent: '#6b7280',
      text: '#111827',
      background: '#ffffff'
    },
    layout: 'classic'
  },
  {
    id: 'creative-green',
    name: 'Creativo Verde',
    description: 'Diseño fresco y creativo, ideal para profesionales creativos',
    preview: '/templates/creative-green.png',
    colors: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#10b981',
      text: '#1f2937',
      background: '#ffffff'
    },
    layout: 'creative'
  },
  {
    id: 'minimal-black',
    name: 'Minimalista Negro',
    description: 'Diseño limpio y minimalista, enfoque en el contenido',
    preview: '/templates/minimal-black.png',
    colors: {
      primary: '#000000',
      secondary: '#374151',
      accent: '#6b7280',
      text: '#111827',
      background: '#ffffff'
    },
    layout: 'minimal'
  }
]
