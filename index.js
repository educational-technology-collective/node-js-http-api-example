const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/products/:productId', async function (req, res) {

    try {
        const resource = await fs.readFile(
            path.join(__dirname, "products", req.params.productId)
        );

        res.json(resource.toString());
    }
    catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

app.put('/products/:productId', async function (req, res) {

    console.log(path.join(__dirname, "products", req.params.productId));
    console.log(req.body);

    try {
        await fs.writeFile(
            path.join(__dirname, "products", req.params.productId),
            JSON.stringify(req.body)
        );

        res.status(200).end();
    }
    catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

app.post('/products', async function (req, res) {

    try {
        const ids = await fs.readdir(path.join(__dirname, "products"));
        if (ids.length != 0) {
            var max = Math.max(...ids.map(cur => parseInt(cur)));
            max = max + 1;
        }
        else {
            max = 0;
        }

        console.log(max);
        await fs.writeFile(
            path.join(__dirname, "products", max.toString()),
            JSON.stringify(req.body)
        );

        res.status(200).end();
    }
    catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));