const Discord = require('discord.js')
const { Database } = require('quickmongo')
const quickmongo = new Database(process.env.MONGO_URI, 'changelog')
const archivemongo = new Database(process.env.MONGO_URI, 'archived-changelogs')



module.exports = {
    aliases: ['newchangelog'],
    cooldown: '10s',
    callback: async ({ message, args }) => {
    const { channel } = message
    const authorid = message.author.id
    if(message.author.id === '395205580668534785') {
    
    if(await quickmongo.fetch(`changelog`)) {
        quickmongo.get(`changelog`).then((info) => {
            let version = info.version
            message.channel.send(`Please type the new version of the bot. Current Version: ${version}`)
        })
    } else {
        message.channel.send(`Please input the new version of the bot.`)
    }
    var collectedversion = ''
    var changelog_message = ''

    
    const filter = m => m.author.id  === message.author.id
    const collector = new Discord.MessageCollector(message.channel, filter, {
        max: 1,
        time: 1000 * 10,
    })
    collector.on('collect', m => {
        if(isNaN(m.content)) {
        message.channel.send('The version must be a number.')
        return;
    }
    collectedversion = m.content
    if(collectedversion) {

    message.channel.send('Please enter the changelog.')

    var filter2 = m => m.author.id  === message.author.id
    const collector2 = new Discord.MessageCollector(message.channel, filter2, {
        max: 1,
        time: 1000 * 120,
    })
    collector2.on('collect', m => {
        changelog_message = m.content



    if(changelog_message) {

    let embed = new Discord.MessageEmbed()
        .setTitle('📝 Changelog')
        .setDescription('Does this look correct? Respond with Y or N.')
        .addFields(
            {name: `Ver. ${collectedversion}`, value: `${changelog_message}`}
        )
        .setColor('GREEN')
    message.channel.send(embed)
    var filter3 = m => m.author.id  === message.author.id
    const collector3 = new Discord.MessageCollector(message.channel, filter3, {
        max: 1,
        time: 1000 * 120,
    })
    collector3.on('collect', async m => {
        if(m.content === 'Y' || m.content === 'y') {
            try{
                let timestamp = Date.now()
                await quickmongo.set(`changelog`, {version: `${collectedversion}`, pushed_by: `${message.author.id} // ${message.author.tag}`, pushdate: `${timestamp}`, content: `${changelog_message}`});
                await archivemongo.set(`Changelog from: ${new Date().toLocaleString()}`, {version: `${collectedversion}`, pushed_by: `${message.author.id} // ${message.author.tag}`, pushdate: `${timestamp}`, content: `${changelog_message}`});
                message.channel.send('Successfully pushed the changelog!')
              } catch (err) {
                  console.log(err)
                  message.channel.send('Something went wrong pushing the changelog.')
              }	
        } else if(m.content === 'N' || m.content === 'n') {
            message.channel.send('Aborting...')
            return;
        }
    })

        
    }
})
    }
})
   


    

     // try{
    //    await quickmongo.set(`${version}`, {pushed_by: `${message.author.id} // ${message.author.tag}`, pushdate: `${timestamp}`, content: `${args}`});
    //    let embed = new Discord.MessageEmbed()
   //         .setTitle('💤 AFK')
    //        .setDescription('You are now AFK.')
    //        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
    //        .addFields({name: 'Reason', value: `${reason}`})
   //     message.channel.send(embed)
   //   } catch (err) {
   //       console.log(err)
   //       message.channel.send('Something went wrong setting your AFK status.')
   //   }
}
    }
  }