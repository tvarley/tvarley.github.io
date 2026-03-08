import { defineEcConfig, ExpressiveCodeTheme } from 'astro-expressive-code';

// Custom dark theme matching our site's color scheme
const customDarkTheme = ExpressiveCodeTheme.fromJSONString(JSON.stringify({
  name: 'tvarley-dark',
  type: 'dark',
  colors: {
    'editor.background': '#1a1a1a', // charcoal
    'editor.foreground': '#e0e0e0', // light text
    'editor.lineHighlightBackground': '#2a2a2a',
    'editorLineNumber.foreground': '#888888', // steel-grey
    'editorLineNumber.activeForeground': '#cccccc'
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#888888' } // steel-grey
    },
    {
      scope: 'punctuation',
      settings: { foreground: '#c0c0c0' } // silver
    },
    {
      scope: ['keyword', 'storage', 'storage.type'],
      settings: { foreground: '#c084fc' } // purple-400
    },
    {
      scope: ['entity.name.function', 'meta.function', 'support.function'],
      settings: { foreground: '#fbbf24' } // yellow-400
    },
    {
      scope: ['entity.name.type', 'entity.name.class', 'support.class'],
      settings: { foreground: '#fbbf24' } // yellow-400
    },
    {
      scope: ['constant', 'variable.language', 'support.constant'],
      settings: { foreground: '#f87171' } // red-400
    },
    {
      scope: ['string', 'constant.character'],
      settings: { foreground: '#4ade80' } // green-400
    },
    {
      scope: ['constant.numeric', 'constant.language'],
      settings: { foreground: '#fb923c' } // orange-400
    },
    {
      scope: ['variable', 'entity.name.variable'],
      settings: { foreground: '#60a5fa' } // steel-blue
    },
    {
      scope: ['keyword.operator', 'punctuation.accessor'],
      settings: { foreground: '#60a5fa' } // steel-blue
    }
  ]
}));

export default defineEcConfig({
  themes: [customDarkTheme],
  plugins: [],
  styleOverrides: {
    // Custom styling to match our site's design
    frames: {
      frameBox: {
        backgroundColor: 'var(--ec-frame-bg)',
        borderRadius: '1rem',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      },
      titleBar: {
        backgroundColor: 'rgba(26, 26, 26, 0.8)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        borderTopLeftRadius: '1rem',
        borderTopRightRadius: '1rem'
      },
      editorBackground: '#1a1a1a', // charcoal
      editorForeground: '#e0e0e0'
    },
    textMarkers: {
      // Keep default text marker styles
    },
    ui: {
      // Copy button and other UI elements
      borderRadius: '0.5rem'
    }
  },
  defaultProps: {
    showLineNumbers: true,
    showCopyButton: true
  }
});