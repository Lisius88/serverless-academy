import inquirer from 'inquirer';
import path from 'path';
import * as fs from 'fs';
import * as url from 'url';
import { questions, secondQuestion } from './questions/questions.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const filePath = path.join(__dirname, 'text.json')

let newArr = []
const data = fs.readFileSync(filePath)
const list = JSON.parse(data)
newArr = [...list]

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
