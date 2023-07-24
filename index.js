const apiURL = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = 'a7a395383796d06cca8a9b6e28d5e277';

const TelegramApi = require('node-telegram-bot-api')
const TGtoken = '6210842516:AAFwnmG0o5nzixdJTrZW3_fhT3YGQMlvgbs'
const bot = new TelegramApi(TGtoken, {polling:true})


const commands = [
  { command: '/start', description: 'Начать' },
  { command: '/weather', description: 'Узнать погоду' },
  { command: '/info', description: 'Информация'},
];

bot.setMyCommands(commands).then(() => {
  console.log('Команды успешно установлены!');
}).catch((error) => {
  console.log('Ошибка установки команд:', error);
});

bot.on('message', async msg => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const name = msg.from.first_name;


  if (text === '/start') {
       await bot.sendMessage(chatId, `Привет ${name}! Я бот, предназначенный для прогноза погоды.`);
       await bot.sendMessage(chatId, `⛈`);
  }

  if(text==='/info')
  {
    bot.sendMessage(chatId, 'Я бот предназначеный для прогноза погоды созданый Dante другие работы моего гениального создателя можно посмотреть здесь:https://github.com/DanteMxR');
  }

  if (text === '/weather') { 
    
      bot.sendMessage(chatId, 'Введи пожалуйста название твоего города для прогноза погоды.');

      bot.once('message', weathermsg => {
          const city = weathermsg.text;
          const fullURL = `${apiURL}q=${city}&appid=${apiKey}`;

          fetch(fullURL)
              .then(response => response.json())
              .then(data => {
                  const City = data.name;
                  const temperature = data.main.temp;
                  const celsiusTemperature = temperature - 271.15;
                   bot.sendMessage(chatId, `Температура в ${City} равняется ${celsiusTemperature.toFixed(1)}°C`);
              })
              .catch(error => { 
                  console.error('Ошибка получения данных:', error);
              });
      });
  }
});