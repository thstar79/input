const deleteBtns = document.querySelectorAll('.comment-delete-btn');
for (let i = 0; i < deleteBtns.length; i++) {
    const btn = deleteBtns[i];
    btn.addEventListener('click', async(e) => {
        e.stopPropagation();
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
    })
}
