/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { TelemetryProvider, useTelemetry, ScreenId } from './context/TelemetryContext';
import { Header } from './components/Header';
import { CockpitScreen } from './components/screens/CockpitScreen';
import { AeroScreen } from './components/screens/AeroScreen';
import { PowerUnitScreen } from './components/screens/PowerUnitScreen';
import { StrategyScreen } from './components/screens/StrategyScreen';
import { AnalysisScreen } from './components/screens/AnalysisScreen';
import { PresetsScreen } from './components/screens/PresetsScreen';

const ScreenRenderer: React.FC = () => {
  const { activeScreen } = useTelemetry();

  const renderCurrentScreen = () => {
    switch (activeScreen) {
      case 'cockpit':
        return <CockpitScreen />;
      case 'aero':
        return <AeroScreen />;
      case 'powertrain':
        return <PowerUnitScreen />;
      case 'strategy':
        return <StrategyScreen />;
      case 'analysis':
        return <AnalysisScreen />;
      case 'presets':
        return <PresetsScreen />;
      default:
        return <CockpitScreen />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeScreen}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        {renderCurrentScreen()}
      </motion.div>
    </AnimatePresence>
  );
};

const MainLayout: React.FC = () => {
  const { activeScreen, isSimulating } = useTelemetry();

  // Screen breadcrumbs
  const getScreenTitle = () => {
    switch (activeScreen) {
      case 'cockpit': return '01. Cockpit HUD & Drive Telemetry';
      case 'aero': return '02. Aerodynamics & Chassis Dynamics';
      case 'powertrain': return '03. Power Unit & Hybrid Energy Recovery';
      case 'strategy': return '04. Race Strategy & Pit Wall Timing';
      case 'analysis': return '05. Lap Telemetry & Apex Delta Analysis';
      case 'presets': return '06. Vehicle Calibration & Circuit Trims';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0B0E11] text-slate-900 dark:text-[#E1E2E7] transition-colors duration-200 flex flex-col font-sans carbon-grid">
      
      {/* Top Bar Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Subtle sub-header context kicker */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-slate-200 dark:border-[#A4B3B6]/15">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00A19B] dark:bg-[#00F5D4]" />
            <h2 className="font-display text-sm sm:text-base font-semibold tracking-wide text-slate-800 dark:text-white uppercase">
              {getScreenTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-[#A4B3B6]">
            <span>Chassis: W16 E-Performance</span>
            <span>·</span>
            <span>Channel: {isSimulating ? 'Active 50Hz Stream' : 'Buffer Paused'}</span>
          </div>
        </div>

        {/* Dynamic Animated Screen */}
        <ScreenRenderer />
      </main>

      {/* Quiet Technical Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-[#A4B3B6]/15 bg-white/50 dark:bg-[#0B0E11]/80 backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500 dark:text-[#A4B3B6]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#00A19B] rounded-full" />
            <span>Silver Arrow High-Performance Engineering Telemetry</span>
          </div>
          <div>
            <span>FIA Technical Regulations 2026</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <TelemetryProvider>
      <MainLayout />
    </TelemetryProvider>
  );
}
