import express from "express";
import { accounts } from "../data/accounts.js";
import { inputCheck } from "../lib/helpers.js";

export const apiRouter = express.Router();



apiRouter.get('/', (req, res) => {
    const data = {
        state: 'error',
        message: 'Nurodyk konkretu API endpoint\'a'
    };
    return res.json(data.message);
});

apiRouter.post('/account', inputCheck);






apiRouter.get('/account/:nameSurname', (req, res) => {
    const { nameSurname } = req.params;
    const inputName = nameSurname.split('-')[0].toLowerCase();
    const validInputName = inputName[0].toUpperCase() + inputName.slice(1);
    const inputSurname = nameSurname.split('-')[1].toLowerCase();
    const validInputSurname = inputSurname[0].toUpperCase() + inputSurname.slice(1);

    if (accounts.length === 0) {
        return res.send('Saskaitu sarasas yra tuscias.');
    };

    for (const account of accounts) {
        if (`${validInputName}-${validInputSurname}` === account.nameSurname) {
            return res.send(`Saskaitos savininko vardas: ${validInputName}, pavarde: ${validInputSurname}, gimimo data: ${account.DOB}.`);
        };
    };

    return res.send(`Saskaita tokiu vardu ir pavarde: ${validInputName} ${validInputSurname} nerasta.`);
});