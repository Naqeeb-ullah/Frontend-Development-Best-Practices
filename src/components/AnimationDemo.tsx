import React, { useState } from 'react';
import { Play, RotateCcw, Sliders, Code, Zap, Heart, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AnimationDemo() {
  const [activePreset, setActivePreset] = useState<'fade' | 'spring' | 'scale' | 'stagger' | 'micro'>('spring');
  const [duration, setDuration] = useState<number>(0.5);
  const [stiffness, setStiffness] = useState<number>(100);
  const [damping, setDamping] = useState<number>(12);
  const [triggerKey, setTriggerKey] = useState<number>(0);
  const [showCode, setShowCode] = useState<boolean>(false);

  const retrigger = () => {
    setTriggerKey((prev) => prev + 1);
  };

  const staggerItems = [
    { id: 1, title: "Modernist Cards", bg: "from-blue-500 to-indigo-500" },
    { id: 2, title: "Dynamic Flow", bg: "from-emerald-500 to-teal-500" },
    { id: 3, title: "Micro-interactivity", bg: "from-pink-500 to-rose-500" },
    { id: 4, title: "Fluid Feedback", bg: "from-amber-500 to-orange-500" },
  ];

  // Code generator helper
  const getFramerCode = () => {
    switch (activePreset) {
      case 'fade':
        return `import { motion } from 'motion/react';

export function FadeComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ${duration}, ease: 'easeOut' }}
      className="p-6 bg-white rounded-xl shadow"
    >
      <h3>Fade & Slide-In Content</h3>
    </motion.div>
  );
}`;
      case 'spring':
        return `import { motion } from 'motion/react';

export function SpringComponent() {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: ${stiffness}, 
        damping: ${damping},
        duration: ${duration}
      }}
      className="p-6 bg-white rounded-xl shadow"
    >
      <h3>Spring Physics Content</h3>
    </motion.div>
  );
}`;
      case 'scale':
        return `import { motion } from 'motion/react';

export function BounceScaleComponent() {
  return (
    <motion.div
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: 'spring',
        stiffness: ${stiffness},
        damping: 8,
        mass: 0.8
      }}
      className="p-6 bg-white rounded-xl shadow"
    >
      <h3>Overshoot Scale Content</h3>
    </motion.div>
  );
}`;
      case 'stagger':
        return `import { motion } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring' } }
};

export function StaggeredGrid() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {items.map(item => (
        <motion.div key={item.id} variants={itemVariants} />
      ))}
    </motion.div>
  );
}`;
      case 'micro':
        return `import { motion } from 'motion/react';

export function MicroInteractionButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className="px-4 py-2 bg-slate-900 text-white rounded-lg"
    >
      Interactive Element
    </motion.button>
  );
}`;
    }
  };

  return (
    <div id="animation-demo" className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        
        {/* Component Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-5 mb-5">
          <div>
            <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent-500" />
              Dynamic Motion Laboratory
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Explore professional animation behaviors, adjust spring dynamics, and extract performance-first motion configurations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="retrigger-anim-btn"
              onClick={retrigger}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Re-trigger
            </button>
            <button
              id="toggle-code-btn"
              onClick={() => setShowCode(!showCode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs font-semibold transition-all shadow-sm ${
                showCode
                  ? 'bg-accent-50 text-accent-600 border-accent-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              {showCode ? 'Hide Code' : 'View Code'}
            </button>
          </div>
        </div>

        {/* Lab Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Controls Panel (left) */}
          <div className="lg:col-span-4 space-y-5 bg-slate-50/50 border border-slate-100 rounded-xl p-5">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-3">Animation Presets</span>
              <div className="flex flex-col gap-1.5">
                {[
                  { id: 'spring', label: 'Spring Physics', desc: 'Natural organic weight motion' },
                  { id: 'fade', label: 'Eased Fade-In', desc: 'Subtle slide with linear-ease deceleration' },
                  { id: 'scale', label: 'Elastic Scale', desc: 'Bounce scale entry transition' },
                  { id: 'stagger', label: 'Staggered Grid', desc: 'Delayed children loading effect' },
                  { id: 'micro', label: 'Micro-Interactions', desc: 'Hover, grab, and select indicators' },
                ].map((preset) => (
                  <button
                    id={`preset-${preset.id}-btn`}
                    key={preset.id}
                    onClick={() => {
                      setActivePreset(preset.id as any);
                      retrigger();
                    }}
                    className={`text-left p-2.5 rounded-lg border text-xs font-medium transition-all ${
                      activePreset === preset.id
                        ? 'bg-white border-slate-300/80 text-slate-900 shadow-sm ring-2 ring-slate-900/5'
                        : 'border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                    }`}
                  >
                    <span className="block font-bold">{preset.label}</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{preset.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Parameter Sliders */}
            <div className="border-t border-slate-200/50 pt-4 space-y-4">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block flex items-center gap-1">
                <Sliders className="w-3 h-3 text-slate-500" />
                Parameters
              </span>

              {/* Slider 1: Duration */}
              {['fade', 'spring', 'scale'].includes(activePreset) && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-600">Duration (s)</span>
                    <span className="text-slate-900 font-mono text-[11px]">{duration}s</span>
                  </div>
                  <input
                    id="slider-duration"
                    type="range"
                    min="0.1"
                    max="2.0"
                    step="0.05"
                    value={duration}
                    onChange={(e) => {
                      setDuration(parseFloat(e.target.value));
                      retrigger();
                    }}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                  />
                </div>
              )}

              {/* Slider 2: Stiffness (Spring) */}
              {['spring', 'scale'].includes(activePreset) && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-600">Spring Stiffness</span>
                    <span className="text-slate-900 font-mono text-[11px]">{stiffness}</span>
                  </div>
                  <input
                    id="slider-stiffness"
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={stiffness}
                    onChange={(e) => {
                      setStiffness(parseInt(e.target.value));
                      retrigger();
                    }}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                  />
                </div>
              )}

              {/* Slider 3: Damping (Spring) */}
              {['spring', 'scale'].includes(activePreset) && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-600">Spring Damping</span>
                    <span className="text-slate-900 font-mono text-[11px]">{damping}</span>
                  </div>
                  <input
                    id="slider-damping"
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={damping}
                    onChange={(e) => {
                      setDamping(parseInt(e.target.value));
                      retrigger();
                    }}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Interactive Sandbox Area (right) */}
          <div className="lg:col-span-8 flex flex-col justify-between min-h-[380px] bg-slate-100/50 border border-slate-200/50 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-400 bg-white/80 border border-slate-200/50 px-2 py-0.5 rounded-full">
              Sandbox Canvas
            </div>

            {/* Animation Viewer Center */}
            <div className="flex-1 flex items-center justify-center py-6">
              <AnimatePresence mode="wait">
                
                {/* Preset: Spring Animation */}
                {activePreset === 'spring' && (
                  <motion.div
                    key={`spring-${triggerKey}`}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: stiffness,
                      damping: damping,
                      duration: duration,
                    }}
                    className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-md max-w-sm w-full flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold font-display shrink-0 text-lg">
                      S
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 font-display">Spring Dynamics</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        Framer motion computes spring physics internally for realistic acceleration curves.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Preset: Eased Fade */}
                {activePreset === 'fade' && (
                  <motion.div
                    key={`fade-${triggerKey}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{
                      duration: duration,
                      ease: 'easeOut',
                    }}
                    className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-md max-w-sm w-full flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold font-display shrink-0 text-lg">
                      F
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 font-display">Linear deceleration</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        Linear-easing deceleration paths slide structures comfortably into user focus areas.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Preset: Bounce Scale */}
                {activePreset === 'scale' && (
                  <motion.div
                    key={`scale-${triggerKey}`}
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.3, opacity: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: stiffness,
                      damping: 8, // Fixed low damping for nice overshoot scale
                      mass: 0.8,
                    }}
                    className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-md max-w-sm w-full flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center font-bold font-display shrink-0 text-lg">
                      B
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 font-display font-sans">Scale Bounce</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        Mass inertia can cause components to overshoot and spring back on load stages.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Preset: Stagger List */}
                {activePreset === 'stagger' && (
                  <motion.div
                    key={`stagger-${triggerKey}`}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.15 },
                      },
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg"
                  >
                    {staggerItems.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={{
                          hidden: { y: 20, opacity: 0 },
                          visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 14 } },
                        }}
                        className="bg-white border border-slate-200/80 p-4 rounded-xl shadow-sm flex flex-col gap-2"
                      >
                        <div className={`h-1.5 w-8 rounded bg-gradient-to-r ${item.bg}`} />
                        <h4 className="text-xs font-bold text-slate-800 mt-1">{item.title}</h4>
                        <p className="text-[10px] text-slate-400 leading-relaxed">
                          Grid loaders slide in asynchronously with an elastic timeline.
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Preset: Micro-interactions */}
                {activePreset === 'micro' && (
                  <div key={`micro-${triggerKey}`} className="flex flex-col items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-semibold shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/30 flex items-center gap-2 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      Hover and Hold Me
                    </motion.button>

                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-white border border-slate-200 text-rose-500 rounded-xl shadow-sm hover:border-slate-300 focus:outline-none cursor-pointer"
                        title="Elastic Micro-Reaction"
                      >
                        <Heart className="w-4 h-4 fill-rose-500" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-white border border-slate-200 text-indigo-500 rounded-xl shadow-sm hover:border-slate-300 focus:outline-none cursor-pointer"
                        title="Spring Micro-Reaction"
                      >
                        <Play className="w-4 h-4 fill-indigo-500" />
                      </motion.button>
                    </div>
                    <span className="text-[10px] text-slate-400 text-center mt-2 font-mono">
                      Provides instant responsive visual feedback to user inputs
                    </span>
                  </div>
                )}

              </AnimatePresence>
            </div>

            {/* Dynamic Code Viewer (staggered expand) */}
            <AnimatePresence>
              {showCode && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="mt-4 border-t border-slate-200/60 pt-4 overflow-hidden"
                >
                  <pre className="text-[10px] font-mono bg-slate-900 text-slate-300 rounded-lg p-3 overflow-x-auto max-h-[160px] leading-relaxed">
                    <code>{getFramerCode()}</code>
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Animation Directives */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6">
        <h4 className="text-sm font-bold font-display text-slate-900 mb-4 flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-emerald-500" />
          Animation and Motion Core Directives
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-800">Purposeful Micro-Interactions</h5>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Visual feedback (hover scales, press indices) must trigger in under 100ms. Keep micro-interactions brief so they delight without adding perceived performance latency.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-800">Spring Physics over Linear Timing</h5>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Prefer organic spring calculations over standard cubic-bezier linear timing. Natural spring physics adapt to user touch speed and feel remarkably smoother on device layers.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-800">Staggering Grid Hierarchies</h5>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Stagger load transitions for lists and grids. This guides the reader's eye in an ordered path and turns a boring network data fetch into an engaging visual story.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-800">AnimatePresence Mode Isolation</h5>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Isolate your route and dynamic layout changes inside `AnimatePresence`. Set `mode="wait"` to smoothly complete closing exits before drawing subsequent components.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
