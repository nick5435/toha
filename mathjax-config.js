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
if (cleanUserTex.processescapes !== undefined) {
  if (cleanUserTex.processEscapes === undefined) {
    cleanUserTex.processEscapes = cleanUserTex.processescapes
  }
  delete cleanUserTex.processescapes
}
if (cleanUserTex.processenvironments !== undefined) {
  if (cleanUserTex.processEnvironments === undefined) {
    cleanUserTex.processEnvironments = cleanUserTex.processenvironments
  }
  delete cleanUserTex.processenvironments
}

const defaultTex = {
  inlineMath: [
    ['$', '$'],
    ['\\(', '\\)']
  ],
  displayMath: [
    ['$$', '$$'],
    ['\\[', '\\]']
  ],
  processEscapes: true,
  processEnvironments: true
}

const defaultOptions = {
  enableSpeech: false,
  enableBraille: false,
  enableEnrichment: false,
  enableComplexity: false,
  enableExplorer: false,
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

const cleanUserChtml = { ...(userOptions.chtml || {}) }
if (cleanUserChtml.fonturl) {
  if (!cleanUserChtml.fontURL) cleanUserChtml.fontURL = cleanUserChtml.fonturl
  delete cleanUserChtml.fonturl
}
if (cleanUserChtml.dynamicprefix) {
  if (!cleanUserChtml.dynamicPrefix) cleanUserChtml.dynamicPrefix = cleanUserChtml.dynamicprefix
  delete cleanUserChtml.dynamicprefix
}

const defaultChtml = {
  fontURL: '/fonts/mathjax',
  dynamicPrefix: '/fonts/mathjax/dynamic'
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
    ...cleanUserChtml
  },
  loader: {
    paths: {
      mathjax: '/',
      'mathjax-newcm': '/fonts/mathjax'
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
