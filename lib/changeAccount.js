import { accounts } from "../data/accounts.js";

const validSymblos = 'qwertyuiopasdfghjklzxcvbnm-QWERTYUIOPASDFGHJKLZXCVBNM';
const validNumbers = '0123456789-';
const validMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const validDay = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

export function changeAccount(req, res) {

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

    //Vardo pavardes kombinacijos patikra

    const { nameSurname, DOB } = req.body;
    const name = nameSurname.split('-')[0];
    const surname = nameSurname.split('-')[1];
    const dob = parseInt(DOB.replaceAll('-', ''));
    const date = new Date();
    const year = '' + date.getFullYear();
    const month = ('' + (date.getMonth() + 1)).padStart(2, 0);
    const day = ('' + (date.getDate())).padStart(2, 0);
    const allowedAge = 18;
    const oldestAge = 125;
    const minDate = parseInt(`${year - allowedAge}${month}${day}`);
    const maxDate = parseInt(`${year - oldestAge}${month}${day}`);

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

    //Datos patikra

    for (const symbol of DOB) {
        if (!validNumbers.includes(symbol)) {
            const data = {
                state: 'error',
                message: `Datoje panaudoti negalimi simbloliai. Leistini simboliai: (${validNumbers})`,
            };
            return res.json(data);
        };
    };
    const ValidDateLength = 10;
    if (DOB.length !== ValidDateLength) {
        const data = {
            state: 'error',
            message: `Netinkamas datos formatas (YYYY-MM-DD)`,
        };
        return res.json(data);
    };

    if (DOB.startsWith('-') || DOB.endsWith('-')) {
        const data = {
            state: 'error',
            message: `Data negali prasideti ar baigtis '-' simboliu`,
        };
        return res.json(data);
    };

    if (DOB.replaceAll('-', '').length !== ValidDateLength - 2) {
        const data = {
            state: 'error',
            message: `Metai, menesiai ir dienos turi but atskirti '-' simboliu.`,
        };
        return res.json(data);
    };

    const spliteDate = DOB.split('-');
    const yearOfDate = spliteDate[0];
    const monthOfDate = spliteDate[1];
    const dayOfDate = spliteDate[2];
    if (yearOfDate.length !== 4) {
        const data = {
            state: 'error',
            message: `Netinkamas metu formatas (YYYY)`,
        };
        return res.json(data);
    };

    if (monthOfDate.length !== 2) {
        const data = {
            state: 'error',
            message: `Netinkamas menesio formatas (MM)`,
        };
        return res.json(data);
    };

    if (dayOfDate.length !== 2) {
        const data = {
            state: 'error',
            message: `Netinkamas dienos formatas (DD)`,
        };
        return res.json(data);
    };

    if (!validMonth.includes(monthOfDate)) {
        const data = {
            state: 'error',
            message: `Toks menesis ${monthOfDate} negalimas. Galimi menseiai: nuo ${validMonth[0]} iki ${validMonth.at(-1)}`,
        };
        return res.json(data);
    };

    if (!validDay.includes(dayOfDate)) {
        const data = {
            state: 'error',
            message: `Tokia diena ${dayOfDate} negalima. Galimos dienos: nuo ${validDay[0]} iki ${validDay.at(-1)}`,
        };
        return res.json(data);
    };

    if (dob < maxDate) {
        const data = {
            state: 'error',
            message: `Nera istoriskai registruotu vyresniu zmoniu kaip ${oldestAge} metu amziaus.`,
        };
        return res.json(data);
    };

    if (dob > minDate) {
        const data = {
            state: 'error',
            message: `Saskaita susikurti gali asmenys ne jaunesni, nei ${allowedAge} metu amziaus`,
        };
        return res.json(data);
    };

    for (const account of accounts) {
        if (account.nameSurname === `${validInputName}-${validInputSurname}`) {

            const oldInfo = `Sena saskaitos informacija. Vardas: ${validInputName}, pavarde: ${validInputSurname}, gimimo data: ${account.DOB}.`;
            account.nameSurname = nameSurname;
            account.DOB = DOB;
            const newInfo = `Nauja saskaitos informacija. Vardas: ${name}, pavarde: ${surname}, gimimo data: ${DOB}.`
            const data = {
                state: 'success',
                message: `${oldInfo} ${newInfo}`,
            };
            return res.json(data);
        };
    };

    const data = {
        state: 'error',
        message: 'Ups atrodo kazkas sugedo, atsiprasome uz nepatogumus, pabandykite dar karta veliau...',
    };

    return res.json(data.message);
};