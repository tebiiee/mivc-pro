// Removed unused import
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CVTemplate, CV_TEMPLATES } from '@/types/templates'
import { Check } from 'lucide-react'

interface TemplateSelectorProps {
  selectedTemplate: CVTemplate
  onTemplateSelect: (template: CVTemplate) => void
  onContinue: () => void
}

export function TemplateSelector({ selectedTemplate, onTemplateSelect, onContinue }: TemplateSelectorProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Elige una plantilla para tu CV</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Selecciona el diseño que mejor represente tu estilo profesional
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {CV_TEMPLATES.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedTemplate.id === template.id 
                ? 'ring-2 ring-primary shadow-lg' 
                : 'hover:shadow-md'
            }`}
            onClick={() => onTemplateSelect(template)}
          >
            <CardHeader className="pb-3">
              <div className="relative">
                {/* Preview mockup */}
                <div 
                  className="w-full h-32 rounded-md border-2 border-gray-200 flex flex-col"
                  style={{ backgroundColor: template.colors.background }}
                >
                  {/* Header mockup */}
                  <div 
                    className="h-8 w-full rounded-t-sm"
                    style={{ backgroundColor: template.colors.primary }}
                  />
                  {/* Content mockup */}
                  <div className="flex-1 p-2 space-y-1">
                    <div 
                      className="h-1 w-3/4 rounded"
                      style={{ backgroundColor: template.colors.text }}
                    />
                    <div 
                      className="h-1 w-1/2 rounded"
                      style={{ backgroundColor: template.colors.secondary }}
                    />
                    <div 
                      className="h-1 w-2/3 rounded"
                      style={{ backgroundColor: template.colors.accent }}
                    />
                  </div>
                </div>
                
                {/* Selected indicator */}
                {selectedTemplate.id === template.id && (
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </div>
              
              <CardTitle className="text-lg">{template.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm">
                {template.description}
              </CardDescription>
              
              {/* Color palette */}
              <div className="flex gap-1 mt-3">
                <div 
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: template.colors.primary }}
                  title="Color principal"
                />
                <div 
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: template.colors.secondary }}
                  title="Color secundario"
                />
                <div 
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: template.colors.accent }}
                  title="Color de acento"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <Button onClick={onContinue} size="lg" className="px-8">
          Continuar con esta plantilla
        </Button>
      </div>
    </div>
  )
}
