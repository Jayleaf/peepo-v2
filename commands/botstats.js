const { DiscordAPIError } = require("discord.js")
const Discord = require('discord.js')

module.exports = {
    aliases: ['botstats'], 
    callback: ({client, message }) => {
      if(message.author.id === '395205580668534785') {
        var membercount = 0
        const cachedguildcount = client.guilds.cache.map(guild => guild.id)
        for(var i = 0; i < cachedguildcount.length; i++) {
         var list = client.guilds.cache.get(cachedguildcount[i])
        list.members.cache.forEach(member => membercount++);
         }
         const date = new Date().toLocaleString()
          let embed = new Discord.MessageEmbed()   
          .setTitle('📊 Bot Stats')
          .setDescription('Bot Version: 0')
          .addFields(
              {name: 'Guild Count', value: `${client.guilds.cache.size}`, inline: true},
              {name: 'Total Member Count', value: `${membercount}`, inline: true},
              {name: 'Channel Count', value: `${client.channels.cache.size}`, inline: true},
          )
          .setFooter(`Information accurate as of ${date}`)
          message.channel.send(embed)
      } else {
          console.log('someone that wasn\'t jayleaf tried to run this command. big nono')
      }
    }
  }