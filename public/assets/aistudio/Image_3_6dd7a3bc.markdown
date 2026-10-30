---
name: Silver Arrow Telemetry
colors:
  surface: '#111417'
  surface-dim: '#111417'
  surface-bright: '#37393d'
  surface-container-lowest: '#0b0e11'
  surface-container-low: '#191c1f'
  surface-container: '#1d2023'
  surface-container-high: '#272a2e'
  surface-container-highest: '#323538'
  on-surface: '#e1e2e7'
  on-surface-variant: '#bcc9c7'
  inverse-surface: '#e1e2e7'
  inverse-on-surface: '#2e3134'
  outline: '#869392'
  outline-variant: '#3d4948'
  surface-tint: '#5fd9d2'
  primary: '#5fd9d2'
  on-primary: '#003735'
  primary-container: '#03a29c'
  on-primary-container: '#00302e'
  inverse-primary: '#006a66'
  secondary: '#c7fff0'
  on-secondary: '#00382f'
  secondary-container: '#00f2d1'
  on-secondary-container: '#006a5a'
  tertiary: '#bac9cc'
  on-tertiary: '#253335'
  tertiary-container: '#859396'
  on-tertiary-container: '#1e2c2e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7ef6ee'
  primary-fixed-dim: '#5fd9d2'
  on-primary-fixed: '#00201e'
  on-primary-fixed-variant: '#00504d'
  secondary-fixed: '#26fedc'
  secondary-fixed-dim: '#00dfc1'
  on-secondary-fixed: '#00201a'
  on-secondary-fixed-variant: '#005144'
  tertiary-fixed: '#d6e5e8'
  tertiary-fixed-dim: '#bac9cc'
  on-tertiary-fixed: '#101e20'
  on-tertiary-fixed-variant: '#3b494c'
  background: '#111417'
  on-background: '#e1e2e7'
  surface-variant: '#323538'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 76px
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 26px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-data:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-telemetry:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.08em
  label-mono-xs:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 12px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
This design system captures the intersection of pinnacle motorsport engineering and modern luxury craftsmanship. Built for high-stakes speed, precision aerodynamics, and technical supremacy, the interface evokes the adrenaline and calculated discipline of the Formula 1 pit wall. 

The aesthetic is anchored in an uncompromising **High-Performance Technical Minimalism** intertwined with subtle **Glassmorphism and Chiseled Carbon Finishes**. Interfaces feel like mission-critical telemetry displays: dark obsidian surfaces, ultra-refined borders reminiscent of CNC-milled titanium, and laser-sharp luminous Petronas cyan accents that cut through the darkness. The emotional response is focused, sophisticated, and relentlessly fast—avoiding gimmicky skeuomorphism in favor of computational clarity, lightweight structural frames, and bespoke aerodynamic polish.

## Colors
The palette is anchored in an ultra-deep, track-grade dark mode. Pure obsidian and carbon-tinted blacks form the visual floor, providing infinite contrast for high-frequency telemetry and race data.

- **Primary (`#00A19B` - Petronas Teal):** The definitive racing signature. Applied to primary calls to action, active states, key data plots, and focal identity anchors.
- **Secondary (`#00F5D4` - Electric Cyan):** High-energy electric highlight used sparingly for live status indicators, apex telemetry spikes, critical track deltas, and glowing interactive hover states.
- **Tertiary (`#A4B3B6` - Liquid Titanium):** Metallic, cool-toned midtone used for structural borders, monospaced metadata, subtle grid rules, and secondary badges.
- **Neutral (`#0B0E11` - Obsidian Monocoque):** The core ground. Paired with elevated container layers:
  - Surface Level 1 (`#12161A`): Structural panels and telemetry cards.
  - Surface Level 2 (`#1A2026`): Floating overlays, elevated tooltips, and flyout HUDs.
  - Surface Outlines (`rgba(164, 179, 182, 0.14)`): Precision laser-etched dividers.

## Typography
Typographic rhythm balances high-impact aerodynamic presence with rapid computational readability.

- **Headlines (Space Grotesk):** Engineered geometry with technical cuts. Display titles utilize aggressive negative tracking to evoke aerodynamic compression and high velocity.
- **Body Text (Geist):** Clean, modern, and mathematically neutral, ensuring absolute legibility of technical overviews, vehicle spec notes, and operational narratives.
- **Data & Telemetry (JetBrains Mono):** Monospaced precision for lap times, tire degradation percentages, speed trap readings, and G-force readouts. Uppercase transformation with generous letter spacing is required for all micro-labels to simulate aerospace and pit-lane telemetry monitors.

## Layout & Spacing
The layout uses a rigid, fluid 12-column grid built on an absolute 4px/8px structural baseline, engineered to mirror modular race engineer dashboards.

- **Desktop (12 Columns):** 3rem canvas margins with 1.5rem gutters. Modular panels dock seamlessly against telemetry columns. Data feeds can occupy multi-column spans (e.g., 3-column chassis telemetry, 6-column central 3D visualizer, 3-column live lap tracker).
- **Tablet (8 Columns):** 2rem canvas margins with 1rem gutters. Secondary telemetry arrays collapse into horizontal scroll tracks or stacked secondary modules.
- **Mobile (4 Columns):** 1.25rem canvas margins with 0.75rem gutters. Primary metrics prioritize single-column full-width cards, preserving high-density data legibility without horizontal clipping.
- **Spacing Rhythm:** Internal card padding is strictly standardized to `space-md` (1rem) or `space-lg` (1.5rem) to maintain compact, cockpit-grade efficiency without visual congestion.

## Elevation & Depth
Depth is produced through dark tonal stratification and laser-precise luminescence rather than standard fuzzy drop shadows.

- **Substrate Layers:** The canvas (`#0B0E11`) hosts elevated components (`#12161A`), which in turn house nested data wells (`#07090B`). This inverted step-down model mimics carbon fiber cockpit recessed instrumentation.
- **Low-Contrast Titanium Outlines:** Panels utilize a 1px perimeter border rendered in `rgba(164, 179, 182, 0.12)`, stepping up to `rgba(0, 245, 212, 0.4)` on interactive focus or active track sector selection.
- **Electric Cyan Backlight (Telemetry Glow):** Interactive hot states and live status modules project a narrow, high-density photonic aura: `box-shadow: 0 0 24px -4px rgba(0, 245, 212, 0.25)`.
- **Glass Shrouds:** Overlays, command palettes, and pit-stop timers utilize 16px background blur over `rgba(11, 14, 17, 0.75)` with a top-lit gradient border to simulate edge-lit tempered polycarbonate.

## Shapes
Aerodynamic efficiency dictates sharp, wind-tunnel-carved silhouettes. Standard geometry relies on disciplined, low-radius contours (`0.25rem` / `4px`), giving interfaces a precision-machined aesthetic.

Pill shapes and organic, heavily rounded corners are strictly prohibited. In technical readouts, chips, and data frames, optional chamfered 45-degree edge clips (via CSS `clip-path`) are permitted on top-right corners to signify structural reinforcement and telemetry-grade status indicators.

## Components

### Buttons
- **Primary Action:** Solid `#00A19B` background, `#0B0E11` text in `Space Grotesk` medium, 4px border radius. Hover introduces a bright `#00F5D4` background shift accompanied by a localized cyan photonic glow.
- **Ghost Titanium:** Transparent surface with a 1px border of `rgba(164, 179, 182, 0.3)`. Typography in `#A4B3B6`. Hover tightens border contrast to pure `#FFFFFF` with a faint `rgba(255, 255, 255, 0.04)` fill.
- **Telemetry Action (Small):** Compact monospaced action triggers (`JetBrains Mono`, 11px uppercase) housed in recessed, 1px bordered dark pods.

### Telemetry Badges & Chips
- **Status Badges:** Miniature capsules with a 1px border. Live statuses (e.g., "TRACK: DRY", "DRS: ENABLED") utilize a flashing or glowing 6px secondary cyan dot alongside `label-telemetry` text.
- **Sector Delta Chips:** Green (`#00F5D4`), purple (`#BD00FF`), and yellow (`#FFB800`) micro-badges with deep-tinted backgrounds (15% opacity) and solid 1px matching borders.

### Cards & Panels
- **Telemetry Cards:** Base background `#12161A`, 1px border `rgba(164, 179, 182, 0.12)`. Header displays a micro `JetBrains Mono` label anchored by a 2px horizontal teal indicator line.
- **Spec Glass Cards:** Used for hero vehicle highlights; features top-lit linear gradient borders (`rgba(0, 245, 212, 0.4)` falling off to transparent).

### Input Fields
- Dark recessed background (`#07090B`) with inset 1px titanium border (`rgba(164, 179, 182, 0.15)`). Text entry rendered in `#FFFFFF` with placeholder text in `#52606D`. Active focus engages a crisp 1px ring in `#00F5D4`.

### Lists & Telemetry Feeds
- Row items separated by hairline rules (`rgba(164, 179, 182, 0.08)`). Tabular data relies on tabular numbers (`font-variant-numeric: tabular-nums`) in `JetBrains Mono`, aligned right, with metadata aligned left in muted titanium.

### Checkboxes & Switches
- **Switches:** Angular, mechanical toggle switches with a 2px track perimeter and a sharp rectangular toggle slug that snaps between neutral titanium and neon cyan.
- **Checkboxes:** 14px square boxes with an etched carbon background. Active checks illuminate in solid `#00A19B` with an obsidian crosshair mark.