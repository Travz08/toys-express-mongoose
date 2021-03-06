const express = require('express');
const path = require('path');
const morgan = require('morgan');
const routes = require('./routes');
const methodOverride = require('method-override');
const getPostSupport = require('express-method-override-get-post-support');

const app = express();
app.use(express.static(path.join(__dirname, 'stylesheets')));
app.use(express.static('./public'));
app.use(methodOverride(
  getPostSupport.callback,
  getPostSupport.options // { methods: ['POST', 'GET'] }
));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('combined'));
app.use('/', routes);

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'));
