import WaveSurfer from 'wavesurfer.js';
import Regions from 'wavesurfer.js/dist/plugins/regions.esm.js'

const audios = document.querySelectorAll('.reviews-audio__slide');

if (audios.length) {
  audios.forEach((file, index) => {
    const fileUrl = file.querySelector('.reviews-audio__slide-file').dataset.audio;
    const container = file.querySelector('.reviews-audio__slide-file');
    const buttonPlay = file.querySelector('.reviews-audio__slide-play');
    const currrentTime = file.querySelector('.reviews-audio__slide-timer--current');
    const overTime = file.querySelector('.reviews-audio__slide-timer--length');

    container.setAttribute('id', `audio-${index}`);

    const wavesurfer = WaveSurfer.create({
      container: `#audio-${index}`,
      waveColor: '#474949',
      progressColor: '#F8F1DF',
      url: fileUrl,
      height: 24,
      cursorWidth: 0,
    })

    buttonPlay.addEventListener('click', () => {
      wavesurfer.play();
    });

    wavesurfer.on('ready', function () {
      currrentTime.innerText = secondsToTimestamp(wavesurfer.getCurrentTime());
      overTime.innerText = secondsToTimestamp(wavesurfer.getDuration());
    });

    wavesurfer.on('audioprocess', function () {
      currrentTime.innerText = secondsToTimestamp(wavesurfer.getCurrentTime());
    });
  });
}


function secondsToTimestamp(seconds) {
  seconds = Math.floor(seconds);
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds - (h * 3600)) / 60);
  var s = seconds - (h * 3600) - (m * 60);

  m = m < 10 ? m : m;
  s = s < 10 ? '0' + s : s;
  return m + ':' + s;
}