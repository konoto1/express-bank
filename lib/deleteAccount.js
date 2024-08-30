import { accounts } from "../data/accounts.js";

export function deleteAccount(req, res) {
    const { nameSurname } = req.params;
    const inputName = nameSurname.split('-')[0].toLowerCase();
    const validInputName = inputName[0].toUpperCase() + inputName.slice(1);
    const inputSurname = nameSurname.split('-')[1].toLowerCase();
    const validInputSurname = inputSurname[0].toUpperCase() + inputSurname.slice(1);

    if (accounts.length === 0) {
        return res.send('Saskaitu sarasas yra tuscias. Nera ko trinti.');
    };

    let i = 0;
    for (const account of accounts) {
        if (`${validInputName}-${validInputSurname}` === account.nameSurname) {
            if (account.money === '0') {
                accounts.splice(i, 1);
                const data = {
                    state: 'success',
                    message: `Saskaita savininko vardu ir pavarde: ${validInputName} ${validInputSurname} sekmingai istrinta.`,
                };
                return res.json(data);
            };
            const data = {
                state: 'error',
                message: `Norint istrinti saskaita, joje negali buti pinigu. Likutis: ${account.money / 100} eur.`,
            };
            return res.json(data);
        };
        i++;
    };
    return res.send(`Saskaita tokiu vardu ir pavarde: ${nameSurname} nerasta.`);
};