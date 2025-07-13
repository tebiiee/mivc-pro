import { NextRequest, NextResponse } from 'next/server'
import { CVData } from '@/types/cv'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

const SYSTEM_PROMPT = `Eres un experto de élite en recursos humanos y un maestro en la creación de currículums vitae de alto impacto. Tu misión es transformar la descripción en lenguaje natural de la experiencia profesional de un usuario en un currículum vitae estructurado en formato JSON, optimizado para la máxima calidad y visibilidad ante reclutadores y sistemas ATS (Applicant Tracking Systems).

OBJETIVO PRINCIPAL: Producir un CV que no solo sea preciso, sino que también destaque los logros, el impacto y el valor del candidato, utilizando las mejores prácticas de la industria.

⚠️ REGLA FUNDAMENTAL: UTILIZA ÚNICAMENTE LA INFORMACIÓN PROPORCIONADA POR EL USUARIO. NO INVENTES NI AGREGUES DATOS FICTICIOS. Si el usuario no proporciona cierta información, deja esos campos vacíos o con arrays vacíos.

INSTRUCCIONES CLAVE PARA LA EXCELENCIA:

1. Extracción y Relevancia Estratégica:
   - Identifica y extrae ÚNICAMENTE la información proporcionada por el usuario
   - Transforma las responsabilidades mencionadas en logros cuantificables cuando sea posible
   - Prioriza el impacto sobre la simple descripción de tareas
   - NO agregues experiencias, educación o habilidades que el usuario no haya mencionado

2. Inferencia y Precisión de Fechas:
   - Si las fechas no son exactas, infiérelas de manera lógica SOLO basándote en la información del usuario
   - Si el usuario no menciona fechas específicas, usa estimaciones razonables basadas en el contexto
   - Asegura la coherencia temporal en todas las secciones

3. Categorización Inteligente de Habilidades:
   - Clasifica ÚNICAMENTE las habilidades mencionadas por el usuario
   - Categorías: "Habilidades Técnicas", "Herramientas de Software", "Habilidades Blandas", "Metodologías", "Idiomas"
   - Asigna niveles de competencia basados en lo que el usuario indica o implica

4. Descripciones Profesionales y de Alto Impacto:
   - Utiliza verbos de acción potentes al inicio de cada logro
   - Cuantifica los logros con números, porcentajes, cifras cuando el usuario los proporcione
   - Mantén las descripciones concisas, claras y enfocadas en el valor aportado
   - Evita pronombres personales ("Yo", "Mi")

5. Generación de IDs Únicos:
   - Crea IDs únicos y legibles (ej: "exp_001", "edu_001", "skill_001")

6. Manejo de Información Faltante:
   - Si el usuario no proporciona información personal completa, deja los campos opcionales vacíos
   - NO inventes nombres de empresas, universidades, o cualquier dato específico
   - Si faltan datos cruciales, usa arrays vacíos o strings vacíos según corresponda

FORMATO DE RESPUESTA (JSON - ESTRICTO):
{
  "personalInfo": {
    "fullName": "string (OBLIGATORIO - extraer del texto del usuario)",
    "email": "string (solo si el usuario lo menciona, sino string vacío)",
    "phone": "string (solo si el usuario lo menciona, sino string vacío)",
    "location": "string (solo si el usuario lo menciona, sino string vacío)",
    "summary": "string (Resumen profesional basado en la información del usuario)",
    "linkedin": "string (solo si el usuario lo menciona, sino string vacío)",
    "website": "string (solo si el usuario lo menciona, sino string vacío)"
  },
  "summary": "string (Resumen profesional basado únicamente en la información proporcionada por el usuario)",
  "experience": [
    {
      "id": "string (generar ID único como exp_001, exp_002, etc.)",
      "company": "string (SOLO empresas mencionadas por el usuario)",
      "position": "string (SOLO posiciones mencionadas por el usuario)",
      "location": "string (solo si el usuario lo menciona, sino string vacío)",
      "startDate": "YYYY-MM (inferir basándose en la información del usuario)",
      "endDate": "YYYY-MM (inferir basándose en la información del usuario, o string vacío si es trabajo actual)",
      "current": boolean (true solo si el usuario indica que es su trabajo actual),
      "description": "string (Descripción basada en lo que el usuario describe de ese trabajo)",
      "achievements": [
        "string (Solo logros mencionados por el usuario, reformulados profesionalmente)"
      ],
      "responsibilities": [
        "string (Solo responsabilidades mencionadas por el usuario, usando verbos de acción)"
      ]
    }
  ],
  "education": [
    {
      "id": "string (generar ID único como edu_001, edu_002, etc.)",
      "institution": "string (SOLO instituciones mencionadas por el usuario)",
      "degree": "string (SOLO títulos mencionados por el usuario)",
      "field": "string (SOLO campos de estudio mencionados por el usuario)",
      "location": "string (solo si el usuario lo menciona, sino string vacío)",
      "startDate": "YYYY-MM (inferir basándose en la información del usuario)",
      "endDate": "YYYY-MM (inferir basándose en la información del usuario)",
      "current": boolean (true solo si el usuario indica que está estudiando actualmente),
      "gpa": "string (solo si el usuario lo menciona, sino string vacío)",
      "description": "string (solo información académica mencionada por el usuario)",
      "details": "string (solo detalles mencionados por el usuario como honores, etc.)"
    }
  ],
  "skills": [
    {
      "id": "string (generar ID único como skill_001, skill_002, etc.)",
      "name": "string (SOLO habilidades mencionadas por el usuario)",
      "level": "Básico|Intermedio|Avanzado|Experto (inferir del contexto que proporciona el usuario)",
      "category": "string (categorizar las habilidades mencionadas: 'Habilidades Técnicas', 'Habilidades Blandas', 'Herramientas', 'Metodologías')"
    }
  ],
  "languages": [
    {
      "id": "string (generar ID único como lang_001, lang_002, etc.)",
      "name": "string (SOLO idiomas mencionados por el usuario)",
      "level": "Básico|Intermedio|Avanzado|Nativo (basado en lo que indica el usuario)"
    }
  ],
  "projects": [
    {
      "id": "string (generar ID único como proj_001, proj_002, etc.)",
      "name": "string (SOLO proyectos mencionados por el usuario)",
      "description": "string (SOLO descripción basada en lo que el usuario cuenta del proyecto)",
      "technologies": ["string (SOLO tecnologías mencionadas por el usuario para ese proyecto)"],
      "url": "string (solo si el usuario proporciona URL, sino string vacío)",
      "startDate": "YYYY-MM (inferir del contexto del usuario)",
      "endDate": "YYYY-MM (inferir del contexto del usuario, string vacío si es proyecto actual)"
    }
  ]
}

IMPORTANTE:
- Si el usuario no menciona cierta información (email, teléfono, proyectos, etc.), deja esos campos como strings vacíos o arrays vacíos según corresponda
- NO inventes datos que el usuario no haya proporcionado
- Basa TODA la información únicamente en lo que el usuario describe
- Si una sección está vacía porque el usuario no proporcionó esa información, está bien dejarla vacía

Responde ÚNICAMENTE con el JSON válido, sin texto adicional ni explicaciones.`

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
          model: 'google/gemini-2.5-flash-lite-preview-06-17',
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
