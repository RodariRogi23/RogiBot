module.exports = {
    name: `promote`,
    onlyOwner: true,
    execute(message, args) {
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
        if(!user.roles.cache.has(config.idruoli.helper) && !user.roles.cache.has(config.idruoli.moderator)) {
            user.roles.add(config.idruoli.helper)
            user.roles.add(config.idruoli.staff)
            let embedserver = new Discord.MessageEmbed()
                .setTitle(`Promote`)
                .setDescription(`:white_check_mark: ${user} è ora un <@&${config.idruoli.helper}>!`)
                .setColor(`GREEN`)
            let embeduser = new Discord.MessageEmbed()
                .setTitle(`Promote`)
                .setDescription(`:white_check_mark: Sei ora un helper nel server ${message.guild.name}`)
                .setColor(`GREEN`)
            user.send({embeds: [embeduser]}).catch(() => { 
            embedserver.setDescription(`:white_check_mark: ${user} è ora un <@&${config.idruoli.helper}>!\n⚠️NON POSSO AVVISARE QUESTO UTENTE IN DM⚠️`)
            })
            setTimeout(() => {
                message.reply({embeds: [embedserver]})
            }, 1000);
        } else if(!user.roles.cache.has(config.idruoli.moderator) && user.roles.cache.has(config.idruoli.helper)) {
            user.roles.add(config.idruoli.moderator)
            user.roles.remove(config.idruoli.helper)
            let embedserver = new Discord.MessageEmbed()
                .setTitle(`Promote`)
                .setDescription(`:white_check_mark: ${user} è ora un <@&${config.idruoli.moderator}>!`)
                .setColor(`GREEN`)
            let embeduser = new Discord.MessageEmbed()
                .setTitle(`Promote`)
                .setDescription(`:white_check_mark: Sei ora un moderatore nel server ${message.guild.name}`)
                .setColor(`GREEN`)
        user.send({embeds: [embeduser]}).catch(() => { 
            embedserver.setDescription(`:white_check_mark: ${user} è ora un <@&${config.idruoli.moderator}>!\n⚠️NON POSSO AVVISARE QUESTO UTENTE IN DM⚠️`)
        })
        setTimeout(() => {
            message.reply({embeds: [embedserver]})
        }, 1000);
        } else if(user.roles.cache.has(config.idruoli.moderator) || user.roles.cache.has(config.idruoli.owner)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`:x: Questo utente è già di grado massimo`)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
        }
    }
}