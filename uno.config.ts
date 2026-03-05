import {
  defineConfig,
  presetAttributify,
  presetMini,
  presetIcons
} from 'unocss'
import { presetRemToPx } from '@unocss/preset-rem-to-px'
export default defineConfig({
  content: {
    pipeline: {
      include: [
        /\.(vue|sevelet|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        'src/**/*.{js,ts}'
      ]
    }
  },
  rules: [[/^bc-(.+)$/, ([, color]) => ({ 'border-color': `#${color}}` })]],
  shortcuts: [
    ['ellipsis', 'overflow-hidden whitespace-nowrap text-ellipsis'],
    ['hoverIcon', 'hover:text-[--devui-primary] transition-all cursor-pointer'],
    ['link', 'text-[--devui-primary] cursor-pointer']
  ],
  theme: {
    colors: {
      primary: 'var(--primary-color)',
      dark_bg: 'var(--dark-bg)'
    }
  },
  presets: [
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    }),
    presetAttributify(),
    presetMini(),
    presetRemToPx({ baseFontSize: 4 })
  ]
})
