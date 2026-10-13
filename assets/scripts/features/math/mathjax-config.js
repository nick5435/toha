import * as params from '@params'

if (typeof window !== 'undefined' && window.localStorage) {
  try {
    const menuSettings = window.localStorage.getItem('MathJax-Menu-Settings')
    if (menuSettings) {
      const parsed = JSON.parse(menuSettings)
      if (parsed.renderer && parsed.renderer !== 'CHTML') {
        parsed.renderer = 'CHTML'
        window.localStorage.setItem('MathJax-Menu-Settings', JSON.stringify(parsed))
      }
    }
  } catch (e) {
    // ignore localStorage errors
  }
}

const userOptions = params.math?.mathjax || {}

const cleanUserTex = { ...(userOptions.tex || {}) }
if (cleanUserTex.inlinemath) {
  if (!cleanUserTex.inlineMath) cleanUserTex.inlineMath = cleanUserTex.inlinemath
  delete cleanUserTex.inlinemath
}
if (cleanUserTex.displaymath) {
  if (!cleanUserTex.displayMath) cleanUserTex.displayMath = cleanUserTex.displaymath
  delete cleanUserTex.displaymath
}

const defaultTex = {
  inlineMath: [
    ['$', '$'],
    ['\\(' , '\\)']
  ],
  displayMath: [
    ['$$', '$$'],
    ['\\[', '\\\]']
  ],
  processEscapes: true,
  processEnvironments: true
}

const defaultOptions = {
  enableSpeech: false,
  enableEnrichment: false,
  enableComplexity: false,
  menuOptions: {
    settings: {
      renderer: 'CHTML'
    }
  },
  skipHtmlTags: [
    'script',
    'noscript',
    'style',
    'textarea',
    'pre',
    'code',
    'annotation',
    'annotation-xml'
  ]
}

const defaultChtml = {
  fontURL: '/fonts/mathjax'
}

const existingMathJax = window.MathJax || {}

window.MathJax = {
  ...existingMathJax,
  ...userOptions,
  tex: {
    ...defaultTex,
    ...(existingMathJax.tex || {}),
    ...cleanUserTex
  },
  options: {
    ...defaultOptions,
    ...(existingMathJax.options || {}),
    ...(userOptions.options || {})
  },
  chtml: {
    ...defaultChtml,
    ...(existingMathJax.chtml || {}),
    ...(userOptions.chtml || {})
  },
  loader: {
    paths: {
      mathjax: '/'
    },
    ...(existingMathJax.loader || {}),
    ...(userOptions.loader || {})
  },
  startup: {
    typeset: true,
    ...(existingMathJax.startup || {}),
    ...(userOptions.startup || {})
  }
}
