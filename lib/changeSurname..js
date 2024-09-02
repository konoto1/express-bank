import { accounts } from "../data/accounts.js";

const validSymblos = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

export function changeSurname(req, res) {

    const accountNameSurname = req.params.nameSurname;
    const inputName = accountNameSurname.split('-')[0].toLowerCase();
    const validInputName = inputName[0].toUpperCase() + inputName.slice(1);
    const inputSurname = accountNameSurname.split('-')[1].toLowerCase();
    const validInputSurname = inputSurname[0].toUpperCase() + inputSurname.slice(1);

    if (accounts.length === 0) {
        const data = {
            state: 'error',
            message: 'Saskaitu sarasas yra tuscias. Nera ka modifikuoti.',
        };
        return res.json(data.message);
    };

    let isAccountNotFound = true;

    for (const account of accounts) {
        if (account.nameSurname === `${validInputName}-${validInputSurname}`) {
            isAccountNotFound = false;
        };
    };

    if (isAccountNotFound) {
        const data = {
            state: 'error',
            message: `Saskaita tokiu vardu ir pavarde: ${accountNameSurname} nerasta.`,
        };
        return res.json(data.message);
    }

    //Duomenu tipo tinkamumo patikra

    if (typeof req.body !== 'object'
        || Array.isArray(req.body)
        || req.body === null) {
        const data = {
            state: 'error',
            message: 'Panaudotas ne Objekto duomenu tipas',
        };
        return res.json(data);
    };

    if (Object.keys(req.body)[0] !== 'surname') {
        const data = {
            state: 'error',
            message: 'Panaudotas netinkams Objekto raktas. Galimas raktas `surname`.',
        };
        return res.json(data);
    };

    if (Object.keys(req.body).length !== 1) {
        const data = {
            state: 'error',
            message: 'Objektas gali tureti tik viena rakta.',
        };
        return res.json(data);
    }

    //Vardo patikra

    const { surname } = req.body;

    if (surname.slice(1) !== surname.slice(1).toLowerCase()) {
        const data = {
            state: 'error',
            message: 'Tik pirmosios pavardes raides gali buti didziosios',
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

    for (const symbol of surname) {

        if (!validSymblos.includes(symbol)) {
            const data = {
                state: 'error',
                message: `Pavarde turi neleistinu simboliu. Lesitini simboliai: (${validSymblos}) `,
            };
            return res.json(data);
        };
    };

    const newNameSurname = `${validInputName}-${surname}`;
    for (const account of accounts) {
        if (account.nameSurname === newNameSurname) {
            const data = {
                state: 'error',
                message: `Saskaita tokiu vardu ir pavarde '${newNameSurname}' jau yra uzregistruota.`,
            };
            return res.json(data);
        };
    };

    for (const account of accounts) {
        if (account.nameSurname === `${validInputName}-${validInputSurname}`) {
            account.nameSurname = newNameSurname;
            const data = {
                state: 'Success',
                message: `Saskaitos savininko pavarde sekmingai pakeista.`,
            };
            return res.json(data);
        };
    };
};