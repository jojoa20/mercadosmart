# BULLFOLIO — Modelo de Negocio

## Propuesta de Valor

> Democratizar las herramientas cuantitativas de inversión que antes solo existían en fondos institucionales de Wall Street, haciéndolas accesibles para inversores jóvenes y principiantes de Latinoamérica.

---

## Producto: Robo-Advisor con 4 Motores Algorítmicos

| Motor | Tecnología | Propósito |
|---|---|---|
| Perfilamiento IA | K-Means (sklearn) | Clasificar tolerancia al riesgo sin cuestionarios estáticos |
| Optimización | Markowitz / scipy | Calcular pesos óptimos maximizando Sharpe Ratio |
| Validación | VaR + yfinance | Backtesting con 5-10 años de datos históricos reales |
| Mantenimiento | Rebalanceo periódico | Alertas mensuales/trimestrales para mantener el portafolio objetivo |

**Restricción clave:** Solo operamos en mercados **Spot**. Sin derivados, sin futuros, sin apalancamiento.

---

## Universo de Activos

### ETFs Globales (todos los perfiles)
- SPY, QQQ, TLT, GLD, VWO, EFA, AGG

### Acciones Alta Capitalización
- **EE.UU.:** AAPL, MSFT, GOOGL, AMZN, NVDA
- **Colombia (BVC):** PFBCOL, ISA, NUTRESA, CEMARGOS, ÉXITO

### Criptomonedas (perfil agresivo, máx 15%)
- BTC, ETH, SOL  
- Solo Spot. Nunca futuros ni contratos.

---

## Segmento Objetivo

| Segmento | Descripción |
|---|---|
| Primario | Jóvenes 18-35 años, Colombia y LATAM, sin experiencia en inversiones |
| Secundario | Inversionistas intermedios que quieren automatizar su portafolio |
| Terciario | Estudiantes de finanzas e ingeniería interesados en quant finance |

**Pain points:**
- "No sé cómo empezar a invertir"
- "No entiendo cómo elegir entre tantas opciones"
- "Me da miedo perder mi dinero"
- "Los asesores tradicionales cobran comisiones altas"

---

## Modelo de Monetización (MVP → Escala)

| Fase | Modelo | Precio |
|---|---|---|
| **Beta (ahora)** | Gratuito — lista de espera | $0 |
| **V1.0** | Freemium — perfil básico gratis, optimización premium | $9.99/mes |
| **V2.0** | Assets Under Management fee | 0.5% anual AUM |
| **V3.0** | API para brokers y fintechs | B2B licenciamiento |

---

## Stack Técnico

### Backend (algoritmos)
```python
yfinance          # Datos históricos (Yahoo Finance)
numpy / pandas    # Matrices de retornos y covarianza
scipy.optimize    # Optimización cuadrática (Markowitz)
scikit-learn      # K-Means clustering (perfilamiento)
```

### Frontend (Landing)
```
HTML5 / CSS3 / JavaScript Vanilla
├── docs/           # Documentación del proyecto
├── landing_page/   # Landing page estática
└── (futuro) Next.js / Vite para la app web
```

### Infraestructura
- **Deploy:** Vercel (landing) + Railway/Render (backend Python)
- **DB:** PostgreSQL (perfiles + portafolios) — futuro
- **Auth:** NextAuth / Supabase — futuro

---

## Competidores

| Competidor | País | Diferenciador BULLFOLIO |
|---|---|---|
| Betterment | EE.UU. | Nosotros somos open-source y enfocados en LATAM |
| Wealthfront | EE.UU. | Mostramos las matemáticas al usuario |
| Fintual | Chile/México | Más activos y customización real del portafolio |
| Nu Invest | Brasil | Algoritmos propios vs. fondos curated |

---

## KPIs del MVP

- [ ] 500 emails en lista de espera (pre-lanzamiento)
- [ ] Tiempo de cálculo de portafolio < 3 segundos
- [ ] Backtesting con mínimo 5 años de datos
- [ ] Portafolios con Sharpe Ratio > 0.8 en condiciones normales
