const switchButton = document.querySelector("#nav-bar-icon")

switchButton.addEventListener('click', async(event) => {
    let home = document.querySelector("#menu-icon1")
    let writeStory = document.querySelector("#menu-icon4")
    home.src = "/img/theme/mushroom.png"
    writeStory.src = "/img/theme/feather.png"
    writeStory.style.width = "40px"
    writeStory.style.height = "40px"
    home.style.width = "40px"
    home.style.height = "40px"
})
