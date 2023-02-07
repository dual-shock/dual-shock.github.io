let loadImages = true

window.onclick = function(event) {
    if (!event.target.matches(".burger, #dropdown-container, #burgersvgpath")){
        //! console.log("somewhere not burger clicked, hiding dropdown content")
        //! console.log(event.target)
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i=0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show-dropdown")) {
                openDropdown.classList.remove("show-dropdown")
            }
        }
    }
}
function toggleDropdownShow(){
    document.getElementById("dropdown").classList.toggle("show-dropdown")
    //! console.log("toggled dropdown")
}

let folderSvg = document.getElementById("folder-svg")

let arrowSvg = document.getElementById("arrow-svg")

function hierarchy(listOfPaths){

    let containerList = document.createElement('ul')
    containerList.id = "myUL"

    let elementObjs = [{
        elm: containerList,
        id: listOfPaths[0].path.split('/')[0]
    }]


    let file, filePath, id, parentId, nestedList, titleSpan, child, childElm, parentElm

    for(let i = 0; i < listOfPaths.length; i++){

        file = listOfPaths[i]
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
            arrowCopy.classList.remove("hide-svgs")
            folderCopy = folderSvg.cloneNode(true)
            folderCopy.classList.remove("hide-svgs")


            titleSpan.appendChild(arrowCopy)
            titleSpan.appendChild(folderCopy)

            titleSpan.innerHTML += filePath[filePath.length - 1]

            child.elm.appendChild(titleSpan)
            child.elm.appendChild(nestedList)

            elementObjs.push(child)

        } else {
            child = {
                elm: document.createElement('li'),
                path: filePath,
                id: id,
                parentId: parentId
            }

            child.elm.innerHTML = filePath[filePath.length - 1]
            elementObjs.push(child)
        }
        child.elm.className = "portfolio-list"

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
        
        let gallery = document.getElementById("gallery-list")
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

