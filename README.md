# @papa/design

Shared design primitives for the Papa apps — the token set and the hand-drawn
SVG icon set, consumed by both
[Papa Rentals](https://github.com/swagofthenerd-gif/Scrrenplay-papa) (the
marketplace) and Papa Vendor (the rental-house operations app).

## The one rule

**Primitives live here. Semantics live in the app.**

| Belongs here | Belongs in the app |
|---|---|
| `--accent`, `--ink`, `--line`, `--bg`, `--card` | `--status-here`, `--status-out`, `--status-attention` |
| `--r-sm…--r-xl`, `--sp-1…--sp-8`, `--fs-*` | `--tap-glove`, `--row-h-*`, `--r-row` |
| `--shadow-*`, `--ease-*`, `--dur-*`, `--tap` | `--ff-code`, `--accent-strong`, sun-mode overrides |
| The icon set | App-specific glyphs |

Sharing primitives is what stops two apps drifting into different oranges.
Keeping semantics app-owned is what stops a marketplace brand refresh silently
changing what "overdue" looks like on a warehouse loading dock. Both properties
are wanted, so both layers exist.

**Do not add a theme here.** Papa Vendor has a third `sun` theme for direct
sunlight; that is a semantic concern and it lives in the app.

## Why this repo is public

It contains colour values and SVG paths that are already public in the
marketplace repo. Making it public means consumers and CI can install it with
no token ceremony. The business strategy, competitive analysis and operational
schema live in the private `papa-vendor` repo.

## Usage

```jsonc
// package.json
"dependencies": {
  "@papa/design": "github:swagofthenerd-gif/papa-design#v0.1.0"
}
```

```css
@import '@papa/design/tokens.css';   /* primitives: light + dark */
@import './semantic.css';            /* meaning, app-owned */
```

```tsx
import { Icon, IconSketchFilter, ICON_PATHS } from '@papa/design'
```

`IconSketchFilter` must be mounted once at the app root, or every glyph
silently renders unfiltered — which looks fine alone and wrong beside one that
is filtered.

## Editing

`src/tokens/tokens.json` is the source of truth; everything in `dist/` is
generated.

```bash
npm run build
npm test
```

Light values sit on bare `:root`; dark values are emitted **once**, under
`:root[data-theme='dark']` — never also duplicated into a
`prefers-color-scheme` media query, because two copies drift. The attribute
(rather than the media query alone) is what lets someone choose dark at noon.

A token with the same value in both themes is a plain string, not
`{light, dark}` — the dark block then correctly omits it.

## Parity

`test/` parses the real `papa-rentals` stylesheet and icon file and asserts
every shared value matches — in both themes, in both directions, comparing
glyph **bodies** and not just names.

The claim "both apps use the same values" is worthless unless something checks
it. When it fails, work out which happened:

1. **Papa Rentals changed something** → port it here.
2. **This package changed** → port it into Papa Rentals, **or** accept the
   divergence deliberately by adding it to `KNOWN_DIVERGENCES` with a reason.

Tests skip rather than fail when the sibling checkout is absent, so this
package still tests standalone.

## Versioning

Semver, tagged. A breaking token change is a **major**, so both apps upgrade
deliberately rather than waking up restyled.

## Status

Papa Rentals does **not** consume this package yet — it still has its values
inline. It is a deployed app mid-backlog with a relative-base build, so wiring
it up is its own task. The parity tests keep the two honest in the meantime;
treat a failure as a real signal, not noise.

## Why `dist/` is committed

This package is consumed as a **git dependency**, and npm runs no build step
when installing from git. If `dist/` were ignored, every consumer would resolve
`@papa/design/tokens.css` to a file that does not exist — which is exactly what
happened the first time the app tried to build.

So the generated CSS and TS are committed. The tradeoff is a generated artifact
in version control; the test suite asserts `dist/` matches `tokens.json`, so a
stale commit fails CI rather than shipping a silent mismatch.
