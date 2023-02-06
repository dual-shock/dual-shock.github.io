let folders = [
    {path:"portfolio/python-dev",
    type:"tree"},
    {path:"portfolio/python-dev/converters",
    type:"tree"},
    {path:"portfolio/python-dev/converters/con1.pk",
    type:"blob"},
    {path:"portfolio/python-dev/converters/con2.pk",
    type:"blob"},
    {path:"portfolio/python-dev/converters/layer",
    type:"tree"},
    {path:"portfolio/python-dev/converters/layer/con3.pk",
    type:"blob"},
    {path:"portfolio/python-dev/traffsys",
    type:"tree"},
    {path:"portfolio/python-dev/traffsys/folder",
    type:"tree"},
    {path:"portfolio/python-dev/traffsys/folder/file.py",
    type:"blob"},


    {path:"portfolio/web-dev",
    type:"tree"},
    {path:"portfolio/web-dev/others",
    type:"tree"},
    {path:"portfolio/web-dev/others/con1.pk",
    type:"blob"},
    {path:"portfolio/web-dev/others/con2.pk",
    type:"blob"},
    {path:"portfolio/web-dev/others/layer",
    type:"tree"},
    {path:"portfolio/web-dev/others/layer/con3.pk",
    type:"blob"}
]

function filepathsToHierarchy(listOfPaths){

    let containerList = document.createElement('ul')
    containerList.id = "myUL"

    let elementObjs = [{
        elm: containerList,
        id: "containerUL"
    }]

    let parent = {
        elm: containerList,
        id: "containerUL"
    }

    let file, filePath, id, parentId, nestedList, titleSpan, child

    for(let i = 0; i < listOfPaths.length; i++){

        file = listOfPaths[i]
        filePath = file.path.split('/')

        id = filePath.slice(0,filePath.length).join('')
        parentId = filePath.slice(0,filePath.length-1).join('')

        

        if(file.type=="tree"){
            folder = {
                elm: document.createElement('li'),
                path: filePath,
                id: id,
                parentId: parentId
            }
            child = folder

            nestedList = document.createElement('ul')
            nestedList.className = "nested"
            titleSpan = document.createElement('span')
            titleSpan.className = "caret"

            titleSpan.innerHTML = filePath[filePath.length - 1]

            folder.elm.appendChild(titleSpan)
            folder.elm.appendChild(nestedList)

            elementObjs.push(folder)

        } else {
            file = {
                elm: document.createElement('li'),
                path: filePath,
                id: id,
                parentId: parentId
            }
            child = file

            file.elm.innerHTML = filePath[filePath.length - 1]
            elementObjs.push(file)
        }



        if(!i){continue}
        
        console.log(i)
        parentElm = elementObjs.find(item => item.id == child.parentId).elm
        
        if(parentElm.children[1] != undefined){
            parentElm = parentElm.children[1]
        }

        console.log(child.elm.outerHTML, parentElm.outerHTML)



    }
    console.log(elementObjs)
}


let portfolioElm = document.createElement('ul')
portfolioElm.id = 'myTESTINGUL'

let elements = [{
    elm: portfolioElm,
    id: "portfolio"
}]
let item, itemPath, folder, folderPath, nested, 
    folderName, file, filePath, id, parentId, 
    parentElm, childElm, testparentElm

for(let i=0;i<folders.length;i++){
    item = folders[i]
    itemPath = item.path.split('/')

    id = itemPath.slice(0,itemPath.length).join('')
    parentId = itemPath.slice(0,itemPath.length-1).join('')

    if(item.type=='tree'){
        folderPath = itemPath
        folder = {
            elm: document.createElement('li'),
            path: itemPath,
            id: id,
            parentId: parentId
        }
        nested = document.createElement('ul')
        nested.className = "nested" 
        folderName = document.createElement('span')
        folderName.className = 'caret'

        folderName.innerHTML = folderPath[folderPath.length - 1]
        folder.elm.appendChild(folderName)
        folder.elm.appendChild(nested)
        elements.push(folder)
    }
    else{
        filePath = itemPath
        file = {
            elm: document.createElement('li'),
            path: itemPath,
            id: id,
            parentId: parentId
        }
        file.elm.innerHTML = filePath[filePath.length - 1]
        elements.push(file)
    }
}


console.log(elements)

for(let i = 1; i < elements.length; i++){
    childElm = elements[i].elm
    console.log("\n\n")

    console.log(elements[i].elm.outerHTML)
    console.log(elements[i].id,elements[i].parentId)

    parentElm = elements.find(item => item.id == elements[i].parentId).elm

    console.log("parent: ", parentElm.outerHTML)
    if(parentElm.children[1]!=undefined){
        parentElm = parentElm.children[1]
    }
    
     
    parentElm.appendChild(childElm)
    console.log(portfolioElm)
}




let testFolio = document.getElementById("myUL")
console.log(testFolio)


