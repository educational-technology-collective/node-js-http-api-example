const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const app = express();
const port = 3030;

app.use(express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// app.get('/products/:productId', async function (req, res) {

//     try {
//         const resource = await fs.readFile(
//             path.join(__dirname, "products", req.params.productId)
//         );

//         res.json(resource.toString());
//     }
//     catch (e) {
//         console.error(e);
//         res.status(500).end();
//     }
// });


const messageBuffer = []

app.post('/api/submit', async function (req, res) {

    try {
        messageBuffer.push(req.body.data);

        res.status(200).end();
    }
    catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

app.post('/api/poll', async function (req, res) {

    try {

        res.status(200).end(JSON.stringify(messageBuffer));
    }
    catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));