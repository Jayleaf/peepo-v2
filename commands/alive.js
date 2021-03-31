module.exports = {
    aliases: ['alive'], 
    callback: ({ message }) => {
      message.channel.send('bot is alive')

      console.log(22+2)
    }
  }