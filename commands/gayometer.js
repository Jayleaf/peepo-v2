const Discord = require('discord.js')

module.exports = {
    aliases: ['gayometer'],
    category: 'Fun',
    expectedArgs: '(optional: <member>)',
    callback: ({ message, args }) => {
      if(!args[0]) {
      let number = Math.floor(Math.random() * 100) + 1;
        let user = message.author.id;
        let embed = new Discord.MessageEmbed()
            .setTitle('🌈 Gay-o-meter 🌈')
            .setThumbnail('https://static.wikia.nocookie.net/floppa/images/b/b6/Bingus_Last_Photo.jpg/revision/latest?cb=20210102213655')
            .setColor('RANDOM')
            .addFields({name: 'Gay-o-meter', value: `<@${user}>, **You are ${number}% gay!**`})
            .setFooter(`${new Date().toLocaleString('en-us')}`)
            message.channel.send(embed)
      } else if(message.mentions.members.first()) {
        let number = Math.floor(Math.random() * 100) + 1;
        let user = message.mentions.users.first().id;
        let embed = new Discord.MessageEmbed()
            .setTitle('🌈 Gay-o-meter 🌈')
            .setColor('RANDOM')
            .setThumbnail('https://static.wikia.nocookie.net/floppa/images/b/b6/Bingus_Last_Photo.jpg/revision/latest?cb=20210102213655')
            .addFields({name: 'Gay-o-meter', value: `<@${user}> **is ${number}% gay!**`})
            .setFooter(`${new Date().toLocaleString()}`)
            message.channel.send(embed)
      } else {
        message.reply('That doesn\'t seem like a person.')
      }
    }
  }