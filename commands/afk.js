const Discord = require('discord.js')
const { Database } = require('quickmongo')
const quickmongo = new Database(process.env.MONGO_URI, 'afk-status-database')


module.exports = {
    aliases: ['afk'],
    cooldown: '10s',
    category: `Utility`,
    expectedArgs: `<reason>`,
    callback: async ({ message, args }) => {
    if(!args) {
        message.channel.send('You need to have a reason for being AFK.')
    }
    if(await quickmongo.fetch(`afk-${message.author.id}+${message.guild.id}`)) {
        return;
    }
      let reason = args.join(' ')
      var timeinitiated = Date.now()

      try{
        await quickmongo.set(`afk-${message.author.id}+${message.guild.id}`, {reason: `${reason}`, timestamp: `${timeinitiated}`, guild_name: `${message.guild.name}`});
        let embed = new Discord.MessageEmbed()
            .setTitle('💤 AFK')
            .setDescription('You are now AFK.')
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
            .addFields({name: 'Reason', value: `${reason}`})
        message.channel.send(embed)
      } catch (err) {
          console.log(err)
          message.channel.send('Something went wrong setting your AFK status.')
      }
    }
  }