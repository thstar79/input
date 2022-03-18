window.addEventListener("DOMContentLoaded", event => {
    let audio = new Audio("../assets/smb_stage_clear.wav");

    document.getElementById('testButton').addEventListener('click', () =>  {
        audio.volume = 0.1;
        audio.play();
    })

})


$('#homelink').click(function() {
    $('#homelink').toggle('1000');
    $("i", this).toggleClass("fa fa-home fa fa-superpowers");
});
