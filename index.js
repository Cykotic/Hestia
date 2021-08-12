const { token } = require("./config.json");
const fs = require('fs')
const { Client, Collection } = require('discord.js');
const { color } = require('colors')
const client = new Client({
  disableMentions: "everyone",
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_PRESENCES', "GUILD_VOICE_STATES"] } 
});


// client.on('debug', console.log);

/** collection **/
client.commands = new Collection(); // commands
client.aliases = new Collection(); // aliases
client.categories = fs.readdirSync("./commands/"); //categories

/** handlers **/
["command", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});


client.login(token);
