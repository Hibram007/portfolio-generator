// API for fs module - how we access it. 
const fs = require('fs');

// array that holds user CLI arguments-  puts them into a new array
const profileDataArgs = process.argv.slice(2, process.argv.length);

// these expressions help extract CLI arguements and store them in distinct variables.
// assignment destructuring used here
const [name, github] = profileDataArgs;


// Lesson m9.1 refrence code
/*const printProfileData = profileDataArr => {
  // This...
  for (let i = 0; i < profileDataArr.length; i += 1) {
    console.log(profileDataArr[i]);
  }

  console.log('================');

  // Is the same as this...
  profileDataArr.forEach(profileItem => console.log(profileItem));
};

printProfileData(profileDataArgs);*/

// lesson m9.l2 code

//creating an arrow function to return a string
// return creates a line break in the code

// inserted HTML into the function to produce html output with user input
const generatePage = (name, github) => {
  return ` 
  <!DOCTYPE html> 
  <html lang="en"> 
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
  </head>

  <body>
  <h1>${name}</h1>
  <h2><a href="https://github.com/${github}">Github</a></h2>
</body>
</html>
`;
};

// m9. L2.5 code
fs.writeFile('index.html', generatePage(name, github), err => {
  if (err) throw err;

  console.log('Portfolio complete! Check out index.html to see the output!');
});
