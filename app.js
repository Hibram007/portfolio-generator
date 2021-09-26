// code to link exported write and copy file from generate site ,js
const { writeFile, copyFile } = require('./utils/generate-site.js');

const inquirer = require('inquirer');
// assigns anonymous HTML template in page-template.js to generatePage vconst
const generatePage = require('./src/page-template');

// an encapusulating function where "return" runs the inquierer prompt
const promptUser = () => {
    return inquirer.prompt([
        //profile questions
        {
            type:'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username (Required)',
            validate: gitHubInput => {
                if (gitHubInput) {
                    return true;
                } else {
                    console.log('Please enter your github username!');
                    return false;
                }
            }
          },
          { type:'confirm',
            name:'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'confirmAbout',
            message: 'Provide some information about yourself:',
            // a function that runs when a certain parameter is true --- here if confirmAbout question is true it launches a function to return "true"
            // inquierer passes object with users inpur into when function
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        },
          {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
          }
    ]);
};

// portfilio Data is the argument being accepted
const promptProject = portfolioData => {
    // empty array is essentially the data collecting system.
  // If there's no 'projects' array property, create one --- this is a check to make sure array is not cleared each time funct is called
if (!portfolioData.projects) {
  portfolioData.projects = [];
}
    console.log(`
  =================
  Add a New Project
  =================
  `);
  return inquirer.prompt([
      {
          type: 'input', 
          name: 'Project name',
          mesage: 'Provide the name of the project (Required)',
          validate: projectName => {
            if (projectName) {
                return true;
            } else {
                console.log('Please enter your project name!');
                return false;
            }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Please enter your project description!');
                return false;
            }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: linkInput => {
            if (linkInput) {
                return true;
            } else {
                console.log('Please enter the link to your github!');
                return false;
            }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });