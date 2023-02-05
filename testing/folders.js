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


let folioContainer = document.createElement('div')
let lastItem = document.createElement('ul')
lastItem.id = 'myUL'
let lastItemPath = ["portfolio"]



for(let i=0;i<folders.length;i++){

    let item = folders[i]

    let itemPath = item.path.split('/')
    if(item.type=='tree'){
        //console.log(item.path.split('/'))
        let folderPath = itemPath
        let folder = document.createElement('li')
        
        let folderName = document.createElement('span')
        folderName.className = 'caret'
        folderName.innerHTML = folderPath[folderPath.length - 1]
        folder.appendChild(folderName)
        
        //console.log(folder.outerHTML)
        console.log(folderPath)
    }
    else{
        let filePath = itemPath
        let file = document.createElement('li')
        file.innerHTML = filePath[filePath.length - 1]
        //console.log(file.outerHTML)
        console.log(filePath)
    }
    console.log(lastItemPath[lastItemPath.length - 1], itemPath[itemPath.length - 2])
    if(lastItemPath[lastItemPath.length - 1] == itemPath[itemPath.length - 2]){
        //console.log("belkongs to top")
        console.log("add bottom to above")
    }
    else{
        //go thru all folders and find 
        //the matching one and append to that
        
    }
    else{

    }
    lastItem = folders[i]
    lastItemPath = lastItem.path.split('/')

}


