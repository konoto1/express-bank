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
    const name = req.body.nameSurname.split('-')[0];
    const surname = req.body.nameSurname.split('-')[1];
    const dob = parseInt(req.body.DOB.replaceAll('-', ''));
    const date = new Date();
    const year = '' + date.getFullYear();
    const month = ('' + (date.getMonth() + 1)).padStart(2, 0);
    const day = ('' + (date.getDate())).padStart(2, 0);
    const minDate = parseInt(`${year - 18}${month}${day}`);

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

    if (dob > minDate) {
        const data = {
            state: 'error',
            message: 'Saskaita susikurti gali asmenys ne jaunesni, nei 18m amziaus',
        };

        return res.json(data);

    };

    const data = {
        state: 'success',
        message: 'Saskaita sekmingai sukurta',
    };

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

    console.log(accounts.map((item, index) => item.nameSurname));
    console.log(inputNameSurname);



    return res.send([inputName, inputSurname]);
});