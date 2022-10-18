import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import user from './router/userRouter.js'
import stripe from './router/stripe.js'
import nodemailer from 'nodemailer'


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

app.post('/post', (req, res) =>{
  const { nameSurname,Country,email } = req.body
  console.log(req.body)
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASS  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

//   // setup email data with unicode symbols
  let mailOptions = {
      from: '"Metatesk Contact :" <enteskedu2020@gmail.com>', // sender address
      to:  'contact@enteskedu.com', // list of receivers 'contact@enteskedu.com'
      subject: 'Metatesk', // Subject line
      text: 'Hello world?', // plain text body
      html: `
      <ul>
        <li> name surname: ${nameSurname}</li>
        <li> email: ${email}</li>
        <li> Country: ${Country}</li>
      </ul>
      ` // html body
  };

//   // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId); 

      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      res.send("send message")
      res.status(404).json({error})
      res.status(200).json({output})
      res.send({error})
      res.status(200).json({})
  });

})

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen((PORT), () => console.log(`server running on Port:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`))