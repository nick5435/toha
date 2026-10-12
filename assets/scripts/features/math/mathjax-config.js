import * as params from '@params'

const userOptions = params.math?.mathjax || {}

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
  fontURL:
    'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2'
}

const existingMathJax = window.MathJax || {}

window.MathJax = {
  ...existingMathJax,
  ...userOptions,
  tex: {
    ...defaultTex,
    ...(existingMathJax.tex || {}),
    ...(userOptions.tex || {})
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
  }
}
