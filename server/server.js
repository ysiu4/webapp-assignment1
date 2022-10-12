#!/usr/bin/env node

/* 
 * File: server.js
 * Student name: Yuk Ming Siu
 * Student ID: 301244053
 * Date: 2022-10-12
 * Course: COMP229-014
 */

var app = require('./config/app');

// get port from environment, or use 3000 if not exist
var port = process.env.PORT || '3000';

// start listening to the port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
