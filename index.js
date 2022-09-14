import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import user from './router/userRouter.js'
import stripe from './router/stripe.js'

const app = express();
dotenv.config();
app.use(cors());


app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));



app.use('/auth', user)
app.use('/payment',stripe)

app.get("/get", (req,res) =>{
  res.json("hello world")
})

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen((PORT), () => console.log(`server running on Port:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`))