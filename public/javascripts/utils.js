const makeDiv = (cMainW, comment, user, sum={}, sessionId, flag = 1)=>{

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

    cMB1pimg.setAttribute('src',`/img/users/user${user.id%20}.png`);
    cMB1pimg.setAttribute('width','50px');
    cMB1pp.innerText = `${user.firstName} ${user.lastName}`;
    cMB1cp.setAttribute('id',`comment-content-${comment.id}`);
    cMB1cp.innerText = comment.comment;

    cMB2btn1.setAttribute('id',`editID${comment.id}ID${user.id}ID${sessionId}`);
    cMB2btn1.innerHTML = `<i class="fa fa-pencil-square-o" aria-hidden="true" id=pencilID${comment.id}ID${user.id}ID${sessionId}></i>`;
    cMB2btn1.classList.add('pushable');
    cMB2btn1.classList.add('comment-edit-btn');

    cMB2btn2.setAttribute('id',`deleteID${comment.id}ID${user.id}ID${sessionId}`);
    cMB2btn2.innerHTML = `<i class="fa fa-trash-o" aria-hidden="true" id=trashID${comment.id}ID${user.id}ID${sessionId}></i>`;
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

    Mbtn.innerText= 'Edit';

    cMB3LcoinImg.setAttribute('id',`coinID${comment.id}ID${user.id}ID${sessionId}`);
    cMB3LcoinImg.classList.add('coin-btn');
    cMB3LcoinImg.classList.add('coinSound');
    cMB3LcoinImg_img.setAttribute('id',`coinID${comment.id}ID${user.id}ID${sessionId}`);
    cMB3LcoinImg_img.setAttribute('src','/img/coin.png');
    cMB3LcoinImg_img.setAttribute('width','20px');
    cMB3LcoinImg_img.classList.add('coinimg');
    //cMB3LcoinImg_img.classList.add('animated');
    //cMB3LcoinImg_img.classList.add('bounce');
    cMB3LcoinImg_img.classList.add('coin-btn');
    cMB3LcoinImg_img.classList.add('coinSound');

    cMB3LcoinCnt.setAttribute('id',`cntID${comment.id}ID${user.id}ID${sessionId}`);
    let coinSum = `${sum[`${comment.id}`]}`;
    if(Object.keys(sum).length === 0)   coinSum = 0;
    cMB3LcoinCnt.innerText = `${coinSum}`;
    //cMB3LcoinCnt.innerText = `${sum[`${comment.id}`]}`;

/////////////////////////////////////////////////////////////////////////////////////////////////////
    //MainW-----------------------------------------------------
    if(flag === 1)  cMainW.appendChild(cMBox);
    else    cMainW.insertBefore(cMBox, cMainW.firstChild);

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

const makeProfile = (wrapper1, id, userName)=>{
    const check = document.getElementById(`topProfileDetail${id}`);
    if(check){
        wrapper1.removeChild(check);
    }
    else{
        const box = document.createElement('div');
        const profile = document.createElement('div');
        const pImg = document.createElement('div');

        box.setAttribute('id', `topProfileDetail${id}`);
        box.setAttribute('class','topProfileDetailBox');
        profile.setAttribute('id', `topProfile${id}`);
        profile.setAttribute('class','topProfileMain');
        pImg.setAttribute('id',`topProfileImg${id}`);
        pImg.setAttribute('class','topProfieImageBox');
        document.getElementById('topBoxWrpper').setAttribute('style',"border: solid rgb(71, 71, 71) 0.5px; box-shadow: 5px 5px 2.5px rgb(59, 59, 59);");
        pImg.setAttribute("style", "font-family: 'Press Start 2p'; font-size: 5px; display:flex; flex-direction:column; justify-content: space-between;")
        pImg.innerHTML = `<img src='/img/users/user${id%20}.png' width='50px' height='50px'><p id="followUserName">${userName.slice(0,7)}</p>`;

        wrapper1.appendChild(box);
        box.appendChild(profile);
        profile.appendChild(pImg);
    }
}

const commentFn = async (e)=>{
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
        window.alert("Cannot edit a comment you didn't make");
    }
}

const delFn = async(e) => {
    e.stopPropagation();
    const IDs = e.target.id.split('ID');
    const commentId = parseInt(IDs[1], 10);
    const userId = parseInt(IDs[2], 10);
    const sessionId = parseInt(IDs[3], 10);

    if(((userId === sessionId) && userId !== undefined) || sessionId === 2){

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
        window.alert("Cannot delete a comment you didn't make");
    }
}

const starFn = async (e) => {
    e.stopPropagation();
    const IDs = e.target.id.split('ID');
    const commentId = parseInt(IDs[1],10);
    const userId = parseInt(IDs[2],10);
    const sessionId = parseInt(IDs[3],10);
    //console.log(IDs);

    e.target.classList.remove('animated');
    void e.target.offsetWidth;
    e.target.classList.add('animated');

    if(userId === sessionId){
        window.alert("shame on you. Don't give self coins");
    }
    else if( sessionId === undefined || sessionId === 0){
        window.alert("Only logged in user can give coins wanna log in or sign up?");
    }
    else{
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
        else if(returnData.message === "Max"){
            window.alert("Max coin reaches");
        }
    }
};

const commentListener = (editBtns,deleteBtns,coinBtns,sessionId)=>{
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
};

export {makeDiv, makeProfile, commentFn, commentListener};
