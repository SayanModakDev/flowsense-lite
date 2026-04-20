# FlowSense Lite 📡

> **AI-powered stadium crowd intelligence — find the least crowded spots in real time.**

FlowSense Lite is a mobile-first progressive web app that helps stadium attendees navigate crowd density across restrooms, food stalls, merch stores, and exits — powered by simulated real-time data and Google Gemini AI recommendations.

---

## Screenshots

| Live Radar | Crowd Map | AI Navigator |
|:---:|:---:|:---:|
| Zone cards with live occupancy bars | Color-coded heat-map grid | Gemini-powered pick with wait time |

---

## Features

| Feature | Description |
|---|---|
| **📡 Live Radar** | 12 stadium zones with crowd levels auto-updated every 5 seconds via a bounded random-walk simulation |
| **🗺️ Crowd Map** | Color-coded heat-map grid — green (low), amber (medium), rose (high) occupancy |
| **🪄 AI Navigator** | One-tap Gemini AI recommendation filtered by goal: Restroom, Food, Merch, or Exit |
| **🔌 Offline Fallback** | Works without an API key — local heuristic sorts by live density and estimates wait times |
| **🌙 Dark Mode** | Automatic, via `prefers-color-scheme` — no toggle needed |
| **📱 Mobile-First** | Optimised for 375–500px viewports with a glassmorphism sticky bottom nav |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite` plugin) |
| Routing | React Router v7 |
| AI | Google Gemini API — `gemini-3.0-flash` (with rule-based pre-filtering) |
| Fonts | Inter + Outfit via Google Fonts |
| Build | Vite (ES modules, no PostCSS config needed) |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Then edit `.env` and add your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

> **No API key?** The app still works fully. Without a key, Gemini calls are skipped and a local fallback algorithm is used — it sorts zones by live density and calculates wait times from occupancy data.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### 4. Build for production

```bash
npm run build
```

---

## Project Structure

```
flowsense-lite/
├── public/                       # Static assets
├── src/
│   ├── data/
│   │   ├── zones.js              # 12 stadium zone definitions (name, type, capacity)
│   │   └── crowdSimulator.js     # Singleton tick engine — 5s random walk, pub/sub
│   ├── utils/
│   │   └── crowdHelpers.js       # getDensityPercent, getDensityLevel, sortByDensity
│   ├── services/
│   │   └── geminiService.js      # Gemini API call + structured JSON parsing + fallback
│   ├── hooks/
│   │   ├── useCrowdData.js       # Subscribes to simulator → exposes live zones state
│   │   └── useRecommendation.js  # Manages AI request lifecycle (loading / result / error)
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Badge.jsx         # LOW / MEDIUM / HIGH status pill
│   │   │   ├── Button.jsx        # Gradient CTA with loading spinner
│   │   │   ├── Card.jsx          # Glass container with hover elevation
│   │   │   └── Loader.jsx        # Animated bouncing dots
│   │   ├── layout/
│   │   │   ├── AppShell.jsx      # Root layout wrapper with Outlet
│   │   │   └── BottomNav.jsx     # Fixed glassmorphism tab bar (NavLink, `end` prop)
│   │   ├── ZoneCard.jsx          # Name + type + occupancy progress bar
│   │   ├── ZoneList.jsx          # Density-sorted list of ZoneCards
│   │   ├── CrowdMap.jsx          # 3-column heat-map grid
│   │   └── RecommendationCard.jsx# AI output: zone name, wait time, reasoning
│   ├── pages/
│   │   ├── HomePage.jsx          # Live Radar — all zones, sorted by density
│   │   ├── MapPage.jsx           # Visual heat-map overview
│   │   └── RecommendPage.jsx     # Goal selector + AI recommendation
│   ├── App.jsx                   # Route definitions (nested under AppShell)
│   ├── main.jsx                  # ReactDOM root + BrowserRouter
│   └── index.css                 # Tailwind v4 entry + design tokens + keyframes
├── index.html                    # Entry HTML — fonts loaded here
├── vite.config.js                # Vite + @tailwindcss/vite plugin
├── .env.example                  # Environment variable template
└── AGENTS.md                     # Coding agent rules and constraints
```

---

## Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                    Crowd Simulation Layer               │
│   zones.js  ──►  crowdSimulator.js (setInterval 5s)    │
│                   tick() → random walk → notify()       │
└────────────────────────────┬────────────────────────────┘
                             │ pub/sub
                             ▼
┌─────────────────────────────────────────────────────────┐
│                      React Hooks Layer                  │
│   useCrowdData()  ──────────────────────────────────┐  │
│       └─ zones[], lastUpdated, refreshCrowd()        │  │
│                                                      │  │
│   useRecommendation()                                │  │
│       └─ recommendation, isLoading, error,           │  │
│          getRecommendation(zones, goal)              │  │
└──────────────────────────────────────────────────────┼──┘
                             │                         │
              ┌──────────────┘                         │
              ▼                                        ▼
┌─────────────────────┐              ┌─────────────────────────────┐
│    UI Components    │              │      AI Service Layer       │
│  ZoneList/CrowdMap  │              │  geminiService.askGemini()   │
│  (live density)     │              │  → Gemini API (or fallback) │
└─────────────────────┘              └─────────────────────────────┘
```

### AI Prompt Schema

Before calling the AI, the app applies **rule-based filtering** to strip out all zones irrelevant to the user's goal. This prevents hallucinated locations and ensures a consistently fast (<2s) response.

Gemini then receives the pre-filtered zone snapshot as JSON and is instructed to return:

```json
{
  "recommendation": "Name of the best zone",
  "waitTime": "~5 mins",
  "reason": "Short explanation of why this spot is the best pick."
}
```

Markdown is stripped before `JSON.parse`. If parsing fails, the local fallback activates.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_GEMINI_API_KEY` | Optional | Google AI Studio API key. Get one free at [aistudio.google.com](https://aistudio.google.com/app/apikey) |

---

## Design System

Colours, typography, and spacing are defined as CSS custom properties in `src/index.css`:

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#f8fafc` | `#0f172a` |
| `--text` | `#4b5563` | `#94a3b8` |
| `--text-h` | `#111827` | `#f1f5f9` |
| `--accent` | `#7c3aed` | `#a78bfa` |
| `--border` | `#e2e8f0` | `#1e293b` |
| `--glass-bg` | `rgba(255,255,255,0.7)` | `rgba(15,23,42,0.7)` |

Tailwind v4 variables are accessed via the shorthand syntax: `bg-(--accent)`, `text-(--text-h)`, etc.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |



