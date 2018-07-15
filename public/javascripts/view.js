function main () {
  const player = videojs('gigx-video');

  player.ready(() => {
    player.play();
  });
}

window.onload = main;
