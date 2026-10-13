if (
  process.env.FEATURE_VIDEOPLAYER_VIDEOJS === '1' ||
  !process.env.FEATURE_VIDEOPLAYER_VIDEOJS
) {
  import('./videojs')
}
