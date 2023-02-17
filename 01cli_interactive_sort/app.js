const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let newArr = null;

const gameNextStep = () => {
rl.question('Select a sorting method: ', value => {
          switch (value) {
            case "ascending":
              const ascendingSorting = [...newArr]
              ascendingSorting.sort((a, b) => a - b)
              console.log(ascendingSorting.join(" "))
              game()
              break;
            case "descending":
              const descendingSorting = [...newArr]
              descendingSorting.sort((a, b) => b - a)
              console.log(descendingSorting.join(" "))
              game()
              break;
            case "by alphabet":
              const byAlphabetSorting = [...newArr]
              byAlphabetSorting.sort((a, b) => a.localeCompare(b));
              console.log(byAlphabetSorting.join(" "))
              game()
              break;
            case "by number of letters":
              const byNumberOfLetters = [...newArr]
              byNumberOfLetters.sort((a, b) => a.length - b.length);
              console.log(byNumberOfLetters.join(" "))
              game()
              break;
            case "show only unique words":
              const onlyUniqueWords = newArr.filter((value, index, array) => array.indexOf(value) === index);
              console.log(onlyUniqueWords.join(" "))
              game()
              break;
            case "show only unique values":
              const onlyUniqueValues = newArr.filter((value, index, array) => array.indexOf(value) === index);
              console.log(onlyUniqueValues.join(" "))
              game()
              break;
            case "exit":
              return rl.close()
            default: wrongMethod()
          }
        })
}

const wrongMethod = () => {
  console.log("There is no such method")
  return gameNextStep()
}

const game = () => {
  console.log("If you want to exit, just write the word 'exit'")
  rl.question(
    'Hello. Enter some words or digits deviding them in spaces: ',
    value => {
      if (value === "exit") {
      return rl.close()
      }
      newArr = value.split(" ")
      if (newArr.length <= 1) {
        console.log("Enter more than one value")
        return game()
      }
      if (newArr.length > 10) {
        console.log("10 values is the maximum")
        return game()
      }
      console.log(`If your values are digits you can use methods: "ascending" and "descending".
If your values are words you can use methods: "by alphabet", "by number of letters", "show only unique words".
If your values are words and digits you can use a method: "show only unique values".`)
    gameNextStep()
    },
    );
};

game();