let loadImages = true

let filePath, id, 
    parentId, nestedList, titleSpan, child, 
    childElm, parentElm


let oldElm
window.onclick = function(event) {
    if (!event.target.matches(".burger, #dropdown-container, " + 
                                "#burger-svg-path, #burger-svg")){
        let dropdowns = document.getElementsByClassName("dropdown")
        
        for(let i = 0; i < dropdowns.length; i++){
            let openDropdown = dropdowns[i]
            if(openDropdown.classList.contains("display-block")){
                openDropdown.classList.remove("display-block")}}
    }

    if(event.target.matches(".caret")){
        let newElm = event.target
        if(newElm!=oldElm){
            for(let i of newElm.getElementsByClassName("display-none")){
                i.classList.add("display-flex")}

            if(oldElm != undefined){
                for(let i of oldElm.getElementsByClassName("display-none")){
                    i.classList.remove("display-flex")}}
        }
        oldElm = event.target
    }
}
function toggleDropdownShow(){
    document.getElementsByClassName("dropdown")[0].classList.toggle("display-block")
}

let folderSvg = document.getElementsByClassName("folder-svg")[0]
let arrowSvg = document.getElementsByClassName("arrow-svg")[0]
let newtabSvg = document.getElementsByClassName("new-tab-svg")[0]

function hierarchy(listOfPaths){

    let containerList = document.createElement('ul')
    containerList.id = "myUL"

    let elementObjs = [{
        elm: containerList,
        id: listOfPaths[0].path.split('/')[0]
    }]

    for(let i = 0; i < listOfPaths.length; i++){

        let file = listOfPaths[i]
        filePath = file.path.split('/')

        id = filePath.slice(0,filePath.length).join('')
        parentId = filePath.slice(0,filePath.length-1).join('')

        if(file.type=="tree"){
            child = {
                elm: document.createElement('li'),
                path: filePath,
                id: id,
                parentId: parentId
            }

            nestedList = document.createElement('ul')
            nestedList.className = "nested"
            titleSpan = document.createElement('span')
            titleSpan.className = "caret"
            
            arrowCopy = arrowSvg.cloneNode(true)
            arrowCopy.classList.remove("display-none")
            folderCopy = folderSvg.cloneNode(true)
            folderCopy.classList.remove("display-none")


            titleSpan.appendChild(arrowCopy)
            titleSpan.appendChild(folderCopy)

            titleSpan.innerHTML += filePath[filePath.length - 1] + "&nbsp"

            //TODO MAKE GITHUB LINKS ALMOST TRANSPARENT
            //TODO ADD STYLING FOR PORTFOLIO FOLDER LINES, MAKE LIKE vsCODE
            //TODO ADD STYLING TO SOCIAL LINKS, SOLID COLOR SHADOW TO IMAGES
            //TODO ON HOVER / ACTIVE / HIGHLIGTHED FIND IT OUT FOR THE PORTFOLIO

            githubLink = document.createElement('a')
            githubLink.href = "https://github.com/dual-shock/dual-shock.github.io/tree/main/"+filePath.join('/')
            githubLink.target = "_blank"
            githubLink.innerHTML = "github"
            githubLink.classList.add("folder-link", "display-none")

            newtabCopy = newtabSvg.cloneNode(true)
            //newtabCopy.classList.remove("display-none")
            newtabCopy.className = "new-tab-svg"
            newtabCopy.children[0].href = "https://github.com/dual-shock/dual-shock.github.io/tree/main/"+filePath.join('/')
            newtabCopy.children[0].target = "_blank"

            titleSpan.appendChild(githubLink)
            titleSpan.appendChild(newtabCopy)

            child.elm.appendChild(titleSpan)
            child.elm.appendChild(nestedList)

            //console.log("https://github.com/dual-shock/dual-shock.github.io/tree/main/"+filePath.join('/'))

            elementObjs.push(child)

            child.elm.className = "portfolio-list"

        } else {


            
            child = {
                elm: document.createElement('a'),
                path: filePath,
                id: id,
                parentId: parentId
            }   
            child.elm.href = "https://github.com/dual-shock/dual-shock.github.io/blob/main/"+filePath.join('/')
            child.elm.target = "_blank"
            child.elm.appendChild(document.createElement('li'))
            child.elm.children[0].innerHTML = filePath[filePath.length - 1] 
            child.elm.children[0].className = "portfolio-list"
            

            //console.log(child.elm)
            //console.log("https://github.com/dual-shock/dual-shock.github.io/blob/main/"+filePath.join('/'))
            elementObjs.push(child)
        }


        parentElm = elementObjs.find(item => item.id == child.parentId).elm

        if(parentElm.children[1] != undefined){
            parentElm = parentElm.children[1]
        }
        parentElm.appendChild(child.elm)   
    }
    return containerList
}

let gallery = document.getElementById("gallery-list")



function loadGithubSources(){
fetch("https://api.github.com/repos/dual-shock/dual-shock.github.io/git/trees/main?recursive=1")
    .then((response) => response.json())
    .then(data => {
        trees = data.tree
        //console.log(data)
        
        let gallery = document.getElementsByClassName("gallery-ul")[0]
        let portfolio = document.getElementById("portfolio")
        let listOfPaths = []

        for(let i=0;i<trees.length;i++){
            let tree = trees[i]
            if(tree.path.substring(0,'imgs/gallery/'.length)=='imgs/gallery/'){
                //! console.log("tree",i,"is img")
                let galleryImage = `
                <li>
                <a href="./gallery/gallery.html">
                    <img src="${tree.path}""/>
                    <!--div class="gallery-overlay"><span>${tree.path.slice(13)}</span></div-->
                </a>
                </li>
                `
                gallery.innerHTML += galleryImage
            }
            if(tree.path.split('/')[0]=="portfolio" && tree.path.split('/').length > 1){
                listOfPaths.push({
                    path: tree.path,
                    type: tree.type
                })
            }
        }
        portfolio.appendChild(hierarchy(listOfPaths))
        var toggler = document.getElementsByClassName("caret")
        var i
        
        for (i = 0; i < toggler.length; i++) {
          toggler[i].addEventListener("click", function() {
            this.parentElement.querySelector(".nested").classList.toggle("active");
            this.classList.toggle("caret-down");
          });
        }
        
    })
}

if(loadImages){loadGithubSources()}
else{

var toggler = document.getElementsByClassName("caret")
var i

for (i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
    });
}
}

