const config = require(`${process.cwd()}/JSON/config.json`)
let date = new Date()

module.exports = async function nightSecurity() {
    //? Add security
    if (date.getHours() == 22 && date.getMinutes() == 30) {

        client.channels.cache.get(config.idcanali.general).sendTyping()

        //? Set slowmode in all channels
        client.channels.cache.get(config.idcanali.generaltxt).setRateLimitPerUser(5)
        client.channels.cache.get(config.idcanali.serverbooster).setRateLimitPerUser(5)
        client.channels.cache.get(config.idcanali.commands).setRateLimitPerUser(5)
        client.channels.cache.get(config.idcanali.counting).setRateLimitPerUser(5)
        client.channels.cache.get(config.idcanali.countingextreme).setRateLimitPerUser(5)
        client.channels.cache.get(`997201717038944337`).setRateLimitPerUser(5)

        //? Set limit to voice channels
        client.channels.cache.get(config.idcanali.generalvc).setUserLimit(15)

        //? Stop tickets
        let msg = await client.channels.cache.get(config.idcanali.needhelp).messages.fetch(`993212657924579420`)

        let button = new Discord.MessageButton()
            .setLabel(`Apri Ticket`)
            .setCustomId(`LOCKEDTickets`)
            .setStyle(`PRIMARY`)
        let row = new Discord.MessageActionRow()
            .addComponents(button)
        msg.edit({ components: [row] })

        //? Grants helpers to timeout members
        client.guilds.cache.get(config.idServer.idServer).roles.cache.find(x => x.id == config.idruoli.helper).setPermissions([`MANAGE_NICKNAMES`, `MANAGE_MESSAGES`, `MODERATE_MEMBERS`])

        //? Send message
        let phrases = [`Buonanotte a tutti!`, `Notte!`, `Ed anche questo giorno è passato..., buonanotte!`]
        client.channels.cache.get(config.idcanali.general).send(phrases[Math.floor(Math.random() * phrases.length)])
        client.channels.cache.get(config.idcanali.general).send(`La sicurezza nottura è abilitata 🔒`)

    }

    //? Remove security
    if (date.getHours() == 8 && date.getMinutes() == 0) {

        client.channels.cache.get(config.idcanali.general).sendTyping()

        //? Reset slowmode in all channels
        client.channels.cache.get(config.idcanali.generaltxt).setRateLimitPerUser(1)
        client.channels.cache.get(config.idcanali.serverbooster).setRateLimitPerUser(0)
        client.channels.cache.get(config.idcanali.commands).setRateLimitPerUser(1)
        client.channels.cache.get(config.idcanali.counting).setRateLimitPerUser(1)
        client.channels.cache.get(config.idcanali.countingextreme).setRateLimitPerUser(1)
        client.channels.cache.get(`997201717038944337`).setRateLimitPerUser(1)

        //? Remove the limit from voice channels
        client.channels.cache.get(config.idcanali.generalvc).setUserLimit(0)

        //? Enable tickets
        let msg = await client.channels.cache.get(config.idcanali.needhelp).messages.fetch(`993212657924579420`)

        let button = new Discord.MessageButton()
            .setLabel(`Apri Ticket`)
            .setCustomId(`Tickets`)
            .setStyle(`PRIMARY`)
        let row = new Discord.MessageActionRow()
            .addComponents(button)
        msg.edit({ components: [row] })

        //? Remove helpers permission to timeout members
        client.guilds.cache.get(config.idServer.idServer).roles.cache.find(x => x.id == config.idruoli.helper).setPermissions([`MANAGE_NICKNAMES`, `MANAGE_MESSAGES`])

        //? Send the message
        let phrases = [`Buongiorno a tutti, come va?`, `Salve mondo! Come va la vita oggi?`, `Buongiornissimo! Come state?`, `Buongiorno guys, tutto bene?`, `Salve! Tutto bene?`]
        if (new Date().getDay() == 7) phrases = [`Buongiorno e buona domenica a tutti! Come state?`, `Salve e buona domenica a tutti quanti! Come va la vita?`, `Ciao, buona domenica a tutti! Cosa fare di bello oggi?`]
        client.channels.cache.get(config.idcanali.general).send(phrases[Math.floor(Math.random() * phrases.length)])
        client.channels.cache.get(config.idcanali.general).send(`La sicurezza nottura è stata disabilitata 🔓`)

    }
}