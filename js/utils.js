function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}
function toggleDropdownShow(){
    if(document.querySelector(".dropdown").classList.contains("display-dropdown")){
        document.querySelector("#content").style.filter = "brightness(100%)"
        document.querySelector(".dropdown").classList.toggle("display-dropdown")
    }
    else{
        document.querySelector("#content").style.filter = "brightness(50%)"        
        document.querySelector(".dropdown").classList.toggle("display-dropdown")         
    }
}
function convertRemToPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
function calcLimit(){
    return Math.abs(1.5 * main.offsetHeight - main.scrollHeight)
}
function smoothScroll(selector){
    document.querySelector(selector).scrollIntoView({
        behavior: 'smooth'
        // TODO SOMETHING WRONG HERE
    });
}
function hierarchy(listOfPaths){
    
    //TODO Change Portfolio source from dual-shock to nøkkenrepo

    let folderSvg = document.getElementsByClassName("folder-svg")[0]
    let arrowSvg = document.getElementsByClassName("arrow-svg")[0]
    let newtabSvg = document.getElementsByClassName("new-tab-svg")[0]
    let containerList = document.createElement('ul')
    containerList.id = "myUL"

    let elementObjs = [{
        elm: containerList,
        id:  "resourcesportfolio"   //listOfPaths[0].path.split('/')[0]
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
            
            let arrowCopy = arrowSvg.cloneNode(true)
            arrowCopy.classList.remove("hide-caret")

            let folderCopy = folderSvg.cloneNode(true)
            folderCopy.classList.remove("hide-caret")

            let newtabCopy = newtabSvg.cloneNode(true)
            newtabCopy.classList.remove("hide-caret")

            titleSpan.appendChild(arrowCopy)
            titleSpan.appendChild(folderCopy)
            titleSpan.innerHTML += filePath[filePath.length - 1] + "&nbsp"

            let githubLink = document.createElement('a')
            githubLink.href = "https://github.com/dual-shock/dual-shock.github.io/tree/main/"+filePath.join('/')
            githubLink.target = "_blank"
            githubLink.innerHTML = "github"
            githubLink.classList.add("folder-link")


            
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
                if(tree.path.substring(0,'imgs/gallery/thumbs/'.length)=='imgs/gallery/thumbs/' && tree.type == "blob"){
                    //console.log(tree.path)
                    let galleryImage = `
                    <li>
                    <a href="./imgs/gallery/pages/${tree.path.split('/')[tree.path.split('/').length - 1]}.html">
                        <img src="${tree.path}"/>
                    </a>
                    </li>
                    `
                    gallery.innerHTML += galleryImage
                }
                if(tree.path.split('/')[1]=="portfolio" && tree.path.split('/').length > 2 ){
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




