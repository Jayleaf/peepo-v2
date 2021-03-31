const { DiscordAPIError } = require('discord.js');
const { RandomReddit } = require('random-reddit')
const Discord = require('discord.js');

const reddit = new RandomReddit({
    username: 'ryukomcm',
    password: 'RyukoMatoi6449',
    app_id: 'Mt1nhmGoXJuVPA',
    api_secret: 'xXAfjjNiq0Qyr__AVMf6Ljg0mur-Kg',
    logs: false // specify this if you want logs from this package
  });


module.exports = {
    aliases: ['reddit'],
    cooldown: '5s',
    category: 'Fun',
    expectedArgs: '<subreddit>',
    callback: async ({ message, args }) => {

    const rawpost = await reddit.getPost(`${args[0]}`)
    const post = rawpost.data
    let postdate = post.created_utc * 1000
    let embed = new Discord.MessageEmbed()
    .setTitle(`__${post.title}__`)
    .setAuthor(`u/${post.author}`, 'https://www.redditinc.com/assets/images/site/reddit-logo.png')
    embed.setURL(`https://www.reddit.com${post.permalink}`)
    .addFields(
        {name: '<:upvote_peepo:826052499592577045>', value: `${post.ups}`, inline: true},
        {name: '<:downvote_peepo:826052783308013568>', value: `${post.downs}`, inline: true},
        {name: '<:gold_reddit:826055503473279016>', value: `${post.total_awards_received}`, inline: true}
    )
    .setImage(`${post.url}`)
    .setColor('RANDOM')
    .setFooter(`Posted on ${new Date(postdate).toLocaleString()} • r/${post.subreddit}`)
    if(post.is_video) {
        embed.setImage()
        embed.addFields({name: `\u200b`, value: `${post.url}`})
    }
    if(post.selftext) {
        embed.addFields({name: `\u200b`, value: `${post.selftext}`})
        embed.setImage()
        }
        if(post.over_18) {
            if(!message.channel.nsfw) {
                message.channel.send('This post is NSFW, and NSFW posts cannot be sent in non-nsfw channels.')
                return;
            }
        }
    message.channel.send(embed)
}
}
    
