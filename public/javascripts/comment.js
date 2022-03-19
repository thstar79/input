import {editFn, delFn, starFn} from './utils.js';

window.addEventListener("DOMContentLoaded", async (event) => {
    
    const extraside = document.getElementById('extraside');
    console.log(extraside);
    extraside.classList.add('hidden');
    const strcomments = document.getElementsByClassName('strcomment');
    const IDs = strcomments[0].id.split('ID');
    const storyId = IDs[1];
    const sessionId = IDs[2];

    const makeDiv = (cMainW, comment, user, sum={})=>{
        
        const cMBox = document.createElement('div');
    
        const cMB1 = document.createElement('div');
        const cMB1p = document.createElement('div');
        const cMB1pimg = document.createElement('img');
        const cMB1pp = document.createElement('p');
        const cMB1c = document.createElement('div');
        const cMB1cp = document.createElement('p');
    
        const cMB2 = document.createElement('div');
        const cMB2btn1 = document.createElement('button');
        const cMB2btn2 = document.createElement('button');
        const cMB2form = document.createElement('form');
        const Minput1 = document.createElement('input');
        const Minput3 = document.createElement('input');
        const Mlabel_input3 = document.createElement('label');
        const Mbtn = document.createElement('button');
    
        const cMB3 = document.createElement('div');
        const cMB3L = document.createElement('div');
        const cMB3M = document.createElement('div');
        const cMB3R = document.createElement('div');
        const cMB3Lcoin = document.createElement('div');
        const cMB3LcoinImg = document.createElement('div');
        const cMB3LcoinCnt = document.createElement('div');
        const cMB3LcoinImg_img = document.createElement('img');
    
        ///////////////////////////////////////////////////////////////////////////////
        cMBox.setAttribute('id',`comment-box-${comment.id}`);
        cMBox.classList.add(`comment-box`);
    
        cMB1.classList.add('comment-box-sub1');
        cMB2.classList.add('comment-box-sub2');
        cMB3.classList.add('comment-box-sub3');
    
        cMB1p.classList.add('cMB1p');
        cMB1c.classList.add('cMB1c');
    
        cMB1pimg.setAttribute('src',`/img/users/user${user.id}.png`);
        cMB1pimg.setAttribute('width','50px');
        cMB1pp.innerText = `${user.firstName} ${user.lastName}`;
        cMB1cp.setAttribute('id',`comment-content-${comment.id}`);
        cMB1cp.innerText = comment.comment;
        
        cMB2btn1.setAttribute('id',`editID${comment.id}ID${user.id}ID${sessionId}`);
        cMB2btn1.innerText = 'Edit';
        cMB2btn1.classList.add('pushable');
        cMB2btn1.classList.add('comment-edit-btn');
    
        cMB2btn2.setAttribute('id',`deleteID${comment.id}ID${user.id}ID${sessionId}`);
        cMB2btn2.innerText = 'Delete';
        cMB2btn2.classList.add('pushable');
        cMB2btn2.classList.add('comment-delete-btn');
        
        //Edit Form
        cMB2form.setAttribute('id',`edit-form-${comment.id}`);
        cMB2form.classList.add('hidden');
        Minput1.setAttribute('type','hidden');
        Minput1.setAttribute('name','_csrf');
        Minput1.setAttribute('value','csrfToken');
        Minput3.setAttribute('id',`comment-field-${comment.id}`);
        Minput3.setAttribute('name','content');
        Minput3.setAttribute('rows','5');
        Minput3.setAttribute('value','');
        Mlabel_input3.setAttribute('for','content');
        
        Mbtn.setAttribute('id',`edit-btn-${comment.id}`);
        Mbtn.classList.add('edit-submit-btn');
    
        Mbtn.innerText= 'Submit Edit';
    
        cMB3LcoinImg.setAttribute('id',`coinID${comment.id}ID${user.id}ID${sessionId}`);
        cMB3LcoinImg.classList.add('coin-btn');
        cMB3LcoinImg_img.setAttribute('id',`coinID${comment.id}ID${user.id}ID${sessionId}`);
        cMB3LcoinImg_img.setAttribute('src','/img/coin.png');
        cMB3LcoinImg_img.setAttribute('width','20px');
        cMB3LcoinImg_img.classList.add('coinimg');
        cMB3LcoinImg_img.classList.add('animated');
        cMB3LcoinImg_img.classList.add('bounce');
        
        cMB3LcoinCnt.setAttribute('id',`cntID${comment.id}ID${user.id}ID${sessionId}`);
        let coinSum = `${sum[`${comment.id}`]}`;
        if(Object.keys(sum).length === 0)   coinSum = 0;
        cMB3LcoinCnt.innerText = `${coinSum}`;
        //cMB3LcoinCnt.innerText = `${sum[`${comment.id}`]}`;
    
        //Write Form
        cForm.setAttribute('id','userProfileContentBox');
    
        input1.setAttribute('type','hidden');
        input1.setAttribute('name','_csrf');
        input1.setAttribute('value','csrfToken'); 
    
        
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
    
        //write form
        cTopMain.appendChild(cForm);
        cForm.appendChild(input1);
        cForm.appendChild(label_input3);
        cForm.appendChild(input3);
        //cForm.appendChild(btnDiv);
        cForm.appendChild(btn);
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////
        //MainW-----------------------------------------------------
        cMainW.appendChild(cMBox);
    
        cMBox.appendChild(cMB1);
        cMBox.appendChild(cMB2);
        cMBox.appendChild(cMB3);
        
        cMB1.appendChild(cMB1p);
        cMB1.appendChild(cMB1c);
        
        cMB2.appendChild(cMB2btn1);
        cMB2.appendChild(cMB2form);
        cMB2.appendChild(cMB2btn2);
    
        cMB3.appendChild(cMB3L);
        cMB3.appendChild(cMB3M);
        cMB3.appendChild(cMB3R);
    
        cMB1p.appendChild(cMB1pimg);
        cMB1p.appendChild(cMB1pp);
        cMB1c.appendChild(cMB1cp);
    
        //edit form
        cMB2form.appendChild(Minput1);
        cMB2form.appendChild(Minput3);
        Minput3.appendChild(Mlabel_input3);
        cMB2form.appendChild(Mbtn);
    
        cMB3L.appendChild(cMB3Lcoin);
        cMB3Lcoin.appendChild(cMB3LcoinImg);
        cMB3LcoinImg.appendChild(cMB3LcoinImg_img);
        cMB3Lcoin.appendChild(cMB3LcoinCnt);
    
    };
    
    //////////////////////////////////////////////////////////
    const cW = document.createElement('div');
    const cTopW = document.createElement('div');
    const cMainW = document.createElement('div');

    const cTopTop = document.createElement('div');
    const cTopMain = document.createElement('div');

    const cTopTopExit = document.createElement('div');
    const cTopTopExitBtn = document.createElement('button');
    cTopTopExitBtn.innerText="EXIT";

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
    //cForm.appendChild(btnDiv);
    cForm.appendChild(btn);
    const res = await fetch(`/api/stories/${storyId}`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    const result = await res.json();
    const { comments, sum, users } = result;

    for(let i=0;i<comments.length;++i){
        makeDiv(cMainW,comments[i],users[i],sum);
        //dropDiv()
    }

    
    strcomments[0].addEventListener('click', async (e)=>{

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
    });

    const createBtn = document.getElementById('commentCreate');
    let editBtns = document.getElementsByClassName('comment-edit-btn');
    let deleteBtns = document.querySelectorAll('.comment-delete-btn');
    let coinBtns = document.querySelectorAll('.coin-btn');
    

    createBtn.addEventListener('click', async(e) => {
        e.preventDefault();
        e.stopPropagation();
        const commentData = document.getElementById('comment').value;
        const res = await fetch(`/api/comments`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
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
            makeDiv(cMainW, comment,session.user,{});
            editBtns = document.getElementsByClassName('comment-edit-btn');
            console.log("EDIT : ", editBtns.length);
            deleteBtns = document.querySelectorAll('.comment-delete-btn');
            coinBtns = document.querySelectorAll('.coin-btn');

            for (let i = 0; i < editBtns.length; i++) {
                const btn = editBtns[i];
                btn.addEventListener('click', editFn);
            }
        
            for (let i = 0; i < deleteBtns.length; i++) {
                const btn = deleteBtns[i];
                btn.addEventListener('click', delFn);
            }
        
            for (let i = 0; i < coinBtns.length; i++) {
                const btn = coinBtns[i];
                btn.addEventListener('click', starFn);
            }


        }
    });

    for (let i = 0; i < editBtns.length; i++) {
        const btn = editBtns[i];
        btn.addEventListener('click', editFn);
    }

    //let deleteBtns = document.querySelectorAll('.comment-delete-btn');
    //let coinBtns = document.querySelectorAll('.coin-btn');
    for (let i = 0; i < deleteBtns.length; i++) {
        const btn = deleteBtns[i];
        btn.addEventListener('click', delFn);
    }

    //let coinBtns = document.querySelectorAll('.coin-btn');

    for (let i = 0; i < coinBtns.length; i++) {
        const btn = coinBtns[i];
        btn.addEventListener('click', starFn);
    }
});