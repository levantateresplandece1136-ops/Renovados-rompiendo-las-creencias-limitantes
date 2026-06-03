/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { OnboardingInfo, TestResult, ChatMessage } from '../types';
import { Send, User, Sparkles, MessageSquare, ShieldCheck, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface ConsejeroEliasProps {
  userInfo: OnboardingInfo;
  testResult: TestResult | null;
  chatHistory: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isSending: boolean;
}

export default function ConsejeroElias({
  userInfo,
  testResult,
  chatHistory,
  onSendMessage,
  isSending
}: ConsejeroEliasProps) {
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isSending]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;
    const textToSend = input;
    setInput('');
    onSendMessage(textToSend);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col h-[75vh] font-sans text-slate-100 relative" id="elias-chatbox">
      
      {/* Decorative candles twilight blur glow */}
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-amber-500-[3%] bg-amber-950/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4 z-10" id="elias-header">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold font-serif shadow-lg">
            E
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Consejero Elías</h3>
            <p className="text-[10px] text-amber-500 font-mono tracking-wider uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 animate-spin" />
              Mentor de Renovación Mental
            </p>
          </div>
        </div>
        <div className="text-[10px] bg-slate-950 px-3 py-1 rounded-md text-slate-400 border border-slate-800 flex items-center gap-1.5 shrink-0 uppercase tracking-wide">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          Espacio de Confianza
        </div>
      </div>

      {/* CHAT BUBBLES PORT */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 mb-4 scrollbar-thin" id="elias-messages-list">
        {chatHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 max-w-sm mx-auto py-16" id="empty-history-helper">
            <MessageSquare className="w-10 h-10 text-slate-700 animate-pulse" />
            <h4 className="font-bold text-white text-sm">Inicia la Consejería con Elías</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Hola, <span className="text-amber-400">{userInfo.name}</span>. Cuéntame sobre tus luchas hoy en tu área de {userInfo.mainArea}. Me baso en principios bíblicos prácticos para guiarte a renovar tu mente.
            </p>
          </div>
        ) : (
          chatHistory.map((msg) => {
            const isElias = msg.sender === 'elias';
            return (
              <div 
                id={`elias-msg-${msg.id}`}
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isElias ? 'mr-auto items-start' : 'ml-auto items-end flex-row-reverse text-right'}`}
              >
                <div className={`p-2.5 rounded-lg shrink-0 ${isElias ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-slate-800 text-slate-300'}`}>
                  {isElias ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className="space-y-1">
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${isElias ? 'bg-slate-950 border border-slate-850 text-slate-200' : 'bg-amber-500 text-slate-950 font-medium'}`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-500 block font-mono">
                    {msg.sender === 'elias' ? 'Consejero Elías' : 'Tú'} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })
        )}

        {isSending && (
          <div className="flex gap-3 max-w-[80%] mr-auto items-start animate-pulse" id="typing-loader">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <RefreshCw className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs text-slate-400 leading-normal">
              Alineando la Palabra divina con tus emociones...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* INPUT EDITOR */}
      <form onSubmit={handleSend} className="flex gap-3 pt-3 border-t border-slate-800 z-10" id="elias-chat-form">
        <input
          id="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isSending}
          placeholder="Escribe tu reflexión o pregunta sobre tu mentira raíz..."
          className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-amber-500 focus:outline-none transition-colors text-white placeholder:text-slate-600 text-sm"
        />
        <button
          id="chat-send-btn"
          type="submit"
          disabled={!input.trim() || isSending}
          className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 p-3 rounded-xl transition-all font-bold flex items-center justify-center shrink-0 shadow-lg"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      <span className="text-[9px] text-slate-600 mt-3 text-center block">
        "El Consejero Elias ofrece reflexiones espirituales basadas en las Escrituras. No reemplaza a consejeros médicos profesionales."
      </span>
    </div>
  );
}
