#!/usr/bin/env node

const inquirer = require("inquirer");
const figlet = require("figlet");
const chalk = require("chalk");
const clone = require("git-clone");
const { exec } = require("child_process");

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
    choices: [
      "Angular",
      "React",
      "React (Next.js)",
      "React + Express",
      "React + TypeScript",
      "Svelte",
      "Vue",
      "Vue + TypeScript",
      "Website",
    ],
  },
];

function execResponse(error, stdout, stderr) {
  if (error) {
    console.log(`error: ${error.message}`);
    console.log(
      chalk.green("Your Starter Pack was unable to create your project. " + error.message)
    );
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    console.log(chalk.green("Your Starter Pack has been created. Have fun building stuff!"));
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(chalk.green("Your Starter Pack has been created. Have fun building stuff!"));
  return;
}

function cloneRepo(pack, dirName) {
  switch (pack) {
    case "Angular":
      console.log(chalk.blue("Creating Pack, please wait..."));
      exec("npx -p @angular/cli ng new " + dirName + " --defaults=true", (error, stdout, stderr) =>
        execResponse(error, stdout, stderr)
      );
      break;
    case "React":
      console.log(chalk.blue("Creating Pack, please wait..."));
      exec("npx create-react-app " + dirName, (error, stdout, stderr) =>
        execResponse(error, stdout, stderr)
      );
      break;
    case "React (Next.js)":
      console.log(chalk.blue("Creating Pack..."));
      exec("npx create-next-app " + dirName, (error, stdout, stderr) =>
        execResponse(error, stdout, stderr)
      );
      break;
    case "React + Express":
      console.log(chalk.blue("Creating Pack..."));
      clone("https://github.com/starterpk/pack-react-express", "./" + dirName);
      break;
    case "React + TypeScript":
      console.log(chalk.blue("Creating Pack, please wait..."));
      exec(
        "npx create-react-app " + dirName + " --template typescript",
        (error, stdout, stderr) => execResponse(error, stdout, stderr)
        // clone("https://github.com/starterpk/pack-react", "./" + dirName);
      );
      break;
    case "Svelte":
      console.log(chalk.blue("Creating Pack, please wait..."));
      exec(
        "npx degit 'sveltejs/template' " + dirName + " && cd " + dirName + " && npm install",
        (error, stdout, stderr) => execResponse(error, stdout, stderr)
      );
      break;
    case "Vue":
      console.log(chalk.blue("Creating Pack, please wait..."));
      exec("npx vue create " + dirName + " -d", (error, stdout, stderr) =>
        execResponse(error, stdout, stderr)
      );
      break;
    case "Vue + TypeScript":
      console.log(chalk.blue("Creating Pack, please wait..."));
      exec(
        "npx vue create " + dirName + " -d && cd " + dirName + " && npx vue add typescript -d",
        (error, stdout, stderr) => execResponse(error, stdout, stderr)
      );
      break;
    case "Website":
      console.log(chalk.blue("Creating Pack..."));
      clone("https://github.com/starterpk/pack-website", "./" + dirName);
      break;
    default:
      console.log("You didn't pick anything...");
  }
}

// CLI output begins here

console.log(
  chalk.yellow.bgBlack(
    figlet.textSync("Starter Pack", {
      horizontalLayout: "fitted",
      font: "Standard",
    })
  )
);

inquirer
  .prompt(promptQuestions)
  .then((answer) => {
    const cleanAppName = answer.name.replace(/\s+/g, "-").toLowerCase();
    cloneRepo(answer.pack, cleanAppName);
  })
  // .then(() => {
  //   console.log(chalk.green("Your Starter Pack has been created. Have fun building stuff!"));
  // })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Something else when wrong");
    }
  });
