import inquirer from 'inquirer';
import path from 'path';
import * as fs from 'fs';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const filePath = path.join(__dirname, 'text.json')

const questions = [
    {
        type: 'input',
        name: 'name',
    message: "Enter the user's name. To cancel press ENTER:",
    },
   {
    type: 'list',
    name: 'gender',
    message: "Choose your gender:",
    choices: ['Male', 'Female'],
    filter(val) {
      return val.toLowerCase();
     },
    when(answers) {
      return answers.name;
    },
      },
   {
    type: 'input',
    name: 'age',
     message: "Enter your age:",
     validate(value) {
       const validAge = value.match(/^\d+$/);
       if (validAge) {
         return true;
       }
       return "Enter vaild age"
     },
      when(answers) {
      return answers.name;
    },
  },
  {
    type: 'confirm',
    name: 'next',
    message: "Would you to search values in DB?",
    when(answers) {
      return !nextStep('name')(answers);
    },
  }
]

function nextStep(answer) {
  return function (answers) {
    return answers[answer];
  };
}

const secondQuestion = [
    {
    type: 'input',
    name: 'userName',
    message: "Enter user's name you wanna found in DB: ",
      },
]

let newArr = []
const data = fs.readFileSync(filePath)
const list = JSON.parse(data)
newArr = [...list]
console.log(newArr)


const game = () => {
inquirer
  .prompt(questions)
  .then((answers) => {
    if (answers.next === false) {
      return
    }
    if (answers && answers.next !== true) {
      newArr.push(answers)
      fs.writeFileSync(filePath, JSON.stringify(newArr, null, '  '))
      game()
      }
    if (answers.next === true) {
      console.log(JSON.stringify(newArr, null, '  '));
      gamePartSecond()
    }
  })
}

const gamePartSecond = () => {
    inquirer
  .prompt(secondQuestion)
      .then((answers) => {
        const filteredUser = newArr.filter(item => item.name.toLowerCase() === answers.userName.toLowerCase())
        
        if (filteredUser.length === 0) {
          console.log("Sorry, there is no user with such name")
        }
        if (filteredUser.length > 0) {
          console.log(`User ${filteredUser[0].name} was found!`)
          console.log(filteredUser)
        }
  })
}

game()
