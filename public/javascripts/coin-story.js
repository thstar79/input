const storyCoinBtn = document.getElementsByClassName('storyCoinSpinImage')[0]

storyCoinBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('clicked')
        const storyId = e.target.id.split('storyCoin-')[1];
        const resUserStoryCoin = await fetch(`/stories/coins/user/${storyId}`);
        const dataUserStoryCoin = await resUserStoryCoin.json()
        console.log(dataUserStoryCoin)
        if (dataUserStoryCoin.count === null) {
            const res = await fetch(`/stories/coins/${storyId}`, {
                method: 'POST',
                body: JSON.stringify({}),
                headers: { 'Content-Type': 'application/json' }
            });
            const returnData = await res.json();

            const resTotalStoryCoins = await fetch(`/stories/coins/${storyId}`);
            const dataTotalCount = resTotalStoryCoins.json();

            const coinText = document.getElementById(`storyCoinText`);
            coinText.innerHTML = dataTotalCount.count;
            const coinTextTwo = document.getElementById(`userStoryCoinText`);
            coinTextTwo.innerHTML = returnData.coin.count; 
            
        } else {
            const res = await fetch(`/stories/coins/${storyId}`, {
                method: 'PATCH',
                body: JSON.stringify({}),
                headers: { 'Content-Type': 'application/json' }
            });
            const returnData = await res.json()
            const resTotalStoryCoins = await fetch(`/stories/coins/${storyId}`);
            const dataTotalCount = await resTotalStoryCoins.json();

            const coinText = document.getElementById(`storyCoinText`);
            coinText.innerHTML = dataTotalCount.count;
            const coinTextTwo = document.getElementById(`userStoryCoinText`);
            coinTextTwo.innerHTML = returnData.coin.count; 
        }

    });
