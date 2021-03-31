const Discord = require('discord.js')
const { Database } = require('quickmongo')
const quickmongo = new Database(process.env.MONGO_URI, 'afk-status-database')

module.exports = (client, instance) => {
    client.on('message', async message => {
      if(message.author.bot) return;

      if(await quickmongo.fetch(`afk-${message.author.id}+${message.guild.id}`)) {
        quickmongo.get(`afk-${message.author.id}+${message.guild.id}`).then((info) => {
                var reason = info.reason
                var time = info.timestamp
                  var totalSeconds = Math.floor(Math.abs(time - Date.now()) / 1000)
                  hours = Math.floor(totalSeconds / 3600);
                  totalSeconds %= 3600;
                  minutes = Math.floor(totalSeconds / 60);
                  seconds = totalSeconds % 60;
                  
            let embed = new Discord.MessageEmbed()
            .setTitle('💤 AFK')
            .setDescription('You are no longer AFK.')
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
            .addFields({name: `Reason`, value: `"*${reason}*"`, inline: true}, {name:`You were AFK for`, value: `${hours} hours, ${minutes} minutes, and ${seconds} seconds.`, inline: true})
            message.channel.send(embed)
        })
        await quickmongo.delete(`afk-${message.author.id}+${message.guild.id}`)
    }


      if(message.mentions.members.first()){
          console.log(message.mentions.members.first().id)
          if(await quickmongo.fetch(`afk-${message.mentions.members.first().id}+${message.guild.id}`)){
              quickmongo.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`).then((info) => {
                var reason = info.reason
                var time = info.timestamp
                var totalSeconds = Math.floor(Math.abs(time - Date.now()) / 1000)
                hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                minutes = Math.floor(totalSeconds / 60);
                seconds = totalSeconds % 60;
                    let embed = new Discord.MessageEmbed()
                    .setTitle('💤 AFK')
                    .setDescription(`This user is currently AFK.`)
                    .setAuthor(`${message.mentions.members.first().user.tag}`, `${message.mentions.users.first().displayAvatarURL()}`)
                    .addFields({name: `Reason`, value: `"*${reason}*"`, inline: true}, {name:`AFK For`, value: `${hours} hour(s), ${minutes} minute(s), and ${seconds} seconds.`, inline: true})
                message.channel.send(embed)
              })
          } else return console.log('No MONGO entry found.')
      }
    })
  }