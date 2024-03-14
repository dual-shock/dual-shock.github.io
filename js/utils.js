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
        console.log(filePath)

        let id = filePath.slice(0,filePath.length).join('')
        let parentId = filePath.slice(0,filePath.length-1).join('')
        let urlEnd = filePath.join("/").replace("resources/portfolio/","")

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
            if(filePath[filePath.length - 1] == "journal"){
                titleSpan.innerHTML += "<a style='color:rgba(46, 240, 182, 0.712);' href='https://nixie.digital/journal'>journal<a>"
            }
            else if(filePath[filePath.length - 1] == "dual-shock.github.io"){
                titleSpan.innerHTML += "<a style='color:rgba(46, 240, 182, 0.712);' href='https://nixie.digital'>nixie.digital<a>"
            }
            else if(filePath[filePath.length - 1] == "uni.todo"){
                titleSpan.innerHTML += "<a style='color:rgba(46, 240, 182, 0.712);' href='https://nixie.digital/uni.todo'>uni.todo<a>"
            }
            else{
                titleSpan.innerHTML += filePath[filePath.length - 1] + "&nbsp"
            }

            

            let githubLink = document.createElement('a')
            githubLink.href = `${file.url}tree/main/`+file.urlEnd
            githubLink.target = "_blank"
            githubLink.innerHTML = "github"
            githubLink.classList.add("folder-link")


            
            newtabCopy.children[0].href = `${file.url}tree/main/`+file.urlEnd
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

            child.elm.href = `${file.url}blob/main/`+file.urlEnd
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


function loadGalleryLinks(link){
    
    fetch(link, {headers: {
        'Authorization':'token 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'
    }}  // ! Yes this is a personal access token, should be hidden static site WHATEVER its read only
        // ! just pretty please dont read my own 4 repos 5000 times an hours :sob: 
    )
        .then((response) => response.json()).then(data => {
            
            let trees = data.tree
            
            let gallerySurr = document.getElementsByClassName("gallery-surr")[0]
            let gallerySelf = document.getElementsByClassName("gallery-self")[0]

            for(let i=0;i<trees.length;i++){
                let tree = trees[i]
                if(tree.path.substring(0,'imgs/gallery-surr/thumbs/'.length)=='imgs/gallery-surr/thumbs/' && tree.type == "blob"){
                    console.log("SURR IMGS",tree.path)
                    let galleryImage = `
                    <li>
                    <a href="./imgs/gallery-surr/pages/${tree.path.split('/')[tree.path.split('/').length - 1]}.html">
                        <img src="${tree.path}"/>
                    </a>
                    </li>
                    `
                    gallerySurr.innerHTML += galleryImage
                }
                else if(tree.path.substring(0,'imgs/gallery-self/thumbs/'.length)=='imgs/gallery-self/thumbs/' && tree.type == "blob"){
                    console.log("SELF IMGS",tree.path)
                    let galleryImage = `
                    <li>
                    <a href="./imgs/gallery-self/pages/${tree.path.split('/')[tree.path.split('/').length - 1]}.html">
                        <img src="${tree.path}"/>
                    </a>
                    </li>
                    `
                    gallerySelf.innerHTML += galleryImage
                }
            }            
        })
}




