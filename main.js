const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('ready to rumble')
    console.log(Discord.Guild.id);
});

var Call = false;

client.on('message', message => {
    if (message.content[0] === "/") {
        switch (message.content) {
            case "/call":
                dial(message);
                break;
            case "/help":
                help(message);
                break;
            default:
                message.channel.send(embedConstruct("Sire, I can only do so many mundane tasks!", "#ff2t48", "Invalid Command"));
        }
    }
    wonderChat(message)
});

client.login('Mzg2NTE3NjU3NDI5NDc1MzMy.WiKyng.gqkp81Eo2hH8WXZI8qshWro3L-4');

function dial() {
    if (message.content === "/call" && Call == true) {
        Call = false;
        message.channel.send(embedConstruct("Hanging up", "#ff6e75", "WonderChat"));
    } else if (message.content === "/call" && Call == false) {
        Call = true;
        message.channel.send(embedConstruct("Ringing server", "#00ff91", "WonderChat"));
    }
};
function wonderChat(message) {
    if (Call == true && !message.author.bot) {
        message.channel.send(embedConstruct(message.content, message.member.displayHexColor, message.author.username));
    }
};

function embedConstruct(title, color, auth) {
    const Embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setAuthor(auth)
    return Embed;
};

function help(message) {
    message.member.send(embedConstruct("Bot in alpha \nCurrently available commands:\n\n/call (number)\n\n/yellowpages\n\n/help\n\n Thank you for using my bot, I'm working on it :thumbsup:"))
};