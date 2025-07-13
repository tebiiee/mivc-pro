import { NextRequest, NextResponse } from 'next/server'
import { CVData } from '@/types/cv'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

const SYSTEM_PROMPT = `Eres un experto de élite en recursos humanos y un maestro en la creación de currículums vitae de alto impacto. Tu misión es transformar la descripción en lenguaje natural de la experiencia profesional de un usuario en un currículum vitae estructurado en formato JSON, optimizado para la máxima calidad y visibilidad ante reclutadores y sistemas ATS (Applicant Tracking Systems).

OBJETIVO PRINCIPAL: Producir un CV que no solo sea preciso, sino que también destaque los logros, el impacto y el valor del candidato, utilizando las mejores prácticas de la industria.

INSTRUCCIONES CLAVE PARA LA EXCELENCIA:

1. Extracción y Relevancia Estratégica:
   - Identifica y extrae solo la información más relevante y de alto valor
   - Transforma las responsabilidades en logros cuantificables y orientados a resultados
   - Prioriza el impacto sobre la simple descripción de tareas

2. Inferencia y Precisión de Fechas:
   - Si las fechas no son exactas, infiérelas de manera lógica (ej: "principios de 2020" -> "2020-01")
   - Asegura la coherencia temporal en todas las secciones

3. Categorización Inteligente de Habilidades:
   - Clasifica las habilidades de forma lógica: "Habilidades Técnicas", "Herramientas de Software", "Habilidades Blandas", "Metodologías"
   - Asigna niveles de competencia realistas y consistentes

4. Descripciones Profesionales y de Alto Impacto:
   - Utiliza verbos de acción potentes al inicio de cada logro
   - Cuantifica los logros con números, porcentajes, cifras (ej: "Aumentó las ventas en un 15%")
   - Mantén las descripciones concisas, claras y enfocadas en el valor aportado
   - Evita pronombres personales ("Yo", "Mi")

5. Generación de IDs Únicos:
   - Crea IDs únicos y legibles (ej: "exp_001", "edu_001", "skill_001")

6. Manejo Inteligente de Información Faltante:
   - Si falta información crucial, infiere valores profesionales y razonables
   - No inventes información que no pueda ser inferida de manera creíble

FORMATO DE RESPUESTA (JSON - ESTRICTO):
{
  "personalInfo": {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "summary": "string (Resumen profesional conciso y convincente, destacando experiencia clave y aspiraciones)",
    "linkedin": "string (opcional)",
    "website": "string (opcional)"
  },
  "summary": "string (Resumen profesional general del CV, más detallado que el del personalInfo)",
  "experience": [
    {
      "id": "string",
      "company": "string",
      "position": "string",
      "location": "string (opcional - ciudad, país)",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "current": boolean,
      "description": "string (Descripción general del rol, concisa y orientada al impacto)",
      "achievements": [
        "string (Verbo de acción + logro cuantificable + impacto. Ej: 'Lideré la implementación de X, resultando en un aumento del Y% en Z.')"
      ],
      "responsibilities": [
        "string (Lista de responsabilidades clave, usando verbos de acción)"
      ]
    }
  ],
  "education": [
    {
      "id": "string",
      "institution": "string",
      "degree": "string",
      "field": "string",
      "location": "string (opcional - ciudad, país)",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "current": boolean,
      "gpa": "string (opcional)",
      "description": "string (opcional - Destacar honores, proyectos relevantes o logros académicos)",
      "details": "string (opcional - información adicional como honores, menciones especiales)"
    }
  ],
  "skills": [
    {
      "id": "string",
      "name": "string",
      "level": "Básico|Intermedio|Avanzado|Experto",
      "category": "string (Ej: 'Habilidades Técnicas', 'Habilidades Blandas', 'Herramientas', 'Metodologías')"
    }
  ],
  "languages": [
    {
      "id": "string", 
      "name": "string",
      "level": "Básico|Intermedio|Avanzado|Nativo"
    }
  ],
  "projects": [
    {
      "id": "string",
      "name": "string",
      "description": "string (Descripción del proyecto, destacando el problema resuelto, tu rol y el impacto/resultado)",
      "technologies": ["string (Tecnologías clave utilizadas)"],
      "url": "string (opcional)",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM (opcional)"
    }
  ]
}

Responde ÚNICAMENTE con el JSON válido, sin texto adicional ni explicaciones. Tu objetivo es que cada campo del JSON refleje la máxima calidad y profesionalismo de un CV excepcional.`

export async function POST(request: NextRequest) {
  try {
    const { description } = await request.json()

    // Log para debugging
    console.log(`[${new Date().toISOString()}] Nueva solicitud de CV - Longitud: ${description?.length || 0} caracteres`)

    if (!description || description.trim().length < 50) {
      return NextResponse.json(
        { success: false, error: 'La descripción debe tener al menos 50 caracteres' },
        { status: 400 }
      )
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'API key no configurada' },
        { status: 500 }
      )
    }

    // Función para hacer la solicitud con retry
    const makeRequest = async (retryCount = 0): Promise<Response> => {
      console.log(`[${new Date().toISOString()}] Enviando request a OpenRouter (intento ${retryCount + 1})`)

      const response = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://micv.pro',
          'X-Title': 'micv.pro'
        },
        body: JSON.stringify({
          model: 'google/gemini-2.0-flash-exp:free',
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT
            },
            {
              role: 'user',
              content: `Analiza la siguiente descripción y estructura la información en el formato JSON requerido:\n\n${description}`
            }
          ],
          temperature: 0.3,
          max_tokens: 2000
        })
      })

      // Si es error 429 y tenemos reintentos disponibles, esperar y reintentar
      if (response.status === 429 && retryCount < 2) {
        const waitTime = Math.pow(2, retryCount) * 1000 // Backoff exponencial: 1s, 2s
        await new Promise(resolve => setTimeout(resolve, waitTime))
        return makeRequest(retryCount + 1)
      }

      return response
    }

    const response = await makeRequest()

    if (!response.ok) {
      const errorText = await response.text()
      if (response.status === 429) {
        throw new Error('Límite de solicitudes alcanzado. Por favor, espera unos minutos antes de intentar nuevamente.')
      }
      throw new Error(`Error de OpenRouter (${response.status}): ${errorText}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content

    if (!aiResponse) {
      throw new Error('No se recibió respuesta de la IA')
    }

    // Intentar parsear la respuesta JSON
    let cvData: CVData
    try {
      cvData = JSON.parse(aiResponse)
    } catch {
      // Si falla el parsing, intentar extraer JSON del texto
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        cvData = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('La IA no devolvió un JSON válido')
      }
    }

    // Validar estructura básica
    if (!cvData.personalInfo || !cvData.experience || !cvData.education || !cvData.skills) {
      throw new Error('Estructura de datos incompleta')
    }

    return NextResponse.json({
      success: true,
      data: cvData
    })

  } catch (error) {
    console.error('Error procesando CV:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error interno del servidor'
      },
      { status: 500 }
    )
  }
}
