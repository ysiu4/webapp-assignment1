#!/usr/bin/env node

MyInfo = {
  name: 'Yuk Ming Siu',
  email: 'ysiu4@my.centennialcollege.ca',
}

var app = require('./app');

// get port from environment, or use 3000 if not exist
var port = process.env.PORT || '3000';

// start listening to the port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
