console.log("Hello from the create comment");
const createBtns = document.querySelectorAll('.comment-create-btn');
console.log("Length: ", createBtns.length);
for (let i = 0; i < createBtns.length; i++) {
    const btn = createBtns[i];
    btn.addEventListener('click', async(e) => {
        const commentData = document.getElementById('comment').value;
        const storyId = document.getElementById('storyCId').value;
        
        const res = await fetch(`/comments`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                comment: commentData,
                storyId: storyId,
            }),
        });
        console.log(storyId, "!!!!!!!!!!!!!!!!!!");
        const returnData = await res.json();
        // if we get a Success response, the original post element should be updated
        if (returnData.message === "Success") {
            const newDiv = document.createElement("div");
            newDiv.setAttribute("id",`comment-box-${commentId}`);
            const commentList = document.getElementById('comment-list');
            commentList.appendChild(newDiv);
        }
    });
}