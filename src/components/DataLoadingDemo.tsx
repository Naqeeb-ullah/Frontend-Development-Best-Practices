import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Filter, Flame, Clock, BookOpen, Layers, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DemoItem } from '../types';

export default function DataLoadingDemo() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'title' | 'readTime' | 'complexity'>('title');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visibleItems, setVisibleItems] = useState<DemoItem[]>([]);
  const [sliderIndex, setSliderIndex] = useState<number>(0);

  // Raw mock database
  const fullMockDatabase: DemoItem[] = [
    {
      id: 'item-1',
      title: 'Responsive Flex Grid Layouts',
      category: 'responsive',
      tags: ['CSS Grid', 'Tailwind', 'Flexbox'],
      description: 'How to craft responsive multi-column layouts that reflow seamlessly between small viewport grids and 1200px container rails.',
      complexity: 'Easy',
      readTime: 4,
    },
    {
      id: 'item-2',
      title: 'Spring Animation Physics Principles',
      category: 'animations',
      tags: ['Framer Motion', 'Springs', 'UX Feel'],
      description: 'Understanding mass, stiffness, and damping parameters to build interfaces that mimic real-world tactile reactions.',
      complexity: 'Medium',
      readTime: 6,
    },
    {
      id: 'item-3',
      title: 'Aria-Expanded & Focus Loop Traps',
      category: 'navigation',
      tags: ['ARIA Accessibility', 'Focus Loops', 'Keyboard A11y'],
      description: 'A deep dive into managing focus trapping inside hamburger drawers and declaring toggleable active visual attributes.',
      complexity: 'Hard',
      readTime: 8,
    },
    {
      id: 'item-4',
      title: 'Anti-Spam Client Honeypots',
      category: 'forms',
      tags: ['Secure Forms', 'Honeypot', 'Validation'],
      description: 'Setting up client side anti-spam triggers without degrading the workflow or annoying users with CAPTCHA requests.',
      complexity: 'Medium',
      readTime: 5,
    },
    {
      id: 'item-5',
      title: 'Custom Shimmer Skeleton UI Guides',
      category: 'dynamic',
      tags: ['Shimmer UI', 'Skeletons', 'Loading state'],
      description: 'Designing elegant, low-friction grey wave shimmers that reduce perceived load delay and prevent layout shifting.',
      complexity: 'Easy',
      readTime: 3,
    },
    {
      id: 'item-6',
      title: 'Asynchronous State Reducers',
      category: 'dynamic',
      tags: ['React Hooks', 'In-Memory State', 'Async Loading'],
      description: 'Structuring robust client state managers to securely handle search queues and filter structures without UI locking.',
      complexity: 'Hard',
      readTime: 7,
    },
  ];

  // Carousel slider featured cards list
  const featuredArticles = [
    { title: "Fluid Font Sizing Scaling Guide", text: "Empirical formulas to scale display typography proportionally with window.innerWidth grids." },
    { title: "Optimizing Touch Target Safe Margins", text: "How adding transparent padding elements expands interactive touch margins to conform to a minimum 44px layout." },
    { title: "Managing AnimatePresence Mode Exits", text: "Ensure full exit animations resolve safely prior to mounting successor structures." }
  ];

  // Filter & Search computation
  const filterAndSearch = () => {
    let result = [...fullMockDatabase];

    if (selectedTag !== 'All') {
      result = result.filter(item => item.tags.includes(selectedTag));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'readTime') return a.readTime - b.readTime;
      if (sortBy === 'complexity') {
        const order = { Easy: 1, Medium: 2, Hard: 3 };
        return order[a.complexity] - order[b.complexity];
      }
      return 0;
    });

    return result;
  };

  const triggerApiSimulation = () => {
    setIsLoading(true);
    // Simulate real database delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  // Run on mount or filter change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setVisibleItems(filterAndSearch());
      setIsLoading(false);
    }, 1000); // Initial simulated latency
    return () => clearTimeout(timer);
  }, [searchQuery, selectedTag, sortBy]);

  const uniqueTags = ['All', 'Tailwind', 'Framer Motion', 'React Hooks', 'ARIA Accessibility', 'Honeypot', 'Shimmer UI'];

  // Slider handlers
  const handleNextSlide = () => {
    setSliderIndex((prev) => (prev + 1) % featuredArticles.length);
  };

  const handlePrevSlide = () => {
    setSliderIndex((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length);
  };

  return (
    <div id="dynamic-loading-demo" className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-5 mb-5">
          <div>
            <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-accent-500" />
              Dynamic Content Dashboard
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Interact with custom content tag filters, simulated query speeds, visual skeleton loaders, and a fluid responsive touch slider.
            </p>
          </div>

          <button
            id="sim-api-reload-btn"
            onClick={triggerApiSimulation}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-all disabled:opacity-50 cursor-pointer"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            Trigger API Simulation
          </button>
        </div>

        {/* 1. SLIDER / CAROUSEL MODULE (Highly interactive component) */}
        <div className="mb-6 bg-slate-900 text-white rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
              Aesthetic Spotlight (Interactive Slider)
            </span>
            {/* Slider navigators */}
            <div className="flex gap-1.5">
              <button 
                id="slider-prev-btn"
                onClick={handlePrevSlide} 
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                aria-label="Previous Spotlight Slide"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button 
                id="slider-next-btn"
                onClick={handleNextSlide} 
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                aria-label="Next Spotlight Slide"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Slider Content Frame */}
          <div className="h-24 flex items-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={sliderIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-1.5 absolute inset-0"
              >
                <h4 className="text-sm font-bold font-display text-accent-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                  {featuredArticles[sliderIndex].title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                  {featuredArticles[sliderIndex].text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Dots */}
          <div className="flex items-center gap-1.5 mt-2">
            {featuredArticles.map((_, i) => (
              <button
                key={i}
                onClick={() => setSliderIndex(i)}
                className={`h-1 rounded-full transition-all cursor-pointer ${sliderIndex === i ? 'w-4 bg-accent-500' : 'w-1 bg-slate-700'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 2. LIVE QUERY SEARCH & FILTER TOOLS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          
          {/* Keyword search (left) */}
          <div className="md:col-span-5 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="search-input"
              type="text"
              placeholder="Search database articles by keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200/80 rounded-lg focus:outline-none focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-100 transition-all"
            />
          </div>

          {/* Tag filters selector */}
          <div className="md:col-span-4 flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              id="tag-filter-select"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200/80 rounded-lg px-2.5 py-2 focus:outline-none focus:border-slate-900 focus:bg-white"
            >
              {uniqueTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag === 'All' ? 'Filter: All Tech' : `Tech: ${tag}`}
                </option>
              ))}
            </select>
          </div>

          {/* Sort selection tools (right) */}
          <div className="md:col-span-3 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full text-xs bg-slate-50 border border-slate-200/80 rounded-lg px-2.5 py-2 focus:outline-none focus:border-slate-900 focus:bg-white"
            >
              <option value="title">Sort: Alphabetical</option>
              <option value="readTime">Sort: Read Duration</option>
              <option value="complexity">Sort: Complexity Index</option>
            </select>
          </div>
        </div>

        {/* 3. DYNAMIC CONTENT LOAD RENDER CANVAS */}
        <div className="min-h-[250px] relative">
          
          {isLoading ? (
            // SHIMMER SKELETON UI GRID (BEST PRACTICE)
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((skeleton) => (
                <div key={skeleton} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3.5">
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-lg bg-slate-200 animate-pulse" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3 w-2/3 bg-slate-200 rounded animate-pulse" />
                      <div className="h-2 w-1/3 bg-slate-200 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2.5 bg-slate-200 rounded animate-pulse w-full" />
                    <div className="h-2.5 bg-slate-200 rounded animate-pulse w-5/6" />
                  </div>
                  <div className="flex justify-between items-center mt-auto pt-3 border-t border-slate-100">
                    <div className="h-2.5 w-12 bg-slate-200 rounded animate-pulse" />
                    <div className="h-4 w-14 bg-slate-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // RENDER VISIBLE ITEMS
            <AnimatePresence mode="popLayout">
              {visibleItems.length > 0 ? (
                <motion.div
                  key="content-render-grid"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {visibleItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={{
                        hidden: { y: 15, opacity: 0 },
                        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 150, damping: 15 } }
                      }}
                      className="bg-white border border-slate-200/80 hover:border-slate-300 rounded-xl p-4 shadow-sm flex flex-col justify-between transition-colors group relative hover:shadow-md"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="bg-slate-100 text-slate-500 font-mono text-[9px] px-2 py-0.5 rounded">
                            {item.category.toUpperCase()}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {item.readTime} min read
                          </span>
                        </div>
                        
                        <h4 className="text-xs font-bold text-slate-800 leading-snug group-hover:text-accent-500 transition-colors">
                          {item.title}
                        </h4>
                        
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-4 border-t border-slate-100">
                        {/* Tags list */}
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[8px] bg-slate-50 border border-slate-100 text-slate-400 px-1.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        {/* Complexity index */}
                        <span className={`text-[9px] font-bold font-display uppercase tracking-wider flex items-center gap-1 ${
                          item.complexity === 'Easy' ? 'text-emerald-500' :
                          item.complexity === 'Medium' ? 'text-amber-500' : 'text-rose-500'
                        }`}>
                          <Flame className="w-3 h-3" />
                          {item.complexity}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                // EMPTY STATE IF FILTER RETURNED NOTHING
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center space-y-3 bg-slate-50/50 border border-dashed border-slate-200 rounded-xl"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">No Matching Records Found</h4>
                    <p className="text-[11px] text-slate-400 max-w-xs mt-1 leading-relaxed">
                      Your query array produced an empty array check. Clear keywords or modify tags to restore grid flow.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTag('All');
                    }}
                    className="bg-slate-950 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Reset Filter Queries
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          )}

        </div>

      </div>

      {/* Dynamic content best practices checklist */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6">
        <h4 className="text-sm font-bold font-display text-slate-900 mb-4 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-emerald-500" />
          Dynamic Content Loading Core Directives
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-800">Shimmer Skeletons over Spinning Glyphs</h5>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Employ responsive structural shimmer shapes instead of generic circular loader gifs. Skeletons prime user expectations regarding component bounds and eliminate annoying layout jumping.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-800">Layout Shift Protection (CLS)</h5>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Retain strict height-bounds or min-height limits on containers awaiting network resolution. This guarantees outer sections (such as headers and footers) remain fully anchored.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-800">Intuitive Search Debouncing</h5>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Add responsive local caching or subtle debounce delays to intense input queries. This preserves thread processing and prevents UI frame locks during key down actions.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-800">Fluid Featured Touch Sliders</h5>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Provide discrete forward/backward controls paired with responsive sliding motion. This turns horizontal overflow arrays into highly digestible highlights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
