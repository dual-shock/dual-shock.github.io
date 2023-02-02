function toggleDropdownShow(){
    document.getElementById("dropdown").classList.toggle("show-dropdown")
    console.log("toggled dropdown")
}
window.onclick = function(event) {
    if (!event.target.matches(".burger, #dropdown-container, #burgersvgpath")){
        console.log("somewhere not burger clicked, hiding dropdown content")
        console.log(event.target)
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


function addImagesToGallery(amtOfImgs) {
    let imgs = fs.readDir('./imgs/')
    for(let i = 0; i < amtOfImgs; i++){
        console.log(imgs)
}
}

fetch("https://api.github.com/repos/dual-shock/dual-shock.github.io/git/trees/main?recursive=1")
  .then((response) => response.json())
  .then(data => {
      trees = data.tree
      console.log(data.tree)
      
      for(let i=0;i<trees.length;i++){
          tree = trees[i]
          if(tree.type!="blob"){
              console.log("tree",i,"not blob")
              trees.splice(i, 1)
              i = i - 1
          }
          
      }

      console.log(trees)
    })



