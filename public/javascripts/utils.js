const commentFn = async (e)=>{
    console.log("Here we are....");
    if (extraside.classList.contains('hidden')) {
        extraside.classList.remove('hidden');
    } else {
        extraside.classList.add('hidden');
    }

    const exit = document.getElementById('comment-top-top-exit-btn');
    exit.addEventListener('click', (e)=>{
        e.stopPropagation();
        if (!extraside.classList.contains('hidden')) {
            extraside.classList.add('hidden');
        }
    });
}

const editFn = async (e) => {
    console.log('edit button clicked');
    e.preventDefault();
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
}

const delFn = async(e) => {
    console.log('del button clicked');
    e.stopPropagation();
    console.log("delete btn clicked");
    const IDs = e.target.id.split('ID');
    const commentId = IDs[1];
    const userId = IDs[2];
    const sessionId = IDs[3];
    if((userId === sessionId) && userId !== undefined){

        const res = await fetch(`/comments/${commentId}`, {
            method: 'DELETE'
        })

        const data = await res.json()
        if (data.message === "Success") {
            const container = document.getElementById(`comment-box-${commentId}`);
            container.remove();
        } else {
            // append some element that just displays the error message
        }
    }
    else{
        console.log("auth failed");
    }
}

const starFn = async (e) => {
    console.log('coin button clicked');
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
        const returnData = await res.json();
        // if we get a Success response, the original post element should be updated
        if (returnData.message === "Success") {
            const coin = document.getElementById(`cntID${commentId}ID${userId}ID${sessionId}`);
            coin.innerText = returnData.sum;
        }
    }
    else{
        console.log("shame on you. Don't give self coins");
    }
}
export {commentFn, editFn,delFn,starFn};