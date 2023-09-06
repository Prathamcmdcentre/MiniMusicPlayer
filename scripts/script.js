new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Middle Of The Night",
          artist: "Elley Duhé",
          cover: "../img/1.jpg",
          source: "../mp3/1.mp3",
          url: "https://www.youtube.com/watch?v=oSHzUD-uqKY&ab_channel=ElleyDuh%C3%A9",
          favorited: true
        },
        {
          name: "I Wrote A Song ",
          artist: "Mae Muller",
          cover: "../img/2.jpg",
          source: "../mp3/2.mp3",
          url: "https://www.youtube.com/watch?v=rRaVGKk4k6k&ab_channel=MaeMullerVEVO",
          favorited: false
        },

        {
          name: "Obsessed X Rubicon Drill - Mega Mashup",
          artist: "Riar Saab ft. Parmish Verma",
          cover: "../img/3.jpg",
          source: "../mp3/3.mp3",
          url: "https://www.youtube.com/watch?v=tOZtA8UAwCk&ab_channel=SRMusicOfficial",
          favorited: false
        },

        {
          name: "Weekend Bhangra Mashup 3! 2023",
          artist: "Diljit Dosanjh, Sidhu Moose Wala, Shubh & More! ",
          cover: "../img/4.jpg",
          source: "../mp3/4.mp3",
          url: "https://www.youtube.com/watch?v=3luKVMfaAS8&ab_channel=NickDhillon",
          favorited: false
        },
        {
          name: "Welcome To My Hood",
          artist: "Diljit Dosanjh",
          cover: "../img/5.jpg",
          source: "../mp3/5.mp3",
          url: "https://www.youtube.com/watch?v=1ExdPa00uz4&ab_channel=DiljitDosanjh",
          favorited: false
        },
        {
          name: "4x4",
          artist: "Nirvair Pannu",
          cover: "../img/6.jpg",
          source: "../mp3/6.mp3",
          url: "https://www.youtube.com/watch?v=iyOSG9431kg&ab_channel=JukeDocks",
          favorited: false
        },
        {
          name: "SUPERMAN",
          artist: "Yo Yo Honey Singh",
          cover: "../img/7.jpg",
          source: "../mp3/7.mp3",
          url: "https://www.youtube.com/watch?v=zxlR20V4NFQ&ab_channel=T-Series",
          favorited: false
        },
        {
          name: "Sports Gaddiyan : Legendary Mashup",
          artist: "Yo Yo Honey Singh | Sidhu Moosewala | Imran Khan | Sukh-E  | AP Dhillon",
          cover: "../img/8.jpg",
          source: "../mp3/8.mp3",
          url: "hhttps://www.youtube.com/watch?v=nYCVjBejVD0&ab_channel=SunnyHassan",
          favorited: false
        },
        {
          name: "Mi Amor - True Feeling Mashup 2023",
          artist: "SHARN | Sonam Bajwa | Imran Khan | Ap Dhillon ",
          cover: "../img/9.jpg",
          source: "../mp3/9.mp3",
          url: "https://www.youtube.com/watch?v=kE7fjrbmJ0s&ab_channel=SunnyHassan",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
