# Contribuir a micv.pro

¡Gracias por tu interés en contribuir a micv.pro! Este documento te guiará a través del proceso de contribución.

## 🚀 Cómo empezar

### Prerrequisitos
- Node.js 18+
- npm, yarn, pnpm o bun
- Git
- Cuenta en OpenRouter para testing

### Configuración del entorno de desarrollo

1. **Fork el repositorio**
   ```bash
   # Haz fork desde GitHub, luego clona tu fork
   git clone https://github.com/tu-usuario/mivc-pro.git
   cd micv-pro
   ```

2. **Instala dependencias**
   ```bash
   npm install
   ```

3. **Configura variables de entorno**
   ```bash
   cp .env.local.example .env.local
   # Edita .env.local con tu API key de OpenRouter
   ```

4. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   ```

## 📝 Tipos de contribuciones

### 🐛 Reportar bugs
- Usa el template de issue para bugs
- Incluye pasos para reproducir
- Especifica navegador y versión
- Adjunta screenshots si es relevante

### ✨ Solicitar features
- Usa el template de issue para features
- Explica el caso de uso
- Considera la compatibilidad bilingüe
- Piensa en el impacto en UX móvil

### 🔧 Contribuir código
- Sigue las convenciones de código existentes
- Escribe tests cuando sea apropiado
- Actualiza documentación si es necesario
- Asegúrate de que el build pase

## 🎯 Áreas de contribución

### 🎨 Plantillas de CV
- Nuevos diseños profesionales
- Optimización para ATS
- Mejoras de responsive design
- Soporte para nuevos idiomas

### 🤖 IA y Prompts
- Mejoras en prompt engineering
- Soporte para nuevos modelos
- Optimización de respuestas bilingües
- Validación de datos generados

### 🌍 Internacionalización
- Nuevos idiomas de interfaz
- Traducciones de plantillas
- Adaptaciones culturales
- Formatos de fecha/hora locales

### 📱 UX/UI
- Mejoras de accesibilidad
- Optimizaciones móviles
- Nuevos componentes UI
- Animaciones y transiciones

## 📋 Proceso de desarrollo

### 1. Planificación
- Revisa issues existentes
- Comenta en el issue que planeas trabajar
- Discute el enfoque si es un cambio grande

### 2. Desarrollo
```bash
# Crea una rama para tu feature
git checkout -b feature/nombre-descriptivo

# Desarrolla tu feature
# Haz commits frecuentes con mensajes descriptivos
git commit -m "feat: add new CV template with modern design"

# Mantén tu rama actualizada
git fetch origin
git rebase origin/main
```

### 3. Testing
```bash
# Ejecuta tests
npm run test

# Verifica el build
npm run build

# Prueba en diferentes dispositivos
# Verifica compatibilidad bilingüe
```

### 4. Pull Request
- Usa el template de PR
- Describe los cambios claramente
- Incluye screenshots para cambios UI
- Referencia issues relacionados

## 🎨 Convenciones de código

### TypeScript
- Usa tipos estrictos, evita `any`
- Define interfaces para props
- Usa enums para constantes
- Documenta funciones complejas

### React
- Componentes funcionales con hooks
- Props destructuring
- Nombres descriptivos para componentes
- Usa `React.FC` para componentes

### CSS/Tailwind
- Usa clases de Tailwind cuando sea posible
- Mantén consistencia con Clay Design System
- Responsive-first design
- Optimiza para dark mode futuro

### Commits
Usa conventional commits:
- `feat:` nuevas características
- `fix:` corrección de bugs
- `docs:` cambios en documentación
- `style:` cambios de formato
- `refactor:` refactoring de código
- `test:` agregar o modificar tests

## 🧪 Testing

### Tests unitarios
```bash
npm run test
```

### Tests de integración
- Prueba flujo completo de generación
- Verifica descarga de PDFs
- Testa cambio de idiomas
- Valida persistencia de datos

### Tests manuales
- Prueba en Chrome, Firefox, Safari
- Verifica responsive en móvil/tablet
- Testa con diferentes longitudes de texto
- Valida accesibilidad básica

## 📚 Documentación

### Código
- Comenta lógica compleja
- Documenta APIs públicas
- Usa JSDoc para funciones importantes
- Mantén README actualizado

### Cambios
- Actualiza CHANGELOG.md
- Documenta breaking changes
- Incluye ejemplos de uso
- Actualiza tipos TypeScript

## 🔍 Review process

### Criterios de aceptación
- ✅ Build pasa sin errores
- ✅ Tests pasan
- ✅ Código sigue convenciones
- ✅ Documentación actualizada
- ✅ Compatible con funcionalidad bilingüe
- ✅ Responsive design mantenido

### Timeline
- Reviews iniciales: 1-2 días
- Feedback y cambios: según complejidad
- Merge: después de aprobación

## 🆘 Ayuda

### Canales de comunicación
- GitHub Issues para bugs y features
- GitHub Discussions para preguntas generales
- Pull Request comments para review

### Recursos útiles
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React PDF](https://react-pdf.org/)
- [OpenRouter API](https://openrouter.ai/docs)

## 🙏 Reconocimiento

Todos los contribuidores serán reconocidos en:
- README.md
- Página de créditos en la app
- Release notes

¡Gracias por hacer micv.pro mejor para todos! 🚀
