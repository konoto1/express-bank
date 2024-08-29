import express from "express";
import { accounts } from "../data/accounts.js";

export const apiRouter = express.Router();

const validSymblos = 'qwertyuiopasdfghjklzxcvbnm-QWERTYUIOPASDFGHJKLZXCVBNM';

apiRouter.get('/', (req, res) => {
    const data = {
        state: 'error',
        message: 'Nurodyk konkretu API endpoint\'a'
    };
    return res.json(data.message);
});

apiRouter.post('/account', (req, res) => {

    if (Object.keys(req.body)[0] !== 'nameSurname' || Object.keys(req.body)[1] !== 'DOB') {
        const data = {
            state: 'error',
            message: 'Panaudoti netinkami Objekto raktai. Galimi raktai `nameSurname`, `DOB`.',
        };
        return res.json(data);
    };

    if (Object.keys(req.body).length !== 2) {
        const data = {
            state: 'error',
            message: 'Objektas gali tureti tik du raktus.',
        };
        return res.json(data);
    }

    const { nameSurname, DOB } = req.body;
    const name = nameSurname.split('-')[0];
    const surname = nameSurname.split('-')[1];
    const dob = parseInt(DOB.replaceAll('-', ''));
    const date = new Date();
    const year = '' + date.getFullYear();
    const month = ('' + (date.getMonth() + 1)).padStart(2, 0);
    const day = ('' + (date.getDate())).padStart(2, 0);
    const minDate = parseInt(`${year - 18}${month}${day}`);

    if (name.slice(1) !== name.slice(1).toLowerCase() || surname.slice(1) !== surname.slice(1).toLowerCase()) {
        const data = {
            state: 'error',
            message: 'Tik pirmosios vardo ir pavardes raides gali buti didziosios',
        };
        return res.json(data);
    };

    if (!nameSurname.includes('-')) {
        const data = {
            state: 'error',
            message: 'Vardo ir pavarde turi but atskirti `-` simboliu.',
        };
        return res.json(data);
    };

    if (name[0] !== name[0].toUpperCase()) {
        const data = {
            state: 'error',
            message: 'Vardas privalo prasideti didziaja raide',
        };
        return res.json(data);
    };

    if (surname[0] !== surname[0].toUpperCase()) {
        const data = {
            state: 'error',
            message: 'Pavarde privalo prasideti didziaja raide',
        };
        return res.json(data);
    };

    let count = 0;
    for (const symbol of nameSurname) {

        if (symbol === '-') {
            count++;
        };

        if (count > 1) {
            const data = {
                state: 'error',
                message: 'Vardo ir pavardes ivestyje ` - ` simbolis gali buti panaudotas tik viena karta.',
            };
            count = 0;
            return res.json(data);
        };

        if (!validSymblos.includes(symbol)) {
            const data = {
                state: 'error',
                message: `Vardo ir pavardes ivestis turi neleistinu simboliu. Lesitini simboliai: (${validSymblos}) `,
            };
            count = 0;
            return res.json(data);
        };
    };

    for (const account of accounts) {
        if (account.nameSurname === nameSurname) {
            const data = {
                state: 'error',
                message: `Saskaita tokiu vardu ir pavarde '${nameSurname}' jau yra uzregistruota.`,
            };
            return res.json(data);
        };
    };

    if (dob > minDate) {
        const data = {
            state: 'error',
            message: 'Saskaita susikurti gali asmenys ne jaunesni, nei 18m amziaus',
        };
        return res.json(data);
    };

    const data = {
        state: 'success',
        message: 'Saskaita sekmingai sukurta.',
    };

    accounts.push({ ...req.body, "money": "0" });

    return res.json(data);

});

apiRouter.get('/account/:nameSurname', (req, res) => {
    const { nameSurname } = req.params;
    const inputName = nameSurname.split('-')[0].toLowerCase();
    const validInputName = inputName[0].toUpperCase() + inputName.slice(1);
    const inputSurname = nameSurname.split('-')[1].toLowerCase();
    const validInputSurname = inputSurname[0].toUpperCase() + inputSurname.slice(1);

    if (accounts.length === 0) {
        return res.send('Saskaitu sarasas yra tuscias.');
    };

    let i = 0;
    for (const account of accounts) {
        if (`${validInputName}-${validInputSurname}` === account.nameSurname) {
            return res.send(`Saskaitos savininko vardas: ${validInputName}, pavarde: ${validInputSurname}, gimimo data: ${account.DOB}.`);
        };
        i++;
    };

    return res.send(`Saskaita tokiu vardu ir pavarde: ${validInputName} ${validInputSurname} nerasta.`);
});