const { DiscordAPIError } = require("discord.js")
const Discord = require('discord.js')

module.exports = {
    aliases: ['slap'],
    category: 'Fun',
    expectedArgs: '<member>',
    callback: ({ message, args }) => {
    if(message.mentions.users.first()) {
    const date = new Date().toLocaleString()
      const slapresponses = [
          'whacked',
          'slapped',
          'spanked',
          'whooped',
          'punched',
          'beat up',
          'shanked',
          'pissed on'
      ]
      const chosenslap = slapresponses[Math.floor(Math.random()* slapresponses.length)]
      let embed = new Discord.MessageEmbed()
      .setTitle('👋 Slap')
      .setColor('RANDOM')
      .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
      .addFields({name: `You ${chosenslap} someone!`, value: `<@${message.author.id}> ${chosenslap} <@${message.mentions.users.first().id}>!`})
      .setFooter(`${date}`)
      message.channel.send(embed)
      return;
    }else {
        message.reply('You didn\'t enter a person to slap!')
    }
    }
  }