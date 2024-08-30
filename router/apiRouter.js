import express from "express";
import { inputCheck } from "../lib/inputcCheck.js";
import { checkForAccount } from "../lib/checkForAccount.js";
import { deleteAccount } from "../lib/deleteAccount.js";
import { changeAccount } from "../lib/changeAccount.js";

export const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    const data = {
        state: 'error',
        message: 'Nurodyk konkretu API endpoint\'a'
    };
    return res.json(data.message);
});

apiRouter.post('/account', inputCheck);
apiRouter.get('/account/:nameSurname', checkForAccount);
apiRouter.delete('/account/:nameSurname', deleteAccount);
apiRouter.put('/account/:nameSurname', changeAccount);
