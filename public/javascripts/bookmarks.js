import {makeProfile} from './utils.js';

window.addEventListener("DOMContentLoaded", async (event) => {

    //for the right hand side follow recommendation
    const wrapper = document.getElementById('userProfileBoxWrapper');
    
    const addBookmarks = async (e,storyId,sessionId) => {
        e.preventDefault();
        e.stopPropagation();
        
        const res = await fetch(`/api/bookmarks/${storyId}`,{
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: sessionId,
                storyId: storyId,
            }),
        });
        const returnData = await res.json()
        if (returnData.message === "Success") {
        }
    };

    
    //add bookmarks to the database
    const bbtns = document.getElementsByClassName('bookmarkBtn');

    const toggleBM = (img, faimg)=>{
        if(img.src.includes('black'))   img.src = img.src.replace('black', 'white');
        else if(img.src.includes)   img.src = img.src.replace('white', 'black');
        
        if(faimg){
            if(faimg.classList.contains('fa-bookmark-o')){
                faimg.classList.add('fa-bookmark');
                faimg.classList.remove('fa-bookmark-o');
            }
            else{
                faimg.classList.add('fa-bookmark-o');
                faimg.classList.remove('fa-bookmark');
            }
        }
    }

    for(let i=0;i<bbtns.length;++i){
        const bbtn = bbtns[i];
        const IDs = bbtn.id.split('ID');
        const storyId= parseInt(IDs[1]);
        const sessionId= parseInt(IDs[2]);
        if(sessionId!== 0){
            const addBookmarksWrapper = (e)=>{
                e.stopPropagation();
                if(!bbtn.id.includes('fa')){
                    const img = bbtn.firstChild;
                    const faimg = document.getElementById(`faID${storyId}ID${sessionId}`);
                    if(faimg)   toggleBM(img,faimg.firstChild);
                    else    toggleBM(img,faimg);
                }
                else{
                    const img = document.getElementById(`bmrkimgID${storyId}ID${sessionId}`);
                    const faimg = bbtn.firstChild;
                    toggleBM(img,faimg);
                }
                addBookmarks(e,storyId,sessionId);
            }

            bbtn.addEventListener('click',addBookmarksWrapper);
        }
    }
});

