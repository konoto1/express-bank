import express from "express";

const app = express();
const port = 5025;


app.get('/', (req, res) => {
    return res.send('Bank');
})

app.get('*', (req, res) => {
    return res.send('Ups 404 puslpais nerastas....👽');
})

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
})