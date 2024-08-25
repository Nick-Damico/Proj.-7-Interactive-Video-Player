export default class Interface {
  constructor({
    video,
    videoControlsId,
    progressBarId,
    videoTimeId,
    playButtonId,
    pauseButtonId,
    volumeButtonId,
    fullScreenButtonId
  }) {
    this._video = video
    this._videoControls = document.getElementById(videoControlsId)
    this._progressBar = document.getElementById(progressBarId)
    this._videoTime = document.getElementById(videoTimeId)
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
    this._initProgressBar()
  }

  _attachPlayListener() {
    this._playButton.addEventListener('click', this._play)
    this._pauseButton.addEventListener('click', this._pause)
  }

  _attachFullScreenListener() {
    this._fullScreenButton.addEventListener(
      'click',
      this._video.toggleFullScreen
    )
  }

  _attachMuteListener() {
    this._volumeButton.addEventListener('click', this._mute)
  }

  _initProgressBar() {
    this._progressBar.value = 0
  }

  _play = () => {
    this._video.play()
    this._playButton.style.display = 'none'
    this._pauseButton.style.display = 'block'
    this._timeInterval = this._startUpdateTimeInterval()
  }

  _pause = () => {
    this._video.pause()
    this._pauseButton.style.display = 'none'
    this._playButton.style.display = 'block'
    clearInterval(this._timeInterval)
  }

  _startUpdateTimeInterval() {
    return setInterval(() => {
      this._videoTime.textContent = this._formatTimeForDisplay(
        this._video.getTime()
      )
    }, 500)
  }

  _formatTimeForDisplay(seconds) {
    let mins_in_hour = 60
    let seconds_in_hour = 3600

    let hours = this._formatTime(Math.floor(seconds / seconds_in_hour))
    let mins = this._formatTime(
      Math.floor((seconds % seconds_in_hour) / mins_in_hour)
    )
    let secs = this._formatTime(Math.floor(seconds % mins_in_hour))

    return `${hours}:${mins}:${secs}`
  }

  _formatTime(time) {
    return time.toString().padStart(2, 0)
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