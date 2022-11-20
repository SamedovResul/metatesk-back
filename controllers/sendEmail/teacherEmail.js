import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();
export const teacherEmail = (data) =>{

    
    
    let email 
    let li = data.map((table) =>{
      const {student_Name,class_Name,date,teacher_Email
      } = table
      email = teacher_Email
      const d = new Date(date);

      const dates = d.getDate();
      const month = d.getMonth();
      return `
         <li> <b> Student Name </b> : ${student_Name}</li>
         <li> <b> Class name </b> : ${class_Name}</li>
         <li> 
         <b> date </b> : 
         ${month.toString().length === 1 ? `0${month + 1}` : month + 1} :
         ${dates.toString().length === 1 ? `0${dates + 1}` : dates + 1}
         </li>
         <li> 
         <b> time </b> : 
         ${
          d.getUTCHours().toString().length === 1
            ? `0${d.getUTCHours()}`
            : `${d.getUTCHours()}`
        } : ${
          d.getUTCMinutes().toString().length === 1
            ? `0${d.getUTCMinutes()}`
            : `${d.getUTCMinutes()}`
        }
        </li>
        `
    })

    let ul = `
    <ul>
      ${li}
    </ul>
    `
    console.log(ul)
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
      from: '"enteskedu Contact :" <enteskedu2020@gmail.com>', // sender address
      to:  `${email}`, // list of receivers 'contact@enteskedu.com'
      subject: 'Metatesk', // Subject line
      text: 'Hello world?', // plain text body
      html: ul // html body
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
} 