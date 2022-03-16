$( "body" ).click(function() {
    $( "#loadinggifdiv" ).fadeOut( "slow", function() {
    });

});


window.addEventListener("DOMContentLoaded", event => {
    
    document.getElementById('menu-icon1').addEventListener('click', (e) => {
        document.getElementById('menu-icon1').setAttribute('src','/img/home-selected.png')
    })

    const stories = document.getElementsByClassName('storyBoxWrapper');
    for(let i=0;i<stories.length;++i){
        stories[i].addEventListener('click', (e) => {
        //document.getElementById(`storyId${i}`).addEventListener('click', (e) => {
            const id = stories[i].id.split('storyId')[1];
            document.location.href = `https://inputapptest.herokuapp.com/stories/${id}`;
        });
    }
});
    
