const coinBtns = document.querySelectorAll('.coin-btn');

for (let i = 0; i < coinBtns.length; i++) {
    const btn = coinBtns[i];
    btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const IDs = e.target.id.split('ID');
        const commentId = IDs[1];
        const userId = IDs[2];
        const sessionId = IDs[3];
        if(userId !== sessionId && userId !== undefined){
            const res = await fetch(`/comments/coins/${commentId}`,{
                method: 'PATCH',
                body: JSON.stringify({}),
                headers: { 'Content-Type': 'application/json' }
            });

            // await the response
            const returnData = await res.json()
            // if we get a Success response, the original post element should be updated
            if (returnData.message === "Success") {
                const coin = document.getElementById(`cntID${commentId}ID${userId}ID${sessionId}`);
                coin.innerText = returnData.sum;
            }
        }
        else{
            console.log("shame on you. Don't give self coins");
        }
    })
}