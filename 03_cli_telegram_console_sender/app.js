import TelegramBot from "node-telegram-bot-api";
import path from 'path';
import * as fs from 'fs';
import * as url from 'url';
import {program} from 'commander'
import { exit } from "process";


const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const filePath = path.join(__dirname, 'id.txt')
const filePathSecond = path.join(__dirname, 'token.txt')
const TOKEN = fs.readFileSync(filePathSecond)

const bot = new TelegramBot(JSON.parse(TOKEN), { polling: true });

program
  .command('send-message <message>')
  .description('Send a message to your telegram bot')
    .action(async (message) => {
    bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    fs.writeFileSync(filePath, chatId.toString())
    if (msg.text === '/start') {
    await bot.sendMessage(chatId, message)
    exit()
    }
    });
    const id = fs.readFileSync(filePath)
    if (id.toString() && id.toString() !== undefined && id.toString() !== null) {
    await bot.sendMessage(id, message);
    return exit()
    }
    });
  
program
  .command('send-photo <path>')
  .description('Send a photo to your telegram bot')
    .action(async (path) => {
    bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    fs.writeFileSync(filePath, chatId.toString())
    if (msg.text === '/start') {
    await bot.sendPhoto(chatId, path)
    exit()
    }
    });
    const id = fs.readFileSync(filePath)
     if (id.toString() && id.toString() !== undefined && id.toString() !== null) {
    await bot.sendPhoto(id, path);
    exit()    
    }
  });


program
    .option("-h --help", "Display help for command")

program.parse(process.argv)


