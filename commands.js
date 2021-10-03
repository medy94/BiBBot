const globalService = require("./services/service");

const service = globalService();

async function sendMessageToServerOwner(msg) {
    let member = service.member.getServerOwner(msg);
    if (member) {
        let beautified = msg.content.substring(11, msg.content.length);
        await member.user.send(beautified);
    }
}

function isAdmin(msg) {
    return service.role.userHasRoleByName(msg.member, "Admin")
}

async function reactOnCommands(msg, client) {
    const lowerMessage = msg.content.toLowerCase();

    switch (true) {
        case lowerMessage.includes("vorschlag"):
            sendMessageToServerOwner(msg);
            break;
        case lowerMessage.startsWith("!commands"):
            msg.reply("Meine Commands :D");
            break;
        case lowerMessage.includes("uptime"):
            msg.reply("Da bin ich!");
            break;
        case lowerMessage.includes("acommands") && isAdmin(msg):
            msg.reply("Admin Command Liste INC!");
            break;
        default:
            msg.reply("ich konnte deinen Befehl nicht zuordnen. Gebe **!commands** ein, im eine Liste der Befehle zu erhalten.");
    }
}

module.exports = reactOnCommands;