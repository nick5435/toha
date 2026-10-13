import './mathjax-init'
import 'mathjax/tex-mml-chtml.js'

if (typeof window !== 'undefined') {
  window.renderMathInElement = (element) => {
    if (window.MathJax?.startup?.promise && window.MathJax?.typesetPromise) {
      return window.MathJax.startup.promise.then(() => {
        return window.MathJax.typesetPromise(element ? [element] : undefined)
      }).catch((err) => {
        console.warn('MathJax typesetting error:', err)
      })
    }
    return Promise.resolve()
  }
}
