import { accounts } from "../data/accounts.js";

export function checkForDob(req, res) {

    const { nameSurname } = req.params;
    const inputName = nameSurname.split('-')[0].toLowerCase();
    const validInputName = inputName[0].toUpperCase() + inputName.slice(1);
    const inputSurname = nameSurname.split('-')[1].toLowerCase();
    const validInputSurname = inputSurname[0].toUpperCase() + inputSurname.slice(1);

    if (accounts.length === 0) {
        const data = {
            state: 'error',
            message: 'Saskaitu sarasas yra tuscias.',
        };
        return res.json(data.message);
    };

    for (const account of accounts) {
        if (`${validInputName}-${validInputSurname}` === account.nameSurname) {
            const data = {
                state: 'success',
                message: `Saskaitos savininko gimimo data: ${account.DOB}`,
            };
            return res.json(data.message);
        };
    };

    const data = {
        state: 'error',
        message: `Saskaita tokiu vardu ir pavarde: ${nameSurname} nerasta.`,
    };
    return res.json(data.message);
};