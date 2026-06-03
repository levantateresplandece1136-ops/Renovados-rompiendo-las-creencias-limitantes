/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SurveyQuestion, BeliefCategory } from '../types';

// Let's create the 15 master narrative questions that map directly to our 10 dimensions.
// Options A, B, C, D will correspond to different BeliefCategories and give scoring,
// allowing us to identify the dominant hidden beliefs.

export const masterQuestions: {
  id: number;
  getContextText: (area: string) => string;
  options: {
    A: { text: string; category: BeliefCategory; score: number };
    B: { text: string; category: BeliefCategory; score: number };
    C: { text: string; category: BeliefCategory; score: number };
    D: { text: string; category: BeliefCategory; score: number };
  };
}[] = [
  {
    id: 1,
    getContextText: (area) => `Estás preparándote para presentar una propuesta o idea crucial relacionada con tu área de ${area} frente a varias personas influyentes. Faltan cinco minutos para comenzar.¿Qué pensamiento asalta tu mente primero?`,
    options: {
      A: { text: "No soy lo suficientemente bueno, tarde o temprano se darán cuenta.", category: "verguenza", score: 4 },
      B: { text: "Seguro algo saldrá mal y arruinaré mi futuro por completo.", category: "temor", score: 4 },
      C: { text: "Debo hacerlo absolutamente perfecto; si cometo un solo error, habré fracasado.", category: "perfeccionismo", score: 4 },
      D: { text: "Otros presentarían esto con mucha más elocuencia y carisma que yo.", category: "comparacion", score: 4 }
    }
  },
  {
    id: 2,
    getContextText: (area) => `Acabas de cometer un error notable en una decisión importante relacionada con ${area}. Nadie se ha enterado aún. ¿Cómo reaccionas internamente?`,
    options: {
      A: { text: "Qué idiota soy, siempre arruino todo. Me doy asco.", category: "verguenza", score: 4 },
      B: { text: "Tengo que ocultarlo y arreglarlo yo mismo inmediatamente; no puedo confiar esto a nadie.", category: "control", score: 4 },
      C: { text: "Dios me va a castigar o retirará Su bendición de mi vida por esto.", category: "culpa", score: 4 },
      D: { text: "Comienzo a hiperventilar pensando en las peores consecuencias imaginables.", category: "ansiedad", score: 4 }
    }
  },
  {
    id: 3,
    getContextText: (area) => `Envíes un mensaje clave a una persona importante sobre un asunto de ${area} y ves que lo lee pero no responde después de varias horas. ¿Qué asumes?`,
    options: {
      A: { text: "Seguro se aburrió de mí o le caigo mal. Siempre me terminan rechazando.", category: "rechazo", score: 4 },
      B: { text: "Seguro está enojado conmigo por algo que hice mal en el pasado.", category: "culpa", score: 4 },
      C: { text: "Debo insistir de inmediato y controlar la situación antes de que se descarrile.", category: "control", score: 4 },
      D: { text: "Seguro le prefiere responder a otros más interesantes que a mí.", category: "comparacion", score: 4 }
    }
  },
  {
    id: 4,
    getContextText: (area) => `Ves a un colega o conocido publicando en redes sociales un testimonio de éxito arrollador en su vida, justamente en el área de ${area}. Tu primer impulso emocional es:`,
    options: {
      A: { text: "Un vacío amargo; siento que me estoy quedando atrás y que mi vida está estancada.", category: "comparacion", score: 4 },
      B: { text: "Siento que a ellos todo les sale fácil y para mí siempre hay escasez y lucha.", category: "escasez", score: 4 },
      C: { text: "Me da pánico pensar que yo jamás alcanzaré ese nivel y quedaré en la ruina.", category: "ansiedad", score: 4 },
      D: { text: "Me esfuerzo por fingir alegría externa, pero por dentro me juzgo duramente.", category: "perfeccionismo", score: 4 }
    }
  },
  {
    id: 5,
    getContextText: (area) => `Se presenta un gasto imprevisto de gran magnitud o un obstáculo serio en tus planes para ${area}. Tu reacción inmediata es:`,
    options: {
      A: { text: "Entrar en pánico total. Siento que nos quedaremos sin nada y desamparados.", category: "escasez", score: 4 },
      B: { text: "Estrés severo y obsesión por recortar y controlar cada centavo o variable.", category: "control", score: 4 },
      C: { text: "Enojó con Dios; me pregunto por qué me castiga o si realmente se olvidó de mí.", category: "identidad", score: 4 },
      D: { text: "Parálisis. Siento que no tengo las fuerzas para lidiar con otra crisis más.", category: "ansiedad", score: 4 }
    }
  },
  {
    id: 6,
    getContextText: (area) => `Un líder espiritual o alguien de alta estima te da un consejo constructivo pero que expone una debilidad en tus proyectos de ${area}. ¿Cómo te impacta?`,
    options: {
      A: { text: "Siento una profunda humillación; me dan ganas de esconderme y no volver a hablar.", category: "verguenza", score: 4 },
      B: { text: "Siento que cuestionan todo mi valor y que me consideran un fracaso absoluto.", category: "identidad", score: 4 },
      C: { text: "Me pongo a la defensiva de inmediato y busco justificar que lo hice perfecto.", category: "perfeccionismo", score: 4 },
      D: { text: "Siento que me van a excluir o sacar del círculo de confianza.", category: "rechazo", score: 4 }
    }
  },
  {
    id: 7,
    getContextText: (area) => `Un familiar menciona en una reunión un error del pasado que cometiste en el área de ${area}. Presencias silencio en la sala. ¿Qué experimentas?`,
    options: {
      A: { text: "Culpa aplastante; siento que mi error me define y que nunca podré repararlo.", category: "culpa", score: 4 },
      B: { text: "Deseo de evaporarme; la vergüenza sobre quién soy me quema por dentro.", category: "verguenza", score: 4 },
      C: { text: "Temor a que todos comiencen a vigilarme y pierda la poca posición que tengo.", category: "temor", score: 4 },
      D: { text: "Rabia interna por no poder controlar el flujo de la conversación familiar.", category: "control", score: 4 }
    }
  },
  {
    id: 8,
    getContextText: (area) => `Se abre ante ti una magnífica oportunidad para liderar un proyecto de ${area}, pero requiere dar un salto de fe sin garantías de éxito. ¿Qué haces?`,
    options: {
      A: { text: "Lo rechazo. Prefiero lo seguro a arriesgarme a ser expuesto y fracasar.", category: "temor", score: 4 },
      B: { text: "Lo dilato buscando planificar tanto que termine por expirar la oportunidad.", category: "control", score: 4 },
      C: { text: "Pienso que Dios bendeciría a otros más espirituales para esto; yo no soy digno.", category: "identidad", score: 4 },
      D: { text: "Sufro de ansiedad severa imaginando todos los escenarios donde hago el ridículo.", category: "ansiedad", score: 4 }
    }
  },
  {
    id: 9,
    getContextText: (area) => `Estás intentando tomar un descanso de tus arduas tareas en ${area}, pero el silencio y la falta de actividad te producen:`,
    options: {
      A: { text: "Una inquietud intolerable; siento que si no produzco, mi vida carece de valor.", category: "identidad", score: 4 },
      B: { text: "Culpa severa; siento que estoy perdiendo el tiempo o siendo perezoso ante Dios.", category: "culpa", score: 4 },
      C: { text: "Ansiedad sobre todos los pendientes que se están acumulando y saliéndose de control.", category: "control", score: 4 },
      D: { text: "Sensación de que otros están tomando ventaja y me están superando mientras descanso.", category: "comparacion", score: 4 }
    }
  },
  {
    id: 10,
    getContextText: (area) => `Sientes que las personas que te rodean no están valorando tus esfuerzos y sacrificios en ${area}. ¿Cuál es tu reacción habitual?`,
    options: {
      A: { text: "Aislarme por dolor; asumo que nadie me quiere de verdad y que estoy solo.", category: "rechazo", score: 4 },
      B: { text: "Esforzarme aún más hasta el agotamiento extremo para forzarlos a valorarme.", category: "perfeccionismo", score: 4 },
      C: { text: "Reclamarles con rabia silenciosa o manipulación activa para recuperar el control.", category: "control", score: 4 },
      D: { text: "Hundirme en la autocompasión creyendo que tengo una maldición de escasez afectiva.", category: "escasez", score: 4 }
    }
  },
  {
    id: 11,
    getContextText: (area) => `Al final de un año o de un ciclo de metas en ${area}, notas que no lograste lo planificado. ¿Qué voz habla más fuerte en tu interior?`,
    options: {
      A: { text: "'Eres un inútil, nunca logras nada significativo.'", category: "identidad", score: 4 },
      B: { text: "'Es tu culpa por no haber controlado cada variable o haber delegado.'", category: "control", score: 4 },
      C: { text: "'Nunca vas a progresar; los recursos se acaban y estás destinado a la mediocridad.'", category: "escasez", score: 4 },
      D: { text: "'Mira a los demás; ellos sí cumplieron sus metas y lo hicieron ver fácil.'", category: "comparacion", score: 4 }
    }
  },
  {
    id: 12,
    getContextText: (area) => `Encuentras resistencia u hostilidad de alguien con quien compartes responsabilidades sobre ${area}. Tu primer impulso es:`,
    options: {
      A: { text: "Pensar que me odian o que soy indeseable en este lugar.", category: "rechazo", score: 4 },
      B: { text: "Siento miedo de confrontar y tiemblo de ansiedad por no saber qué pasará.", category: "ansiedad", score: 4 },
      C: { text: "Siento desprecio por mí mismo por no haber gestionado la relación de forma impecable.", category: "perfeccionismo", score: 4 },
      D: { text: "Crear un muro defensivo de inmediato y no dirigirles la palabra para protegerme.", category: "temor", score: 4 }
    }
  },
  {
    id: 13,
    getContextText: (area) => `Un imprevisto de salud física o fatiga extrema te obliga a cancelar todos tus compromisos semanales sobre ${area}. ¿Cómo te sientes en cama?`,
    options: {
      A: { text: "Sumamente avergonzado de mi fragilidad física; odio sentirme inútil.", category: "verguenza", score: 4 },
      B: { text: "Con pánico de que las cosas se destruyan o dejen de marchar sin mi presencia.", category: "control", score: 4 },
      C: { text: "Siento que Dios me está castigando o que estoy bajo ataque directo porque fallé en mis hábitos.", category: "culpa", score: 4 },
      D: { text: "Frustrado e insatisfecho comparando mi salud frágil con la energía desbordante de otros.", category: "comparacion", score: 4 }
    }
  },
  {
    id: 14,
    getContextText: (area) => `Te enteras de que hay cambios estructurales o ministeriales drásticos programados para tu entorno de ${area} muy pronto. Tu reacción interior es:`,
    options: {
      A: { text: "Temor absoluto; presiento que estos cambios traerán mi desgracia.", category: "temor", score: 4 },
      B: { text: "Ansiedad extrema que interrumpe mi sueño diario dándole vueltas a lo desconocido.", category: "ansiedad", score: 4 },
      C: { text: "Un vacío espiritual; siento que Dios me desamparará y no habrá provisión para mí.", category: "escasez", score: 4 },
      D: { text: "Planificar obsesivamente estrategias alternativas para que nada me tome por sorpresa.", category: "control", score: 4 }
    }
  },
  {
    id: 15,
    getContextText: (area) => `Estás por dar tu opinión sincera en un grupo de debate sobre ${area}. De repente te das cuenta de que todos los presentes opinan lo opuesto. ¿Qué haces?`,
    options: {
      A: { text: "Me callo por completo; el miedo a ser rechazado o criticado me amordaza.", category: "rechazo", score: 4 },
      B: { text: "Modifico mi discurso para congraciarme con ellos y no perder su aprobación.", category: "identidad", score: 4 },
      C: { text: "Me siento profundamente inadecuado y tonto, pensando que siempre estoy equivocado.", category: "verguenza", score: 4 },
      D: { text: "Siento rabia sorda y ansiedad física al ver que no puedo convencerlos de mi punto.", category: "control", score: 4 }
    }
  }
];

export function getProceduralQuestionsForUser(mainArea: string): SurveyQuestion[] {
  // Mapeamos el string legible para el prompt de la pregunta
  const areaLabelMap: Record<string, string> = {
    identidad: "tu verdadera Identidad y valor",
    finanzas: "tus Finanzas y provisión material",
    relaciones: "tus Relaciones interpersonales",
    matrimonio: "tu Matrimonio o vida familiar",
    ministerio: "tu Ministerio y servicio a Dios",
    liderazgo: "tu Liderazgo e influencia",
    ventas: "tus Ventas y crecimiento comercial",
    negocios: "tus Emprendimientos y Negocios",
    proposito: "tu Propósito y destino de vida"
  };

  const label = areaLabelMap[mainArea] || mainArea;

  return masterQuestions.map((q) => {
    return {
      id: q.id,
      text: q.getContextText(label),
      options: {
        A: q.options.A,
        B: q.options.B,
        C: q.options.C,
        D: q.options.D
      }
    };
  });
}
