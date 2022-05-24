"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var sendMail = function sendMail(userEmail, confirmationToken) {
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
    subject: 'Potvrzení registrace Runtime Terror App',
    text: 'Vážený uživateli,\n\n' + 'potvrďte prosím svou registraci kliknutím na tento odkaz: http://localhost:3000/registration/confirmation?activation=' + confirmationToken + '\n\n' + 'Runtime Terror Team'
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

var _default = sendMail;
exports["default"] = _default;
//# sourceMappingURL=mail-sender.js.map