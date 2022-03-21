//const createBtns = document.querySelectorAll('.comment-create-btn');
const createBtn = document.getElementById('commentCreate');
//for (let i = 0; i < createBtns.length; i++) {

    createBtn.addEventListener('click', async(e) => {
        e.preventDefault();
        //const btn = createBtns[i];
        // const commentData = document.getElementById('comment').value;
        // const storyId = document.getElementById('storyCId').value;


        // const res = await fetch(`/api/comments`, {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         comment: commentData,
        //         storyId: storyId,
        //     }),
        // });
        // console.log("am I here?");
        // const returnData = await res.json();
        // console.log(returnData.message);
        // // if we get a Success response, the original post element should be updated
        // if (returnData.message === "Success") {
        //     const newDiv = document.createElement("div");
        //     const newCBDiv = document.createElement("div");
        //     const newCBCDiv = document.createElement("div");
        //     const res1 = await fetch('/comments/last');
        //     newCBDiv.setAttribute("id", `comment-box-${res1.json().id}`);
        //     newCBDiv.setAttribute("class", "commentBox");
        //     newCBCDIv.setAttribute("class", "commentBoxContent");
        //     newDiv.setAttribute("id",`comment-box-${commentId}`);

        //     const commentList = document.getElementById('comment-main-wrapper');
        //     commentList.appendChild(newCBDiv);
        //     newCBDiv.appendChild(newCBCDiv);
        //     newCBCDiv.appendChild(newDiv);
        // }
    });
//}
