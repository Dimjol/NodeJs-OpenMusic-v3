/* eslint-disable no-undef */
const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this._trasporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendMail(targetMail, content) {
    const mail = {
      from: `"OpenMusic App" <${process.env.MAIL_ADDRESS}>`,
      to: targetMail,
      subject: 'Ekspor Lagu',
      text: 'Terlampir hasil ekspor lagu.',
      html: '<p>Terlampir hasil ekspor lagu.</p>',
      attachments: [
        {
          filename: 'songs.json',
          content,
          contentType: 'application/json',
        },
      ],
    };
    return this._trasporter.sendMail(mail);
  }
}

module.exports = MailSender;
