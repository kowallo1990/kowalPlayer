class KowalPlayer {
  constructor(songlist, songsPath, selector) {
    this.songlist = songlist;
    this.songsPath = songsPath;
    this.selector = selector;
    this.currentSong = 0;
    this.nextcurrentSong = 1;
    this.myPlayer = new Audio;
    this.getDomElements();
    this.makeNewAudio();
    this.addListeners();
  }
  getDomElements() {
    this.wrapper = document.querySelector(this.selector);
    this.songTitle = this.wrapper.querySelector('.song-title');
    this.songSlider = this.wrapper.querySelector('.song-slider');
    this.currentTime = this.wrapper.querySelector('.current-time');
    this.duration = this.wrapper.querySelector('.duration');
    this.volumeSlider = this.wrapper.querySelector('.volume-slider');
    this.nextSongTitle = this.wrapper.querySelector('.next-song');
    this.playOrPauseButton = this.wrapper.querySelector('.play-pause-button-KowalPlayer');
    this.nextSong = this.wrapper.querySelector('.next-song-KowalPlayer');
    this.prevSong = this.wrapper.querySelector('.prev-song-KowalPlayer');
  }
  addListeners() {
    this.myPlayer.addEventListener('timeupdate', this.timeOfSong.bind(this));
    this.myPlayer.addEventListener('play', this.addPauseIcon.bind(this));
    this.myPlayer.addEventListener('pause', this.addPlayIcon.bind(this));
    this.playOrPauseButton.addEventListener('click', this.playOrPauseSong.bind(this));
    this.nextSong.addEventListener('click', this.next.bind(this));
    this.prevSong.addEventListener('click', this.previous.bind(this));
    this.songSlider.addEventListener('change', this.seekSong.bind(this));
    this.volumeSlider.addEventListener('change', this.adjustVolume.bind(this));
  }
  makeNewAudio() {
    this.songSlider.value = 0;
    this.myPlayer.src = this.songsPath + this.songlist[this.currentSong];
    this.songTitle.textContent = (this.currentSong + 1) + "." +  this.songlist[this.currentSong];
    this.nextSongTitle.innerHTML = "<b>Next Song: </b>" + this.songlist[this.nextcurrentSong];
    this.myPlayer.volume = this.volumeSlider.value;
    this.myPlayer.playbackRate = 1;
    this.myPlayer.addEventListener('loadedmetadata', this.showDuration.bind(this));
  }
  timeOfSong() {
    this.songSlider.value = this.myPlayer.currentTime;
    this.currentTime.textContent = this.convertTime(Math.floor(this.myPlayer.currentTime));
    if (this.myPlayer.ended) {
      this.next();
        this.myPlayer.play();
      }
  }
  addPlayIcon() {
    this.playOrPauseButton.classList.remove('fa-pause');
    this.playOrPauseButton.classList.add('fa-play');
  }
  addPauseIcon() {
    this.playOrPauseButton.classList.add('fa-pause');
    this.playOrPauseButton.classList.remove('fa-play');
  }
  nextSongFunction() {
    if (this.currentSong === this.songlist.length - 1) {
      this.currentSong = 0;
    } else {
      this.currentSong = this.currentSong + 1;
    }

    if (this.nextcurrentSong === this.songlist.length-1) {
      this.nextcurrentSong = 0;
    } else {
      this.nextcurrentSong = this.nextcurrentSong + 1
    }

    this.makeNewAudio();
  }
  prevSongFunction() {
    if (this.currentSong === 0) {
      this.currentSong = this.songlist.length - 1;
    } else {
      this.currentSong = this.currentSong - 1;
    }

    if (this.nextcurrentSong === 0) {
      this.nextcurrentSong = this.songlist.length - 1;
    } else {
      this.nextcurrentSong = this.nextcurrentSong - 1
    }

    this.makeNewAudio();
  }
  next() {
    if (this.myPlayer.paused) {
      this.nextSongFunction();
    } else {
      var handleNextPauseEvent = function () {
        this.nextSongFunction();
        this.myPlayer.removeEventListener('pause', handleNextPauseEvent);
      }.bind(this);
      this.myPlayer.addEventListener('pause', handleNextPauseEvent);
      this.pausePlayer();
    }
  }
  previous() {
    if (this.myPlayer.paused) {
      this.prevSongFunction();
    } else {
      var handleNextPauseEvent = function () {
        this.prevSongFunction();
        this.myPlayer.removeEventListener('pause', handleNextPauseEvent);
      }.bind(this);
      this.myPlayer.addEventListener('pause', handleNextPauseEvent);
      this.pausePlayer();
    }
  }
  pausePlayer() {
    this.myPlayer.pause();
  }
  showDuration() {
    var d = Math.floor(this.myPlayer.duration);
    this.songSlider.setAttribute("max", d);
    this.duration.textContent = this.convertTime(d);
  }
  convertTime(secs) {
    var min = Math.floor(secs/60);
    var sec = secs % 60;
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    return (min + ':' + sec);
  }
  playOrPauseSong() {
    this.myPlayer.playbackRate = 1;
    if (this.myPlayer.paused) {
      this.myPlayer.play();
    } else {
      this.pausePlayer();
    }
  }
  seekSong() {
    this.myPlayer.currentTime = this.songSlider.value;
    this.currentTime.textContent = this.convertTime(this.myPlayer.currentTime);
  }
  adjustVolume() {
    this.myPlayer.volume = this.volumeSlider.value;
  }
}
