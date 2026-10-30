/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { Zap, Radio, ChevronRight, Activity } from 'lucide-react';

export const CockpitScreen: React.FC = () => {
  const { 
    telemetry, 
    toggleDRS, 
    triggerOvertake, 
    units 
  } = useTelemetry();

  // Convert speed if imperial
  const displaySpeed = units === 'imperial' 
    ? Math.round(telemetry.speed * 0.621371) 
    : telemetry.speed;
  const speedUnit = units === 'imperial' ? 'MPH' : 'KM/H';

  // Calculate RPM LED segments (15 segments)
  const maxRpm = 13000;
  const minRpm = 7000;
  const rpmPct = Math.max(0, Math.min(1, (telemetry.rpm - minRpm) / (maxRpm - minRpm)));
  const totalLeds = 16;
  const litLeds = Math.round(rpmPct * totalLeds);

  // Buffer for live telemetry sparkline
  const [speedHistory, setSpeedHistory] = useState<number[]>([
    280, 290, 305, 315, 324, 330, 310, 240, 150, 110, 130, 180, 220, 260, 295, 312
  ]);

  useEffect(() => {
    setSpeedHistory(prev => {
      const next = [...prev.slice(1), telemetry.speed];
      return next;
    });
  }, [telemetry.speed]);

  // SVG points for speed sparkline
  const minVal = 90;
  const maxVal = 340;
  const svgWidth = 400;
  const svgHeight = 70;
  const points = speedHistory.map((val, idx) => {
    const x = (idx / (speedHistory.length - 1)) * svgWidth;
    const y = svgHeight - ((val - minVal) / (maxVal - minVal)) * (svgHeight - 10) - 5;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="space-y-6">
      
      {/* Top Cockpit Vitals Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-3.5 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">Lap Delta</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`font-mono text-xl sm:text-2xl font-bold tabular-nums ${telemetry.deltaToBest <= 0 ? 'text-[#00A19B] dark:text-[#00F5D4]' : 'text-amber-500'}`}>
              {telemetry.deltaToBest > 0 ? `+${telemetry.deltaToBest.toFixed(3)}s` : `${telemetry.deltaToBest.toFixed(3)}s`}
            </span>
            <span className="text-[10px] font-mono text-slate-400 uppercase">vs Pole</span>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-3.5 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">ERS State of Charge</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-mono text-xl sm:text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
              {Math.round(telemetry.ersBatterySoC)}%
            </span>
            <span className="font-mono text-xs text-[#00A19B] dark:text-[#00F5D4] uppercase tracking-wider">{telemetry.ersMode}</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-[#07090B] h-1.5 rounded-xs mt-2 overflow-hidden">
            <div 
              className="bg-[#00A19B] dark:bg-[#00F5D4] h-full transition-all duration-300"
              style={{ width: `${telemetry.ersBatterySoC}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-3.5 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">Track Status</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-mono text-base sm:text-lg font-bold text-slate-900 dark:text-white">DRY</span>
            <span className="font-mono text-xs text-slate-500 dark:text-[#A4B3B6]">· 42.6°C Surface</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-1 uppercase">Track Grip: High</span>
        </div>

        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-3.5 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">Race Position</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-mono text-xl sm:text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
              P{telemetry.driverPosition}
            </span>
            <span className="font-mono text-xs text-slate-500 dark:text-[#A4B3B6]">
              +{telemetry.gapBehindSec.toFixed(2)}s to P2
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase">Lap {telemetry.currentLap}/{telemetry.totalLaps}</span>
        </div>
      </div>

      {/* Primary Cockpit Centerpiece: Speed, Gear, Tachometer */}
      <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-5 sm:p-8 relative overflow-hidden">
        
        {/* Subtle decorative gradient top line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00A19B] to-transparent opacity-80" />

        {/* Shift Lights Tachometer Bar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-full max-w-xl flex items-center justify-between gap-1 sm:gap-1.5 p-1.5 bg-slate-200 dark:bg-[#07090B] border border-slate-300 dark:border-[#A4B3B6]/20 rounded-xs">
            {Array.from({ length: totalLeds }).map((_, i) => {
              const isLit = i < litLeds;
              // First 6 green, next 5 red, last 5 cyan/blue
              let activeColor = 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]';
              if (i >= 6 && i < 11) {
                activeColor = 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]';
              } else if (i >= 11) {
                activeColor = 'bg-[#00F5D4] shadow-[0_0_12px_rgba(0,245,212,0.9)]';
              }

              return (
                <div
                  key={i}
                  className={`flex-1 h-3 sm:h-3.5 rounded-[1px] transition-all duration-75 ${
                    isLit ? activeColor : 'bg-slate-300 dark:bg-[#1A2026]'
                  }`}
                />
              );
            })}
          </div>
          
          <div className="w-full max-w-xl flex justify-between items-center mt-1.5 px-1 font-mono text-[10px] text-slate-400 dark:text-[#A4B3B6]/70">
            <span>7,000 RPM</span>
            <span className="font-semibold text-slate-700 dark:text-[#E1E2E7] tabular-nums">{telemetry.rpm.toLocaleString()} RPM</span>
            <span>13,000 MAX</span>
          </div>
        </div>

        {/* Central Display: Gear & Velocity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Left Column: Pedal Inputs (Throttle & Brake) */}
          <div className="flex flex-col gap-3 justify-center">
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1">
                <span className="text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">Throttle</span>
                <span className="text-[#00A19B] dark:text-[#00F5D4] font-bold tabular-nums">{telemetry.throttle}%</span>
              </div>
              <div className="h-3 w-full bg-slate-200 dark:bg-[#07090B] rounded-xs overflow-hidden border border-slate-300 dark:border-[#A4B3B6]/15">
                <div 
                  className="h-full bg-[#00A19B] dark:bg-[#00F5D4] transition-all duration-75"
                  style={{ width: `${telemetry.throttle}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1">
                <span className="text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">Brake</span>
                <span className="text-rose-500 font-bold tabular-nums">{telemetry.brake}%</span>
              </div>
              <div className="h-3 w-full bg-slate-200 dark:bg-[#07090B] rounded-xs overflow-hidden border border-slate-300 dark:border-[#A4B3B6]/15">
                <div 
                  className="h-full bg-rose-500 transition-all duration-75"
                  style={{ width: `${telemetry.brake}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-[#A4B3B6]/10 flex justify-between items-center text-xs font-mono text-slate-500 dark:text-[#A4B3B6]">
              <span>Steering</span>
              <span className="font-semibold text-slate-800 dark:text-white tabular-nums">
                {telemetry.steeringAngle > 0 ? `+${telemetry.steeringAngle}° R` : `${telemetry.steeringAngle}° L`}
              </span>
            </div>
          </div>

          {/* Center Column: Big Gear & Speed Cluster */}
          <div className="flex flex-col items-center justify-center text-center py-2 sm:py-4">
            {/* Gear Number */}
            <div className="relative">
              <span className="font-display text-7xl sm:text-8xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                {telemetry.gear === 0 ? 'N' : telemetry.gear}
              </span>
              <span className="absolute -bottom-2 -right-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                GEAR
              </span>
            </div>

            {/* Speed Number */}
            <div className="mt-4 flex flex-col items-center">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl sm:text-5xl font-bold tabular-nums tracking-tight text-[#00A19B] dark:text-[#00F5D4]">
                  {displaySpeed}
                </span>
                <span className="font-mono text-sm text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">
                  {speedUnit}
                </span>
              </div>
              <span className="font-mono text-[11px] text-slate-400 dark:text-[#A4B3B6]/70 mt-0.5">
                Apex Speed: {units === 'imperial' ? '128 MPH' : '206 KM/H'}
              </span>
            </div>
          </div>

          {/* Right Column: G-Force HUD Crosshair */}
          <div className="flex flex-col items-center justify-center">
            <span className="font-mono text-[11px] text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider mb-2">G-Force Vector</span>
            
            <div className="w-32 h-32 rounded-full border border-slate-300 dark:border-[#A4B3B6]/30 bg-slate-100 dark:bg-[#07090B] relative flex items-center justify-center">
              {/* Inner concentric ring */}
              <div className="w-20 h-20 rounded-full border border-dashed border-slate-300 dark:border-[#A4B3B6]/20 absolute" />
              {/* Crosshair lines */}
              <div className="w-full h-[1px] bg-slate-300 dark:bg-[#A4B3B6]/20 absolute" />
              <div className="h-full w-[1px] bg-slate-300 dark:bg-[#A4B3B6]/20 absolute" />
              
              {/* Dynamic G-Force Dot */}
              <div 
                className="w-3.5 h-3.5 rounded-full bg-[#00F5D4] shadow-[0_0_10px_#00F5D4] absolute transition-all duration-100 ease-out"
                style={{
                  transform: `translate(${telemetry.lateralG * 12}px, ${-telemetry.longitudinalG * 10}px)`,
                }}
              />
            </div>

            <div className="flex items-center gap-4 mt-2 font-mono text-xs">
              <span className="text-slate-600 dark:text-[#A4B3B6]">
                Lat: <span className="font-bold text-slate-900 dark:text-white tabular-nums">{telemetry.lateralG > 0 ? `+${telemetry.lateralG}G` : `${telemetry.lateralG}G`}</span>
              </span>
              <span className="text-slate-600 dark:text-[#A4B3B6]">
                Long: <span className="font-bold text-slate-900 dark:text-white tabular-nums">{telemetry.longitudinalG > 0 ? `+${telemetry.longitudinalG}G` : `${telemetry.longitudinalG}G`}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Live Sparkline Speed Trace */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-[#A4B3B6]/15">
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-xs text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#00A19B] dark:text-[#00F5D4]" />
              Live Velocity Profile (Last 15s)
            </span>
            <span className="font-mono text-xs text-slate-400">Peak: 334 {speedUnit}</span>
          </div>

          <div className="h-16 w-full bg-slate-100 dark:bg-[#07090B] rounded-xs p-2 overflow-hidden border border-slate-200 dark:border-[#A4B3B6]/15">
            <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="#00A19B"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
                className="transition-all duration-100"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Cockpit Tactical Actions: DRS & Overtake Boost */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* DRS Pod */}
        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-[#A4B3B6]">Drag Reduction System</span>
              <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white mt-0.5">
                {telemetry.drsActive ? 'DRS Active (Flap Open)' : 'DRS Armed (Zone Active)'}
              </h3>
            </div>
            <span className={`px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase rounded-xs border ${
              telemetry.drsActive 
                ? 'bg-[#00F5D4]/15 text-[#00A19B] dark:text-[#00F5D4] border-[#00F5D4]/40 animate-pulse'
                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
            }`}>
              {telemetry.drsActive ? 'DEPLOYED' : 'ENABLED'}
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-[#A4B3B6] my-3">
            Reduces rear aerodynamic drag by ~20%. Gain estimated at +12 to +14 km/h delta on detection straights.
          </p>

          <button
            onClick={toggleDRS}
            className={`w-full py-2.5 px-4 rounded-xs font-display text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-150 flex items-center justify-center gap-2 ${
              telemetry.drsActive
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/30'
                : 'bg-[#00A19B] hover:bg-[#00F5D4] text-[#0B0E11] shadow-lg shadow-[#00A19B]/20'
            }`}
          >
            <span>{telemetry.drsActive ? 'Close DRS Flap' : 'Deploy DRS Wing'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Overtake Boost Pod */}
        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-[#A4B3B6]">Push-to-Pass Power</span>
              <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white mt-0.5">
                {telemetry.overtakeActive ? `Boost Active (${telemetry.overtakeSecondsRemaining}s)` : 'MGU-K 120kW Boost'}
              </h3>
            </div>
            <span className={`px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase rounded-xs border ${
              telemetry.overtakeActive 
                ? 'bg-[#00F5D4]/20 text-[#00F5D4] border-[#00F5D4] animate-pulse'
                : 'bg-slate-200 dark:bg-[#1A2026] text-slate-600 dark:text-[#A4B3B6] border-slate-300 dark:border-[#A4B3B6]/20'
            }`}>
              {telemetry.overtakeActive ? 'DISCHARGING' : 'STANDBY'}
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-[#A4B3B6] my-3">
            Delivers maximum electrical discharge of 120kW (160bhp) directly to the crankshaft for tactical overtaking maneuvers.
          </p>

          <button
            onClick={triggerOvertake}
            disabled={telemetry.overtakeActive || telemetry.ersBatterySoC < 15}
            className={`w-full py-2.5 px-4 rounded-xs font-display text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-150 flex items-center justify-center gap-2 ${
              telemetry.overtakeActive
                ? 'bg-[#00F5D4] text-[#0B0E11] shadow-[0_0_20px_rgba(0,245,212,0.4)]'
                : 'bg-slate-800 dark:bg-[#1A2026] hover:bg-slate-700 dark:hover:bg-[#272A2E] text-white border border-slate-700 dark:border-[#A4B3B6]/30'
            }`}
          >
            <Zap className={`w-4 h-4 ${telemetry.overtakeActive ? 'text-[#0B0E11] animate-bounce' : 'text-[#00F5D4]'}`} />
            <span>{telemetry.overtakeActive ? `Overtake Active: ${telemetry.overtakeSecondsRemaining}s` : 'Trigger Overtake Boost'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
