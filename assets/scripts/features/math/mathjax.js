import './mathjax-config'
import 'mathjax/tex-mml-chtml.js'

if (typeof window !== 'undefined' && window.MathJax) {
  const triggerTypeset = () => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise().catch((err) => {
        console.warn('MathJax typesetting error:', err)
      })
    }
  }

  if (window.MathJax.startup && window.MathJax.startup.promise) {
    window.MathJax.startup.promise.then(triggerTypeset).catch((err) => {
      console.warn('MathJax startup error:', err)
    })
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', triggerTypeset)
  } else {
    triggerTypeset()
  }
}
