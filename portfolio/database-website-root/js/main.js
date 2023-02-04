let useApi = false

let listView = false
let validAdd = false


let officialChecked = false 
let onlineChecked = false
let rankChecked = true
let popChecked = false


let feedEl = document.getElementById("feed")
let officialButton
let onlineButton
let rankButton
let popButton
let viewLabel
let buttonIds
let ranks
let statusBool
let moddedBool
let serverId
let serverTitle
let rankNumber
let popNumber
let ipString
let uptimeNumber
let statusTopOption
let statusBottomOption
let moddedTopOption
let moddedBottomOption
let hostNumber
let addressString
let delButtonId
let delDocId
let errorMessage
let addServerTitleEl
let invalidInputEl
let serverTitleInput
let rankInput
let popInput
let ipInput
let str
let docId
let uptimeInput
let hostInput
let addressInput
let addOnlineChecked
let addOfficialChecked
let tableStatusInput
let tableOfficialInput
let tableModdedBool
let tableStatusBool
let idTitleInput
let idRankInput
let idPopInput
let idOfficialInput
let idStatusInput
let idUptimeInput
let idAddressInput
let idHostInput
let idModdedBool
let idStatusBool
let idHostValue
let idAddressValue
let idFullIp
let idDocId
let invalidAddCell
let ipSplit
let rowClass
let oddVar


let searchInput
let searchInputText
let searchQuerys
let searchQueryText







let db 
let collectionName = `servers`
let orderBy = `rank`
let way=`asc`
let dbDocs
const firebaseConfig = {
//TODO ADD CONFIG
}
firebase.initializeApp(firebaseConfig);
dbEvent("app init")


db = firebase.firestore();


if(useApi){
    collectionName = `bmservers`
}

function update(order, way){
    dbEvent("updating. . .")
    db.collection(collectionName).orderBy(order, way).get().then((snapshot)=> {
        dbDocs = snapshot.docs;
        printServers(officialChecked, onlineChecked, rankChecked, popChecked, dbDocs)
        dbEvent("updated")
    })
    
}
update(orderBy, way)


db.collection(collectionName).onSnapshot(snapshot => {
    dbEvent("snapshot")
    update(orderBy, way)
})



document.getElementById("searchbar").addEventListener("keyup",function(){
    searchInput = document.getElementById("searchbar")
    searchInputText = searchInput.value.toLowerCase()
    searchQuerys = document.querySelectorAll(".search-filter")
    oddVar = -1
    for(let i = 0; i < searchQuerys.length; i++){
        searchQueryText = searchQuerys[i].children
        searchQueryText = searchQueryText[0]
        searchQueryText = searchQueryText.children
        searchQueryText = searchQueryText[0]
        searchQueryText = searchQueryText.value
        searchQueryText = searchQueryText.toLowerCase()
        if(searchQueryText.indexOf(searchInputText) > -1){
            oddVar++
            oddVar%2==0  ? searchQuerys[i].className = "data-row data-row-odd search-filter" : searchQuerys[i].className = "data-row search-filter"
            searchQuerys[i].style.display = ""
        }
        else{ searchQuerys[i].style.display = "none" }
    }
})


officialButton = document.getElementById("official-button-input")
officialButton.addEventListener("click",function(){
    if(officialChecked){
        officialChecked = false
        officialButton.style.backgroundImage = "none"
    }
    else{
        officialChecked = true
        officialButton.style.backgroundImage = "linear-gradient(to right, rgba(46, 240, 204, 0.5), rgba(46, 240, 204, 0.9))"
    }

    genEvent(`officialchecked:${officialChecked}`)
    update(orderBy, way)
})


onlineButton = document.getElementById("online-button-input")
onlineButton.addEventListener("click",function(){
    if(onlineChecked){
        onlineChecked = false
        onlineButton.style.backgroundImage = "none"
    }
    else{
        onlineChecked = true
        onlineButton.style.backgroundImage = "linear-gradient(to right, rgba(46, 240, 204, 0.5), rgba(46, 240, 204, 0.9))"
    }

    genEvent(`onlinechecked:${onlineChecked}`)
    update(orderBy, way)

})


rankButton = document.getElementById("rank-button-input")
rankButton.addEventListener("click", function(){
    if(rankChecked){
        rankChecked = true
        popChecked = false
        popButton.style.backgroundImage = "none"
        rankButton.style.backgroundImage = "linear-gradient(to right, rgba(46, 240, 204, 0.5), rgba(46, 240, 204, 0.9))"
        orderBy = `population`, way=`desc`
    }
    if(popChecked){
        rankChecked = true
        popChecked = false
        popButton.style.backgroundImage = "none"
        rankButton.style.backgroundImage = "linear-gradient(to right, rgba(46, 240, 204, 0.5), rgba(46, 240, 204, 0.9))"
        orderBy = `rank`, way = `asc`
    }

    genEvent(`rankchecked:${rankChecked}, popchecked:${popChecked}`)
    update(orderBy, way)

})




popButton = document.getElementById("pop-button-input")
popButton.addEventListener("click",function(){
    if(rankChecked){
        rankChecked = false
        popChecked = true
        rankButton.style.backgroundImage = "none"
        popButton.style.backgroundImage = "linear-gradient(to right, rgba(46, 240, 204, 0.5), rgba(46, 240, 204, 0.9))"
        orderBy = `rank`, way = `asc`
    }
    if(popChecked){
        rankChecked = false
        popChecked = true
        rankButton.style.backgroundImage = "none"
        popButton.style.backgroundImage = "linear-gradient(to right, rgba(46, 240, 204, 0.5), rgba(46, 240, 204, 0.9))"
        orderBy = `population`, way=`desc`
    }

    genEvent(`rankchecked:${rankChecked}, popchecked:${popChecked}`)
    update(orderBy, way)

})




viewLabel = document.getElementById("view-label")


function printServers(official, online, rank, pop, docs){
    
    genEvent("printing. . . ")
    if(listView){

        addOnlineChecked = false, 
        addOfficialChecked = false
        feedEl.innerHTML = ``
        
        feedEl.innerHTML += `
        <div id="table-view-container">
            <label id="table-view-label">FIELD&nbspEDITOR&nbsp&nbsp(TABLE&nbspVIEW)
                <button id="table-view-button">
                </button>
            </label>
        </div>
        <div id="add-container">
            <div class="server-title" id="add-server-title">
                <input type="text" placeholder="ADD SERVER" id="add-name-input">
                <label class="add-label">ADD
                    <button class="add-button" id="add-server-button">
                    </button>
                </label>                            
            </div>
            <br>
            <div class="description">
                <div class="rank">
                    <div class="column">RANK:</div>
                    <div class="rank-content">
                        <input id="rank-input" type="number" max="999" placeholder="0">
                    </div>
                </div>  
                <div class="population">
                    <div class="column">POPULATION:</div>
                    <div class="population-content">
                        <input id="population-input" type="number"  max="999" placeholder="0">
                    </div>
                </div>
                <div class="ip">
                    <div class="column">IP ADDRESS:</div>
                    <div class="ip-content">
                        <input id="ip-input" type="text" placeholder="ip.address : 00000">
                    </div>
                </div>
                <div class="status">
                    <div class="column">ONLINE:</div>
                    <div class="status-content" id="add-online-container">
                        <label id="add-online-label">
                            <button id="add-online-button">
                            </button>
                        </label>
                    </div>
                </div>
                <div class="official">
                    <div class="column">OFFICIAL:</div>
                    <div class="official-content" id="add-official-container">
                        <label id="add-official-label">
                            <button id="add-official-button">

                            </button>
                        </label>
                    </div>
                </div>  
                <div class="uptime">
                    <div class="column">UPTIME:</div>
                    <div class="uptime-content">
                        <input id="uptime-input" type="number" max="100" placeholder="0">% last 30 days
                    </div>
                </div>
            </div>
            <br><br><br><br>
        </div>`
        
        buttonIds = []
        ranks = []


        for(let i = 0; i < docs.length; i++){

            statusBool = docs[i].data().data.status

            if(online && !statusBool){continue}

            statusBool ? statusBool = "online": statusBool = "offline"


            moddedBool = docs[i].data().data.modded

            if(official && moddedBool){continue}

            moddedBool ? moddedBool = "no" : moddedBool = "yes"


            serverId    = docs[i].id
            serverTitle = docs[i].data().name
            rankNumber  = docs[i].data().rank
            popNumber   = docs[i].data().population
            ipString    = docs[i].data().data.ip
            uptimeNumber = docs[i].data().data.uptime

            feedEl.innerHTML += `
            <div class="server-container">
                <div class="server-title">${serverTitle}
                    <label class="delete-label">DELETE
                        <button class="delete-button" id='${serverId}'>

                        </button>
                    </label>                             
                </div>
                <br>
                <div class="description">
                    <div class="rank">
                        <div class="column">RANK:</div>
                        <div class="rank-content">#${rankNumber}</div>
                    </div>  
                    <div class="population">
                        <div class="column">POPULATION:</div>
                        <div class="population-content">${popNumber}</div>
                    </div>
                    <div class="ip">
                        <div class="column">IP ADDRESS:</div>
                        <div class="ip-content">${ipString}</div>
                    </div>
                    <div class="status">
                        <div class="column">STATUS:</div>
                        <div class="status-content">${statusBool}</div>
                    </div>
                    <div class="official">
                        <div class="column">OFFICIAL:</div>
                        <div class="official-content">${moddedBool}</div>
                    </div>  
                    <div class="uptime">
                        <div class="column">UPTIME:</div>
                        <div class="uptime-content">${uptimeNumber}% last 30 days</div>
                    </div>
                </div>
                <br><br><br><br>
            </div>`


            buttonIds.push(serverId)
            ranks.push(rankNumber)
        }



        for(let j = 0; j < buttonIds.length; j++){

            document.getElementById(buttonIds[j]).addEventListener("click", function(e){

                db.collection(collectionName).doc(e.target.id).delete()
                update(orderBy, way)
            })
        }


        document.getElementById('table-view-button').addEventListener("click",function(){

            listView = false
            update(orderBy, way)
        })


        document.getElementById('add-online-button').addEventListener("click", function(e){

            if(addOnlineChecked){
                addOnlineChecked = false
                e.target.style.backgroundImage = "none"
            }


            else{
                addOnlineChecked = true
                e.target.style.backgroundImage = "linear-gradient(to right, rgba(46, 240, 204, 0.5), rgba(46, 240, 204, 0.9))"
            }
        })


        document.getElementById('add-official-button').addEventListener("click",function(e){

            if(addOfficialChecked){
                addOfficialChecked = false
                e.target.style.backgroundImage = "none"
            }

            
            else{
                addOfficialChecked = true
                e.target.style.backgroundImage = "linear-gradient(to right, rgba(46, 240, 204, 0.5), rgba(46, 240, 204, 0.9))"
            }
        })

        
        document.getElementById('add-server-button').addEventListener("click",function(){

            validAdd = true

            errorMessage = "INVALID INPUT"

            addServerTitleEl = document.getElementById("add-server-title")

            invalidInputEl = document.createElement("label")
            invalidInputEl.className = "invalid-label"
            invalidInputEl.setAttribute('id', 'invalid-label') 

            serverTitleInput = document.getElementById("add-name-input")

            rankInput = document.getElementById("rank-input")


            if(ranks.includes(Number(rankInput.value))){

                validAdd = false
                errorMessage = "RANK ALREADY USED" 
            }
            

            popInput = document.getElementById("population-input")
            
            ipInput = document.getElementById("ip-input")

            str = ipInput.value
            docId = ipInput.value
            str = str.substring(str.length - 6)

            uptimeInput = document.getElementById("uptime-input")

            docId = docId.replace(/[^a-zA-Z0-9]/g, '')


            for(let n = 0; n < buttonIds.length; n++){

                if(docId.toLowerCase() == buttonIds[n].toLowerCase()){

                    validAdd = false
                    errorMessage = "IP / SERVER ALREADY IN LIST"
                }
            }


            if(serverTitleInput.value == ""){

                validAdd = false
                errorMessage = "SERVER NAME INVALID"            
            }


            if(rankInput.value=="0" || rankInput.value < 1 || rankInput.value > 999 || rankInput.value == ""){

                validAdd = false
                errorMessage = "RANK OUT OF RANGE (MUST BE > 1 and < 999)" 
            }


            if(popInput.value < 0 || popInput.value > 999 || popInput.value == ""){

                validAdd = false
                errorMessage = "POPULATION OUT OF RANGE (MUST BE >= 0 and < 999)" 
            }


            if(ipInput.value == ""){

                validAdd = false
                errorMessage = "INVALID IP ADDRESS"             
            }


            if(str.substring(str.length - 5).match(/^[0-9]+$/) == null){

                validAdd = false
                errorMessage = "INVALID IP PORT" 
            }


            if(str.charAt(0) !== ":"){

                validAdd = false
                errorMessage = "INVALID IP ADDRESS FORMAT" 
            }


            if(uptimeInput.value < 0 || uptimeInput.value > 100 || uptimeInput.value == ""){

                validAdd = false
                errorMessage = "UPTIME % OUT OF RANGE (MUST BE >=0 and < 100)"
            }


            if(validAdd){
                try{
                    document.getElementById("invalid-label").remove()  
                }
                catch{
                    errEvent("no label to remove")
                }
                db.collection(collectionName).doc(docId).set(
                    {
                        data:{
                            ip: ipInput.value,
                            modded: addOfficialChecked,
                            status: addOnlineChecked,
                            uptime: Number(uptimeInput.value)
                        },
                        name:serverTitleInput.value,
                        population: Number(popInput.value),
                        rank:Number(rankInput.value)
                    }
                )
                update(orderBy, way)
            }

            else{
                errEvent(errorMessage)
                try{
                    document.getElementById("invalid-label").remove()  
                }
                catch{
                    errEvent("no label to remove")
                }
                invalidInputEl.innerHTML = `INVALID INPUT&nbsp&nbsp:&nbsp&nbsp${errorMessage}`
                addServerTitleEl.appendChild(invalidInputEl)
            }
        })        
    }
    


    else{
        buttonIds = []
        ranks = []
        feedEl.innerHTML = `
        `

        feedEl.innerHTML = feedEl.innerHTML + `
            <table id="main-table">
                <tr id="title-row">
                    <th class="title-cell" id="name-cell">NAME</th>
                    <th class="title-cell" id="rank-cell">RANK</th>
                    <th class="title-cell" id="pop-cell">POP</th>
                    <th class="title-cell" id="modded-cell">OFFICIAL</th>
                    <th class="title-cell" id="status-cell">STATUS</th>
                    <th class="title-cell" id="uptime-cell">UTPIME</th>
                    <th class="title-cell" id="ip-cell">IP ADDRESS</th>
                    <th class="title-cell" id="id-cell">IDENTIFIER</th>
                    <th class="title-cell add-edit-header-cell"  id="button-cell-top">
                    


                        
                    </th>
                </tr>
                <tr id="info-row">
                    <th class="info-cell"></th>
                    <th class="info-cell">* max : 999</th>
                    <th class="info-cell">* max : 999</th>
                    <th class="info-cell"></th>
                    <th class="info-cell"></th>
                    <th class="info-cell">* max : 100%</th>
                    <th class="info-cell">* port must be 5 numbers</th>
                    <th class="info-cell"></th>
                    <th class="info-cell add-edit-header-cell"  id="button-cell">
                        <button id="view-button">
                            <label id="view-label">
                            &nbsp&nbsp&nbspBACK&nbspTO&nbspLIST&nbspVIEW
                            </label>
                        </button>
                    </th>
                </tr>
                <tr class="data-row input-row">
                    <td class="data-cell">
                        <input type="text" id="table-add-server-title" class="cell-text-input name-cell-label" placeholder="SERVER NAME">
                    </td>
                    <td class="data-cell">
                        #<input type="number" id="table-add-rank" class="cell-number-input cell-rank-input" placeholder="0" min="1" max="999">
                    </td>
                    <td class="data-cell">
                        <input type="number" id="table-add-pop" class="cell-number-input cell-pop-input" placeholder="0" min="0" max="999">
                    </td>
                    <td class="data-cell">
                        <select id="table-add-official" class="cell-select-input">
                            <option value='true' class="cell-option-input">true</option>
                            <option value='false' class="cell-option-input">false</option>
                        </select>
                    </td>
                    <td class="data-cell">
                        <select id="table-add-status" class="cell-select-input">
                            <option value="online" class="cell-option-input">online</option>
                            <option value="offline" class="cell-option-input">offline</option>
                        </select>
                    </td>
                    <td class="data-cell">
                        <input type="number" id="table-add-uptime" class="cell-number-input cell-uptime-input" placeholder="0" min="0" max="100">%
                    </td>
                    <td class="data-cell">
                        <input type="text" id="table-add-address" class="cell-text-input cell-ip-input" placeholder="ADDRESS">
                        <b>&nbsp:&nbsp&nbsp</b><input type="number" id="table-add-host" class="cell-number-input cell-host-input" placeholder="00000" min="0" max="99999">
                    </td>
                    <td class="data-cell" id="invalid-add-cell">
                        
                    </td>
                    <td class="data-cell add-edit-cell">
                        <button id="add-server-table-button">
                            <label id="add-server-table-label">ADD SERVER</label>
                        </button>
                    </td>         
                </tr> 


            </table>
        `






        let tableEl = document.getElementById("main-table")

        oddVar = -1

        for (let i = 0; i < docs.length; i++){


            statusBool = docs[i].data().data.status
            if(online && !statusBool)continue
            if(statusBool){
                statusTopOption = "online"
                statusBottomOption ="offline"
            }
            else{
                statusTopOption = "offline"
                statusBottomOption ="online"
            }
            

            moddedBool = docs[i].data().data.modded
            if(official && moddedBool)continue
            if(moddedBool){
                moddedTopOption = "false"
                moddedBottomOption = "true"
            }
            else{
                moddedTopOption = "true"
                moddedBottomOption = "false"
            }
            

            
            oddVar++

            serverId    = docs[i].id
            serverTitle = docs[i].data().name
            rankNumber  = docs[i].data().rank
            popNumber   = docs[i].data().population
            ipString    = docs[i].data().data.ip
            uptimeNumber = docs[i].data().data.uptime
            
            ipSplit = ipString.split(":")
            //console.log(ipSplit)
            hostNumber = ipSplit[ipSplit.length - 1]
            addressString = ipSplit[ipSplit.length - 2]

            rowClass = "data-row"
            if(oddVar%2==0){rowClass = "data-row data-row-odd"}

            tableEl.innerHTML = tableEl.innerHTML + `
                <tr class='${rowClass} search-filter'>
                    <td class="data-cell">
                        <input type="text" id='title-input-${serverId}' data-id='${serverId}' class="cell-text-input name-cell-label search-query" value='${serverTitle}'>
                    </td>
                    <td class="data-cell">
                        #<input type="number" id='rank-input-${serverId}' data-id='${serverId}' class="cell-number-input cell-rank-input" value='${rankNumber}' min="1" max="999">
                    </td>
                    <td class="data-cell">
                        <input type="number" id='pop-input-${serverId}' data-id='${serverId}' class="cell-number-input cell-pop-input" value='${popNumber}' min="0" max="999">
                    </td>
                    <td class="data-cell">
                        <select id='official-input-${serverId}' data-id='${serverId}' class="cell-select-input">
                            <option value='${moddedTopOption}' class="cell-option-input">${moddedTopOption}</option>
                            <option value='${moddedBottomOption}' class="cell-option-input">${moddedBottomOption}</option>
                        </select>
                    </td>
                    <td class="data-cell">
                        <select id='status-input-${serverId}' data-id='${serverId}' class="cell-select-input">
                            <option value='${statusTopOption}' class="cell-option-input">${statusTopOption}</option>
                            <option value='${statusBottomOption}' class="cell-option-input">${statusBottomOption}</option>
                        </select>
                    </td>
                    <td class="data-cell">
                        <input type="number" id='uptime-input-${serverId}' data-id='${serverId}' class="cell-number-input cell-uptime-input" value='${uptimeNumber}' min="0" max="999">
                    </td>
                    <td class="data-cell">
                        <input type="text" id='address-input-${serverId}' data-id='${serverId}' class="cell-text-input cell-ip-input" value='${addressString}'>
                        <b>&nbsp:&nbsp&nbsp</b><input type="number" id='host-input-${serverId}' data-id='${serverId}' class="cell-number-input cell-host-input" value='${hostNumber}' min="0" max="99999">
                    </td>
                    <td class="data-cell id-cell">
                        ${serverId}
                    </td>
                    <td class="data-cell add-edit-cell">

                        <button class="delete-edit-button" >
                            <label class="delete-edit-label" id='del-${serverId}'>DELETE</label>
                        </button>
                    </td>         
                </tr>
            `
            buttonIds.push(serverId)
            ranks.push(rankNumber)

        }
        tableEl.innerHTML = tableEl.innerHTML + `
            <tr>
                <div id="test123">
                    hello hello, test test
                </div>
            </tr>
        `










        delButtonId = ""
        delDocId = ""

        for (let j = 0; j < buttonIds.length; j++){
            delButtonId = `del-${buttonIds[j]}`
            document.getElementById(delButtonId).addEventListener("click",function(e){
                delDocId = e.target.id
                delDocId = delDocId.substring(4)
                db.collection(collectionName).doc(delDocId).delete();
                update(orderBy, way)
            })
        }


        document.getElementById("add-server-table-button").addEventListener("click", function(){
            validAdd = true
            errorMessage = "INVALID INPUT"

            invalidAddCell = document.getElementById("invalid-add-cell")
            invalidInputEl = document.createElement("label")
            invalidInputEl.className = "invalid-table-label"
            invalidInputEl.setAttribute('id', 'invalid-label') 



            serverTitleInput = document.getElementById("table-add-server-title")

            rankInput = document.getElementById("table-add-rank")
            console.log("HERE HERE HERE",rankInput.value)
            if(ranks.includes(Number(rankInput.value))){
                validAdd = false
                errorMessage = "RANK ALREADY IN USE"
            }
            
            popInput = document.getElementById("table-add-pop")
            

            tableOfficialInput = document.getElementById("table-add-official")
            console.log("tableOfficialInput.value:::",tableOfficialInput.value)
            tableOfficialInput.value == "true" ? tableModdedBool = false : tableModdedBool = true
            console.log("tableModdedBool:::",tableModdedBool)

            tableStatusInput = document.getElementById("table-add-status")
            console.log("tableStatusInput.value",tableStatusInput.value)
            tableStatusInput.value == "online" ? tableStatusBool = true : tableStatusBool = false
            console.log("tableStatusBool:::",tableStatusBool)

            addressInput = document.getElementById("table-add-address")
            hostInput = document.getElementById("table-add-host")

            str = addressInput.value + ':' + hostInput.value
            docId = str
            docId = docId.replace(/[^a-zA-Z0-9]/g, '')
            uptimeInput = document.getElementById("table-add-uptime")

            for(let n = 0; n < buttonIds.length; n++){
                if(docId.toLowerCase() == buttonIds[n].toLowerCase()){
                    validAdd = false
                    errorMessage = "SERVER ALREADY EXISTS"
                }
            }

            if(serverTitleInput.value == ""){
                validAdd = false
                errorMessage = "SERVER NAME INVALID"
            }
            if(rankInput.value=="0" || rankInput.value < 1 || rankInput.value > 999 || rankInput.value ==""){
                validAdd = false
                errorMessage = "RANK OUT OF RANGE" 
            }
            if(popInput.value < 0 || popInput.value > 999 || popInput.value == ""){
                validAdd = false
                errorMessage = "POP OUT OF RANGE" 
            }
            if(addressInput.value == ""){
                validAdd = false
                errorMessage = "INVALID IP ADDRESS"
            }
            if(hostInput.value < 0 || hostInput.value > 99999 || hostInput.value == ""){
                validAdd = false
                errorMessage = "INVALID IP PORT"
            }
            if(uptimeInput.value < 0 || uptimeInput.value > 100 || uptimeInput.value == ""){
                validAdd = false
                errorMessage = "UPTIME % OUT OF RANGE"
            }
            if(validAdd){
                //! REMOVE POSSIBLE INVALID LABEL
                
                try{
                    document.getElementById("invalid-label").remove() 
                }
                catch{
                    errEvent("no label to remove")
                }



                console.log("tableModdedBool",tableModdedBool)
                console.log("tableStatusBool",tableStatusBool)
                db.collection(collectionName).doc(docId).set(
                    {
                        data:{
                            ip:str,
                            modded: tableModdedBool, 
                            status: tableStatusBool,
                            uptime: Number(uptimeInput.value)
                        },
                        name:serverTitleInput.value,
                        population: Number(popInput.value),
                        rank:Number(rankInput.value)
                    }
                )
                update(orderBy, way)
            }
            else{
                errEvent(errorMessage)
                try{
                    document.getElementById("invalid-label").remove()  
                }
                catch{
                    errEvent("no label to remove")
                }
                invalidInputEl.innerHTML = `INVALID INPUT&nbsp&nbsp:&nbsp&nbsp${errorMessage}`
                invalidAddCell.appendChild(invalidInputEl)
            }
        })

        for(let o = 0; o < buttonIds.length; o++){



            idTitleInput  =  document.getElementById(`title-input-${buttonIds[o]}`) 
            idTitleInput.addEventListener("change",function(e){
                
                console.log(e.target.getAttribute(`data-id`))
                console.log(e.target.value)

                validAdd = true

                if(e.target.value == ""){
                    validAdd = false
                    errorMessage = "SERVER NAME INVALID"
                }
                if(validAdd){
                    
                    db.collection(collectionName).doc(e.target.getAttribute(`data-id`)).update(
                        {
                            name:e.target.value
                        }
                    )
                    update(orderBy, way)                     
                }
                else{
                    errEvent(errorMessage)
                    e.target.style.color = "#ff4d4dd7"
                    
                        e.target.style.borderBottom = "2px solid #ff4d4dd7"
                        update(orderBy, way)
                    
                } 
              
            })



            idRankInput  =  document.getElementById(`rank-input-${buttonIds[o]}`) 
            idRankInput.addEventListener("change",function(e){

                console.log(e.target.getAttribute(`data-id`))
                console.log(e.target.value)

                validAdd = true

                if(ranks.includes(Number(e.target.value))){
                    validAdd = false
                    errorMessage = "RANK ALREADY IN USE"
                }
                if(e.target.value=="0" || e.target.value < 1 || e.target.value > 999 || e.target.value ==""){
                    validAdd = false
                    errorMessage = "RANK OUT OF RANGE (MUST BE > 1 and < 999)" 
                }    
                if(validAdd){
                    
                    db.collection(collectionName).doc(e.target.getAttribute(`data-id`)).update(
                        {
                            rank:Number(e.target.value)
                        }
                    )
                    update(orderBy, way)
                }
                else{
                    errEvent(errorMessage)
                    e.target.style.color = "#ff4d4dd7"
                    
                        e.target.style.borderBottom = "2px solid #ff4d4dd7"
                        update(orderBy, way)
                    
                } 
            })



            idPopInput  =  document.getElementById(`pop-input-${buttonIds[o]}`) 
            idPopInput.addEventListener("change",function(e){
                console.log(e.target.getAttribute(`data-id`))
                console.log(e.target.value)

                validAdd = true

                if(e.target.value=="0" || e.target.value < 1 || e.target.value > 999 || e.target.value ==""){
                    validAdd = false
                    errorMessage = "POP OUT OF RANGE (MUST BE > 1 and < 999)" 
                }                
                if(validAdd){
                    
                    db.collection(collectionName).doc(e.target.getAttribute(`data-id`)).update(
                        {
                            population:Number(e.target.value)
                        }
                    )
                    update(orderBy, way)                     
                }
                else{
                    errEvent(errorMessage)
                    e.target.style.color = "#ff4d4dd7"
                    
                        e.target.style.borderBottom = "2px solid #ff4d4dd7"
                        update(orderBy, way)
                    
                } 

 
            })



            idOfficialInput  =  document.getElementById(`official-input-${buttonIds[o]}`) 
            idOfficialInput.addEventListener("change",function(e){
                console.log(e.target.getAttribute(`data-id`))
                console.log(e.target.value)
                e.target.value == "true" ? idModdedBool = false : idModdedBool = true
                e.target.style.color = "red"
                db.collection(collectionName).doc(e.target.getAttribute(`data-id`)).update(
                    {
                        "data.modded":idModdedBool
                    }
                )
                update(orderBy, way)
            })



            idStatusInput  =  document.getElementById(`status-input-${buttonIds[o]}`) 
            idStatusInput.addEventListener("change",function(e){
                console.log(e.target.getAttribute(`data-id`))
                console.log(e.target.value)
                e.target.value == "online" ? tableStatusBool = true : tableStatusBool = false
                e.target.style.color = "red"
                db.collection(collectionName).doc(e.target.getAttribute(`data-id`)).update(
                    {
                        "data.status":idStatusBool
                    }
                )
                update(orderBy, way)
            })



            idUptimeInput  =  document.getElementById(`uptime-input-${buttonIds[o]}`) 
            idUptimeInput.addEventListener("change",function(e){
                console.log(e.target.getAttribute(`data-id`))
                console.log(e.target.value)

                validAdd = true

                if(e.target.value < 0 || e.target.value > 100 || e.target.value == ""){
                    validAdd = false
                    errorMessage = "UPTIME % OUT OF RANGE (MUST BE >=0 and < 100)"
                }
                if(validAdd){
                    
                    db.collection(collectionName).doc(e.target.getAttribute(`data-id`)).update(
                        {
                            "data.uptime":Number(e.target.value)
                        }
                    )
                    update(orderBy, way)                 
                }
                else{
                    errEvent(errorMessage)
                    e.target.style.color = "#ff4d4dd7"
                    
                        e.target.style.borderBottom = "2px solid #ff4d4dd7"
                        update(orderBy, way)
                    
                } 

            })



            idAddressInput  =  document.getElementById(`address-input-${buttonIds[o]}`) 
            idAddressInput.addEventListener("change",function(e){
                idHostValue = document.getElementById(`host-input-${buttonIds[o]}`).value
                validAdd = true


                if(e.target.value == ""){
                    validAdd = false
                    errorMessage = "INVALID IP ADDRESS"
                }
                idFullIp = e.target.value+":"+idHostValue
                idDocId = idFullIp.replace(/[^a-zA-Z0-9]/g, '')

                for(let k = 0; k < buttonIds.length; k++){
                    if(idDocId.toLowerCase() == buttonIds[k].toLowerCase()){
                        validAdd = false
                        errorMessage = "IP / SERVER ALREADY EXISTS"
                    }
                }

                if(validAdd){
                    
                    db.collection(collectionName).doc(e.target.getAttribute(`data-id`)).update(
                        {
                            "data.ip":idFullIp
                        }
                    )
                    update(orderBy, way)                    
                }
                else{
                    errEvent(errorMessage)
                    e.target.style.color = "#ff4d4dd7"
                    
                        e.target.style.borderBottom = "2px solid #ff4d4dd7"
                        update(orderBy, way)
                } 
            })


            idHostInput  =  document.getElementById(`host-input-${buttonIds[o]}`) 
            idHostInput.addEventListener("change",function(e){
                idAddressValue = document.getElementById(`address-input-${buttonIds[o]}`).value
                validAdd = true
                
                if(e.target.value < 0 || e.target.value > 99999 || e.target.value == ""){
                    validAdd = false
                    errorMessage = "INVALID IP PORT"
                }
                idFullIp = idAddressValue+":"+e.target.value
                idDocId = idFullIp.replace(/[^a-zA-Z0-9]/g, '')
                
                for(let k = 0; k < buttonIds.length; k++){
                    if(idDocId.toLowerCase() == buttonIds[k].toLowerCase()){
                        validAdd = false
                        errorMessage = "IP / SERVER ALREADY EXISTS"
                    }
                }

                if(validAdd){
                    
                    db.collection(collectionName).doc(e.target.getAttribute(`data-id`)).update(
                        {
                            "data.ip":idFullIp
                        }
                    )
                    update(orderBy, way)                    
                }
                else{
                    errEvent(errorMessage)
                    e.target.style.color = "#ff4d4dd7"
                    
                        e.target.style.borderBottom = "2px solid #ff4d4dd7"
                        update(orderBy, way)
                    
                } 
            })
        }

        document.getElementById("view-button").addEventListener("click",function(){
            listView = true
            update(orderBy, way)
        })
    }
    genEvent("printed")
}
