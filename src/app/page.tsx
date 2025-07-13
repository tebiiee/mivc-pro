'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { FileText, Sparkles, Download, Shield, AlertCircle } from 'lucide-react'
import { CVData, AIProcessingResponse } from '@/types/cv'
import { CVTemplate, CV_TEMPLATES } from '@/types/templates'
import { CVPreview } from '@/components/cv-preview'
import { TemplateSelector } from '@/components/template-selector'
import { ProcessingStatus } from '@/components/processing-status'
import { generateAndDownloadPDF } from '@/lib/pdf-utils'

export default function Home() {
  const [description, setDescription] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [cvData, setCvData] = useState<CVData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<CVTemplate>(CV_TEMPLATES[0])
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [processingStage, setProcessingStage] = useState<'analyzing' | 'structuring' | 'formatting' | 'complete'>('analyzing')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim() || description.trim().length < 50) return

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

      if (result.success && result.data) {
        setProcessingStage('complete')
        setTimeout(() => {
          setCvData(result.data!)
          setShowTemplateSelector(true)
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
    if (!cvData) return

    const success = await generateAndDownloadPDF(cvData, selectedTemplate)
    if (!success) {
      alert('Error al generar el PDF. Por favor, intenta nuevamente.')
    }
  }

  const handleEditCV = () => {
    setCvData(null)
    setError(null)
    setShowTemplateSelector(false)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              micv.pro
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Crea tu currículum profesional con inteligencia artificial
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Describe tu experiencia en lenguaje natural y obtén un CV listo para descargar
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        {isProcessing ? (
          <ProcessingStatus stage={processingStage} />
        ) : cvData && showTemplateSelector ? (
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onTemplateSelect={handleTemplateSelect}
            onContinue={handleContinueWithTemplate}
          />
        ) : cvData ? (
          <CVPreview
            data={cvData}
            template={selectedTemplate}
            onDownload={handleDownloadPDF}
            onEdit={handleEditCV}
            onChangeTemplate={handleChangeTemplate}
          />
        ) : (
          <div className="max-w-4xl mx-auto">
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="text-center">
                <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">IA Avanzada</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Nuestra IA estructura automáticamente tu información profesional
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">100% Privado</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  No guardamos tu información personal. Todo se procesa localmente
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Download className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Descarga Inmediata</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Obtén tu CV en formato PDF profesional en segundos
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Cuéntanos sobre tu experiencia profesional
              </CardTitle>
              <CardDescription className="text-center">
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
                  <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                    <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={description.trim().length < 50 || isProcessing}
                    className="px-8"
                  >
                    {isProcessing ? (
                      <>
                        <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                        Procesando con IA...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generar CV con IA
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="mb-2">
              <strong>micv.pro</strong> - Generador de CV con Inteligencia Artificial
            </p>
            <p className="text-sm">
              Gratuito • Sin registro • Privado • Descarga inmediata
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
