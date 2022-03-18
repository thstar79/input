const extraside = document.getElementById('extraside');
const strcomments = document.getElementsByClassName('strcomment');

for(let i=0;i<strcomments.length;++i){
    strcomments[i].addEventListener('click', async (e)=>{
        
        const cW = document.createElement('div');
        
        const cTopW = document.createElement('div');
        const cMainW = document.createElement('div');
        
        const cTopTop = document.createElement('div');
        const cTopMain = document.createElement('div');

        const cTopTopExit = document.createElement('div');

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
        const cMB2Form = document.createElement('form');
        const Minput1 = document.createElement('input');
        const Minput3 = document.createElement('textarera');
        const Mlabel_input3 = docuement.createElement('label');
        const Mbtn = document.createElement('button');

        const cMB3 = document.createElement('div');
        const cMB3L = document.createElement('div');
        const cMB3M = document.createElement('div');
        const cMB3R = document.createElement('div');
        const cMB3Lcoin = document.createElement('div');
        const cMB3LcoinImg = document.createElement('div');
        const cMB3LcoinCnt = document.createElement('div');
        const cMB3LcoinImg_img = document.createElement('img');

        const cForm = document.createElement('form');
        const input1 = document.createElement('input');
        const input2 = document.createElement('input');
        const input3 = document.createElement('textarera');
        const label_input3 = docuement.createElement('label');
        const btn = document.createElement('button');
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');
        const span3 = document.createElement('span');

        ///////////////////////////////////////////////////////////////////////////////
        cW.setAttribute('id','comment-wrapper');
        cW.classList.add('hiddenC');
        cTopW.setAttribute('id', 'comment-top-wrapper');
        
        cTopTop.setAttribute('id',`comment-top-top`);
        cTopTopExit.setAttribute('id','comment-top-top-exit');
        cTopMain.setAttribute('id',`comment-top-main`);

        //Write Form
        cForm.setAttribute('id','userProfileContentBox');
        input1.setAttribute('type','hidden');
        input1.setAttribute('name','_csrf');
        input1.setAttribute('value','csrfToken'); 
        input2.setAttribute('id',`storyCId`);
        input2.setAttribute('type','hidden');
        input2.setAttribute('name','storyId');
        input2.setAttribute('value',`story.id`);
        input3.setAttribute('id',`comment`);
        input3.setAttribute('name','comment');
        input3.setAttribute('rows','5');
        input3.setAttribute('value','');
        label_input3.setAttribute('for','comment');
        
        btnDiv.classList.add('py-4');
        btn.setAttribute('id','comment-button');
        btn.setAttribute('type','submit');
        btn.classList.add('comment-create-btn');
        btn.classList.add('pushable');
        span1.classList.add('shadow');
        span2.classList.add('edge');
        span3.classList.add('front');

        btn.innerText= 'Comment';

        cMainW.setAttribute('id','comment-list');

        cMB.setAttribute('id',`comment-box-${comment.id}`);

        cMB1.classList.add('refresh-button');
        cMB2.classList.add('refresh-button');
        cMB3.classList.add('refresh-button');

        cMB1pimg.setAttribute('src',`/img/users/user${comment.User.id}.png`);
        cMB1pimg.setAttribute('width','50px');
        cMB1pp.innerText = `${comment.User.firstName} ${comment.User.lastName}`;
        cMB1cp.setAttribute('id',`comment-content-${comment.id}`);
        cMB1cp.innerText = comment.comment;
        
        cMB2btn1.setAttribute('id',`editID${comment.id}ID${comment.User.id}ID${session.id}`);
        cMB2btn1.innerText = 'Edit';
        cMB2btn1.classList.add('pushable');
        cMB2btn1.classList.add('comment-edit-btn');

        cMB2btn2.setAttribute('id',`deleteID${comment.id}ID${comment.User.id}ID${session.id}`);
        cMB2btn2.innerText = 'Delete';
        cMB2btn2.classList.add('pushable');
        cMB2btn2.classList.add('comment-delete-btn');
        
        //Edit Form
        cMB2Form.setAttribute('id',`edit-form-${comment.id}`);
        cMB2Form.classList.add('hidden');
        Minput1.setAttribute('type','hidden');
        Minput1.setAttribute('name','_csrf');
        Minput1.setAttribute('value','csrfToken');
        Minput3.setAttribute('id',`comment-field-${comment.id}`);
        Minput3.setAttribute('name','content');
        Minput3.setAttribute('rows','5');
        Minput3.setAttribute('value','');
        Mlabel_input3.setAttribute('for','content');
        
        Mbtn.setAttribute('id',id=`edit-btn-${comment.id}`);
        Mbtn.classList.add('edit-submit-btn');

        Mbtn.innerText= 'Submit Edit';

        cMB3LcoinImg.setAttribute('id',`coinID${comment.id}ID${comment.User.id}ID${session.id}`);
        cMB3LcoinImg.classList.add('coin-btn');
        cMB3LcoinImg_img.setAttribute('id',`coinID${comment.id}ID${comment.User.id}ID${session.id}`);
        cMB3LcoinImg_img.setAttribute('src','/img/coin.png');
        cMB3LcoinImg_img.setAttribute('width','20px');
        cMB3LcoinImg_img.classList.add('coinimg');
        cMB3LcoinImg_img.classList.add('animated');
        cMB3LcoinImg_img.classList.add('bounce');

/////////////////////////////////////////////////////////////////////////////////////////////////////
        extraside.appendChild(cW);

        cW.appendChild(cTopW);
        cW.appendChild(cMainW);

        //TopW-----------------------------------------------------
        cTopW.appendChild(CTopTop);
        cTopW.appendChild(CTopMain);

        cTopTop.appendChild(cTopTopExit);
        //write form
        cTopMain.appendChild(cForm);
        cForm.appendChild(input1);
        cForm.appendChild(input2);
        cForm.appendChild(input3);
        input3.appendZChild(label_input3);
        cForm.appendChild(btnDiv);
        cForm.appendChild(btn);
        btn.appendChild(span1);
        btn.appendChild(span2);
        btn.appendChild(span3);

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
        cMB2form.appendChild(Minput2);
        cMB2form.appendChild(Minput3);
        Minput3.appendZChild(Mlabel_input3);
        cMB2Form.appendChild(Mbtn);

        cMB3L.appendChild(CMB3Lcoin);
        cMB3Lcoin.appendChild(cMB3LcoinImg);
        cMB3LcoinImg.appendChild(cMB3LcoinImg_img);
        cMB3Lcoin.appendChild(cMB3LcoinCnt);

    });
}