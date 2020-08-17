const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const { prompt } = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { create } = require("domain");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// first create empty array to hold all of the employees' information
let employees = []

// function to create a manager type
const createManager = employee => {
  prompt([
    {
      type: 'input',
      name: 'officeNumber',
      message: "What is the manager's office number?"
    },
  ])
    .then(({ officeNumber }) => {
      employees.push(new Manager(employee.name, employee.id, employee.email, officeNumber))
      makeAnother()
      // console.log(employees)
    })
    .catch(err => console.log(err))
}

// function to create an engineer type
const createEngineer = employee => {
  prompt([
    {
      type: 'input',
      name: 'github',
      message: "What is the engineer's Github username?"
    },
  ])
    .then(({ github }) => {
      employees.push(new Engineer(employee.name, employee.id, employee.email, github))
      makeAnother()
      // console.log(employees)
    })
    .catch(err => console.log(err))
}

// function to create an intern type
const createIntern = employee => {
  prompt([
    {
      type: 'input',
      name: 'school',
      message: "What school did the intern go to?"
    },
  ])
    .then(({ school }) => {
      employees.push(new Intern(employee.name, employee.id, employee.email, school))
      makeAnother()
      // console.log(employees)
    })
    .catch(err => console.log(err))
}

// recrusive function to add another employee or end the program and render HTML file
const makeAnother = () => {
  prompt({
    type: 'list',
    name: 'another',
    choices: ['Yes', "No, I'm finished!"],
    message: 'What would you like to add another employee?'
  })
    .then(({ another }) => {
      switch (another) {
        case 'Yes':
          mainMenu()
          break
        case "No, I'm finished!":
          // this will write the html file in the 'output' folder
          fs.writeFileSync(outputPath, render(employees))
          break
      }
    })
    .catch(err => console.log(err))
}

// The first function that will start prompting the user for questions about an employee
const mainMenu = () => {
  prompt([
    {
      type: 'list',
      name: 'title',
      choices: ['Manager', 'Engineer', 'Intern'],
      message: 'What is the title of the employee?'
    },
    {
      type: 'input',
      name: 'name',
      message: "What is the employee's name?"
    },
    {
      type: 'number',
      name: 'id',
      message: "What is the employee's ID?"
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the employee's Email?"
    },
  ])
    .then(employee => {
      switch (employee.title) {
        case 'Manager':
          createManager(employee)
          break
        case 'Engineer':
          createEngineer(employee)
          break
        case 'Intern':
          createIntern(employee)
          break
      }
    })
    .catch(err => console.log(err))
}

mainMenu()









