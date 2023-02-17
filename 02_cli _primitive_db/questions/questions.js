export const questions = [
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

export const secondQuestion = [
    {
    type: 'input',
    name: 'userName',
    message: "Enter user's name you wanna found in DB: ",
      },
]

export const nextStep = (answer) => {
  return function (answers) {
    return answers[answer];
  };
}