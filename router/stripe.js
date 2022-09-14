import express from "express";

import {stripePayment} from '../controller/stripe.js';

const router = express.Router()


router.post('/', stripePayment);

export default router