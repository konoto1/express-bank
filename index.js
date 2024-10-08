import express from "express";
import { apiRouter } from "./router/apiRouter.js";
import { apiAccountRouter } from "./router/apiAccountRouter.js";
import { apiMoneytRouter } from "./router/apiMoneyRouter.js";

const app = express();
const port = 5025;

app.use(express.json({
    type: 'application/json',
}));

app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.use('/api/account/:nameSurname', apiAccountRouter);

app.use('/api', apiMoneytRouter);

app.get('/', (req, res) => {
    return res.send('Sveiki atvyke i banka.');
});

app.get('*', (req, res) => {
    return res.send('Ups 404 puslpais nerastas....👽');
});

app.use((req, res, next) => {
    return res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});