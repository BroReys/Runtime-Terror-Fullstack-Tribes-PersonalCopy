import nodemailer from 'nodemailer';

const sendPasswordResetMail = function (userEmail, forgottenPswToken) {

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
    subject: 'Password reset link',
    text: 'Dear user,\n\n' +
        'please finish the password reset process at this link: http://localhost:4200/password/'
        + forgottenPswToken + '\n\n' +
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

export default sendPasswordResetMail;