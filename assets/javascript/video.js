export default class Video {
  constructor({
    videoPlayerId,
    videoContainerId,
    videoControlsId,
    progressBarId,
    playButtonId,
    volumeButtonId,
    fullScreenButtonId
  }) {
    this._videoContainer = document.getElementById(videoContainerId)
    this._videoPlayer = document.getElementById(videoPlayerId)
    this._videoControls = document.getElementById(videoControlsId)
    this._progressBar = document.getElementById(progressBarId)
    this._playButton = document.getElementById(playButtonId)
    this._volumeButton = document.getElementById(volumeButtonId)
    this._fullScreenButton = document.getElementById(fullScreenButtonId)

    this._init()
  }

  _init() {
    this._attachControlsEvent()
    this._attachPlayEvent()
  }

  _attachControlsEvent() {
    if (this._videoContainer) {
      this._videoContainer.addEventListener('mouseenter', this._showControls)
      this._videoContainer.addEventListener('mouseleave', this._hideControls)
    }
  }

  _hideControls = () => {
    if (this._videoControls) {
      this._videoControls.classList.remove('fade-in')
      this._videoControls.classList.add('fade-out')
    }
  }

  _showControls = () => {
    this._videoControls.classList.remove('fade-out')
    this._videoControls.classList.add('fade-in')
  }

  _attachPlayEvent() {
    if (this._playButton) {
      this._playButton.addEventListener('click', this._play)
    }
  }

  _play() {
    this._videoPlayer.play()
  }
}
