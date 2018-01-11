const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// port to listen on
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// configure express view engine
app.set('view engine', 'hbs');

// middleware (used in the order specified)
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

/* app.use((req,res,next) => {
  res.render('maintenance', {title:'Maintenance'});
}); */

app.get('/', (req, res) => {
  //res.send('<h1>Hello express!</h1>');
  res.render('home', {
    title: 'Welcome',
    welcomeMessage: 'Welcome to the page!'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad request!'
  });
});

app.listen(`${port}`, () => {
  console.log('Server listening on port 3000');
});
