/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PlanWeek, PlanDay, OnboardingInfo } from '../types';
import { Calendar, ChevronDown, ChevronUp, CheckCircle, Award, BookOpen, PenTool, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PersonalPlanProps {
  userInfo: OnboardingInfo;
  plan: PlanWeek[];
  isGeneratingPlan: boolean;
  onGeneratePlan: () => Promise<void>;
  onToggleDayHabit: (weekNum: number, dayNum: number, habitType: 'readVerse' | 'doneActivity' | 'reflected' | 'prayed') => void;
  onSaveDayNotes: (weekNum: number, dayNum: number, notes: string) => void;
  earnedXP: (xp: number) => void;
}

export default function PersonalPlan({
  userInfo,
  plan,
  isGeneratingPlan,
  onGeneratePlan,
  onToggleDayHabit,
  onSaveDayNotes,
  earnedXP
}: PersonalPlanProps) {
  const [activeWeek, setActiveWeek] = useState<number>(1);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [journalInputs, setJournalInputs] = useState<Record<number, string>>({});

  const handleToggleHabit = (weekN: number, dayN: number, type: 'readVerse' | 'doneActivity' | 'reflected' | 'prayed', xpVal: number) => {
    onToggleDayHabit(weekN, dayN, type);
    // Add XP only if marking it as completed (we'll assume the toggle goes false -> true)
    // To keep simple and reliable, state updates are handled upstream and user gets the animation.
  };

  const handleSaveNotes = (weekN: number, dayN: number) => {
    const text = journalInputs[dayN] || '';
    onSaveDayNotes(weekN, dayN, text);
    earnedXP(15); // +15 XP for registering reflection journal!
    alert("¡Diario guardado con éxito! +15 XP otorgados por tu sinceridad devocional.");
  };

  return (
    <div className="space-y-6 font-sans text-slate-100" id="personal-plan-root">
      
      {/* TRIGGER HEADER */}
      <div className="bg-slate-950 border border-amber-500/10 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xl" id="plan-intro-banner">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-amber-500" />
            Plan de Renovación de 30 Días
          </h2>
          <p className="text-xs text-slate-400">
            Alineado con Romans 12:2. Completa los desafíos diarios para ganar XP y demoler mentiras raíz.
          </p>
        </div>
        {plan.length === 0 ? (
          <button
            id="trigger-generation-plan-btn"
            onClick={onGeneratePlan}
            disabled={isGeneratingPlan}
            className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-800 text-slate-950 py-2.5 px-5 rounded-xl font-bold transition-all shadow-md text-sm shrink-0 uppercase tracking-wider flex items-center gap-2"
          >
            {isGeneratingPlan ? "Generando Plan..." : "Activar Mi Plan Personalizado"}
            <Sparkles className="w-4 h-4 animate-spin" />
          </button>
        ) : (
          <span className="text-xs bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full font-bold">
            Plan Activado
          </span>
        )}
      </div>

      {plan.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl max-w-md mx-auto" id="no-plan-loaded">
          <BookOpen className="w-12 h-12 text-slate-700 mx-auto animate-bounce mb-3" />
          <h3 className="font-bold text-slate-200">Tu Ruta no ha sido Trazada</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto mt-2 leading-relaxed">
            Presiona el botón de arriba para que el Consejero Elías diseñe tu plan profético y neurocognitivo basado en tu área de {userInfo.mainArea}.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" id="plan-loaded-grid">
          
          {/* SATELLITE WEEK SELECTOR (LEFT PANEL) */}
          <div className="space-y-3 lg:col-span-1" id="week-tabs-selector">
            {plan.map((week) => {
              const isActive = activeWeek === week.weekNum;
              return (
                <button
                  id={`week-tab-${week.weekNum}`}
                  key={week.weekNum}
                  onClick={() => {
                    setActiveWeek(week.weekNum);
                    // Find first day of that week to expand by default
                    const firstDay = week.days[0]?.dayNum;
                    if (firstDay) setExpandedDay(firstDay);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                    isActive 
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-md shadow-amber-500/5' 
                      : 'bg-slate-950 border-slate-800 hover:border-slate-750 text-slate-400'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold tracking-widest block uppercase text-slate-500">SEMANA {week.weekNum}</span>
                    <h4 className="font-bold text-xs text-white uppercase tracking-tight">{week.weekNum === 1 ? 'Consciencia' : week.weekNum === 2 ? 'Demolición' : week.weekNum === 3 ? 'Renovación' : 'Consolidación'}</h4>
                  </div>
                  <Award className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-700'}`} />
                </button>
              );
            })}
          </div>

          {/* ACTIVE WEEK DAYS ACCORDION (RIGHT PANEL) */}
          <div className="lg:col-span-3 space-y-4" id="days-accordion-port">
            <h3 className="text-xs font-black tracking-widest text-amber-500 uppercase font-mono">
              {plan[activeWeek - 1]?.name}
            </h3>

            <div className="space-y-3" id="days-list-container">
              {plan[activeWeek - 1]?.days.map((day) => {
                const isExpanded = expandedDay === day.dayNum;
                const isDayFinished = day.readVerse && day.doneActivity && day.reflected && day.prayed;
                
                return (
                  <div 
                    id={`day-card-${day.dayNum}`}
                    key={day.dayNum} 
                    className={`bg-slate-950 border rounded-xl overflow-hidden shadow-md transition-all duration-300 ${isExpanded ? 'border-amber-500/20' : 'border-slate-850'}`}
                  >
                    
                    {/* Header trigger bar */}
                    <button
                      id={`day-trigger-btn-${day.dayNum}`}
                      onClick={() => setExpandedDay(isExpanded ? null : day.dayNum)}
                      className="w-full flex items-center justify-between p-4 bg-slate-950 hover:bg-slate-900 transition-colors cursor-pointer text-left focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border font-mono text-xs font-bold shrink-0 ${isDayFinished ? 'bg-emerald-950 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-slate-700 text-slate-400'}`}>
                          {day.dayNum}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white flex items-center gap-2">
                            Día {day.dayNum}: {day.objective.slice(0, 50)}...
                          </h4>
                          <span className="text-[10px] text-slate-500 font-mono italic">{day.verse}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {isDayFinished && <span className="text-[10px] bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded uppercase font-black">Listo</span>}
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                      </div>
                    </button>

                    {/* Expandable Panel Body */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-slate-900 bg-slate-950/60 p-5 space-y-5"
                          id={`day-panel-body-${day.dayNum}`}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* TEXTUAL CONTENT (LEFT) */}
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <span className="text-[10px] text-amber-500 font-mono tracking-wider font-extrabold block uppercase">VERSÍCULO CLAVE</span>
                                <p className="text-xs text-amber-100 font-serif leading-relaxed italic bg-slate-900 p-3 rounded-lg border border-slate-850">
                                  "{day.verseText || 'No os conforméis a este siglo...'}"
                                  <span className="text-[9px] text-slate-400 font-mono block mt-1.5 font-sans not-italic font-bold">― {day.verse}</span>
                                </p>
                              </div>

                              <div className="space-y-1">
                                <span className="text-[10px] text-slate-400 font-mono tracking-wider font-extrabold block uppercase">REFLEXIÓN DEL DÍA</span>
                                <p className="text-xs text-slate-300 leading-relaxed text-justify">
                                  {day.reflection}
                                </p>
                              </div>

                              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900 border border-slate-850 p-3 rounded-xl">
                                <div className="space-y-0.5">
                                  <span className="text-[9px] text-slate-500 tracking-wider uppercase block font-bold">Actividad Práctica</span>
                                  <p className="text-slate-350 text-[11px] leading-snug">{day.activity}</p>
                                </div>
                                <div className="space-y-0.5 border-l border-slate-800 pl-3">
                                  <span className="text-[9px] text-slate-500 tracking-wider uppercase block font-bold">Declaración de Fe</span>
                                  <p className="text-slate-350 text-[11px] leading-snug">{day.faithAction}</p>
                                </div>
                              </div>
                            </div>

                            {/* EXCLUSIVE INTERACTIONS PANEL (RIGHT) */}
                            <div className="space-y-4 bg-slate-900/50 border border-slate-850 p-4 rounded-xl flex flex-col justify-between">
                              <div className="space-y-3">
                                <span className="text-[10px] text-slate-400 font-mono tracking-wider font-extrabold block uppercase">PASOS DE FE DIARIOS</span>
                                
                                <div className="space-y-2" id="daily-faith-steps-checks">
                                  <button
                                    id={`check-habit-readVerse-${day.dayNum}`}
                                    onClick={() => handleToggleHabit(activeWeek, day.dayNum, 'readVerse', 10)}
                                    className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-left text-xs ${day.readVerse ? 'bg-amber-500/10 border-amber-500/25 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                                  >
                                    <span>Check: Leí el Versículo (+10 XP)</span>
                                    <CheckCircle className={`w-4 h-4 shrink-0 ${day.readVerse ? 'text-amber-400' : 'text-slate-800'}`} />
                                  </button>

                                  <button
                                    id={`check-habit-doneActivity-${day.dayNum}`}
                                    onClick={() => handleToggleHabit(activeWeek, day.dayNum, 'doneActivity', 25)}
                                    className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-left text-xs ${day.doneActivity ? 'bg-amber-500/10 border-amber-500/25 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                                  >
                                    <span>Check: Hice la Actividad (+25 XP)</span>
                                    <CheckCircle className={`w-4 h-4 shrink-0 ${day.doneActivity ? 'text-amber-400' : 'text-slate-800'}`} />
                                  </button>

                                  <button
                                    id={`check-habit-reflected-${day.dayNum}`}
                                    onClick={() => handleToggleHabit(activeWeek, day.dayNum, 'reflected', 15)}
                                    className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-left text-xs ${day.reflected ? 'bg-amber-500/10 border-amber-500/25 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                                  >
                                    <span>Check: Medité y Oré (+15 XP)</span>
                                    <CheckCircle className={`w-4 h-4 shrink-0 ${day.reflected ? 'text-amber-400' : 'text-slate-800'}`} />
                                  </button>

                                  <button
                                    id={`check-habit-prayed-${day.dayNum}`}
                                    onClick={() => handleToggleHabit(activeWeek, day.dayNum, 'prayed', 10)}
                                    className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-left text-xs ${day.prayed ? 'bg-amber-500/10 border-amber-500/25 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                                  >
                                    <span>Check: Decreté Fe (+10 XP)</span>
                                    <CheckCircle className={`w-4 h-4 shrink-0 ${day.prayed ? 'text-amber-400' : 'text-slate-800'}`} />
                                  </button>
                                </div>
                              </div>

                              {/* Personal journaling scratchpad inside day expandable */}
                              <div className="space-y-2 pt-4 border-t border-slate-805">
                                <label className="text-[9px] text-slate-400 uppercase font-mono font-bold block flex items-center gap-1">
                                  <PenTool className="w-3.5 h-3.5" />
                                  Bitácora Diario de Renovación (+15 XP)
                                </label>
                                <textarea
                                  id={`journal-textarea-${day.dayNum}`}
                                  placeholder="Escribe tus insights o luchas de hoy sinceramente..."
                                  value={journalInputs[day.dayNum] !== undefined ? journalInputs[day.dayNum] : (day.notes || '')}
                                  onChange={(e) => setJournalInputs({ ...journalInputs, [day.dayNum]: e.target.value })}
                                  className="w-full h-16 p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400/50 resize-none font-sans"
                                />
                                <button
                                  id={`save-journal-btn-${day.dayNum}`}
                                  onClick={() => handleSaveNotes(activeWeek, day.dayNum)}
                                  className="w-full bg-slate-950 hover:bg-slate-900 text-amber-400 border border-amber-500/25 px-3 py-1.5 rounded-lg font-bold text-[11px] transition-colors"
                                >
                                  Guardar Reflexión Diaria
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
