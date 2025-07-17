import { CVData, LanguageCode } from '@/types/cv'
import { CVTemplate } from '@/types/templates'
import { Button } from '@/components/ui/button'
import { Download, Palette, Home } from 'lucide-react'
import { HarvardTemplate } from '@/components/templates/HarvardTemplate'
import { ProfessionalTemplate } from '@/components/templates/ProfessionalTemplate'
import { ModernTemplate } from '@/components/templates/ModernTemplate'
import { LanguageToggle } from '@/components/LanguageToggle'
import { getTranslations } from '@/lib/translations'

interface CVPreviewProps {
  data: CVData
  template: CVTemplate
  language?: LanguageCode
  onDownload: () => void
  onEdit: () => void
  onChangeTemplate: () => void
  onHome: () => void
  showLanguageToggle?: boolean
  currentLanguage?: LanguageCode
  onLanguageChange?: (language: LanguageCode) => void
  isBilingual?: boolean
}

export function CVPreview({
  data,
  template,
  language = 'spanish',
  onDownload,
  onEdit,
  onChangeTemplate,
  onHome,
  showLanguageToggle = false,
  currentLanguage = 'spanish',
  onLanguageChange,
  isBilingual = false
}: CVPreviewProps) {
  const t = getTranslations(language)

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 px-4">
      {/* Header elegante con título */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Vista previa de tu CV</h2>
        <p className="text-gray-600 text-sm sm:text-base">Tu currículum está listo. Revisa, personaliza y descarga.</p>
      </div>

      {/* Panel de control organizado */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col gap-6">

          {/* Language Toggle - Solo mostrar si hay datos bilingües */}
          {showLanguageToggle && onLanguageChange && (
            <div className="flex justify-center">
              <LanguageToggle
                currentLanguage={currentLanguage}
                onLanguageChange={onLanguageChange}
              />
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Grupo de navegación */}
            <div className="flex flex-col sm:flex-row gap-3 order-2 lg:order-1">
              <Button
                variant="outline"
                onClick={onHome}
                className="gap-2 text-sm hover:bg-gray-50 border-gray-300"
              >
                <Home className="h-4 w-4" />
                {t.buttons.backToHome}
              </Button>
              <Button
                variant="outline"
                onClick={onEdit}
                className="gap-2 text-sm hover:bg-gray-50 border-gray-300"
              >
                {t.buttons.editInfo}
              </Button>
            </div>

            {/* Grupo de personalización */}
            <div className="flex flex-col sm:flex-row gap-3 order-1 lg:order-2">
              <Button
                variant="outline"
                onClick={onChangeTemplate}
                className="gap-2 text-sm hover:bg-blue-50 border-blue-300 text-blue-700"
              >
                <Palette className="h-4 w-4" />
                {t.buttons.changeTemplate}
              </Button>
              <Button
                onClick={onDownload}
                className="gap-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
              >
                <Download className="h-4 w-4" />
                {isBilingual ? t.buttons.downloadBilingualPDF : t.buttons.downloadPDF}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CV Preview - Optimizado para móviles */}
      <div className="w-full px-2 sm:px-4 lg:flex lg:justify-center">
        {template.layout === 'harvard' ? (
          <div className="w-full lg:max-w-[280mm] min-h-screen sm:min-h-[396mm] shadow-lg">
            <HarvardTemplate data={data} template={template} language={language} />
          </div>
        ) : template.layout === 'professional' ? (
          <div className="w-full lg:max-w-[280mm] min-h-screen sm:min-h-[396mm] shadow-lg">
            <ProfessionalTemplate data={data} template={template} language={language} />
          </div>
        ) : template.layout === 'modern' ? (
          <div className="w-full lg:max-w-[280mm] min-h-screen sm:min-h-[396mm] shadow-lg">
            <ModernTemplate data={data} template={template} language={language} />
          </div>
        ) : null}

      </div>
    </div>
  )
}
