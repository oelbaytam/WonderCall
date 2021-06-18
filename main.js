const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'Mzg2NTE3NjU3NDI5NDc1MzMy.WiKyng.oQaCNByfblAoTYvhByE_UmGia7o';

var Author;
var address;
var sending;
var Guilds = [
    ["772619157819752459", "855238310029164555"],
    ["855440286670127174", "855481168584638504"]
];

client.once('ready', () => {
    console.log('ready');
});

client.on('message', message => {
    commands(message);
});

client.login(token);


function commands(message) {
    if (Author == message.author && sending == true) {
        Chat.send(embedConstruct(message.content, message.member.displayHexColor, message.author.username, message.guild.name));
        sending = false;
    } else if (message.content[0] == '~' && !message.author.bot) {
        var params = message.content.split(' ');
        switch (params[0]) {

            case "~txt":
                address = parseInt(params[1]);
                if (address == null) {
                    message.reply("This number is invalid.");
                    return null;
                }
                if (message.guild == client.guilds.resolve(Guilds[address][0])) {
                    message.reply("You can not message the same server");
                    return null;
                }
                Reciever = client.guilds.resolve(Guilds[address][0]);
                Chat = Reciever.channels.resolve(Guilds[address][1]);
                Author = message.author;
                message.reply('What would you like to say?');
                sending = true;
                break;

            case "~h":
                message.member.send("Currently 2 commands are available:\n\n\n~h = Directly messages the user a help message.\n\n~txt (number) = Messages corresponding server a message.");
                break;

            default:
                message.reply('That is not a command.');
                break;
        }
    }
}

function embedConstruct(title, color, auth, foot) {
    const Embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setAuthor(auth)
        .setFooter(foot)
    return Embed;
};