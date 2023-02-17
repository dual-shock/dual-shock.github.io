let main = document.querySelector("#main"),
    prlx = document.querySelector("#prlx")

let limit, oldHeight, 
    loadGitSources = true


height_ob.observe(document.querySelector("#prlx"))


main.addEventListener("scroll", (event) => {
    if(main.scrollTop > limit){
        main.style.overflowY = "hidden"
        sleep(0.1)
            .then(()=>{
                main.scrollTo(0, limit)
            })
            .then(()=>{
                main.style.overflowY="auto"
            })
    }
}, {passive: true})
window.addEventListener("click", (event) => {
    let oldElm
    if (!event.target.matches(".burger, #dropdown-container, " + 
                              "#burger-svg-path, #burger-svg")){
        let dropdowns = document.getElementsByClassName("dropdown")
        
        for(let i = 0; i < dropdowns.length; i++){
            let openDropdown = dropdowns[i]
            if(openDropdown.classList.contains("display-dropdown")){
                openDropdown.classList.remove("display-dropdown")}}
    }

    if(event.target.matches(".caret")){
        let newElm = event.target
        if(newElm!=oldElm){
            for(let i of newElm.getElementsByClassName("hide-caret")){
                i.classList.add("display-caret")}

            if(oldElm != undefined){
                for(let i of oldElm.getElementsByClassName("hide-caret")){
                    i.classList.remove("display-caret")}}
        }
        oldElm = event.target
    }
}) 


if(loadGitSources){
    loadGithubSources()
}
else{
    let toggler = document.getElementsByClassName("caret")

    for (let i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function() {
        this.parentElement.querySelector(".hide-folder").classList.toggle("active");
        this.classList.toggle("caret-down");
        });
    }
}