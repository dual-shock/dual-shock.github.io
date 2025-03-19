
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
            console.log("SOMETHING HAPPENING")
        }
        if(entry.target.id == "main"){
            let mainWidth = entry.contentRect.width
            console.log(mainWidth, mediaQuery)
            if(mainWidth>=mediaQuery){

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
                    document.getElementById("listening-mobile").style.display = "none"
                    document.getElementById("listening-desktop").style.display = "flex"
                    document.getElementById("gallery-1").style.display = "flex"
                    //document.getElementById("gallery-2").style.display = "none"
                    //document.getElementById("desktop-gallery-filter-surr").style.opacity = "1"
                    //document.getElementById("desktop-gallery-filter-self").style.opacity = "0.2"
                }
            }
            else{
                if(desktop){
                    desktop = false

                    console.log("window changed to mobile, desktop:", desktop)
                    document.getElementById("listening-mobile").style.display = "flex"
                    document.getElementById("listening-desktop").style.display = "none"
                    document.getElementById("gallery-1").style.display = "flex"
                    //document.getElementById("gallery-2").style.display = "flex"
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
    console.log(desktop)
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
                newContentElm.classList.add("display-flex")
                newNavItem.style.opacity = "1"
                
                if(oldContentElm!=undefined){
                    oldContentElm.classList.remove("display-flex")
                    oldNavItem.style.opacity = "0.2"
                }
            }
            oldContentElm = document.querySelector(e.target.dataset.open)
            oldNavItem = e.target
            console.log("curr cont. elm: ", newContentElm, "\nold cont. elm: ", oldContentElm)
        }

        if(e.target.matches("#header, #navbar, #title") && oldContentElm != undefined){
            console.log("non cont. elm clicked: ", e.target, "\nremoving display form old cont. elm: ", oldContentElm)
            oldContentElm.classList.remove("display-flex")
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
    if(e.target.matches("#desktop-gallery-filter-surr")){
        console.log("surr filter button clicked")
        document.getElementById("desktop-gallery-filter-surr").style.opacity = "1"
        document.getElementById("desktop-gallery-filter-self").style.opacity = "0.2"
        document.getElementById("gallery-1").style.display = "flex"
        //document.getElementById("gallery-2").style.display = "none"
    }
    if(e.target.matches("#desktop-gallery-filter-self")){
        console.log("self filter button clicked")
        document.getElementById("desktop-gallery-filter-surr").style.opacity = "0.2"
        document.getElementById("desktop-gallery-filter-self").style.opacity = "1"
        document.getElementById("gallery-1").style.display = "none"
        //document.getElementById("gallery-2").style.display = "flex"

    }
    console.log(e.target)
}
function parallaxHandler(){
    console.log("HANDLING")
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




// ? This entire block i stole from github.com/DragonWife


const LASTFM_API_KEY = "8b8e23a1e50a3e03a82bc10dbc293f27"
const username = "Offdeezboy" // change username here
const url = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&format=json&api_key=" + LASTFM_API_KEY + "&limit=1&user=" + username

function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
	xmlHttp.send(null);
	return xmlHttp.responseText;
}
function relativeTime(time, time_text) {
    var time_now = Math.round(Date.now() / 1000)
    var time_diff = time_now - time

    let SEC_IN_MIN = 60
    let SEC_IN_HOUR = SEC_IN_MIN * 60
    let SEC_IN_DAY = SEC_IN_HOUR * 24

    if (time_diff < SEC_IN_HOUR) {
        let minutes = Math.round(time_diff / SEC_IN_MIN)
        return minutes + " minute" +
            ((minutes != 1) ? "s" : "") + " ago"
    }
    if (time_diff >= SEC_IN_HOUR && time_diff < SEC_IN_DAY) {
        let hours = Math.round(time_diff / SEC_IN_HOUR)
        return hours + " hour" +
            ((hours != 1) ? "s" : "") + " ago"
    }
    if (time_diff >= SEC_IN_DAY)
    console.log(time_text)
        return time_text
}
let lastSongName = ""

function updateLastFmData(){
    var json = JSON.parse(httpGet(url));
    var last_track = json.recenttracks.track[0]
    var track = last_track.name
    var trackLink = last_track.url
    var artist = last_track.artist['#text']
    let relative_time = null
    
    if (last_track.date) {
        var unix_date = last_track.date.uts
        var date_text = last_track.date["#text"]
        relative_time = relativeTime(unix_date, date_text)
    }
    var now_playing = (last_track["@attr"] == undefined) ? false : true
    var imageLink = last_track.image[1]["#text"]
    
      
        if(lastSongName !== track){
            document.getElementById("listening-img").src = imageLink.replace("64s","128s")
            document.getElementById("listening-title").innerHTML = `${track}`
            document.getElementById("listening-artist").innerHTML = artist
            
            document.getElementById("listening-img-mobile").src = imageLink.replace("64s","128s")
            document.getElementById("listening-title-mobile").innerHTML = `${track}`
            document.getElementById("listening-artist-mobile").innerHTML = artist
        }
        
        if(now_playing){
            document.getElementById("listening-time").innerHTML = `
            <img id="listening-gif" width="50px" height="50px" src="./imgs/kirbyheadphone.gif" alt="">
            <div id="listening-now">Listening now! </div>
            `

            document.getElementById("listening-time-mobile").innerHTML = `
            <img id="listening-gif-mobile"  src="./imgs/kirbyheadphone.gif" alt="">
            <div id="listening-now-mobile">Listening now! </div>
            `
        }
        
        else{
            document.getElementById("listening-time").innerHTML = `
            <img id="listening-gif" width="80px" height="80px" src="./imgs/sleeping.gif" alt="">
            <div id="listening-now">${relative_time} </div>
            `

            document.getElementById("listening-time-mobile").innerHTML = `
            <img id="listening-gif-mobile"  src="./imgs/sleeping.gif" alt="">
            <div id="listening-now-mobile">${relative_time} </div>
            `
        }        
    
    lastSongName = track
}
updateLastFmData()
let checkSong = setInterval(updateLastFmData,3000);





// ? End of block






let promises = []
let reposToInclude = [
    "journal",
    "dual-shock.github.io",
    "uni.todo"
]



async function loadPortfolioLinks(){
    for(let i=0;i<reposToInclude.length;i++){
        promises.push(
            fetch(
                `https://api.github.com/repos/dual-shock/${reposToInclude[i]}/git/trees/main?recursive=1`)
            .then((response) => response.json())
        )
    }
}



try {
    loadPortfolioLinks();

    let data = await Promise.all(promises)
    console.log(data)
    let listOfPaths = []
    for(let i = 0; i < data.length; i++){
        let trees = data[i].tree
        listOfPaths.push({
            path: `resources/portfolio/${trees[0].url.split("/")[5]}`,
            type: 'tree',
            url: `https://github.com/dual-shock/${trees[0].url.split("/")[5]}/`,
            urlEnd: ""
        })
        for(let i=0;i<trees.length;i++){
            let tree = trees[i]
            tree.path = `resources/portfolio/${tree.url.split("/")[5]}/${tree.path}`
            if(tree.path.split('/')[1]=="portfolio" && tree.path.split('/').length > 2 ){
                listOfPaths.push({
                    path: tree.path,
                    type: tree.type,
                    url: `https://github.com/dual-shock/${trees[0].url.split("/")[5]}/`,
                    urlEnd: tree.path.replace(`resources/portfolio/${tree.url.split("/")[5]}/`,"")
                })
            }
        }
    }
    //console.log(listOfPaths)
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



