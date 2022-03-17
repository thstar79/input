const coinBtns = document.querySelectorAll('.coin-btn');

for (let i = 0; i < coinBtns.length; i++) {
    const btn = coinBtns[i];
    btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const commentId = e.target.id.split('coin-')[1];
        const res = await fetch(`/comments/coins/${commentId}`,{
            method: 'PATCH',
            body: JSON.stringify({}),
            headers: { 'Content-Type': 'application/json' }
        });

        // await the response
        const returnData = await res.json()
        // if we get a Success response, the original post element should be updated
        if (returnData.message === "Success") {
            const coin = document.getElementById(`coin-count-${commentId}`);
            coin.innerText = returnData.coin.count;
        }
    })
}