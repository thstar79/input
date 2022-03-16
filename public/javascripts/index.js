$( "body" ).click(function() {
    $( "#loadinggifdiv" ).fadeOut( "slow", function() {
    });

});


window.addEventListener("DOMContentLoaded", event => {
    
    document.getElementById('menu-icon1').addEventListener('click', () => {
        document.getElementById('menu-icon1').setAttribute('src','/img/home-selected.png')
    })


    document.getElementById(`storyId1`).addEventListener('click', () => {
        document.location.href = 'http://localhost:8080/stories/1';
    })

    document.getElementById(`storyId2`).addEventListener('click', () => {
        document.location.href = 'http://localhost:8080/stories/2';
    })

    document.getElementById(`storyId3`).addEventListener('click', () => {
        document.location.href = 'http://localhost:8080/stories/3';
    })

    document.getElementById(`storyId4`).addEventListener('click', () => {
        document.location.href = 'http://localhost:8080/stories/4';
    })
});
    
