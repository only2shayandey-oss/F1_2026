/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { Sliders, MapPin, Check, RotateCcw, Save, ShieldCheck } from 'lucide-react';

interface CircuitConfig {
  id: string;
  name: string;
  location: string;
  downforceLevel: string;
  topSpeed: string;
  frontWing: number;
  rearWing: number;
  brakeBias: number;
  diffEntry: number;
  diffExit: number;
  description: string;
}

const circuitPresets: CircuitConfig[] = [
  {
    id: 'silverstone',
    name: 'Silverstone GP',
    location: 'Great Britain',
    downforceLevel: 'Medium-High',
    topSpeed: '318 km/h',
    frontWing: 18.5,
    rearWing: 24.0,
    brakeBias: 54.5,
    diffEntry: 62,
    diffExit: 75,
    description: 'High aerodynamic efficiency with balanced front-end authority through Maggotts and Becketts high-speed S-curves.',
  },
  {
    id: 'monza',
    name: 'Autodromo Nazionale Monza',
    location: 'Italy',
    downforceLevel: 'Ultra-Low Drag',
    topSpeed: '348 km/h',
    frontWing: 14.5,
    rearWing: 17.0,
    brakeBias: 55.0,
    diffEntry: 58,
    diffExit: 70,
    description: 'Minimalist skin trim with skinny rear mainplane to maximize straight-line speed down the Rettifilo and Curva Grande.',
  },
  {
    id: 'spa',
    name: 'Circuit de Spa-Francorchamps',
    location: 'Belgium',
    downforceLevel: 'Balanced Compromise',
    topSpeed: '332 km/h',
    frontWing: 17.5,
    rearWing: 21.0,
    brakeBias: 54.0,
    diffEntry: 60,
    diffExit: 74,
    description: 'Compromise trim to retain low drag on Kemmel straight while generating essential floor suction through Pouhon.',
  },
  {
    id: 'monaco',
    name: 'Circuit de Monaco',
    location: 'Monaco',
    downforceLevel: 'Maximum Downforce',
    topSpeed: '286 km/h',
    frontWing: 24.5,
    rearWing: 32.0,
    brakeBias: 53.5,
    diffEntry: 68,
    diffExit: 82,
    description: 'Maximum aerodynamic barn-door wing angles, soft spring compliance, and aggressive turn-in geometry for tight hairpin corners.',
  },
];

export const PresetsScreen: React.FC = () => {
  const { 
    telemetry, 
    applyCircuitPreset, 
    setBrakeBiasFront, 
    setDiffEntry, 
    setDiffExit,
    simSpeed,
    setSimSpeed,
    units,
    toggleUnits
  } = useTelemetry();

  const [notification, setNotification] = useState<string | null>(null);

  const handleApplyPreset = (presetId: string) => {
    applyCircuitPreset(presetId);
    setNotification(`Applied ${presetId.toUpperCase()} aerodynamic configuration to Silver Arrow monocoque.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveCustom = () => {
    setNotification('Custom setup saved to telemetry telemetry flash memory.');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleResetBaseline = () => {
    applyCircuitPreset('silverstone');
    setNotification('Restored Mercedes-AMG factory baseline telemetry configuration.');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {notification && (
        <div className="p-3 bg-[#00A19B]/15 border border-[#00A19B] rounded-xs flex items-center justify-between text-xs font-mono text-[#00A19B] dark:text-[#00F5D4] transition-all">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#00F5D4]" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="hover:text-white">✕</button>
        </div>
      )}

      {/* Circuit Profiles Selection Grid */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-[#A4B3B6]">Aerodynamic & Chassis Trims</span>
            <h3 className="font-display text-base sm:text-lg font-semibold text-slate-900 dark:text-white mt-0.5">
              Circuit-Specific Telemetry Presets
            </h3>
          </div>
          <span className="font-mono text-xs text-slate-400">4 FIA Standard Packages</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {circuitPresets.map(preset => {
            const isActive = telemetry.activePresetId === preset.id;
            return (
              <div
                key={preset.id}
                className={`bg-slate-50 dark:bg-[#12161A] border rounded-xs p-5 transition-all flex flex-col justify-between ${
                  isActive
                    ? 'border-[#00A19B] dark:border-[#00F5D4] shadow-md shadow-[#00A19B]/10'
                    : 'border-slate-200 dark:border-[#A4B3B6]/15 hover:border-slate-300 dark:hover:border-[#A4B3B6]/30'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#00A19B] dark:text-[#00F5D4]" />
                      <h4 className="font-display text-base font-semibold text-slate-900 dark:text-white">
                        {preset.name}
                      </h4>
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase rounded-xs border ${
                      isActive
                        ? 'bg-[#00A19B]/20 text-[#00A19B] dark:text-[#00F5D4] border-[#00A19B]'
                        : 'bg-slate-200 dark:bg-[#1A2026] text-slate-500 dark:text-[#A4B3B6] border-slate-300 dark:border-[#A4B3B6]/20'
                    }`}>
                      {isActive ? 'ACTIVE TRIM' : preset.downforceLevel}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-[#A4B3B6] mb-4">
                    {preset.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 font-mono text-xs mb-4 p-2.5 bg-slate-100 dark:bg-[#07090B] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Front Flap</span>
                      <span className="font-bold text-slate-900 dark:text-white tabular-nums">{preset.frontWing}°</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Rear Flap</span>
                      <span className="font-bold text-slate-900 dark:text-white tabular-nums">{preset.rearWing}°</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Brake Bias</span>
                      <span className="font-bold text-slate-900 dark:text-white tabular-nums">{preset.brakeBias}%</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleApplyPreset(preset.id)}
                  disabled={isActive}
                  className={`w-full py-2 px-3 rounded-xs font-display text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    isActive
                      ? 'bg-slate-200 dark:bg-[#1A2026] text-slate-400 dark:text-[#A4B3B6] cursor-default'
                      : 'bg-[#00A19B] hover:bg-[#00F5D4] text-[#0B0E11]'
                  }`}
                >
                  {isActive ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Loaded On Vehicle</span>
                    </>
                  ) : (
                    <span>Load {preset.name} Trim</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fine-Tuning Cockpit Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 cols): Chassis & Mechanical Setup */}
        <div className="lg:col-span-7 bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-5 sm:p-6 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <Sliders className="w-4 h-4 text-[#00A19B] dark:text-[#00F5D4]" />
            <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Chassis Mechanical Calibration
            </h4>
          </div>

          {/* Brake Bias Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-slate-600 dark:text-[#A4B3B6]">Brake Balance (% Front)</span>
              <span className="font-bold text-slate-900 dark:text-white tabular-nums">{telemetry.brakeBiasFront.toFixed(1)}% Front / {(100 - telemetry.brakeBiasFront).toFixed(1)}% Rear</span>
            </div>
            <input
              type="range"
              min="50.0"
              max="60.0"
              step="0.5"
              value={telemetry.brakeBiasFront}
              onChange={e => setBrakeBiasFront(parseFloat(e.target.value))}
              className="w-full accent-[#00A19B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>50.0% (Rear Rotational Stability)</span>
              <span>60.0% (Lockup Prevention)</span>
            </div>
          </div>

          {/* Differential Entry Lock */}
          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-slate-600 dark:text-[#A4B3B6]">Differential Corner Entry Lock</span>
              <span className="font-bold text-slate-900 dark:text-white tabular-nums">{telemetry.diffEntryPct}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="80"
              step="1"
              value={telemetry.diffEntryPct}
              onChange={e => setDiffEntry(parseInt(e.target.value))}
              className="w-full accent-[#00A19B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>50% (Loose turn-in)</span>
              <span>80% (Braking stability)</span>
            </div>
          </div>

          {/* Differential Exit Lock */}
          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-slate-600 dark:text-[#A4B3B6]">Differential Corner Exit Lock</span>
              <span className="font-bold text-slate-900 dark:text-white tabular-nums">{telemetry.diffExitPct}%</span>
            </div>
            <input
              type="range"
              min="60"
              max="90"
              step="1"
              value={telemetry.diffExitPct}
              onChange={e => setDiffExit(parseInt(e.target.value))}
              className="w-full accent-[#00A19B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>60% (Progressive traction)</span>
              <span>90% (Max acceleration lock)</span>
            </div>
          </div>

          {/* Save & Reset Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-[#A4B3B6]/15 flex gap-3">
            <button
              onClick={handleSaveCustom}
              className="flex-1 py-2 px-3 rounded-xs bg-[#00A19B] hover:bg-[#00F5D4] text-[#0B0E11] font-display text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Trim</span>
            </button>
            <button
              onClick={handleResetBaseline}
              className="py-2 px-4 rounded-xs border border-slate-300 dark:border-[#A4B3B6]/20 bg-slate-100 dark:bg-[#1A2026] text-slate-700 dark:text-[#A4B3B6] hover:text-white font-display text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): Simulation & Display Preferences */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-5 sm:p-6 space-y-4">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-[#A4B3B6] block mb-2">
            Telemetry Environment Settings
          </span>

          {/* Sim Speed Toggle */}
          <div>
            <span className="text-xs font-mono text-slate-600 dark:text-[#A4B3B6] block mb-2">
              Telemetry Stream Rate
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSimSpeed(1)}
                className={`py-2 px-3 rounded-xs border font-mono text-xs font-semibold transition-all ${
                  simSpeed === 1
                    ? 'bg-[#00A19B]/20 border-[#00A19B] text-[#00A19B] dark:text-[#00F5D4]'
                    : 'border-slate-300 dark:border-[#A4B3B6]/20 bg-slate-100 dark:bg-[#07090B] text-slate-600 dark:text-[#A4B3B6]'
                }`}
              >
                1.0x Realtime Rate
              </button>
              <button
                onClick={() => setSimSpeed(2)}
                className={`py-2 px-3 rounded-xs border font-mono text-xs font-semibold transition-all ${
                  simSpeed === 2
                    ? 'bg-[#00A19B]/20 border-[#00A19B] text-[#00A19B] dark:text-[#00F5D4]'
                    : 'border-slate-300 dark:border-[#A4B3B6]/20 bg-slate-100 dark:bg-[#07090B] text-slate-600 dark:text-[#A4B3B6]'
                }`}
              >
                2.0x Accelerated
              </button>
            </div>
          </div>

          {/* Unit System */}
          <div className="pt-2">
            <span className="text-xs font-mono text-slate-600 dark:text-[#A4B3B6] block mb-2">
              Measurement Standard
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => units !== 'metric' && toggleUnits()}
                className={`py-2 px-3 rounded-xs border font-mono text-xs font-semibold transition-all ${
                  units === 'metric'
                    ? 'bg-[#00A19B]/20 border-[#00A19B] text-[#00A19B] dark:text-[#00F5D4]'
                    : 'border-slate-300 dark:border-[#A4B3B6]/20 bg-slate-100 dark:bg-[#07090B] text-slate-600 dark:text-[#A4B3B6]'
                }`}
              >
                Metric (KM/H, °C, Bar)
              </button>
              <button
                onClick={() => units !== 'imperial' && toggleUnits()}
                className={`py-2 px-3 rounded-xs border font-mono text-xs font-semibold transition-all ${
                  units === 'imperial'
                    ? 'bg-[#00A19B]/20 border-[#00A19B] text-[#00A19B] dark:text-[#00F5D4]'
                    : 'border-slate-300 dark:border-[#A4B3B6]/20 bg-slate-100 dark:bg-[#07090B] text-slate-600 dark:text-[#A4B3B6]'
                }`}
              >
                Imperial (MPH, °F, PSI)
              </button>
            </div>
          </div>

          {/* System Security Invariants Verified */}
          <div className="pt-4 border-t border-slate-200 dark:border-[#A4B3B6]/15 flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-[#A4B3B6]">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>ECU Invariants: FIA Standard Spec 2026 Compliant</span>
          </div>
        </div>

      </div>

    </div>
  );
};
