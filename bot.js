const botSettings = require("./botsettings.json");
const token = require("./token.json");
//const prefix = require("./prefixes.json");
const Discord = require("Discord.js");
const bot = new Discord.Client();
const fs = require("fs");

bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json");

fs.readdir(`./cmds`, (err, files) => {
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0){
		console.log("No commands to load");
		return;
	}

	console.log("Found " + jsfiles.length + " commands!");
	console.log("Loading " + jsfiles + " commands!");

	jsfiles.forEach((f, i) => {
		let props = require(`./cmds/${f}`);
		console.log(i + 1 + ": " + f + " loaded");
		bot.commands.set(props.help.name, props);

	});
})

bot.on('messageUpdate', (omsg, nmsg) => {
	console.log('Hey this works!');
  });

bot.on("ready", async  () =>{
	
	bot.user.setActivity("Don't disturb me!", {type: "WATCHING"});
	console.log(`Bot is ready ${bot.user.username}`);
	console.log('Prefix: ' + botSettings.prefix);

	try{
		let link = await bot.generateInvite(["ADMINISTRATOR"])
		console.log(link);
	}catch(e){
		console.log(e.stack); 
	}

	bot.setInterval(() => {
		for(let i in bot.mutes){
			let time = bot.mutes[i].time;
			let guildId = bot.mutes[i].guild;
			let guild = bot.guilds.get(guildId);
			if(!guild) continue;
			let member = guild.members.get(i);
			if(!member) continue;
			let mutedRole = guild.roles.find(r => r.name === "Muted");
			if(!mutedRole) continue;

			if(Date.now() > time){
				member.removeRole(mutedRole);
				delete bot.mutes[i];

				fs.writeFile(`./mutes.json`, JSON.stringify(bot.mutes), err => {
					if(err) throw err;
					console.log(member.user.tag + " has been unmuted!");
				});
			}
		}
	}, 5000);
	
});

bot.on("guildMemberAdd", async member => {
    console.log("Found new user!");
    member.guild.channels.find("name", "welcome").send("Welcome " + member.displayName + " to the Spirafy Discord Server");
});

bot.on("message", async message => {
	if(message.mentions.users.first.username == "sword1234") return message.reply("Stop disturbing the server owners!");
	if(message.channel.type === "dm") return;

	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);
	
	if(!command.startsWith(botSettings.prefix)) return;

	let cmd = bot.commands.get(command.slice(botSettings.prefix.length));
	if(cmd) cmd.run(bot, message, args);
});

bot.on("channelDelete", async channel => {

});

bot.login(token.token);