'use strict'

const { EmbedBuilder } = require('discord.js')

const CmdBase = require('commands/CmdBase.js')

class CmdGetCurrency extends CmdBase {

    constructor () {
        const currencies = require('commands/currencies.json')
        super('get-currency', [
            { type: 'string', name: 'input_currency', info: 'from which currency', choices: currencies },
            { type: 'string', name: 'target_currency', info: 'to which currency', choices: currencies },
            { type: 'integer', name: 'price', info: 'total price to calculate', min: 0, required: false },
        ])
    }

    doCmd (_interaction, _client) {
        const price = _interaction.options.getInteger('price') ?? 1
        const input_currency = _interaction.options.getString('input_currency') ?? 'USD'
        const target_currency = _interaction.options.getString('target_currency') ?? 'TWD'
        const reply = this.buildMessage(input_currency.toUpperCase(), target_currency.toUpperCase(), price, _interaction, _client)
        return reply
    }

    buildMessage (_input_currency, _target_currency, _price, _interaction, _client) {
        const embed = new EmbedBuilder()
            .setTitle(`${_input_currency} :arrow_right: ${_target_currency}`)
            .setColor('#D4AF37')
            .setFooter({ text: 'Powered by OpenExchangeRate', iconURL: _interaction.user.avatarURL()})
            .setTimestamp()

        const rate = _client.ore.getRate(_input_currency, _target_currency) // _target_currency / _input_currency
        embed.setDescription(`${_price} ${_input_currency} = ${(rate * _price).toFixed(6)} ${_target_currency}\n`)

        return { embeds: [embed] }
    }
}

module.exports = CmdGetCurrency
