# Cyberpunk Developer Portfolio

A visually stunning, highly interactive, dark-themed developer portfolio website inspired by the retro-futuristic aesthetic of *Cyberpunk 2077*. Built for **Ayush Anand** — Data Analyst & AI Engineer.

This repository features a clean, production-grade refactoring that separates structure, styling, and interactivity into dedicated modules.

---

## 🚀 Live Preview
The portfolio is self-contained and loads instantly.
* **Local Development Server:** `http://localhost:8000`

---

## 🛠️ Technology Stack
* **Structure:** HTML5, Semantic Elements, Responsive Grid/Flexbox Layouts
* **Graphics & Animations:** SVG Animation, HTML5 Canvas API, CSS Variables & Keyframes
* **Logic:** Vanilla ES6+ JavaScript (no heavy libraries or framework overhead)
* **Fonts:** Syne (Display), Cabinet Grotesk (Body), DM Mono (Terminal/Console)

---

## 📂 Project Structure
```bash
Portfolio/
├── index.html        # Clean HTML5 document containing layout & SVG assets
├── style.css         # Cyberpunk styling system, theme variables & animations
├── script.js        # Interactivity, LERP cursor, Matrix rain & Particle webs
└── README.md         # Documentation & Implementation Roadmap
```

---

## 💎 Premium Design Features
1. **Classic CLI Terminal Loader:** Bootstraps a retro-tech console script showing ETL configurations and ML pipeline status with custom loaders on load.
2. **LERP Custom Cursor:** A custom double-ring cursor utilizing linear interpolation (LERP) to trail mouse coordinates smoothly.
3. **Double Canvas Engine:** 
   * A background canvas simulating falling green-and-cyan Matrix data code rain.
   * A foreground canvas rendering interactive floating network particles drawing connections dynamically.
4. **SVG Data Pipeline Wireframe:** Vector graphic detailing a mock ETL architecture with animated particles traveling down pipeline routes.
5. **Scroll-Driven Statistics:** Interactive counters that animate from `0` to target statistics (DSA problems solved, students led, performance boosts) using easing algorithms when scrolled into view.

---

## 📋 Implementation Plan & Development Roadmap

### Phase 1: Concept & Design Theming
* [x] Design custom HSL neon palette variables (`--cyan`, `--violet`, `--green`, `--orange`).
* [x] Define global styling tokens (glassmorphism variables, dark space background colors, blur values).
* [x] Research grid backdrop alignments and glow overlays.

### Phase 2: Structural Architecture & SVG Pipelines
* [x] Build semantic HTML5 tags (`<nav>`, `<main>`, `<section>`, `<footer>`).
* [x] Implement the interactive SVG Data Pipeline diagram utilizing native `<animateMotion>` and vector paths.
* [x] Establish SEO headings, accessibility tags, and mobile drawer structures.

### Phase 3: Interactive Styling & Glassmorphic Cards
* [x] Code responsive layouts with breakpoints at `960px` for mobile drawer toggle support.
* [x] Create the custom cursor trailing-dot style hooks.
* [x] Design glow utilities and glassmorphic card borders using double transparent linear gradients.

### Phase 4: Canvas Animation Loops
* [x] Build the **Matrix digital rain rain generator** utilizing standard array pools and canvas text drawing loops.
* [x] Develop the **Particle connections mesh** utilizing vector distance math ($d = \sqrt{\Delta x^2 + \Delta y^2}$) to dynamically link nearby nodes.
* [x] Implement canvas resize observers to ensure zero-stretch scaling on monitor size change.

### Phase 5: Viewport Animations & Interactions
* [x] Build standard browser `IntersectionObserver` loops to detect viewport entry.
* [x] Code the ease-out quartic statistical counter math in JS.
* [x] Implement navigation bar scroll scroll-triggers and active section highlighting.

### Phase 6: Code Refactoring & Git Deployment
* [x] Extract styling blocks from `index.html` to `style.css`.
* [x] Extract script loops to `script.js`.
* [x] Set up local Git repository tracking and push to GitHub `main` branch.

---

## 💻 Local Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ayushshiv07/Portfolio.git
   cd Portfolio
   ```

2. **Start a local development server:**
   * **Python 3:**
     ```bash
     python -m http.server 8000
     ```
   * **Node.js (NPX):**
     ```bash
     npx http-server -p 8000
     ```

3. **Open in browser:**
   Go to `http://localhost:8000` to view the running portfolio.
