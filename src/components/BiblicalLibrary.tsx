/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LibraryCategory, BeliefCategory } from '../types';
import { BookMarked, Search, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface BiblicalLibraryProps {
  initialCategory?: BeliefCategory;
}

export const biblicalLibraryData: LibraryCategory[] = [
  {
    id: "identidad",
    name: "Identidad en Cristo",
    description: "Sostén tu valor divino frente a los ataques de insignificancia, fracaso y baja autoestima.",
    territoryName: "Ciudad del Desánimo",
    verses: [
      {
        reference: "Efesios 2:10",
        text: "Porque somos hechura suya, creados en Cristo Jesús para buenas obras, las cuales Dios preparó de antemano...",
        application: "Cuando creas que no vales nada, recuerda que eres una obra maestra diseñada con un destino glorioso preestablecido por Dios."
      },
      {
        reference: "Gálatas 2:20",
        text: "Con Cristo estoy juntamente crucificado, y ya no vivo yo, mas vive Cristo en mí...",
        application: "Tu vieja reputación y temores ya están muertos; el impecable y victorioso Cristo vive en ti hoy."
      }
    ]
  },
  {
    id: "temor",
    name: "Vencer el Temor y Pánico",
    description: "Restaura la quietud cuando te atenace el miedo al dolor, la muerte o la desgracia repentina.",
    territoryName: "Montañas del Temor",
    verses: [
      {
        reference: "Isaías 41:10",
        text: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré...",
        application: "La presencia constante de Dios disuelve los fantasmas de catástrofes futuras. Te sostiene Su diestra victoriosa."
      },
      {
        reference: "Salmos 27:3",
        text: "Aunque un ejército acampe contra mí, no temerá mi corazón; aunque contra mí se levante guerra, yo estaré confiado.",
        application: "Las amenazas pueden parecer gigantescas, pero el favor de Jehová es un escudo indestructible."
      }
    ]
  },
  {
    id: "ansiedad",
    name: "Ansiedad y Descanso",
    description: "Desactiva los surcos neuronales de preocupación constante e insomnio por falsas amenazas.",
    territoryName: "Laberinto de la Ansiedad",
    verses: [
      {
        reference: "Filipenses 4:6-7",
        text: "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego...",
        application: "Sustituye la rumiación de miedos por un ruego explícito cargado de gratitud anticipada. La paz de Dios guardará tu mente."
      },
      {
        reference: "Mateo 6:34",
        text: "Así que, no os afanéis por el día de mañana, porque el día de mañana traerá su afán. Basta a cada día su propio mal.",
        application: "Ancla tu mente en el presente. La gracia de Dios es de distribución diaria; no intentes acumular provisión para mañana."
      }
    ]
  },
  {
    id: "culpa",
    name: "Perdón y Absolución",
    description: "Demuele la culpa amarga y el deseo de castigarte por pecados confesados e irrevocables.",
    territoryName: "Isla de la Culpa",
    verses: [
      {
        reference: "Romanos 8:1",
        text: "Ahora, pues, ninguna condenación hay para los que están en Cristo Jesús, los que no andan conforme a la carne...",
        application: "La culpabilidad persistente es un desprecio al sacrificio de Jesús. Eres legalmente inocente, libre del banquillo de los acusados."
      },
      {
        reference: "1 Juan 1:9",
        text: "Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad.",
        application: "El arrepentimiento sincero activa un perdón inmediato y absoluto. Se borra tu historial de caídas."
      }
    ]
  },
  {
    id: "escasez",
    name: "Provisión y Finanzas",
    description: "Sal de la tacañería temerosa y del pánico material reconociendo al Padre como Proveedor Soberano.",
    territoryName: "Desierto de la Escasez",
    verses: [
      {
        reference: "Filipenses 4:19",
        text: "Mi Dios, pues, suplirá todo lo que os falte conforme a sus riquezas en gloria en Cristo Jesús.",
        application: "Tu provisión depende de la herencia millonaria y soberana del Rey de reyes; no de la inflación mundial."
      },
      {
        reference: "Malaquías 3:10",
        text: "Traed todos los diezmos al alfolí y haya alimento en mi casa; y probadme ahora en esto, dice Jehová...",
        application: "La generosidad intencional y la fidelidad rompen el yugo mental de la avaricia por pánico."
      }
    ]
  },
  {
    id: "comparacion",
    name: "Identidad Única frente a Comparación",
    description: "Cura la insatisfacción crónica y la envidia destruyendo la falsa competitividad carnal.",
    territoryName: "Bosque de la Comparación",
    verses: [
      {
        reference: "Gálatas 6:4 Clarificado",
        text: "Cada uno someta a prueba su propia obra, y entonces tendrá motivo de gloriarse solo respecto de sí mismo...",
        application: "Dios trazó una pista de carrera única para ti. Compararse con la velocidad ajena es una distorsión que te desvía."
      },
      {
        reference: "Santiago 3:16",
        text: "Porque donde hay celos y contención, allí hay perturbación y toda obra perversa.",
        application: "La envidia abre portales de amargura. Celebra el progreso de otros para conservar tu paz cerebral."
      }
    ]
  },
  {
    id: "perfeccionismo",
    name: "Excelencia vs Perfeccionismo",
    description: "Abandona los estándares rígidos que castigan la humanidad y la gracia.",
    territoryName: "Torre del Orgullo",
    verses: [
      {
        reference: "Eclesiastés 7:20",
        text: "Ciertamente no hay hombre justo en la tierra, que haga el bien y nunca peque.",
        application: "Ser imperfecto es parte de tu diseño humano actual; la gracia sostiene y pule tus debilidades cotidianas."
      },
      {
        reference: "2 Corintios 12:9",
        text: "Y me ha dicho: Bástate mi gracia; porque mi poder se perfecciona en la debilidad...",
        application: "Tus fallas son el escenario perfecto para que brille el poder salvador y consolidador de Jesucristo."
      }
    ]
  },
  {
    id: "control",
    name: "Liderazgo, Propósito y Soberanía",
    description: "Abandona la falacia de control absoluto y descansa en la omnipotencia divina.",
    territoryName: "Fortaleza del Control",
    verses: [
      {
        reference: "Proverbios 16:9",
        text: "El corazón del hombre propone su camino; mas Jehová endereza sus pasos.",
        application: "Planifica con libertad, pero ríndete alegremente cuando Dios decida enderezar tu trayectoria hacia metas mejores."
      },
      {
        reference: "Mateo 11:28",
        text: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.",
        application: "Suelta las cargas familiares y ministeriales ajenas; no eres el salvador del mundo, Jesús ya lo es."
      }
    ]
  },
  {
    id: "verguenza",
    name: "Dignidad frente a Vergüenza y Rechazo",
    description: "Destruye el autodesprecio de tu historia pasada y del asco de ti mismo con la aceptación celestial.",
    territoryName: "Caverna de la Vergüenza",
    verses: [
      {
        reference: "Salmos 34:5",
        text: "Los que miraron a él fueron alumbrados, y sus rostros no fueron avergonzados.",
        application: "Al fijar tu mirada en Cristo, la mancha de tus heridas desaparece; Su luz limpia tu rostro de toda humillación anterior."
      },
      {
        reference: "Isaías 61:7",
        text: "En lugar de vuestra doble confusión y de vuestra deshonra, os alabaré; heredaréis el doble en vuestra tierra...",
        application: "Dios transforma tu deshonra y rechazo familiar en una doble porción de herencia espiritual y honor celestial."
      }
    ]
  }
];

export default function BiblicalLibrary({ initialCategory }: BiblicalLibraryProps) {
  const [selectedCat, setSelectedCat] = useState<BeliefCategory>(initialCategory || 'identidad');
  const [query, setQuery] = useState('');

  const activeData = biblicalLibraryData.find(c => c.id === selectedCat) || biblicalLibraryData[0];

  const filteredCategories = biblicalLibraryData.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl font-sans text-slate-100 flex flex-col lg:flex-row gap-8 relative" id="biblical-library">
      
      {/* LEFT NAVIGATION PANEL (TABS) */}
      <div className="w-full lg:w-80 shrink-0 space-y-4" id="library-left-navigation">
        <div className="space-y-1.5">
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-amber-500" />
            Arsenal Bíblico
          </h3>
          <p className="text-xs text-slate-400">Escrituras y aplicaciones prácticas para renovar tu mente paso a paso.</p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative" id="library-search">
          <Search className="absolute left-3 top-3 text-slate-500 w-4 h-4" />
          <input
            id="library-search-input"
            type="text"
            placeholder="Buscar categoría o versículo..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl text-xs text-white focus:outline-none placeholder:text-slate-600 transition-colors"
          />
        </div>

        {/* CATEGORIES BUTTONS LIST */}
        <div className="space-y-2 max-h-[45vh] overflow-y-auto pr-1" id="library-categories-scroll">
          {filteredCategories.map((cat) => {
            const isSelected = selectedCat === cat.id;
            return (
              <button
                id={`library-tab-${cat.id}`}
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                  isSelected 
                    ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-md' 
                    : 'bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-750'
                }`}
              >
                <div className="space-y-0.5">
                  <span className="text-[8px] font-mono block text-slate-500 uppercase tracking-widest">{cat.territoryName}</span>
                  <span className="text-slate-200 font-bold block group-hover:text-amber-400">{cat.name}</span>
                </div>
                <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-700'}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT DISPLAY WINDOW */}
      <div className="flex-grow bg-slate-950 rounded-xl p-6 border border-slate-800 flex flex-col justify-between" id="library-display-window">
        <div className="space-y-6">
          <div className="space-y-1.5 border-b border-slate-900 pb-4">
            <span className="text-[10px] text-amber-500 font-mono font-bold uppercase tracking-widest block">Categoría de Arsenal</span>
            <h2 className="text-2xl font-black text-white">{activeData.name}</h2>
            <p className="text-xs text-slate-400 italic">"Custodiado en la fosa mental de: {activeData.territoryName}"</p>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed max-w-2xl leading-normal">
            {activeData.description}
          </p>

          <div className="space-y-5" id="verses-list">
            <span className="text-xs text-slate-400 font-mono font-black uppercase tracking-wider block">Versículos de Conquista</span>
            {activeData.verses.map((v, i) => (
              <div 
                id={`verse-card-${i}`}
                key={i} 
                className="bg-slate-900 border border-slate-850 p-4 rounded-xl space-y-3 shadow shadow-slate-950 hover:border-amber-400/20 transition-all"
              >
                <div className="flex gap-2.5 items-start">
                  <div className="p-2 bg-amber-500/10 text-amber-500 border border-amber-500/15 rounded-lg text-xs font-mono font-bold shrink-0">
                    S{i + 1}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="font-serif font-black italic text-amber-100 text-base">
                      "{v.text}"
                    </h4>
                    <span className="font-mono text-xs font-bold text-slate-400 block">― {v.reference}</span>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-850/50 p-3.5 rounded-lg space-y-1.5 text-xs">
                  <span className="text-amber-400/90 font-mono text-[9px] uppercase tracking-wider block font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Aplicación Neuro-Bíblica Práctica
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed leading-normal italic">
                    {v.application}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 items-center text-slate-500 text-[10px] font-mono mt-8 border-t border-slate-900 pt-4" id="library-footer-tip">
          <HelpCircle className="w-4 h-4 text-amber-400/30" />
          Medita en estas escrituras diariamente y susúrralas en voz alta para reformar tus respuestas cerebrales amargadas o ansiosas.
        </div>
      </div>
    </div>
  );
}
