const storyCoinBtn = document.querySelector('.storyCoinImg')

storyCoinBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
        const storyId = e.target.id.split('storyCoin-')[1];
        const res = await fetch(`/stories/coins/${storyId}`,{
            method: 'PATCH',
            body: JSON.stringify({}),
            headers: { 'Content-Type': 'application/json' }
        });
        const returnData = await res.json()
        const resTwo = await fetch(`/stories/coins/${storyId}`);
        const returnDataTwo = await resTwo.json()

        // if we get a Success response, the original post element should be updated
        if (returnData.message === "Success") {
            const coinText = document.getElementById(`storyCoinText`);
            coinText.innerHTML = returnDataTwo.coins;
            const coinTextTwo = document.getElementById(`userStoryCoinText`);
            coinTextTwo.innerHTML = returnData.coin.count;
            
    }
})
