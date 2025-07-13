# micv.pro - Generador de CV Profesional con IA

## 📋 Descripción General

**micv.pro** es una aplicación web moderna que permite a los usuarios crear CVs profesionales de alta calidad utilizando inteligencia artificial. La aplicación procesa descripciones en lenguaje natural y las convierte automáticamente en CVs estructurados y optimizados para ATS (Applicant Tracking Systems).

### 🎯 Características Principales

- **100% Gratuito y Privado**: No requiere registro, no almacena datos
- **Procesamiento con IA**: Convierte texto natural en CV estructurado
- **Múltiples Plantillas**: 3 plantillas profesionales optimizadas
- **Generación PDF**: Descarga instantánea en formato PDF
- **Interfaz en Español**: Completamente localizada
- **Responsive Design**: Funciona en desktop y móvil
- **Optimización ATS**: CVs optimizados para sistemas de seguimiento

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15**: Framework React con App Router
- **React 19**: Biblioteca de interfaz de usuario
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de estilos utilitarios
- **Lucide React**: Biblioteca de iconos

### Backend/API
- **Next.js API Routes**: Endpoints serverless
- **OpenRouter API**: Proxy para modelos de IA
- **Google Gemini 2.0 Flash**: Modelo de IA para procesamiento

### Generación PDF
- **@react-pdf/renderer**: Generación de PDFs en React
- **Helvetica**: Fuente estándar para compatibilidad

### Herramientas de Desarrollo
- **ESLint**: Linting de código
- **Vercel**: Plataforma de despliegue
- **Git**: Control de versiones

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   │   └── generate-cv/   # Endpoint de generación de CV
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── templates/         # Plantillas de CV
│   │   ├── HarvardTemplate.tsx    # Plantilla Harvard (web)
│   │   ├── HarvardPDF.tsx         # Plantilla Harvard (PDF)
│   │   ├── ModernTemplate.tsx     # Plantilla Moderna (web)
│   │   └── ModernPDF.tsx          # Plantilla Moderna (PDF)
│   ├── ui/                # Componentes UI base
│   ├── cv-form.tsx        # Formulario de entrada
│   ├── cv-pdf.tsx         # Wrapper para PDFs
│   ├── cv-preview.tsx     # Vista previa del CV
│   └── template-selector.tsx # Selector de plantillas
├── lib/                   # Utilidades
│   ├── pdf-utils.ts       # Funciones de generación PDF
│   └── utils.ts           # Utilidades generales
└── types/                 # Definiciones TypeScript
    ├── cv.ts              # Tipos de datos del CV
    └── templates.ts       # Tipos de plantillas
```

## 🤖 Integración con IA

### Modelo Utilizado
- **Google Gemini 2.0 Flash Experimental**: Modelo gratuito para testing
- **OpenRouter API**: Proxy que facilita el acceso a múltiples modelos
- **Configuración**: Modelo configurable para escalabilidad futura

### Prompt Engineering
El sistema utiliza un prompt altamente optimizado que incluye:

#### Instrucciones Principales
- Actuar como experto de élite en RRHH y ATS
- Generar CVs de calidad excepcional
- Enfoque en logros cuantificables
- Uso de verbos de acción potentes
- Eliminación de pronombres personales

#### Estructura de Datos
```typescript
interface CVData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    linkedin?: string
  }
  summary: string
  experience: WorkExperience[]
  education: Education[]
  skills: string[]
  languages?: Language[]
  projects?: Project[]
}
```

#### Categorización Inteligente
- **Skills Técnicos**: Lenguajes, frameworks, herramientas
- **Skills Blandos**: Liderazgo, comunicación, trabajo en equipo
- **Inferencia de Datos**: Completa información faltante de forma inteligente

### Proceso de Generación
1. **Input**: Usuario describe su experiencia en lenguaje natural
2. **Procesamiento**: IA analiza y estructura la información
3. **Validación**: Sistema valida la estructura JSON
4. **Renderizado**: Generación de vista previa en tiempo real
5. **PDF**: Conversión a PDF para descarga

## 📄 Sistema de Plantillas

### 1. Plantilla Moderna (Azul)
- **Diseño**: Moderno y colorido
- **Color Principal**: Azul (#3b82f6)
- **Tipografía**: Sans-serif (Helvetica)
- **Layout**: Columna única con secciones bien definidas
- **Ideal para**: Sectores tecnológicos y creativos

### 2. Plantilla Moderna (Gris)
- **Diseño**: Elegante y profesional
- **Color Principal**: Gris (#6b7280)
- **Tipografía**: Sans-serif (Helvetica)
- **Layout**: Similar a la azul con paleta neutra
- **Ideal para**: Sectores corporativos y financieros

### 3. Plantilla Harvard
- **Diseño**: Académico y tradicional
- **Color Principal**: Negro (#000000)
- **Tipografía**: Serif simulada con Helvetica
- **Layout**: Formato académico clásico
- **Características**:
  - Header centrado con línea separadora
  - Secciones: Experiencia, Educación, Skills, Idiomas, Proyectos
  - Formato de fechas en español
  - Optimizado para una página
- **Ideal para**: Sectores académicos, legales y tradicionales

### Ordenamiento Cronológico
Todas las plantillas implementan ordenamiento automático:
- **Experiencia Laboral**: Más reciente primero
- **Educación**: Más reciente primero
- **Proyectos**: Más reciente primero

## 🔧 Funcionalidades Técnicas

### Generación de PDF
```typescript
// Proceso de generación
const pdfBlob = await pdf(CVPDF({ data, template })).toBlob()
const url = URL.createObjectURL(pdfBlob)
// Descarga automática
```

### Manejo de Estados
- **Loading States**: Indicadores de progreso durante procesamiento
- **Error Handling**: Manejo robusto de errores de API
- **State Management**: React hooks para gestión de estado local

### Navegación
- **Vista Principal**: Formulario de entrada
- **Selector de Plantillas**: Previsualización de opciones
- **Vista Previa**: Renderizado del CV con opciones de acción
- **Navegación Completa**: Botones para volver al inicio desde cualquier vista

### Optimizaciones
- **Build Optimizado**: Bundle de ~612KB para la página principal
- **Lazy Loading**: Carga diferida de componentes pesados
- **Error Boundaries**: Manejo de errores en componentes
- **TypeScript**: Tipado estático para prevenir errores

## 🚀 Despliegue y Configuración

### Variables de Entorno
```bash
OPENROUTER_API_KEY=your_api_key_here
```

### Comandos de Desarrollo
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting de código
```

### Despliegue en Vercel
- **Auto-deploy**: Conectado con GitHub para despliegue automático
- **Environment Variables**: Configuradas en dashboard de Vercel
- **Domain**: micv.pro (configurado en Vercel)

## 🔄 Flujo de Usuario

1. **Entrada**: Usuario accede a micv.pro
2. **Descripción**: Escribe su experiencia en lenguaje natural
3. **Procesamiento**: IA estructura la información (3-5 segundos)
4. **Selección**: Usuario elige entre 3 plantillas disponibles
5. **Previsualización**: Vista en tiempo real del CV generado
6. **Descarga**: PDF generado instantáneamente
7. **Navegación**: Opción de volver al inicio o editar

## 🎨 Diseño y UX

### Principios de Diseño
- **Simplicidad**: Interfaz limpia y minimalista
- **Accesibilidad**: Contraste adecuado y navegación clara
- **Responsive**: Adaptable a todos los dispositivos
- **Feedback Visual**: Indicadores claros de estado y progreso

### Componentes UI
- **Botones**: Consistentes con estados hover y disabled
- **Cards**: Contenedores para información estructurada
- **Forms**: Validación en tiempo real
- **Loading**: Spinners y estados de carga

## 🔮 Roadmap Futuro

### Mejoras Planificadas
- **Más Plantillas**: Agregar plantillas especializadas por sector
- **Exportación Múltiple**: Word, HTML, otros formatos
- **Personalización**: Colores y fuentes personalizables
- **Idiomas**: Soporte para múltiples idiomas
- **IA Avanzada**: Modelos más potentes para mejor procesamiento

### Escalabilidad
- **Base de Datos**: Para guardar plantillas favoritas (opcional)
- **Autenticación**: Sistema de usuarios (opcional)
- **Analytics**: Métricas de uso y optimización
- **API Pública**: Para integraciones externas

## 📊 Métricas y Rendimiento

### Performance
- **First Load JS**: 612KB (optimizado)
- **Build Time**: ~4 segundos
- **PDF Generation**: <2 segundos
- **IA Processing**: 3-5 segundos promedio

### SEO
- **Meta Tags**: Optimizados para búsqueda
- **Structured Data**: Schema.org para mejor indexación
- **Sitemap**: Generado automáticamente
- **Robots.txt**: Configurado para crawlers

## 🛡️ Seguridad y Privacidad

### Privacidad
- **No Storage**: Datos no se almacenan en servidor
- **Client-Side**: Procesamiento local cuando es posible
- **API Calls**: Solo para generación con IA
- **No Tracking**: Sin cookies de seguimiento

### Seguridad
- **HTTPS**: Conexiones seguras
- **API Keys**: Protegidas en variables de entorno
- **Input Validation**: Validación de entrada en cliente y servidor
- **Error Handling**: Sin exposición de información sensible

---

**Última actualización**: Enero 2025
**Versión**: 1.0.0
**Mantenedor**: @tebiiee
