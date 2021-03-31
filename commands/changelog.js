const Discord = require('discord.js')
const { Database } = require('quickmongo')
const quickmongo = new Database(process.env.MONGO_URI, 'changelog')
const archivemongo = new Database(process.env.MONGO_URI, 'archived-changelogs')

module.exports = {
    aliases: ['changelog'],
    category: `Utility`,
    callback: async ({message}) => {
        if(await quickmongo.fetch(`changelog`)) {
            quickmongo.get(`changelog`).then((info) => {
                let version = info.version
                let pushed_by = info.pushed_by.split(' // ')
                let pushdateint = parseInt(info.pushdate)
                let pushdate = new Date(pushdateint).toLocaleString();
                let content = info.content

                let embed = new Discord.MessageEmbed()
                .setTitle('📝 Changelog')
                .setColor('GREEN')
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setDescription(`*Pushed by ${pushed_by[1]} on ${pushdate}*`)
                .addFields(
                    {name: `Ver. ${version}`, value: `${content}`}
                )
                .setFooter('Peepo Changelog')
                message.channel.send(embed)
            })
        } else {
            message.channel.send('There are no available changelogs. This is likely an error. Please contact the developer.')
        }
    }
  }