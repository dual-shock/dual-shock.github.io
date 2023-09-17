const months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ]
function formatDateForEntry(timestamp){
    let formattedDate = new Date(timestamp*1000).toLocaleString("en-GB", {
        month:"short",
        day: "numeric",
        year: "numeric",
        hour:"numeric",
        minute:"numeric"
    })
    return formattedDate
}
function grab(selector, method = "id"){
    if(method == "id"){
        return document.getElementById(selector)
    }
    if(method=="class"){
        return document.getElementsByClassName(selector)
    }
    if(method=="all"){
        return document.querySelectorAll(selector)
    }
}
function addZero(num){
    if(num<10){
        num = `0${num}`
    }
    return num
}
function emailValid(emailString) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailString.match(validRegex)) {
        return true;
    } 
    else {return false;}
}