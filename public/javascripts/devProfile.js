window.addEventListener("DOMContentLoaded", event => {
    const profileboxes = document.querySelectorAll('#devProfileBox');

    document.getElementById('leftbuttonBox').addEventListener('click', () => {
        profileboxes.forEach(profile => {
            if (profile.classList.contains('hiddenProfile')) {
                profile.classList.remove('hiddenProfile')
            } else {
                profile.style.animation= "disappear 1s"
                profile.classList.add('hiddenProfile')
            }
        })
    })

    document.getElementById('rightbuttonBox').addEventListener('click', () => {
        profileboxes.forEach(profile => {
            if (profile.classList.contains('hiddenProfile')) {
                profile.style.animation= "disappear 1s"
                profile.classList.remove('hiddenProfile')
            } else {
                profile.style.animation= "disappear 1s"
                profile.classList.add('hiddenProfile')
            }
        })
    })
});