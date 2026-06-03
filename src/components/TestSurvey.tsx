/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { OnboardingInfo, TestResult, BeliefCategory } from '../types';
import { getProceduralQuestionsForUser } from '../data/questions';
import { HelpCircle, ChevronRight, Swords, Sparkles, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TestSurveyProps {
  userInfo: OnboardingInfo;
  onComplete: (result: TestResult) => void;
}

const rootLiesMap: Record<BeliefCategory, string> = {
  identidad: "Mi valor reside en mis logros materiales y profesionales, no en la gracia de Dios.",
  temor: "Dios no me protegerá de las tormentas, estoy propenso a la desgracia definitiva de un momento a otro.",
  rechazo: "Tengo que camuflar quien soy y decir que sí a todo para que la gente no me abandone.",
  escasez: "Los recursos divinos son escasos y las provisiones se agotarán; debo aferrarme egoístamente a lo que tengo.",
  comparacion: "El éxito y favor de Dios sobre los demás limitan mis propias bendiciones; voy retrasado.",
  perfeccionismo: "Cometer un error cancela por completo mi valía personal y me cataloga como un fracaso humillante.",
  control: "Es mi deber absoluto gestionar la vida de todos y planificar cada detalle para evitar que todo colapse.",
  ansiedad: "Preocuparme y sufrir hoy de forma constante es el único mecanismo útil de defensa ante el futuro hostil.",
  culpa: "He fallado tanto que no merezco perdón directo, tengo que cargar voluntariamente con el autocastigo.",
  verguenza: "Hay una mancha fundamental en mí que me vuelve indeseable a los ojos del Señor y de los hombres."
};

export default function TestSurvey({ userInfo, onComplete }: TestSurveyProps) {
  const questions = getProceduralQuestionsForUser(userInfo.mainArea);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, BeliefCategory>>({});
  const [scores, setScores] = useState<Record<BeliefCategory, number>>({
    identidad: 0,
    temor: 0,
    rechazo: 0,
    escasez: 0,
    comparacion: 0,
    perfeccionismo: 0,
    control: 0,
    ansiedad: 0,
    culpa: 0,
    verguenza: 0
  });

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (category: BeliefCategory, score: number) => {
    // Save current selection
    setAnswers(prev => ({ ...prev, [currentIndex]: category }));
    
    // Update score matrix
    setScores(prev => {
      const updated = { ...prev };
      // Deduct former score for this question if it was already answered
      const formerCategory = answers[currentIndex];
      if (formerCategory) {
        updated[formerCategory] = Math.max(0, updated[formerCategory] - score);
      }
      updated[category] = (updated[category] || 0) + score;
      return updated;
    });

    // Advance with timeout to let animation play
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        triggerEndEvaluation();
      }
    }, 150);
  };

  const triggerEndEvaluation = () => {
    // Process final results
    let dominantBelief: BeliefCategory = 'identidad';
    let maxVal = -1;

    // Find dominant belief category
    (Object.keys(scores) as BeliefCategory[]).forEach((cat) => {
      if (scores[cat] > maxVal) {
        maxVal = scores[cat];
        dominantBelief = cat;
      }
    });

    // Find secondary categories with significant scores (e.g., > 0 excluding dominant)
    const secondaryBeliefs = (Object.keys(scores) as BeliefCategory[]).filter(
      (cat) => cat !== dominantBelief && scores[cat] > 0
    );

    // Calculate intensity level based on dominant score
    // Max score is questions.length * 4 = 15 * 4 = 60 if all hit one, but realistically it distributes.
    let intensity: TestResult['intensity'] = 'Leve';
    if (maxVal >= 16) intensity = 'Muy alta';
    else if (maxVal >= 12) intensity = 'Alta';
    else if (maxVal >= 8) intensity = 'Moderada';

    const rootLie = rootLiesMap[dominantBelief];

    onComplete({
      dominantBelief,
      secondaryBeliefs,
      rootLie,
      intensity,
      scores,
      createdAt: new Date().toISOString()
    });
  };

  const progressPercent = Math.round(((currentIndex) / questions.length) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 font-sans text-slate-100 flex flex-col items-center justify-center min-h-[80vh]" id="test-survey-container">
      {/* Quiz Progress header */}
      <div className="w-full max-w-2xl flex items-center justify-between gap-4 mb-4" id="survey-header">
        <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
          <Swords className="w-4 h-4 animate-bounce" />
          Nivel de Consciencia: {currentIndex + 1} de {questions.length}
        </span>
        <span className="text-slate-400 text-xs font-mono">{progressPercent}% completado</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-2xl h-1.5 bg-slate-900 border border-slate-800 rounded-full mb-8 overflow-hidden" id="survey-progress-bar">
        <div 
          className="bg-amber-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl bg-slate-950 border border-amber-500/10 rounded-2xl p-6 md:p-8 shadow-2xl relative"
          id={`question-card-${currentIndex}`}
        >
          {/* Territory indicator decoration */}
          <div className="absolute top-4 right-4 bg-amber-500/10 text-amber-500 px-3 py-1 text-[11px] uppercase tracking-wider font-bold rounded-full border border-amber-500/20">
            Escenario Narrativo
          </div>

          <div className="flex gap-4 items-start mt-4 mb-6">
            <div className="p-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl hidden sm:block shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-wider">¿Cómo responderías?</p>
              <h3 className="text-lg md:text-xl font-bold font-sans text-white leading-normal mt-1.5">
                {currentQuestion.text}
              </h3>
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-3.5 mt-8" id="survey-options-grid">
            {(Object.keys(currentQuestion.options) as ('A' | 'B' | 'C' | 'D')[]).map((key) => {
              const opt = currentQuestion.options[key];
              return (
                <button
                  id={`option-${key}`}
                  key={key}
                  onClick={() => handleSelectOption(opt.category, opt.score)}
                  className="w-full text-left bg-slate-900 hover:bg-slate-900/80 border border-slate-800 hover:border-amber-400/40 rounded-xl p-4 transition-all hover:scale-[1.01] flex gap-4 items-center group relative cursor-pointer outline-none"
                >
                  <div className="w-7 h-7 bg-slate-950 border border-slate-700 text-slate-400 group-hover:text-amber-400 group-hover:border-amber-400 text-xs font-bold rounded-lg flex items-center justify-center shrink-0 transition-all">
                    {key}
                  </div>
                  <div className="flex-1 text-slate-200 group-hover:text-white text-sm md:text-base font-medium">
                    {opt.text}
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-amber-400 transition-colors shrink-0" />
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex gap-4 items-center text-slate-500 text-xs font-mono">
        <Sparkles className="w-4 h-4 text-amber-400/30" />
        Tus respuestas alimentan un diagnóstico psicológico y espiritual oculto.
      </div>
    </div>
  );
}
