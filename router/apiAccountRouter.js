import express from "express";
import { checkForName } from "../lib/checkForName.js";
import { changeName } from "../lib/changeName.js";

export const apiAccountRouter = express.Router({ mergeParams: true });

apiAccountRouter.get('/name', checkForName);
apiAccountRouter.put('/name', changeName);