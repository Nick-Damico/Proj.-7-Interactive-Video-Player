import Control from './control'

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
    this._control = new Control({
      videoControlsId,
      progressBarId,
      playButtonId,
      volumeButtonId,
      fullScreenButtonId
    })
    this._videoContainer = document.getElementById(videoContainerId)
    this._videoPlayer = document.getElementById(videoPlayerId)

    this._init()
  }

  _init() {
    this._attachPlayEvent()
    this._videoContainer.addEventListener('mouseenter', this._control.show)
    this._videoContainer.addEventListener('mouseleave', this._control.hide)
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
