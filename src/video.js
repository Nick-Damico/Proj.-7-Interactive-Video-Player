import Interface from './interface'

class Range {
  constructor(min, max) {
    this._min = parseFloat(min)
    this._max = parseFloat(max)
  }

  includes(value) {
    return value >= this._min && value <= this._max
  }
}

export default class Video {
  constructor({
    videoPlayerId,
    videoContainerId,
    videoControlsId,
    progressBarId,
    videoTimeId,
    playButtonId,
    pauseButtonId,
    closedCaptionsId,
    volumeButtonId,
    fullScreenButtonId,
    transcriptContainerId
  }) {
    this._videoContainer = document.getElementById(videoContainerId)
    this._videoPlayer = document.getElementById(videoPlayerId)
    this._transcript = document.getElementById(transcriptContainerId)

    this._interface = new Interface({
      video: this,
      videoControlsId,
      progressBarId,
      videoTimeId,
      playButtonId,
      pauseButtonId,
      closedCaptionsId,
      volumeButtonId,
      fullScreenButtonId
    })

    this._init()
  }

  play = () => {
    this._videoPlayer.play()
  }

  pause = () => {
    this._videoPlayer.pause()
  }

  mute = () => {
    this._videoPlayer.muted = !this._videoPlayer.muted
  }

  toggleFullScreen = () => {
    this._videoPlayer.requestFullscreen()
  }

  duration() {
    return this._videoPlayer.duration || 0
  }

  getTime() {
    return this._videoPlayer.currentTime
  }

  runtimePercentage() {
    return Math.floor((this.getTime() / this.duration()) * 100) || 0
  }

  toggleCaptions() {
    let captionTrack = this._captionTrack()
    if (captionTrack) {
      captionTrack.mode = captionTrack.mode == 'showing' ? 'hidden' : 'showing'
    }
  }

  _init() {
    console.log('hello')
    this._attachPlayEvent()
    this._videoContainer.addEventListener('mouseenter', this._interface.show)
    this._videoContainer.addEventListener('mouseleave', this._interface.hide)
    this._attachTimeUpdate()
    this._transcript.addEventListener('click', (e) => this._updatePlayback(e))
  }

  _attachPlayEvent() {
    if (this._playButton) {
      this._playButton.addEventListener('click', this._play)
    }
  }

  _attachTimeUpdate() {
    this._videoPlayer.addEventListener('timeupdate', () => {
      this._highlightTranscript()
    })
  }

  _captionTrack() {
    return [...this._videoPlayer.textTracks].find(
      (track) => track.kind == 'captions'
    )
  }

  _highlightTranscript() {
    this._getTranscriptSpans().forEach((spanEl) => {
      let timeRange = new Range(
        spanEl.dataset.startTime,
        spanEl.dataset.endTime
      )

      if (timeRange.includes(this.getTime())) {
        this._addHighlightClass(spanEl)
      } else {
        this._removeHighlightClass(spanEl)
      }
    })
  }

  _addHighlightClass(el) {
    el.classList.add('highlight')
  }

  _removeHighlightClass(el) {
    el.classList.remove('highlight')
  }

  _getTranscriptSpans() {
    return [...document.getElementsByClassName('transcript-text')]
  }

  _updatePlayback(e) {
    let target = e.target

    if (target) {
      this._videoPlayer.currentTime = parseFloat(target.dataset.startTime)
    }
  }
}
