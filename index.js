const Discord = require('discord.js')
const client = new Discord.Client();
require('dotenv').config();
const WOKCommands = require('wokcommands')

client.on('ready', () => {
    console.log('the shitter is ready')
})

const dbOptions = {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }

  const disabledDefaultCommands = [
    // 'help',
    // 'command',
     'language',
    // 'prefix',
    // 'requiredrole'
  ]

   // Initialize WOKCommands with specific folders and MongoDB
   new WOKCommands(client, {
    commandsDir: 'commands',
    featuresDir: 'features',
    showWarns: true, // Show start up warnings
    del: -1, // Timeout in seconds before and error message gets deleted (Missing permissions, missing roles, or command disabled) set to -1 to disable
    dbOptions,
    disabledDefaultCommands
  })
  .setMongoPath(process.env.MONGO_URI)
  .setDefaultPrefix('pt!')
  .setBotOwner('395205580668534785')
  .setCategorySettings([
    {name: `Fun`, emoji: `🎮`},
    {name: `Utility`, emoji: `🔨`}
  ])

client.login(process.env.TOKEN);