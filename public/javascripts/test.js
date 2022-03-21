window.addEventListener("DOMContentLoaded", event => {
    // let audio = new Audio("../assets/smb_stage_clear.wav");

    // document.getElementById('testButton').addEventListener('click', () =>  {
    //     audio.volume = 0.1;
    //     audio.play();
    // })
    document.getElementById('registerLink').addEventListener('click', (e) => {
        e.preventDefault();
        
        document.location.href = `/users/register`;   
    })
})