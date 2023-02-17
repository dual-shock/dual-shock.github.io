let loadImages = true

function toggleDropdownShow(){
    document.getElementsByClassName("dropdown")[0].classList.toggle("display-dropdown")
}

window.onclick = function(event) {
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
}

function hierarchy(listOfPaths){
    let folderSvg = document.getElementsByClassName("folder-svg")[0]
    let arrowSvg = document.getElementsByClassName("arrow-svg")[0]
    let newtabSvg = document.getElementsByClassName("new-tab-svg")[0]
    let containerList = document.createElement('ul')
    containerList.id = "myUL"

    let elementObjs = [{
        elm: containerList,
        id: listOfPaths[0].path.split('/')[0]
    }]

    for(let i = 0; i < listOfPaths.length; i++){
        let child
        let file = listOfPaths[i]
        let filePath = file.path.split('/')

        let id = filePath.slice(0,filePath.length).join('')
        let parentId = filePath.slice(0,filePath.length-1).join('')

        if(file.type=="tree"){
            child = {
                elm: document.createElement('li'),
                path: filePath,
                id: id,
                parentId: parentId
            }

            let nestedList = document.createElement('ul')
            nestedList.className = "hide-folder"

            let titleSpan = document.createElement('span')
            titleSpan.className = "caret"
            
            arrowCopy = arrowSvg.cloneNode(true)
            arrowCopy.classList.remove("hide-caret")

            folderCopy = folderSvg.cloneNode(true)
            folderCopy.classList.remove("hide-caret")

            titleSpan.appendChild(arrowCopy)
            titleSpan.appendChild(folderCopy)
            titleSpan.innerHTML += filePath[filePath.length - 1] + "&nbsp"

            githubLink = document.createElement('a')
            githubLink.href = "https://github.com/dual-shock/dual-shock.github.io/tree/main/"+filePath.join('/')
            githubLink.target = "_blank"
            githubLink.innerHTML = "github"
            githubLink.classList.add("folder-link", "hide-caret")

            newtabCopy = newtabSvg.cloneNode(true)
            newtabCopy.className = "new-tab-svg"
            newtabCopy.children[0].href = "https://github.com/dual-shock/dual-shock.github.io/tree/main/"+filePath.join('/')
            newtabCopy.children[0].target = "_blank"

            titleSpan.appendChild(githubLink)
            titleSpan.appendChild(newtabCopy)

            child.elm.appendChild(titleSpan)
            child.elm.appendChild(nestedList)

            elementObjs.push(child)

            child.elm.className = "portfolio-list"

        } 
        else {            
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
            
            elementObjs.push(child)
        }

        let parentElm = elementObjs.find(item => item.id == child.parentId).elm

        if(parentElm.children[1] != undefined){
            parentElm = parentElm.children[1]
        }
        parentElm.appendChild(child.elm)   
    }
    return containerList
}

function loadGithubSources(){
fetch("https://api.github.com/repos/dual-shock/dual-shock.github.io/git/trees/main?recursive=1")
    .then((response) => response.json()).then(data => {
        trees = data.tree

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
        let toggler = document.getElementsByClassName("caret")
        
        for (let i = 0; i < toggler.length; i++) {
          toggler[i].addEventListener("click", function() {
            this.parentElement.querySelector(".hide-folder").classList.toggle("active");
            this.classList.toggle("caret-down");
          });
        }
        
    })
}

if(loadImages){loadGithubSources()}

else{
    let toggler = document.getElementsByClassName("caret")

    for (let i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function() {
        this.parentElement.querySelector(".hide-folder").classList.toggle("active");
        this.classList.toggle("caret-down");
        });
    }
}

