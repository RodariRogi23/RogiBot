module.exports = {
    name: `ppermit`,
    execute(message, args) {
        let channel = message.member.voice.channel
        if(!channel) return message.reply({embeds: [nochannel]})
        if(channel.parent.id != config.idcanali.proomsparent) return message.reply({embeds: [nopvt]})
        if(message.author.username != channel.name) return message.reply({embeds: [noperm]})
        let id = args[0]
        let server = client.guilds.cache.get(config.idServer.idServer)
        let user = message.mentions.members.first() || server.members.cache.find(x => x.id == id) 
        if(!user) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`:x: Inserisci un utente valido`)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        channel.permissionOverwrites.create(user.id, {CONNECT: true})
        let embed = new Discord.MessageEmbed()
            .setColor(`GREEN`)
            .setDescription(`${user} adesso puo' entrare in <#${channel.id}>`)
        message.reply({embeds: [embed]})
    }
}