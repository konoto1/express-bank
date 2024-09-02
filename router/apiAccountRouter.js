import express from "express";
import { checkForName } from "../lib/checkForName.js";
import { changeName } from "../lib/changeName.js";
import { checkForSurname } from "../lib/checkForSurname.js";
import { changeSurname } from "../lib/changeSurname..js";

export const apiAccountRouter = express.Router({ mergeParams: true });

apiAccountRouter.get('/name', checkForName);
apiAccountRouter.put('/name', changeName);
apiAccountRouter.get('/surname', checkForSurname);
apiAccountRouter.put('/surname', changeSurname);