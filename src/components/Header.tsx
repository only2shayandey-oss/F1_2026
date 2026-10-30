/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTelemetry, ScreenId } from '../context/TelemetryContext';
import { 
  Gauge, 
  Wind, 
  Zap, 
  Flag, 
  LineChart, 
  Sliders, 
  Sun, 
  Moon, 
  Play, 
  Pause,
  Menu,
  X
} from 'lucide-react';

interface NavItem {
  id: ScreenId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: 'cockpit', label: 'Cockpit', icon: Gauge },
  { id: 'aero', label: 'Aero & Chassis', icon: Wind },
  { id: 'powertrain', label: 'Power Unit', icon: Zap },
  { id: 'strategy', label: 'Strategy', icon: Flag },
  { id: 'analysis', label: 'Lap Analysis', icon: LineChart },
  { id: 'presets', label: 'Setups', icon: Sliders },
];

export const Header: React.FC = () => {
  const { 
    activeScreen, 
    setActiveScreen, 
    darkMode, 
    toggleDarkMode, 
    isSimulating, 
    toggleSimulation,
    units,
    toggleUnits
  } = useTelemetry();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0E11]/90 dark:bg-[#0B0E11]/95 bg-white/95 border-b border-[#A4B3B6]/15 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4 lg:gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setActiveScreen('cockpit')}
              className="group flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00F5D4]"
            >
              <div className="w-2.5 h-6 bg-[#00A19B] group-hover:bg-[#00F5D4] transition-colors rounded-xs" />
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-[#E1E2E7] uppercase whitespace-nowrap">
                Silver Arrow <span className="text-[#00A19B] group-hover:text-[#00F5D4] transition-colors">Telemetry</span>
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium">
            {navItems.map(item => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveScreen(item.id)}
                  className={`px-3 py-1.5 rounded-sm transition-all duration-150 whitespace-nowrap shrink-0 flex items-center gap-1.5 font-display text-xs lg:text-sm tracking-wide ${
                    isActive
                      ? 'bg-[#00A19B]/15 text-[#00A19B] dark:text-[#00F5D4] border-b-2 border-[#00A19B] dark:border-[#00F5D4] font-semibold'
                      : 'text-slate-600 dark:text-[#A4B3B6] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#12161A]'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Essential Utility Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Live Feed Toggle Button */}
            <button
              onClick={toggleSimulation}
              title={isSimulating ? "Pause live simulation" : "Resume live telemetry feed"}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm text-xs font-mono tracking-wider transition-all border ${
                isSimulating
                  ? 'bg-[#00A19B]/10 border-[#00A19B]/40 text-[#00A19B] dark:text-[#00F5D4]'
                  : 'bg-slate-100 dark:bg-[#12161A] border-slate-300 dark:border-[#A4B3B6]/20 text-slate-500 dark:text-[#A4B3B6]'
              }`}
            >
              {isSimulating ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse" />
                  <span className="hidden sm:inline">LIVE</span>
                  <Pause className="w-3 h-3 ml-0.5" />
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="hidden sm:inline">PAUSED</span>
                  <Play className="w-3 h-3 ml-0.5" />
                </>
              )}
            </button>

            {/* Units Toggle */}
            <button
              onClick={toggleUnits}
              title="Toggle KM/H vs MPH"
              className="px-2 py-1.5 rounded-sm border border-slate-200 dark:border-[#A4B3B6]/20 bg-slate-50 dark:bg-[#12161A] text-slate-700 dark:text-[#A4B3B6] hover:text-slate-900 dark:hover:text-white text-xs font-mono font-medium"
            >
              {units.toUpperCase()}
            </button>

            {/* Theme Toggle (Dark / Light) */}
            <button
              onClick={toggleDarkMode}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
              className="p-1.5 rounded-sm border border-slate-200 dark:border-[#A4B3B6]/20 bg-slate-50 dark:bg-[#12161A] text-slate-700 dark:text-[#A4B3B6] hover:text-slate-900 dark:hover:text-white hover:border-[#00A19B] transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-1.5 rounded-sm border border-slate-200 dark:border-[#A4B3B6]/20 bg-slate-50 dark:bg-[#12161A] text-slate-700 dark:text-[#A4B3B6]"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 dark:border-[#A4B3B6]/15 grid grid-cols-2 gap-1.5">
            {navItems.map(item => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveScreen(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-display tracking-wide rounded-sm text-left transition-colors ${
                    isActive
                      ? 'bg-[#00A19B]/20 text-[#00A19B] dark:text-[#00F5D4] font-semibold border-l-2 border-[#00A19B]'
                      : 'text-slate-600 dark:text-[#A4B3B6] hover:bg-slate-100 dark:hover:bg-[#12161A]'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
