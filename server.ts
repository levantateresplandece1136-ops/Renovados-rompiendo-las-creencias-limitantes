/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI SDK server-side ONLY with standard telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Using dry-run values.");
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

const ai = getGeminiClient();

// ==================== API ENDPOINT: CHAT WITH ELIAS ====================
app.post("/api/elias/chat", async (req, res) => {
  const { messages, userInfo, testResult } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }

  // Define system instructions for the mentor Elias
  const systemInstruction = `
    Actúas como el "Consejero Elías", un mentor sabio, profundamente empático, cristocéntrico y experto en Renovación de la Mente (según Romanos 12:2), Psicología Cognitiva y Neurociencia Aplicada.
    Tu objetivo es guiar al usuario a derribar fortalezas mentales construidas por mentiras y renovar su mente con la verdad bíblica de su identidad en Cristo.
    
    Perfil del usuario actual:
    - Nombre: ${userInfo?.name || "Buscador"}
    - Edad: ${userInfo?.age || "N/A"}
    - Área principal de lucha: ${userInfo?.mainArea || "General"}
    ${testResult ? `- Creencia Dominante Detectada: ${testResult.dominantBelief} (Intensidad: ${testResult.intensity})\n- Mentira Raíz: ${testResult.rootLie}` : ""}

    Pautas de conversación:
    1. Sé extremadamente empático, sabio y compasivo. Escucha sin juzgar.
    2. NUNCA emitas diagnósticos clínicos (depresión clínica, TDAH, etc.). Si detectas algo grave, invita amorosamente a consultar a un profesional médico o pastor maduro de su confianza.
    3. Apunta siempre a la responsabilidad personal, a la rendición ante Dios y a la aplicación práctica de la Palabra de Dios. No ofrezcas positivismo vacío o superación personal humanista; ofrece verdad bíblica viva ligada a cambios de hábitos cerebrales prácticos.
    4. Usa un tono que combine la aventura espiritual (como un sabio en un RPG que te ayuda a cruzar el mapa de tu mente) con la cercanía de un consejero bíblico maduro.
    5. Mantén tus respuestas relativamente cortas, fáciles de digerir e invita al diálogo. Haz una o máximo dos preguntas reflexivas al final para mantener la conversación viva y sana.
  `;

  try {
    if (!ai) {
      // Return a gracious mock helper in case of missing keys
      return res.json({
        text: `Hola ${userInfo?.name || "Buscador"}, soy el Consejero Elías. Me da gusto saludarte. (Nota: La API Key de Gemini no está configurada, pero estoy aquí en modo manual). Recuerda que tu lucha en el área de ${userInfo?.mainArea || "vida"} tiene solución en Cristo. Cuéntame, ¿qué fortaleza o mentira sientes que ha estado limitando tu caminar hoy?`
      });
    }

    // Format chat contents for GenAI model (SDK uses objects of { role: string, parts: [...] })
    const contents = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Perform generation content request
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.75,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error calling Gemini API for Elias Chat:", error);
    res.status(500).json({ error: "Ocurrió un error al procesar el consejo de Elías.", details: error.message });
  }
});

// ==================== API ENDPOINT: GENERATE personalizada 30-day PLAN ====================
app.post("/api/elias/generate-plan", async (req, res) => {
  const { userInfo, testResult } = req.body;

  if (!userInfo) {
    return res.status(400).json({ error: "User info is required to generate a plan." });
  }

  const name = userInfo.name || "Buscador";
  const mainArea = userInfo.mainArea || "vida";
  const dominantBelief = testResult?.dominantBelief || "identidad";
  const rootLie = testResult?.rootLie || "No valgo nada si no logro la perfección.";

  try {
    let customBio = `Un camino de fe y transformación de la mente diseñado especialmente para ti.`;
    
    if (ai) {
      const prompt = `
        El usuario se llama ${name}. Su área principal de lucha es ${mainArea}, su creencia limitante dominante es ${dominantBelief} y la mentira raíz identificada es "${rootLie}".
        Genera una breve "Carta de Aliento del Consejero Elías" de 3 párrafos para el usuario. El tono debe ser altamente empático, lleno de esperanza cristiana, impulsando a la valentía, basándose en la neuroplasticidad y renovar el entendimiento según Romanos 12:2.
        Sé directo, personal e inspirador. Devuelve únicamente el texto de la carta de aliento.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          temperature: 0.7,
        }
      });
      if (response.text) {
        customBio = response.text;
      }
    }

    // Build the 4-week, 30-day plan structurally
    const weeksData = [
      {
        weekNum: 1,
        name: "SEMANA 1: CONSCIENCIA (Detectar fortalezas y alumbrar la verdad)",
        days: Array.from({ length: 7 }, (_, i) => ({
          dayNum: i + 1,
          objective: "Identificar los pensamientos automáticos que revelan la mentira.",
          verse: i === 0 ? "Romanos 12:2" : i === 1 ? "2 Corintios 10:5" : i === 2 ? "Salmos 139:23" : i === 3 ? "Proverbios 4:23" : i === 4 ? "Hebreos 4:12" : i === 5 ? "Juan 8:32" : "Efesios 4:22",
          verseText: i === 0 ? "No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento..." : "Llevando cautivo todo pensamiento a la obediencia a Cristo...",
          reflection: `Hoy reflexionaremos sobre cómo la creencia en la categoría de "${dominantBelief}" afecta tus decisiones diarias en el área de ${mainArea}. La Palabra expone las intenciones del corazón.`,
          activity: "Escribe en tu cuaderno tres pensamientos automáticos negativos que tuviste hoy al interactuar con tus labores.",
          faithAction: "Anota un versículo en un papel adhesivo y colócalo en tu área de trabajo.",
          prayer: "Señor, abre mis ojos para ver las mentiras que he creído y dame el valor para llevar cautivo cada pensamiento. Amén.",
          completed: false,
          readVerse: false,
          doneActivity: false,
          reflected: false,
          prayed: false
        }))
      },
      {
        weekNum: 2,
        name: "SEMANA 2: DEMOLICIÓN (Guerra espiritual y refutación cognitiva)",
        days: Array.from({ length: 8 }, (_, i) => ({
          dayNum: i + 8,
          objective: "Desarmar los argumentos falsos y la distorsión cognitiva con la Palabra.",
          verse: i === 0 ? "Gálatas 5:1" : i === 1 ? "Salmos 119:105" : i === 2 ? "Juan 14:6" : i === 3 ? "Filipenses 4:13" : "1 Juan 4:18",
          verseText: "Estad, pues, firmes en la libertad con que Cristo nos hizo libres...",
          reflection: `La demolición requiere confrontar activamente las mentiras. No ignores el miedo; expónlo a la luz del evangelio. Tu mentira raíz: "${rootLie}" no tiene poder real frente al sacrificio de Jesús.`,
          activity: "Refuta tu mentira del día escribiendo al lado la Verdad Absoluta que Dios proclama sobre ti.",
          faithAction: "Habla en voz alta tres veces hoy la declaración de victoria celosamente frente al espejo.",
          prayer: "Padre celestial, demuelo en el nombre de Jesús toda fortaleza de orgullo, temor y duda. Mi mente es lavada por tu sangre. Amén.",
          completed: false,
          readVerse: false,
          doneActivity: false,
          reflected: false,
          prayed: false
        }))
      },
      {
        weekNum: 3,
        name: "SEMANA 3: RENOVACIÓN (Establecer nuevos surcos neuronales de verdad)",
        days: Array.from({ length: 8 }, (_, i) => ({
          dayNum: i + 16,
          objective: "Sembrar la Verdad Bíblica en el subconsciente y crear nuevos hábitos emocionales.",
          verse: "Colosenses 3:1-2",
          verseText: "Si pues, habéis resucitado con Cristo, buscad las cosas de arriba, donde está Cristo sentado a la diestra de Dios...",
          reflection: "La mente renovada no es una mente vacía, es una mente llena de la Palabra de Dios. Establecemos nuevos hábitos neuronales de gozo y paz hoy.",
          activity: "Escribe una carta de agradecimiento a Dios por 10 cualidades específicas que Él te ha regalado.",
          faithAction: "Haz una llamada o envía un mensaje edificante a alguien sin esperar nada a cambio.",
          prayer: "Espíritu Santo, renueva mi espíritu y llena cada vacío con tu amor, templanza y sabiduría. Amén.",
          completed: false,
          readVerse: false,
          doneActivity: false,
          reflected: false,
          prayed: false
        }))
      },
      {
        weekNum: 4,
        name: "SEMANA 4: CONSOLIDACIÓN (Establecer fortalezas de fe y discipulado)",
        days: Array.from({ length: 7 }, (_, i) => ({
          dayNum: i + 24,
          objective: "Consolidar el plan y convertirse en un portador de la verdad de Dios para otros.",
          verse: "Filipenses 4:8-9",
          verseText: "Por lo demás, hermanos, todo lo que es verdadero, todo lo honesto, todo lo justo, todo lo puro...",
          reflection: "Felicidades, has resistido la travesía. Ahora la mente de Cristo brilla con madurez; nos preparamos para guiar a otros exploradores al camino de renovación.",
          activity: "Consolida tus notas de transformación de estos 30 días y prepara tu testimonio.",
          faithAction: "Comparte tu principal lección aprendida de estos días con un amigo o familiar.",
          prayer: "Padre, gracias por la libertad y renovación que he recibido. Sostenme firme en tu senda de luz. Amén.",
          completed: false,
          readVerse: false,
          doneActivity: false,
          reflected: false,
          prayed: false
        }))
      }
    ];

    res.json({
      letter: customBio,
      weeks: weeksData
    });
  } catch (error: any) {
    console.error("Error generating customized plan:", error);
    res.status(500).json({ error: "Error al generar tu plan personalizado de 30 días.", details: error.message });
  }
});

// ==================== VITE MIDDLEWARE INTERFACING ====================
const setupServer = async () => {
  // Vite Integration for development / static handling for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[RENOVADOS Server] Full-stack system is running cleanly on http://localhost:${PORT}`);
    console.log(`[RENOVADOS Server] Environment setup detects Gemini connection: ${ai ? "ACTIVE" : "OFFLINE/DRY-RUN"}`);
  });
};

setupServer();
