const storyCoinBtn = document.getElementsByClassName('storyCoinSpinImage')[0];

storyCoinBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // storyCoinBtn.classList.remove('animated');
    // void storyCoinBtn.offsetWidth;
    // storyCoinBtn.classList.add('animated');
    e.target.classList.remove('animated');
    void e.target.offsetWidth;
    e.target.classList.add('animated');
    //storyCoinBtn.style.animation = "bounce 1s backwards"

    const IDs = e.target.id.split('ID');
    const storyId = parseInt(IDs[1]);
    const sessionId = parseInt(IDs[2]);
    if(sessionId !== 0){
        let method = "PATCH";
        const res = await fetch(`/stories/coins/${storyId}`, {
            method: method,
            body: JSON.stringify({}),
            headers: { 'Content-Type': 'application/json' }
        });
        const returnData = await res.json();
        if(returnData.message === "failed") window.alert("Only logged in user can give coins wanna log in or sign up?");
        const resTotalStoryCoins = await fetch(`/stories/coins/${storyId}`);
        const dataTotalCount = await resTotalStoryCoins.json();
        //console.log(method, dataTotalCount.message, dataTotalCount.count);
        const coinText = document.getElementById(`storyCoinText`);
        coinText.innerHTML = dataTotalCount.count;
        const coinTextTwo = document.getElementById(`userStoryCoinText`);
        coinTextTwo.innerHTML = returnData.count;
    }
    else{
        window.alert("Only logged in user can give coins wanna log in or sign up?");
    }
});
