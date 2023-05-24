# exakt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

a simple nuxt ui library focused on doing as much as possible with css

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- 💇‍♀️ &nbsp; mostly uses css to do things
- 👜 &nbsp; relatively lightweight
- 👁️‍🗨️ &nbsp; customizable

## Quick Setup

1. Add `@exakt/ui` dependency to your project

```bash
# Using pnpm
pnpm add -D @exakt/ui

# Using yarn
yarn add --dev @exakt/ui

# Using npm
npm install --save-dev @exakt/ui
```

2. Add `@exakt/ui` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    '@exakt/ui'
  ]
})
```

That's it! You can now use exakt in your Nuxt app ✨

## Development

### Important note

Because mkdist (and subsequently nuxt-module-builder) don't yet support *not* compiling SASS files, you'll need to use ``yarn link`` to substitute mkdist with the force-scss-off branch of https://github.com/wd-4000/mkdist

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
