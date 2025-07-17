'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { FileText, Sparkles, Download, Shield, AlertCircle } from 'lucide-react'
import { CVData, AIProcessingResponse } from '@/types/cv'
import { CVTemplate, CV_TEMPLATES } from '@/types/templates'
import { CVPreview } from '@/components/cv-preview'
import { TemplateSelector } from '@/components/template-selector'
import { ProcessingStatus } from '@/components/processing-status'
import { DecorativeFlowers } from '@/components/ui/decorative-flowers'
import { generateAndDownloadPDF, generateAndDownloadBilingualPDF } from '@/lib/pdf-utils'
import { convertAIDataToCVData } from '@/lib/cv-converter'
import { useCVData } from '@/hooks/useCVData'
import { useBilingual } from '@/contexts/BilingualContext'

export default function Home() {
  const [description, setDescription] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [cvData, setCvData] = useState<CVData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<CVTemplate>(CV_TEMPLATES[0])
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [hasInitialLoad, setHasInitialLoad] = useState(false)

  // Hook para manejar datos del CV en localStorage
  const { saveCVData, getCVData, hasDataForDescription, clearSession, hasActiveSession } = useCVData()

  // Contexto bilingüe
  const {
    currentLanguage,
    setCurrentLanguage,
    bilingualData,
    setBilingualData,
    getCurrentCV,
    hasData
  } = useBilingual()

  // Cargar datos existentes al iniciar la aplicación
  useEffect(() => {
    // Solo ejecutar una vez al cargar la página
    if (hasInitialLoad) return

    // Priorizar datos bilingües si existen
    if (hasData && bilingualData) {
      setShowTemplateSelector(true)
      setHasInitialLoad(true)
      return
    }

    // Fallback a datos legacy
    const existingData = getCVData()
    if (existingData) {
      setDescription(existingData.description)
      setCvData(existingData.cvData)
      setShowTemplateSelector(true)
      setHasInitialLoad(true)
    }
  }, [hasData, bilingualData, getCVData, hasInitialLoad])
  const [processingStage, setProcessingStage] = useState<'analyzing' | 'structuring' | 'formatting' | 'complete'>('analyzing')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim() || description.trim().length < 50) return

    // Verificar si ya tenemos datos para esta descripción
    if (hasDataForDescription(description.trim())) {
      const existingData = getCVData()
      if (existingData) {
        setCvData(existingData.cvData)
        setShowTemplateSelector(true)
        return
      }
    }

    setIsProcessing(true)
    setError(null)
    setProcessingStage('analyzing')

    try {
      // Simular progreso de procesamiento
      setTimeout(() => setProcessingStage('structuring'), 1000)
      setTimeout(() => setProcessingStage('formatting'), 2000)

      const response = await fetch('/api/generate-cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: description.trim() }),
      })

      const result: AIProcessingResponse = await response.json()

      if (result.success) {
        setProcessingStage('complete')
        setTimeout(() => {
          // Priorizar datos bilingües si están disponibles
          if (result.bilingualData) {
            setBilingualData(result.bilingualData)
            setShowTemplateSelector(true)
          } else if (result.data) {
            // Fallback a datos legacy
            setCvData(result.data)
            saveCVData(description.trim(), result.data)
            setShowTemplateSelector(true)
          }
        }, 500)
      } else {
        setError(result.error || 'Error procesando la información')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error de conexión. Por favor, intenta nuevamente.'
      setError(errorMessage)
      console.error('Error:', err)
    } finally {
      setTimeout(() => setIsProcessing(false), 3000)
    }
  }

  const handleDownloadPDF = async () => {
    let success = false

    // Si hay datos bilingües, descargar ambas versiones
    if (hasData && bilingualData) {
      success = await generateAndDownloadBilingualPDF(bilingualData, selectedTemplate)
      if (success) {
        // Mostrar mensaje específico para descarga dual
        setTimeout(() => {
          alert('CVs descargados exitosamente en español e inglés. Tus datos han sido eliminados por privacidad.')
          // Limpiar y redirigir al inicio
          clearSession()
          setBilingualData(null)
          handleHome()
        }, 1000)
      }
    } else {
      // Fallback a descarga simple para datos legacy
      const dataToUse = cvData
      if (!dataToUse) return

      success = await generateAndDownloadPDF(dataToUse, selectedTemplate)
      if (success) {
        // Mostrar mensaje para descarga simple
        setTimeout(() => {
          alert('CV descargado exitosamente. Tus datos han sido eliminados por privacidad.')
          // Limpiar y redirigir al inicio
          clearSession()
          handleHome()
        }, 1000)
      }
    }

    if (!success) {
      alert('Error al generar el PDF. Por favor, intenta nuevamente.')
    }
  }

  const handleEditCV = () => {
    setCvData(null)
    setBilingualData(null)
    setError(null)
    setShowTemplateSelector(false)
    // Limpiar la sesión para forzar nueva generación cuando se edite
    clearSession()
  }

  const handleTemplateSelect = (template: CVTemplate) => {
    setSelectedTemplate(template)
  }

  const handleContinueWithTemplate = () => {
    setShowTemplateSelector(false)
  }

  const handleChangeTemplate = () => {
    setShowTemplateSelector(true)
  }

  const handleHome = () => {
    setCvData(null)
    setBilingualData(null)
    setError(null)
    setShowTemplateSelector(false)
    setDescription('')
    setHasInitialLoad(false)
    // Limpiar la sesión de localStorage
    clearSession()
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Decorative Flowers */}
      <DecorativeFlowers />

      {/* Header */}
      <header className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Título siempre visible */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <FileText className="h-10 w-10 text-black" />
            <h1 className="headline text-black">
              micv.pro
            </h1>
          </div>

          {/* Texto promocional - Solo mostrar si no hay CV generado */}
          {!((hasData && getCurrentCV()) || cvData) && (
            <>
              <h2 className="headline text-black mb-6 max-w-3xl mx-auto leading-tight">
                Crea tu currículum profesional con inteligencia artificial
              </h2>
              <p className="subheadline text-gray-600 max-w-2xl mx-auto mb-8">
                Describe tu experiencia en lenguaje natural y obtén un CV listo para descargar en segundos
              </p>
              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold rounded-lg"
                  onClick={() => {
                    const formElement = document.querySelector('#main-form');
                    formElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Comenzar gratis
                </Button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16 relative z-10">
        {isProcessing ? (
          <ProcessingStatus stage={processingStage} />
        ) : showTemplateSelector && ((hasData && getCurrentCV()) || cvData) ? (
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onTemplateSelect={handleTemplateSelect}
            onContinue={handleContinueWithTemplate}
          />
        ) : (hasData && getCurrentCV()) || cvData ? (
          <div className="space-y-6">
            {/* Language Toggle integrado - Solo mostrar si hay datos bilingües */}
            <CVPreview
              data={getCurrentCV() ? convertAIDataToCVData(getCurrentCV()!) : cvData!}
              template={selectedTemplate}
              language={currentLanguage}
              onDownload={handleDownloadPDF}
              onEdit={handleEditCV}
              onChangeTemplate={handleChangeTemplate}
              onHome={handleHome}
              showLanguageToggle={!!(hasData && bilingualData)}
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
              isBilingual={!!(hasData && bilingualData)}
            />
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardHeader>
                <Sparkles className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle className="text-xl font-semibold">IA Avanzada</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Nuestra IA estructura automáticamente tu información profesional
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-xl font-semibold">100% Privado</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  No guardamos tu información personal. Todo se procesa localmente
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Download className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-xl font-semibold">Descarga Inmediata</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Obtén tu CV en formato PDF profesional en segundos
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <Card className="w-full max-w-4xl mx-auto" id="main-form">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold mb-4">
                Cuéntanos sobre tu experiencia profesional
              </CardTitle>
              <CardDescription className="text-lg">
                Escribe en lenguaje natural sobre tu trabajo, educación, habilidades y logros.
                Nuestra IA se encargará de estructurar toda la información.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Textarea
                    placeholder="Ejemplo: Soy desarrollador web con 3 años de experiencia. Trabajé en ABC Company como Frontend Developer desde 2021 hasta 2023, donde desarrollé aplicaciones React y mejoré el rendimiento del sitio web en un 40%. Estudié Ingeniería en Sistemas en la Universidad XYZ. Domino JavaScript, React, Node.js y tengo conocimientos de Python. También hablo inglés a nivel intermedio..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[200px] text-base"
                    disabled={isProcessing}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Mínimo 50 caracteres. Incluye información sobre tu trabajo, educación, habilidades e idiomas.
                  </p>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-md">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {hasActiveSession() && (
                  <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <p className="text-sm text-blue-600">
                      Tienes un CV guardado. Puedes editarlo o generar uno nuevo.
                    </p>
                  </div>
                )}

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={description.trim().length < 50 || isProcessing}
                    className="px-12 py-4 text-lg font-semibold rounded-lg"
                  >
                    {isProcessing ? (
                      <>
                        <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                        Procesando con IA...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generar CV con IA
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Trust Section */}
          <div className="mt-20 text-center">
            <p className="caption text-gray-500 mb-8 uppercase tracking-wider font-medium">
              Confiado por más de 10,000 profesionales de empresas líderes
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 opacity-60">
              <div className="text-gray-400 font-semibold text-base md:text-lg">Google</div>
              <div className="text-gray-400 font-semibold text-base md:text-lg">Microsoft</div>
              <div className="text-gray-400 font-semibold text-base md:text-lg">Amazon</div>
              <div className="text-gray-400 font-semibold text-base md:text-lg">Meta</div>
              <div className="text-gray-400 font-semibold text-base md:text-lg hidden sm:block">Apple</div>
              <div className="text-gray-400 font-semibold text-base md:text-lg hidden sm:block">Netflix</div>
              <div className="text-gray-400 font-semibold text-base md:text-lg hidden md:block">Spotify</div>
              <div className="text-gray-400 font-semibold text-base md:text-lg hidden md:block">Uber</div>
            </div>
          </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 relative z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-gray-600">
            <p className="mb-3 text-lg font-semibold">
              <strong className="text-black">micv.pro</strong> - Generador de CV con Inteligencia Artificial
            </p>
            <p className="body-text">
              Gratuito • Sin registro • Privado • Descarga inmediata
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
