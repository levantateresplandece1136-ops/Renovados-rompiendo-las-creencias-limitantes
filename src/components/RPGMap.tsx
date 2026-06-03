/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BeliefCategory } from '../types';
import { ShieldAlert, Trophy, LayoutGrid, CheckCircle2, Lock, Swords, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface RPGMapProps {
  dominantBelief: BeliefCategory;
  unlockedCategories: BeliefCategory[];
  onInvadeCategory: (cat: BeliefCategory) => void;
  earnedXP: (xp: number) => void;
  clearedTerritories: BeliefCategory[];
}

export interface Territory {
  id: BeliefCategory;
  name: string;
  epicName: string;
  description: string;
  coords: { x: number; y: number }; // Percentage coordinate for SVG placement
  color: string;
  challenge: string;
  expValue: number;
}

export const territoriesList: Territory[] = [
  {
    id: "rechazo",
    name: "rechazo",
    epicName: "Valle del Rechazo",
    description: "Un foso de lodo custodiado por el miedo a ser excluido y censurado si eres vulnerable.",
    coords: { x: 15, y: 75 },
    color: "#e11d48",
    challenge: "Medita en que tu adopción celestial fue labrada en oro y no depende de aceptación humana.",
    expValue: 50
  },
  {
    id: "comparacion",
    name: "comparacion",
    epicName: "Bosque de la Comparación",
    description: "Arbustos enredados que susurran rumores sobre las vidas perfectas de otros.",
    coords: { x: 30, y: 55 },
    color: "#059669",
    challenge: "Consagra una felicitación honesta a un supuesto adversario de tu éxito para desarraigar la envidia.",
    expValue: 50
  },
  {
    id: "escasez",
    name: "escasez",
    epicName: "Desierto de la Escasez",
    description: "Dunas resecas de soledad financiera donde crees que todo se acabará y estás indefenso.",
    coords: { x: 48, y: 80 },
    color: "#d97706",
    challenge: "Realiza una donación o generosidad anónima extrema para declarar soberanía divina sobre tu pan.",
    expValue: 50
  },
  {
    id: "temor",
    name: "temor",
    epicName: "Montañas del Temor",
    description: "Cumbres oscuras donde crujen piedras de catástrofes ineludibles.",
    coords: { x: 22, y: 30 },
    color: "#4f46e5",
    challenge: "Anota tu miedo fatídico y quémalo mentalmente declarando: 'Dios es mi amparo'.",
    expValue: 50
  },
  {
    id: "control",
    name: "control",
    epicName: "Fortaleza del Control",
    description: "Altos portones de piedra donde cargas con la felicidad y tareas de la humanidad por desconfianza.",
    coords: { x: 45, y: 40 },
    color: "#7c3aed",
    challenge: "Entrega tus agendas estrictas al Trono Celestial por medio de una oración de entrega.",
    expValue: 50
  },
  {
    id: "culpa",
    name: "culpa",
    epicName: "Isla de la Culpa",
    description: "Peñasco brumoso cercado por remordimientos amargos y la imperiosa mentira de pagar penitencias.",
    coords: { x: 82, y: 78 },
    color: "#2563eb",
    challenge: "Canta de alegría declarando que tu absolución en el Calvario borró para siempre tu deuda.",
    expValue: 50
  },
  {
    id: "ansiedad",
    name: "ansiedad",
    epicName: "Laberinto de la Ansiedad",
    description: "Pasillos sin salida donde procesas amenazas continuas sin conciliar el descanso.",
    coords: { x: 68, y: 58 },
    color: "#b45309",
    challenge: "Inhala verdad de Dios y expulsa afanes durante 10 respiraciones lentas.",
    expValue: 50
  },
  {
    id: "identidad",
    name: "identidad",
    epicName: "Ciudad del Desánimo",
    description: "Solares donde crees que vales solo por tu productividad y logritos diarios y te cansas.",
    coords: { x: 60, y: 20 },
    color: "#db2777",
    challenge: "Prescinde de tu lista de pendientes durante una tarde completa para hallar descanso puro.",
    expValue: 50
  },
  {
    id: "verguenza",
    name: "verguenza",
    epicName: "Caverna de la Vergüenza",
    description: "Profundos abismos de deshonra donde ocultas tu rostro de Dios sintiéndote defectuoso.",
    coords: { x: 80, y: 32 },
    color: "#0891b2",
    challenge: "Levanta tus manos y declara en silencio: 'Su luz alumbra mi rostro y mi vergüenza es quitada'.",
    expValue: 50
  },
  {
    id: "perfeccionismo",
    name: "perfeccionismo",
    epicName: "Torre del Orgullo",
    description: "Baluartes fríos donde errar se castiga como crimen imperdonable y no comulgas con tu humanidad.",
    coords: { x: 90, y: 52 },
    color: "#ea580c",
    challenge: "Deja una labor menor sin terminar intencionadamente al 90% y descansa.",
    expValue: 50
  }
];

export default function RPGMap({
  dominantBelief,
  unlockedCategories,
  onInvadeCategory,
  earnedXP,
  clearedTerritories
}: RPGMapProps) {
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
  const [claimedMissions, setClaimedMissions] = useState<string[]>([]);

  const handleClaimMission = (terr: Territory) => {
    if (claimedMissions.includes(terr.id)) return;
    setClaimedMissions(prev => [...prev, terr.id]);
    earnedXP(terr.expValue);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl font-sans text-slate-100 flex flex-col md:flex-row gap-8 relative overflow-hidden" id="rpg-map-container">
      <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl" />
      
      {/* MAP VIEWPORT (LEFT) */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Swords className="w-6 h-6 text-amber-500" />
              Mapa de la Ciudadela Mental
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Haz clic en cualquier bastión para ver su mentira y conquistarla con la Verdad Cruzada.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <Trophy className="w-4 h-4 text-amber-400" />
            Fortalezas Derribadas: {clearedTerritories.length}/10
          </div>
        </div>

        {/* SVG INTERACTIVE MAP ENGINE */}
        <div className="relative w-full aspect-[4/3] bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-inner flex items-center justify-center p-4">
          
          {/* Fantasy grid decoration */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          
          {/* Constellation connectors (decorative paths) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" id="map-lines">
            <path
              d="M 15 75 Q 30 65 30 55 T 48 80 T 68 58 T 82 78"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              className="opacity-20 animate-[dash_30s_linear_infinite]"
            />
            <path
              d="M 22 30 Q 35 35 45 40 T 60 20 T 80 32 T 90 52"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              className="opacity-20"
            />
            <path
              d="M 45 40 Q 55 50 68 58"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              className="opacity-25"
            />
          </svg>

          {/* Territory Nodes */}
          {territoriesList.map((terr) => {
            const isDominant = terr.id === dominantBelief;
            const isCleared = clearedTerritories.includes(terr.id);
            const isSelected = selectedTerritory?.id === terr.id;

            return (
              <button
                id={`map-node-${terr.id}`}
                key={terr.id}
                onClick={() => setSelectedTerritory(terr)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-10 hover:scale-125 focus:outline-none"
                style={{ left: `${terr.coords.x}%`, top: `${terr.coords.y}%` }}
              >
                {/* Visual Node representation */}
                <div className="relative flex items-center justify-center">
                  
                  {/* Dominant Pulse ring */}
                  {isDominant && !isCleared && (
                    <span className="absolute inline-flex h-8 w-8 rounded-full bg-red-500/30 animate-ping" />
                  )}

                  {/* Active selection glow ring */}
                  {isSelected && (
                    <span className="absolute inline-flex h-10 w-10 rounded-full bg-amber-400/20 border border-amber-400" />
                  )}

                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center border font-mono text-xs font-bold transition-all shadow-lg ${
                      isCleared
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400'
                        : isDominant
                        ? 'bg-red-950/80 border-red-500 text-red-400'
                        : 'bg-slate-900 border-slate-700 text-slate-300'
                    }`}
                  >
                    {isCleared ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : isDominant ? (
                      <ShieldAlert className="w-4 h-4" />
                    ) : (
                      <Swords className="w-3.5 h-3.5" />
                    )}
                  </div>
                  
                  {/* Label element */}
                  <span className="absolute top-9 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-slate-950/90 border border-slate-800 text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wide text-slate-300 pointer-events-none shadow">
                    {terr.epicName}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* DETAIL CONSOLE (RIGHT PANEL) */}
      <div className="w-full md:w-80 shrink-0 bg-slate-950 rounded-xl p-5 border border-slate-800 flex flex-col justify-between" id="map-detail-sidebar">
        {selectedTerritory ? (
          <div className="space-y-5 animate-fadeIn">
            {/* Territory Header details */}
            <div className="space-y-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider block" style={{ color: selectedTerritory.color }}>
                {selectedTerritory.id === dominantBelief ? "⚠️ Fortaleza Dominante" : "Territorio Inexplorado"}
              </span>
              <h3 className="text-xl font-bold font-sans text-white">{selectedTerritory.epicName}</h3>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed leading-normal">
              {selectedTerritory.description}
            </p>

            <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 text-xs space-y-2">
              <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wide block">Distorsión Asociada</span>
              <p className="text-slate-200 capitalize font-semibold">{selectedTerritory.id}</p>
            </div>

            {/* Mission Challenge container */}
            <div className="border border-amber-500/20 bg-amber-500-[5%] bg-amber-950/20 p-4 rounded-xl space-y-2.5">
              <span className="text-amber-400/90 font-bold uppercase text-[9px] tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Misión de Demolición local
              </span>
              <p className="text-slate-300 text-xs leading-normal leading-relaxed italic">
                "{selectedTerritory.challenge}"
              </p>
              
              {claimedMissions.includes(selectedTerritory.id) || clearedTerritories.includes(selectedTerritory.id) ? (
                <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5 mt-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Misión Completada (+50 XP)
                </div>
              ) : (
                <button
                  id={`claim-mission-${selectedTerritory.id}`}
                  onClick={() => handleClaimMission(selectedTerritory)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 py-1.5 px-3 rounded-lg font-bold text-xs tracking-wide transition-colors mt-2"
                >
                  Confirmar Misión (+50 XP)
                </button>
              )}
            </div>

            <button
              id={`invade-fortress-btn-${selectedTerritory.id}`}
              onClick={() => onInvadeCategory(selectedTerritory.id)}
              className="w-full bg-slate-900 hover:bg-slate-850 text-amber-400 hover:text-white border border-amber-500/30 font-bold text-xs py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Verificar Biblioteca Bíblica
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-3 py-16" id="no-territory-selected-console">
            <LayoutGrid className="w-12 h-12 text-slate-700 animate-pulse" />
            <p className="text-sm text-slate-400 font-medium">Consola de Misiones</p>
            <p className="text-xs text-slate-600 max-w-xs leading-normal">
              Selecciona alguna de las fortalezas en el mapa interactivo para ver los misiones bíblicas correspondientes.
            </p>
          </div>
        )}

        {selectedTerritory && (
          <p className="text-[10px] text-slate-600 mt-6 text-center italic">
            "Derriba los argumentos humanos con la verdad eterna".
          </p>
        )}
      </div>
    </div>
  );
}
