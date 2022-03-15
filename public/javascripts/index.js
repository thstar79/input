$( "body" ).click(function() {
    $( "#loadinggifdiv" ).fadeOut( "slow", function() {
    });

});


window.addEventListener("DOMContentLoaded", event => {
    
    document.getElementById('menu-icon1').addEventListener('click', () => {
        document.getElementById('menu-icon1').setAttribute('src','/img/home-selected.png')
    })
});
    
