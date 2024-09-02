import express from "express";
import { withdrawMoney } from "../lib/withdrawMoney.js";

export const apiMoneytRouter = express.Router();

apiMoneytRouter.post('/withdraw', withdrawMoney);


