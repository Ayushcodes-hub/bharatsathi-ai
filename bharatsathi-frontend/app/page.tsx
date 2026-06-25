"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck, Landmark, Users, ArrowRight, HelpCircle, Send, Loader2, Bot, User, RefreshCw, ClipboardList, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface CitizenProfile {
  age: string;
  state: string;
  occupation: string;
  annualIncome: string;
  category: string;
}

export default function Home() {
  const [currentView, setCurrentView] = useState<'landing' | 'chat' | 'profile'>('landing');
  const [inputMessage, setInputMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Namaste! I am BharatSathi AI. Ask me any question about government schemes, subsidies, pensions, and financial planning. How can I guide you today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [profile, setProfile] = useState<CitizenProfile>({
    age: '',
    state: '',
    occupation: '',
    annualIncome: '',
    category: 'General'
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userQuery = inputMessage.trim();
    setInputMessage("");
    setMessages(prev => [...prev, { role: 'user', content: userQuery }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userQuery }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Unable to establish connection to the backend service. Ensure your Uvicorn server is up and running." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentView('chat');
    setIsLoading(true);

    const compoundPrompt = `Generate a personalized government schemes matching report for this citizen profile:
    - Age: ${profile.age} years old
    - State of Residence: ${profile.state}
    - Profession/Occupation: ${profile.occupation}
    - Annual Family Income: ₹${profile.annualIncome}
    - Social Category: ${profile.category}
    
    Please scan Central and State policies to present a clear breakdown of eligible schemes, expected payout benefits, and a precise step-by-step documentation list required to apply. Use clean bullet points.`;

    setMessages(prev => [...prev, { role: 'user', content: `Analyze my eligibility profile: Age ${profile.age}, ${profile.state}, Income ₹${profile.annualIncome}.` }]);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: compoundPrompt }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Failed to process profile matchmaking request. Check terminal logs." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col justify-between bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-gray-50">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-10 border-b border-slate-200/50 dark:border-gray-800/50 bg-white/40 dark:bg-gray-950/40 backdrop-blur-md">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('landing')}>
          <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center p-2 shadow-lg shadow-sky-500/20">
            <Landmark className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">BharatSathi <span className="text-sky-500">AI</span></span>
        </div>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 shadow-sm">
          🇮🇳 Digital India Initiative
        </span>
      </header>

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-6 flex-grow flex flex-col relative z-10 py-8 justify-center">
        <AnimatePresence mode="wait">
          
          {/* VIEW 1: HERO LANDING */}
          {currentView === 'landing' && (
            <motion.main key="landing" className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <motion.div className="lg:col-span-7 flex flex-col space-y-6" initial="hidden" animate="visible" variants={containerVariants}>
                <motion.div variants={fadeIn} className="inline-flex items-center gap-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 px-4 py-1.5 rounded-full text-xs font-semibold w-fit border border-sky-500/20">
                  <Sparkles className="w-3.5 h-3.5" /> Next-Gen Citizen Welfare Intelligence Platform
                </motion.div>
                <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                  Find Every Benefit <br />
                  <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 bg-clip-text text-transparent">You Deserve.</span>
                </motion.h1>
                <motion.p variants={fadeIn} className="text-lg text-slate-600 dark:text-gray-400 max-w-xl leading-relaxed">
                  AI-powered clear guidance for Indian government schemes, subsidies, pensions, farming benefits, and educational scholarships.
                </motion.p>
                <motion.div variants={fadeIn} className="pt-4 flex flex-col sm:flex-row gap-4">
                  <button onClick={() => setCurrentView('chat')} className="w-full sm:w-auto px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2 group">
                    Start Chatting <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button onClick={() => setCurrentView('profile')} className="w-full sm:w-auto px-6 py-4 bg-white dark:bg-gray-900 text-slate-700 dark:text-gray-200 border border-slate-200 dark:border-gray-800 font-medium rounded-xl shadow-sm flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-gray-800">
                    <ClipboardList className="w-4 h-4 text-sky-500" /> Check Scheme Eligibility
                  </button>
                </motion.div>
              </motion.div>
              <motion.div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20"><ShieldCheck className="w-5 h-5" /></div>
                  <h3 className="font-bold text-base">Check Eligibility</h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400">Instantly parse qualification rules matches dynamically.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col space-y-3 sm:translate-y-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20"><Landmark className="w-5 h-5" /></div>
                  <h3 className="font-bold text-base">Compare Schemes</h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400">Track interest distributions and application paths.</p>
                </div>
              </motion.div>
            </motion.main>
          )}

          {/* VIEW 2: ELIGIBILITY QUESTIONNAIRE FORM */}
          {currentView === 'profile' && (
            <motion.main key="profile" className="w-full max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-xl p-8" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Citizen Eligibility Profiler</h2>
                <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Provide your general details to cross-reference central and state welfare databases.</p>
              </div>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase text-slate-400 tracking-wider">Age (Years)</label>
                    <input type="number" required placeholder="e.g. 34" value={profile.age} onChange={e => setProfile({...profile, age: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/30 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase text-slate-400 tracking-wider">State</label>
                    <input type="text" required placeholder="e.g. Karnataka" value={profile.state} onChange={e => setProfile({...profile, state: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/30 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase text-slate-400 tracking-wider">Occupation / Profession</label>
                  <input type="text" required placeholder="e.g. Small-scale Farmer, Student, Teacher" value={profile.occupation} onChange={e => setProfile({...profile, occupation: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/30 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase text-slate-400 tracking-wider">Annual Household Income (₹)</label>
                  <input type="number" required placeholder="e.g. 250000" value={profile.annualIncome} onChange={e => setProfile({...profile, annualIncome: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/30 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase text-slate-400 tracking-wider">Social Category</label>
                  <select value={profile.category} onChange={e => setProfile({...profile, category: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/30 outline-none">
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-4 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm pt-4">
                  <CheckCircle2 className="w-4 h-4" /> Analyze Matching Benefits
                </button>
              </form>
            </motion.main>
          )}

          {/* VIEW 3: LIVE EXPERT AI CHAT INTERFACE WINDOW */}
          {currentView === 'chat' && (
            <motion.main key="chat" className="w-full max-w-4xl mx-auto flex flex-col h-[70vh] bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-xl overflow-hidden" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
              <div className="px-6 py-4 border-b border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-900/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-500/20"><Bot className="w-4 h-4" /></div>
                  <div>
                    <h2 className="font-bold text-sm">BharatSathi Assistant Engine</h2>
                    <p className="text-xs text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Token Active (GPT-4o)</p>
                  </div>
                </div>
                <button onClick={() => setMessages([{ role: 'assistant', content: "Workspace cleared. How can I assist you now?" }])} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800"><RefreshCw className="w-4 h-4" /></button>
              </div>
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border ${msg.role === 'user' ? 'bg-sky-600 text-white border-sky-700' : 'bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 border-slate-200 dark:border-gray-700'}`}>{msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}</div>
                    <div className={`p-4 rounded-xl text-sm leading-relaxed border shadow-sm ${msg.role === 'user' ? 'bg-sky-600 text-white border-sky-700 rounded-tr-none' : 'bg-slate-50 dark:bg-gray-800/40 border-slate-200 dark:border-gray-800 rounded-tl-none text-slate-800 dark:text-gray-200'}`}>
                      
                      {/* Integrated ReactMarkdown Parser Engine Injection */}
                      {msg.role === 'assistant' ? (
                        <div className="space-y-2 text-slate-800 dark:text-gray-200">
                          <ReactMarkdown 
                            components={{
                              p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                              ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1 mb-2" {...props} />,
                              ol: ({node, ...props}) => <ol className="list-decimal pl-5 space-y-1 mb-2" {...props} />,
                              li: ({node, ...props}) => <li className="text-sm" {...props} />,
                              h3: ({node, ...props}) => <h3 className="text-base font-bold mt-3 mb-1 text-sky-600 dark:text-sky-400" {...props} />
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-line">{msg.content}</p>
                      )}

                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-4 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center border bg-slate-100 dark:bg-gray-800 text-slate-400 border-slate-200 dark:border-gray-700"><Bot className="w-4 h-4" /></div>
                    <div className="p-4 rounded-xl text-sm bg-slate-50 dark:bg-gray-800/40 border border-slate-200 dark:border-gray-800 text-slate-400 flex items-center gap-2 rounded-tl-none shadow-sm"><Loader2 className="w-4 h-4 animate-spin text-sky-500" /> Compiling public policy metrics and documentation guidelines...</div>
                  </div>
                )}
              </div>
              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-900/50 flex gap-2 items-center">
                <input type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} placeholder="Ask a follow-up question about these schemes..." disabled={isLoading} className="flex-grow px-4 py-3 bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40 transition-all" />
                <button type="submit" disabled={!inputMessage.trim() || isLoading} className="p-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl disabled:opacity-40"><Send className="w-4 h-4" /></button>
              </form>
            </motion.main>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-slate-200/50 dark:border-gray-800/50 text-center text-xs text-slate-400 dark:text-gray-500">
        © 2026 BharatSathi AI • Built to serve every Indian citizen with intelligent financial and welfare alignment systems.
      </footer>
    </div>
  );
}