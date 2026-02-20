# 🐂 BULLFOLIO — Tu Copiloto Financiero con IA

> Democratizamos las herramientas cuantitativas de inversión que antes solo existían en fondos institucionales de Wall Street.

[![Landing](https://img.shields.io/badge/Landing-Live-00FF88?style=for-the-badge)](https://tu-dominio.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-00D4FF?style=for-the-badge)](LICENSE)
[![Stack](https://img.shields.io/badge/Stack-Python%20%7C%20HTML%20%7C%20CSS-FF6B35?style=for-the-badge)](#)

---

## ¿Qué es BULLFOLIO?

BULLFOLIO es un **Robo-Advisor** (Copiloto Financiero) impulsado por IA y matemáticas puras que:

1. **Perfila tu riesgo** usando K-Means (Machine Learning) en lugar de cuestionarios estáticos
2. **Optimiza tu portafolio** con la Frontera Eficiente de Markowitz (maximizando el Ratio de Sharpe)
3. **Valida con datos reales** mediante Backtesting de 5-10 años y cálculo del VaR
4. **Mantiene tu estrategia** con un sistema de rebalanceo periódico

> ⚠️ **Solo opera en mercados Spot.** Sin derivados, sin futuros, sin apalancamiento.

---

## Estructura del Proyecto

```
bullfolio/
├── docs/
│   ├── logo/
│   │   └── bullfolio_logo.png        # Logo oficial del proyecto
│   ├── branding.md                   # Sistema de diseño y paleta de colores
│   ├── moodboard.md                  # Concepto visual y referencias
│   ├── modelo_de_negocio.md          # MVP, monetización, stack técnico
│   └── founders.md                   # Equipo fundador
├── landing_page/
│   ├── index.html                    # Landing page BULLFOLIO
│   ├── styles.css                    # Estilos dark finance theme
│   └── script.js                     # Interacciones y animaciones
├── MEMORY.md                         # Contexto del proyecto para el agente IA
├── README.md                         # Este archivo
└── .gitignore
```

---

## Stack Técnico

### Algoritmos (Python — próximamente)
```
yfinance          ← Datos históricos Yahoo Finance
numpy / pandas    ← Matrices de retornos y covarianza
scipy.optimize    ← Optimización cuadrática (Markowitz)
scikit-learn      ← K-Means clustering (perfilamiento de riesgo)
```

### Frontend
```
HTML5 · CSS3 · JavaScript Vanilla
Fuentes: Space Grotesk · Inter · JetBrains Mono (Google Fonts)
```

### Deploy
```
Vercel ← Landing page estática
```

---

## Motores Algorítmicos

| # | Motor | Tecnología | Propósito |
|---|---|---|---|
| 01 | Perfilamiento K-Means | scikit-learn | Clasificar tolerancia al riesgo |
| 02 | Optimización Markowitz | scipy / numpy | Calcular pesos óptimos (max Sharpe) |
| 03 | VaR + Backtesting | yfinance | Validar con 10 años de datos históricos |
| 04 | Rebalanceo Periódico | numpy | Alertas de desviación mensual/trimestral |

---

## Universo de Activos

| Categoría | Tickers |
|---|---|
| ETFs Globales | SPY, QQQ, TLT, GLD, VWO, EFA |
| Acciones EE.UU. | AAPL, MSFT, GOOGL, AMZN, NVDA |
| Acciones Colombia (BVC) | PFBCOL, ISA, NUTRESA, CEMARGOS |
| Crypto (perfil agresivo) | BTC, ETH, SOL (máx. 15%) |

---

## Cómo Abrir la Landing Page

```bash
# Clonar el repositorio
git clone https://github.com/jojoa20/mercadosmart.git bullfolio
cd bullfolio

# Abrir directamente en el navegador
open landing_page/index.html
# o
xdg-open landing_page/index.html   # Linux
```

---

## Roadmap

- [x] Landing Page BULLFOLIO
- [x] Documentación y Branding
- [ ] Motor de Perfilamiento K-Means (Python)
- [ ] Motor de Optimización Markowitz (Python)
- [ ] Motor de Backtesting + VaR (Python)
- [ ] API REST (FastAPI)
- [ ] App Web (Next.js + Recharts)
- [ ] Motor de Rebalanceo

---

## Aviso Legal

BULLFOLIO es un proyecto educativo y de investigación. **No constituye asesoría financiera regulada.** Toda inversión implica riesgo de pérdida de capital. Los rendimientos pasados no garantizan rendimientos futuros.

---

*BULLFOLIO © 2026 — Precisión matemática al servicio de tus inversiones.*
