const deleteBtns = document.querySelectorAll('.comment-delete-btn');
console.log(deleteBtns.length);
for (let i = 0; i < deleteBtns.length; i++) {
    const btn = deleteBtns[i];
    btn.addEventListener('click', async(e) => {
        const commentId = e.target.id.split('deleteId')[1];
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
    })
}