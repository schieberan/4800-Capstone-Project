//nodemailer stuff--------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.locals.layout = false; 

// Static folder
//app.use('/public/src/', express.static(path.join(__dirname, 'public')));
 app.use(express.static(__dirname + '/src'));


// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('*', (req, res) => {
  console.log('server get *');
  res.send('Server is working.');
});

app.post('/:lang*?/admin/notifications', function(req, res) {
  console.log('server contact');   
  console.log(req.body);  
  
  const output = `
    <h1>Foal Watch Notification</h1>
	<p>You have a new notification from Hidden Hill Farms</p>
    <h3>${req.body.header}</h3>
    <p>${req.body.message}</p>
  `;
  
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:'Gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'hiddenhillnotification@gmail.com', // generated ethereal user
        pass: 'appstate123'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });
  
  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Hidden Hill Farm" <hiddenhillnotification@gmail.com>', 
      to: 'jluczynski97@gmail.com, ally.schieber@gmail.com',
      subject:'Hidden Hill Notification',
      text: 'Hello world?', // plain text body
      html: output // html body
  };
  
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  });
  
  
});
  

app.listen(3001,()=>{
	console.log('Server starting...');
})
