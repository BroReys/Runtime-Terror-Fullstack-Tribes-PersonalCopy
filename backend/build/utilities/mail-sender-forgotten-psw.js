"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var sendPasswordResetMail = function sendPasswordResetMail(userEmail, forgottenPswToken) {
  var transporter = _nodemailer["default"].createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD
    }
  });

  var mailOptions = {
    from: process.env.MAILER_USER,
    to: userEmail,
    subject: 'Password reset link',
    text: 'Dear user,\n\n' + 'please finish the password reset process at this link: http://localhost:3000/forgotten-password/reset?token=' + forgottenPswToken + '\n\n' + 'Runtime Terror Team'
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

var _default = sendPasswordResetMail;
exports["default"] = _default;
//# sourceMappingURL=mail-sender-forgotten-psw.js.map