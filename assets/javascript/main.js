// Breaks existing scss
// import './style.css'
import Video from './video.js'

console.log('main loaded')

new Video({
  videoPlayerId: 'videoPlayer',
  videoContainerId: 'videoContainer',
  videoControlsId: 'videoControls',
  progressBarId: 'progressBar',
  playButtonId: 'playBtn',
  pauseButtonId: 'pauseBtn',
  volumeButtonId: 'volumeBtn',
  fullScreenButtonId: 'fullScreenBtn'
})
