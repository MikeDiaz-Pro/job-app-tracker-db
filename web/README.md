# 🌐 Job Applications Tracker - Web Module

This folder contains the **frontend application** for the Job Applications Tracker project.  
It is built with **React (Vite)**, **Tailwind CSS v3**, and **Material Tailwind v3**.  
State management is handled with **Redux Toolkit**, and API requests are made with **Axios**.

---

## 🚀 Getting Started

### 1. Installation
From the `/web` folder:
```bash
npm install
```

### 2. Run in Development
```bash
npm run dev
```
By default, the app will be available at:  
[http://localhost:5173](http://localhost:5173)

### 3. Build for Production
```bash
npm run build
```

---

## 📦 Dependencies
- **React (Vite)** – frontend framework and bundler
- **Tailwind CSS v3** – utility-first CSS framework
- **Material Tailwind v3 (beta)** – UI components
- **Redux Toolkit + React Redux** – global state management
- **Axios** – API requests

---

## 🗂️ Project Structure

```
web/
├─ src/
│  ├─ app/               # Redux store configuration
│  │   └─ store.js
│  ├─ components/        # Shared components (Navbar, Layout, etc.)
│  │   └─ Navbar.jsx
│  ├─ features/          # Redux slices + domain-specific UI (applications, etc.)
│  │   └─ applications/
│  ├─ pages/             # Page-level components (Dashboard, Companies, etc.)
│  ├─ App.jsx            # Root component
│  ├─ main.jsx           # Entry point
│  └─ index.css          # Tailwind base styles
├─ tailwind.config.js    # Tailwind configuration
├─ postcss.config.js     # PostCSS config
├─ package.json
└─ README.md             # This file
```

---

## 📌 Features (current)
- Responsive **Navbar** with Material Tailwind v3  
- Tailwind CSS v3 setup with `withMT`  
- Redux store configured for global state  
- Axios ready for API integration  

---

## 🔮 Next Steps
- [ ] Implement `applications` slice in Redux  
- [ ] Create Applications List (table + filters + pagination)  
- [ ] Add Create/Edit Application modal  
- [ ] Connect with backend API once available  
- [ ] Add OpenAI utility integration (auto-fill from Job Description)  

---

## ✅ License
MIT
