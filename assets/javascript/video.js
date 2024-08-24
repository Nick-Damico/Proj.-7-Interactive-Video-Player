import Interface from './interface'

export default class Video {
  constructor({
    videoPlayerId,
    videoContainerId,
    videoControlsId,
    progressBarId,
    playButtonId,
    pauseButtonId,
    volumeButtonId,
    fullScreenButtonId
  }) {
    this._videoContainer = document.getElementById(videoContainerId)
    this._videoPlayer = document.getElementById(videoPlayerId)

    this._interface = new Interface({
      video: this,
      videoControlsId,
      progressBarId,
      playButtonId,
      pauseButtonId,
      volumeButtonId,
      fullScreenButtonId
    })

    this._init()
  }

  _init() {
    this._attachPlayEvent()
    this._videoContainer.addEventListener('mouseenter', this._interface.show)
    this._videoContainer.addEventListener('mouseleave', this._interface.hide)
  }

  play = () => {
    this._videoPlayer.play()
  }

  pause = () => {
    this._videoPlayer.pause()
  }

  _attachPlayEvent() {
    if (this._playButton) {
      this._playButton.addEventListener('click', this._play)
    }
  }
}
