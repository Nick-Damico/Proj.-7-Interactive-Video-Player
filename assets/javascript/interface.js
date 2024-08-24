export default class Interface {
  constructor({
    video,
    videoControlsId,
    progressBarId,
    playButtonId,
    pauseButtonId,
    volumeButtonId,
    fullScreenButtonId
  }) {
    this._video = video
    this._videoControls = document.getElementById(videoControlsId)
    this._progressBar = document.getElementById(progressBarId)
    this._playButton = document.getElementById(playButtonId)
    this._pauseButton = document.getElementById(pauseButtonId)
    this._volumeButton = document.getElementById(volumeButtonId)
    this._fullScreenButton = document.getElementById(fullScreenButtonId)

    this._init()
  }

  show = () => {
    this._showControls()
  }

  hide = () => {
    this._hideControls()
  }

  _init() {
    this._videoControls.style.opacity = 0
    this._attachPlayListener()
    this._attachFullScreenListener()
    this._attachMuteListener()
  }

  _attachPlayListener = () => {
    this._playButton.addEventListener('click', this._play)
    this._pauseButton.addEventListener('click', this._pause)
  }

  _attachFullScreenListener = () => {
    this._fullScreenButton.addEventListener(
      'click',
      this._video.toggleFullScreen
    )
  }

  _attachMuteListener = () => {
    this._volumeButton.addEventListener('click', this._mute)
  }

  _play = () => {
    this._video.play()
    this._playButton.style.display = 'none'
    this._pauseButton.style.display = 'block'
  }

  _pause = () => {
    this._video.pause()
    this._pauseButton.style.display = 'none'
    this._playButton.style.display = 'block'
  }

  _hideControls = () => {
    if (!this._videoControls) return

    this._videoControls.classList.remove('fade-in')
    this._videoControls.classList.add('fade-out')
  }

  _showControls = () => {
    if (!this._videoControls) return

    this._videoControls.classList.remove('fade-out')
    this._videoControls.classList.add('fade-in')
  }

  _mute = () => {
    this._video.mute()
    this._volumeButton.classList.toggle('off') // toggles visibility of volume icon
  }
}
