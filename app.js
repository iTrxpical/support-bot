const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
const prefix = "[]";

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}! There are no apparent major bugs on my support bot.`);
    client.user.setActivity('over people. | =info', { type: 'WATCHING' });
    client.user.setStatus("online");
});

client.on('message', message => {

    let sender = message.author;

    if (sender.bot) return;
    if (message.channel.type === 'dm') {
        
        let c = client.channels.get("449182354507038720")
        c.send("t")

        
        message.channel.send("**We can't read anything in DM's! Please go into a guild with me in and run the command `=info` for information about me!!!**")
        return;
    }
    
    var guildid = message.guild.id
    
    let msg = message.content.toLowerCase();
    let args = message.content.slice(prefix.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();  

     if (!message.content.startsWith(prefix)) return;

        try {

            let commandFile = require(`./commands/${cmd}.js`);
            commandFile.run(Discord, client, message, args);

        } catch (e) {

            console.log(e);

        } finally {

            console.log(`${message.author.username} ran the command: ${cmd} and is being passed onto the handler...!`);

        }
})

client.login(process.env.TOKEN);
