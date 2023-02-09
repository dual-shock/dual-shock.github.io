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

            titleSpan.innerHTML = filePath[filePath.length - 1]

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

        parentElm = elementObjs.find(item => item.id == child.parentId).elm

        if(parentElm.children[1] != undefined){
            parentElm = parentElm.children[1]
        }
        parentElm.appendChild(child.elm)   
    }
    return containerList
}
