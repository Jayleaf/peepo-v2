module.exports = {
    aliases: ['evaluate'], 
    callback: async ({ message, args }) => {
      if(message.author.id === '395205580668534785') {
        const { member, channel, content } = message
        console.log('works')
        const result = eval(args)
        message.channel.send(result)
      } else {
          console.log('someone else that wasn\'t you ran the EVAL command.')
      }
    }
  }
