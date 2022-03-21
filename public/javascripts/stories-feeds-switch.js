window.addEventListener("DOMContentLoaded", event => {
    let storyButton = document.getElementById('storyFilterLink')
    storyButton.addEventListener('click', () => {
        storyButton.classList.remove('clicked')
        storyButton.classList.add('clicked')    
        document.getElementById('feedFilterLink').classList.remove('clicked')
        
        let displayPages = document.querySelectorAll('.storiescontainer');
        displayPages[0].classList.remove('hiddenProfile')
        if (!displayPages[1].classList.contains('hiddenProfile')) {
            displayPages[1].classList.add('hiddenProfile')
        }
    })
    
    let feedButton = document.getElementById('feedFilterLink')
    feedButton.addEventListener('click', () => {
        feedButton.classList.remove('clicked')
        feedButton.classList.add('clicked')    
        document.getElementById('storyFilterLink').classList.remove('clicked')

        let displayPages = document.querySelectorAll('.storiescontainer');
        displayPages[1].classList.remove('hiddenProfile')
        if (!displayPages[0].classList.contains('hiddenProfile')) {
            displayPages[0].classList.add('hiddenProfile')
        }
    })
})
