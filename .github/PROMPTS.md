# Copilot Prompt Pack — hood-oracle-lenses

A working set of prompts for GitHub Copilot in this repo. Three tiers:

1. **Copilot Chat** — the sidebar, best for multi-file asks
2. **Copilot Agent / Workspace** — big, structured, multi-file tasks
3. **Inline (Ghost Text)** — comments inside a file that Copilot completes

`.github/copilot-instructions.md` frames every request; these prompts assume
that file is in place.

---

## 1. Copilot Chat Prompts

### Add a new page (route)

```
Add a new route at /<path> that renders a new page component
`src/pages/<PageName>.tsx`.

Requirements:
- Register the route in `src/App.tsx` alongside the existing routes.
- Use the shared layout / providers already wrapping other pages.
- Page should be a default-exported React component, typed with FC-less
  syntax (`export default function <PageName>() { ... }`).
- Use Tailwind + existing shadcn primitives from `src/components/ui/`.
- If the page needs data, use `@tanstack/react-query`.
- Add a Vitest test at `src/pages/<PageName>.test.tsx` that renders it inside
  a memory router and asserts on a visible heading.
```

### Add a shadcn component

```
Add the shadcn <ComponentName> component to `src/components/ui/`.

Follow the exact pattern of existing files in that folder (Radix primitive +
`cn()` + variant helpers via `class-variance-authority` where relevant).
Do not introduce new dependencies beyond what's already in package.json;
if a required Radix package is missing, list it and stop.
```

### Add a custom hook

```
Create a custom hook at `src/hooks/use<Name>.ts` that <describe behavior>.

- Fully typed inputs and return value; no `any`.
- Handle cleanup (effects, subscriptions) properly.
- Add a Vitest test at `src/hooks/use<Name>.test.ts` using
  `@testing-library/react`'s `renderHook`.
```

### Add a React Three Fiber scene

```
Create a new R3F scene at `src/components/scenes/<Name>Scene.tsx`.

- Export a default component that renders inside an existing <Canvas>
  (do NOT create a new <Canvas> at module scope).
- Lights, camera, and controls should be optional props with sensible
  defaults.
- Avoid creating geometries/materials inside render functions — memoize
  with `useMemo`, and dispose in cleanup where relevant.
- If the scene uses astronomy-engine, keep the astronomy math in a pure
  helper under `src/lib/` and unit-test it.
```

### Form with react-hook-form + zod

```
Build a `<FormName>` form in `src/components/forms/<FormName>.tsx`.

Fields: <list fields with types>.

- Use react-hook-form with a zod resolver.
- Colocate the schema in the same file, exported as `<FormName>Schema`.
- Use shadcn Form components from `src/components/ui/form.tsx`.
- Submit handler should be a prop; do not fetch here.
- Add a Vitest test that fills in the form and asserts the submit prop
  was called with the parsed values.
```

### Migrate an inline color to a token

```
Find any hard-coded color literals (hex, rgb, hsl) under `src/` and swap
them for the corresponding Tailwind token defined in `tailwind.config.ts`
or `src/index.css`. If no matching token exists, list the offender and
propose a token name; do not invent one silently.
```

### Repo-wide consistency audit

```
Audit the repo for the following and report findings as a markdown list
(file:line for each):
1. Uses of `any` in TypeScript.
2. React components missing a display name where devtools would benefit.
3. Direct `console.log` in non-test code.
4. Radix components imported directly instead of through
   `src/components/ui/`.
5. New dependencies imported but not declared in `package.json`.

Do not fix anything — just report.
```

---

## 2. Copilot Agent / Workspace Prompts (bigger, multi-file)

### Add a new feature end-to-end

```
Implement a "<Feature Name>" feature.

User story: <one or two sentences>.

Required changes:
1. Route at `/<path>` with a new page component in `src/pages/`.
2. Feature components under `src/components/<feature>/`.
3. Any new hooks under `src/hooks/`.
4. Any pure helpers under `src/lib/`.
5. Types in a colocated `types.ts` if the surface is larger than a couple
   of interfaces.
6. Unit tests for hooks, helpers, and at least one integration test for
   the page.
7. Register the route in `src/App.tsx`.
8. Update `README.md` if the feature adds a user-visible flow worth
   documenting.

Follow the conventions in `.github/copilot-instructions.md` exactly.
```

### Wire a Capacitor plugin end-to-end

```
Wire up the Capacitor <plugin> plugin so it works on both web and native.

- Install the plugin (list the package; do not modify lockfiles by hand).
- Update `capacitor.config.ts` if configuration is required.
- Add a thin wrapper hook at `src/hooks/use<Plugin>.ts` that:
    * Uses the web fallback in a web environment (feature-detect via
      `Capacitor.isNativePlatform()`).
    * Handles permission requests where relevant.
    * Returns a typed API for the rest of the app.
- Add a settings toggle where relevant (mirror the existing Notifications
  pattern in Settings).
- Add a Vitest test that mocks `@capacitor/core` and asserts the web
  fallback path.
```

### Introduce a design token

```
Add a new Tailwind design token `<token-name>` to `tailwind.config.ts`
(and matching CSS variable in `src/index.css` if the codebase uses that
pattern).

Then sweep the repo and replace the closest existing hard-coded value with
this token wherever it appears. Show the before/after diff for each
touched file.
```

### Extract a shared component

```
The following pattern is duplicated across <files>: <describe pattern>.

Extract it into a single component at
`src/components/<ComponentName>.tsx`, update all callers, and add a
Vitest test for the extracted component. Preserve existing prop-level
behavior — no new features in this pass.
```

---

## 3. Inline Copilot Prompts (single-file, ghost text)

### Component scaffold

```tsx
// Create a typed React function component `<Name>` that takes
// { <prop>: <type>, ... } and renders <describe UI> using shadcn
// primitives + Tailwind. Export as default.
```

### Hook scaffold

```ts
// Custom hook `use<Name>` that <describe behavior>.
// Inputs: <types>. Returns: <shape>. Handle cleanup.
```

### Zod schema

```ts
// Zod schema for <thing>. Fields: <list with constraints>.
// Export as `<name>Schema` and `type <Name> = z.infer<typeof <name>Schema>`.
```

### R3F scene body

```tsx
// Inside this component, mount <describe scene>. Memoize geometries and
// materials. Add ambient + directional light. No new <Canvas>.
```

### Vitest test scaffold

```ts
// Vitest test for <target>. Cases: <list>. Use @testing-library/react
// and query by role/label first.
```

### Tailwind classlist cleanup

```tsx
// Reorganize className strings on this file so utilities are grouped:
// layout, spacing, sizing, typography, color, effects, state.
// Do not change visual output.
```

---

## 4. Habitual Prompts

Two prompts worth running as a habit:

```
I just changed <file / area>. What other files in this repo need to be
updated to stay consistent (routes, tests, types, docs, capacitor config)?
List them; don't edit yet.
```

```
Run through the diff on this branch and flag anything that violates
`.github/copilot-instructions.md`. Report only violations, with
file:line references.
```

---

## Use Copilot for…

- ✅ Boilerplate from existing patterns (pages, components, hooks, tests)
- ✅ Keeping files in sync after a refactor
- ✅ Type-safety cleanup (killing `any`, tightening generics)
- ✅ Test scaffolding
- ✅ Tailwind token migrations

## Don't use Copilot for…

- ❌ Choosing what to build
- ❌ Product/UX decisions
- ❌ Anything security-sensitive without human review
- ❌ Signing / secret / native credential work
