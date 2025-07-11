import { NextRequest, NextResponse } from 'next/server'
import { CVData } from '@/types/cv'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

const SYSTEM_PROMPT = `Eres un experto en recursos humanos y creación de currículums vitae profesionales. Tu tarea es analizar la descripción en lenguaje natural que proporciona el usuario sobre su experiencia profesional y estructurarla en un formato JSON específico para un CV.

INSTRUCCIONES IMPORTANTES:
1. Extrae y organiza toda la información relevante del texto de manera profesional
2. Infiere fechas aproximadas si no se proporcionan exactas (usa formato YYYY-MM)
3. Categoriza las habilidades por tipo (Técnicas, Blandas, Idiomas, Herramientas, etc.)
4. Crea descripciones profesionales, concisas y orientadas a resultados
5. Genera IDs únicos alfanuméricos para cada elemento (ej: "exp_001", "edu_001")
6. Si falta información importante, usa valores por defecto razonables pero profesionales
7. Mejora la redacción para que suene más profesional y atractiva para empleadores
8. Extrae logros cuantificables cuando sea posible (porcentajes, números, métricas)

FORMATO DE RESPUESTA (JSON):
{
  "personalInfo": {
    "name": "string",
    "email": "string",
    "phone": "string", 
    "location": "string",
    "summary": "string",
    "linkedin": "string (opcional)",
    "website": "string (opcional)"
  },
  "experience": [
    {
      "id": "string",
      "company": "string",
      "position": "string", 
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "current": boolean,
      "description": "string",
      "achievements": ["string"]
    }
  ],
  "education": [
    {
      "id": "string",
      "institution": "string",
      "degree": "string",
      "field": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM", 
      "current": boolean,
      "gpa": "string (opcional)",
      "description": "string (opcional)"
    }
  ],
  "skills": [
    {
      "id": "string",
      "name": "string",
      "level": "Básico|Intermedio|Avanzado|Experto",
      "category": "string"
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
      "description": "string",
      "technologies": ["string"],
      "url": "string (opcional)",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM (opcional)"
    }
  ]
}

Responde ÚNICAMENTE con el JSON válido, sin texto adicional.`

export async function POST(request: NextRequest) {
  try {
    const { description } = await request.json()

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

    if (!response.ok) {
      throw new Error(`Error de OpenRouter: ${response.status}`)
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
