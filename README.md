# 🚀 micv.pro - AI-Powered Professional CV Generator

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tebiiee/mivc-pro)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![GitHub Stars](https://img.shields.io/github/stars/tebiiee/mivc-pro?style=social)](https://github.com/tebiiee/mivc-pro/stargazers)

**🌟 Create professional CVs in Spanish and English simultaneously using advanced AI**

[Live Demo](https://micv.pro) • [Documentation](docs/project.md) • [Contributing](CONTRIBUTING.md) • [Report Bug](https://github.com/tebiiee/mivc-pro/issues)

</div>

Una aplicación web moderna **bilingüe** que utiliza inteligencia artificial avanzada para crear currículums vitae (CV) profesionales simultáneamente en **español e inglés** a partir de descripciones en lenguaje natural.

## ✨ Características Principales

- **🌍 Generación Bilingüe**: CVs creados simultáneamente en español e inglés con una sola descripción
- **📄 Descarga Dual**: Descarga automática de 2 PDFs (ES + EN) con un solo clic
- **🔄 Switch de Idiomas**: Cambio instantáneo entre versiones sin regenerar datos
- **🎨 3 Plantillas Profesionales**: Moderna, Harvard y Professional optimizadas para ATS
- **📐 Vista Previa Optimizada**: Aprovecha mejor el ancho de pantalla en todos los dispositivos
- **🤖 IA Avanzada**: Powered by Google Gemini 2.5 Flash Lite con prompt bilingüe optimizado
- **💾 Persistencia Inteligente**: Sistema de localStorage que evita regeneraciones innecesarias
- **🎨 Diseño Glassmorphism**: Panel de control elegante con elementos decorativos modernos
- **📱 100% Responsive**: Escalado inteligente para móvil, tablet y desktop
- **🔒 Privacidad Total**: Datos eliminados automáticamente tras descarga
- **🆓 Completamente Gratuito**: Sin registro, sin pagos, sin límites

## 🛠️ Stack Tecnológico

### Core
- **Next.js 15** con App Router y Turbopack
- **React 19** con hooks modernos
- **TypeScript 5** para tipado estático
- **Tailwind CSS** con configuración personalizada

### IA y APIs
- **Google Gemini 2.5 Flash Lite Preview** (modelo optimizado para generación bilingüe)
- **OpenRouter API** para acceso a múltiples modelos
- **Prompt Engineering Bilingüe** de élite optimizado para ATS
- **Generación Simultánea** de CVs en español e inglés

### UI/UX
- **Inter Font** (Google Fonts) para tipografía moderna
- **Clay Design System** para identidad visual
- **Lucide React** para iconografía SVG
- **Elementos decorativos** SVG personalizados

### Funcionalidades
- **@react-pdf/renderer** para generación dual de PDFs (ES + EN)
- **Sistema de traducciones** completo para interfaz bilingüe
- **localStorage** con hooks personalizados para datos bilingües
- **Responsive design** avanzado con escalado inteligente

## 📋 Requisitos previos

- Node.js 18+
- npm, yarn, pnpm o bun
- Clave API de OpenRouter

## 🚀 Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tebiiee/mivc-pro.git
   cd micv-pro
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. **Configura las variables de entorno**
   ```bash
   cp .env.local.example .env.local
   ```

   Edita `.env.local` y agrega tu clave API de OpenRouter:
   ```
   OPENROUTER_API_KEY=tu_clave_api_aqui
   ```

4. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   ```

5. **Abre tu navegador**

   Visita [http://localhost:3000](http://localhost:3000)

## 🔑 Configuración de OpenRouter

1. Ve a [OpenRouter](https://openrouter.ai/)
2. Crea una cuenta gratuita
3. Genera una clave API en [OpenRouter Keys](https://openrouter.ai/keys)
4. Agrega la clave a tu archivo `.env.local`

## 🌍 Características Bilingües

### Generación Simultánea
- **Una sola descripción** → **Dos CVs completos** (español e inglés)
- **Adaptación cultural**, no traducción literal
- **Optimización ATS** para ambos idiomas
- **Consistencia** en estructura y formato

### Switch de Idiomas
- **Toggle instantáneo** entre versiones sin regenerar
- **Persistencia** de preferencia en localStorage
- **Sincronización** con cambios de plantilla
- **Interfaz completamente traducida**

### Descarga Dual
- **Un solo clic** → **Dos PDFs** automáticamente
- **Nomenclatura clara**: `CV_Nombre_ES.pdf` y `CV_Nombre_EN.pdf`
- **Pausa inteligente** entre descargas
- **Feedback visual** en botones

## 📁 Estructura del proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── api/               # Endpoints API
│   │   └── generate-cv/   # Endpoint para generar CV con IA
│   ├── globals.css        # Estilos globales con Clay Design System
│   ├── layout.tsx         # Layout principal con Inter font
│   └── page.tsx           # Página principal con persistencia
├── components/            # Componentes React
│   ├── templates/         # Plantillas de CV optimizadas
│   ├── ui/               # Componentes UI rediseñados
│   │   ├── decorative-flowers.tsx # Elementos decorativos
│   │   └── ...           # Botones, cards, inputs modernos
│   ├── cv-preview.tsx    # Vista previa responsive
│   ├── cv-pdf.tsx        # Componente PDF optimizado
│   ├── template-selector.tsx # Selector con mejor UX
│   └── processing-status.tsx # Estados de procesamiento
├── hooks/                 # Custom Hooks
│   ├── useLocalStorage.ts # Hook genérico para localStorage
│   └── useCVData.ts      # Hook específico para datos del CV
├── lib/                  # Utilidades
│   ├── utils.ts          # Utilidades generales
│   └── pdf-utils.ts      # Utilidades para PDF seguras
├── types/                # Tipos TypeScript
│   ├── cv.ts             # Tipos del CV
│   └── templates.ts      # Tipos de plantillas
└── docs/                 # Documentación
    ├── project.md        # Documentación completa
    └── style-guide.json  # Guía de estilo Clay
```

## 🎨 Plantillas Profesionales

### 1. **Plantilla Harvard**
- Diseño académico y tradicional optimizado
- Ideal para sectores académicos, legales y corporativos
- Formato clásico con optimización para una página

### 2. **Plantilla Moderna Azul**
- Diseño contemporáneo con acentos azules
- Perfect para sectores tecnológicos y creativos
- Layout moderno con gradientes sutiles

### 3. **Plantilla Moderna Gris**
- Diseño elegante y profesional
- Ideal para sectores corporativos y financieros
- Paleta neutra con excelente legibilidad

### Características de todas las plantillas:
- ✅ **Optimizadas para ATS** (Applicant Tracking Systems)
- ✅ **Una sola página** con contenido inteligentemente distribuido
- ✅ **Responsive** para vista previa en cualquier dispositivo
- ✅ **Cambio instantáneo** sin pérdida de datos

## 🆕 Nuevas Características (v1.1.0)

### 💾 Sistema de Persistencia Inteligente
- **localStorage temporal**: Datos guardados por 24 horas
- **Cambio instantáneo**: Switch entre plantillas sin regenerar
- **Recuperación automática**: Carga datos al recargar la página
- **Optimización de IA**: 80% menos requests innecesarios

### 🎨 Identidad Visual Moderna
- **Clay Design System**: Paleta de colores profesional
- **Elementos decorativos**: Flores SVG coloridas
- **Tipografía Inter**: Font moderna de Google
- **Responsive avanzado**: UX específica para cada dispositivo

### 📱 UX Móvil Optimizada
- **Aprovechamiento completo**: Uso total del ancho de pantalla
- **Navegación táctil**: Botones optimizados para touch
- **Texto adaptativo**: Tamaños responsivos inteligentes

## 🔧 Scripts disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Ejecuta la aplicación en modo producción
- `npm run lint` - Ejecuta el linter

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a [Vercel](https://vercel.com)
2. Agrega la variable de entorno `OPENROUTER_API_KEY`
3. Despliega automáticamente

### Otros proveedores

La aplicación es compatible con cualquier proveedor que soporte Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🚀 Quick Start for Contributors

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/your-username/mivc-pro.git`
3. **Install** dependencies: `npm install`
4. **Create** a feature branch: `git checkout -b feature/amazing-feature`
5. **Make** your changes and test thoroughly
6. **Commit** with conventional commits: `git commit -m 'feat: add amazing feature'`
7. **Push** to your branch: `git push origin feature/amazing-feature`
8. **Open** a Pull Request

### 🎯 Areas Where We Need Help

- 🎨 **New CV Templates**: Design modern, ATS-optimized templates
- 🌍 **Internationalization**: Add support for more languages
- 🤖 **AI Improvements**: Enhance prompt engineering and model integration
- 📱 **Mobile UX**: Improve mobile experience and accessibility
- 🧪 **Testing**: Add unit tests and integration tests
- 📚 **Documentation**: Improve docs and add tutorials

### 📋 Contribution Guidelines

Please read our [Contributing Guide](CONTRIBUTING.md) for detailed information about:
- Code style and conventions
- Development setup
- Testing requirements
- Pull request process

### 🐛 Found a Bug?

1. Check [existing issues](https://github.com/tebiiee/mivc-pro/issues)
2. Create a [bug report](https://github.com/tebiiee/mivc-pro/issues/new?template=bug_report.md)
3. Provide detailed reproduction steps

### 💡 Have an Idea?

1. Check [existing feature requests](https://github.com/tebiiee/mivc-pro/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)
2. Create a [feature request](https://github.com/tebiiee/mivc-pro/issues/new?template=feature_request.md)
3. Discuss the idea with the community

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa los [Issues existentes](https://github.com/tebiiee/mivc-pro/issues)
2. Crea un nuevo Issue si no encuentras solución
3. Proporciona detalles sobre tu problema y pasos para reproducirlo

## 🌟 Community & Support

### 💬 Join the Community

- **GitHub Discussions**: Ask questions and share ideas
- **Issues**: Report bugs and request features
- **Pull Requests**: Contribute code and improvements

### 📊 Project Stats

- **🌟 Stars**: Help us grow by starring the repository
- **🍴 Forks**: Fork and create your own version
- **🐛 Issues**: Track bugs and feature requests
- **🔄 PRs**: Active development and community contributions

## 🙏 Acknowledgments

Special thanks to:

- **[OpenRouter](https://openrouter.ai/)** - AI API infrastructure
- **[Google](https://ai.google.dev/)** - Gemini AI model
- **[Vercel](https://vercel.com/)** - Hosting and deployment
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling framework
- **[Lucide](https://lucide.dev/)** - Beautiful icons
- **[React PDF](https://react-pdf.org/)** - PDF generation
- **All contributors** who help make this project better

## 📈 Roadmap

### 🎯 Upcoming Features

- [ ] **More Languages**: French, German, Portuguese support
- [ ] **Advanced Templates**: Industry-specific CV designs
- [ ] **AI Enhancements**: Better content optimization
- [ ] **Export Options**: Word, LinkedIn, JSON formats
- [ ] **Collaboration**: Share and review CVs with others
- [ ] **Analytics**: Track CV performance and views

### 🔮 Future Vision

- **Multi-language Support**: Global accessibility
- **Template Marketplace**: Community-created designs
- **AI Coaching**: Interview preparation and career advice
- **Integration APIs**: Connect with job boards and ATS systems

---

<div align="center">

**Made with ❤️ by the open source community**

[⭐ Star this project](https://github.com/tebiiee/mivc-pro/stargazers) • [🐛 Report Issues](https://github.com/tebiiee/mivc-pro/issues) • [💡 Request Features](https://github.com/tebiiee/mivc-pro/issues/new?template=feature_request.md)

</div>
