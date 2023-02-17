import TelegramBot from "node-telegram-bot-api";
import axios from 'axios';
import path from 'path';
import * as fs from 'fs';
import * as url from 'url';
import {opts} from './options/options.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const filePath = path.join(__dirname, 'token.txt')
const TOKEN = fs.readFileSync(filePath)
const bot = new TelegramBot(JSON.parse(TOKEN), { polling: true });
const APIKEY = '907514a8881bedca6af2ff52f1e71558'

const forecastWithInterval = async (id) => {
    try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=41.390205&lon=2.154007&units=metric&appid=${APIKEY}`)  
        const data = response.data.list;
        const newData = data.splice(1, 9)
        await bot.sendMessage(id, `
${newData[0].dt_txt}
${newData[0].weather[0].main} ${Math.round(newData[0].main.temp)}℃
Feels like: ${Math.round(newData[0].main.feels_like)}℃
Min: ${Math.round(newData[0].main.temp_min)}℃                              
Max: ${Math.round(newData[0].main.temp_max)}℃                             
Pressure: ${newData[0].main.pressure}                  
Humidity: ${newData[0].main.humidity}%                

${newData[1].dt_txt}
${newData[1].weather[0].main} ${Math.round(newData[1].main.temp)}℃
Feels like: ${Math.round(newData[1].main.feels_like)}℃
Min: ${Math.round(newData[1].main.temp_min)}℃
Max: ${Math.round(newData[1].main.temp_max)}℃
Pressure: ${newData[1].main.pressure}
Humidity: ${newData[1].main.humidity}%

${newData[2].dt_txt}
${newData[2].weather[0].main} ${Math.round(newData[2].main.temp)}℃
Feels like: ${Math.round(newData[3].main.feels_like)}℃  
Min: ${Math.round(newData[2].main.temp_min)}℃ 
Max: ${Math.round(newData[2].main.temp_max)}℃ 
Pressure: ${newData[2].main.pressure} 
Humidity: ${newData[2].main.humidity}%  

${newData[3].dt_txt}
${newData[3].weather[0].main} ${Math.round(newData[3].main.temp)}℃
Feels like: ${Math.round(newData[3].main.feels_like)}℃
Min: ${Math.round(newData[3].main.temp_min)}℃
Max: ${Math.round(newData[3].main.temp_max)}℃
Pressure: ${newData[3].main.pressure}
Humidity: ${newData[3].main.humidity}%

${newData[4].dt_txt}
${newData[4].weather[0].main} ${Math.round(newData[4].main.temp)}℃
Feels like: ${Math.round(newData[4].main.feels_like)}℃
Min: ${Math.round(newData[4].main.temp_min)}℃ 
Max: ${Math.round(newData[4].main.temp_max)}℃ 
Pressure: ${newData[4].main.pressure}
Humidity: ${newData[4].main.humidity}%

${newData[5].dt_txt}
${newData[5].weather[0].main} ${Math.round(newData[5].main.temp)}℃
Feels like: ${Math.round(newData[5].main.feels_like)}℃
Min: ${Math.round(newData[5].main.temp_min)}℃
Max: ${Math.round(newData[5].main.temp_max)}℃
Pressure: ${newData[5].main.pressure}
Humidity: ${newData[5].main.humidity}%

${newData[6].dt_txt}
${newData[6].weather[0].main} ${Math.round(newData[6].main.temp)}℃
Feels like: ${Math.round(newData[6].main.feels_like)}℃
Min: ${Math.round(newData[6].main.temp_min)}℃
Max: ${Math.round(newData[6].main.temp_max)}℃
Pressure: ${newData[6].main.pressure}
Humidity: ${newData[6].main.humidity}%

${newData[7].dt_txt}
${newData[7].weather[0].main} ${Math.round(newData[7].main.temp)}℃
Feels like: ${Math.round(newData[7].main.feels_like)}℃
Min: ${Math.round(newData[7].main.temp_min)}℃
Max: ${Math.round(newData[7].main.temp_max)}℃
Pressure: ${newData[7].main.pressure}
Humidity: ${newData[7].main.humidity}%
`);    
    } catch (error) {
    console.log(error)
    }
}

const forecastWithIntervalSecond = async (id) => {
    try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=41.390205&lon=2.154007&units=metric&appid=${APIKEY}`)  
        const data = response.data.list;
        const newData = data.splice(2, 10)
        await bot.sendMessage(id, `
${newData[0].dt_txt}
${newData[0].weather[0].main} ${Math.round(newData[0].main.temp)}℃
Feels like: ${Math.round(newData[0].main.feels_like)}℃
Min: ${Math.round(newData[0].main.temp_min)}℃
Max: ${Math.round(newData[0].main.temp_max)}℃
Pressure: ${newData[0].main.pressure}
Humidity: ${newData[0].main.humidity}%

${newData[2].dt_txt}
${newData[2].weather[0].main} ${Math.round(newData[2].main.temp)}℃
Feels like: ${Math.round(newData[2].main.feels_like)}℃
Min: ${Math.round(newData[2].main.temp_min)}℃
Max: ${Math.round(newData[2].main.temp_max)}℃
Pressure: ${newData[2].main.pressure}
Humidity: ${newData[2].main.humidity}%

${newData[4].dt_txt}
${newData[4].weather[0].main} ${Math.round(newData[4].main.temp)}℃
Feels like: ${Math.round(newData[4].main.feels_like)}℃
Min: ${Math.round(newData[4].main.temp_min)}℃
Max: ${Math.round(newData[4].main.temp_max)}℃
Pressure: ${newData[4].main.pressure}
Humidity: ${newData[4].main.humidity}%

${newData[6].dt_txt}
${newData[6].weather[0].main} ${Math.round(newData[6].main.temp)}℃
Feels like: ${Math.round(newData[6].main.feels_like)}℃
Min: ${Math.round(newData[6].main.temp_min)}℃
Max: ${Math.round(newData[6].main.temp_max)}℃
Pressure: ${newData[6].main.pressure}
Humidity: ${newData[6].main.humidity}%
            `);    
    } catch (error) {
    console.log(error)
    }
}

const forecast = async (id) => {
    try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=41.390205&lon=2.154007&units=metric&appid=${APIKEY}`)  
    const data = response.data.list[0];
    await bot.sendMessage(id, `Today in Barcelona:
Now: ${data.weather[0].main} ${Math.round(data.main.temp)}℃
Feels like: ${Math.round(data.main.feels_like)}℃
Min: ${Math.round(data.main.temp_min)}℃
Max: ${Math.round(data.main.temp_max)}℃
Pressure: ${data.main.pressure}
Humidity: ${data.main.humidity}%
            `);    
    } catch (error) {
    console.log(error)
    }
}

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
  if (msg.text === '/start') {
  bot.sendMessage(chatId, "Hi! Do you want to know the weather in Barcelona?", opts[1])
  }
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id
    const text = msg.text
    
    switch (text) {
        case "Forecast in Barcelona":
        forecast(chatId)
        bot.sendMessage(chatId, "If you want to know the forecast for the day, select the interval you are interested in", opts[0])   
            break;
        case "at intervals of 3 hours":
        forecastWithInterval(chatId)    
            break;
        case "at intervals of 6 hours":
        forecastWithIntervalSecond(chatId)    
            break;
        case "/back":
        bot.sendMessage(chatId, "You can try again", opts[1])   
            break;
    }
});