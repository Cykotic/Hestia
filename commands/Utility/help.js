const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
  name: "help",
  aliases: ["h", "cmds"],
  category: "Information",
  description: "Returns all Commands, or one specific Command information",
  usage: "[command], [aliases], [command <cmd>]",
  run: async (client, message, args) => {
    if (args[0]) {
      return getCMD(client, message, args[0]);
    }
    else {
      return getAll(client, message);
    }
  }
}

function getAll(client, message) {
  const embed = new MessageEmbed()
    .setThumbnail(client.user.displayAvatarURL())
    .setTitle("HELP MENU")
    .setColor(0xff0000)
    .setTimestamp()
    .setFooter(message.author.tag, message.member.user.displayAvatarURL())
  const commands = (category) => {
    return client.commands.filter(cmd => cmd.category === category)
      .map(cmd => `\`${cmd.name}\``).join(", ")
  }
  const info = client.categories.map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}**\n> ${commands(cat)}`)
    .reduce((string, category) => string + "\n" + category);
  return message.channel.send(
    embed.setDescription(info)
  )
}
function getCMD(client, message, input) {
  const embed = new MessageEmbed()
  const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()))
  let info = `No Information found for command **${input.toLowerCase()}**`;
  if (!cmd) {
    return message.channel.send(
      embed.setColor(0xff0000)
        .setDescription(info)).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))
  }
  info = "";
  if (cmd.name) info += `**Command name**: \`${cmd.name}\`\n`
  if (cmd.aliases) info += `**Aliases**: \`${cmd.aliases.map(a => `${a}`).join("\`, \`")}\`\n`
  if (cmd.description) info += `**Description**: \`${cmd.description}\`\n`
  return message.channel.send(
    embed.setColor(0xff0000)
      .setDescription(info))
}