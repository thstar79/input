
window.onload = async function(){

    //for the right hand side follow recommendation
    const wrapper = document.getElementById('userProfileBoxWrapper');
    const numPeople = 5;
    const res = await fetch(`/users/random/${numPeople}`);
    const returnData = await res.json();
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
        pImg.setAttribute("style", "font-family: 'Poor Story'; font-size: 18px; font-weight: 1000")
        pContent.setAttribute("style", "font-family: 'Poor Story'; font-size: 16px;")
        pImg.innerHTML= `<img src='/img/users/user${id}.png' width='50px'>${username.slice(0,8)}`;
        pContent.innerHTML= `<p>Do you want to hear the latest game News? You should follow ${firstname.slice(0,7)} ${lastname.slice(0,7)}!.</p>`;
        const resfollow = await fetch('/follows/isfollow',{
            method: 'POST',
            body: JSON.stringify({followee:`${id}`}),
            headers: { 'Content-Type': 'application/json' }
        });

        const returnDataFollow = await resfollow.json();
        console.log(returnDataFollow.isfollow);
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
    const wrapper1 = document.getElementById('topBoxWrpper');
    const res1 = await fetch(`/follows`);
    const returnData1 = await res1.json();
    for(let i=0;i<returnData1.follows.length;++i){
        const id = returnData1.follows[i].id;
        const userName = returnData1.follows[i].userName;
        const box = document.createElement('div');
        const profile = document.createElement('div');
        const pImg = document.createElement('div');
        // console.log(id)
        // console.log(returnData1)

        box.setAttribute('id', `topProfileDetail${id}`);
        box.setAttribute('class','topProfileDetailBox');
        profile.setAttribute('id', `topProfile${id}`);
        profile.setAttribute('class','topProfileMain');
        pImg.setAttribute('id',`topProfileImg${id}`);
        pImg.setAttribute('class','topProfieImageBox');
        document.getElementById('topBoxWrpper').setAttribute('style',"border: solid rgb(71, 71, 71) 0.5px; box-shadow: 5px 5px 2.5px rgb(59, 59, 59);");
        pImg.setAttribute("style", "font-family: 'Press Start 2p'; font-size: 5px; display:flex; flex-direction:column; justify-content: space-between;")
        pImg.innerHTML = `<img src='/img/users/user${id}.png' width='50px' height='50px'><p id="followUserName">${userName.slice(0,7)}</p>`;

        wrapper1.appendChild(box);
        box.appendChild(profile);
        profile.appendChild(pImg);
    }

    function reload(){
        const container = document.getElementById('topBoxWrpper');
        const content = container.innerHTML;
        container.innerHTML= content;
        console.log("Refreshed");
    }

    //add follow to the database
    const fbtns = document.getElementsByClassName('followBtn');
    const fboxes = document.getElementsByClassName('userProfileDetailBox');
    for(let i=0;i<fbtns.length;++i){
        const fbtn = fbtns[i];
        const fbox = fboxes[i];
        fbtn.addEventListener('click',async (e) => {
            e.stopPropagation();
              console.log(e.target.innerText);
              if(e.target.innerText === "Follow") {
                e.target.innerText = "Unfollow";
                e.target.classList.remove("unfollow");
                fbox.classList.add("followclicked")

            } else if(e.target.innerText === "Unfollow") {
                e.target.innerText = "Follow";
                e.target.classList.add("unfollow");
                fbox.classList.remove("followclicked")
              }
              console.log(e.target.innerText);
            const id=e.target.id.split('followBtn')[1];//follower = current user, followee= this id
            const res = await fetch('/follows',{
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
                const container = document.getElementById('topBoxWrpper');
                const content = container.innerHTML;
                container.innerHTML= content;
                //e.preventDefault();
            }
        });
    }
}
