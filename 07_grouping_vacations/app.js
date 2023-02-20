import path from 'path';
import * as fs from 'fs';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const filePath = path.join(__dirname, `/data/vacations.json`)
const filePathSecond = path.join(__dirname, `/data/correct_vacations.json`)

const data = fs.readFileSync(filePath, 'utf-8');
const originalData = JSON.parse(data)


const newData = {};
for (const vacation of originalData) {
   console.log(vacation)
  const userId = vacation.user._id;
  if (!newData[userId]) {
    newData[userId] = [];
  }
  newData[userId].push(vacation);
}

const result = [];
for (const userId of Object.keys(newData)) {
  const vacations = [];
  for (const vacation of newData[userId]) {
    vacations.push({
      startDate: vacation.startDate,
      endDate: vacation.endDate
    });
  }
  const user = {
    userId: userId,
    userName: newData[userId][0].user.name,
    vacations: vacations
  };
  result.push(user);
}
console.log(result);

fs.writeFileSync(filePathSecond, JSON.stringify(result))