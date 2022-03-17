
window.onload = async function(){
    const wrapper = document.getElementById('userProfileBoxWrapper');
    const numPeople = 5;
    const res = await fetch(`/users/random/${numPeople}`);
    const returnData = await res.json();
    for(let i=0;i<numPeople;++i){
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
        
        pImg.innerHTML= `<img src='/img/users/user${id}.png' width='75px'>`;
        pContent.innerHTML= "<p>Do you want to hear the latest game News? You should follow him!.</p>";
        btn.innerHTML = "Follow";
        wrapper.appendChild(box);
        box.appendChild(profile);
        profile.appendChild(pImg);
        profile.appendChild(pContent);
        profile.appendChild(btn);
    }

    const fbtns = document.getElementsByClassName('followBtn');

    for(let i=0;i<fbtns;++i){
        const fbtn = fbtns[i];
        fbtn.addEventListener('click',async (e) => {
            e.stopPropagation();
            const id=e.target.id.split('followBtn')[1];
    
        });
    }
    
}