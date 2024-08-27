import express from "express";
import { accounts } from "../data/accounts.js";

export const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    const data = {
        state: 'error',
        message: 'Nurodyk konkretu API endpoint\'a'
    };
    return res.json(data.message);
});



apiRouter.post('/account', (req, res) => {
    const test = {
        jonasJonaitis: {
            name: 'Jonas',
            surname: 'Jonaitis',
            dob: '1980-10-02',
        }
    };
    console.log(JSON.stringify(test));

    accounts.push(req.body);
    return res.json(accounts);
});

apiRouter.get('/account', (req, res) => {


    // accounts.push('vardas pavarde gimimo data');
    return res.json(accounts);
});