#!/usr/bin/env node

const inquirer = require("inquirer");
const figlet = require("figlet");
const chalk = require("chalk");
const clone = require("git-clone");

console.log(
  chalk.yellow.bgBlack(
    figlet.textSync("Starter Pack", { horizontalLayout: "fitted", font: "Standard" })
  )
);

const promptQuestions = [
  {
    type: "input",
    name: "name",
    message: "What would you like to name your project?",
    default: "starter-pack",
  },
  {
    type: "list",
    name: "pack",
    message: "Which Starter Pack would you like to use?",
    choices: ["React", "React + Express"],
  },
];

inquirer
  .prompt(promptQuestions)
  .then((answer) => {
    const cleanAppName = answer.name.replace(/\s+/g, "-").toLowerCase();
    switch (answer.pack) {
      case "React":
        console.log(chalk.blue("Creating Pack..."));
        clone("https://github.com/sunil-sandhu/react-starter-pack", "./" + cleanAppName);
        break;
      case "React + Express":
        console.log(chalk.blue("Creating Pack..."));
        clone("https://github.com/sunil-sandhu/react-express-starter-pack", "./" + cleanAppName);
        break;
      default:
        console.log("You didn't pick anything...");
    }
  })
  .then(() => {
    console.log(chalk.green("Your Starter Pack has been created. Have fun building stuff!"));
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Something else when wrong");
    }
  });
