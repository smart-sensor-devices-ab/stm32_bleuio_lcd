import * as my_dongle from 'bleuio'
const dongleToConnect='[0]40:48:FD:E5:2F:17'
document.getElementById('connect').addEventListener('click', function(){
  my_dongle.at_connect()
  document.getElementById("clearScreen").disabled=false;
  document.getElementById("connect").disabled=true;
  document.getElementById("sendMsgForm").hidden=false;
})

document.getElementById("sendMsgForm").addEventListener("submit", function(event){
    event.preventDefault()
    console.log('here')

    
    my_dongle.ati().then((data)=>{
        //make central if not
        if(JSON.stringify(data).includes("Peripheral")){
            console.log('peripheral')
            my_dongle.at_central().then((x)=>{
                console.log('central now')
            })
        }        
    })
    .then(()=>{
        // connect to dongle
        my_dongle.at_getconn().then((y)=>{
            if(JSON.stringify(y).includes(dongleToConnect)){
                console.log('already connected')
            }else{
                my_dongle.at_gapconnect(dongleToConnect).then(()=>{
                    console.log('connected successfully')
                })
            }
        })
        .then(()=>{
            var theVal = "L=1 " + document.getElementById('msgToSend').value;
            console.log('Message Send 1 '+theVal)
            // send command to show data
            my_dongle.at_spssend(theVal).then(()=>{
                console.log('Message Send '+theVal)
            })
        })
        
    })
  });



document.getElementById('clearScreen').addEventListener('click', function(){
    my_dongle.ati().then((data)=>{
        //make central if not
        if(JSON.stringify(data).includes("Peripheral")){
            console.log('peripheral')
            my_dongle.at_central().then((x)=>{
                console.log('central now')
            })
        }
    })
    .then(()=>{
        // connect to dongle
        my_dongle.at_getconn().then((y)=>{
            if(JSON.stringify(y).includes(dongleToConnect)){
                console.log('already connected')
            }else{
                my_dongle.at_gapconnect(dongleToConnect).then(()=>{
                    console.log('connected successfully')
                })
            }
        })
        .then(()=>{
            // send command to clear the screen
            my_dongle.at_spssend('L=0').then(()=>{
                console.log('Screen Cleared')
            })
        })
        
    })
})