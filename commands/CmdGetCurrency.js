'use strict'

const { EmbedBuilder } = require('discord.js')

const CmdBase = require('commands/CmdBase.js')

class CmdGetCurrency extends CmdBase {

    constructor () {
        const currencies = require('commands/currencies.json')
        super('get-currency', [{ type: 'string', name: 'currency', info: 'get which currency', choices: currencies }])
    }

    doCmd (_interaction, _client) {
        const currency = _interaction.options.getString('currency') ?? 'USD'
        const reply = this.buildMessage(currency.toUpperCase(), _interaction, _client)
        return reply
    }

    buildMessage (_currency, _interaction, _client) {
        const embed = new EmbedBuilder()
            .setTitle(`TWD :arrow_right: ${_currency}`)
            .setColor('#D4AF37')
            .setFooter({ text: 'Powered by OpenExchangeRate', iconURL: _interaction.user.avatarURL()})
            .setTimestamp()

        const rate = _client.ore.getRate(_currency)
        embed.setDescription(`Currently exchanged rate for ${_currency} is \`${1/rate}\` TWD per ${_currency}\n\n(or \`${rate}\` ${_currency} per TWD)`)

        return { embeds: [embed] }
    }
}

module.exports = CmdGetCurrency
