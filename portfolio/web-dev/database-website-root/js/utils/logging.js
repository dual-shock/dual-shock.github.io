let start = Date.now();
let duration
let eventCount = 0, testCount = 0
let lastEvent = ""



function dbEvent(str){
    duration = Date.now() - start
    console.log(`%cDatabase event :  ${str}`,`color:rgb(255, 217, 0); font-weight:bolder; font-size:16px;`,`[${eventCount}]`)
    console.log(`%cLast event:`,`color:rgb(224, 192, 7);font-weight:bold;`,`${lastEvent}  ${duration}ms ago\n\n`)
    lastEvent = str
    eventCount++
    start = Date.now();
}

function genEvent(str){
    duration = Date.now() - start
    console.log(`%cGeneral event :  ${str}`,`color:rgb(0, 140, 255); font-weight:bolder; font-size:16px;`,`[${eventCount}]`)
    console.log(`%cLast event:`,`color:rgb(120, 190, 248);font-weight:bold;`,`${lastEvent}  ${duration}ms ago\n\n`)
    lastEvent = str
    eventCount++
    start = Date.now();
}

function testEvent(str){
    duration = Date.now() - start
    console.log(`%cTest event    :  ${str}`,`color:rgb(86, 224, 7); font-weight:bolder; font-size:16px;`,`[${eventCount}]`)
    console.log(`%cLast event:`,`color:rgb(80, 180, 22);font-weight:bold;`,`${lastEvent}  ${duration}ms ago\n\n`)
    lastEvent = str
    eventCount++
    start = Date.now();
}

function errEvent(str){
    duration = Date.now() - start
    console.log(`%cError!       :  ${str}`,`color:rgb(224, 13, 6); font-weight:bolder; font-size:16px;`,`[${eventCount}]`)
    console.log(`%cLast event:`,`color:rgb(184, 31, 26);font-weight:bold;`,`${lastEvent}  ${duration}ms ago\n\n`)
    lastEvent = str
    eventCount++
    start = Date.now();
}

