const Discord = require("discord.js");
const client = new Discord.Client();
const keepAlive = require("./www/server");
const reactOnCommands = require("./commands");
const cronJobs = require("./cronJobs");

const PRODUCTION_MODE = true;
const START_MESSAGE = false;

const ADMIN_CHANNEL_ID = '894277404661547128';
const HOME_CHANNEL_ID = '894272742134800456';
const WELCOME_CHANNEL_ID = HOME_CHANNEL_ID;

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

client.login(PRODUCTION_MODE ? process.env.PROD_TOKEN : process.env.DEV_TOKEN)