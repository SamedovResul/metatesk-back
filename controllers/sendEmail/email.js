import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

export const sendMail = (req, res) =>{
  try {
    const { nameSurname,Country,email,date } = req.body
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
      to:  'samedovrasul7@gmail.com', // list of receivers 'contact@enteskedu.com'
      subject: 'Metatesk', // Subject line
      text: 'Hello world?', // plain text body
      html: `
      <ul>
        <li> <b> NAME SURNAME</b> : ${nameSurname}</li>
        <li> <b> EMAIL</b> : ${email}</li>
        <li> <b> COUNTRY </b> : ${Country}</li>
        <li> <b> DATE </b> : ${date}</li>
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
  } catch (error) {
    res.status(400).send(error)
  }
}
