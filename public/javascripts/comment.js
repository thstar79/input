import {makeDiv, commentFn, commentListener} from './utils.js';

window.addEventListener("DOMContentLoaded", async (event) => {

    const extraside = document.getElementById('extraside');
    extraside.classList.add('hidden');
    const strcomments = document.getElementsByClassName('strcomment');
    const IDs = strcomments[0].id.split('ID');
    const storyId = parseInt(IDs[1],10);
    const sessionId = parseInt(IDs[2],10);

    //////////////////////////////////////////////////////////
    const cW = document.createElement('div');
    const cTopW = document.createElement('div');
    const cMainW = document.createElement('div');

    const cTopTop = document.createElement('div');
    const cTopMain = document.createElement('div');

    const cTopTopExit = document.createElement('div');
    const cTopTopExitBtn = document.createElement('button');
    cTopTopExitBtn.innerText="X";

    //////////////////////////////////////////////////////////
    const cForm = document.createElement('form');
    const input1 = document.createElement('input');
    const input2 = document.createElement('input');
    //const input3 = document.createElement('textarera');
    const input3 = document.createElement('input');
    const label_input3 = document.createElement('label');
    const btnDiv = document.createElement('div');
    const btn = document.createElement('button');

    cW.setAttribute('id','comment-wrapper');
    cW.classList.add('hiddenC');
    cTopW.setAttribute('id', 'comment-top-wrapper');

    cTopTop.setAttribute('id',`comment-top-top`);
    cTopTopExit.setAttribute('id','comment-top-top-exit');
    cTopTopExitBtn.setAttribute('id','comment-top-top-exit-btn');

    cTopMain.setAttribute('id',`comment-top-main`);

    cMainW.setAttribute('id','comment-main-wrapper');

    //Write Form
    cForm.setAttribute('id','userProfileContentBox');

    input1.setAttribute('type','hidden');
    input1.setAttribute('name','_csrf');
    input1.setAttribute('value','csrfToken');
    input2.setAttribute('id',`storyCId`);
    input2.setAttribute('type','hidden');
    input2.setAttribute('name','storyId');
    input2.setAttribute('value',`${storyId}`);
    input3.setAttribute('type','text');
    input3.setAttribute('id',`comment`);
    input3.setAttribute('name','comment');
    //input3.setAttribute('rows','5');
    input3.setAttribute('value','Check this out');

    label_input3.setAttribute('for','comment');
    label_input3.innerText= "Comment : ";

    btnDiv.classList.add('py-4');
    btn.setAttribute('id','commentCreate');
    btn.setAttribute('type','submit');
    btn.classList.add('comment-create-btn');
    btn.classList.add('pushable');
    btn.innerText= "Comment";
    //btn.innerHTML = `<span class="shadow"></span><span class="edge"></span><span class="front"></span>Comment`;

    ///////////////////////////////////////////////////////////
    extraside.appendChild(cW);
    cW.appendChild(cTopW);
    cW.appendChild(cMainW);

    //TopW-----------------------------------------------------
    cTopW.appendChild(cTopTop);
    cTopW.appendChild(cTopMain);

    cTopTop.appendChild(cTopTopExit);
    cTopTopExit.appendChild(cTopTopExitBtn);
    //write form
    cTopMain.appendChild(cForm);
    cForm.appendChild(input1);
    cForm.appendChild(label_input3);
    cForm.appendChild(input2);
    cForm.appendChild(input3);
    cForm.appendChild(btn);
    const res = await fetch(`/api/stories/${storyId}`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    const result = await res.json();
    const { comments, sum, users } = result;

    for(let i=0;i<comments.length;++i){
        makeDiv(cMainW,comments[i],users[i],sum,sessionId);
    }

    strcomments[0].addEventListener('click', commentFn);

    const createBtn = document.getElementById('commentCreate');
    let editBtns = document.getElementsByClassName('comment-edit-btn');
    let deleteBtns = document.querySelectorAll('.comment-delete-btn');
    let coinBtns = document.querySelectorAll('.coin-btn');


    createBtn.addEventListener('click', async(e) => {
        e.preventDefault();
        e.stopPropagation();

        if(sessionId !== 0) {
            const commentData = document.getElementById('comment').value;
            const res = await fetch(`/api/comments`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    comment: commentData,
                    storyId: storyId,
                }),
            });
            const returnData = await res.json();
            // if we get a Success response, the original post element should be updated
            if (returnData.message === "Success") {
                const res1 = await fetch('/comments/last');
                const returnData1 = await res1.json();
                const session = returnData1.session;
                let comment = returnData1.comment;
                makeDiv(cMainW, comment,session.user,{},sessionId,2);
                editBtns = document.getElementsByClassName('comment-edit-btn');
                console.log("EDIT : ", editBtns.length);
                deleteBtns = document.querySelectorAll('.comment-delete-btn');
                coinBtns = document.querySelectorAll('.coin-btn');
                commentListener(editBtns,deleteBtns,coinBtns,sessionId);
            }
        }
        else{
            window.alert("Only logged in user can write comments");
        }
    });
    commentListener(editBtns,deleteBtns,coinBtns,sessionId);

    let audio = new Audio("/assets/smb_coin.wav");
    const coins = document.getElementsByClassName('coinSound');
    for(let i=0;i<coins.length;++i){
        coins[i].addEventListener('click',  () =>  {
            audio.volume = 0.1;
            audio.play();
        })
    }
});
