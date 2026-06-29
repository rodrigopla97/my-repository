# Lineamientos Frontend — Leafnoise (React)

Referencia de **estructura**, **code style** y **patrones** para repositorios frontend React del equipo.
Documento standalone: copialo/adaptalo a cualquier proyecto nuevo.

---

## 1. Stack obligatorio

| Capa | Tecnología |
|------|------------|
| Framework | React 18+ con TypeScript |
| Bundler | Vite |
| Linter/Formatter | Biome |
| CSS | Tailwind CSS v4 (`@tailwindcss/vite`) |
| HTTP Client | Axios (siempre vía servicio tipado) |
| Routing | React Router v7 |
| Package Manager | npm |

---

## 2. Estructura de carpetas

Todo el código vive bajo `source/app/`. Aliases de path:
- `@app/*` → `source/app/*`
- `@leafnoise/*` → `source/node_modules/@leafnoise/*`

```
source/app/
├── modules/
│   ├── main/                      → Capa compartida (layout, hooks globales, tipos comunes)
│   │   ├── entities/entities.ts   → Tipos compartidos entre módulos (ChildrenType, etc.)
│   │   ├── hooks/                 → Hooks globales (useRouter, useNotification, etc.)
│   │   └── interfaces/            → UI compartida (Loading, EmptyBox, etc.)
│   └── [name]/                    → Un módulo por feature/página
│       ├── [name]ModuleProvider.tsx
│       ├── [name]Module.tsx
│       ├── constants/constants.ts → INITIAL_STATE del módulo
│       ├── entities/entities.ts   → Todos los tipos TypeScript del módulo
│       ├── states/
│       │   ├── [name]Context.tsx
│       │   └── [name]Provider.tsx
│       ├── services/services.ts   → Llamados Axios tipados
│       ├── hooks/                 → Hooks propios del módulo
│       ├── helpers/               → Funciones puras
│       └── interfaces/            → Componentes UI del módulo
├── index.tsx                      → Entry point: BrowserRouter + rutas
└── index.css                      → Tailwind CSS + theme custom
```

### Reglas de estructura

- Cada módulo es **independiente**: nunca importar `states/`, `services/` ni `hooks/` de otro módulo.
- `main` es la **única** capa compartida entre módulos.
- Todos los tipos van en `modules/[name]/entities/entities.ts`. No crear archivos de tipos sueltos.
- Los servicios devuelven `AxiosResponse<T>` tipado, con tipos del propio módulo.
- Los helpers son **funciones puras**, sin efectos secundarios.

---

## 3. Code style

- **Biome** como único formatter/linter (reemplaza ESLint y Prettier):
  - Ancho de línea: **100** caracteres
  - Indentación: **2 espacios**
  - **Sin trailing commas**
  - `quoteStyle`: `"double"`

**`biome.json` — reglas activas:**

```json
{
  "linter": {
    "rules": {
      "preset": "recommended",
      "style": { "useConst": "error", "useImportType": "error" },
      "suspicious": { "noExplicitAny": "error", "noDoubleEquals": "error" },
      "a11y": {
        "noSvgWithoutTitle": "off",
        "noStaticElementInteractions": "off",
        "useKeyWithClickEvents": "off",
        "noLabelWithoutControl": "off"
      },
      "suspicious": { "noArrayIndexKey": "off" }
    }
  },
  "css": { "linter": { "enabled": false } }
}
```

> Las reglas de a11y desactivadas son patrones válidos en un panel admin (backdrops de cierre, labels visuales, listas estáticas). El linter de CSS está off porque Tailwind usa directivas (`@tailwind`) que Biome no reconoce.
- **Sin `enum`** → usar union types u objetos literales con `as const`.
- **Sin `any`** → usar `unknown` + type guards si hace falta.
- **Sin non-null assertions** → nunca usar `!`.
- **`import type`** → para imports que solo traen tipos.
- **`const` siempre** → nunca `var`.
- **Igualdad estricta** → siempre `===`, nunca `==`.
- **TypeScript strict mode off** → todos los tipos vienen del `entities/entities.ts` del módulo.
- **`async/await` + `try/catch`** → nunca usar `.then()/.catch()`. Toda función asíncrona usa `async/await` con bloque `try/catch`.
- **Código en inglés:** variables, constantes, IDs, funciones, tipos, hooks, providers, componentes, archivos y servicios (ej: `PaymentStatus`, `totalAmount`, `getPayments`).
- **Texto de usuario en español:** solo lo visible al usuario va en español — labels, strings en pantalla, mensajes de error visibles y comentarios de código (ej: `"Método de pago"`, `"Cargando..."`).
- **Unidades relativas obligatorias:** no usar `px`. Usar `rem` para fuentes, padding, margin, gap, border-radius; `vh`/`vw` para dimensiones relativas al viewport; `%` para anchos/altos relativos al padre. Únicas excepciones: `viewBox` de SVG y valores internos de `box-shadow`.

---

## 4. Patrón de módulo

Cada módulo se compone de estos artefactos, en este orden de creación:

1. **Entities** — tipos TypeScript en `entities/entities.ts`
2. **Constants** — `INITIAL_STATE` en `constants/constants.ts`
3. **State** — Context + Provider en `states/`
4. **Services** — llamados Axios en `services/services.ts`
5. **Module** — componente de página `[name]Module.tsx`
6. **ModuleProvider** — wrapper `[name]ModuleProvider.tsx`
7. **Route** — registro en `app/index.tsx`

### Convenciones de nombres

| Artefacto | Convención | Ejemplo |
|-----------|------------|---------|
| Carpeta | `camelCase` | `modules/invoice/` |
| ModuleProvider | `[name]ModuleProvider.tsx` | `invoiceModuleProvider.tsx` |
| Componente Module | `[name]Module.tsx` | `invoiceModule.tsx` |
| Context | `[name]Context.tsx` | `invoiceContext.tsx` |
| Provider | `[name]Provider.tsx` | `invoiceProvider.tsx` |
| Hook de provider | `use[Name]Provider` | `useInvoiceProvider` |
| Tipo de estado de página | `[Name]DataType` | `InvoiceDataType` |
| Tipo de context | `[Name]ContextType` | `InvoiceContextType` |
| Getter | `get[Name]State` | `getInvoiceState` |
| Setter | `set[Name]State` | `setInvoiceState` |
| Clave de INITIAL_STATE | `[NAME]_PAGE` | `INVOICE_PAGE` |
| Interface (componente UI) | `[name][Component]Interface.tsx` | `invoiceListInterface.tsx` |
| Hook custom | `use[Name][Action].tsx` | `useInvoiceDownload.tsx` |
| Helper | `camelCase.ts` (sin sufijo) | `parsers.ts` |
| Constantes | `SCREAMING_SNAKE_CASE` | `INVOICE_PAGE` |

> Sufijos de tipos: `Type`, `DataType`, `ContextType`, `OptionsType`, `ResponseType`.

---

## 5. Patrón de estado (State)

**React Context API exclusivamente.** No se permite ninguna otra librería de manejo de estado.

- Cada módulo tiene un único `useState` con todo el estado de la página como objeto.
- El estado inicial se define en `constants/constants.ts` bajo `INITIAL_STATE.[NAME]_PAGE`.
- El provider expone un par getter/setter: `get[Name]State` / `set[Name]State`.
- Siempre usar la forma callback al actualizar: `setState((prev) => ({ ...prev, ... }))`.

```tsx
// Patrón de consumo
export const useInvoiceProvider = () => useContext(InvoiceContext);
```

```ts
// Estructura típica de INITIAL_STATE
INVOICE_PAGE: {
  loading: true,
  data: [],
  filters: { search: "" },
  createModal: { open: false },
  deleteModal: { open: false, data: null }
}
```

---

## 6. Patrón de routing

- Las rutas se definen en `app/index.tsx` como rutas anidadas bajo `MainModuleProvider`.
- El elemento de ruta es siempre `[Name]ModuleProvider`, nunca `[Name]Module` directo.
- Los parámetros de ruta usan camelCase: `:projectId`, `:moduleId`.
- Nunca usar `useParams()` directo → acceder a los params vía el hook compartido `useRouter()` de `modules/main/hooks/`.
- Las rutas públicas (términos, privacidad, etc.) van fuera del provider raíz.

---

## 7. API Services

- Todos los llamados HTTP van en `modules/[name]/services/services.ts`.
- Siempre tipados (request y response) con tipos del propio módulo.
- Los errores se manejan en los **hooks**, no en los servicios (los servicios propagan).
- Los proxies de Vite se configuran por proyecto en `vite.config.ts`.
- Variables de entorno con prefijo `ENV_` (configurado en `envPrefix` de Vite).

```ts
// Ejemplo de servicio tipado
export async function getInvoices(): Promise<AxiosResponse<InvoiceResponseType>> {
  return axios.get<InvoiceResponseType>("/api/invoices", { withCredentials: true });
}
```

---

## 8. Patrón de loading (UX en llamados async)

Dar feedback de carga en **toda** acción que dispare un llamado y espere respuesta:

- Estado local `useState` por acción (`isLoading`, `isValidating`, etc.) cuando el loading es transitorio y propio del componente; o un flag en el estado del módulo si varias vistas lo comparten.
- Envolver el llamado en `try / finally` y apagar el loading en el `finally` (garantiza que se apague incluso ante error).
- Deshabilitar el botón disparador mientras carga y mostrar un `Spinner` / texto de carga.
- Bloquear doble disparo (`if (loading) return;`) en acciones no idempotentes (descargas, submits).

```tsx
async function handleAction() {
  setIsLoading(true);
  try {
    const response = await service();
    // ...usar response
  } catch (error) {
    onNotification(false, error.response?.data?.detail);
  } finally {
    setIsLoading(false);
  }
}
```

---

## 9. Testing

- **Vitest** como runner. Config en el bloque `test` de `source/vite.config.ts` (config única unificada).
- Entorno: `jsdom`. Setup: `source/app/modules/main/tests/setup.ts`.
- `globals: false` → importar siempre `describe`, `it`, `expect` desde `vitest`.
- Nombres: `<archivo>.test.ts` para lógica pura, `<archivo>.test.tsx` para componentes/hooks que renderizan JSX.
- Un archivo de test por archivo fuente. No combinar tests de varios fuentes.
- Los tests siguen las mismas reglas de Biome que el código de producción.

### Qué testear por capa

| Capa | Qué testear | Estrategia de mock |
|------|-------------|--------------------|
| `helpers/` | Funciones puras: inputs, outputs, edge cases | Ninguna (sin side effects) |
| `hooks/` | Transiciones de estado, valores de retorno, side effects | `renderHookWithProviders` |
| `services/` | Método HTTP, URL, params, parseo de respuesta | `vi.mock('axios')` vía `mockAxios.ts` |
| `states/` | Estado inicial del provider, updates vía setter | `renderHookWithProviders` |
| `interfaces/` | Render, interacciones, display condicional | `renderWithProviders` + `@testing-library/user-event` |

---

## 10. Comandos estándar

```bash
npm install           # instalar dependencias
npm start             # format + lint + dev server
npm run build         # format + lint + build de producción (output: dist/)
npm run lint          # Biome lint con auto-fix (--write)
npm run format        # Biome format con auto-fix (--write)
npm run dev           # dev server sin lint previo

# Tests
npm run test
npm run test:watch
npm run test:coverage
```

---

## 11. Checklist de migración estructural

Cuando se mueven o renombran archivos/carpetas (ej: `src/` → `source/app/modules/`), seguir este orden estrictamente para evitar errores de import en runtime que TypeScript no detecta en tiempo de compilación.

### Antes de eliminar la carpeta original

1. **Auditar todos los imports que referencian la ruta vieja:**

```bash
# Buscar toda referencia al path que va a desaparecer
npx biome check --reporter=json source/ 2>&1
grep -r "from \"@/utils\"" source/
grep -r "from \"@app/utils\"" source/
```

2. **Verificar que cada archivo movido tiene su nueva ruta:**

```bash
# Confirmar que el alias destino existe físicamente
ls source/app/modules/main/helpers/
```

3. **Compilar antes de borrar:**

```bash
npx tsc --noEmit      # detecta imports inexistentes a nivel de tipos
npx biome check source/ # detecta problemas de code style
```

4. **Arrancar el dev server y navegar las rutas afectadas** antes de hacer el commit.  
   TypeScript puede pasar limpio y Vite fallar con `[plugin:vite:import-analysis] Failed to resolve import` si el alias apunta a un archivo que no existe.

### Por qué TypeScript no es suficiente

`tsc --noEmit` valida tipos y resolución de módulos según `tsconfig.app.json`. Pero si un alias en `vite.config.ts` apunta a una carpeta que no existe, TypeScript puede resolverlo correctamente (vía `paths`) mientras Vite falla en runtime al intentar cargar el módulo físico. El build de producción (`vite build`) también lo detecta, pero el dev server solo falla cuando se navega a la ruta que carga el módulo.

### Patrón seguro al crear helpers compartidos

Cuando se extrae una función a `modules/main/helpers/`, actualizar **todos** los imports del proyecto en el mismo commit:

```bash
# Encontrar todos los archivos que importan desde la ruta vieja
grep -r "from \"@app/utils\"" source/
grep -r "from \"../utils\"" source/
# Actualizar cada uno antes de eliminar el archivo original
```

---

## Checklist rápido antes de commitear

- [ ] Archivo en la carpeta correcta del módulo (sin tipos sueltos).
- [ ] Sin `any`, sin `enum`, sin `!`, sin `var`, sin `==`, sin `px`.
- [ ] `import type` para imports de solo tipos.
- [ ] Identificadores en inglés; textos de usuario en español.
- [ ] Servicios tipados; errores manejados en hooks.
- [ ] Estado vía Context con patrón `get/set[Name]State` y update por callback.
- [ ] Feedback de loading en llamados async (con `try/finally`).
- [ ] `npm run lint` y typecheck en verde.
- [ ] Si se movieron archivos: grep de imports hacia paths viejos antes de eliminar la carpeta original.
