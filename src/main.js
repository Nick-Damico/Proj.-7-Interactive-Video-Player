// Breaks existing scss
// import './style.css'
import Video from './video.js'

console.log('main loaded')

new Video({
  videoPlayerId: 'videoPlayer',
  videoContainerId: 'videoContainer',
  videoControlsId: 'videoControls',
  progressBarId: 'progressBar',
  videoTimeId: 'videoTime',
  playButtonId: 'playBtn',
  pauseButtonId: 'pauseBtn',
  closedCaptionsId: 'closedCaptionsBtn',
  volumeButtonId: 'volumeBtn',
  fullScreenButtonId: 'fullScreenBtn',
  transcriptContainerId: 'transcript'
})
