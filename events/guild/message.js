const { prefix } = require("../../config.json");
const schedule = require("node-schedule");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {

  /* the prefix system along ith aliases, or what i like to call the prefix system */
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.members.fetch(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (!command) return;

  // auto deleting messages specify in a certain channel only!
  if (client.channels.cache.get("849948065754513469")) {
    const job = new schedule.scheduleJob({ hour: new schedule.Range(0, 59, 30) },
      function () {
        message.channel.bulkDelete(20);
        return message.channel.send(new MessageEmbed()
          .setTitle("Hestia's Auto-Delete Messages")
          .setColor(0xff0000)
        ).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))
      })
  }

  if (command) command.run(client, message, args)
}