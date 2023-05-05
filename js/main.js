let main = document.querySelector("#main"),
prlx = document.querySelector("#prlx"),
dropdown = document.querySelector(".dropdown")

let limit, oldHeight, loadGitSources = true

const height_ob = new ResizeObserver((entries) => {
    for(const entry of entries){
        if(entry.target.id=="prlx"){
            let prlxheight = entry.contentRect.height

            //console.log(`Height change: ${oldHeight} -> ${height}`)
    
            oldHeight = entry.contentRect.height
    
            limit = calcLimit()
        }
        if(entry.target.id == "main"){
            console.log("windows resized")

        }

    }
})
height_ob.observe(document.querySelector("#prlx"))
height_ob.observe(document.querySelector("#main"))

if(window.innerWidth <= convertRemToPixels(62)){




//TODO Make it so it removed / adds event listeners when media query changes
    


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
            
            if(document.querySelector(".dropdown").classList.contains("display-dropdown")){
                dropdown.classList.toggle("display-dropdown")
                document.querySelector("#content").style.filter = "brightness(100%)"
            }
            if(event.target.matches(".jumptoitem")){
               smoothScroll(event.target.dataset.scrollto)
            }                        
            
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



}
else{

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