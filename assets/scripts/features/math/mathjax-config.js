import * as params from '@params'

const userOptions = params.math?.mathjax || params.math?.katex || {}

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

// Convert KaTeX-style delimiters if provided
if (Array.isArray(userOptions.delimiters)) {
  const inline = []
  const display = []
  for (const item of userOptions.delimiters) {
    if (item && item.left && item.right) {
      if (item.display) {
        display.push([item.left, item.right])
      } else {
        inline.push([item.left, item.right])
      }
    }
  }
  if (inline.length > 0) defaultTex.inlineMath = inline
  if (display.length > 0) defaultTex.displayMath = display
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
