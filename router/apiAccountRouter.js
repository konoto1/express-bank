import express from "express";
import { checkForName } from "../lib/checkForName.js";

export const apiAccountRouter = express.Router({ mergeParams: true });

apiAccountRouter.get('/name', checkForName);