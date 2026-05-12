import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';

// ─── VIBRANT COLOR THEME ────────────────────────────────────────────────────
// Primary purple sidebar + top bar
// Category-coded card icon backgrounds
// ────────────────────────────────────────────────────────────────────────────

export default defineConfig({
  shortcuts: [
    // Sidebar nav item — default
    [
      'nav-item',
      'flex items-center gap-2 px-3 py-2 rounded-lg mx-2 my-0.5 text-sm text-white/60 cursor-pointer transition-all duration-150 hover:(bg-white/8 text-white/90)',
    ],
    // Sidebar nav item — active
    [
      'nav-item-active',
      'flex items-center gap-2 px-3 py-2 rounded-lg mx-2 my-0.5 text-sm bg-white/14 text-white font-medium cursor-pointer',
    ],
    // Section label inside sidebar
    [
      'nav-section',
      'px-3 pt-4 pb-1 text-[10px] font-medium tracking-widest uppercase text-white/35',
    ],
    // Colored icon box on tool cards
    [
      'tool-icon',
      'w-9 h-9 rounded-lg flex items-center justify-center text-lg mb-2 flex-shrink-0',
    ],
    // Tool card itself
    [
      'tool-card',
      'bg-white dark:bg-dark-100 border border-solid border-gray-100 dark:border-dark-50 rounded-xl p-3 cursor-pointer transition-all duration-150 hover:(border-purple-300 shadow-sm shadow-purple-100)',
    ],
    // Top bar button
    [
      'topbar-btn',
      'h-8 px-3 rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer border-none transition-all duration-150',
    ],
    // Badge
    [
      'badge',
      'inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mt-1',
    ],
  ],

  theme: {
    colors: {
      // ── Primary brand purple ──
      purple: {
        50:  '#EEEDFE',
        100: '#CECBF6',
        200: '#AFA9EC',
        300: '#9080E6',
        400: '#7F77DD',
        500: '#6c3fc7',  // ← main brand colour (sidebar, topbar)
        600: '#534AB7',
        700: '#3e3096',
        800: '#3C3489',
        900: '#1e1147',  // ← dark sidebar background
        DEFAULT: '#6c3fc7',
      },
      // ── Category colours ──
      teal: {
        50:  '#E1F5EE',
        100: '#9FE1CB',
        200: '#5DCAA5',
        500: '#1D9E75',
        600: '#0F6E56',
        DEFAULT: '#1D9E75',
      },
      amber: {
        50:  '#FAEEDA',
        100: '#FAC775',
        200: '#EF9F27',
        500: '#BA7517',
        600: '#854F0B',
        DEFAULT: '#f59e0b',
      },
      coral: {
        50:  '#FAECE7',
        100: '#F5C4B3',
        200: '#F0997B',
        500: '#D85A30',
        600: '#993C1D',
        DEFAULT: '#D85A30',
      },
      blue: {
        50:  '#E6F1FB',
        100: '#B5D4F4',
        200: '#85B7EB',
        500: '#378ADD',
        600: '#185FA5',
        DEFAULT: '#378ADD',
      },
      pink: {
        50:  '#FBEAF0',
        100: '#F4C0D1',
        200: '#ED93B1',
        500: '#D4537E',
        600: '#993556',
        DEFAULT: '#D4537E',
      },
      green: {
        50:  '#EAF3DE',
        100: '#C0DD97',
        200: '#97C459',
        500: '#639922',
        600: '#3B6D11',
        DEFAULT: '#639922',
      },
    },
  },

  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],

  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
});
