const nodeMailer = require('nodemailer');
const config = require('../config.json');

var smtpTransport = nodeMailer.createTransport({
    host: config["mail"]["host"],
    port: config["mail"]["port"],
    auth: {
        user: config["mail"]["user"],
        pass: config["mail"]["pass"]
    }
});

function sendEmail(invoice) {
    var mailOptions = {
        from: config["mail"]["from"],
        to: invoice.email,
        subject: `Your Invoice #${invoice._id}`,
        text: invoice
    };
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            return { "success": false, "data": error }
        } else {
            return { "success": true, "data": ("Message sent: " + response.message) }
        }
    });
}

module.exports = {
    sendEmail: sendEmail
}