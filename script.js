
//function that scrolls to bottom
let scrollDown = () => {
    let div = document.getElementsByClassName('messages')[0];
    div.scrollTop = div.scrollHeight;
}



let upload = (e) => {
    e.preventDefault(); //prevents page from refreshing
    
    let message = document.getElementById('message').value; 

    if(!message.trim()) return false; //stops process if message isnt at least 1 character

    let xhttp = new XMLHttpRequest();
    
    document.getElementById('message').value = ''; // deletes sent input
    
    xhttp.open('POST', `actions/upload.php?message=${message}&user=${user}`, true);
    xhttp.send();


    scrollDown();
}


let done = true;

let fetch = () => {

    if(!done) return 0;
    
    done = false;
    
    let xhttp = new XMLHttpRequest();

    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let message_div = document.getElementsByClassName('messages')[0];
            let response = JSON.parse(this.responseText);
            
            start = response[response.length-1] ? response[response.length-1].id : start;

            let scroll = false;

            //Checks if user had scrolled to bottom
            if(message_div.scrollTop + message_div.offsetHeight >= message_div.scrollHeight) {
                scroll = true;
            }

            //Add new messages
            let p;
            for(let i = 0; i < response.length; i++) {
                div = document.createElement('div');
                p = document.createElement('p');
                p.innerHTML = response[i].message;
                
                p2 = document.createElement('h6');
                p2.innerHTML = `${response[i].sender} ${response[i].time}`;

                div.appendChild(p);
                div.appendChild(p2);
                
                message_div.appendChild(div);
            }
            
            if(scroll) scrollDown();

            done = true;
        }
    };
    
    xhttp.open('POST', `actions/fetch.php?s=${start}`, true);
    xhttp.send();
}


setInterval(fetch, 1000); //fetches new messages in every 1sec