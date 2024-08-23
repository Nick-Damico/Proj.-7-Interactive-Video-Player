export default class Control {
  constructor({
    videoControlsId,
    progressBarId,
    playButtonId,
    volumeButtonId,
    fullScreenButtonId
  }) {
    this._videoControls = document.getElementById(videoControlsId)
    this._progressBar = document.getElementById(progressBarId)
    this._playButton = document.getElementById(playButtonId)
    this._volumeButton = document.getElementById(volumeButtonId)
    this._fullScreenButton = document.getElementById(fullScreenButtonId)

    this._init()
  }

  _init() {
    this._hideControls()
    this._attachControlsEvent()
  }

  show = () => {
    this._showControls()
  }

  hide = () => {
    this._hideControls()
  }

  _attachControlsEvent() {
    if (this._videoContainer) {
      this._videoContainer.addEventListener('mouseenter', this._showControls)
      this._videoContainer.addEventListener('mouseleave', this._hideControls)
    }
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
}
