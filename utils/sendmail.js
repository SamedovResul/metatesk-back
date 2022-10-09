import nodemailer from 'nodemailer'

export  const sendMail = (email,data) =>{
  
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
      from: '"Register Confirmation" <enteskedu2020@gmail.com>', // sender address
      to:  `${email}`, // list of receivers 'shahin@enteskedu.com'
      subject: 'email node.js', // Subject line
      text: 'Hello world?', // plain text body
      html: `<p> your confirmation code: ${data}</p>  ` // html body
  };

//   // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      res.status(404).json({error})
      res.status(200).json({output})
      res.send({error})
      res.status(200).json({})
  });
}

  