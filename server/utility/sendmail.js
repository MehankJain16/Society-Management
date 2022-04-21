const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "asociety001@gmail.com",
    pass: "society@admin123",
  },
});

exports.sendmail = (users, text) => {
  var mailOptions = {
    from: "asociety001@gmail.com",
    to: users,
    subject: "Society Update",
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error in sending mails: ", error.toString());
      return false;
    } else {
      return true;
    }
  });
};
