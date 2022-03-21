window.addEventListener("DOMContentLoaded", event => {
    const storyButton = document.getElementById('storyFilterLink')
    const feedButton = document.getElementById('feedFilterLink')

    const sfc = document.getElementById('storyFilterContainer');
    const ffc = document.getElementById('feedFilterContainer');
    if(storyButton){
        storyButton.addEventListener('click', () => {
            sfc.style.animation= "disappear 1s"
            sfc.classList.remove('hiddenF');
            ffc.classList.add('hiddenF');
            storyButton.classList.add('clicked');
            feedButton.classList.remove('clicked');
            // storyButton.classList.remove('clicked')
            // storyButton.classList.add('clicked')    
            // document.getElementById('feedFilterLink').classList.remove('clicked')
            
            // let displayPages = document.querySelectorAll('.storiescontainer');
            // displayPages[0].classList.remove('hiddenProfile')
            // if (!displayPages[1].classList.contains('hiddenProfile')) {
            //     displayPages[1].classList.add('hiddenProfile')
            // }
        })
        
        
        feedButton.addEventListener('click', () => {
            ffc.style.animation= "disappear 1s"
            ffc.classList.remove('hiddenF');
            sfc.classList.add('hiddenF');

            feedButton.classList.add('clicked');    
            storyButton.classList.remove('clicked');
            // document.getElementById('storyFilterLink').classList.remove('clicked')

            // let displayPages = document.querySelectorAll('.storiescontainer');
            // displayPages[1].classList.remove('hiddenProfile')
            // if (!displayPages[0].classList.contains('hiddenProfile')) {
            //     displayPages[0].classList.add('hiddenProfile')
            // }
        })
    }
})
