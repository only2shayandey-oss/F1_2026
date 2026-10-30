/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTelemetry, ERSMode } from '../../context/TelemetryContext';
import { Zap, Gauge, Cpu, Flame, CheckCircle, BatteryCharging } from 'lucide-react';

export const PowerUnitScreen: React.FC = () => {
  const { 
    telemetry, 
    setERSMode, 
    triggerOvertake 
  } = useTelemetry();

  const ersModes: { id: ERSMode; label: string; desc: string }[] = [
    { id: 'BALANCED', label: 'Balanced Race', desc: 'Optimized lap energy delta with harmonic lift-and-coast recovery.' },
    { id: 'QUALIFYING', label: 'Qualifying Hotlap', desc: 'Maximum 120kW electric deployment with zero energy clipping.' },
    { id: 'OVERTAKE', label: 'Overtake Push', desc: 'Tactical high-discharge pulse to counter DRS attacks.' },
    { id: 'RECHARGE', label: 'Aggressive Recharge', desc: 'Maximum MGU-K regen at braking zones to refill 4MJ battery pack.' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Power Unit Vitals Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-3.5 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">MGU-K Output</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-mono text-xl sm:text-2xl font-bold tabular-nums text-[#00A19B] dark:text-[#00F5D4]">
              {telemetry.mgukOutputKw} kW
            </span>
            <span className="text-[10px] font-mono text-slate-400">/ 120 MAX</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase">160 BHP Boost</span>
        </div>

        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-3.5 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">Turbo Boost Pressure</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-mono text-xl sm:text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
              {telemetry.turboBoostBar.toFixed(2)}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-[#A4B3B6]">BAR</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase">MGU-H Spool Active</span>
        </div>

        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-3.5 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">Instant Fuel Flow</span>
          <div className="flex items-baseline gap-2 mt-1 font-mono text-xl sm:text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
            <span>{telemetry.fuelFlowKgH}</span>
            <span className="text-xs text-slate-500 dark:text-[#A4B3B6]">kg/h</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase">FIA Limit: 100.0 kg/h</span>
        </div>

        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-3.5 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">Engine Coolant Temp</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-mono text-xl sm:text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
              {telemetry.engineCoolantTemp}°C
            </span>
            <span className="text-[10px] font-mono text-emerald-500 font-semibold uppercase">SAFE</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase">Oil: {telemetry.engineOilTemp}°C</span>
        </div>
      </div>

      {/* Main Hybrid Energy Flow & Deployment System */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 cols): Architecture Visualizer & Battery Pack */}
        <div className="lg:col-span-7 bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-5 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-[#A4B3B6]">Hybrid Powertrain Dynamics</span>
              <h3 className="font-display text-base sm:text-lg font-semibold text-slate-900 dark:text-white mt-0.5">
                Mercedes-AMG High Performance Powertrains
              </h3>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase bg-[#00A19B]/10 text-[#00A19B] dark:text-[#00F5D4] border border-[#00A19B]/30 rounded-xs">
              4.0 MJ / LAP REGULATION
            </span>
          </div>

          {/* Energy Architecture Block Diagram */}
          <div className="w-full bg-slate-100 dark:bg-[#07090B] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-5 space-y-4">
            
            {/* Battery State of Charge Large Gauge */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-xs text-slate-600 dark:text-[#A4B3B6] flex items-center gap-1.5">
                  <BatteryCharging className="w-4 h-4 text-[#00A19B] dark:text-[#00F5D4]" />
                  Energy Store (ES) State of Charge
                </span>
                <span className="font-mono text-base font-bold tabular-nums text-slate-900 dark:text-white">
                  {Math.round(telemetry.ersBatterySoC)}%
                </span>
              </div>
              <div className="h-4 w-full bg-slate-200 dark:bg-[#1A2026] rounded-xs overflow-hidden border border-slate-300 dark:border-[#A4B3B6]/20">
                <div 
                  className="h-full bg-gradient-to-r from-[#00A19B] to-[#00F5D4] transition-all duration-300"
                  style={{ width: `${telemetry.ersBatterySoC}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>0 MJ (Depleted)</span>
                <span>2.0 MJ Optimal Storage</span>
                <span>4.0 MJ Capacity</span>
              </div>
            </div>

            {/* Sub-system Component Pods */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-[#A4B3B6]/15">
              
              {/* ICE */}
              <div className="p-3 bg-slate-200/50 dark:bg-[#12161A] border border-slate-300 dark:border-[#A4B3B6]/15 rounded-xs">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-900 dark:text-white mb-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>1.6L V6 Turbo ICE</span>
                </div>
                <div className="space-y-1 text-[11px] font-mono text-slate-500 dark:text-[#A4B3B6]">
                  <div>RPM: <span className="text-slate-900 dark:text-white font-semibold">{telemetry.rpm.toLocaleString()}</span></div>
                  <div>Power: <span className="text-slate-900 dark:text-white font-semibold">~850 BHP</span></div>
                  <div>Efficiency: <span className="text-emerald-500 font-semibold">51.4% Thermal</span></div>
                </div>
              </div>

              {/* MGU-K */}
              <div className="p-3 bg-slate-200/50 dark:bg-[#12161A] border border-slate-300 dark:border-[#A4B3B6]/15 rounded-xs">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-900 dark:text-white mb-1">
                  <Zap className="w-3.5 h-3.5 text-[#00A19B] dark:text-[#00F5D4]" />
                  <span>MGU-K Kinetic</span>
                </div>
                <div className="space-y-1 text-[11px] font-mono text-slate-500 dark:text-[#A4B3B6]">
                  <div>Current: <span className="text-slate-900 dark:text-white font-semibold">{telemetry.mgukOutputKw} kW</span></div>
                  <div>Harvest: <span className="text-[#00F5D4] font-semibold">2.0 MJ / lap</span></div>
                  <div>Drive: <span className="text-slate-900 dark:text-white font-semibold">Crankshaft</span></div>
                </div>
              </div>

              {/* MGU-H */}
              <div className="p-3 bg-slate-200/50 dark:bg-[#12161A] border border-slate-300 dark:border-[#A4B3B6]/15 rounded-xs">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-900 dark:text-white mb-1">
                  <Cpu className="w-3.5 h-3.5 text-purple-400" />
                  <span>MGU-H Heat</span>
                </div>
                <div className="space-y-1 text-[11px] font-mono text-slate-500 dark:text-[#A4B3B6]">
                  <div>RPM: <span className="text-slate-900 dark:text-white font-semibold">124,000</span></div>
                  <div>Unlimited: <span className="text-emerald-500 font-semibold">Direct MGU-K Feed</span></div>
                  <div>Lag: <span className="text-slate-900 dark:text-white font-semibold">Zero Turbo Lag</span></div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Right Column (5 cols): Deployment Mode Selectors & Quick Overtake */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-5">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-[#A4B3B6] block mb-3">
              ERS Deployment Strategy
            </span>

            <div className="space-y-2.5">
              {ersModes.map(mode => {
                const isSelected = telemetry.ersMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setERSMode(mode.id)}
                    className={`w-full p-3 rounded-xs border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#00A19B]/15 border-[#00A19B] dark:border-[#00F5D4]'
                        : 'border-slate-300 dark:border-[#A4B3B6]/20 hover:border-slate-400 dark:hover:border-[#A4B3B6]/40 bg-slate-100 dark:bg-[#07090B]'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className={`font-display text-xs sm:text-sm font-semibold tracking-wide ${
                        isSelected ? 'text-[#00A19B] dark:text-[#00F5D4]' : 'text-slate-900 dark:text-white'
                      }`}>
                        {mode.label}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs bg-[#00A19B] text-[#0B0E11] font-bold">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-[#A4B3B6] mt-1 line-clamp-2">
                      {mode.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Quick Overtake Trigger inside Power Unit */}
            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-[#A4B3B6]/15">
              <button
                onClick={triggerOvertake}
                disabled={telemetry.overtakeActive}
                className={`w-full py-2.5 px-4 rounded-xs font-display text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  telemetry.overtakeActive
                    ? 'bg-[#00F5D4] text-[#0B0E11] animate-pulse'
                    : 'bg-[#00A19B] hover:bg-[#00F5D4] text-[#0B0E11]'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>{telemetry.overtakeActive ? `Overtake Active: ${telemetry.overtakeSecondsRemaining}s` : 'Deploy 10s Overtake Surge'}</span>
              </button>
            </div>
          </div>

          {/* Thermal Boundaries */}
          <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-5">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-[#A4B3B6] block mb-2">
              Thermal Safety Limits
            </span>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-[#A4B3B6]">Battery Pack Core:</span>
                <span className="text-slate-900 dark:text-white font-semibold">44°C (Limit: 60°C)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-[#A4B3B6]">Inverter Heat:</span>
                <span className="text-slate-900 dark:text-white font-semibold">82°C (Limit: 110°C)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-[#A4B3B6]">Turbo Bearing:</span>
                <span className="text-slate-900 dark:text-white font-semibold">188°C (Limit: 240°C)</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
