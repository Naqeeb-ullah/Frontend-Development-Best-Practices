import React, { useState, useRef, useEffect } from 'react';
import { Smartphone, Tablet, Monitor, RefreshCw, LayoutGrid, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ResponsiveLayoutDemo() {
  const [previewWidth, setPreviewWidth] = useState<number>(800); // initial width
  const [selectedDevice, setSelectedDevice] = useState<'mobile' | 'tablet' | 'desktop' | 'custom'>('desktop');
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  const deviceWidths = {
    mobile: 375,
    tablet: 768,
    desktop: 1024,
  };

  // Synchronize button click to set width
  const handleDeviceSelect = (device: 'mobile' | 'tablet' | 'desktop') => {
    setSelectedDevice(device);
    setPreviewWidth(deviceWidths[device]);
  };

  // Determine current active tailwind breakpoint based on custom container width
  const getBreakpoint = (width: number) => {
    if (width < 640) return { name: 'Default (< 640px)', cls: 'Mobile / XS', desc: 'Focus on single-column stacks, readable larger body copy, and tap targets above 44px.' };
    if (width < 768) return { name: 'sm (≥ 640px)', cls: 'Small Tablet / SM', desc: 'Begin introducing minor 2-column details or grid cards. Elevate secondary summaries.' };
    if (width < 1024) return { name: 'md (≥ 768px)', cls: 'Tablet / MD', desc: 'Sufficient space for split sections (sidebar + content). Ideal for double columns.' };
    if (width < 1280) return { name: 'lg (≥ 1024px)', cls: 'Desktop / LG', desc: 'A comfortable landscape area. Full navigation bars, three-column grids, and balanced negative margins.' };
    return { name: 'xl (≥ 1280px)', cls: 'Wide Screen / XL', desc: 'Generous viewing canvas. Max-width constraints help keep line length readable (45-75 characters).' };
  };

  const breakpoint = getBreakpoint(previewWidth);

  // Drag resizing logic
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = previewWidth;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const deltaX = moveEvent.clientX - startX;
        let newWidth = startWidth + deltaX * 2; // Bi-directional sizing relative to center
        
        // Clamp to min 320px and max container width
        newWidth = Math.max(320, Math.min(newWidth, containerRect.width - 24));
        setPreviewWidth(Math.round(newWidth));
        setSelectedDevice('custom');
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Set default width based on actual parent container on mount
  useEffect(() => {
    if (containerRef.current) {
      const parentWidth = containerRef.current.getBoundingClientRect().width;
      setPreviewWidth(Math.min(1024, parentWidth - 40));
    }
  }, []);

  return (
    <div id="responsive-demo" className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-100 pb-5 mb-5">
          <div>
            <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-accent-500" />
              Viewport Customizer Playground
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Drag or select presets to preview layout flow, breakpoints, and reactive layout behaviors.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="device-mobile-btn"
              onClick={() => handleDeviceSelect('mobile')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                selectedDevice === 'mobile'
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Mobile (375px)
            </button>
            <button
              id="device-tablet-btn"
              onClick={() => handleDeviceSelect('tablet')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                selectedDevice === 'tablet'
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              Tablet (768px)
            </button>
            <button
              id="device-desktop-btn"
              onClick={() => handleDeviceSelect('desktop')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                selectedDevice === 'desktop'
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Desktop (1024px)
            </button>
            <button
              id="device-reset-btn"
              onClick={() => {
                if (containerRef.current) {
                  const maxW = Math.min(1024, containerRef.current.getBoundingClientRect().width - 40);
                  setPreviewWidth(maxW);
                  setSelectedDevice('desktop');
                }
              }}
              title="Reset Viewport"
              className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all bg-white"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Breakpoint Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-slate-50/50 rounded-xl p-4 border border-slate-100">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">Preview Width</span>
            <span className="text-xl font-bold font-mono text-slate-800">{previewWidth}px</span>
            <span className="text-xs text-slate-400 block mt-0.5">Resizable (drag borders)</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">Tailwind Breakpoint</span>
            <span className="text-xl font-bold font-display text-accent-500">{breakpoint.name}</span>
            <span className="text-xs text-slate-500 block mt-0.5">{breakpoint.cls} mode</span>
          </div>
          <div className="md:col-span-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">Layout Guideline</span>
            <span className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed font-sans">{breakpoint.desc}</span>
          </div>
        </div>

        {/* Viewport Resizer Shell */}
        <div 
          ref={containerRef}
          className="relative w-full min-h-[500px] bg-slate-100 border border-slate-200/50 rounded-xl flex justify-center items-start p-4 overflow-x-auto select-none"
        >
          <div 
            style={{ width: `${previewWidth}px` }}
            className="relative bg-white border border-slate-300/80 rounded-lg shadow-lg overflow-hidden transition-all duration-75 flex flex-col min-h-[440px]"
          >
            {/* Mock Header */}
            <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-[10px] font-mono text-slate-400 ml-2">localhost:3000</span>
              </div>
              <div className="text-[11px] font-medium tracking-tight bg-slate-800 px-3 py-1 rounded-full text-slate-300">
                {previewWidth < 640 ? '📱 Mobile' : previewWidth < 1024 ? '🎛️ Tablet' : '💻 Large View'}
              </div>
            </div>

            {/* Mock Content Dashboard Area */}
            <div className="flex-1 bg-slate-50 p-4 font-sans flex flex-col gap-4">
              
              {/* Layout Header / Banner */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-xl p-5 relative overflow-hidden">
                <div className="relative z-10">
                  <span className="bg-accent-500 text-[9px] px-2 py-0.5 rounded font-mono font-bold tracking-wider uppercase">Demo Space</span>
                  <h4 className="text-lg md:text-xl font-bold font-display mt-2 leading-tight">Responsive Grid Reflow</h4>
                  <p className="text-[11px] text-slate-300 mt-1 max-w-md leading-relaxed">
                    Watch the columns wrap, margins breathe, and headers size adjust. Redraws based on container width.
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-700/20 rounded-full blur-2xl pointer-events-none" />
              </div>

              {/* Dynamic Responsive Layout Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Grid Item 1 */}
                <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">1</div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-800 leading-tight">Client-first Layout</h5>
                      <p className="text-[10px] text-slate-400">Flex wrap and flex direction</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Components automatically stack on mobile and expand into columns on larger grids.
                  </p>
                  <div className="flex flex-wrap gap-1 mt-auto">
                    <span className="text-[9px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">flex-col</span>
                    <span className="text-[9px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">md:flex-row</span>
                  </div>
                </div>

                {/* Grid Item 2 */}
                <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">2</div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-800 leading-tight">Font Fluidity</h5>
                      <p className="text-[10px] text-slate-400">Dynamic scaling sizes</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Body elements should retain legible line-height and contrast across breakpoints.
                  </p>
                  <div className="flex flex-wrap gap-1 mt-auto">
                    <span className="text-[9px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">text-xs</span>
                    <span className="text-[9px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">sm:text-sm</span>
                  </div>
                </div>

                {/* Grid Item 3 */}
                <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center font-bold">3</div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-800 leading-tight">Touch Target Rules</h5>
                      <p className="text-[10px] text-slate-400">Safety margin padding</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Mobile buttons require 44px of space to prevent accidental, frustrating clicks.
                  </p>
                  <div className="flex flex-wrap gap-1 mt-auto">
                    <span className="text-[9px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">min-h-11</span>
                    <span className="text-[9px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">touch-target</span>
                  </div>
                </div>

              </div>

              {/* Responsive Columns Breakdown Section */}
              <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Dynamic Grid System</h5>
                  <p className="text-[10px] text-slate-500 mt-0.5">Calculates based on fraction units (1fr)</p>
                </div>
                <button className="w-full sm:w-auto text-[11px] font-medium bg-slate-900 text-white px-3 py-2 rounded-lg text-center hover:bg-slate-800 transition-colors">
                  Action Button
                </button>
              </div>

            </div>

            {/* Custom Drag Handle for Resizing */}
            <div 
              onMouseDown={handleMouseDown}
              className="absolute top-0 right-0 bottom-0 w-3 cursor-col-resize bg-slate-200 hover:bg-slate-400 active:bg-accent-500 transition-all flex items-center justify-center group"
              title="Drag to resize viewport"
            >
              <div className="w-[1.5px] h-10 bg-slate-400 group-hover:bg-white rounded-full" />
            </div>
            <div 
              onMouseDown={handleMouseDown}
              className="absolute top-0 left-0 bottom-0 w-3 cursor-col-resize bg-slate-200 hover:bg-slate-400 active:bg-accent-500 transition-all flex items-center justify-center group"
              title="Drag to resize viewport"
            >
              <div className="w-[1.5px] h-10 bg-slate-400 group-hover:bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices checklist card */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6">
        <h4 className="text-sm font-bold font-display text-slate-900 mb-4 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-emerald-500" />
          Responsive Design Core Directives
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-800">Desktop-First Precision, Mobile-First Code</h5>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Always code in a mobile-first paradigm utilizing Tailwind's prefix values (`sm:`, `md:`, `lg:`). Start layout definitions as stack-flows by default, then distribute into grids as space increases.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-800">Fluid Width Constraints</h5>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Use outer containers with `w-full max-w-7xl mx-auto` constraints. This ensures content feels centered and readable without endless visual stretching on ultra-wide screens.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-800">Viewport-Independent Math</h5>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Never use hardcoded screen subtraction in calculations. Leverage Flex grids and percentage systems to prevent components from clipping when parent structures or sidebars scale.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-800">Adaptive Interactive States</h5>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Adapt interactive components between mobile and desktop. On mobile, swap hovering events with touch selections and elevate hitboxes to a comfortable 44px min-height target.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
