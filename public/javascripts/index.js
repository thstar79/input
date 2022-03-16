$( "body" ).click(function() {
    $( "#loadinggifdiv" ).fadeOut( "slow", function() {
    });

});


window.addEventListener("DOMContentLoaded", event => {
    
    document.getElementById('menu-icon1').addEventListener('click', (e) => {
        document.getElementById('menu-icon1').setAttribute('src','/img/home-selected.png')
    })

    const stories = document.getElementsByClassName('storyBoxWrapper');
    for(let i=1;i<=stories.length;++i){
        document.getElementById(`storyId${i}`).addEventListener('click', (e) => {
            document.location.href = `http://localhost:8080/stories/${i}`;
        });
    }
});
    
