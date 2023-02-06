const TelegramApi = require('node-telegram-bot-api')
const moment = require('moment-timezone');
const token ='5680893606:AAHbdfv_yBxp75BDNTLhRs1mkhRlV8DN7A0'

const bot = new TelegramApi(token, {polling:true})


const countryNames = {
    reply_markup:JSON.stringify({
        inline_keyboard:[
            [{text:'New York', callback_data:'New York,America/New_York'},{text:'Tokyo', callback_data:'Tokyo,Asia/Tokyo'}],
            [{text:'Los Angeles', callback_data:'Los Angeles,America/Los_Angeles'},{text:'Sydney', callback_data:'Sydney,Australia/Sydney'}],
        ]
    })
}

 const start =()=>{
     bot.setMyCommands([
         {command: '/start', description: 'Welcome to Cities Time Bot'},
         {command: '/info', description: 'Aboute me'},
         {command: '/cities', description: 'Choose city'},

     ])
       
bot.on('message',  async msg =>{
         console.log(msg);
         const text = msg.text;
         const chatId = msg.chat.id;
         if(text === '/start'){
            return bot.sendMessage(chatId , `Welcome to Cities Time Bot Dear  ${msg.from.first_name}!!. Please Read information about me`)
         }
         if(text === '/info'){
             return  bot.sendMessage(chatId , `I am a Telegram bot for getting cities' time zones. Please check the 'Cities' section and choose a city, and I will show you the time zone there.` )
         }
         if(text === '/cities'){
            return bot.sendMessage(chatId, 'Choose city', countryNames )
         }
         return bot.sendMessage(chatId, "I'm sorry but I don't understand you")
        })
 bot.on('callback_query',  async msg=>{
            const cityData = msg.data.split(',')
              const chatId = msg.message.chat.id
                 const now = new Date();
                   const countryTime = moment.tz(now, cityData[1]).format('HH:mm:ss');
                   const countryTimeSplited = countryTime
                    await bot.sendMessage(chatId, `You chose ${cityData[0]} and current time in  ${countryTimeSplited}`)
                    console.log(msg)
                    console.log(countryTimeSplited.split(','))

        })
 }
 start()