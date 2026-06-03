/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { OnboardingInfo, TestResult, PlanWeek, Achievement } from '../types';
import { Printer, ShieldCheck, Award, FileText, CheckCircle2 } from 'lucide-react';

interface RenovationReportProps {
  userInfo: OnboardingInfo;
  testResult: TestResult | null;
  xp: number;
  level: number;
  unlockedAchievements: Achievement[];
  plan: PlanWeek[];
  onBackToMain: () => void;
}

export default function RenovationReport({
  userInfo,
  testResult,
  xp,
  level,
  unlockedAchievements,
  plan,
  onBackToMain
}: RenovationReportProps) {

  const handlePrint = () => {
    window.print();
  };

  const levelTitles: Record<number, string> = {
    1: "Explorador de la Mente",
    2: "Aprendiz de la Verdad",
    3: "Constructor de Altares",
    4: "Renovador del Entendimiento",
    5: "Transformador Consagrado",
    6: "Embajador Celeste",
    7: "Mentor Espiritual"
  };

  const unlockedCount = unlockedAchievements.filter(a => a.unlocked).length;

  // Compile all notes written in the plan
  const writtenNotes: { dayNum: number; notes: string; verse: string }[] = [];
  plan.forEach((wk) => {
    wk.days.forEach((day) => {
      if (day.notes && day.notes.trim()) {
        writtenNotes.push({
          dayNum: day.dayNum,
          notes: day.notes,
          verse: day.verse
        });
      }
    });
  });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 font-sans text-slate-100 space-y-6" id="renovation-report">
      
      {/* EXPORT CONTROL HEADER BAR */}
      <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800 print:hidden" id="report-controls">
        <div className="space-y-0.5">
          <h3 className="font-bold text-white text-sm">Crónica final de Batalla</h3>
          <p className="text-[11px] text-slate-400">Exporta e imprime tu testimonio oficial de Renovación Mental.</p>
        </div>
        <div className="flex gap-2">
          <button
            id="back-from-report-btn"
            onClick={onBackToMain}
            className="px-4 py-2 bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-lg text-xs font-bold text-slate-350 transition-colors"
          >
            Volver
          </button>
          <button
            id="print-report-btn"
            onClick={handlePrint}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-bold transition-all shadow shadow-amber-500/20 flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            Imprimir Reporte
          </button>
        </div>
      </div>

      {/* PARCHMENT REPORT SHEETS CONTAINER */}
      <div 
        className="bg-stone-50 text-slate-900 p-8 md:p-12 border-8 border-double border-amber-900/30 rounded-3xl space-y-8 shadow-2xl relative select-text print:border-none print:shadow-none print:p-0"
        id="official-document-parchment"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-650/[2%] rounded-full blur-3xl pointer-events-none" />

        {/* OFFICIAL HEADER SEAL */}
        <div className="text-center space-y-3 border-b-2 border-dashed border-amber-900/20 pb-8 relative">
          <span className="text-[10px] text-amber-700 font-mono font-bold uppercase tracking-widest block" style={{ fontFamily: 'sans-serif' }}>
            REGISTRO DE TRANSFORMACIÓN ESPIRITUAL Y COGNITIVA
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-amber-950 tracking-tight leading-normal" style={{ fontFamily: 'Georgia, serif' }}>
            RENOVADOS
          </h1>
          <p className="text-sm font-sans italic text-slate-600 max-w-lg mx-auto">
            “No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento...” ― Romanos 12:2
          </p>
          <div className="absolute top-2 left-6 w-12 h-12 border-2 border-amber-900/45 rounded-full flex items-center justify-center font-bold text-xs text-amber-900 font-mono opacity-50 shrink-0 select-none print:hidden">
            SELLO
          </div>
        </div>

        {/* CORE DETAILS BOX */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2 font-sans" style={{ fontFamily: 'sans-serif' }}>
          
          {/* PROFILE SUMMARY */}
          <div className="space-y-4">
            <h3 className="text-amber-900 font-black text-xs uppercase tracking-wider border-b border-amber-900/10 pb-1">DATOS DEL EXPLORADOR</h3>
            <div className="grid grid-cols-2 gap-y-3.5 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Nombre</span>
                <span className="text-slate-900 text-sm font-black mt-0.5 block">{userInfo.name}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Edad / Sexo</span>
                <span className="text-slate-900 text-sm font-bold mt-0.5 block">{userInfo.age} años / {userInfo.sex}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Estado Civil</span>
                <span className="text-slate-900 text-sm font-semibold mt-0.5 block">{userInfo.civilStatus}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Área de Lucha</span>
                <span className="text-slate-900 text-sm font-bold capitalize mt-0.5 block">{userInfo.mainArea}</span>
              </div>
            </div>
          </div>

          {/* SPIRITUAL STATS */}
          <div className="space-y-4">
            <h3 className="text-amber-900 font-black text-xs uppercase tracking-wider border-b border-amber-900/10 pb-1">RESULTADOS METRICOS</h3>
            {testResult ? (
              <div className="grid grid-cols-2 gap-y-3.5 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">FORTALEZA CLAVE</span>
                  <span className="text-red-700 text-sm font-black capitalize mt-0.5 block">{testResult.dominantBelief}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">INTENSIDAD INICIAL</span>
                  <span className="text-red-700 text-sm font-black mt-0.5 block">{testResult.intensity}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Rango de Consciencia</span>
                  <span className="text-amber-950 text-sm font-black mt-0.5 block">{levelTitles[level] || "Mentor Celestial"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Logros Obtenidos</span>
                  <span className="text-slate-900 text-sm font-bold mt-0.5 block">{unlockedCount} de 5 Desbloqueados</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No se registran datos del test de diagnóstico.</p>
            )}
          </div>
        </div>

        {/* MENTIRA RAÍZ VS TRUTH CARD */}
        {testResult && (
          <div className="bg-amber-950/5 border border-amber-900/10 rounded-2xl p-6 space-y-4 font-sans" style={{ fontFamily: 'sans-serif' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Root Lie Blocked */}
              <div className="space-y-1.5">
                <span className="text-[9px] text-red-650 bg-red-100 border border-red-200 px-2.5 py-0.5 rounded uppercase tracking-wider font-bold inline-block">
                  Mentira Raíz Derribada
                </span>
                <p className="text-slate-700 text-xs leading-relaxed italic pr-2">
                  "{testResult.rootLie}"
                </p>
              </div>

              {/* Truth Liberator */}
              <div className="space-y-1.5 border-t border-amber-900/15 md:border-t-0 md:border-l pl-0 md:pl-6 pt-4 md:pt-0">
                <span className="text-[9px] text-emerald-650 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded uppercase tracking-wider font-bold inline-block">
                  Verdad Sembrada
                </span>
                <p className="text-emerald-950 text-xs font-black leading-relaxed">
                  "Siete veces cae el justo y vuelve a levantarse; justificado estás por fe y gracia celestiales."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* DIARIES & ARCHIVEMENTS TESTIMONIES */}
        {writtenNotes.length > 0 && (
          <div className="space-y-4 font-sans" style={{ fontFamily: 'sans-serif' }}>
            <h3 className="text-amber-900 font-bold text-xs uppercase tracking-wider border-b border-amber-900/10 pb-1 block">
              DIARIO Y REFLEXIONES DE TRAVESÍA
            </h3>
            <div className="space-y-4">
              {writtenNotes.map((note, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm leading-normal space-y-2">
                  <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                    <span>REGISTRO DEL DÍA {note.dayNum}</span>
                    <span className="font-mono text-amber-700">{note.verse}</span>
                  </div>
                  <p className="text-xs text-slate-800 italic">
                    "{note.notes}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* THE OFFICIAL TESTIMONY SEAL FOR CONSOLIDATION */}
        <div 
          className="text-center pt-8 border-t border-amber-900/10 space-y-4"
          style={{ fontFamily: 'sans-serif' }}
        >
          <div className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-100 border border-emerald-200 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wide">
            <CheckCircle2 className="w-5 h-5" />
            Certificado de Renovación Mental Completado
          </div>
          <p className="text-xs italic text-slate-600 leading-normal max-w-sm mx-auto leading-relaxed">
            Certificamos ante la corte celestial que {userInfo.name} ha demolido exitosamente las fortalezas mentales y camina hoy con la mente de Cristo libre de amargura.
          </p>
        </div>

        {/* SIGNATURE FIELDS */}
        <div className="flex justify-between items-center pt-10 font-sans" style={{ fontFamily: 'sans-serif' }}>
          <div className="text-center w-1/3">
            <div className="border-b border-slate-400 h-8 mx-auto w-4/5" />
            <span className="text-[10px] text-slate-500 uppercase mt-1.5 font-bold block">Firma del Explorador</span>
          </div>
          <div className="text-center w-1/3">
            <div className="border-b border-slate-400 h-8 mx-auto w-4/5 flex items-center justify-center font-serif text-amber-800 text-xs italic">
              Consejero Elías
            </div>
            <span className="text-[10px] text-slate-500 uppercase mt-1.5 font-bold block">Firma del Consejero</span>
          </div>
        </div>
      </div>
    </div>
  );
}
