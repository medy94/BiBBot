const Discord = require("discord.js");
const client = new Discord.Client();
const keepAlive = require("./www/server");
const reactOnCommands = require("./commands");
const cronJobs = require("./cronJobs");

const PRODUCTION_MODE = true;
const START_MESSAGE = false;

const ADMIN_CHANNEL_ID = PRODUCTION_MODE ? '835778663680835625' : '837701215113838629';
const HOME_CHANNEL_ID = PRODUCTION_MODE ? '835172453927485541' : '837701215113838628';
const WELCOME_CHANNEL_ID = PRODUCTION_MODE ? '834827973479235637' : '837701215113838631';

keepAlive();
cronJobs(client);

client.on("ready", () => {
  console.log("Client ready!");
})

client.on("message", msg => {
    if (msg.author.bot) {
        return;
    }
    if (msg.guild && (msg.channel.id === HOME_CHANNEL_ID || msg.channel.id === ADMIN_CHANNEL_ID)) {
        if (msg.content.startsWith("!")) {
            reactOnCommands(msg, client);
        }
    }
});