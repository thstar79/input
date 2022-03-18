
window.onload = async function(){
    
    //for the right hand side follow recommendation
    const wrapper = document.getElementById('userProfileBoxWrapper');
    const numPeople = 5;
    const res = await fetch(`/users/random/${numPeople}`);
    const returnData = await res.json();
    for(let i=0;i<returnData.users.length;++i){
        const id = returnData.users[i].id;
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
        
        pImg.innerHTML= `<img src='/img/users/user${id}.png' width='50px'>`;
        pContent.innerHTML= "<p>Do you want to hear the latest game News? You should follow him!.</p>";
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
        const id = returnData1.follows[i].followee;
        const box = document.createElement('div');
        const profile = document.createElement('div');
        const pImg = document.createElement('div');
        
        box.setAttribute('id', `topProfileDetail${id}`);
        box.setAttribute('class','topProfileDetailBox');
        profile.setAttribute('id', `topProfile${id}`);
        profile.setAttribute('class','topProfileMain');
        pImg.setAttribute('id',`topProfileImg${id}`);
        pImg.setAttribute('class','topProfieImageBox');
        
        pImg.innerHTML= `<img src='/img/users/user${id}.png' width='50px'>`;

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

    for(let i=0;i<fbtns.length;++i){
        const fbtn = fbtns[i];
        fbtn.addEventListener('click',async (e) => {
            e.stopPropagation();
              console.log(e.target.innerText);
              if(e.target.innerText === "Follow") {
                e.target.innerText = "Unfollow";
                e.target.classList.remove("unfollow");
              } else if(e.target.innerText === "Unfollow") {
                e.target.innerText = "Follow";
                e.target.classList.add("unfollow");
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