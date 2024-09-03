
import { accounts } from "../data/accounts.js";

const validNumbers = '0123456789';
const validSymblos = 'qwertyuiopasdfghjklzxcvbnm-QWERTYUIOPASDFGHJKLZXCVBNM';

export function transferMoney(req, res) {
    const { toNameSurname, fromNameSurname, amount } = req.body;

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

    if (Object.keys(req.body)[0] !== 'fromNameSurname' || Object.keys(req.body)[1] !== 'toNameSurname' || Object.keys(req.body)[2] !== 'amount') {
        const data = {
            state: 'error',
            message: 'Panaudoti netinkami Objekto raktai. Galimi raktai `fromNameSurname`, `toNameSurname`, `amount`.',
        };
        return res.json(data);
    };

    if (Object.keys(req.body).length !== 3) {
        const data = {
            state: 'error',
            message: 'Objektas gali tureti tik du raktus.',
        };
        return res.json(data);
    };

    for (const symbol of fromNameSurname) {
        if (!validSymblos.includes(symbol)) {
            const data = {
                state: 'error',
                message: `Pinigu siuntejo vardo ir pavardes ivestis turi neleistinu simboliu. Lesitini simboliai: (${validSymblos}) `,
            };
            return res.json(data);
        };
    };

    for (const symbol of toNameSurname) {
        if (!validSymblos.includes(symbol)) {
            const data = {
                state: 'error',
                message: `Pinigu gavejo vardo ir pavardes ivestis turi neleistinu simboliu. Lesitini simboliai: (${validSymblos}) `,
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

    let isAccountFromNotFound = true;

    for (const accountFrom of accounts) {
        if (fromNameSurname === accountFrom.nameSurname) {
            isAccountFromNotFound = false;
            break;
        };
    };

    if (isAccountFromNotFound) {
        const data = {
            state: 'error',
            message: `Siuntejo saskaita tokiu vardu ir pavarde ${fromNameSurname} nerasta.`,
        };
        return res.json(data);
    };

    let isAccountToNotFound = true;

    for (const accountTo of accounts) {
        if (toNameSurname === accountTo.nameSurname) {
            isAccountToNotFound = false;
            break;
        };
    };

    if (isAccountToNotFound) {
        const data = {
            state: 'error',
            message: `Gavejo saskaita tokiu vardu ir pavarde ${toNameSurname} nerasta.`,
        };
        return res.json(data);
    };

    for (const accountFrom of accounts) {
        if (fromNameSurname === accountFrom.nameSurname) {
            for (const accountTo of accounts) {
                if (toNameSurname === accountTo.nameSurname) {
                    if (parseInt(accountFrom.money) < parseInt(amount)) {
                        const data = {
                            state: 'error',
                            message: `Siuntejo saskaitoje nepakanka lesu pervedimui atlikti. Likutis: ${parseInt(accountFrom.money) / 100} Eur.`
                        };
                        console.log('From>>>>', accountFrom.money, 'To>>>>', accountTo.money);

                        return res.json(data);
                    } else {
                        accountFrom.money = '' + (parseInt(accountFrom.money) - parseInt(amount));
                        accountTo.money = '' + (parseInt(accountTo.money) + parseInt(amount));
                        console.log('From>>>>', accountFrom.money, 'To>>>>', accountTo.money);

                        const data = {
                            state: 'success',
                            message: `Pinigu suma ${parseInt(amount) / 100} Eur. sekmingai pervesta.`
                        };
                        return res.json(data);
                    };
                };
            };
        };
    };
};
