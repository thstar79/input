const coinBtns = document.querySelectorAll('.coin-btn')

for (let i = 0; i < coinBtns.length; i++) {
    const btn = coinBtns[i];
    btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const commentId = e.target.id.split('coin-')[1];

        const submitBtn = document.getElementById(`edit-btn-${commentId}`)
        submitBtn.addEventListener('click', async(subEvent) => {
            subEvent.preventDefault();
            console.log('submit', commentId);

            // query the dom for the input field's value
            const commentData = document.getElementById(`comment-field-${commentId}`).value

            // send a PATCH fetch request with the content in the body
            const res = await fetch(`/comments/${commentId}`, {
                method: 'PATCH',
                body: JSON.stringify({comment: commentData}),
                headers: { 'Content-Type': 'application/json' }
            })
            // await the response
            const returnData = await res.json()
            // if we get a Success response, the original post element should be updated
            if (returnData.message === "Success") {
                const postEle = document.getElementById(`comment-content-${commentId}`);
                postEle.innerHTML = returnData.comment.comment;
                // reapply hidden class to form
                form.classList.add('hidden')
            }
        })
    })
}