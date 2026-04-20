## Plan: Estandarizacion UI por Tokens y Componentes

Estandarizar frontend React/Inertia y CSS global en una sola iteracion (tokens + componentes base), con auditoria automatizada para revisar cada ocurrencia linea por linea antes de reemplazar. La estrategia minimiza regresiones separando descubrimiento, tokenizacion, migracion progresiva y validacion continua.

**Steps**
1. Fase 1 - Congelar baseline visual y tecnico. Ejecutar build actual y generar inventario automatico de clases (colores hardcodeados, tipografia, espaciado, bordes, sombras, botones/cards/alerts inlined). Este paso crea el mapa de lineas a intervenir y bloquea el alcance inicial. *bloquea todos los pasos siguientes*
2. Fase 2 - Definir contrato de design tokens central. Crear una unica fuente de verdad para color, tipografia, spacing, radius, shadow, z-index y transiciones, alineada con variables existentes en CSS y Tailwind. Incluir nomenclatura estable para escalar nuevos elementos sin romper consistencia. *depende de 1*
3. Fase 3 - Mapear tokens al sistema actual. Extender Tailwind para consumir tokens y mantener compatibilidad con CSS variables ya existentes; evitar ruptura de dark mode y estados interactivos. *depende de 2*
4. Fase 4 - Consolidar primitives UI. Estandarizar Button, Card y Text (y Alert/Banner donde aplique) con variantes y tamanos basados en tokens; mantener wrappers o adaptadores para componentes legacy durante la migracion. *depende de 3*
5. Fase 5 - Auditoria linea por linea asistida por comandos. Ejecutar barridos automaticos por patron (hardcoded hex/rgb, clases repetidas, inline className largos) para obtener cada archivo+linea candidata; revisar y migrar cada match a token/componente correspondiente en lotes pequenos para reducir riesgo. *depende de 4*
6. Fase 6 - Reemplazo incremental por dominios de UI. Migrar primero componentes compartidos, luego layouts, luego paginas; despues de cada lote correr validaciones y corregir diferencias visuales. *depende de 5*
7. Fase 7 - Cierre y gobernanza. Eliminar patrones legacy que queden obsoletos, documentar reglas de contribucion de estilo y dejar comandos de auditoria como control continuo para nuevos cambios. *depende de 6*

**Relevant files**
- `resources/css/app.css` - Reusar variables CSS base (OKLCH, light/dark) y ajustar naming para tokens globales.
- `tailwind.config.js` - Mapear tokens a theme.extend y mantener utilidades existentes.
- `resources/js/lib/utils.ts` - Mantener helper `cn()` para componer variantes.
- `resources/js/Components/ui/button.tsx` - Referencia de patron CVA para boton base.
- `resources/js/Components/ui/card.tsx` - Referencia de card base para variantes estandar.
- `resources/js/Components/banner.tsx` - Referencia para variante de alerta/estado.
- `resources/js/Components/PrimaryButton.jsx` - Migrar o envolver hacia primitive de boton.
- `resources/js/Components/DangerButton.jsx` - Migrar o envolver hacia primitive de boton.
- `resources/js/Components/SecondaryButton.jsx` - Migrar o envolver hacia primitive de boton.
- `resources/js/Components/CourseCard.jsx` - Punto de migracion de card/text tokens.
- `resources/js/pages/**` - Principal superficie de reemplazo linea por linea.

**Verification**
1. Baseline previo: `npm run build` y captura de pantallas de rutas clave para comparacion visual.
2. Por cada lote de migracion: ejecutar `npm run build` y validar manualmente vistas criticas (home, auth, dashboard, cursos, teacher).
3. Verificacion funcional backend+frontend: `php artisan test` despues de cada fase mayor.
4. Auditoria automatizada post-migracion: rerun de comandos de deteccion para confirmar 0 hardcodes fuera de excepciones permitidas.
5. Criterio de salida: todos los botones/cards/textos compartidos consumen tokens o primitives; no hay nuevas clases ad-hoc en componentes/paginas modificadas.

**Decisions**
- Incluye: solo frontend React/Inertia + CSS global.
- Incluye: tokens y componentes base en la misma iteracion.
- Incluye: rigor por comandos automaticos para barrido y control.
- Excluye: cambios de logica de negocio, rutas/controladores y refactors no relacionados con estilo.
- Excluye: rediseño UX completo; se busca estandarizacion visual, no rehacer arquitectura funcional.

**Further Considerations**
1. Definir lista de excepciones permitidas (por ejemplo, colores de marca legacy temporales) para evitar bloqueos durante la migracion.
2. Trabajar por ramas/fases para rollback rapido si aparece regresion visual fuerte.
3. Mantener una regla de PR: cualquier nuevo componente debe usar tokens/primitives antes de merge.