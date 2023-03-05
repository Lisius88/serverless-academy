import TelegramBot from "node-telegram-bot-api";
import axios from 'axios';
import path from 'path';
import * as fs from 'fs';
import * as url from 'url';
import NodeCache from "node-cache";
import { opts } from "./options/options.js";

const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );
const date = new Date();
const newDate = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear()
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

const wind = async (id) => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=41.390205&lon=2.154007&units=metric&appid=${APIKEY}`)  
    const data = response.data.list[0].wind;
    const { speed, deg, gust } = data;
    await bot.sendMessage(id, `Wind speed: ${speed}m/s
Wind degrees: ${deg}deg
Wind gust: ${gust}m/s
            `);
}

const dollarRate = async (id) => {
    try {
    const responsePrivat = await axios.get(`https://api.privatbank.ua/p24api/exchange_rates?json&date=${newDate}`)
    const responseMono = await axios.get('https://api.monobank.ua/bank/currency')
    const dataMono = responseMono.data;
    const usd = dataMono.find(currency => currency.currencyCodeA === 840)
    const eur = dataMono.find(currency => currency.currencyCodeA === 978)
        const dataDollar = responsePrivat.data.exchangeRate[23];
        const dataEuro = responsePrivat.data.exchangeRate[8];
        myCache.set("usdSell", usd.rateSell.toFixed(2))
        myCache.set("usdBuy", usd.rateBuy.toFixed(2))
        myCache.set("usdSellPrivat", dataDollar.saleRateNB.toFixed(2))
        myCache.set("usdBuyPrivat", dataDollar.purchaseRateNB.toFixed(2))
        myCache.set("eurSell", eur.rateSell.toFixed(2))
        myCache.set("eurBuy", eur.rateBuy.toFixed(2))
        myCache.set("eurSellPrivat", dataEuro.saleRateNB.toFixed(2))
        myCache.set("eurBuyPrivat", dataEuro.purchaseRateNB.toFixed(2))
    await bot.sendMessage(id, `${newDate}
PrivatBank
Sale: USD = ${dataDollar.saleRateNB.toFixed(2)}UAH
Purchase: USD = ${dataDollar.purchaseRateNB.toFixed(2)}UAH

MonoBank
Sale: USD = ${usd.rateSell.toFixed(2)}UAH
Purchase: USD = ${usd.rateBuy.toFixed(2)}UAH
    `);    
    } catch (error) {
        const usdBuyFromCache = myCache.get("usdBuy")
        const usdSellFromCache = myCache.get("usdSell")
        const usdBuyPrivat = myCache.get("usdBuyPrivat")
        const usdSellPrivat = myCache.get("usdSellPrivat")
        console.log(error.message)
        await bot.sendMessage(id, `${newDate}
PrivatBank
Sale: USD = ${usdSellPrivat}UAH
Purchase: USD = ${usdBuyPrivat}UAH

MonoBank
Sale: USD = ${usdSellFromCache}UAH
Purchase: USD = ${usdBuyFromCache}UAH
    `);
    }
}

const euroRate = async (id) => {
    try {
    const response = await axios.get(`https://api.privatbank.ua/p24api/exchange_rates?json&date=${newDate}`)
    const responseMono = await axios.get('https://api.monobank.ua/bank/currency')
    const dataMono = responseMono.data;
    const dataDollar = responsePrivat.data.exchangeRate[23];
    const usd = dataMono.find(currency => currency.currencyCodeA === 840)
    const eur = dataMono.find(currency => currency.currencyCodeA === 978)    
        const dataEuro = response.data.exchangeRate[8];
        myCache.set("usdSell", usd.rateSell.toFixed(2))
        myCache.set("usdBuy", usd.rateBuy.toFixed(2))
        myCache.set("usdSellPrivat", dataDollar.saleRateNB.toFixed(2))
        myCache.set("usdBuyPrivat", dataDollar.purchaseRateNB.toFixed(2))
        myCache.set("eurSell", eur.rateSell.toFixed(2))
        myCache.set("eurBuy", eur.rateBuy.toFixed(2))
        myCache.set("eurSellPrivat", dataEuro.saleRateNB.toFixed(2))
        myCache.set("eurBuyPrivat", dataEuro.purchaseRateNB.toFixed(2))
    await bot.sendMessage(id, `${newDate}
PrivatBank
Sale: EUR = ${dataEuro.saleRateNB.toFixed(2)}UAH
Purchase: EUR = ${dataEuro.purchaseRateNB.toFixed(2)}UAH

MonoBank
Sale: EUR = ${eur.rateSell.toFixed(2)}UAH
Purchase: EUR = ${eur.rateBuy.toFixed(2)}UAH
    `);    
    } catch (error) {
        console.log(error.message)
        const eurBuyFromCache = myCache.get("eurBuy")
        const eurSellFromCache = myCache.get("eurSell")
        const eurBuyPrivat = myCache.get("eurBuyPrivat")
        const eurSellPrivat = myCache.get("eurSellPrivat")

    await bot.sendMessage(id, `${newDate}
PrivatBank
Sale: EUR = ${eurSellPrivat}UAH

Purchase: EUR = ${eurBuyPrivat}UAH

MonoBank
Sale: EUR = ${eurSellFromCache}UAH
Purchase: EUR = ${eurBuyFromCache}UAH
    `);
    }
}


bot.on('message', (msg) => {
    const chatId = msg.chat.id
    const text = msg.text

    switch (text) {
        case "/start":
        bot.sendMessage(chatId, "Hi! What do you want to see?", opts[2])    
            break;
        case "/Eschange rates":
        bot.sendMessage(chatId, "Choose the currency!", opts[0])    
            break;
        case "/Weather":
        forecast(chatId)
        bot.sendMessage(chatId, "If you want to know the forecast for the day, select the interval you are interested in", opts[1])   
            break;
        case "at intervals of 3 hours":
        forecastWithInterval(chatId)    
            break;
        case "at intervals of 6 hours":
        forecastWithIntervalSecond(chatId)    
            break;
        case "wind":
        wind(chatId)    
            break;
        case "EUR":
        euroRate(chatId)   
            break;
        case "USD":
        dollarRate(chatId)    
            break;
        case "/back":
        bot.sendMessage(chatId, "What do you want to see?", opts[2])   
            break;
    }
});




