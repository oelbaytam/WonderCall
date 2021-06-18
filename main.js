const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'Mzg2NTE3NjU3NDI5NDc1MzMy.WiKyng.53-267nhaRtseLBy-XwzVKRtqSc';
const fs = require('fs');

let Guilds = JSON.parse(fs.readFileSync('addresses.json'));
var Author;
var address;
var sending;
var index;


client.once('ready', () => {
    console.log('ready');
});

client.on('message', message => {
    if (message.guild != null) {
        commands(message);
    } 
});

client.login(token);


function commands(message) {
    if (Author == message.author && sending == true) {
        Chat.send(embedConstruct(message.content, message.member.displayHexColor, message.author.username, message.guild.name));
        sending = false;
    } else if (message.content[0] == ',' && !message.author.bot) {
        var params = message.content.split(' ');
        switch (params[0]) {

            case ",mail":
                address = parseInt(params[1]);
                if (address == null || address >= Guilds.length) {
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

            case ",help":
                message.member.send("Currently 4 commands are available:\n\n\n,help = Directly messages the user a help message.\n\n,register = Send this message in whichever chat you wish to recive mail. This is necassary to recieve mail\n\n,mail (number) = Messages corresponding server a message.\n\n,address = Tells you your servers address.");
                break;

            case ",register":
                if (arrayFinder(message.guild.id)) {
                    Guilds[index][0] = message.guild.id;
                    Guilds[index][1] = message.channel.id;
                    message.reply('You have changed your server\'s mailbox Your server\'s number is ' + index);
                }
                else {
                    Guilds.push([message.guild.id, message.channel.id]);
                    message.reply('You have successfully registered. Your server\'s number is ' + (Guilds.length-1));
                }
                fs.writeFileSync('addresses.json', JSON.stringify(Guilds));
                break;

            case ",address":
                arrayFinder(message.guild.id);
                message.reply('Your server\'s number is ' + index);
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

function arrayFinder(search) {
    for (var i = 0; i < Guilds.length; i++) {
        if (Guilds[i][0] == search) {
            index = i;
            return true;
        }
    }
    return false;
}