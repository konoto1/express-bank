import express from "express";
import { accounts } from "../data/accounts.js";

export const apiRouter = express.Router();

const validSymblos = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

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

    if (nameSurname.startsWith('-') || nameSurname.endsWith('-')) {
        const data = {
            state: 'error',
            message: 'Vardas ir pavarde negali prasideti ar baigtis `-` simboliu.',
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

    if (nameSurname.trim() !== nameSurname) {
        const data = {
            state: 'error',
            message: 'Vardo ir pavardes ivestyje negali buti tusciu tarpu',
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

        if (!validSymblos.includes(symbol) && symbol !== '-') {
            const data = {
                state: 'error',
                message: `Vardo ir pavardes ivestis turi neleistinu simboliu. Lesitini simboliai: (${validSymblos}) `,
            };
            count = 0;
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
    console.log(accounts);

    return res.json(data);

});

apiRouter.get('/account/:nameSurname', (req, res) => {
    const { nameSurname } = req.params;
    const inputName = nameSurname.split('-')[0].toLowerCase();
    const inputSurname = nameSurname.split('-')[1].toLowerCase();
    const inputNameSurname = nameSurname.toLowerCase();
    if (accounts.length === 0) {
        return res.json(`Saskaitu sarasas tuscias.`);
    }

    // console.log(accounts.map((item, index) => item.nameSurname));
    // console.log(inputNameSurname);



    return res.send([inputName, inputSurname]);
});