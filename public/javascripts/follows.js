import {makeProfile} from './utils.js';

window.onload = async function(){

    //for the right hand side follow recommendation
    const wrapper = document.getElementById('userProfileBoxWrapper');
    const numPeople = 5;
    const res = await fetch(`/api/users/random/${numPeople}`);
    const returnData = await res.json();
    const userId = returnData.session;
    const top_wrapper = document.getElementById('topBoxWrpper');

    for(let i=0;i<returnData.users.length;++i){
        const id = returnData.users[i].id;
        let username = returnData.users[i].userName;
        let firstname = returnData.users[i].firstName;
        let lastname = returnData.users[i].lastName;
        const box = document.createElement('div');
        const profile = document.createElement('div');
        const pImg = document.createElement('div');
        const pContent = document.createElement('div');
        const btn = document.createElement('button');

        box.setAttribute('id', `userProfileDetail${id}`);
        box.setAttribute('class','userProfileDetailBox');
        profile.setAttribute('id', `userProfile${id}`);
        profile.setAttribute('class','userProfileMain');
        pImg.setAttribute('id',`userProfileImg${id}`);
        pImg.setAttribute('class','userProfieImageBox');
        pContent.setAttribute('id',`userProfileContent${id}`);
        pContent.setAttribute('class','userProfileContentBox');
        btn.setAttribute('id',`followBtn${id}`);
        btn.setAttribute('class','followBtn');
        pImg.setAttribute("style", "font-family: 'Press Start 2p'; font-size: 10px; font-weight: 1000")
        pContent.setAttribute("style", "font-family: 'Press Start 2p'; font-size: 8px;")
        pImg.innerHTML= `<img src='/img/users/user${id%20}.png' width='50px'>${username.slice(0,8)}`;
        pContent.innerHTML= `<p>Do you want to hear the latest game News? You should follow ${firstname.slice(0,7)} ${lastname.slice(0,7)}!.</p>`;
        const resfollow = await fetch('/api/follows/isfollow',{
            method: 'POST',
            body: JSON.stringify({followee:`${id}`}),
            headers: { 'Content-Type': 'application/json' }
        });

        const returnDataFollow = await resfollow.json();
        if(returnDataFollow.isfollow === 0){
            btn.innerText = "Follow";
            btn.classList.add("unfollow");
        }
        else{
            btn.innerText = "Unfollow";
            box.classList.add("followclicked")
        }
        wrapper.appendChild(box);
        box.appendChild(profile);
        profile.appendChild(pImg);
        profile.appendChild(pContent);
        profile.appendChild(btn);
    }

    //for the content-top
    const makeTopFollows = async ()=>{

        const res1 = await fetch(`/api/follows`);
        const returnData1 = await res1.json();
        for(let i=0;i<returnData1.follows.length;++i){
            const id = returnData1.follows[i].id;
            const userName = returnData1.follows[i].userName;
            makeProfile(top_wrapper, id, userName);
        }
    };

    if(userId !== 0)    makeTopFollows();

    const addFollows = async (fbox, e) => {
        e.preventDefault();
        e.stopPropagation();

          if(e.target.innerText === "Follow") {
            e.target.innerText = "Unfollow";
            e.target.classList.remove("unfollow");
            fbox.classList.add("followclicked")

        } else if(e.target.innerText === "Unfollow") {
            e.target.innerText = "Follow";
            e.target.classList.add("unfollow");
            fbox.classList.remove("followclicked")
          }
        const id=e.target.id.split('followBtn')[1];//follower = current user, followee= this id
        const res = await fetch('/api/follows',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId1: id,
            }),
        });
        const returnData = await res.json()
        if (returnData.message === "Success") {
            const userId = parseInt(e.target.id.split('followBtn')[1],10);
            const res2 = await fetch(`/api/users/${userId}`);
            const newFollowee = await res2.json();
            const userName = newFollowee.user.userName;
            makeProfile(top_wrapper, userId, userName);
        }
    };

    //add follow to the database
    const fbtns = document.getElementsByClassName('followBtn');
    const fboxes = document.getElementsByClassName('userProfileDetailBox');
    for(let i=0;i<fbtns.length;++i){
        const fbtn = fbtns[i];
        const fbox = fboxes[i];

        const addFollowsWrapper = (e)=>{
            addFollows(fbox,e);
        }

        fbtn.addEventListener('click',addFollowsWrapper);
    }
}
