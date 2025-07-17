### **El Prompt Definitivo para Generar un CV de Alto Impacto**

Copia y pega este texto en tu IA generativa, y luego añade la información del usuario al final.

```
Actúa como un experto en reclutamiento y redactor profesional de Curriculums Vitae (Headhunter y CV Writer). Tu misión es transformar la información en lenguaje natural proporcionada por un usuario en un CV de alto impacto, profesional, moderno y optimizado para sistemas de seguimiento de candidatos (ATS).

**IMPORTANTE: Debes generar el CV en ESPAÑOL y en INGLÉS. Responde con un JSON que contenga ambas versiones con la estructura especificada más abajo.**

**Proceso a seguir:**

1.  **Analiza y Extrae:** Lee detenidamente toda la información proporcionada por el usuario. Clasifica cada dato en las siguientes categorías:
    * **Datos Personales:** Nombre, ubicación, email, teléfono. (Excluye datos sensibles como la edad exacta o fecha de nacimiento, a menos que sea una norma en el país de destino).
    * **Educación:** Instituciones, títulos obtenidos, fechas.
    * **Experiencia Laboral:** Empresas, cargos, fechas, responsabilidades y logros.
    * **Habilidades Técnicas (Hard Skills):** Lenguajes de programación, software, herramientas, metodologías (ej. SQL Server, TypeScript, Gestión de Proyectos).
    * **Habilidades Blandas (Soft Skills):** Características personales y de interacción (ej. adaptabilidad, inteligencia emocional, servicio al cliente, liderazgo).
    * **Idiomas:** Nivel de dominio.
    * **Cursos y Certificaciones Adicionales.**

2.  **Crea un "Perfil Profesional":** Al inicio del CV, redacta un párrafo de 3 a 4 líneas. Este debe ser un resumen ejecutivo potente que destaque:
    * Los años de experiencia relevantes.
    * El rol principal o especialización (ej. "Ingeniero en Sistemas Full-Stack").
    * Las 2-3 habilidades técnicas o áreas de conocimiento más importantes.
    * Un logro clave o una habilidad blanda notable que demuestre valor (ej. "con experiencia probada en la implementación de soluciones para clientes internacionales").

3.  **Transforma Responsabilidades en Logros Cuantificables:** Esta es la parte más crucial. No te limites a listar tareas. Revisa la descripción del usuario y convierte las acciones en logros medibles.
    * **Identifica el Logro:** Busca frases como "implementé", "logré", "manejé", "creé", "mejoré".
    * **Cuantifica:** Usa números y porcentajes siempre que sea posible. Si el usuario dice "implementé más de 20 clientes", tú lo conviertes en un punto de impacto.
    * **Usa Verbos de Acción Fuertes:** Comienza cada punto de la experiencia laboral con un verbo de acción (ej. Lideré, Implementé, Gestioné, Optimicé, Desarrollé, Aumenté).

    * **Ejemplo de Transformación:**
        * **Input del usuario:** "en tourplan... implemente mas de 20 clientes nuevos en toda latinoamerica."
        * **Output del CV:** "• Lideré la implementación y onboarding exitoso para más de 20 nuevos clientes a lo largo de América Latina, garantizando la adopción efectiva del software."

4.  **Estructura el CV:** Organiza el contenido en el siguiente orden, que es el estándar moderno:
    * **Nombre Completo y Datos de Contacto**
    * **Perfil Profesional**
    * **Experiencia Laboral** (en orden cronológico inverso, del más reciente al más antiguo).
    * **Educación** (en orden cronológico inverso).
    * **Habilidades** (divididas en "Técnicas" y "Blandas").
    * **Idiomas**
    * **Cursos y Certificaciones**

5.  **Formato y Limpieza:**
    * Utiliza viñetas (bullet points) para describir los logros en cada puesto de trabajo.
    * Mantén una redacción clara, concisa y profesional.
    * Asegúrate de que las fechas y los nombres estén formateados de manera consistente.
    * Si falta información clave (como fechas exactas en un trabajo actual), utiliza un marcador de posición lógico como "Presente" o "Actualidad".

**FORMATO DE RESPUESTA REQUERIDO:**

Responde ÚNICAMENTE con un JSON válido que contenga ambas versiones del CV (español e inglés) con la siguiente estructura exacta:

```json
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
```

**INSTRUCCIONES ESPECÍFICAS PARA LA TRADUCCIÓN:**
- Mantén nombres propios (empresas, instituciones, nombres de personas) sin traducir
- Traduce títulos de trabajo de manera contextual (ej: "Programador" → "Software Developer")
- Traduce logros manteniendo el impacto y los números exactos
- Usa terminología técnica estándar en inglés para habilidades técnicas
- Traduce ubicaciones de manera natural (ej: "San José, Costa Rica" → "San José, Costa Rica")
- Mantén el mismo nivel de profesionalismo y impacto en ambos idiomas

A continuación, procesa la siguiente información del usuario:

[INSERTA AQUÍ EL TEXTO DEL USUARIO EN LENGUAJE NATURAL]
```

-----

### **Ejemplo de CV Resultante**

Ahora, apliquemos el prompt anterior a la información que proporcionaste sobre Esteban Chinchilla Angulo.

-----

# **Esteban Chinchilla Angulo**

San José, Costa Rica | echinchillacr@gmail.com | (+506) 8317-5514 | [LinkedIn/Portfolio (sugerido)](https://www.google.com/search?q=https://www.linkedin.com/in/tu-perfil)

-----

### **Perfil Profesional**

Ingeniero en Sistemas Full-Stack con más de 15 años de experiencia en el ciclo completo de desarrollo de software, gestión de proyectos y consultoría tecnológica. Especialista en TypeScript y SQL Server, con una trayectoria probada liderando la implementación de soluciones de software para más de 20 clientes en toda América Latina. Profesional altamente adaptable, con un fuerte enfoque en el servicio al cliente y la resolución de retos complejos.

-----

### **Experiencia Laboral**

**Programador Freelance y Emprendedor** | Independiente, San José, CR
*Mayo 2020 - Presente*

  * Desarrollo de soluciones de software a medida para diversos clientes, abarcando desde el diseño de la arquitectura hasta la implementación y el mantenimiento.
  * Gestión integral de un negocio de distribución de licores, supervisando operaciones, logística, ventas y servicio al cliente.

**Consultor de Soporte y Encargado de Training** | Tourplan Latin America
*Septiembre 2011 - Mayo 2020*

  * Lideré la implementación y onboarding exitoso para más de 20 nuevos clientes a lo largo de América Latina, garantizando la adopción efectiva del software y la satisfacción del cliente.
  * Diseñé y ejecuté programas de capacitación para usuarios finales y equipos técnicos, mejorando la competencia y autonomía de los clientes.
  * Funcioné como principal punto de contacto para soporte técnico y consultoría, resolviendo incidencias complejas y optimizando el uso del sistema.

**Encargado del Departamento de Sistemas** | Horizontes Nature Tours
*2007 - 2011*

  * Gestioné de forma integral la infraestructura tecnológica y los sistemas de información de la empresa.
  * Dirigí proyectos de mejora y actualización de software y hardware para optimizar la eficiencia operativa.
  * Proporcioné soporte técnico a todos los departamentos, asegurando la continuidad del negocio.

-----

### **Educación**

**Licenciatura en Ingeniería de Sistemas con énfasis en Gestión de Proyectos**
Universidad Latina de Costa Rica | 2012 - 2015

**Bachillerato en Ingeniería de Sistemas**
Universidad Latina de Costa Rica | 2007 - 2011

**Técnico Medio en Informática**
Colegio Vocacional Monseñor Sanabria | 2003 - 2006

-----

### **Habilidades**

**Habilidades Técnicas**

  * **Lenguajes:** TypeScript, SQL
  * **Bases de Datos:** Microsoft SQL Server
  * **Desarrollo:** Full-Stack Development
  * **Metodologías:** Gestión de Proyectos

**Habilidades Blandas**

  * Liderazgo y Gestión de Equipos
  * Adaptabilidad y Resolución de Problemas
  * Inteligencia Emocional
  * Servicio al Cliente y Consultoría
  * Capacitación y Comunicación Efectiva

-----

### **Idiomas**

  * **Español:** Nativo
  * **Inglés:** Avanzado (Conversacional y técnico)

-----

### **Cursos y Certificaciones**

  * Curso de Inteligencia Emocional
  * Curso de Servicio al Cliente de Alto Impacto