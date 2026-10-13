import * as params from '@params'

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
  enableEnrichment: false,
  enableComplexity: false,
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
  startup: {
    typeset: true,
    ...(existingMathJax.startup || {}),
    ...(userOptions.startup || {})
  }
}
