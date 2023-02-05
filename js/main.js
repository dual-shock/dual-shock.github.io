let loadImages = true


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
function toggleDropdownShow(){
    document.getElementById("dropdown").classList.toggle("show-dropdown")
    console.log("toggled dropdown")
}

let gallery = document.getElementById("gallery-list")

function loadGithubSources(){
fetch("https://api.github.com/repos/dual-shock/dual-shock.github.io/git/trees/main?recursive=1")
    .then((response) => response.json())
    .then(data => {
        trees = data.tree
        console.log(data.tree)
        let gallery = document.getElementById("gallery-list")
        let portfolio = document.getElementById("")

        for(let i=0;i<trees.length;i++){
            tree = trees[i]
            if(tree.path.substring(0,'imgs/gallery/'.length)=='imgs/gallery/'){
                console.log("tree",i,"is img")
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
            if(tree.path.substring(0,'portfolio/'.length)=='portfolio/'){
                //console.log("tree",i,"is portfolio")
            }




        }
    })
}
if(loadImages){loadGithubSources()}




var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
}


