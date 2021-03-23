window.addEventListener("load", function () {

    let idElement = document.getElementById("id");
    let resourceElement = document.getElementById("resource");
    let responseElement = document.getElementById("response");
    let getButton = document.getElementById("get-button");
    let putButton = document.getElementById("put-button");
    let postButton = document.getElementById("post-button");

    getButton.addEventListener("click", async function () {

        let response = await fetch("http://localhost:3000/products/" + idElement.value, {
            method: 'GET'
        });

        let body = await response.text();

        responseElement.innerHTML = body;
    });

    putButton.addEventListener("click", async function () {

        let response = await fetch("http://localhost:3000/products/" + idElement.value, {
            method: 'PUT',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: resourceElement.value
        });
    });

    postButton.addEventListener("click", async function () {

        let response = await fetch("http://localhost:3000/products", {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: resourceElement.value
        });
    });
});
