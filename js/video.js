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

  }
  }
}
