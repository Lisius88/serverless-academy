import path from 'path';
import * as fs from 'fs';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const fileContents = [];
for (let i = 0; i <= 19; i++) {
  const filePath = path.join(__dirname, `/words/out${i}.txt`)

  const contents = fs.readFileSync(filePath, 'utf-8');
  fileContents.push(contents);
}

const uniqueUsernames = new Set();
for (const content of fileContents) {
  const usernames = content.split(/\s+/);
  for (const username of usernames) {
    uniqueUsernames.add(username);
  }
}


const usernameCounts = new Map();
for (let i = 1; i <= 20; i++) {
  const contents = fileContents[i - 1];
  const usernames = contents.split(/\s+/);
  for (const username of usernames) {
    const count = usernameCounts.get(username) || 0;
    usernameCounts.set(username, count + 1);
  }
}

let usernamesInAllFiles = 0;
for (const [username, count] of usernameCounts) {
  if (count === 20) {
    usernamesInAllFiles++;
  }
}

let usernamesInAtLeastTenFiles = 0;
for (const [username, count] of usernameCounts) {
  if (count >= 10) {
    usernamesInAtLeastTenFiles++;
  }
}

function uniqueValues() {
  return uniqueUsernames.size;
}

function existInAllFiles() {
  return usernamesInAllFiles;
}

function existInAtleastTen() {
  return usernamesInAtLeastTenFiles;
}

console.time('Processing time');
const uniqueCount = uniqueValues();
const allFilesCount = existInAllFiles();
const tenFilesCount = existInAtleastTen();
console.timeEnd('Processing time');

console.log(`Unique usernames: ${uniqueCount}`);
console.log(`Usernames in all 20 files: ${allFilesCount}`);
console.log(`Usernames in at least 10 files: ${tenFilesCount}`);