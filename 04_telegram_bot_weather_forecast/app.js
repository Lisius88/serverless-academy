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
        const message = data.map(data => `${data.dt_txt} ${data.weather[0].main} ${Math.round(data.main.temp)}℃ 
Feels like:${Math.round(data.main.feels_like)}℃ 
Min: ${Math.round(data.main.temp_min)}℃ 
Max: ${Math.round(data.main.temp_max)}℃
Pressure: ${data.main.pressure} 
Humidity: ${data.main.humidity}%
`)
            .join('\n');
        await bot.sendMessage(id, message);    
    } catch (error) {
    console.log(error)
    }
}

const forecastWithIntervalSecond = async (id) => {
    try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=41.390205&lon=2.154007&units=metric&appid=${APIKEY}`)  
        const data = response.data.list;
        const message = data.filter((data, index) => index % 2 == 0)
            .map(data => `${data.dt_txt} ${data.weather[0].main} ${Math.round(data.main.temp)}℃ 
Feels like:${Math.round(data.main.feels_like)}℃ 
Min: ${Math.round(data.main.temp_min)}℃ 
Max: ${Math.round(data.main.temp_max)}℃
Pressure: ${data.main.pressure} 
Humidity: ${data.main.humidity}%
`)
            .join('\n');
    await bot.sendMessage(id, message);    
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
    const chatId = msg.chat.id
    const text = msg.text
    
    switch (text) {
        case "/start":
        bot.sendMessage(chatId, "Hi! Do you want to know the weather in Barcelona?", opts[1]) 
            break;
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