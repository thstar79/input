import {makeProfile} from './utils.js';

window.addEventListener("DOMContentLoaded", event => {

    //for the right hand side follow recommendation
    const wrapper = document.getElementById('userProfileBoxWrapper');
    
    //for the content-top
    // const makeBookMark = async ()=>{

    //     const res1 = await fetch(`/api/bookmarks`);
    //     const returnData1 = await res1.json();
    //     for(let i=0;i<returnData1.follows.length;++i){
    //         const id = returnData1.follows[i].id;
    //         const userName = returnData1.follows[i].userName;
    //         console.log(id, userName);
    //         makeProfile(top_wrapper, id, userName);
    //     }
    // };

    //if(userId !== 0)    makeTopFollows();

    const addBookmarks = async (fbox, e) => {
        e.preventDefault();
        e.stopPropagation();
        // console.log(e.target.innerText);
        // if(e.target.innerText === "Bookmark") {
        //     e.target.innerText = "UnBook";
        //     e.target.classList.remove("unbook");
        //     fbox.classList.add("bookmarkclicked")
        // } else if(e.target.innerText === "UnBook") {
        //     e.target.innerText = "Bookmark";
        //     e.target.classList.add("unbook");
        //     fbox.classList.remove("bookmarkclicked")
        // }
        
        console.log(e.target.id);
        const IDs = e.target.id.split('ID');
        const storyId= parseInt(IDs[1]);
        const sessionId= parseInt(IDs[2]);

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
    const bboxes = document.getElementsByClassName('coinBox');
    const sfooters = document.getElementsByClassName('storyBoxFooter');

    for(let i=0;i<bbtns.length;++i){
        const bbtn = bbtns[i];
        const bbox = bboxes[i];

        const addBookmarksWrapper = (e)=>{
            console.log("bookmark img clicked");
            e.stopPropagation();
            let img = bbtn.firstChild;
            console.log(img);
            if(img.src.includes('black')){
                img.src = img.src.replace('black', 'white');
            }
            else if(img.src.includes){
                img.src = img.src.replace('white', 'black');
            }
            addBookmarks(bbox,e);
        }

        bbtn.addEventListener('click',addBookmarksWrapper);
    }


    // const bbtns1 = document.getElementsByClassName('bookmarkBtn1');
    // const sfooters = document.getElementsByClassName('storyBoxFooter');
    
    // for(let i=0;i<bbtns1.length;++i){
    //     const bbox1 = sfooters[i];
    //     const bbtn1 = bbtns1[i];
    //     console.log(bbtn1);    
    //     const addBookmarksWrapper = (e)=>{
    //         console.log("bookmark img clicked");
    //         e.stopPropagation();
    //         changeImg(bbtn1,bbtn1.firstChild,'/img/bookmarks_black.png');
    //         addBookmarks(bbox1,e);
    //     }

    //     bbtn1.addEventListener('click',addBookmarksWrapper);
    // }

}
)

