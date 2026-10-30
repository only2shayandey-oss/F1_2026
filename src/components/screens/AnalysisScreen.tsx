/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { LineChart, Navigation, Gauge, CornerUpRight } from 'lucide-react';

interface CornerPoint {
  name: string;
  distanceM: number;
  speedA: number; // Lap 34 (km/h)
  speedB: number; // Lap 33 (km/h)
  gearA: number;
  gearB: number;
  deltaS: number;
  desc: string;
}

const keyCorners: CornerPoint[] = [
  { name: 'Turn 1 (Abbey)', distanceM: 450, speedA: 288, speedB: 282, gearA: 7, gearB: 7, deltaS: -0.048, desc: 'Later throttle release, +6 km/h minimum apex carry.' },
  { name: 'Turn 3 (Village)', distanceM: 1120, speedA: 104, speedB: 99, gearA: 2, gearB: 2, deltaS: -0.092, desc: 'Trail-braking rotated car 4m earlier for earlier full exit throttle.' },
  { name: 'Turn 6 (Brooklands)', distanceM: 2280, speedA: 162, speedB: 158, gearA: 4, gearB: 4, deltaS: -0.035, desc: 'Clean kerb clip without inducing rear axle snap.' },
  { name: 'Turn 9 (Copse)', distanceM: 3450, speedA: 294, speedB: 290, gearA: 7, gearB: 7, deltaS: -0.052, desc: 'Flat-out commitment through high-speed right-hander.' },
  { name: 'Turn 15 (Stowe)', distanceM: 4890, speedA: 198, speedB: 192, gearA: 5, gearB: 5, deltaS: -0.065, desc: 'Braking 5 meters deeper into the heavy deceleration zone.' },
];

export const AnalysisScreen: React.FC = () => {
  const { units } = useTelemetry();
  const [selectedCorner, setSelectedCorner] = useState<CornerPoint>(keyCorners[1]);
  const [scrubDistance, setScrubDistance] = useState<number>(1120);

  // Speed multiplier if imperial
  const speedMult = units === 'imperial' ? 0.621371 : 1;
  const speedLabel = units === 'imperial' ? 'MPH' : 'KM/H';

  // SVG speed profile data along circuit (simulated 20 points)
  const profilePoints = [
    { d: 0, sA: 310, sB: 308 },
    { d: 300, sA: 325, sB: 322 },
    { d: 450, sA: 288, sB: 282 }, // T1
    { d: 800, sA: 305, sB: 300 },
    { d: 1120, sA: 104, sB: 99 },  // T3
    { d: 1400, sA: 185, sB: 178 },
    { d: 1800, sA: 290, sB: 285 },
    { d: 2280, sA: 162, sB: 158 }, // T6
    { d: 2700, sA: 245, sB: 240 },
    { d: 3100, sA: 315, sB: 312 },
    { d: 3450, sA: 294, sB: 290 }, // T9 Copse
    { d: 3900, sA: 260, sB: 255 },
    { d: 4300, sA: 330, sB: 326 }, // Hangar Straight
    { d: 4890, sA: 198, sB: 192 }, // Stowe
    { d: 5300, sA: 240, sB: 235 },
    { d: 5600, sA: 115, sB: 112 }, // Vale Chicane
    { d: 5891, sA: 260, sB: 255 },
  ];

  const svgW = 600;
  const svgH = 120;
  const maxD = 5891;
  const maxS = 340;
  const minS = 80;

  const pointsA = profilePoints.map(p => {
    const x = (p.d / maxD) * svgW;
    const y = svgH - ((p.sA - minS) / (maxS - minS)) * (svgH - 20) - 10;
    return `${x},${y}`;
  }).join(' ');

  const pointsB = profilePoints.map(p => {
    const x = (p.d / maxD) * svgW;
    const y = svgH - ((p.sB - minS) / (maxS - minS)) * (svgH - 20) - 10;
    return `${x},${y}`;
  }).join(' ');

  // Current scrub cursor x position
  const cursorX = (scrubDistance / maxD) * svgW;

  return (
    <div className="space-y-6">
      
      {/* Comparison Lap Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-3.5 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">Benchmark Reference</span>
          <div className="flex items-baseline gap-2 mt-1 font-mono text-xl sm:text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
            <span>Lap 34</span>
            <span className="text-xs text-[#00A19B] dark:text-[#00F5D4]">(1:24.120)</span>
          </div>
          <span className="text-[10px] font-mono text-purple-400 mt-1 uppercase">Session Fastest Lap</span>
        </div>

        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-3.5 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">Comparison Lap</span>
          <div className="flex items-baseline gap-2 mt-1 font-mono text-xl sm:text-2xl font-bold tabular-nums text-slate-500 dark:text-[#A4B3B6]">
            <span>Lap 33</span>
            <span className="text-xs">(1:24.365)</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase">Previous Flying Lap</span>
        </div>

        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-3.5 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">Net Lap Delta</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-mono text-xl sm:text-2xl font-bold tabular-nums text-[#00A19B] dark:text-[#00F5D4]">
              -0.245s
            </span>
            <span className="text-[10px] font-mono text-emerald-500 uppercase">FASTER</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase">Micro-sector Gains: 8</span>
        </div>

        <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-3.5 flex flex-col justify-between">
          <span className="font-mono text-[11px] text-slate-500 dark:text-[#A4B3B6] uppercase tracking-wider">Apex Speed Gain</span>
          <div className="flex items-baseline gap-2 mt-1 font-mono text-xl sm:text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
            <span>+{Math.round((selectedCorner.speedA - selectedCorner.speedB) * speedMult)} {speedLabel}</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase">At {selectedCorner.name}</span>
        </div>
      </div>

      {/* Speed Curve Profile Comparison Overlay Chart */}
      <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-[#A4B3B6]">Circuit Velocity Trace</span>
            <h3 className="font-display text-base sm:text-lg font-semibold text-slate-900 dark:text-white mt-0.5">
              Speed vs Distance Overlay (Silverstone GP Circuit)
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-[#00F5D4] rounded-xs" />
              <span className="text-slate-900 dark:text-white font-semibold">Lap 34 (Faster)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-slate-400 dark:bg-[#A4B3B6] rounded-xs" />
              <span className="text-slate-500 dark:text-[#A4B3B6]">Lap 33 (Reference)</span>
            </div>
          </div>
        </div>

        {/* SVG Velocity Profile Visualizer */}
        <div className="w-full bg-slate-100 dark:bg-[#07090B] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-4 overflow-hidden relative">
          
          <svg className="w-full h-32 sm:h-40 overflow-visible" viewBox={`0 0 ${svgW} ${svgH}`} preserveAspectRatio="none">
            {/* Horizontal grid guide lines */}
            <line x1="0" y1="20" x2={svgW} y2="20" stroke="currentColor" className="text-slate-200 dark:text-[#A4B3B6]/10" strokeDasharray="3 3" />
            <line x1="0" y1="60" x2={svgW} y2="60" stroke="currentColor" className="text-slate-200 dark:text-[#A4B3B6]/10" strokeDasharray="3 3" />
            <line x1="0" y1="100" x2={svgW} y2="100" stroke="currentColor" className="text-slate-200 dark:text-[#A4B3B6]/10" strokeDasharray="3 3" />

            {/* Reference Lap 33 trace */}
            <polyline
              fill="none"
              stroke="#A4B3B6"
              strokeWidth="1.8"
              strokeDasharray="4 2"
              points={pointsB}
              opacity="0.7"
            />

            {/* Benchmark Lap 34 trace */}
            <polyline
              fill="none"
              stroke="#00F5D4"
              strokeWidth="2.5"
              points={pointsA}
            />

            {/* Scrubber vertical line */}
            <line
              x1={cursorX}
              y1="0"
              x2={cursorX}
              y2={svgH}
              stroke="#00A19B"
              strokeWidth="2"
            />
            <circle cx={cursorX} cy="30" r="4" fill="#00F5D4" />
          </svg>

          {/* Interactive Scrub Slider */}
          <div className="mt-4">
            <div className="flex justify-between text-xs font-mono mb-1 text-slate-500 dark:text-[#A4B3B6]">
              <span>Track Start (0m)</span>
              <span className="font-bold text-slate-900 dark:text-white tabular-nums">Distance: {scrubDistance}m</span>
              <span>Finish Line (5,891m)</span>
            </div>
            <input
              type="range"
              min="0"
              max={maxD}
              value={scrubDistance}
              onChange={e => {
                const dist = parseInt(e.target.value);
                setScrubDistance(dist);
                // Find nearest corner
                let nearest = keyCorners[0];
                let minDiff = 99999;
                keyCorners.forEach(c => {
                  const diff = Math.abs(c.distanceM - dist);
                  if (diff < minDiff) {
                    minDiff = diff;
                    nearest = c;
                  }
                });
                setSelectedCorner(nearest);
              }}
              className="w-full accent-[#00A19B] cursor-pointer"
            />
          </div>
        </div>

        {/* Quick Corner Apex Selector Buttons */}
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-[#A4B3B6]/15">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-[#A4B3B6] block mb-2">
            Jump to Key Circuit Apex
          </span>
          <div className="flex flex-wrap gap-2">
            {keyCorners.map(corner => {
              const isSelected = selectedCorner.name === corner.name;
              return (
                <button
                  key={corner.name}
                  onClick={() => {
                    setSelectedCorner(corner);
                    setScrubDistance(corner.distanceM);
                  }}
                  className={`px-3 py-1.5 rounded-xs font-mono text-xs transition-all border ${
                    isSelected
                      ? 'bg-[#00A19B]/20 border-[#00A19B] dark:border-[#00F5D4] text-[#00A19B] dark:text-[#00F5D4] font-semibold'
                      : 'border-slate-300 dark:border-[#A4B3B6]/20 bg-slate-100 dark:bg-[#07090B] text-slate-600 dark:text-[#A4B3B6] hover:border-slate-400'
                  }`}
                >
                  {corner.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Corner Deep Dive Card */}
      <div className="bg-slate-50 dark:bg-[#12161A] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs p-5 sm:p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-[#A4B3B6]">Telemetry Breakdown</span>
            <h4 className="font-display text-lg font-semibold text-slate-900 dark:text-white mt-0.5">
              {selectedCorner.name} Analysis ({selectedCorner.distanceM}m)
            </h4>
          </div>
          <span className="px-2 py-0.5 text-xs font-mono font-bold text-[#00A19B] dark:text-[#00F5D4] bg-[#00A19B]/10 border border-[#00A19B]/30 rounded-xs tabular-nums">
            {selectedCorner.deltaS}s DELTA
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A4B3B6] mb-4">
          {selectedCorner.desc}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-3 bg-slate-100 dark:bg-[#07090B] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs">
            <span className="text-slate-400 block text-[10px] uppercase">Lap 34 Apex Speed</span>
            <span className="text-base font-bold text-[#00A19B] dark:text-[#00F5D4] tabular-nums">
              {Math.round(selectedCorner.speedA * speedMult)} {speedLabel}
            </span>
          </div>

          <div className="p-3 bg-slate-100 dark:bg-[#07090B] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs">
            <span className="text-slate-400 block text-[10px] uppercase">Lap 33 Apex Speed</span>
            <span className="text-base font-bold text-slate-700 dark:text-[#A4B3B6] tabular-nums">
              {Math.round(selectedCorner.speedB * speedMult)} {speedLabel}
            </span>
          </div>

          <div className="p-3 bg-slate-100 dark:bg-[#07090B] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs">
            <span className="text-slate-400 block text-[10px] uppercase">Engaged Gear</span>
            <span className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
              Gear {selectedCorner.gearA}
            </span>
          </div>

          <div className="p-3 bg-slate-100 dark:bg-[#07090B] border border-slate-200 dark:border-[#A4B3B6]/15 rounded-xs">
            <span className="text-slate-400 block text-[10px] uppercase">Throttle Commitment</span>
            <span className="text-base font-bold text-emerald-500 tabular-nums">
              +12m Earlier
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
