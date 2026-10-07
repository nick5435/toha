if (
  process.env.FEATURE_MATH_MATHJAX === '1' ||
  process.env.FEATURE_MATH_KATEX === '1' ||
  (!process.env.FEATURE_MATH_MATHJAX && !process.env.FEATURE_MATH_KATEX)
) {
  import('./mathjax')
}
