/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { OnboardingInfo } from '../types';
import { Sparkles, Compass, Shield, User, Heart, Briefcase, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface OnboardingProps {
  onComplete: (info: OnboardingInfo) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(30);
  const [civilStatus, setCivilStatus] = useState('Soltero/a');
  const [sex, setSex] = useState('Masculino');
  const [mainArea, setMainArea] = useState<OnboardingInfo['mainArea']>('identidad');

  const handleNextStep = () => {
    if (step === 1 && !name.trim()) return;
    setStep((prev) => prev + 1);
  };

  const handleCompleteOnboarding = () => {
    onComplete({
      name,
      age,
      civilStatus,
      sex,
      mainArea
    });
  };

  const areas = [
    { id: 'identidad', label: 'Verdadera Identidad', desc: 'Autoimagen, propósito celestial e inseguridades', icon: Shield },
    { id: 'finanzas', label: 'Finanzas y Provisión', desc: 'Rompimiento con la escasez y pánicos económicos', icon: TrendingUp },
    { id: 'relaciones', label: 'Relaciones Sanas', desc: 'Amargura, soledades y rechazo interpersonal', icon: Heart },
    { id: 'matrimonio', label: 'Matrimonio y Familia', desc: 'Unión, patrones familiares y cargas afectivas', icon: Compass },
    { id: 'liderazgo', label: 'Liderazgo e Influencia', desc: 'Temor al fracaso, autoridad y perfeccionismo', icon: Sparkles },
    { id: 'proposito', label: 'Propósito y Destino', desc: 'Indecisión, desánimo y dudas sobre el llamado', icon: Briefcase }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-slate-100 px-4 py-8 select-none font-sans" id="onboarding-container">
      {step === 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
          id="onboarding-step1"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
          <div className="flex flex-col items-center text-center space-y-4">
            <span className="text-amber-400 font-bold tracking-widest text-xs uppercase">Proyecto Renovación</span>
            <h1 className="text-4xl font-bold font-sans tracking-tight text-white flex items-center justify-center gap-2">
              RENOVADOS
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Bienvenido al portal de transformación mental. Una aventura de fe, ciencia espiritual y renovación bíblica.
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="space-y-2">
              <label className="text-amber-400/90 text-xs font-semibold uppercase tracking-wider block">¿Cómo te llamas, Explorador?</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                <input
                  id="explorer-name-input"
                  type="text"
                  placeholder="Escribe tu nombre de batalla..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-amber-400 focus:outline-none text-white text-base transition-colors placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-amber-400/90 text-xs font-semibold uppercase tracking-wider block">Edad</label>
                <input
                  id="explorer-age-input"
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 30)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-amber-400 focus:outline-none text-white transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-amber-400/90 text-xs font-semibold uppercase tracking-wider block">Estado Civil</label>
                <select
                  id="explorer-civil-select"
                  value={civilStatus}
                  onChange={(e) => setCivilStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-amber-400 focus:outline-none text-white transition-colors"
                >
                  <option value="Soltero/a">Soltero/a</option>
                  <option value="Casado/a">Casado/a</option>
                  <option value="Divorciado/a">Divorciado/a</option>
                  <option value="Viudo/a">Viudo/a</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <label className="text-amber-400/90 text-xs font-semibold uppercase tracking-wider block">Sexo</label>
              <div className="grid grid-cols-2 gap-2">
                {['Masculino', 'Femenino'].map((s) => (
                  <button
                    id={`gender-btn-${s}`}
                    key={s}
                    type="button"
                    onClick={() => setSex(s)}
                    className={`py-2 px-4 rounded-xl border text-sm font-medium transition-all ${
                      sex === s
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500'
                        : 'bg-slate-950 border-slate-700 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              id="onboarding-step1-btn"
              onClick={handleNextStep}
              disabled={!name.trim()}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 py-3.5 px-6 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:shadow-xl hover:shadow-amber-500/10 flex items-center justify-center gap-2"
            >
              Iniciar Travesía
              <Compass className="w-5 h-5 animate-pulse" />
            </button>
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-2xl p-8 shadow-2xl relative"
          id="onboarding-step2"
        >
          <div className="text-center space-y-2 mb-6">
            <span className="text-amber-400 font-bold tracking-widest text-xs uppercase">Elige tu Lucha Principal</span>
            <h2 className="text-3xl font-extrabold text-white">¿Cuál es tu Fortaleza Clave?</h2>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              Toda mentira es una fortaleza en la mente. Selecciona el territorio donde sientes que la distorsión o el temor es más persistente hoy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[45vh] overflow-y-auto pr-2" id="struggle-areas-grid">
            {areas.map((area) => {
              const Icon = area.icon;
              const isSelected = mainArea === area.id;
              return (
                <button
                  id={`area-selection-${area.id}`}
                  key={area.id}
                  onClick={() => setMainArea(area.id as any)}
                  className={`flex items-start text-left gap-4 p-4 rounded-xl border transition-all duration-300 outline-none ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500 shadow-lg shadow-amber-500/5'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950 text-slate-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-900 text-slate-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">{area.label}</h4>
                    <p className="text-slate-400 text-xs mt-1 leading-normal">{area.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex gap-4 mt-8">
            <button
              id="back-to-step1"
              onClick={() => setStep(1)}
              className="w-1/3 bg-slate-950 border border-slate-700 hover:border-slate-500 text-slate-300 py-3 rounded-xl font-bold transition-all text-sm"
            >
              Volver
            </button>
            <button
              id="proceed-to-intro"
              onClick={handleNextStep}
              className="w-2/3 bg-amber-500 hover:bg-amber-600 text-slate-950 py-3 rounded-xl font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 text-sm"
            >
              Revelar Mi Historia
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl bg-slate-950 border border-amber-500/30 rounded-2xl p-8 shadow-2xl relative text-center space-y-6"
          id="onboarding-step3"
        >
          <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500 animate-pulse">
            <Compass className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black font-sans text-white tracking-wide uppercase">
            La Saga de la Ciudadela Mental
          </h2>

          <div className="text-slate-300 text-sm leading-relaxed space-y-4 text-justify max-h-[35vh] overflow-y-auto px-4 py-2 border-y border-slate-800 font-serif">
            <p>
              Explorador <span className="text-amber-400 font-semibold">{name}</span>, contempla tu Ciudadela Mental. Has vivido dentro de altos muros construidos con materiales ásperos: mentiras acumuladas que se sintieron como protección, pero que terminaron por ser cárceles.
            </p>
            <p>
              El enemigo de nuestras almas susurró miedos, fracasos, comparaciones sibilinas y deudas espirituales. Construiste la <span className="font-bold text-red-400">Fortaleza del Temor</span>, fundaste el <span className="font-bold text-red-400">Valle del Rechazo</span> y transitaste el desértico camino de la escasez, creyendo falsamente que estabas solo.
            </p>
            <p>
              La neurociencia proclama hoy lo que la Palabra selló hace miles de años: <strong>tu cerebro puede ser renovado.</strong> No estás atrapado en circuitos de amargura o parálisis. La verdad bíblica tiene el poder divino de derribar argumentos altivos y despejar nuevos surcos de paz y gozo eterno (Romanos 12:2).
            </p>
            <p>
              Iniciaremos tu diagnóstico mental sigilosamente. El <strong>Consejero Elías</strong> te acompañará durante este examen interactivo. No temas al diagnóstico; es el primer mapa hacia el derribo de tus fortalezas. ¡Preparado para la batalla!
            </p>
          </div>

          <button
            id="start-survey-btn"
            onClick={handleCompleteOnboarding}
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 py-3 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:shadow-xl hover:shadow-amber-500/20 active:scale-[0.98]"
          >
            Comenzar Test Gamificado
          </button>
        </motion.div>
      )}
    </div>
  );
}
