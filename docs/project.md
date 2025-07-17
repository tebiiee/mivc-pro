# micv.pro - Generador de CV Profesional con IA

## 📋 Descripción General

**micv.pro** es una aplicación web moderna que permite a los usuarios crear CVs profesionales de alta calidad utilizando inteligencia artificial. La aplicación procesa descripciones en lenguaje natural y las convierte automáticamente en CVs estructurados y optimizados para ATS (Applicant Tracking Systems).

### 🎯 Características Principales

- **🌍 Generación Bilingüe**: CVs generados simultáneamente en español e inglés con IA
- **📄 Descarga Dual**: Descarga automática de 2 PDFs (ES + EN) con un solo clic
- **🎨 3 Plantillas Profesionales**: Moderna, Harvard y Professional optimizadas para ATS
- **🔄 Switch de Idiomas**: Cambio instantáneo entre versiones sin regenerar
- **📱 Vista Previa Optimizada**: Aprovecha mejor el ancho de pantalla en todos los dispositivos
- **🎯 100% Gratuito y Privado**: No requiere registro, datos eliminados tras descarga
- **⚡ Procesamiento con IA**: Gemini 2.5 Flash Lite Preview para máxima velocidad
- **💾 Persistencia Inteligente**: localStorage para cambios de plantilla sin pérdida
- **🎨 Identidad Visual Moderna**: Diseño glassmorphism con elementos decorativos
- **📐 Responsive Avanzado**: Escalado inteligente para móvil, tablet y desktop
- **🔧 UX Optimizada**: Navegación fluida con panel de control organizado

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15**: Framework React con App Router y Turbopack
- **React 19**: Biblioteca de interfaz de usuario con hooks modernos
- **TypeScript**: Tipado estático para mayor robustez
- **Tailwind CSS**: Framework de estilos utilitarios con configuración personalizada
- **Lucide React**: Biblioteca de iconos SVG optimizados
- **Inter Font**: Tipografía moderna de Google Fonts

### Backend/API
- **Next.js API Routes**: Endpoints serverless optimizados
- **OpenRouter API**: Proxy para acceso a múltiples modelos de IA
- **Google Gemini 2.5 Flash Lite Preview**: Modelo de IA optimizado para procesamiento

### Generación PDF
- **@react-pdf/renderer**: Generación de PDFs en React con optimización para una página
- **Descarga Dual**: Generación simultánea de PDFs en español e inglés
- **Nomenclatura Inteligente**: `CV_NombreCompleto_ES.pdf` y `CV_NombreCompleto_EN.pdf`
- **Helvetica**: Fuente estándar para máxima compatibilidad ATS
- **Sanitización de nombres**: Manejo seguro de caracteres especiales
- **Pausa entre descargas**: 500ms para evitar conflictos del navegador

### Persistencia y Estado
- **localStorage**: Almacenamiento local inteligente con expiración
- **Datos Bilingües**: Persistencia de CVs en español e inglés simultáneamente
- **Custom Hooks**: useLocalStorage y useCVData para gestión de estado
- **Sesiones Temporales**: Datos persistentes por 24 horas
- **Switch de Idiomas**: Cambio instantáneo sin regenerar datos
- **Limpieza Automática**: Datos eliminados tras descarga por privacidad

### Herramientas de Desarrollo
- **ESLint**: Linting de código
- **Vercel**: Plataforma de despliegue
- **Git**: Control de versiones

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   │   └── generate-cv/   # Endpoint de generación de CV con IA
│   ├── globals.css        # Estilos globales con Clay Design System
│   ├── layout.tsx         # Layout principal con Inter font
│   └── page.tsx           # Página principal con persistencia
├── components/            # Componentes React
│   ├── templates/         # Plantillas de CV optimizadas
│   │   ├── HarvardTemplate.tsx    # Plantilla Harvard (web)
│   │   ├── HarvardPDF.tsx         # Plantilla Harvard (PDF una página)
│   │   ├── ModernTemplate.tsx     # Plantilla Moderna (web)
│   │   └── ModernPDF.tsx          # Plantilla Moderna (PDF)
│   ├── ui/                # Componentes UI base rediseñados
│   │   ├── button.tsx     # Botones con nuevo estilo
│   │   ├── card.tsx       # Cards con bordes redondeados
│   │   ├── textarea.tsx   # Inputs optimizados
│   │   └── decorative-flowers.tsx # Elementos decorativos
│   ├── cv-pdf.tsx         # Wrapper para PDFs optimizado
│   ├── cv-preview.tsx     # Vista previa responsive
│   ├── template-selector.tsx # Selector con mejor UX
│   └── processing-status.tsx # Indicadores de progreso
├── hooks/                 # Custom Hooks
│   ├── useLocalStorage.ts # Hook genérico para localStorage
│   └── useCVData.ts       # Hook específico para datos del CV
├── lib/                   # Utilidades
│   ├── pdf-utils.ts       # Funciones de generación PDF seguras
│   └── utils.ts           # Utilidades generales
├── types/                 # Definiciones TypeScript
│   ├── cv.ts              # Tipos de datos del CV
│   └── templates.ts       # Tipos de plantillas
└── docs/                  # Documentación
    ├── project.md         # Documentación completa del proyecto
    └── style-guide.json   # Guía de estilo Clay Design System
```

## 🌍 Sistema Bilingüe Avanzado

### Generación Simultánea
La aplicación genera automáticamente CVs en **español e inglés** con una sola descripción:

- **Procesamiento Único**: Una sola llamada a la IA genera ambas versiones
- **Traducción Inteligente**: No es traducción literal, sino adaptación cultural
- **Consistencia**: Misma estructura y formato en ambos idiomas
- **Optimización ATS**: Ambas versiones optimizadas para sistemas de seguimiento

### Switch de Idiomas
- **Cambio Instantáneo**: Toggle entre español e inglés sin regenerar
- **Persistencia**: Preferencia de idioma guardada en localStorage
- **Sincronización**: Cambios de plantilla mantienen el idioma seleccionado
- **UX Fluida**: Transición suave entre versiones

### Descarga Dual
- **Un Solo Clic**: Descarga automática de ambos PDFs
- **Nomenclatura Clara**: `CV_Nombre_ES.pdf` y `CV_Nombre_EN.pdf`
- **Pausa Inteligente**: 500ms entre descargas para evitar conflictos
- **Feedback Visual**: Botón indica "Descargar PDFs (ES + EN)"

### Sistema de Traducciones
- **Interfaz Completa**: Todos los elementos UI traducidos
- **Secciones del CV**: Títulos adaptados según el idioma
- **Botones y Mensajes**: Experiencia completamente localizada
- **Escalabilidad**: Sistema preparado para más idiomas

## 🤖 Integración con IA

### Modelo Utilizado
- **Google Gemini 2.5 Flash Lite Preview**: Modelo optimizado para generación bilingüe
- **OpenRouter API**: Proxy que facilita el acceso a múltiples modelos
- **Configuración**: Modelo configurable para escalabilidad futura
- **Optimización de Requests**: Una sola llamada genera ambas versiones
- **Procesamiento Simultáneo**: Español e inglés en una sola respuesta

### Prompt Engineering
El sistema utiliza un prompt altamente optimizado que incluye:

#### Instrucciones Principales
- Actuar como experto de élite en RRHH y ATS bilingüe
- Generar CVs simultáneos en español e inglés
- Enfoque en logros cuantificables y verbos de acción
- Adaptación cultural, no traducción literal
- Optimización para sistemas ATS en ambos idiomas
- Eliminación de pronombres personales
- Consistencia en estructura y formato

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

### Proceso de Generación Bilingüe
1. **Input**: Usuario describe su experiencia en lenguaje natural (cualquier idioma)
2. **Verificación**: Sistema verifica si hay datos guardados para esa descripción
3. **Procesamiento IA**: Genera simultáneamente versiones en español e inglés
4. **Persistencia Dual**: Ambas versiones se guardan automáticamente en localStorage
5. **Validación**: Sistema valida la estructura JSON bilingüe
6. **Renderizado Dinámico**: Vista previa con switch de idiomas instantáneo
7. **Exportación Dual**: Conversión a 2 PDFs optimizados (ES + EN)

## 💾 Sistema de Persistencia Inteligente

### Características de Persistencia
- **localStorage Seguro**: Almacenamiento local con manejo de errores
- **Datos Bilingües**: Persistencia simultánea de versiones ES e EN
- **Sesiones Temporales**: Datos válidos por 24 horas
- **Comparación Inteligente**: Evita requests duplicados para la misma descripción
- **Recuperación Automática**: Carga datos existentes al recargar la página
- **Switch Instantáneo**: Cambio de idioma sin regenerar datos
- **Limpieza Automática**: Elimina datos expirados y tras descarga

### Optimización de Requests
#### Cuándo SE HACE request a IA:
- ✅ Primera generación de CV
- ✅ Edición de la descripción original
- ✅ Sesión expirada (>24 horas)

#### Cuándo NO se hace request:
- ❌ Cambio de plantilla
- ❌ Recarga de página (con datos válidos)
- ❌ Navegación entre vistas

### Beneficios del Sistema
- **Reducción del 80%** en llamadas a IA
- **Cambio instantáneo** de plantillas
- **Experiencia fluida** sin pérdida de datos
- **Menor costo** operativo
- **Mejor rendimiento** general

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
- **Diseño**: Académico y tradicional optimizado
- **Color Principal**: Negro (#000000)
- **Tipografía**: Helvetica con tamaños optimizados
- **Layout**: Formato académico clásico mejorado
- **Características**:
  - Header centrado con línea separadora
  - Secciones: Experiencia, Educación, Skills, Idiomas, Proyectos
  - Formato de fechas en español
  - **Optimizado para una sola página** con fuentes reducidas
  - Espaciado eficiente sin perder legibilidad
  - Márgenes ajustados (15mm x 20mm)
- **Ideal para**: Sectores académicos, legales y tradicionales

### Optimizaciones de PDF
Todas las plantillas han sido optimizadas para generar PDFs de una sola página:
- **Fuentes reducidas**: Tamaños optimizados manteniendo legibilidad
- **Espaciado eficiente**: Márgenes y padding ajustados
- **Contenido inteligente**: Priorización automática de información
- **Compatibilidad**: Fuentes estándar para máxima compatibilidad

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

## 🔄 Flujo de Usuario Optimizado

### Primera Visita
1. **Entrada**: Usuario accede a micv.pro
2. **Descripción**: Escribe su experiencia en lenguaje natural (mín. 50 caracteres)
3. **Procesamiento**: IA estructura la información (2-4 segundos)
4. **Persistencia**: Datos se guardan automáticamente en localStorage
5. **Selección**: Usuario elige entre 3 plantillas disponibles
6. **Previsualización**: Vista en tiempo real del CV generado
7. **Cambio de Plantilla**: Instantáneo sin nueva generación
8. **Descarga**: PDF optimizado para una página
9. **Navegación**: Opciones de editar, cambiar plantilla o volver al inicio

### Visitas Posteriores (con datos guardados)
1. **Carga Automática**: Datos se recuperan automáticamente
2. **Indicador Visual**: Notificación de datos guardados disponibles
3. **Opciones**: Continuar con datos existentes o crear nuevo CV
4. **Edición**: Limpiar datos guardados para nueva generación

### Casos de Uso Especiales
- **Cambio de Plantilla**: Sin pérdida de datos, cambio instantáneo
- **Recarga de Página**: Recuperación automática de sesión activa
- **Edición de Datos**: Limpieza automática para forzar nueva generación
- **Sesión Expirada**: Notificación y opción de regenerar

## 🎨 Identidad Visual y Diseño

### Clay Design System
La aplicación implementa un sistema de diseño moderno basado en Clay:

#### Paleta de Colores
- **Primarios**: Negro (#000000) y Blanco (#FFFFFF)
- **Secundarios**: Grises neutros (#FAF9F7, #F6F5F4)
- **Acentos Florales**:
  - Amarillo (#F6C34A)
  - Rosa (#E96C7C)
  - Azul (#7EC6E6)
  - Verde (#A9E65B)
  - Púrpura (#F9B4E1)

#### Tipografía
- **Fuente Principal**: Inter (Google Fonts)
- **Clases Tipográficas**:
  - `.headline`: 56px, bold, para títulos principales
  - `.subheadline`: 20px, regular, para subtítulos
  - `.body-text`: 16px, regular, para texto normal
  - `.caption`: 14px, regular, para texto pequeño
- **Responsive**: Tamaños adaptativos para móviles

#### Elementos Decorativos
- **Flores SVG**: Elementos decorativos coloridos en las esquinas
- **Gradientes Sutiles**: Fondos con transiciones suaves
- **Bordes Redondeados**: Cards con border-radius de 24px
- **Sombras Modernas**: Efectos de profundidad sutiles

### Principios de Diseño
- **Simplicidad**: Interfaz limpia y minimalista
- **Accesibilidad**: Contraste adecuado (WCAG AA) y navegación clara
- **Responsive**: Optimizado para desktop, tablet y móvil
- **Feedback Visual**: Indicadores claros de estado y progreso
- **Consistencia**: Sistema de componentes unificado

### Componentes UI Rediseñados
- **Botones**: Estilo moderno con estados hover y focus mejorados
- **Cards**: Contenedores con bordes redondeados y sombras sutiles
- **Forms**: Inputs con mejor UX y validación visual
- **Loading**: Animaciones fluidas y estados de progreso
- **Navegación**: Botones adaptativos para móviles

### Responsive Design Avanzado
#### Desktop (>1024px)
- Layout completo con espaciado generoso
- Texto en tamaños completos
- Elementos decorativos visibles

#### Tablet (768px - 1024px)
- Layout adaptado con espaciado medio
- Algunos elementos decorativos ocultos
- Navegación optimizada

#### Mobile (<768px)
- **Uso completo del ancho**: Vista previa del CV aprovecha toda la pantalla
- **Botones compactos**: Texto abreviado pero funcional
- **Espaciado optimizado**: Padding y márgenes reducidos
- **Iconos escalables**: Tamaños adaptativos
- **Navegación táctil**: Botones de tamaño adecuado para touch

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
- **First Load JS**: 613KB (optimizado con nuevos componentes)
- **Build Time**: ~4 segundos (con optimizaciones)
- **PDF Generation**: <2 segundos (optimizado para una página)
- **IA Processing**: 2-4 segundos promedio (Gemini 2.5 Flash Lite)
- **Template Switching**: Instantáneo (sin requests adicionales)
- **Data Recovery**: <100ms (desde localStorage)
- **Mobile Performance**: Optimizado para dispositivos de gama baja

### SEO
- **Meta Tags**: Optimizados para búsqueda
- **Structured Data**: Schema.org para mejor indexación
- **Sitemap**: Generado automáticamente
- **Robots.txt**: Configurado para crawlers

## 🛡️ Seguridad y Privacidad

### Privacidad
- **No Storage Permanente**: Datos no se almacenan en servidor
- **localStorage Temporal**: Almacenamiento local por 24 horas máximo
- **Client-Side**: Procesamiento local cuando es posible
- **API Calls Optimizadas**: Solo para generación con IA cuando es necesario
- **No Tracking**: Sin cookies de seguimiento
- **Limpieza Automática**: Datos se eliminan automáticamente al expirar

### Seguridad
- **HTTPS**: Conexiones seguras
- **API Keys**: Protegidas en variables de entorno
- **Input Validation**: Validación de entrada en cliente y servidor
- **Error Handling**: Sin exposición de información sensible

## 🚀 Changelog Reciente

### Versión 1.1.0 (Enero 2025)
#### Nuevas Características
- ✅ **Sistema de Persistencia Inteligente**: localStorage con expiración de 24h
- ✅ **Identidad Visual Moderna**: Rediseño completo basado en Clay Design System
- ✅ **Optimización de IA**: Reducción del 80% en requests innecesarios
- ✅ **PDFs de Una Página**: Optimización completa para formato single-page
- ✅ **UX Móvil Mejorada**: Aprovechamiento completo del espacio en dispositivos móviles

#### Mejoras Técnicas
- ✅ **Modelo IA Actualizado**: Migración a Gemini 2.5 Flash Lite Preview
- ✅ **Custom Hooks**: useLocalStorage y useCVData para mejor gestión de estado
- ✅ **Responsive Avanzado**: Optimización específica para cada breakpoint
- ✅ **Elementos Decorativos**: Flores SVG con colores de la paleta Clay
- ✅ **Tipografía Moderna**: Migración de Geist a Inter font

#### Correcciones
- ✅ **Error PDF**: Sanitización de nombres de archivo con caracteres especiales
- ✅ **Legibilidad**: Mejora de contraste en todos los textos
- ✅ **Centrado**: Alineación perfecta de plantillas en todas las pantallas
- ✅ **Fuentes PDF**: Corrección de errores Helvetica-Oblique

---

**Última actualización**: Enero 2025
**Versión**: 1.1.0
**Mantenedor**: @tebiiee
