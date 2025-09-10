const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// View engine setup
app.engine('handlebars', exphbs({ defaultLayout: false }));
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact');
});

app.post('/send', (req, res) => {
  const { name, company, email, phone, message } = req.body;
 const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'chilakavyshnavi04@gmail.com',
    pass: 'igqq iupa zjeh fqpc'  // your 16-char Gmail App Password
  },
  tls: {
    rejectUnauthorized: false  // bypass self-signed cert issue
  }
});


  const mailOptions = {
     from: `"${name}" <${email}>`,   // shows user as the sender
    to: 'chilakavyshnavi04@gmail.com',  // your email (you receive it)
    subject: 'Message',
    text: `
      Name: ${name}
      Company: ${company}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.render('contact', { msg: 'Error occurred, please try again!' });
    }
    console.log('Message sent: %s', info.response);
    res.render('contact', { msg: 'Email has been sent to her Gmail!' });
  });
});
  

   

 


app.listen(3001, () => console.log('Server started...'));
