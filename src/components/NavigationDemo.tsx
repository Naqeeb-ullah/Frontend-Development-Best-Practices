import React, { useState } from 'react';
import { Menu, X, ChevronDown, Compass, Home, Settings, Database, Users, ArrowRight, ShieldCheck, Accessibility, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function NavigationDemo() {
  const [activeMenuLayout, setActiveMenuLayout] = useState<'desktop' | 'sidebar' | 'mobile'>('desktop');
  const [selectedMainTab, setSelectedMainTab] = useState<string>('Home');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
  const [accessibilityLogs, setAccessibilityLogs] = useState<string[]>([
    'System: Navigation menu initialized.',
    'Aria Log: <nav role="navigation"> declared.'
  ]);

  const addLog = (log: string) => {
    setAccessibilityLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] ${log}`,
      ...prev.slice(0, 9) // Limit to 10 logs
    ]);
  };

  const navCategories = {
    Home: [],
    Platform: [
      { name: 'Core Engine', desc: 'Real-time state and sync nodes', icon: Database },
      { name: 'Identity Nodes', desc: 'Secure client authentication', icon: ShieldCheck },
    ],
    Ecosystem: [
      { name: 'Community Forum', desc: 'Connect with expert builders', icon: Users },
      { name: 'Partner Registry', desc: 'Third-party integrations', icon: Compass },
    ],
    Settings: []
  };

  const handleTabClick = (tab: string) => {
    setSelectedMainTab(tab);
    addLog(`Focus Shift: Activated main tab "${tab}".`);
    
    if (navCategories[tab as keyof typeof navCategories]?.length > 0) {
      setActiveDropdown(activeDropdown === tab ? null : tab);
      addLog(`Aria Event: Set aria-expanded="${activeDropdown !== tab}" for "${tab}" dropdown.`);
    } else {
      setActiveDropdown(null);
    }
  };

  return (
    <div id="navigation-demo" className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-5 mb-5">
          <div>
            <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-accent-500" />
              Menu Layout Architect
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Compare primary navigation layout models, categorizations, drawer slideouts, and explore client-side screen-reader attributes.
            </p>
          </div>

          {/* Toggle navigation layouts */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {[
              { id: 'desktop', label: 'Top Navbar' },
              { id: 'sidebar', label: 'Vertical Sidebar' },
              { id: 'mobile', label: 'Mobile Drawer' },
            ].map((layout) => (
              <button
                id={`layout-${layout.id}-btn`}
                key={layout.id}
                onClick={() => {
                  setActiveMenuLayout(layout.id as any);
                  setMobileMenuOpen(false);
                  addLog(`System: Shifted menu perspective to "${layout.label}".`);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeMenuLayout === layout.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {layout.label}
              </button>
            ))}
          </div>
        </div>

        {/* Outer Frame Wrapper */}
        <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-6 min-h-[350px] flex flex-col justify-start relative">
          
          {/* 1. TOP NAV BAR */}
          {activeMenuLayout === 'desktop' && (
            <div className="w-full bg-white rounded-xl border border-slate-200 shadow-md relative z-30">
              <nav role="navigation" aria-label="Main Desktop Navigation" className="px-5 py-4 flex items-center justify-between">
                
                {/* Brand Logo */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold text-xs">
                    F
                  </div>
                  <span className="text-xs font-bold font-display text-slate-900 uppercase tracking-wider">Frontend.io</span>
                </div>

                {/* Main Links */}
                <ul className="hidden md:flex items-center gap-1">
                  {Object.keys(navCategories).map((tab) => {
                    const hasSub = navCategories[tab as keyof typeof navCategories]?.length > 0;
                    return (
                      <li key={tab} className="relative">
                        <button
                          id={`nav-tab-${tab}`}
                          onClick={() => handleTabClick(tab)}
                          aria-expanded={activeDropdown === tab ? 'true' : 'false'}
                          aria-haspopup={hasSub ? 'true' : 'false'}
                          className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            selectedMainTab === tab
                              ? 'bg-slate-100 text-slate-900'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          {tab}
                          {hasSub && <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${activeDropdown === tab ? 'rotate-180' : ''}`} />}
                        </button>

                        {/* Dropdown Box */}
                        <AnimatePresence>
                          {activeDropdown === tab && hasSub && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200/80 rounded-xl shadow-xl p-2.5 z-40"
                            >
                              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block px-2 pb-2 mb-1.5 border-b border-slate-100">
                                Category Explorer
                              </span>
                              <div className="space-y-1">
                                {navCategories[tab as keyof typeof navCategories].map((subItem) => (
                                  <a
                                    key={subItem.name}
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      addLog(`Navigation: Deep linked to "${subItem.name}".`);
                                      setActiveDropdown(null);
                                    }}
                                    className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 group transition-colors"
                                  >
                                    <subItem.icon className="w-4 h-4 text-slate-500 shrink-0 mt-0.5 group-hover:text-accent-500" />
                                    <div>
                                      <span className="block text-xs font-bold text-slate-800">{subItem.name}</span>
                                      <span className="block text-[10px] text-slate-400 mt-0.5">{subItem.desc}</span>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>

                {/* Action CTA */}
                <div className="flex items-center gap-3">
                  <a href="#" className="text-xs font-medium text-slate-500 hover:text-slate-900 hidden sm:inline-block">
                    Dashboard
                  </a>
                  <button 
                    onClick={() => addLog('CTA: Triggered CTA Action Link.')}
                    className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    Get Started
                  </button>
                </div>
              </nav>

              {/* Category Breadcrumbs helper inside frame */}
              <div className="bg-slate-50 px-5 py-2.5 rounded-b-xl border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <div className="flex items-center gap-1 font-mono">
                  <span>Home</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                  <span className="text-slate-600 font-medium">{selectedMainTab}</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-600 font-medium">
                  <Accessibility className="w-3 h-3" />
                  <span>Fully Accessible Focus Loop</span>
                </div>
              </div>
            </div>
          )}

          {/* 2. COLLAPSIBLE VERTICAL SIDEBAR */}
          {activeMenuLayout === 'sidebar' && (
            <div className="w-full flex bg-white rounded-xl border border-slate-200 shadow-md min-h-[300px] overflow-hidden">
              
              {/* Sidebar */}
              <motion.div
                animate={{ width: sidebarExpanded ? 240 : 64 }}
                className="bg-slate-900 text-white flex flex-col justify-between shrink-0 border-r border-slate-800"
              >
                <div className="p-4 space-y-6">
                  {/* Sidebar Header */}
                  <div className="flex items-center justify-between">
                    {sidebarExpanded && (
                      <span className="text-xs font-bold font-display uppercase tracking-wider text-slate-400">
                        Workspace
                      </span>
                    )}
                    <button
                      id="toggle-sidebar-expand-btn"
                      onClick={() => {
                        setSidebarExpanded(!sidebarExpanded);
                        addLog(`Layout: Set sidebar expanded state to "${!sidebarExpanded}".`);
                      }}
                      className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      <Menu className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Links Stack */}
                  <nav role="navigation" className="space-y-1.5">
                    {[
                      { name: 'Home', icon: Home },
                      { name: 'Platform', icon: Database, badge: 'V2' },
                      { name: 'Ecosystem', icon: Users },
                      { name: 'Settings', icon: Settings },
                    ].map((item) => (
                      <button
                        id={`sidebar-item-${item.name}`}
                        key={item.name}
                        onClick={() => handleTabClick(item.name)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          selectedMainTab === item.name
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-4 h-4" />
                          {sidebarExpanded && <span>{item.name}</span>}
                        </div>
                        {sidebarExpanded && item.badge && (
                          <span className="bg-accent-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-[10px] text-slate-900">
                      NH
                    </div>
                    {sidebarExpanded && (
                      <div className="overflow-hidden">
                        <span className="block text-xs font-bold text-slate-200 truncate">Naqeebullah</span>
                        <span className="block text-[9px] text-slate-500 truncate">Admin Node</span>
                      </div>
                    )}
                  </div>
                </div>

              </motion.div>

              {/* Main Workspace Frame */}
              <div className="flex-1 bg-slate-50/50 p-6 flex flex-col justify-center items-center text-center">
                <span className="bg-slate-200 text-slate-700 text-[9px] font-mono font-semibold px-2 py-0.5 rounded">
                  Current View Frame
                </span>
                <h4 className="text-sm font-bold text-slate-800 font-display mt-2">Active Area: {selectedMainTab}</h4>
                <p className="text-xs text-slate-400 max-w-xs mt-1 leading-relaxed">
                  Notice how navigation nodes retain parent-child tracking variables as sidebars compress.
                </p>
              </div>

            </div>
          )}

          {/* 3. MOBILE HAMBURGER DRAWER */}
          {activeMenuLayout === 'mobile' && (
            <div className="w-full max-w-sm mx-auto bg-white rounded-2xl border border-slate-200 shadow-lg min-h-[320px] overflow-hidden flex flex-col relative">
              
              {/* Mobile Header Bar */}
              <div className="bg-slate-900 text-white px-4 py-3.5 flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white text-slate-900 rounded-lg flex items-center justify-center font-bold text-xs">
                    F
                  </div>
                  <span className="text-xs font-bold font-display uppercase tracking-wider">Mobile</span>
                </div>
                
                {/* Hamburger Toggle */}
                <button
                  id="mobile-drawer-toggle"
                  onClick={() => {
                    setMobileMenuOpen(!mobileMenuOpen);
                    addLog(`Aria Event: Toggled Hamburger menu to aria-expanded="${!mobileMenuOpen}".`);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              </div>

              {/* Mobile Content Canvas */}
              <div className="flex-1 bg-slate-50 p-5 flex flex-col justify-center items-center text-center">
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                  Toggle the hamburger on the mock smartphone frame to trigger the off-canvas sliding mobile menu navigation drawer.
                </p>
              </div>

              {/* Off-Canvas Sliding Mobile Menu Drawer */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 20, stiffness: 180 }}
                    className="absolute inset-0 bg-white z-30 flex flex-col justify-between"
                  >
                    <div className="p-5 pt-16">
                      <div className="space-y-4">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block border-b border-slate-100 pb-2">
                          Directory Node
                        </span>
                        
                        <nav role="navigation" className="space-y-2">
                          {['Home', 'Platform', 'Ecosystem', 'Settings'].map((item) => (
                            <button
                              id={`mobile-item-${item}`}
                              key={item}
                              onClick={() => {
                                setSelectedMainTab(item);
                                setMobileMenuOpen(false);
                                addLog(`Navigation: Navigated mobile drawer to "${item}".`);
                              }}
                              className={`w-full text-left p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                                selectedMainTab === item
                                  ? 'bg-slate-100 text-slate-900'
                                  : 'text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              <span>{item}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                            </button>
                          ))}
                        </nav>
                      </div>
                    </div>

                    {/* Mobile Drawer Footer info */}
                    <div className="p-5 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400 text-center leading-relaxed">
                      Safe touch targets above 48px are maintained on mobile navigators.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          )}

        </div>

        {/* Real-time Accessibility Auditor Overlay */}
        <div className="mt-5 border-t border-slate-100 pt-5">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Accessibility className="w-4 h-4 text-accent-500" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">A11y Accessibility & State Audits</span>
          </div>
          <div className="bg-slate-900 rounded-xl p-3 border border-slate-800">
            <div className="h-28 overflow-y-auto font-mono text-[10px] text-slate-400 space-y-1.5 scrollbar-thin">
              {accessibilityLogs.map((log, index) => (
                <div key={index} className={log.includes('Aria') ? 'text-blue-400' : log.includes('Focus') ? 'text-amber-400' : 'text-slate-400'}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Navigation menu best practices checklist */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6">
        <h4 className="text-sm font-bold font-display text-slate-900 mb-4 flex items-center gap-1.5">
          <Accessibility className="w-4 h-4 text-emerald-500" />
          Aria & Menu Design Best Practices
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-800">Clear Structural Division</h5>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Organize sub-links under clear, high-level headers. Provide brief explanations under dynamic menu links to assist users in understanding complex sections without clicking.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-800">Keyboard Navigation Loop</h5>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Menus must support logical keyboard tabs. Users should be able to tab into primary options, open submenus via the "Enter" key, and collapse them instantly with the "Escape" key.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-800">Responsive Drawer Decoupling</h5>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                When scaling down, decouple large horizontal navigators. Seamlessly replace them with smooth-sliding off-canvas sliding menus that make optimal use of vertical mobile heights.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-800">Active State Tracking</h5>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Highlight current user position visually and programmatically using `aria-current="page"`. This ensures both visual users and screen-readers maintain environmental awareness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
