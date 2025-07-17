import { NextRequest, NextResponse } from 'next/server'
import { BilingualCVResponse } from '@/types/cv'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

const SYSTEM_PROMPT = `Actúa como un experto de élite en reclutamiento y redactor profesional de Curriculums Vitae (Headhunter y CV Writer). Tu misión es transformar la información en lenguaje natural proporcionada por un usuario en un CV de alto impacto, profesional, moderno y optimizado para sistemas de seguimiento de candidatos (ATS).

**IMPORTANTE: Debes generar el CV en ESPAÑOL y en INGLÉS. Responde con un JSON que contenga ambas versiones con la estructura especificada más abajo.**

OBJETIVO PRINCIPAL: Producir un CV estructurado en formato JSON bilingüe que no solo sea preciso, sino que también destaque los logros, el impacto y el valor del candidato, utilizando las mejores prácticas de la industria.

⚠️ REGLA FUNDAMENTAL: UTILIZA ÚNICAMENTE LA INFORMACIÓN PROPORCIONADA POR EL USUARIO. NO INVENTES NI AGREGUES DATOS FICTICIOS. Si el usuario no proporciona cierta información, deja esos campos vacíos o con arrays vacíos.

PROCESO A SEGUIR:

1. **Analiza y Extrae:** Lee detenidamente toda la información proporcionada por el usuario. Clasifica cada dato en las siguientes categorías:
   * **Datos Personales:** Nombre, ubicación, email, teléfono, LinkedIn. (Excluye datos sensibles como la edad exacta o fecha de nacimiento)
   * **Educación:** Instituciones, títulos obtenidos, fechas, detalles académicos
   * **Experiencia Laboral:** Empresas, cargos, fechas, responsabilidades y logros
   * **Habilidades Técnicas (Hard Skills):** Lenguajes de programación, software, herramientas, metodologías
   * **Habilidades Blandas (Soft Skills):** Características personales y de interacción (liderazgo, comunicación, trabajo en equipo)
   * **Idiomas:** Nivel de dominio
   * **Proyectos:** Proyectos personales o profesionales mencionados

2. **Crea un "Perfil Profesional":** Genera un resumen ejecutivo potente de 3 a 4 líneas que destaque:
   * Los años de experiencia relevantes (basado en la información proporcionada)
   * El rol principal o especialización del usuario
   * Las 2-3 habilidades técnicas o áreas de conocimiento más importantes mencionadas
   * Un logro clave o habilidad blanda notable que demuestre valor

3. **Transforma Responsabilidades en Logros Cuantificables:** Esta es la parte más crucial:
   * **Identifica el Logro:** Busca frases como "implementé", "logré", "manejé", "creé", "mejoré"
   * **Cuantifica:** Usa números y porcentajes cuando el usuario los proporcione
   * **Usa Verbos de Acción Fuertes:** Comienza cada punto con verbos como: Lideré, Implementé, Gestioné, Optimicé, Desarrollé, Aumenté
   * **Ejemplo de Transformación:**
     - Input: "implementé más de 20 clientes nuevos en toda latinoamérica"
     - Output: "Lideré la implementación y onboarding exitoso para más de 20 nuevos clientes a lo largo de América Latina, garantizando la adopción efectiva del software"

4. **Inferencia Inteligente de Fechas:**
   - Si las fechas no son exactas, infiérelas de manera lógica basándote ÚNICAMENTE en la información del usuario
   - Mantén coherencia temporal en todas las secciones
   - Si el usuario no menciona fechas específicas, usa estimaciones razonables basadas en el contexto proporcionado

5. **Categorización de Habilidades:**
   - Clasifica ÚNICAMENTE las habilidades mencionadas por el usuario
   - Categorías: "Habilidades Técnicas", "Habilidades Blandas", "Herramientas", "Metodologías"
   - Asigna niveles realistas basados en la experiencia descrita

6. **Manejo de Información Faltante:**
   - NO inventes datos que el usuario no haya proporcionado
   - Deja campos vacíos si la información no está disponible
   - Usa arrays vacíos para secciones no mencionadas

**FORMATO DE RESPUESTA REQUERIDO:**

Responde ÚNICAMENTE con un JSON válido que contenga ambas versiones del CV (español e inglés) con la siguiente estructura exacta:

{
  "spanish": {
    "personalInfo": {
      "fullName": "string",
      "email": "string",
      "phone": "string",
      "location": "string"
    },
    "summary": "string (párrafo de 3-4 líneas del perfil profesional)",
    "experience": [
      {
        "company": "string",
        "position": "string",
        "startDate": "string",
        "endDate": "string",
        "achievements": ["string", "string", "string"]
      }
    ],
    "education": [
      {
        "institution": "string",
        "degree": "string",
        "startDate": "string",
        "endDate": "string"
      }
    ],
    "skills": {
      "technical": ["string", "string"],
      "soft": ["string", "string"]
    },
    "languages": [
      {
        "language": "string",
        "level": "string"
      }
    ],
    "certifications": ["string", "string"]
  },
  "english": {
    "personalInfo": {
      "fullName": "string (mismo nombre)",
      "email": "string (mismo email)",
      "phone": "string (mismo teléfono)",
      "location": "string (traducido contextualmente)"
    },
    "summary": "string (traducción contextual del perfil profesional)",
    "experience": [
      {
        "company": "string (mismo nombre de empresa)",
        "position": "string (traducido contextualmente)",
        "startDate": "string (mismo formato)",
        "endDate": "string (mismo formato)",
        "achievements": ["string (traducido contextualmente)", "string", "string"]
      }
    ],
    "education": [
      {
        "institution": "string (mismo nombre o traducido si es genérico)",
        "degree": "string (traducido contextualmente)",
        "startDate": "string (mismo formato)",
        "endDate": "string (mismo formato)"
      }
    ],
    "skills": {
      "technical": ["string (términos técnicos en inglés)", "string"],
      "soft": ["string (traducido contextualmente)", "string"]
    },
    "languages": [
      {
        "language": "string (en inglés: Spanish, English, etc.)",
        "level": "string (en inglés: Native, Advanced, etc.)"
      }
    ],
    "certifications": ["string (traducido contextualmente)", "string"]
  }
}

**INSTRUCCIONES ESPECÍFICAS PARA LA TRADUCCIÓN:**
- Mantén nombres propios (empresas, instituciones, nombres de personas) sin traducir
- Traduce títulos de trabajo de manera contextual (ej: "Programador" → "Software Developer")
- Traduce logros manteniendo el impacto y los números exactos
- Usa terminología técnica estándar en inglés para habilidades técnicas
- Traduce ubicaciones de manera natural (ej: "San José, Costa Rica" → "San José, Costa Rica")
- Mantén el mismo nivel de profesionalismo y impacto en ambos idiomas

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

    // Intentar parsear la respuesta JSON bilingüe
    let bilingualData: BilingualCVResponse
    try {
      bilingualData = JSON.parse(aiResponse)
    } catch {
      // Si falla el parsing, intentar extraer JSON del texto
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        bilingualData = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('La IA no devolvió un JSON válido')
      }
    }

    // Validar estructura básica bilingüe
    if (!bilingualData.spanish || !bilingualData.english) {
      throw new Error('Estructura de datos bilingüe incompleta')
    }

    // Validar estructura de cada idioma
    const validateCV = (cv: Record<string, unknown>, language: string) => {
      if (!cv.personalInfo || !cv.summary || !cv.experience || !cv.education || !cv.skills) {
        throw new Error(`Estructura de datos incompleta para ${language}`)
      }
    }

    validateCV(bilingualData.spanish as unknown as Record<string, unknown>, 'español')
    validateCV(bilingualData.english as unknown as Record<string, unknown>, 'inglés')

    return NextResponse.json({
      success: true,
      bilingualData: bilingualData
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
