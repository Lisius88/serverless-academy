const {program} = require("commander")
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs/promises');
const path = require('path');

const token = '5889077740:AAEJDXPTjbygcsX7JPucs8ut5XyhRMLPBrM';
const bot = new TelegramBot(token, {polling: true});

const filePath = path.join(__dirname, 'id.txt')

const exit =  () => {
    process.exit(1)
}

const sendMessage = async ({ message }) => {
    try {
    bot.on('message', async (msg) => {
    let chatId =  msg.chat.id;
        if (msg.text === '/start') {
            await fs.writeFile(filePath, chatId.toString());
            exit()
    }
    })
    if (message) {
    let userId = await fs.readFile(filePath)
        await bot.sendMessage(userId, message)
        console.log(message)
        exit()
    }
    else return
    } catch (error) {
    console.log(error.message)    
    }
}

const sendPhoto = async ({ photo }) => {
    try {
    if (photo) {
    let userId = await fs.readFile(filePath)
        await bot.sendPhoto(userId, photo);
        exit()
    }
    else return
    } catch (error) {
    console.log(error.message)    
    }
}

const getInfo = async ({ help }) => {
   try {
       if (help) {
           const flags = program.options.map(option => option.flags)
           const description = program.options.map(option => option.description)
           console.log(`Options:
1) ${flags[0]} ${description[0]}
2) ${flags[1]} ${description[1]}
3) ${flags[2]} ${description[2]}
           `)
           exit()
       }
    else return
    } catch (error) {
    console.log(error.message)    
    }
}


program
    .option("-m --message <message>", "Send message to user")
    .option("-p --photo <path>", "Send photo to user")
    .option("-h --help", "Display help for command")

program.parse(process.argv)
const options = program.opts()

sendMessage(options)
sendPhoto(options)
getInfo(options)
