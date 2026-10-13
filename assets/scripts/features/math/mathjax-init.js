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

const cleanUserOptions = { ...(userOptions.options || {}) }
if (cleanUserOptions.enablespeech !== undefined) {
  if (cleanUserOptions.enableSpeech === undefined) {
    cleanUserOptions.enableSpeech = cleanUserOptions.enablespeech
  }
  delete cleanUserOptions.enablespeech
}
if (cleanUserOptions.enablebraille !== undefined) {
  if (cleanUserOptions.enableBraille === undefined) {
    cleanUserOptions.enableBraille = cleanUserOptions.enablebraille
  }
  delete cleanUserOptions.enablebraille
}
if (cleanUserOptions.enableenrichment !== undefined) {
  if (cleanUserOptions.enableEnrichment === undefined) {
    cleanUserOptions.enableEnrichment = cleanUserOptions.enableenrichment
  }
  delete cleanUserOptions.enableenrichment
}
if (cleanUserOptions.enablecomplexity !== undefined) {
  if (cleanUserOptions.enableComplexity === undefined) {
    cleanUserOptions.enableComplexity = cleanUserOptions.enablecomplexity
  }
  delete cleanUserOptions.enablecomplexity
}
if (cleanUserOptions.enableexplorer !== undefined) {
  if (cleanUserOptions.enableExplorer === undefined) {
    cleanUserOptions.enableExplorer = cleanUserOptions.enableexplorer
  }
  delete cleanUserOptions.enableexplorer
}
if (cleanUserOptions.menuoptions) {
  if (!cleanUserOptions.menuOptions) {
    cleanUserOptions.menuOptions = cleanUserOptions.menuoptions
  }
  delete cleanUserOptions.menuoptions
}
if (cleanUserOptions.skiphtmltags) {
  if (!cleanUserOptions.skipHtmlTags) {
    cleanUserOptions.skipHtmlTags = cleanUserOptions.skiphtmltags
  }
  delete cleanUserOptions.skiphtmltags
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

const defaultChtml = {
  fontURL: '/fonts/mathjax',
  dynamicPrefix: '/fonts/mathjax/dynamic'
}

const defaultLoader = {
  paths: {
    mathjax: '/',
    'mathjax-newcm': '/fonts/mathjax'
  }
}

const defaultStartup = {
  typeset: true
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
    ...cleanUserOptions
  },
  chtml: {
    ...defaultChtml,
    ...(existingMathJax.chtml || {}),
    ...cleanUserChtml
  },
  loader: {
    ...defaultLoader,
    ...(existingMathJax.loader || {}),
    ...(userOptions.loader || {}),
    paths: {
      ...defaultLoader.paths,
      ...(existingMathJax.loader?.paths || {}),
      ...(userOptions.loader?.paths || {})
    }
  },
  startup: {
    ...defaultStartup,
    ...(existingMathJax.startup || {}),
    ...(userOptions.startup || {})
  }
}
