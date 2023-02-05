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
    type:"blob"},
    {path:"portfolio/python-dev/traffsys/folder",
    type:"blob"},
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



let portfolio = document.createElement('ul')
portfolio.id = 'myUL'



let elements = []

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
        elements.push(folder)
        //console.log(folder.outerHTML)
        console.log(folderPath)
    }
    else{
        let filePath = itemPath
        let file = document.createElement('li')
        file.innerHTML = filePath[filePath.length - 1]
        elements.push(file)
        //console.log(file.outerHTML)
        console.log(filePath)
    }


}

console.log(portfolio.outerHTML)
for(let i=0;i<elements.length;i++){
    console.log(elements[i].outerHTML)
}


let testFolio = document.getElementById("myUL")
console.log(testFolio.outerHTML)



