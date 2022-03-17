let audio = new Audio("../assets/smb_stage_clear.wav");

document.getElementById('testButton').onclick = function() {
  audio.play();
}