if (
  process.env.FEATURE_MATH_MATHJAX === '1' ||
  !process.env.FEATURE_MATH_MATHJAX
) {
  import('./mathjax')
}
