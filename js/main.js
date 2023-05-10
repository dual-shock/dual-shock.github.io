let main = document.querySelector("#main"),
prlx = document.querySelector("#prlx"),
dropdown = document.querySelector(".dropdown")

let limit, oldContentElm, oldHeight, oldWidth, desktop = false, loadGitSources = true, mediaQuery = convertRemToPixels(62)


const height_ob = new ResizeObserver((entries) => {
    for(const entry of entries){
        if(entry.target.id=="prlx"){
            let prlxheight = entry.contentRect.height
    
            oldHeight = entry.contentRect.height
    
            limit = calcLimit()
        }
        if(entry.target.id == "main"){
            let mainWidth = entry.contentRect.width
            if(mainWidth>mediaQuery){
                if(!desktop){
                    desktop = true
                    //change to desktop action
                    console.log("window changed to desktop, desktop:", desktop)
                    if(oldContentElm != undefined){
                        console.log("removing display from old visible cont. elm: ", oldContentElm)
                        oldContentElm.classList.remove("display-caret")   
                        oldContentElm = undefined

                    }


                }
            }
            else{
                if(desktop){
                    desktop = false

                    console.log("window changed to mobile, desktop:", desktop)

                }   
            }
            console.log("removing and adding click listener, desktop: ", desktop)
            main.removeEventListener("click", clickHandler)
            main.addEventListener("click", clickHandler)
            if(desktop){
                console.log("removing parallax listener, desktop: ", desktop)
                main.removeEventListener("scroll", parallaxHandler, {passive: true}) }
            else{
                console.log("adding parallax listener, desktop: ", desktop)
                main.addEventListener("scroll", parallaxHandler, {passive: true}) }
        }
    }
})
height_ob.observe(document.querySelector("#prlx"))
height_ob.observe(document.querySelector("#main"))


function clickHandler(e){

    if(!desktop){
        if (!e.target.matches(".burger, #dropdown-container, " + 
                                    "#burger-svg-path, #burger-svg")){
            
            if(document.querySelector(".dropdown").classList.contains("display-dropdown")){
                dropdown.classList.toggle("display-dropdown")
                document.querySelector("#content").style.filter = "brightness(100%)"
            }
            if(e.target.matches(".jumptoitem")){
                smoothScroll(e.target.dataset.scrollto)
            }                        
        }          
    }
    else{
 
        if(e.target.matches(".navbar-item")){
            console.log("navbar item clicked")

            let newContentElm = document.querySelector(e.target.dataset.open)
            if(newContentElm != oldContentElm){
                newContentElm.classList.add("display-caret")
                if(oldContentElm!=undefined){oldContentElm.classList.remove("display-caret")}
            }
            oldContentElm = document.querySelector(e.target.dataset.open)
            console.log("curr cont. elm: ", newContentElm, "\nold cont. elm: ", oldContentElm)
        }

        if(e.target.matches("#header, #navbar, #title") && oldContentElm != undefined){
            console.log("non cont. elm clicked: ", e.target, "\nremoving display form old cont. elm: ", oldContentElm)
            oldContentElm.classList.remove("display-caret")
            oldContentElm = undefined
        }
    }

  

    let oldElm
    if(e.target.matches(".caret")){
        let newElm = e.target
        
        if(newElm!=oldElm){
            for(let i of newElm.getElementsByClassName("hide-caret")){
                i.classList.add("display-caret")}

            if(oldElm != undefined){
                for(let i of oldElm.getElementsByClassName("hide-caret")){
                    i.classList.remove("display-caret")}}
        }
        
        oldElm = e.target
    }
}
function parallaxHandler(){
    
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

}


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