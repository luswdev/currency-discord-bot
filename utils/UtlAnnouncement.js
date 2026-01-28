'use strict'

const schedule = require('node-schedule')
const { EmbedBuilder } = require('discord.js')

class Announcement {

    constructor (_channel, _client) {
        this.client = _client
        _client.channels.fetch(_channel).then( (ch) => this.channel = ch)
    }

    send (_currency) {
        const embed = this.buildMessage(_currency)
        this.channel.send(embed)
    }

    buildMessage (_currency) {
        const embed = new EmbedBuilder()
            .setTitle(`TWD :arrow_right: ${_currency}`)
            .setColor('#D4AF37')
            .setFooter({ text: 'Powered by OpenExchangeRate', iconURL: this.client.user.displayAvatarURL()})
            .setTimestamp()

        const rate = this.client.ore.getRate(_currency)
        embed.setDescription(`Currently exchanged rate for ${_currency} is \`${1/rate}\` TWD per ${_currency}\n\n(or \`${rate}\` ${_currency} per TWD)`)

        return { embeds: [embed] }
    }

    scheduler () {
        schedule.scheduleJob('30 8 * * *', async () => {
            this.send('USD')
            this.send('KRW')
        })
    }

}

module.exports = Announcement
