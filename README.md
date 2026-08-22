# exakt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

an opinionated nuxt ui library focused on a clean look 

- [Release Notes](/CHANGELOG.md)

> [!WARNING]  
> This library is very experimental, use it at your own peril

## Quick Setup

1. Add `@exakt/ui` as a dependency to your project. Something like:

```bash
yarn add --dev @exakt/ui
```

2. Add `@exakt/ui` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    '@exakt/ui'
  ]
})
```

3. Configure
```js
export default defineNuxtConfig({
  exakt: { colors: { light: { primary: "#ff7d00" }, dark: { primary: "#ff7d00" } }},
})
```
## Icons

exakt uses [Material Symbols](https://fonts.google.com/icons).
When you build, it scans your project's source and only includes 
the icons that are actually used, otherwise it's like 3.7MB (not what we wanna see)

```js
export default defineNuxtConfig({
  modules: ['@exakt/ui'],
  exakt: {
    icons: {
      style: 'outlined',   // 'outlined' | 'rounded' | 'sharp' | 'all'
      subset: true,        // subset on prod build
      subsetInDev: false,  // also subset for the dev build
      scan: true,          // scan sources for icon names
      include: [],         // names the scan cannot see
    },
  },
})
```

It scans dumbly for any quoted icon name, so there might be false positives.


### The usual

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@exakt/ui/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@exakt/ui

[npm-downloads-src]: https://img.shields.io/npm/dm/@exakt/ui.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@exakt/ui

[license-src]: https://img.shields.io/npm/l/@exakt/ui.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@exakt/ui

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
