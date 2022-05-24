import nodemailer from 'nodemailer';

const sendMail = function (userEmail, confirmationToken) {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD
    }
  });

  let mailOptions = {
    from: process.env.MAILER_USER,
    to: userEmail,
    subject: 'Potvrzení registrace Runtime Terror App',
    text: 'Vážený uživateli,\n\n' +
        'potvrďte prosím svou registraci kliknutím na tento odkaz: http://localhost:4200/register/'
        + confirmationToken + '\n\n' +
        'Runtime Terror Team'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

export default sendMail;