import express from "express";
import { withdrawMoney } from "../lib/withdrawMoney.js";
import { depositMoney } from "../lib/depositMoney.js";

export const apiMoneytRouter = express.Router();

apiMoneytRouter.post('/withdraw', withdrawMoney);
apiMoneytRouter.post('/deposit', depositMoney);


