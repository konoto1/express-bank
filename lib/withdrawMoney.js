
import { accounts } from "../data/accounts.js";

const validNumbers = '0123456789';
const validSymblos = 'qwertyuiopasdfghjklzxcvbnm-QWERTYUIOPASDFGHJKLZXCVBNM';

export function withdrawMoney(req, res) {
    const { nameSurname, amount } = req.body;

    // Duometu tipo patikra

    if (typeof req.body !== 'object'
        || Array.isArray(req.body)
        || req.body === null) {
        const data = {
            state: 'error',
            message: 'Panaudotas ne Objekto duomenu tipas',
        };
        return res.json(data);
    };

    if (Object.keys(req.body)[0] !== 'nameSurname' || Object.keys(req.body)[1] !== 'amount') {
        const data = {
            state: 'error',
            message: 'Panaudoti netinkami Objekto raktai. Galimi raktai `nameSurname`, `amount`.',
        };
        return res.json(data);
    };

    if (Object.keys(req.body).length !== 2) {
        const data = {
            state: 'error',
            message: 'Objektas gali tureti tik du raktus.',
        };
        return res.json(data);
    };

    for (const symbol of nameSurname) {
        if (!validSymblos.includes(symbol)) {
            const data = {
                state: 'error',
                message: `Vardo ir pavardes ivestis turi neleistinu simboliu. Lesitini simboliai: (${validSymblos}) `,
            };
            return res.json(data);
        };
    };

    for (const num of amount) {
        if (!validNumbers.includes(num)) {
            const data = {
                state: 'error',
                message: `Pinigu ivestis turi neleistinu simboliu. Lesitini simboliai: (${validNumbers}).`,
            };
            return res.json(data);
        };
    };

    if (accounts.length === 0) {
        const data = {
            state: 'error',
            message: 'Saskaitu sarasas yra tuscias.',
        };
        return res.json(data.message);
    };

    for (const account of accounts) {
        if (nameSurname === account.nameSurname) {
            if ((parseInt(account.money) - parseInt(amount)) < 0) {
                const data = {
                    state: 'error',
                    message: `Saskaitoje nepakanka lesu pinigu isemimo operacijai atlikti. Likutis: ${parseInt(account.money) / 100} Eur.`,
                };
                return res.json(data);
            } else {
                account.money = '' + (parseInt(account.money) - parseInt(amount));
                const data = {
                    state: 'success',
                    message: `Pinigu suma ${parseInt(amount) / 100} Eur. sekmingai isimta is saksaitos`,
                };
                return res.json(data.message);
            };
        };
    };

    const data = {
        state: 'error',
        message: `Saskaita tokiu vardu ir pavarde: ${nameSurname} nerasta.`,
    };
    return res.json(data.message);
};