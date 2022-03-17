window.addEventListener("DOMContentLoaded", event => {
    let audio = new Audio("../assets/smb_stage_clear.wav");
    console.log(document.getElementById('testButton'))
    document.getElementById('testButton').addEventListener('click', async () =>  {
        audio.volume = 0.1;
        audio.play();
    })
})

