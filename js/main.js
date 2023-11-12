
let main = document.querySelector("#main"),
prlx = document.querySelector("#prlx"),
dropdown = document.querySelector(".dropdown")

let limit, oldContentElm, oldNavItem, oldHeight, oldWidth, desktop = false, loadGitSources = true, mediaQuery = convertRemToPixels(62)


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
                        oldContentElm.classList.remove("display-block")  
                        oldNavItem.style.opacity = "0.2"
                        oldContentElm = undefined
                        oldNavItem = undefined
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
            let newNavItem = e.target
            if(newContentElm != oldContentElm){
                newContentElm.classList.add("display-block")
                newNavItem.style.opacity = "1"
                
                if(oldContentElm!=undefined){
                    oldContentElm.classList.remove("display-block")
                    oldNavItem.style.opacity = "0.2"
                }
            }
            oldContentElm = document.querySelector(e.target.dataset.open)
            oldNavItem = e.target
            console.log("curr cont. elm: ", newContentElm, "\nold cont. elm: ", oldContentElm)
        }

        if(e.target.matches("#header, #navbar, #title") && oldContentElm != undefined){
            console.log("non cont. elm clicked: ", e.target, "\nremoving display form old cont. elm: ", oldContentElm)
            oldContentElm.classList.remove("display-block")
            oldNavItem.style.opacity = "0.2"
            
            oldContentElm = undefined
            oldNavItem = undefined
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





let promises = []
let reposToInclude = [
    "journal",
    "jadepage",
    "dual-shock.github.io"
]


async function loadPortfolioLinks(){
    for(let i=0;i<reposToInclude.length;i++){
        promises.push(
            fetch(`https://api.github.com/repos/dual-shock/${reposToInclude[i]}/git/trees/main?recursive=1`)
            .then((response) => response.json())
        )
    }
}

try {
    loadPortfolioLinks();

    let data = await Promise.all(promises)
    let listOfPaths = []
    for(let i = 0; i < data.length; i++){
        let trees = data[i].tree
        listOfPaths.push({
            path: `resources/portfolio/${trees[0].url.split("/")[5]}`,
            type: 'tree'
        })
        for(let i=0;i<trees.length;i++){
            let tree = trees[i]
            tree.path = `resources/portfolio/${tree.url.split("/")[5]}/${tree.path}`
            if(tree.path.split('/')[1]=="portfolio" && tree.path.split('/').length > 2 ){
                listOfPaths.push({
                    path: tree.path,
                    type: tree.type,
                    url: `https://github.com/dual-shock/${trees[0].url.split("/")[5]}/`
                })
            }
        }
    }
    console.log(listOfPaths)
    document.getElementById("portfolio").appendChild(hierarchy(listOfPaths))
    let toggler = document.getElementsByClassName("caret")
    
    for (let i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function() {
        this.parentElement.querySelector(".hide-folder").classList.toggle("active");
        this.classList.toggle("caret-down");
    });
    }    
}

catch(error){
    console.error(error)
}


 
console.log("test")
if(loadGitSources){
    loadGalleryLinks("https://api.github.com/repos/dual-shock/dual-shock.github.io/git/trees/main?recursive=1")
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
