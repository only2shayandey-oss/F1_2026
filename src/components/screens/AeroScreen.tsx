/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTelemetry, TireCompound } from '../../context/TelemetryContext';
import { Wind, Sliders, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const AeroScreen: React.FC = () => {
  const { 
    telemetry, 
    setFrontWingAngle, 
    setRearWingAngle, 
    setTireCompound, 
    toggleDRS 
  } = useTelemetry();

  const rearDownforcePct = Number((100 - telemetry.frontDownforcePct).toFixed(1));

  return (
    <div className="space-y-6">
      
      {/* Aerodynamics Summary Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-3.5 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">Aero Balance</span>
          <div className="flex items-baseline gap-1 mt-1 font-mono text-xl sm:text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
            <span className="text-[#00A19B] dark:text-[#00F5D4]">{telemetry.frontDownforcePct}%</span>
            <span className="text-xs text-slate-400">/</span>
            <span>{rearDownforcePct}%</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase">Front / Rear Ratio</span>
        </div>

        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-3.5 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">DRS Flap Travel</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`font-mono text-xl sm:text-2xl font-bold tabular-nums ${telemetry.drsActive ? 'text-[#00F5D4]' : 'text-slate-900 dark:text-white'}`}>
              {telemetry.drsActive ? '28.0°' : '0.0°'}
            </span>
            <span className="text-[10px] font-mono text-slate-400 uppercase">{telemetry.drsActive ? 'MAX OPEN' : 'CLOSED'}</span>
          </div>
          <button 
            onClick={toggleDRS}
            className="text-[10px] font-mono text-[#00A19B] hover:text-[#00F5D4] text-left mt-1 underline underline-offset-2"
          >
            {telemetry.drsActive ? 'Toggle Close Flap' : 'Toggle Deploy Flap'}
          </button>
        </div>

        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-3.5 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">Aerodynamic Rake</span>
          <div className="flex items-baseline gap-2 mt-1 font-mono text-xl sm:text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
            <span>+40 mm</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase">Front: 28mm | Rear: 68mm</span>
        </div>

        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-3.5 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">Fitted Compound</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`font-mono text-xl sm:text-2xl font-bold uppercase ${
              telemetry.tireCompound === 'SOFT' ? 'text-rose-500' :
              telemetry.tireCompound === 'MEDIUM' ? 'text-amber-400' : 'text-slate-700 dark:text-slate-200'
            }`}>
              {telemetry.tireCompound}
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {telemetry.tireCompound === 'SOFT' ? 'C5' : telemetry.tireCompound === 'MEDIUM' ? 'C3' : 'C1'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase">Grip Window: Optimal</span>
        </div>
      </div>

      {/* Main Grid: Chassis Aerodynamics Visualizer & Downforce Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 cols): Monocoque Wireframe & Downforce Vectors */}
        <div className="lg:col-span-7 bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-5 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-[#A4B3B6]">Aerodynamic Vector Map</span>
              <h3 className="font-display text-base sm:text-lg font-semibold text-slate-900 dark:text-white mt-0.5">
                Silver Arrow W16 Aerodynamic Flow
              </h3>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase bg-[#00A19B]/10 text-[#00A19B] dark:text-[#00F5D4] border border-[#00A19B]/30 rounded-xs">
              VENTURI EFFICIENCY 98.2%
            </span>
          </div>

          {/* Minimalist Top-down F1 Monocoque SVG schematic */}
          <div className="w-full bg-slate-100 dark:bg-[#07090B] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden">
            
            {/* Streamline wind vectors */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                <path d="M 0 60 Q 200 40 400 60" fill="none" stroke="#00F5D4" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M 0 100 Q 200 80 400 100" fill="none" stroke="#00F5D4" strokeWidth="1.5" strokeDasharray="6 3" />
                <path d="M 0 200 Q 200 220 400 200" fill="none" stroke="#00F5D4" strokeWidth="1.5" strokeDasharray="6 3" />
                <path d="M 0 240 Q 200 260 400 240" fill="none" stroke="#00F5D4" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
            </div>

            {/* Top-down Car Silhouette */}
            <svg className="w-full max-w-[320px] h-[340px]" viewBox="0 0 240 380" fill="none">
              {/* Front Wing */}
              <rect x="25" y="24" width="190" height="24" rx="2" className="fill-slate-800 dark:fill-[#1A2026] stroke-[#00A19B]" strokeWidth="1.5" />
              <line x1="30" y1="36" x2="210" y2="36" stroke="#00F5D4" strokeWidth="1.5" />
              <text x="120" y="20" textAnchor="middle" className="text-[9px] font-mono fill-slate-400">FRONT WING: {telemetry.frontWingAngle}°</text>

              {/* Front Suspension & Wheels */}
              {/* FL Wheel */}
              <rect x="10" y="58" width="28" height="65" rx="3" className="fill-slate-900 stroke-slate-400 dark:stroke-[#A4B3B6]" strokeWidth="1" />
              {/* FR Wheel */}
              <rect x="202" y="58" width="28" height="65" rx="3" className="fill-slate-900 stroke-slate-400 dark:stroke-[#A4B3B6]" strokeWidth="1" />
              
              {/* Suspension Arms */}
              <line x1="38" y1="80" x2="85" y2="95" stroke="#A4B3B6" strokeWidth="1.5" opacity="0.6" />
              <line x1="38" y1="105" x2="85" y2="105" stroke="#A4B3B6" strokeWidth="1.5" opacity="0.6" />
              <line x1="202" y1="80" x2="155" y2="95" stroke="#A4B3B6" strokeWidth="1.5" opacity="0.6" />
              <line x1="202" y1="105" x2="155" y2="105" stroke="#A4B3B6" strokeWidth="1.5" opacity="0.6" />

              {/* Nosecone and Cockpit Body */}
              <path 
                d="M 105 48 L 135 48 L 140 100 L 155 140 L 165 240 L 145 300 L 95 300 L 75 240 L 85 140 L 100 100 Z" 
                className="fill-slate-700/60 dark:fill-[#12161A] stroke-slate-400 dark:stroke-[#A4B3B6]" 
                strokeWidth="1.5" 
              />

              {/* Halo & Driver Cockpit */}
              <path d="M 102 145 Q 120 135 138 145 L 130 180 Q 120 185 110 180 Z" className="fill-slate-900 stroke-[#00A19B]" strokeWidth="1.5" />
              <circle cx="120" cy="160" r="7" className="fill-amber-400" />

              {/* Sidepods & Airbox */}
              <path d="M 75 145 L 55 180 L 55 240 L 75 255" stroke="#00F5D4" strokeWidth="1.2" fill="none" opacity="0.8" />
              <path d="M 165 145 L 185 180 L 185 240 L 165 255" stroke="#00F5D4" strokeWidth="1.2" fill="none" opacity="0.8" />

              {/* Rear Suspension & Wheels */}
              {/* RL Wheel */}
              <rect x="12" y="270" width="32" height="75" rx="3" className="fill-slate-900 stroke-slate-400 dark:stroke-[#A4B3B6]" strokeWidth="1" />
              {/* RR Wheel */}
              <rect x="196" y="270" width="32" height="75" rx="3" className="fill-slate-900 stroke-slate-400 dark:stroke-[#A4B3B6]" strokeWidth="1" />
              
              {/* Rear Suspension Arms */}
              <line x1="44" y1="295" x2="95" y2="300" stroke="#A4B3B6" strokeWidth="1.5" opacity="0.6" />
              <line x1="44" y1="320" x2="95" y2="310" stroke="#A4B3B6" strokeWidth="1.5" opacity="0.6" />
              <line x1="196" y1="295" x2="145" y2="300" stroke="#A4B3B6" strokeWidth="1.5" opacity="0.6" />
              <line x1="196" y1="320" x2="145" y2="310" stroke="#A4B3B6" strokeWidth="1.5" opacity="0.6" />

              {/* Rear Wing & DRS Flap */}
              <rect 
                x="35" 
                y="342" 
                width="170" 
                height="22" 
                rx="2" 
                className={`${telemetry.drsActive ? 'fill-[#00F5D4]/20 stroke-[#00F5D4]' : 'fill-slate-800 dark:fill-[#1A2026] stroke-slate-400 dark:stroke-[#A4B3B6]'}`} 
                strokeWidth="1.5" 
              />
              <text x="120" y="375" textAnchor="middle" className="text-[9px] font-mono fill-slate-400">
                REAR WING: {telemetry.rearWingAngle}° {telemetry.drsActive ? '(DRS OPEN)' : ''}
              </text>
            </svg>

            {/* Quick status footer under diagram */}
            <div className="w-full flex justify-between items-center mt-3 pt-3 border-t border-slate-200 dark:border-[#A4B3B6]/15 font-mono text-xs">
              <span className="text-slate-500 dark:text-[#A4B3B6]">Underfloor Ground Effect</span>
              <span className="text-[#00A19B] dark:text-[#00F5D4] font-semibold">Venturi Suction: Optimal</span>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Wing Controls & Downforce Balance Sliders */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Wing Angle Tuning Card */}
          <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-5">
            <div className="flex items-center gap-2 mb-4">
              <Sliders className="w-4 h-4 text-[#00A19B] dark:text-[#00F5D4]" />
              <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                Wing Trim & Balance Controls
              </h4>
            </div>

            {/* Front Wing Flap Slider */}
            <div className="mb-5">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-600 dark:text-[#A4B3B6]">Front Wing Flap Angle</span>
                <span className="font-bold text-slate-900 dark:text-white tabular-nums">{telemetry.frontWingAngle.toFixed(1)}°</span>
              </div>
              <input
                type="range"
                min="12"
                max="24"
                step="0.5"
                value={telemetry.frontWingAngle}
                onChange={e => setFrontWingAngle(parseFloat(e.target.value))}
                className="w-full accent-[#00A19B] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>12.0° (Low Drag)</span>
                <span>24.0° (Max Turn-in)</span>
              </div>
            </div>

            {/* Rear Wing Angle Slider */}
            <div className="mb-5">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-600 dark:text-[#A4B3B6]">Rear Wing Mainplane Angle</span>
                <span className="font-bold text-slate-900 dark:text-white tabular-nums">{telemetry.rearWingAngle.toFixed(1)}°</span>
              </div>
              <input
                type="range"
                min="16"
                max="30"
                step="0.5"
                value={telemetry.rearWingAngle}
                onChange={e => setRearWingAngle(parseFloat(e.target.value))}
                className="w-full accent-[#00A19B] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>16.0° (Monza Spec)</span>
                <span>30.0° (Monaco Spec)</span>
              </div>
            </div>

            {/* Downforce Distribution Bar */}
            <div className="pt-4 border-t border-slate-200 dark:border-[#A4B3B6]/15">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-600 dark:text-[#A4B3B6]">Downforce Distribution</span>
                <span className="font-bold text-[#00A19B] dark:text-[#00F5D4] tabular-nums">
                  {telemetry.frontDownforcePct}% Front / {rearDownforcePct}% Rear
                </span>
              </div>
              <div className="h-2.5 w-full bg-slate-200 dark:bg-[#07090B] rounded-xs overflow-hidden flex">
                <div 
                  className="h-full bg-[#00A19B]" 
                  style={{ width: `${telemetry.frontDownforcePct}%` }}
                />
                <div 
                  className="h-full bg-slate-400 dark:bg-[#A4B3B6]" 
                  style={{ width: `${rearDownforcePct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Tire Compound Selection */}
          <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-5">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-[#A4B3B6] block mb-2">
              Compound Selection
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['SOFT', 'MEDIUM', 'HARD'] as TireCompound[]).map(comp => {
                const isSelected = telemetry.tireCompound === comp;
                return (
                  <button
                    key={comp}
                    onClick={() => setTireCompound(comp)}
                    className={`py-2 px-2 text-center rounded-xs border font-display text-xs font-semibold uppercase transition-all ${
                      isSelected
                        ? comp === 'SOFT'
                          ? 'bg-rose-500/15 border-rose-500 text-rose-500'
                          : comp === 'MEDIUM'
                          ? 'bg-amber-400/15 border-amber-400 text-amber-500 dark:text-amber-400'
                          : 'bg-slate-200 dark:bg-white/15 border-slate-400 dark:border-white text-slate-900 dark:text-white'
                        : 'border-slate-300 dark:border-[#A4B3B6]/20 text-slate-500 dark:text-[#A4B3B6] hover:border-slate-400'
                    }`}
                  >
                    <div>{comp}</div>
                    <div className="text-[10px] font-mono mt-0.5 opacity-80">
                      {comp === 'SOFT' ? 'C5 RED' : comp === 'MEDIUM' ? 'C3 YEL' : 'C1 WHT'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* 4-Corner Tire Thermal Matrix */}
      <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-[#A4B3B6]">Pirelli Telemetry Matrix</span>
            <h3 className="font-display text-base sm:text-lg font-semibold text-slate-900 dark:text-white mt-0.5">
              4-Corner Thermal & Degradation Profile
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Target Temp Window: 95°C - 108°C</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(['FL', 'FR', 'RL', 'RR'] as const).map(corner => {
            const tire = telemetry.tires[corner];
            const cornerLabel = corner === 'FL' ? 'Front Left' : corner === 'FR' ? 'Front Right' : corner === 'RL' ? 'Rear Left' : 'Rear Right';

            return (
              <div 
                key={corner}
                className="bg-slate-100 dark:bg-[#07090B] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-4 flex flex-col justify-between"
              >
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-[#A4B3B6]/15">
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">{corner} · {cornerLabel}</span>
                  <span className="text-xs font-mono text-[#00A19B] dark:text-[#00F5D4] font-semibold">{tire.wear}% Grip</span>
                </div>

                <div className="space-y-2.5 my-3 font-mono text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-[#A4B3B6]">Surface Temp:</span>
                    <span className="font-bold text-slate-900 dark:text-white tabular-nums">{tire.surfaceTemp}°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-[#A4B3B6]">Carcass Temp:</span>
                    <span className="font-bold text-slate-900 dark:text-white tabular-nums">{tire.carcassTemp}°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-[#A4B3B6]">Cold Pressure:</span>
                    <span className="font-bold text-slate-900 dark:text-white tabular-nums">{tire.pressure} PSI</span>
                  </div>
                </div>

                {/* Tire Wear Remaining Bar */}
                <div className="pt-2 border-t border-slate-200 dark:border-[#A4B3B6]/10">
                  <div className="w-full bg-slate-300 dark:bg-[#1A2026] h-1.5 rounded-xs overflow-hidden">
                    <div 
                      className={`h-full ${tire.wear > 75 ? 'bg-emerald-500' : tire.wear > 50 ? 'bg-amber-400' : 'bg-rose-500'}`}
                      style={{ width: `${tire.wear}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
