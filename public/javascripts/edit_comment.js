const editBtns = document.querySelectorAll('.comment-edit-btn')

for (let i = 0; i < editBtns.length; i++) {
    const btn = editBtns[i];
    btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const IDs = e.target.id.split('ID');
        const commentId = IDs[1];
        const userId = IDs[2];
        const sessionId = IDs[3];
        if((userId === sessionId) && userId !== undefined){
            const form = document.getElementById(`edit-form-${commentId}`)
            if (form.classList.contains('hidden')) {
                form.classList.remove('hidden')
            } else {
                form.classList.add('hidden')
            }

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
                    postEle.innerHTML = returnData.comment.comment.split('!@#')[2];
                    // reapply hidden class to form
                    form.classList.add('hidden')
                }
            })
        }
        else{
            console.log("auth failed");
        }
    })
}