const express = require('express');
const { Telegraf } = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);
const app = express();
const port = process.env.PORT || 3000;

bot.start((ctx) => {
    ctx.reply(`Привет, ${ctx.from.first_name}! Я бот Шура на Render. Напиши /help`);
});

bot.help((ctx) => {
    ctx.reply(`Команды:\n/start — приветствие\n/help — помощь\n/time — время\n/ping — проверка`);
});

bot.command('time', (ctx) => {
    const now = new Date();
    ctx.reply(`Время: ${now.toLocaleString()}`);
});

bot.command('ping', (ctx) => {
    ctx.reply('Pong! Бот работает.');
});

bot.on('text', (ctx) => {
    const text = ctx.message.text;
    if (!text.startsWith('/')) {
        ctx.reply(`Ты написал: ${text}`);
    }
});

app.get('/', (req, res) => {
    res.send('Шура Бот работает на Render!');
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

bot.launch();
console.log('Бот запущен!');
