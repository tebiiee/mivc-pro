import { Card, CardContent } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Sparkles, FileText, Palette, Download } from 'lucide-react'

interface ProcessingStatusProps {
  stage: 'analyzing' | 'structuring' | 'formatting' | 'complete'
}

export function ProcessingStatus({ stage }: ProcessingStatusProps) {
  const stages = [
    {
      id: 'analyzing',
      title: 'Analizando información',
      description: 'La IA está procesando tu descripción profesional',
      icon: Sparkles,
    },
    {
      id: 'structuring', 
      title: 'Estructurando datos',
      description: 'Organizando tu experiencia en secciones profesionales',
      icon: FileText,
    },
    {
      id: 'formatting',
      title: 'Aplicando formato',
      description: 'Preparando tu CV con el diseño seleccionado',
      icon: Palette,
    },
    {
      id: 'complete',
      title: 'CV generado',
      description: '¡Tu currículum está listo para descargar!',
      icon: Download,
    },
  ]

  const currentStageIndex = stages.findIndex(s => s.id === stage)

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold mb-2">Generando tu CV profesional</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Nuestro sistema de IA está trabajando en tu currículum
          </p>
        </div>

        <div className="space-y-6">
          {stages.map((stageItem, index) => {
            const isActive = index === currentStageIndex
            const isCompleted = index < currentStageIndex
            const Icon = stageItem.icon

            return (
              <div key={stageItem.id} className="flex items-center gap-4">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isCompleted
                      ? 'bg-green-100 border-green-500 text-green-600'
                      : isActive
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                  }`}
                >
                  {isActive ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>

                <div className="flex-1">
                  <h4
                    className={`font-medium ${
                      isCompleted || isActive
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {stageItem.title}
                  </h4>
                  <p
                    className={`text-sm ${
                      isCompleted || isActive
                        ? 'text-gray-600 dark:text-gray-300'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {stageItem.description}
                  </p>
                </div>

                {isCompleted && (
                  <div className="text-green-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStageIndex + 1) / stages.length) * 100}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">
            {Math.round(((currentStageIndex + 1) / stages.length) * 100)}% completado
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
