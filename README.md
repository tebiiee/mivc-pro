# micv.pro - Generador de CV con IA

Una aplicación web en español que utiliza inteligencia artificial para ayudar a los usuarios a crear currículums vitae (CV) profesionales a partir de descripciones escritas en lenguaje natural.

## 🚀 Características

- **Generación automática con IA**: Describe tu experiencia en lenguaje natural y la IA estructura toda la información
- **100% Privado**: No almacenamos datos personales, todo se procesa localmente
- **Totalmente gratuito**: Sin registro ni pagos requeridos
- **Múltiples plantillas**: Diferentes diseños profesionales para elegir
- **Descarga inmediata**: Genera y descarga tu CV en PDF al instante
- **Diseño responsive**: Funciona perfectamente en móviles y escritorio

## 🛠️ Tecnologías

- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilos**: Tailwind CSS
- **IA**: OpenRouter API (Gemini 2.0 Flash Experimental) con prompt de élite optimizado para ATS
- **PDF**: @react-pdf/renderer
- **Iconos**: Lucide React

## 📋 Requisitos previos

- Node.js 18+
- npm, yarn, pnpm o bun
- Clave API de OpenRouter

## 🚀 Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/micv-pro.git
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

## 📁 Estructura del proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── api/               # Endpoints API
│   │   └── generate-cv/   # Endpoint para generar CV con IA
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── ui/               # Componentes de UI base
│   ├── cv-preview.tsx    # Vista previa del CV
│   ├── cv-pdf.tsx        # Componente PDF
│   ├── template-selector.tsx # Selector de plantillas
│   └── processing-status.tsx # Estado de procesamiento
├── lib/                  # Utilidades
│   ├── utils.ts          # Utilidades generales
│   └── pdf-utils.ts      # Utilidades para PDF
└── types/                # Tipos TypeScript
    ├── cv.ts             # Tipos del CV
    └── templates.ts      # Tipos de plantillas
```

## 🎨 Plantillas disponibles

- **Moderno Azul**: Diseño moderno con acentos azules
- **Clásico Gris**: Diseño tradicional y elegante
- **Creativo Verde**: Diseño fresco y creativo
- **Minimalista Negro**: Diseño limpio y minimalista

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

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa los [Issues existentes](https://github.com/tu-usuario/micv-pro/issues)
2. Crea un nuevo Issue si no encuentras solución
3. Proporciona detalles sobre tu problema y pasos para reproducirlo

## 🙏 Agradecimientos

- [OpenRouter](https://openrouter.ai/) por la API de IA
- [Tailwind CSS](https://tailwindcss.com/) por el sistema de diseño
- [Lucide](https://lucide.dev/) por los iconos
- [React PDF](https://react-pdf.org/) por la generación de PDFs
