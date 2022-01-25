module.exports = {
    name: `avatar`,
    execute(message, args) {
        let id = args[0]
        let server = client.guilds.cache.get(config.idServer.idServer)
        let user = message.mentions.members.first() || server.members.cache.find(x => x.id == id) || message.member 
        let avatar = user.displayAvatarURL({dynamic: true, size: 512})
        let embed = new Discord.MessageEmbed()
            .setTitle(`Avatar di ${user.user.username}`)
            .setImage(avatar)
            .setColor(`YELLOW`)
        message.reply({embeds: [embed]})
    }
}