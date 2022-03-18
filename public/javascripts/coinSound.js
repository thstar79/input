window.addEventListener("DOMContentLoaded", event => {
    let audio = new Audio("../assets/smb_coin.wav");

    const coin = document.getElementById('storyCoinSpinImage')
    coin.addEventListener('click',  () =>  {
        audio.volume = 0.1;
        audio.play();
    })

    // for(let i=0;i<coins.length;++i){
    //     coins[i].addEventListener('click',  () =>  {
    //         audio.volume = 0.1;
    //         audio.play();
    //     })
    // }
})

