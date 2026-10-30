/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ScreenId = 'cockpit' | 'aero' | 'powertrain' | 'strategy' | 'analysis' | 'presets';

export type ERSMode = 'QUALIFYING' | 'OVERTAKE' | 'BALANCED' | 'RECHARGE';
export type TireCompound = 'SOFT' | 'MEDIUM' | 'HARD';
export type UnitSystem = 'metric' | 'imperial';

export interface TireData {
  surfaceTemp: number; // °C
  carcassTemp: number; // °C
  pressure: number; // PSI
  wear: number; // percentage remaining
}

export interface TelemetryState {
  // Live values
  speed: number; // km/h
  gear: number; // 1-8
  rpm: number; // 0-13000
  throttle: number; // 0-100%
  brake: number; // 0-100%
  steeringAngle: number; // degrees -180 to 180
  lateralG: number;
  longitudinalG: number;
  drsAvailable: boolean;
  drsActive: boolean;
  ersBatterySoC: number; // 0-100%
  ersMode: ERSMode;
  overtakeActive: boolean;
  overtakeSecondsRemaining: number;
  
  // Aero & Chassis
  frontWingAngle: number; // degrees
  rearWingAngle: number; // degrees
  frontDownforcePct: number; // e.g. 46.2%
  rideHeightFL: number; // mm
  rideHeightFR: number; // mm
  rideHeightRL: number; // mm
  rideHeightRR: number; // mm
  tireCompound: TireCompound;
  tires: {
    FL: TireData;
    FR: TireData;
    RL: TireData;
    RR: TireData;
  };
  
  // Power Unit
  engineCoolantTemp: number; // °C
  engineOilTemp: number; // °C
  turboBoostBar: number; // bar
  fuelFlowKgH: number; // kg/h
  mgukOutputKw: number; // kW
  
  // Strategy & Timing
  currentLap: number;
  totalLaps: number;
  currentLapTime: number; // seconds
  bestLapTime: number; // 84.120 s (1:24.120)
  deltaToBest: number; // seconds
  sector1Time: number;
  sector2Time: number;
  sector3Time: number;
  driverPosition: number;
  gapAheadSec: number;
  gapBehindSec: number;
  pitWindowLap: number;
  
  // Circuit Preset
  activePresetId: string;
  brakeBiasFront: number; // 50-60%
  diffEntryPct: number;
  diffExitPct: number;
}

interface TelemetryContextType {
  telemetry: TelemetryState;
  isSimulating: boolean;
  toggleSimulation: () => void;
  setSimulating: (active: boolean) => void;
  simSpeed: number;
  setSimSpeed: (speed: number) => void;
  activeScreen: ScreenId;
  setActiveScreen: (screen: ScreenId) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  units: UnitSystem;
  toggleUnits: () => void;
  toggleDRS: () => void;
  triggerOvertake: () => void;
  setERSMode: (mode: ERSMode) => void;
  setTireCompound: (compound: TireCompound) => void;
  setFrontWingAngle: (angle: number) => void;
  setRearWingAngle: (angle: number) => void;
  setBrakeBiasFront: (bias: number) => void;
  setDiffEntry: (pct: number) => void;
  setDiffExit: (pct: number) => void;
  applyCircuitPreset: (presetId: string) => void;
}

const initialTelemetry: TelemetryState = {
  speed: 312,
  gear: 7,
  rpm: 11450,
  throttle: 98,
  brake: 0,
  steeringAngle: 2,
  lateralG: 1.2,
  longitudinalG: 0.8,
  drsAvailable: true,
  drsActive: true,
  ersBatterySoC: 78,
  ersMode: 'BALANCED',
  overtakeActive: false,
  overtakeSecondsRemaining: 0,
  
  frontWingAngle: 18.5,
  rearWingAngle: 24.0,
  frontDownforcePct: 46.4,
  rideHeightFL: 28,
  rideHeightFR: 28,
  rideHeightRL: 68,
  rideHeightRR: 68,
  tireCompound: 'MEDIUM',
  tires: {
    FL: { surfaceTemp: 101, carcassTemp: 98, pressure: 23.4, wear: 82 },
    FR: { surfaceTemp: 104, carcassTemp: 101, pressure: 23.6, wear: 79 },
    RL: { surfaceTemp: 98, carcassTemp: 96, pressure: 21.8, wear: 84 },
    RR: { surfaceTemp: 102, carcassTemp: 99, pressure: 22.0, wear: 81 },
  },
  
  engineCoolantTemp: 94,
  engineOilTemp: 108,
  turboBoostBar: 3.42,
  fuelFlowKgH: 98.4,
  mgukOutputKw: 118,
  
  currentLap: 34,
  totalLaps: 57,
  currentLapTime: 54.38,
  bestLapTime: 84.120, // 1:24.120
  deltaToBest: -0.245,
  sector1Time: 27.940,
  sector2Time: 31.810,
  sector3Time: 24.370,
  driverPosition: 1,
  gapAheadSec: 0,
  gapBehindSec: 2.84,
  pitWindowLap: 38,
  
  activePresetId: 'silverstone',
  brakeBiasFront: 54.5,
  diffEntryPct: 62,
  diffExitPct: 75,
};

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export const TelemetryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [telemetry, setTelemetry] = useState<TelemetryState>(initialTelemetry);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [activeScreen, setActiveScreen] = useState<ScreenId>('cockpit');
  const [units, setUnits] = useState<UnitSystem>('metric');
  
  // Dark mode initial state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('silver-arrow-theme');
      if (saved) return saved === 'dark';
      return true; // Default to dark mode for F1 cockpit telemetry
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('silver-arrow-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('silver-arrow-theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleUnits = () => setUnits(prev => (prev === 'metric' ? 'imperial' : 'metric'));
  const toggleSimulation = () => setIsSimulating(prev => !prev);

  const toggleDRS = () => {
    setTelemetry(prev => {
      if (!prev.drsAvailable) return prev;
      return {
        ...prev,
        drsActive: !prev.drsActive,
        speed: !prev.drsActive ? Math.min(prev.speed + 12, 345) : Math.max(prev.speed - 6, 280),
      };
    });
  };

  const triggerOvertake = () => {
    setTelemetry(prev => ({
      ...prev,
      overtakeActive: true,
      overtakeSecondsRemaining: 10,
      ersMode: 'OVERTAKE',
      mgukOutputKw: 120,
    }));
  };

  const setERSMode = (mode: ERSMode) => {
    setTelemetry(prev => ({
      ...prev,
      ersMode: mode,
      mgukOutputKw: mode === 'QUALIFYING' || mode === 'OVERTAKE' ? 120 : mode === 'BALANCED' ? 85 : 30,
    }));
  };

  const setTireCompound = (compound: TireCompound) => {
    setTelemetry(prev => ({
      ...prev,
      tireCompound: compound,
      tires: {
        FL: { ...prev.tires.FL, wear: 100 },
        FR: { ...prev.tires.FR, wear: 100 },
        RL: { ...prev.tires.RL, wear: 100 },
        RR: { ...prev.tires.RR, wear: 100 },
      },
    }));
  };

  const setFrontWingAngle = (angle: number) => {
    setTelemetry(prev => {
      const frontDownforce = 42 + (angle / 30) * 8;
      return {
        ...prev,
        frontWingAngle: angle,
        frontDownforcePct: Number(frontDownforce.toFixed(1)),
      };
    });
  };

  const setRearWingAngle = (angle: number) => {
    setTelemetry(prev => ({
      ...prev,
      rearWingAngle: angle,
    }));
  };

  const setBrakeBiasFront = (bias: number) => {
    setTelemetry(prev => ({
      ...prev,
      brakeBiasFront: bias,
    }));
  };

  const setDiffEntry = (pct: number) => {
    setTelemetry(prev => ({
      ...prev,
      diffEntryPct: pct,
    }));
  };

  const setDiffExit = (pct: number) => {
    setTelemetry(prev => ({
      ...prev,
      diffExitPct: pct,
    }));
  };

  const applyCircuitPreset = (presetId: string) => {
    if (presetId === 'monza') {
      setTelemetry(prev => ({
        ...prev,
        activePresetId: 'monza',
        frontWingAngle: 14.5,
        rearWingAngle: 17.0,
        frontDownforcePct: 44.8,
        brakeBiasFront: 55.0,
        diffEntryPct: 58,
        diffExitPct: 70,
        speed: 334,
      }));
    } else if (presetId === 'monaco') {
      setTelemetry(prev => ({
        ...prev,
        activePresetId: 'monaco',
        frontWingAngle: 24.5,
        rearWingAngle: 32.0,
        frontDownforcePct: 48.2,
        brakeBiasFront: 53.5,
        diffEntryPct: 68,
        diffExitPct: 82,
        speed: 245,
      }));
    } else if (presetId === 'spa') {
      setTelemetry(prev => ({
        ...prev,
        activePresetId: 'spa',
        frontWingAngle: 17.5,
        rearWingAngle: 21.0,
        frontDownforcePct: 46.0,
        brakeBiasFront: 54.0,
        diffEntryPct: 60,
        diffExitPct: 74,
        speed: 320,
      }));
    } else {
      // Silverstone default
      setTelemetry(prev => ({
        ...prev,
        activePresetId: 'silverstone',
        frontWingAngle: 18.5,
        rearWingAngle: 24.0,
        frontDownforcePct: 46.4,
        brakeBiasFront: 54.5,
        diffEntryPct: 62,
        diffExitPct: 75,
        speed: 312,
      }));
    }
  };

  // Live simulation tick
  useEffect(() => {
    if (!isSimulating) return;

    let time = 0;
    const interval = setInterval(() => {
      time += 0.1 * simSpeed;
      
      setTelemetry(prev => {
        // Dynamic throttle and brake cycle simulating cornering and acceleration
        const cycle = Math.sin(time * 0.8);
        const isBraking = cycle < -0.4;
        const isAccelerating = cycle > 0.2;
        
        let newThrottle = 0;
        let newBrake = 0;
        let newGear = prev.gear;
        let newRpm = prev.rpm;
        let newSpeed = prev.speed;
        let lateralG = Number((Math.sin(time * 1.2) * 3.8).toFixed(1));
        let longitudinalG = 0;

        if (isBraking) {
          newThrottle = 0;
          newBrake = Math.min(100, Math.floor(65 + Math.abs(cycle) * 35));
          newSpeed = Math.max(95, Math.floor(prev.speed - 6 * simSpeed));
          newGear = newSpeed > 220 ? 6 : newSpeed > 160 ? 4 : newSpeed > 110 ? 3 : 2;
          newRpm = Math.floor(9500 + (newSpeed % 40) * 80);
          longitudinalG = Number((-2.5 - Math.abs(cycle) * 2.2).toFixed(1));
        } else if (isAccelerating) {
          newThrottle = Math.min(100, Math.floor(75 + cycle * 25));
          newBrake = 0;
          newSpeed = Math.min(338, Math.floor(prev.speed + 4 * simSpeed));
          newGear = newSpeed > 300 ? 8 : newSpeed > 265 ? 7 : newSpeed > 220 ? 6 : newSpeed > 170 ? 5 : 4;
          newRpm = Math.floor(10800 + (newSpeed % 35) * 60);
          longitudinalG = Number((0.8 + cycle * 0.9).toFixed(1));
        } else {
          // Mid-corner apex
          newThrottle = 35;
          newBrake = 0;
          newSpeed = prev.speed;
          newRpm = 10400;
          longitudinalG = 0.1;
        }

        // Lap timer increment
        const nextLapTime = prev.currentLapTime + 0.1 * simSpeed;
        const lapCompleted = nextLapTime > 84.8;
        
        // Overtake counter
        let overtakeRemaining = prev.overtakeSecondsRemaining;
        let overtakeActive = prev.overtakeActive;
        let ersMode = prev.ersMode;
        if (overtakeActive) {
          overtakeRemaining = Math.max(0, overtakeRemaining - 0.1 * simSpeed);
          if (overtakeRemaining <= 0) {
            overtakeActive = false;
            ersMode = 'BALANCED';
          }
        }

        return {
          ...prev,
          speed: newSpeed,
          gear: newGear,
          rpm: newRpm,
          throttle: newThrottle,
          brake: newBrake,
          lateralG,
          longitudinalG,
          currentLapTime: lapCompleted ? 0 : Number(nextLapTime.toFixed(2)),
          currentLap: lapCompleted ? Math.min(prev.totalLaps, prev.currentLap + 1) : prev.currentLap,
          overtakeActive,
          overtakeSecondsRemaining: Number(overtakeRemaining.toFixed(1)),
          ersMode,
          ersBatterySoC: Math.max(25, Math.min(99, prev.ersBatterySoC + (isBraking ? 0.08 : -0.04))),
        };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isSimulating, simSpeed]);

  return (
    <TelemetryContext.Provider
      value={{
        telemetry,
        isSimulating,
        toggleSimulation,
        setSimulating: setIsSimulating,
        simSpeed,
        setSimSpeed,
        activeScreen,
        setActiveScreen,
        darkMode,
        toggleDarkMode,
        units,
        toggleUnits,
        toggleDRS,
        triggerOvertake,
        setERSMode,
        setTireCompound,
        setFrontWingAngle,
        setRearWingAngle,
        setBrakeBiasFront,
        setDiffEntry,
        setDiffExit,
        applyCircuitPreset,
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
};

export const useTelemetry = () => {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }
  return context;
};
