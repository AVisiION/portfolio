<div align="center">

# ⚡ Adarsh Sarangi — Portfolio

**IoT Engineer · MERN Stack Developer**

[![Live Site](https://img.shields.io/badge/Live%20Site-AVisiION.github.io%2Fportfolio-00e5ff?style=for-the-badge&logo=github)](https://AVisiION.github.io/portfolio)
[![GitHub](https://img.shields.io/badge/GitHub-AVisiION-181717?style=for-the-badge&logo=github)](https://github.com/AVisiION)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-adarsh--sarangi-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/adarsh-sarangi)

</div>

---

## 🔍 Overview

A premium, single-page developer portfolio featuring an interactive **3D IoT network background** (Three.js), **glassmorphism** design, and a **Bento-grid** project showcase. Built entirely with vanilla HTML, CSS, and JavaScript — no build step required.

**Key highlights:**
- 🌐 **3D particle network** rendered with Three.js — IoT-node aesthetic
- ✨ **GSAP scroll animations** with reveal-on-scroll effects
- 🃏 **3D tilt cards** reacting to mouse movement
- 📱 **Fully responsive** — mobile-first hamburger nav
- 🔵 **Electric Cyan (`#00E5FF`)** dark-mode design system (Outfit + JetBrains Mono)
- 🔴 **Live sensor readout** simulation (temperature, humidity, light)

---

## 🚀 Deploying to GitHub Pages

This is a **pure static site** (no build step, no dependencies to install). GitHub Pages serves it directly from the repository.

### Step 1 — Ensure your repo is named correctly

For a project page, the repo can have **any name** (e.g., `portfolio`).  
Your site will be live at:
```
https://AVisiION.github.io/portfolio
```

### Step 2 — Push the code

```bash
git add .
git commit -m "feat: portfolio site"
git push origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo on GitHub → **Settings** → **Pages** (left sidebar)
2. Under **"Build and deployment"**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` · `/ (root)`
3. Click **Save**

GitHub will build and deploy in ~1 minute. A green banner will show your live URL.

### Step 4 — Verify

Visit `https://AVisiION.github.io/portfolio` — done! 🎉

> **Tip:** If you want the site at `https://AVisiION.github.io` (root URL with no `/portfolio` path), rename the repo to `AVisiION.github.io` and repeat step 3.

---

## 🗂️ Project Structure

```
portfolio/
├── index.html        # Single-page site (all sections inline)
├── style.css         # Design system — variables, layout, animations
├── script.js         # Three.js scene + GSAP + interactive logic
└── README.md         # You are here
```

No `package.json`, no build pipeline — just open `index.html` in a browser to develop locally.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 (semantic) |
| Styling | Vanilla CSS (custom properties, glassmorphism) |
| 3D Background | [Three.js](https://threejs.org/) v0.128 (CDN) |
| Animations | [GSAP](https://gsap.com/) v3.12 + ScrollTrigger (CDN) |
| Typography | [Outfit](https://fonts.google.com/specimen/Outfit) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (Google Fonts) |
| Hosting | GitHub Pages |

---

## 🔧 Local Development

No setup required. Just open the file directly:

```bash
# Option 1 — open in browser directly
start index.html

# Option 2 — use VS Code Live Server extension (recommended)
# Right-click index.html → "Open with Live Server"

# Option 3 — use Python's built-in server
python -m http.server 8080
# then visit http://localhost:8080
```

---

## 📬 Contact

| | |
|--|--|
| **Email** | [adarshsarangi0@gmail.com](mailto:adarshsarangi0@gmail.com) |
| **GitHub** | [@AVisiION](https://github.com/AVisiION) |
| **LinkedIn** | [adarsh-sarangi](https://linkedin.com/in/adarsh-sarangi) |
| **Location** | Rourkela, Odisha, India |

---

<div align="center">

Built by **Adarsh Sarangi** · 2025 &nbsp;|&nbsp; Three.js · GSAP · Vanilla JS

</div>