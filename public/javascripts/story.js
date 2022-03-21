window.addEventListener("DOMContentLoaded", event => {

    const refresh_buttons = document.getElementsByClassName('refresh-button');
    for(let i=0;i<refresh_buttons.length;++i){
        refresh_buttons[i].addEventListener('click', async (e) => {
            e.stopPropagation();
            await setTimeout(()=>{
                $("#comment-main-wrapper").load(window.location.href + " #comment-main-wrapper>*");
            },500);
        });
    }

    // document.getElementById('comment-button').addEventListener('click', async (e) => {
    //     e.stopPropagation();
    //     console.log("clicked");
    //     await setTimeout(()=>{
    //         $("#comment-list").load(window.location.href + " #comment-list>*");
    //     },100);
    // });
});
