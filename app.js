// API for fs module - how we access it. 
const fs = require('fs');

//require statment to use module.exports srcs
// the object in module. exports become reassigned to the generatPage variable in this app.js
const generatePage = require('./src/page-template.js');

// array that holds user CLI arguments-  puts them into a new array
const profileDataArgs = process.argv.slice(2, process.argv.length);

// these expressions help extract CLI arguements and store them in distinct variables.
// assignment destructuring used here
const [name, github] = profileDataArgs;

// m9. L2.5 code
fs.writeFile('index.html', generatePage(name, github), err => {
  if (err) throw new Error (err);

  console.log('Portfolio complete! Check out index.html to see the output!');
});
