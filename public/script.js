window.addEventListener("load", function () {

    let messageWindow = document.getElementById('message-window');
    let button = document.getElementsByTagName('button')[0];

    button.addEventListener('click', async function () {

        try {

            let message = messageWindow.value;

            messageWindow.value = "";
    
            let body = JSON.stringify({ data: message });
    
            let response = await fetch('http://localhost:3000/api', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });

            if (response.ok === false) {

                console.log("response.ok === false");
                
                throw(new Error(response.status));
            }
        }
        catch(e) {
            console.error(e);
        }

    });

});
