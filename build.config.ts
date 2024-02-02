// build.config.ts (in root of your module project)
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  hooks: {
    'mkdist:entry:options' (_ctx, _entry, opts) {
      opts.loaders = ['js', 'vue'] // Default: ['js', 'vue', 'sass', 'postcss']
    }
  }
})