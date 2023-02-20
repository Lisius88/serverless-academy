import axios from "axios";

const endpoints = [
  'https://jsonbase.com/sls-team/json-793',
  'https://jsonbase.com/sls-team/json-955',
  'https://jsonbase.com/sls-team/json-231',
  'https://jsonbase.com/sls-team/json-931',
  'https://jsonbase.com/sls-team/json-93',
  'https://jsonbase.com/sls-team/json-342',
  'https://jsonbase.com/sls-team/json-770',
  'https://jsonbase.com/sls-team/json-491',
  'https://jsonbase.com/sls-team/json-281',
  'https://jsonbase.com/sls-team/json-718',
  'https://jsonbase.com/sls-team/json-310',
  'https://jsonbase.com/sls-team/json-806',
  'https://jsonbase.com/sls-team/json-469',
  'https://jsonbase.com/sls-team/json-258',
  'https://jsonbase.com/sls-team/json-516',
  'https://jsonbase.com/sls-team/json-79',
  'https://jsonbase.com/sls-team/json-706',
  'https://jsonbase.com/sls-team/json-521',
  'https://jsonbase.com/sls-team/json-350',
  'https://jsonbase.com/sls-team/json-64'
];

async function makeRequest(url) {
  try {
      const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return null;
  }
}

async function processEndpoint(url) {
  let response;
  for (let i = 0; i < 3; i++) {
      response = await makeRequest(url);
      if (response.isDone === undefined) {
        console.log(`[Fail] ${url}: The endpoint is unavailable`)
      break;
    }
      if (response) {
      break;
    }
  }
    if (!response) {
    return null;
  }
  const isDone = findIsDone(response);
  return isDone;
}

function findIsDone(data) {
    if (typeof data === 'object' && data !== null) {
      if ('isDone' in data) {
      return data.isDone;
    }
    for (const key in data) {
      const isDone = findIsDone(data[key]);
      if (isDone !== null) {
        return isDone;
        }
      }
  }
  return null;
}

async function main() {
  const results = {
    trueCount: 0,
    falseCount: 0,
  };
  for (const url of endpoints) {
      const isDone = await processEndpoint(url);
    if (isDone !== null) {
      console.log(`[Success] ${url}: isDone - ${isDone}`);
      if (isDone) {
        results.trueCount++;
      } else {
        results.falseCount++;
      }
      }
    }
  console.log(`Found True values: ${results.trueCount},`);
  console.log(`Found False values: ${results.falseCount}`);
}

main();