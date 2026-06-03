/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { OnboardingInfo, TestResult, Achievement, BeliefCategory } from '../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, Sparkles, Zap, Flame, Award, Lightbulb, CheckSquare, CalendarDays, BarChart2 } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  userInfo: OnboardingInfo;
  testResult: TestResult;
  xp: number;
  level: number;
  streak: number;
  clearedTerritories: BeliefCategory[];
  achievements: Achievement[];
  onToggleHabit: (habitType: 'readVerse' | 'doneActivity' | 'reflected' | 'prayed') => void;
  habitStates: {
    readVerse: boolean;
    doneActivity: boolean;
    reflected: boolean;
    prayed: boolean;
  };
}

export default function Dashboard({
  userInfo,
  testResult,
  xp,
  level,
  streak,
  clearedTerritories,
  achievements,
  onToggleHabit,
  habitStates
}: DashboardProps) {

  // Level thresholds (each level takes 200 XP to advance)
  const xpNeededForNext = 200;
  const currentLevelXP = xp % xpNeededForNext;
  const levelPercent = Math.min(100, Math.round((currentLevelXP / xpNeededForNext) * 100));

  const levelTitles: Record<number, string> = {
    1: "Explorador",
    2: "Aprendiz",
    3: "Constructor",
    4: "Renovador",
    5: "Transformador",
    6: "Embajador",
    7: "Mentor"
  };

  const currentLevelTitle = levelTitles[level] || "Mentor Celestial";

  // Data for progress chart
  const pChartData = [
    { name: 'Día 1', XP: Math.min(xp, 80), Fortalezas: 1 },
    { name: 'Día 3', XP: Math.min(xp, 160), Fortalezas: 2 },
    { name: 'Día 5', XP: Math.min(xp, 250), Fortalezas: 4 },
    { name: 'Día 7', XP: Math.min(xp, 340), Fortalezas: 5 },
    { name: 'Día 10', XP: xp, Fortalezas: clearedTerritories.length || 6 }
  ];

  return (
    <div className="space-y-6 font-sans text-slate-100" id="main-dashboard">
      
      {/* GRID ROOT - XP & STATS HEADER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="dashboard-hero-grid">
        
        {/* CARD 1: LEVEL ENGINE */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-slate-950 border border-amber-500/10 p-6 rounded-2xl flex flex-col justify-between shadow-xl relative overflow-hidden"
          id="lvl-status-card"
        >
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/5 rounded-full blur-xl" />
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] text-amber-400 font-mono font-black uppercase tracking-widest block">NIVEL PROGRESIVO</span>
              <h3 className="text-2xl font-black text-white">{currentLevelTitle}</h3>
              <p className="text-xs text-slate-400">Nivel {level} de 7</p>
            </div>
            <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center border border-amber-500/20 shadow-lg">
              <Shield className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">{currentLevelXP} / {xpNeededForNext} XP</span>
              <span className="text-amber-400 font-bold">{xp} XP Totales</span>
            </div>
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="bg-[linear-gradient(90deg,#fbbf24,#f59e0b)] h-full rounded-full transition-all duration-300"
                style={{ width: `${levelPercent}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* CARD 2: DIAGNOSTIC CONTAINER */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-slate-950 border border-amber-500/10 p-6 rounded-2xl flex flex-col justify-between shadow-xl"
          id="dominant-insight-card"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] text-red-400 font-mono font-black uppercase tracking-widest block">DIAGNÓSTICO CENTRAL</span>
              <h3 className="text-xl font-bold text-white capitalize">{testResult.dominantBelief}</h3>
              <p className="text-xs text-slate-400">Intensidad: <span className="text-red-400 font-bold">{testResult.intensity}</span></p>
            </div>
            <div className="w-12 h-12 bg-red-500/10 text-red-400 rounded-xl flex items-center justify-center border border-red-500/20">
              <Lightbulb className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          <div className="mt-4 bg-slate-900/60 border border-slate-800 p-3 rounded-lg text-xs leading-relaxed text-slate-300 italic">
            <strong>Mentira raíz:</strong> "{testResult.rootLie}"
          </div>
        </motion.div>

        {/* CARD 3: FLAME STREAK */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-slate-950 border border-amber-500/10 p-6 rounded-2xl flex flex-col justify-between shadow-xl relative overflow-hidden"
          id="streak-card"
        >
          <div className="absolute -left-6 -top-6 w-24 h-24 bg-orange-500/5 rounded-full blur-xl" />
          <div className="flex justify-between items-start animate-pulse">
            <div className="space-y-1">
              <span className="text-[10px] text-orange-400 font-mono font-black uppercase tracking-widest block">RACHA CONSECUTIVA</span>
              <h3 className="text-4xl font-black text-white">{streak} Días</h3>
              <p className="text-xs text-slate-400">Hábitos renovados</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/10 text-orange-400 rounded-xl flex items-center justify-center border border-orange-500/20 shadow-lg">
              <Flame className="w-6 h-6" />
            </div>
          </div>
          
          <p className="text-[11px] text-slate-500 mt-4 leading-normal">
            Haz tus lecturas y reflexiones diarias para alimentar tu racha y ganar +20 XP extra al día.
          </p>
        </motion.div>
      </div>

      {/* MID SECTION - HABITS & GRAPH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="dashboard-mid-grid">
        
        {/* CHECKLIST (LEFT / SPANS 1) */}
        <div className="bg-slate-950 border border-amber-500/10 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-xl" id="daily-checklist-container">
          <div className="flex items-center gap-2 mb-2">
            <CheckSquare className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-white">Hábitos Renovados Hoy</h3>
          </div>

          <div className="space-y-3 flex-1" id="habits-checkboxes-list">
            <button
              id="habit-check-verse"
              onClick={() => onToggleHabit('readVerse')}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                habitStates.readVerse 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${habitStates.readVerse ? 'bg-amber-500 border-amber-400 text-slate-950' : 'border-slate-700'}`}>
                  {habitStates.readVerse && <span className="text-[10px] font-black">✓</span>}
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-200">Leí el Versículo del Día</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Alimenta el espíritu</p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold shrink-0">+10 XP</span>
            </button>

            <button
              id="habit-check-activity"
              onClick={() => onToggleHabit('doneActivity')}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                habitStates.doneActivity 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${habitStates.doneActivity ? 'bg-amber-500 border-amber-400 text-slate-950' : 'border-slate-700'}`}>
                  {habitStates.doneActivity && <span className="text-[10px] font-black">✓</span>}
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-200">Realicé la Actividad Práctica</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Neuroplasticidad en acción</p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold shrink-0">+25 XP</span>
            </button>

            <button
              id="habit-check-reflected"
              onClick={() => onToggleHabit('reflected')}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                habitStates.reflected 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${habitStates.reflected ? 'bg-amber-500 border-amber-400 text-slate-950' : 'border-slate-700'}`}>
                  {habitStates.reflected && <span className="text-[10px] font-black">✓</span>}
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-200">Registré mi Meditación</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Captura tus insights</p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold shrink-0">+15 XP</span>
            </button>

            <button
              id="habit-check-prayed"
              onClick={() => onToggleHabit('prayed')}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                habitStates.prayed 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${habitStates.prayed ? 'bg-amber-500 border-amber-400 text-slate-950' : 'border-slate-700'}`}>
                  {habitStates.prayed && <span className="text-[10px] font-black">✓</span>}
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-200">Hice la Oración de Fe</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Consagración total</p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold shrink-0">+10 XP</span>
            </button>
          </div>
        </div>

        {/* CHART (RIGHT / SPANS 2) */}
        <div className="lg:col-span-2 bg-slate-950 border border-amber-500/10 p-6 rounded-2xl flex flex-col justify-between shadow-xl" id="analytics-growth-chart">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold text-white">Curva de Crecimiento Mental</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Últimas semanas</span>
          </div>

          <div className="w-full h-64 md:h-72 mt-2" id="recharts-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#fbbf24', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="XP" stroke="#fbbf24" strokeWidth={2.5} fillOpacity={1} fill="url(#colorXp)" name="Progreso (XP)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* LOWER SECTION - ACHIEVEMENTS PANEL */}
      <div className="bg-slate-950 border border-amber-500/10 p-6 rounded-2xl shadow-xl" id="achievements-container">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-white">Logros Desbloqueados de la Senda</h3>
          </div>
          <span className="text-[10px] text-amber-400 hover:underline cursor-pointer tracking-wider font-bold">Ver todos los retos</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4" id="achievements-grid">
          {achievements.map((ach) => (
            <div 
              id={`ach-card-${ach.id}`}
              key={ach.id}
              className={`flex flex-col items-center justify-between text-center p-4 rounded-xl border transition-all ${
                ach.unlocked 
                  ? 'bg-amber-500-[5%] bg-amber-950/20 border-amber-500/30 text-amber-100' 
                  : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
              }`}
            >
              <div className={`p-3 rounded-full mb-2 ${ach.unlocked ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-950 text-slate-600'}`}>
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-xs leading-normal">{ach.name}</h4>
              <p className="text-[10px] text-slate-400 leading-normal mt-1 leading-relaxed">{ach.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
