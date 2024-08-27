import express from "express";
import { apiRouter } from "./router/apiRouter.js";

const app = express();
const port = 5025;

app.use(express.json({
    type: 'application/json',
}));

app.use('/api', apiRouter);

app.get('/', (req, res) => {
    return res.send('Bank');
})

app.get('*', (req, res) => {
    return res.send('Ups 404 puslpais nerastas....👽');
})

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
})