module.exports = {
    aliases: ['setstatus'],
    ownerOnly: true,
    callback: ({ client, message, args }) => {
      const statuses = [
          'WATCHING',
          'PLAYING',
          'STREAMING',
          'watching',
          'playing',
          'streaming',
          'none',
      ]
      var statustoset = ['']

      if(args[0] && args.length > 1 && statuses.includes(args[0])) {
          var status = args[0]
          for(i = 1; i < args.length; i++) {
            statustoset.push(args[i])
          }
          statustoset = statustoset.join(' ')
          if(status === 'none') {
            status = ''
            client.user.setActivity(`${statustoset}`)
            return;
          }
          client.user.setActivity(`${statustoset}`, {
            type: `${status.toUpperCase()}`,
            url: 'https://www.twitch.tv/jayleaff'
          })
      } else {
          message.channel.send('You either didn\'t specify WATCHING, PLAYING, or STREAMING, or you didn\'t specify a status to set.')
      }
    }
  }