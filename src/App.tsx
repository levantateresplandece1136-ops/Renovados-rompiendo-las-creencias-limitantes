/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { OnboardingInfo, TestResult, PlanWeek, Achievement, ChatMessage, BeliefCategory } from './types';
import Onboarding from './components/Onboarding';
import TestSurvey from './components/TestSurvey';
import RPGMap from './components/RPGMap';
import Dashboard from './components/Dashboard';
import ConsejeroElias from './components/ConsejeroElias';
import PersonalPlan from './components/PersonalPlan';
import BiblicalLibrary from './components/BiblicalLibrary';
import RenovationReport from './components/RenovationReport';
import { Compass, ShieldAlert, Award, FileText, Bot, HelpCircle, Sun, Moon, Swords, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

const defaultAchievements: Achievement[] = [
  { id: '1', name: 'Primer Paso', description: 'Completa tu Onboarding e inicia el diagnóstico.', iconName: 'Compass', unlocked: true },
  { id: '2', name: 'Mente Consciente', description: 'Descubre tu creencia limitante dominante mediante el test.', iconName: 'Flame', unlocked: false },
  { id: '3', name: 'Estratega de Misiones', description: 'Consolida tu primera misión de demolición (+50 XP).', iconName: 'Award', unlocked: false },
  { id: '4', name: 'Constructor Celeste', description: 'Alcanza el Nivel 3 (Constructor de Altares).', iconName: 'Shield', unlocked: false },
  { id: '5', name: 'Mente Renovada', description: 'Completa al menos un paso diario completo de fe.', iconName: 'Award', unlocked: false }
];

export default function App() {
  // Global App States with localStorage caching support
  const [userInfo, setUserInfo] = useState<OnboardingInfo | null>(() => {
    const saved = localStorage.getItem('renovados_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [testResult, setTestResult] = useState<TestResult | null>(() => {
    const saved = localStorage.getItem('renovados_result');
    return saved ? JSON.parse(saved) : null;
  });

  const [xp, setXP] = useState<number>(() => {
    const saved = localStorage.getItem('renovados_xp');
    return saved ? parseInt(saved) : 0;
  });

  const [level, setLevel] = useState<number>(() => {
    const saved = localStorage.getItem('renovados_level');
    return saved ? parseInt(saved) : 1;
  });

  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem('renovados_streak');
    return saved ? parseInt(saved) : 1;
  });

  const [clearedTerritories, setClearedTerritories] = useState<BeliefCategory[]>(() => {
    const saved = localStorage.getItem('renovados_cleared_territories');
    return saved ? JSON.parse(saved) : [];
  });

  const [plan, setPlan] = useState<PlanWeek[]>(() => {
    const saved = localStorage.getItem('renovados_plan');
    return saved ? JSON.parse(saved) : [];
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('renovados_achievements');
    return saved ? JSON.parse(saved) : defaultAchievements;
  });

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('renovados_chat');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentHabits, setCurrentHabits] = useState({
    readVerse: false,
    doneActivity: false,
    reflected: false,
    prayed: false
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'map' | 'plan' | 'library' | 'elias' | 'report'>('dashboard');
  const [isSendingChat, setIsSendingChat] = useState(false);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Sync to local storage
  useEffect(() => {
    if (userInfo) localStorage.setItem('renovados_user', JSON.stringify(userInfo));
    if (testResult) localStorage.setItem('renovados_result', JSON.stringify(testResult));
    localStorage.setItem('renovados_xp', xp.toString());
    localStorage.setItem('renovados_level', level.toString());
    localStorage.setItem('renovados_streak', streak.toString());
    localStorage.setItem('renovados_cleared_territories', JSON.stringify(clearedTerritories));
    localStorage.setItem('renovados_plan', JSON.stringify(plan));
    localStorage.setItem('renovados_achievements', JSON.stringify(achievements));
    localStorage.setItem('renovados_chat', JSON.stringify(chatHistory));
  }, [userInfo, testResult, xp, level, streak, clearedTerritories, plan, achievements, chatHistory]);

  // Handle level automatic calculations (+200 XP increments)
  useEffect(() => {
    const calculatedLevel = Math.min(7, Math.floor(xp / 200) + 1);
    if (calculatedLevel !== level) {
      setLevel(calculatedLevel);
      if (calculatedLevel >= 3) {
        unlockAchievement('4'); // Unlock Constructor Celeste at Level 3
      }
    }
  }, [xp]);

  const awardXP = (value: number) => {
    setXP(prev => prev + value);
  };

  const unlockAchievement = (id: string) => {
    setAchievements(prev => prev.map(ach => {
      if (ach.id === id && !ach.unlocked) {
        return { ...ach, unlocked: true, unlockedAt: new Date().toISOString() };
      }
      return ach;
    }));
  };

  const handleOnboardingComplete = (data: OnboardingInfo) => {
    setUserInfo(data);
    awardXP(50); // Welcome bonus XP!
  };

  const handleTestSurveyComplete = (result: TestResult) => {
    setTestResult(result);
    // Auto clear/unlock dominant category
    setClearedTerritories([result.dominantBelief]);
    unlockAchievement('2'); // Claim Mente Consciente trophy
    awardXP(100); // 100 XP for diagnosing
  };

  // Chat sender proxy
  const handleChatSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: text,
      timestamp: new Date().toISOString()
    };

    setChatHistory(prev => [...prev, userMsg]);
    setIsSendingChat(true);

    try {
      const response = await fetch('/api/elias/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatHistory, userMsg],
          userInfo: userInfo,
          testResult: testResult
        })
      });

      const data = await response.json();
      
      const eliasMsg: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'elias',
        text: data.text || "La verdad te hará libre. Confía en la Palabra.",
        timestamp: new Date().toISOString()
      };

      setChatHistory(prev => [...prev, eliasMsg]);
      awardXP(15); // +15 XP for holding chat counseling!
    } catch (err) {
      console.error(err);
      const errMsg: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'elias',
        text: `Error al procesar. (Consejo fuera de línea): "${text}" es una rumiación que se destruye confiando en el amor incondicional del Padre. ¿Qué opinas de Romanos 8:31?`,
        timestamp: new Date().toISOString()
      };
      setChatHistory(prev => [...prev, errMsg]);
    } finally {
      setIsSendingChat(false);
    }
  };

  // AI 30-day template generator proxy
  const handleGeneratePlan = async () => {
    setIsGeneratingPlan(true);
    try {
      const response = await fetch('/api/elias/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInfo: userInfo,
          testResult: testResult
        })
      });

      const data = await response.json();
      if (data.weeks) {
        setPlan(data.weeks);
        awardXP(100); // +100 XP for launching the active plan!
        // Inject welcoming Elias chatbot prompt containing letter
        if (data.letter) {
          setChatHistory(prev => [
            ...prev,
            {
              id: crypto.randomUUID(),
              sender: 'elias',
              text: data.letter,
              timestamp: new Date().toISOString()
            }
          ]);
        }
      }
    } catch (err) {
      console.error("Failed to generate plan securely.", err);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  // Habit checkbox toggler (dashboard level)
  const handleToggleHabit = (type: 'readVerse' | 'doneActivity' | 'reflected' | 'prayed') => {
    const nextVal = !currentHabits[type];
    setCurrentHabits(prev => ({ ...prev, [type]: nextVal }));
    
    if (nextVal) {
      const rewards = { readVerse: 10, doneActivity: 25, reflected: 15, prayed: 10 };
      awardXP(rewards[type]);
      unlockAchievement('5'); // Unlocked "Mente Renovada"
    }
  };

  // Days progress habit toggler inside week accordions
  const handleToggleDayHabit = (weekNum: number, dayNum: number, type: 'readVerse' | 'doneActivity' | 'reflected' | 'prayed') => {
    setPlan(prevPlan => {
      const copyPlan = [...prevPlan];
      const wk = copyPlan.find(w => w.weekNum === weekNum);
      if (wk) {
        const day = wk.days.find(d => d.dayNum === dayNum);
        if (day) {
          const prevVal = day[type];
          day[type] = !prevVal;
          if (day[type]) {
            const rewards = { readVerse: 10, doneActivity: 25, reflected: 15, prayed: 10 };
            awardXP(rewards[type]);
          }
        }
      }
      return copyPlan;
    });
  };

  const handleSaveDayNotes = (weekNum: number, dayNum: number, notesText: string) => {
    setPlan(prevPlan => {
      const copyPlan = [...prevPlan];
      const wk = copyPlan.find(w => w.weekNum === weekNum);
      if (wk) {
        const day = wk.days.find(d => d.dayNum === dayNum);
        if (day) {
          day.notes = notesText;
        }
      }
      return copyPlan;
    });
  };

  const clearAllProgress = () => {
    if (confirm("¿Estás seguro de reiniciar tu Ciudadela Mental? Esto borrará tus XP, racha y plan de 30 días.")) {
      localStorage.clear();
      setUserInfo(null);
      setTestResult(null);
      setXP(0);
      setLevel(1);
      setStreak(1);
      setClearedTerritories([]);
      setPlan([]);
      setAchievements(defaultAchievements);
      setChatHistory([]);
      setActiveTab('dashboard');
    }
  };

  // If user hasn't completed onboarding, render onboarding
  if (!userInfo) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} relative`}>
        {/* Simple global floating top banner */}
        <header className="flex justify-between items-center px-6 py-4 border-b border-amber-500/20 max-w-7xl mx-auto">
          <div className="flex items-center gap-1.5 font-sans font-black tracking-widest text-amber-500 select-none text-xs">
            <Swords className="w-4.5 h-4.5 animate-bounce" />
            RENOVADOS
          </div>
          <button 
            id="theme-onboarding-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)} 
            className="p-2 border border-slate-800 rounded-full text-slate-500 hover:text-amber-500 cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-500" />}
          </button>
        </header>

        <Onboarding onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  // If user hasn't done the test, render survey
  if (!testResult) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} relative`}>
        <header className="flex justify-between items-center px-6 py-4 border-b border-amber-500/20 max-w-7xl mx-auto">
          <div className="flex items-center gap-1.5 font-sans font-black tracking-widest text-amber-500 text-xs">
            <Swords className="w-4.5 h-4.5" />
            RENOVADOS • TEST
          </div>
          <button 
            id="theme-survey-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)} 
            className="p-2 border border-slate-800 rounded-full text-slate-500 hover:text-amber-500 cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-500" />}
          </button>
        </header>

        <TestSurvey userInfo={userInfo} onComplete={handleTestSurveyComplete} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 pb-16 relative ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`} id="app-viewport">
      
      {/* GLOBAL SCALABLE HEADER */}
      <header className="border-b border-slate-800/40 bg-slate-950/80 backdrop-blur sticky top-0 z-50 print:hidden" id="main-app-header">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-sm">
              R
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-mono block font-black uppercase tracking-wider">Mente Regenerada</span>
              <h1 className="font-sans font-black text-white text-base leading-none">RENOVADOS</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white uppercase">{userInfo.name}</p>
              <p className="text-[10px] text-amber-500 font-mono uppercase font-black">Streak: {streak} d</p>
            </div>
            
            {/* Theme & reset triggers */}
            <div className="flex gap-1">
              <button 
                id="toggle-theme-main"
                onClick={() => setIsDarkMode(!isDarkMode)} 
                className="p-2 border border-slate-800 rounded-full text-slate-400 hover:text-amber-400 cursor-pointer transition-colors"
                title="Cambiar Tema"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>
              <button 
                id="reset-progress-btn"
                onClick={clearAllProgress} 
                className="p-2 border border-slate-850 rounded-full text-slate-500 hover:text-red-500 cursor-pointer transition-colors"
                title="Reiniciar Senda"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* CORE SATELLITE TABS (PRINT HIDDEN) */}
      <nav className="max-w-7xl mx-auto px-6 py-5 print:hidden" id="tabs-navigation">
        <div className="bg-slate-950/60 p-1.5 border border-slate-850 rounded-2xl flex flex-wrap gap-1.5" id="nav-tabs-wrapper">
          <button
            id="tab-dashboard"
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-colors shrink-0 ${activeTab === 'dashboard' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            Dashboard
          </button>
          <button
            id="tab-map"
            onClick={() => setActiveTab('map')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-colors shrink-0 ${activeTab === 'map' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            Mapa de la Mente
          </button>
          <button
            id="tab-plan"
            onClick={() => setActiveTab('plan')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-colors shrink-0 ${activeTab === 'plan' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            Plan 30 Días
          </button>
          <button
            id="tab-elias"
            onClick={() => setActiveTab('elias')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-colors shrink-0 ${activeTab === 'elias' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            Consejero Elías (IA)
          </button>
          <button
            id="tab-library"
            onClick={() => setActiveTab('library')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-colors shrink-0 ${activeTab === 'library' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            Arsenal Bíblico
          </button>
          <button
            id="tab-report"
            onClick={() => setActiveTab('report')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-colors shrink-0 ml-auto ${activeTab === 'report' ? 'bg-amber-500 text-slate-950' : 'text-slate-450 hover:text-white'}`}
          >
            Certificado / Reporte
          </button>
        </div>
      </nav>

      {/* RENDER ACTIVE SCREEN */}
      <main className="max-w-7xl mx-auto px-6 relative" id="active-viewport-port">
        {activeTab === 'dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Dashboard
              userInfo={userInfo}
              testResult={testResult}
              xp={xp}
              level={level}
              streak={streak}
              clearedTerritories={clearedTerritories}
              achievements={achievements}
              onToggleHabit={handleToggleHabit}
              habitStates={currentHabits}
            />
          </motion.div>
        )}

        {activeTab === 'map' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <RPGMap
              dominantBelief={testResult.dominantBelief}
              unlockedCategories={clearedTerritories}
              earnedXP={awardXP}
              onInvadeCategory={(cat) => {
                // Instantly unlock and travel to library with filters
                setActiveTab('library');
                awardXP(30);
                if (!clearedTerritories.includes(cat)) {
                  setClearedTerritories(prev => [...prev, cat]);
                  unlockAchievement('3'); // Claim Estratega de Misiones
                }
              }}
              clearedTerritories={clearedTerritories}
            />
          </motion.div>
        )}

        {activeTab === 'plan' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PersonalPlan
              userInfo={userInfo}
              plan={plan}
              isGeneratingPlan={isGeneratingPlan}
              onGeneratePlan={handleGeneratePlan}
              onToggleDayHabit={handleToggleDayHabit}
              onSaveDayNotes={handleSaveDayNotes}
              earnedXP={awardXP}
            />
          </motion.div>
        )}

        {activeTab === 'elias' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ConsejeroElias
              userInfo={userInfo}
              testResult={testResult}
              chatHistory={chatHistory}
              onSendMessage={handleChatSendMessage}
              isSending={isSendingChat}
            />
          </motion.div>
        )}

        {activeTab === 'library' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <BiblicalLibrary initialCategory={testResult.dominantBelief} />
          </motion.div>
        )}

        {activeTab === 'report' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <RenovationReport
              userInfo={userInfo}
              testResult={testResult}
              xp={xp}
              level={level}
              unlockedAchievements={achievements}
              plan={plan}
              onBackToMain={() => setActiveTab('dashboard')}
            />
          </motion.div>
        )}
      </main>
    </div>
  );
}
