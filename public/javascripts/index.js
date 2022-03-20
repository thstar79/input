
window.addEventListener("DOMContentLoaded", event => {

    document.getElementById('menu-icon1').addEventListener('click', (e) => {
        document.getElementById('menu-icon1').setAttribute('src','/img/home-selected.png')
    })

    // document.getElementById('homelink').addEventListener('click', (e) => {
    //     document.getElementById('homelink').style.color = 'grey'
    //     document.location.href = `../stories`;
    // })
    const stories = document.getElementsByClassName('storyBoxClick');
    for(let i=0;i<stories.length;++i){
        stories[i].addEventListener('click', (e) => {
        //document.getElementById(`storyId${i}`).addEventListener('click', (e) => {
            const id = stories[i].id.split('Id')[1];
            //document.location.href = `https://input-app.herokuapp.com/stories/${id}`;
            document.location.href = `/stories/${id}`;
        });
    }
});


$('#homelink').click(function() {
    $('#homelink').toggle('1000');
    $("i", this).toggleClass("icon-circle-arrow-up icon-circle-arrow-down");
});
