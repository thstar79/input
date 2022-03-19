const storyCoinBtn = document.getElementsByClassName('storyCoinSpinImage')[0];

storyCoinBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const storyId = e.target.id.split('storyCoin-')[1];
    const resUserStoryCoin = await fetch(`/stories/coins/user/${storyId}`);
    const dataUserStoryCoin = await resUserStoryCoin.json();
    let method = "PATCH";
    if (dataUserStoryCoin.count === 0)  method = "POST";
        
    const res = await fetch(`/stories/coins/${storyId}`, {
        method: method,
        body: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' }
    });

    const returnData = await res.json();
    if(returnData.message === "failed") window.alert("Only logged in user can give coins wanna log in or sign up?");

    const resTotalStoryCoins = await fetch(`/stories/coins/${storyId}`);
    const dataTotalCount = await resTotalStoryCoins.json();
    console.log()
    console.log(dataTotalCount);

    const coinText = document.getElementById(`storyCoinText`);
    coinText.innerHTML = dataTotalCount.count;
    const coinTextTwo = document.getElementById(`userStoryCoinText`);
    coinTextTwo.innerHTML = returnData.count;
});
