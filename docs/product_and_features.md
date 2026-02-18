# Producto y Features: LULO

## Core Features (MVP)

### 1. El Comparador (El Cerebro)
- **Buscador Universal:** Busca "Leche" y ve precios en Tienda A, Tienda B, Tienda C.
- **Carrito Mágico:** Crea tu lista y LULO te dice: "Si compras todo en D1 te cuesta $X, si compras en Carulla cuesta $Y. La combinación óptima (mix) te ahorra $Z".

### 2. Presupuestos Compartidos (El Corazón)
- **Vaca Virtual:** Crea un grupo "Apartamento 302".
- **Tracking:** Cada usuario registra gastos manuales o escanea facturas (OCR futuro).
- **Semaforización:** Barra de progreso visual (Verde, Amarillo, Rojo) según el límite establecido.

### 3. Modo Ocasiones (La Magia)
- **Wizard de Eventos:** "¿Qué planeas?" -> [Asado] [Cita] [Picnic] [Loncheras].
- **Sugerencias Curadas:** 
  - *Picnic:* Quesos, Vinos, Galletas, Mantel (si hay partnership).
  - *Date:* Ingredientes para una cena romántica fácil de hacer.

### 4. Listas Inteligentes
- **Recurrentes:** "Lo de siempre" (Huevos, Arepas, Leche).
- **Colaborativas:** Todos en el grupo pueden añadir ítems en tiempo real.

## Futuras Features (Roadmap)
- **Nutrición:** Semáforos nutricionales en productos.
- **Footprint:** Huella de carbono de tu compra.
- **Recetas:** "Tienes tomate y huevos, haz pericos".

## Plataformas
- **Fase 1:** Web App (Mobile First) - PWA.
- **Fase 2:** App Nativa (iOS/Android).
- **Stack Tecnológico Recomendado:**
  - **Frontend:** Next.js (React) + TailwindCSS (Rápido, SEO-friendly, PWA fácil).
  - **Backend:** Node.js (NestJS) o Python (FastAPI - bueno para data/scraping).
  - **Base de Datos:** PostgreSQL (Relacional, robusta para transacciones financieras).
