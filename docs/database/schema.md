# 🗄️ BULLFOLIO — Base de Datos & Supabase

> **Versión:** 1.0.0 — MVP (Opción B: Asesor Digital)
> **Motor:** PostgreSQL 17 via Supabase
> **Fecha de creación:** 2026-03-04
> **Última actualización:** 2026-03-04

---

## 1. Proyecto Supabase

### Datos del proyecto

| Campo | Valor |
|-------|-------|
| **Nombre** | jojoa20's Project |
| **Project ID** | `cvrrygffwmxmemlsdnax` |
| **Organization ID** | `hqrlrtuuxiaceqibwkme` |
| **Región** | `us-east-2` (Ohio, USA) |
| **Estado** | 🟢 ACTIVE_HEALTHY |
| **Postgres** | v17.6.1.063 |
| **Creado** | 2026-02-27 |

### Endpoints

| Servicio | URL |
|----------|-----|
| **API REST** | `https://cvrrygffwmxmemlsdnax.supabase.co` |
| **Database (host)** | `db.cvrrygffwmxmemlsdnax.supabase.co` |
| **Auth** | `https://cvrrygffwmxmemlsdnax.supabase.co/auth/v1` |
| **Storage** | `https://cvrrygffwmxmemlsdnax.supabase.co/storage/v1` |
| **Realtime** | `wss://cvrrygffwmxmemlsdnax.supabase.co/realtime/v1` |

### API Keys (publishable — seguras para el frontend)

| Key | Tipo | Valor |
|-----|------|-------|
| **Anon Key (legacy)** | JWT | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2cnJ5Z2Zmd214bWVtbHNkbmF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMjg1MTAsImV4cCI6MjA4NzgwNDUxMH0.I2j9yBCucGz1eThms9Kq0ZPfpK22_oVgonSY8CQBF7U` |
| **Publishable Key** | Modern | `sb_publishable_lKMeMHkUFMad6tnnC85ruA_bagW2RHM` |

> ⚠️ **La service_role key NO se documenta aquí.** Está en el dashboard de Supabase y NUNCA debe exponerse en el frontend ni en el repositorio.

### Ejemplo de conexión (JavaScript)

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cvrrygffwmxmemlsdnax.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2cnJ5Z2Zmd214bWVtbHNkbmF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMjg1MTAsImV4cCI6MjA4NzgwNDUxMH0.I2j9yBCucGz1eThms9Kq0ZPfpK22_oVgonSY8CQBF7U'
)
```

### Ejemplo de conexión (Python)

```python
from supabase import create_client

url = "https://cvrrygffwmxmemlsdnax.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2cnJ5Z2Zmd214bWVtbHNkbmF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMjg1MTAsImV4cCI6MjA4NzgwNDUxMH0.I2j9yBCucGz1eThms9Kq0ZPfpK22_oVgonSY8CQBF7U"

supabase = create_client(url, key)
```

### Links del Dashboard

| Sección | URL |
|---------|-----|
| Table Editor | [/editor](https://supabase.com/dashboard/project/cvrrygffwmxmemlsdnax/editor) |
| Schema Visualizer | [/database/schemas](https://supabase.com/dashboard/project/cvrrygffwmxmemlsdnax/database/schemas) |
| SQL Editor | [/sql/new](https://supabase.com/dashboard/project/cvrrygffwmxmemlsdnax/sql/new) |
| Auth / Users | [/auth/users](https://supabase.com/dashboard/project/cvrrygffwmxmemlsdnax/auth/users) |
| RLS Policies | [/auth/policies](https://supabase.com/dashboard/project/cvrrygffwmxmemlsdnax/auth/policies) |
| Migraciones | [/database/migrations](https://supabase.com/dashboard/project/cvrrygffwmxmemlsdnax/database/migrations) |
| Logs | [/logs/explorer](https://supabase.com/dashboard/project/cvrrygffwmxmemlsdnax/logs/explorer) |
| API Docs | [/api](https://supabase.com/dashboard/project/cvrrygffwmxmemlsdnax/api) |

---

## 2. Contexto del Producto

BULLFOLIO es un **Asesor Digital de Portafolios** (Opción B). El usuario responde un cuestionario, el motor K-Means lo perfila, Markowitz genera la asignación óptima de activos, y el usuario recibe su **Plan de Portafolio** para ejecutarlo manualmente en su broker.

**No hay ejecución de trades. No hay custodia de activos.**

---

## 3. Flujo de Datos

```
[Registro en Auth] → auth.users (Supabase lo gestiona)
                        │
                        ▼ (trigger: on_auth_user_created)
               profiles (pais, moneda_base, rol)
                        │
                        ▼
[Cuestionario] → K-Means → risk_assessments
                            (cluster: 0=conservador / 1=moderado / 2=agresivo)
                                │
                                ▼
                   [Markowitz filtra asset_catalog]
                   (por país, risk_level, min_profile_score)
                                │
                                ▼
                   portfolio_recommendations
                   (sharpe, var, expected_return, market_context)
                                │
                                ▼
                   portfolio_allocations
                   (SPY=30%, GLD=15%, etc. + rationale por activo)
                                │
                                ▼
                   [Usuario ve su Plan en la app]
                   [Decide si lo descarga como PDF]

[Landing Page] → waitlist (emails pre-registro)
```

---

## 4. Esquema de Tablas

### Resumen

| # | Tabla | Filas | RLS | Propósito |
|---|-------|-------|-----|-----------|
| 1 | `profiles` | 0 | ✅ | Identidad del usuario (extiende auth.users) |
| 2 | `risk_assessments` | 0 | ✅ | Output del motor K-Means |
| 3 | `asset_catalog` | 19 | ✅ | Catálogo curado de activos |
| 4 | `portfolio_recommendations` | 0 | ✅ | Output del motor Markowitz |
| 5 | `portfolio_allocations` | 0 | ✅ | Pesos por activo por portafolio |
| 6 | `waitlist` | 0 | ✅ | Leads de la landing page |

---

### Tabla 1: `profiles`

**Propósito:** Extiende `auth.users` de Supabase con datos de negocio. Se crea automáticamente con un trigger cuando un usuario se registra.

| Columna | Tipo | Nullable | Default | Constraint |
|---------|------|----------|---------|------------|
| `id` | UUID **PK** | NO | — | FK → `auth.users(id)` ON DELETE CASCADE |
| `full_name` | TEXT | SÍ | — | — |
| `rol` | TEXT | NO | `'free'` | CHECK: `free`, `premium`, `admin` |
| `pais` | CHAR(2) | NO | `'CO'` | Código ISO 3166-1 alpha-2 |
| `moneda_base` | CHAR(3) | NO | `'COP'` | Código ISO 4217 |
| `created_at` | TIMESTAMPTZ | NO | `now()` | — |
| `updated_at` | TIMESTAMPTZ | NO | `now()` | Auto-actualizado por trigger |

**¿Por qué importa `pais`?**
- Determina qué activos del catálogo están disponibles (ej: PFBCOL solo para CO)
- Ajusta el riesgo cambiario en el cálculo de Markowitz
- Contextualiza la IA (tasas BanRep vs Fed)

---

### Tabla 2: `risk_assessments`

**Propósito:** Almacena el resultado del motor K-Means por usuario. Cada re-perfilamiento genera un nuevo registro, conservando historial.

| Columna | Tipo | Nullable | Default | Constraint |
|---------|------|----------|---------|------------|
| `id` | UUID **PK** | NO | `gen_random_uuid()` | — |
| `user_id` | UUID | NO | — | FK → `profiles(id)` ON DELETE CASCADE |
| `raw_answers` | JSONB | NO | `'{}'` | Respuestas originales del cuestionario |
| `cluster_label` | SMALLINT | NO | — | CHECK: `0` (conservador), `1` (moderado), `2` (agresivo) |
| `risk_score` | NUMERIC(5,2) | NO | — | CHECK: `>= 0 AND <= 100` |
| `is_current` | BOOLEAN | NO | `true` | Solo 1 activo por usuario (via trigger) |
| `evaluated_at` | TIMESTAMPTZ | NO | `now()` | Cuándo se calculó |
| `expires_at` | TIMESTAMPTZ | SÍ | — | Fecha sugerida para re-evaluar |

**Índices:**
- `idx_risk_assessments_user_current` → `(user_id, is_current)`

**Notas:**
- `raw_answers` en JSONB permite que el cuestionario evolucione sin alterar el schema
- El trigger `deactivate_old_assessments` pone `is_current=false` en registros anteriores automáticamente

---

### Tabla 3: `asset_catalog`

**Propósito:** Catálogo curado de activos financieros. Solo admins lo modifican. Contiene metadatos de riesgo que usa el motor de optimización para filtrar y limitar pesos.

| Columna | Tipo | Nullable | Default | Constraint |
|---------|------|----------|---------|------------|
| `id` | UUID **PK** | NO | `gen_random_uuid()` | — |
| `ticker_symbol` | TEXT | NO | — | **UNIQUE** |
| `company_name` | TEXT | NO | — | — |
| `asset_type` | TEXT | NO | — | CHECK: `etf`, `stock`, `crypto`, `bond`, `reit` |
| `exchange` | TEXT | NO | — | NYSE, NASDAQ, BVC, BINANCE |
| `currency` | CHAR(3) | NO | — | USD, COP |
| `risk_level` | SMALLINT | NO | — | CHECK: `1–5` (1=muy bajo, 5=muy alto) |
| `min_profile_score` | NUMERIC(5,2) | NO | `0` | Score mínimo del usuario para incluirlo |
| `max_weight_pct` | NUMERIC(5,4) | NO | `0.30` | Peso máximo en cualquier portafolio |
| `available_countries` | JSONB | NO | `'["CO","MX","US"]'` | Países donde está disponible |
| `is_active` | BOOLEAN | NO | `true` | Desactivar sin borrar |
| `created_at` | TIMESTAMPTZ | NO | `now()` | — |
| `updated_at` | TIMESTAMPTZ | NO | `now()` | Auto-actualizado por trigger |

**Índices:**
- `idx_asset_catalog_active_risk` → `(is_active, risk_level)`

**Lógica del filtro de Markowitz:**
1. `is_active = true`
2. `min_profile_score <= risk_score del usuario`
3. `available_countries` contiene el `pais` del usuario
4. `max_weight_pct` se usa como restricción superior en la optimización

---

### Tabla 4: `portfolio_recommendations`

**Propósito:** Resultado del motor Markowitz. Cada ejecución genera un portafolio óptimo vinculado al perfil de riesgo vigente del usuario.

| Columna | Tipo | Nullable | Default | Constraint |
|---------|------|----------|---------|------------|
| `id` | UUID **PK** | NO | `gen_random_uuid()` | — |
| `user_id` | UUID | NO | — | FK → `profiles(id)` ON DELETE CASCADE |
| `risk_assessment_id` | UUID | NO | — | FK → `risk_assessments(id)` |
| `sharpe_ratio` | NUMERIC(8,4) | SÍ | — | Ratio de Sharpe del portafolio óptimo |
| `expected_return` | NUMERIC(6,4) | SÍ | — | Retorno anualizado esperado |
| `expected_volatility` | NUMERIC(6,4) | SÍ | — | Volatilidad anualizada |
| `var_95` | NUMERIC(6,4) | SÍ | — | Value at Risk al 95% |
| `backtesting_years` | SMALLINT | NO | `5` | Años de backtesting usados |
| `market_context` | JSONB | NO | `'{}'` | Snapshot: VIX, régimen, tasas al momento |
| `status` | TEXT | NO | `'active'` | CHECK: `active`, `archived`, `expired` |
| `generated_at` | TIMESTAMPTZ | NO | `now()` | Fecha de generación |
| `valid_until` | TIMESTAMPTZ | SÍ | — | Fecha de expiración (+90 días) |

**Índices:**
- `idx_portfolio_recs_user_status` → `(user_id, status)`

**Notas:**
- `market_context` guarda el "estado del mundo" al generar (ej: `{"vix": 18, "regime": "bull", "fed_rate": 5.25}`)
- El trigger `archive_old_portfolios` pone `status='archived'` en portafolios anteriores automáticamente
- El reporte visual se construye en el frontend con datos de esta tabla + `portfolio_allocations`

---

### Tabla 5: `portfolio_allocations`

**Propósito:** El detalle granular del portafolio — qué porcentaje va a cada activo. Esta es la parte que el usuario ve en su Plan y lleva a su broker.

| Columna | Tipo | Nullable | Default | Constraint |
|---------|------|----------|---------|------------|
| `id` | UUID **PK** | NO | `gen_random_uuid()` | — |
| `portfolio_id` | UUID | NO | — | FK → `portfolio_recommendations(id)` ON DELETE CASCADE |
| `asset_id` | UUID | NO | — | FK → `asset_catalog(id)` |
| `target_weight` | NUMERIC(6,4) | NO | — | CHECK: `> 0 AND <= 1` |
| `rationale` | TEXT | SÍ | — | Por qué se incluyó este activo |
| `rebalance_needed` | BOOLEAN | NO | `false` | Motor de rebalanceo lo actualiza |
| `last_checked_at` | TIMESTAMPTZ | SÍ | — | Última verificación de rebalanceo |

**Constraints:**
- `UNIQUE(portfolio_id, asset_id)` — un activo no se repite en el mismo portafolio

**Índices:**
- `idx_portfolio_allocs_portfolio` → `(portfolio_id)`

**Notas:**
- La suma de `target_weight` para un `portfolio_id` debe ser `1.0` (validado en la app)
- `rationale` es clave para la transparencia — diferenciador de BULLFOLIO

---

### Tabla 6: `waitlist`

**Propósito:** Emails capturados en la landing page de BULLFOLIO antes del lanzamiento. Se usa para medir tracción y convertir a usuarios reales.

| Columna | Tipo | Nullable | Default | Constraint |
|---------|------|----------|---------|------------|
| `id` | UUID **PK** | NO | `gen_random_uuid()` | — |
| `email` | TEXT | NO | — | **UNIQUE**, validación regex en RLS policy |
| `nombre` | TEXT | SÍ | — | — |
| `pais` | CHAR(2) | SÍ | — | — |
| `source` | TEXT | NO | `'landing'` | Origen: `landing`, `referral`, etc. |
| `converted_to_user` | BOOLEAN | NO | `false` | True cuando se registra como usuario |
| `subscribed_at` | TIMESTAMPTZ | NO | `now()` | — |

**Índices:**
- `idx_waitlist_email` → `(email)`

---

## 5. Relaciones (ERD)

```
auth.users (Supabase)
    │ 1:1 (FK: profiles.id → auth.users.id)
    ▼
profiles
    │ 1:N                              1:N
    ▼                                  │
risk_assessments                       │
    │ 1:N (referenced by)              │
    ▼                                  ▼
portfolio_recommendations ◄──────── profiles
    │ 1:N
    ▼
portfolio_allocations
    │ N:1
    ▼
asset_catalog

waitlist (standalone — sin FK a otras tablas)
```

### Foreign Keys detalladas

| Constraint | Source | Target | On Delete |
|-----------|--------|--------|-----------|
| `profiles_id_fkey` | `profiles.id` | `auth.users.id` | CASCADE |
| `risk_assessments_user_id_fkey` | `risk_assessments.user_id` | `profiles.id` | CASCADE |
| `portfolio_recommendations_user_id_fkey` | `portfolio_recommendations.user_id` | `profiles.id` | CASCADE |
| `portfolio_recommendations_risk_assessment_id_fkey` | `portfolio_recommendations.risk_assessment_id` | `risk_assessments.id` | — |
| `portfolio_allocations_portfolio_id_fkey` | `portfolio_allocations.portfolio_id` | `portfolio_recommendations.id` | CASCADE |
| `portfolio_allocations_asset_id_fkey` | `portfolio_allocations.asset_id` | `asset_catalog.id` | — |

---

## 6. Seguridad (Row Level Security)

Todas las tablas tienen **RLS habilitado** ✅

### Políticas por tabla

#### `profiles`
| Política | Operación | Rol | Condición |
|----------|-----------|-----|-----------|
| `profiles: usuario ve el suyo` | SELECT | authenticated | `auth.uid() = id` |
| `profiles: usuario edita el suyo` | UPDATE | authenticated | `auth.uid() = id` |

#### `risk_assessments`
| Política | Operación | Rol | Condición |
|----------|-----------|-----|-----------|
| `risk_assessments: usuario ve los suyos` | ALL | authenticated | `auth.uid() = user_id` |

#### `asset_catalog`
| Política | Operación | Rol | Condición |
|----------|-----------|-----|-----------|
| `asset_catalog: lectura publica autenticada` | SELECT | authenticated | `true` (todos pueden leer) |
| `asset_catalog: solo admins escriben` | ALL | authenticated | `profiles.rol = 'admin'` |

#### `portfolio_recommendations`
| Política | Operación | Rol | Condición |
|----------|-----------|-----|-----------|
| `portfolios: usuario ve los suyos` | ALL | authenticated | `auth.uid() = user_id` |

#### `portfolio_allocations`
| Política | Operación | Rol | Condición |
|----------|-----------|-----|-----------|
| `allocations: usuario ve las suyas` | ALL | authenticated | Existe un `portfolio_recommendations` con `user_id = auth.uid()` |

#### `waitlist`
| Política | Operación | Rol | Condición |
|----------|-----------|-----|-----------|
| `waitlist: insert anonimo` | INSERT | anon | Email valida regex `^[A-Za-z0-9._%+-]+@...` |
| `waitlist: admins leen todo` | SELECT | authenticated | `profiles.rol = 'admin'` |

---

## 7. Triggers y Funciones

### `handle_new_user()`
- **Evento:** `AFTER INSERT` en `auth.users`
- **Acción:** Crea automáticamente un registro en `profiles`
- **Seguridad:** `SECURITY DEFINER` (ejecuta como owner, no como usuario)
- **search_path:** fijado a `''` (best practice Supabase)

### `handle_updated_at()`
- **Evento:** `BEFORE UPDATE` en `profiles`, `asset_catalog`
- **Acción:** Actualiza `updated_at = NOW()`

### `deactivate_old_assessments()`
- **Evento:** `AFTER INSERT` en `risk_assessments`
- **Acción:** Pone `is_current = FALSE` en todos los assessments anteriores del mismo usuario

### `archive_old_portfolios()`
- **Evento:** `AFTER INSERT` en `portfolio_recommendations`
- **Acción:** Pone `status = 'archived'` en portafolios activos anteriores del mismo usuario

---

## 8. Migraciones aplicadas

| Versión | Nombre | Fecha |
|---------|--------|-------|
| `20260304222417` | `bullfolio_initial_schema` | 2026-03-04 |
| `20260304222625` | `fix_function_search_paths` | 2026-03-04 |

---

## 9. Catálogo de Activos (19 activos iniciales)

### Bonos / Renta Fija (Risk Level 1-2)

| Ticker | Nombre | Tipo | Exchange | Moneda | Risk | Min Score | Max Weight |
|--------|--------|------|----------|--------|------|-----------|------------|
| AGG | iShares Core U.S. Aggregate Bond ETF | bond | NYSE | USD | 1 | 0 | 50% |
| TLT | iShares 20+ Year Treasury Bond ETF | bond | NYSE | USD | 2 | 0 | 40% |

### Defensivos / Oro (Risk Level 2)

| Ticker | Nombre | Tipo | Exchange | Moneda | Risk | Min Score | Max Weight |
|--------|--------|------|----------|--------|------|-----------|------------|
| GLD | SPDR Gold Shares ETF | etf | NYSE | USD | 2 | 0 | 40% |
| EFA | iShares MSCI EAFE ETF | etf | NYSE | USD | 2 | 0 | 40% |

### ETFs Globales (Risk Level 3)

| Ticker | Nombre | Tipo | Exchange | Moneda | Risk | Min Score | Max Weight |
|--------|--------|------|----------|--------|------|-----------|------------|
| SPY | SPDR S&P 500 ETF Trust | etf | NYSE | USD | 3 | 0 | 40% |
| VWO | Vanguard FTSE Emerging Markets ETF | etf | NYSE | USD | 3 | 10 | 30% |

### ETFs Tech (Risk Level 4)

| Ticker | Nombre | Tipo | Exchange | Moneda | Risk | Min Score | Max Weight |
|--------|--------|------|----------|--------|------|-----------|------------|
| QQQ | Invesco QQQ Trust NASDAQ-100 | etf | NASDAQ | USD | 4 | 30 | 30% |

### Acciones Colombia — BVC (Risk Level 3-4) 🇨🇴

| Ticker | Nombre | Tipo | Exchange | Moneda | Risk | Min Score | Max Weight | Países |
|--------|--------|------|----------|--------|------|-----------|------------|--------|
| PFBCOL | Bancolombia Preferencial | stock | BVC | COP | 3 | 20 | 20% | CO |
| ISA | Interconexion Electrica S.A. | stock | BVC | COP | 3 | 20 | 20% | CO |
| NUTRESA | Grupo Nutresa S.A. | stock | BVC | COP | 3 | 20 | 20% | CO |
| CEMARGOS | Cementos Argos S.A. | stock | BVC | COP | 4 | 30 | 15% | CO |

### Acciones EE.UU. (Risk Level 4-5)

| Ticker | Nombre | Tipo | Exchange | Moneda | Risk | Min Score | Max Weight |
|--------|--------|------|----------|--------|------|-----------|------------|
| AAPL | Apple Inc. | stock | NASDAQ | USD | 4 | 35 | 20% |
| MSFT | Microsoft Corporation | stock | NASDAQ | USD | 4 | 35 | 20% |
| GOOGL | Alphabet Inc. (Google) | stock | NASDAQ | USD | 4 | 35 | 20% |
| AMZN | Amazon.com Inc. | stock | NASDAQ | USD | 5 | 45 | 15% |
| NVDA | NVIDIA Corporation | stock | NASDAQ | USD | 5 | 50 | 15% |

### Activos Digitales — Spot (Risk Level 5) ⚠️ Max 15%

| Ticker | Nombre | Tipo | Exchange | Moneda | Risk | Min Score | Max Weight |
|--------|--------|------|----------|--------|------|-----------|------------|
| BTC | Bitcoin (Spot) | stock* | BINANCE | USD | 5 | 60 | 15% |
| ETH | Ethereum (Spot) | stock* | BINANCE | USD | 5 | 60 | 12% |
| SOL | Solana (Spot) | stock* | BINANCE | USD | 5 | 70 | 8% |

> *Nota: BTC, ETH, SOL están registrados como `stock` en la DB por una restricción técnica del MCP client. El asset_type correcto es `crypto` y debe corregirse directamente en el dashboard.

---

## 10. Ejemplos de Queries Supabase (JavaScript)

### Registrar email en waitlist (desde la landing)
```javascript
const { data, error } = await supabase
  .from('waitlist')
  .insert({
    email: 'usuario@gmail.com',
    nombre: 'Juan',
    pais: 'CO',
    source: 'landing'
  })
```

### Obtener el perfil de riesgo activo del usuario
```javascript
const { data, error } = await supabase
  .from('risk_assessments')
  .select('*')
  .eq('user_id', userId)
  .eq('is_current', true)
  .single()
```

### Obtener activos disponibles para un usuario en Colombia con score 45
```javascript
const { data, error } = await supabase
  .from('asset_catalog')
  .select('*')
  .eq('is_active', true)
  .lte('min_profile_score', 45)
  .contains('available_countries', ['CO'])
  .order('risk_level')
```

### Obtener el portafolio activo con sus allocations
```javascript
const { data, error } = await supabase
  .from('portfolio_recommendations')
  .select(`
    *,
    portfolio_allocations (
      target_weight,
      rationale,
      rebalance_needed,
      asset_catalog (
        ticker_symbol,
        company_name,
        asset_type,
        risk_level
      )
    )
  `)
  .eq('user_id', userId)
  .eq('status', 'active')
  .single()
```

### Guardar un nuevo portafolio generado por Markowitz (Python backend)
```python
# 1. Insertar la recomendación
portfolio = supabase.table('portfolio_recommendations').insert({
    'user_id': user_id,
    'risk_assessment_id': assessment_id,
    'sharpe_ratio': 1.24,
    'expected_return': 0.1234,
    'expected_volatility': 0.0998,
    'var_95': -0.083,
    'backtesting_years': 10,
    'market_context': {'vix': 18.5, 'regime': 'bull', 'fed_rate': 5.25},
    'valid_until': '2026-06-04T00:00:00Z'
}).execute()

portfolio_id = portfolio.data[0]['id']

# 2. Insertar las allocations
allocations = [
    {'portfolio_id': portfolio_id, 'asset_id': spy_id, 'target_weight': 0.30, 'rationale': 'Core diversificado con exposición al mercado amplio'},
    {'portfolio_id': portfolio_id, 'asset_id': gld_id, 'target_weight': 0.15, 'rationale': 'Cobertura contra inflación y baja correlación'},
    {'portfolio_id': portfolio_id, 'asset_id': tlt_id, 'target_weight': 0.20, 'rationale': 'Renta fija larga duración para estabilidad'},
    # ... más activos
]

supabase.table('portfolio_allocations').insert(allocations).execute()
```

---

## 11. Variables de Entorno (para el proyecto)

```env
# .env.local (NUNCA commitear al repo)
NEXT_PUBLIC_SUPABASE_URL=https://cvrrygffwmxmemlsdnax.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2cnJ5Z2Zmd214bWVtbHNkbmF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMjg1MTAsImV4cCI6MjA4NzgwNDUxMH0.I2j9yBCucGz1eThms9Kq0ZPfpK22_oVgonSY8CQBF7U

# Solo para backend Python (NUNCA en frontend)
# SUPABASE_SERVICE_ROLE_KEY=<obtener del dashboard → Settings → API>
```

---

## 12. Edge Functions

### `stock-prices` — Proxy de precios de acciones en tiempo real

| Campo | Valor |
|-------|-------|
| **Slug** | `stock-prices` |
| **URL** | `https://cvrrygffwmxmemlsdnax.supabase.co/functions/v1/stock-prices` |
| **JWT requerido** | ❌ No (público, accesible desde la landing) |
| **Runtime** | Deno (Supabase Edge Runtime) |
| **Cache** | 30 segundos |

**¿Qué hace?**
Funciona como proxy server-side para Yahoo Finance, resolviendo el problema de CORS que impide al frontend (browser) consultar precios de stocks directamente.

**¿Por qué existe?**
- Binance API → funciona en frontend para crypto ✅
- Yahoo Finance → bloqueada por CORS en frontend ❌
- Edge Function → llama a Yahoo Finance desde el servidor, sin CORS ✅

**Uso:**
```
GET /functions/v1/stock-prices
→ Retorna SPY, QQQ, AAPL, MSFT, NVDA, GLD, TLT (por defecto)

GET /functions/v1/stock-prices?symbols=SPY,AAPL,MSFT
→ Retorna solo los símbolos solicitados (máx 10)
```

**Respuesta:**
```json
[
  { "symbol": "SPY", "price": 512.85, "change": 0.45 },
  { "symbol": "AAPL", "price": 172.44, "change": -1.20 },
  ...
]
```

**Integración en la landing page:**
El `script.js` llama a esta Edge Function cada 30 segundos para el ticker horizontal de stocks. Antes usaba datos mock; ahora son reales.

---

## 13. Estrategia de Datos

### Arquitectura de fuentes de datos

```
┌─────────────────────────────────────────────────────────┐
│           BULLFOLIO Data Strategy                       │
├──────────────────┬──────────────────────────────────────┤
│ FRONTEND         │                                      │
│ (Landing Page)   │                                      │
├──────────────────┼──────────────────────────────────────┤
│ Crypto live      │ Binance API (directo, sin proxy)     │
│                  │ BTC, ETH, SOL, BNB, ADA              │
│                  │ Actualización: cada 10s              │
├──────────────────┼──────────────────────────────────────┤
│ Stocks live      │ Edge Function stock-prices            │
│                  │ SPY, QQQ, AAPL, MSFT, NVDA           │
│                  │ Proxy → Yahoo Finance (sin CORS)     │
│                  │ Actualización: cada 30s              │
├──────────────────┼──────────────────────────────────────┤
│ BACKEND          │                                      │
│ (Motor Python)   │                                      │
├──────────────────┼──────────────────────────────────────┤
│ Stocks + ETFs    │ yfinance (Python, gratis, 20+ años)  │
│ BVC Colombia     │ yfinance (PFBCOL.CL, ISA.CL, etc.)  │
│ Crypto histórico │ yfinance (BTC-USD) o Binance API    │
│ VIX / Macro      │ yfinance (^VIX, ^GSPC)              │
│ Tasas de interés │ FRED API (gratis, sin límites)       │
├──────────────────┼──────────────────────────────────────┤
│ RESULTADOS       │                                      │
├──────────────────┼──────────────────────────────────────┤
│ Portafolios      │ Supabase (portfolio_recommendations) │
│ Pesos por activo │ Supabase (portfolio_allocations)     │
│ Perfiles riesgo  │ Supabase (risk_assessments)          │
└──────────────────┴──────────────────────────────────────┘
```

### Principio: datos en vivo, resultados en Supabase

- **Precios históricos NO se almacenan** en Supabase — yfinance los consulta bajo demanda
- **Resultados de cálculos SÍ se almacenan** — Markowitz, K-Means, VaR → Supabase
- El frontend consulta Supabase para portafolios, Binance/Edge Function para tickers live

