
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

