/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LayoutGrid, Zap, Compass, ShieldCheck, Layers, BookOpen, Sparkles, Terminal, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveSection, SectionMeta } from './types';

// Component Imports
import ResponsiveLayoutDemo from './components/ResponsiveLayoutDemo';
import AnimationDemo from './components/AnimationDemo';
import NavigationDemo from './components/NavigationDemo';
import InteractiveFormDemo from './components/InteractiveFormDemo';
import DataLoadingDemo from './components/DataLoadingDemo';

export default function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('responsive');

  const sections: SectionMeta[] = [
    {
      id: 'responsive',
      title: 'Responsive Grid Reflow',
      description: 'Device previewer simulating layout wrap across Mobile, Tablet, and Desktop break points.',
      practiceTitle: 'Fluid Viewport Engineering',
      practiceDescription: 'Layouts must use mobile-first tailwind grids and adaptive flex direction to preserve visual balance across viewport aspect ratios.',
    },
    {
      id: 'animations',
      title: 'Tactile Motion Lab',
      description: 'Real-time custom spring physics parameter adjustments paired with Framer Motion.',
      practiceTitle: 'Organic Transition Curves',
      practiceDescription: 'Avoid robotic, uniform transitions. Use physical acceleration parameters (mass, stiffness, damping) to guide and delight users.',
    },
    {
      id: 'navigation',
      title: 'Accessible Menu Architect',
      description: 'Menu configurations featuring category hierarchies, breadcrumbs, and real-time ARIA logs.',
      practiceTitle: 'Logical Focus Flows',
      practiceDescription: 'Design user menus using semantic tags. Navbars and sidebars must trap focus during keyboard tabbing to maintain screen reader accessibility.',
    },
    {
      id: 'forms',
      title: 'Secure Input Sanitizer',
      description: 'Interactive registration form featuring active password index checkers and anti-bot layers.',
      practiceTitle: 'Real-time Validation & Defense',
      practiceDescription: 'Validate inputs instantly in the browser. Incorporate invisible honeypots to catch spam robots without degrading human conversion.',
    },
    {
      id: 'dynamic',
      title: 'Dynamic Shimmer Loader',
      description: 'Fetch operations showcasing tag filters, query search debouncing, and skeleton screens.',
      practiceTitle: 'Asynchronous UX Loading',
      practiceDescription: 'Utilize wave shimmers in place of raw circular spinners. Skeletons structure layout bounds and lower perceived server latency.',
    }
  ];

  const activeMeta = sections.find(s => s.id === activeSection)!;

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans antialiased selection:bg-slate-900 selection:text-white pb-12">
      
      {/* 1. STICKY METADATA HUD HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-display font-black text-lg tracking-wider shadow-md shadow-slate-900/10">
              FE
            </div>
            <div>
              <h1 className="text-sm font-bold font-display text-slate-900 tracking-tight flex items-center gap-1.5">
                Frontend Mastery Playground
                <span className="bg-emerald-50 text-emerald-700 text-[9px] font-semibold px-2 py-0.5 rounded border border-emerald-100">
                  Live Lab v1.0
                </span>
              </h1>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Interactive laboratory illustrating modern production frontend guidelines & standards.
              </p>
            </div>
          </div>

          {/* Quick HUD Metrics */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="bg-slate-100/80 px-3.5 py-1.5 rounded-lg border border-slate-200/50 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-400 font-mono">UTC:</span>
              <span className="font-mono font-semibold text-slate-700">2026-07-06</span>
            </div>
            <div className="bg-slate-100/80 px-3.5 py-1.5 rounded-lg border border-slate-200/50 flex items-center gap-2">
              <Code className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-400 font-mono">Engine:</span>
              <span className="font-mono font-semibold text-slate-700">React 19 + Tailwind v4</span>
            </div>
          </div>

        </div>
      </header>

      {/* 2. DYNAMIC INTRO HERO HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-6">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded-full px-3 py-1 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-slate-300 font-medium">Standards Verification Console</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight leading-tight">
              Interactive Blueprint of <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">Frontend Best Practices</span>
            </h2>
            
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
              True craftsmanship is not about over-complicating features. It means executing essential requirements with responsive precision, beautiful spacing, organic motion physics, semantic accessibility, and clean validation loops.
            </p>
          </div>

          <div className="absolute top-0 right-0 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>

      {/* 3. CORE INTERACTIVE LAB WORKSPACE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Playgrounds Navigation (left column - span 3) */}
        <aside className="lg:col-span-3 space-y-4 sticky top-24">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block px-1">
            Component Laboratories
          </span>
          
          <nav className="space-y-1.5">
            {[
              { id: 'responsive', label: 'Responsive Layouts', desc: 'Grids, viewports & break points', icon: LayoutGrid, color: 'text-blue-500' },
              { id: 'animations', label: 'Tactile Animations', desc: 'Framer motion spring dynamics', icon: Zap, color: 'text-yellow-500' },
              { id: 'navigation', label: 'Accessible Navigation', desc: 'Menus, drawers & breadcrumbs', icon: Compass, color: 'text-indigo-500' },
              { id: 'forms', label: 'Input Form Validation', desc: 'Complexity indicators & honeypots', icon: ShieldCheck, color: 'text-rose-500' },
              { id: 'dynamic', label: 'Dynamic Skeletons', desc: 'Loading shimmers & search tag logs', icon: Layers, color: 'text-emerald-500' },
            ].map((navItem) => {
              const IconComp = navItem.icon;
              const isSelected = activeSection === navItem.id;

              return (
                <button
                  id={`side-nav-${navItem.id}-btn`}
                  key={navItem.id}
                  onClick={() => setActiveSection(navItem.id as any)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-white border-slate-300/80 text-slate-950 shadow-md shadow-slate-900/5 ring-1 ring-slate-900/5'
                      : 'bg-transparent border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? 'bg-slate-100 text-slate-900' : 'text-slate-400'}`}>
                    <IconComp className={`w-4 h-4 ${isSelected ? navItem.color : ''}`} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold font-display">{navItem.label}</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5 leading-relaxed">{navItem.desc}</span>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Quick Informational Best Practices Tip */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm">
            <h4 className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block flex items-center gap-1.5 mb-1.5">
              <BookOpen className="w-3.5 h-3.5 text-accent-500" />
              Focus Guideline
            </h4>
            <h5 className="text-xs font-bold text-slate-800 leading-snug">{activeMeta.practiceTitle}</h5>
            <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed">
              {activeMeta.practiceDescription}
            </p>
          </div>
        </aside>

        {/* Selected Playground Module Panel (right column - span 9) */}
        <section className="lg:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {activeSection === 'responsive' && <ResponsiveLayoutDemo />}
              {activeSection === 'animations' && <AnimationDemo />}
              {activeSection === 'navigation' && <NavigationDemo />}
              {activeSection === 'forms' && <InteractiveFormDemo />}
              {activeSection === 'dynamic' && <DataLoadingDemo />}
            </motion.div>
          </AnimatePresence>
        </section>

      </main>

    </div>
  );
}

