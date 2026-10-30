/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { Flag, Radio, Clock, AlertCircle, ArrowUpRight, Check } from 'lucide-react';

interface RadioMsg {
  id: string;
  sender: 'ENGINEER' | 'DRIVER';
  time: string;
  text: string;
}

export const StrategyScreen: React.FC = () => {
  const { telemetry } = useTelemetry();
  const [radioCallActive, setRadioCallActive] = useState<string | null>(null);

  const [radioLogs, setRadioLogs] = useState<RadioMsg[]>([
    { id: '1', sender: 'ENGINEER', time: '14:34:10', text: 'Strategy Plan A confirmed. Pit window opens on Lap 37.' },
    { id: '2', sender: 'DRIVER', time: '14:33:45', text: 'Front left temperature stabilizing nicely at 101°C.' },
    { id: '3', sender: 'ENGINEER', time: '14:32:18', text: 'Gap to P2 is 2.84s. You are matching his pace in Sector 2.' },
    { id: '4', sender: 'ENGINEER', time: '14:29:55', text: 'Sector 1 purple. Outstanding commitment into Turn 3.' },
  ]);

  const sendRadioAction = (callType: string) => {
    setRadioCallActive(callType);
    setTimeout(() => {
      if (callType === 'box') {
        setRadioLogs(prev => [
          { id: Date.now().toString(), sender: 'ENGINEER', time: '14:35:00', text: 'Box confirmed for Lap 38. Hard tires standing by.' },
          ...prev
        ]);
      } else if (callType === 'planB') {
        setRadioLogs(prev => [
          { id: Date.now().toString(), sender: 'ENGINEER', time: '14:35:00', text: 'Switching to Plan B: extending stint by 4 laps.' },
          ...prev
        ]);
      } else {
        setRadioLogs(prev => [
          { id: Date.now().toString(), sender: 'DRIVER', time: '14:35:00', text: 'Copy, delta acknowledged.' },
          ...prev
        ]);
      }
      setRadioCallActive(null);
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Race Progress & Strategy Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-3.5 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">Race Position</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-mono text-xl sm:text-2xl font-bold tabular-nums text-[#00A19B] dark:text-[#00F5D4]">
              P{telemetry.driverPosition}
            </span>
            <span className="text-[10px] font-mono text-emerald-500 font-semibold uppercase">LEADER</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase">Interval: +{telemetry.gapBehindSec.toFixed(2)}s</span>
        </div>

        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-3.5 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">Optimal Pit Window</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-mono text-xl sm:text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
              Lap {telemetry.pitWindowLap}
            </span>
            <span className="text-[10px] font-mono text-slate-400 uppercase">IN 4 LAPS</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase">Target: C1 Hard Tire</span>
        </div>

        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-3.5 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">Projected Pit Loss</span>
          <div className="flex items-baseline gap-2 mt-1 font-mono text-xl sm:text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
            <span>21.4s</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase">2.2s Stationary Stop</span>
        </div>

        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-3.5 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">Pit Re-entry Slot</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-mono text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              P2 (Clear Air)
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-500 mt-1 uppercase">+4.1s to Traffic</span>
        </div>
      </div>

      {/* Timing Tower & Sector Breakdown */}
      <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-[#A4B3B6]">Live Timing Sector Analysis</span>
            <h3 className="font-display text-base sm:text-lg font-semibold text-slate-900 dark:text-white mt-0.5">
              Lap {telemetry.currentLap} / {telemetry.totalLaps} Sector Telemetry
            </h3>
          </div>
          <div className="font-mono text-xs text-slate-500 dark:text-[#A4B3B6] flex items-center gap-2">
            <span>Best Lap: <span className="font-bold text-slate-900 dark:text-white">1:24.120</span></span>
          </div>
        </div>

        {/* 3 Sector Pods */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          
          {/* Sector 1 (Purple - Session Best) */}
          <div className="p-3.5 bg-slate-100 dark:bg-[#07090B] border border-purple-500/30 rounded-xs flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs font-semibold text-slate-700 dark:text-[#A4B3B6]">SECTOR 1</span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono tracking-widest uppercase bg-purple-500/15 text-purple-400 border border-purple-500/40 rounded-xs">
                PURPLE (SESSION BEST)
              </span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-mono text-xl font-bold tabular-nums text-purple-400">
                {telemetry.sector1Time.toFixed(3)}s
              </span>
              <span className="font-mono text-[11px] text-purple-400">-0.142s</span>
            </div>
          </div>

          {/* Sector 2 (Green - Personal Best) */}
          <div className="p-3.5 bg-slate-100 dark:bg-[#07090B] border border-emerald-500/30 rounded-xs flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs font-semibold text-slate-700 dark:text-[#A4B3B6]">SECTOR 2</span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono tracking-widest uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 rounded-xs">
                GREEN (PERSONAL BEST)
              </span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-mono text-xl font-bold tabular-nums text-emerald-400">
                {telemetry.sector2Time.toFixed(3)}s
              </span>
              <span className="font-mono text-[11px] text-emerald-400">-0.089s</span>
            </div>
          </div>

          {/* Sector 3 (Green - Personal Best) */}
          <div className="p-3.5 bg-slate-100 dark:bg-[#07090B] border border-emerald-500/30 rounded-xs flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs font-semibold text-slate-700 dark:text-[#A4B3B6]">SECTOR 3</span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono tracking-widest uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 rounded-xs">
                GREEN (PERSONAL BEST)
              </span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-mono text-xl font-bold tabular-nums text-emerald-400">
                {telemetry.sector3Time.toFixed(3)}s
              </span>
              <span className="font-mono text-[11px] text-emerald-400">-0.014s</span>
            </div>
          </div>

        </div>

        {/* Minimalist Degradation Curve Bar */}
        <div className="p-4 bg-slate-100 dark:bg-[#07090B] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs">
          <div className="flex justify-between items-center text-xs font-mono mb-2">
            <span className="text-slate-600 dark:text-[#A4B3B6]">Medium Compound Degradation Window</span>
            <span className="font-bold text-[#00A19B] dark:text-[#00F5D4]">Lap 34 of 38 Optimal Stint</span>
          </div>
          <div className="h-3 w-full bg-slate-200 dark:bg-[#1A2026] rounded-xs overflow-hidden flex">
            <div className="h-full bg-[#00A19B]" style={{ width: '60%' }} />
            <div className="h-full bg-amber-400" style={{ width: '25%' }} />
            <div className="h-full bg-rose-500" style={{ width: '15%' }} />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
            <span>Lap 1-24: High Grip Peak</span>
            <span>Lap 25-36: Linear Degradation</span>
            <span>Lap 37+: Cliff Drop</span>
          </div>
        </div>
      </div>

      {/* Pit Wall Radio Log & Tactical Decision Triggers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 cols): Radio Transcript */}
        <div className="lg:col-span-7 bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-5">
          <div className="flex items-center gap-2 mb-3">
            <Radio className="w-4 h-4 text-[#00A19B] dark:text-[#00F5D4]" />
            <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Pit Wall Audio & Data Comms Log
            </h4>
          </div>

          <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
            {radioLogs.map(log => (
              <div 
                key={log.id} 
                className="p-2.5 bg-slate-100 dark:bg-[#07090B] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs text-xs font-mono"
              >
                <div className="flex justify-between items-center mb-1 text-[10px] text-slate-400">
                  <span className={`font-bold ${log.sender === 'ENGINEER' ? 'text-[#00A19B] dark:text-[#00F5D4]' : 'text-amber-500'}`}>
                    {log.sender === 'ENGINEER' ? 'RACE ENGINEER' : 'CAR 44 (HAMILTON)'}
                  </span>
                  <span>{log.time}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-200">{log.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (5 cols): Tactical Command Actions */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-5 space-y-3">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-[#A4B3B6] block mb-2">
            Pit Wall Directives
          </span>

          <button
            onClick={() => sendRadioAction('box')}
            disabled={radioCallActive !== null}
            className="w-full py-2.5 px-3 rounded-xs border border-slate-300 dark:border-[#A4B3B6]/20 bg-slate-100 dark:bg-[#07090B] hover:border-[#00A19B] text-slate-900 dark:text-white text-xs font-display font-semibold uppercase tracking-wider text-left transition-all flex items-center justify-between"
          >
            <span>Call "Box Box" (Lap 38)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#00A19B]" />
          </button>

          <button
            onClick={() => sendRadioAction('planB')}
            disabled={radioCallActive !== null}
            className="w-full py-2.5 px-3 rounded-xs border border-slate-300 dark:border-[#A4B3B6]/20 bg-slate-100 dark:bg-[#07090B] hover:border-amber-400 text-slate-900 dark:text-white text-xs font-display font-semibold uppercase tracking-wider text-left transition-all flex items-center justify-between"
          >
            <span>Switch to Plan B (Extend Stint)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
          </button>

          <button
            onClick={() => sendRadioAction('delta')}
            disabled={radioCallActive !== null}
            className="w-full py-2.5 px-3 rounded-xs border border-slate-300 dark:border-[#A4B3B6]/20 bg-slate-100 dark:bg-[#07090B] hover:border-[#00F5D4] text-slate-900 dark:text-white text-xs font-display font-semibold uppercase tracking-wider text-left transition-all flex items-center justify-between"
          >
            <span>Acknowledge Target Delta (+2.8s)</span>
            <Check className="w-3.5 h-3.5 text-[#00F5D4]" />
          </button>
        </div>

      </div>

    </div>
  );
};
