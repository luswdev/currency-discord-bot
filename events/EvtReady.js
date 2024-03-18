'use strict'

const {  Collection } = require('discord.js')
const EvtBase = require('events/EvtBase')

const { bot } = require('config.json')

const { log } = require('utils/UtlLog.js')
const ErrorHandler = require('utils/UtlErrHandler.js')
const OpenExchangeRate = require('utils/UtlOpenExchangeRate.js')
const Announcement = require('utils/UtlAnnouncement.js')

class EvtReady extends EvtBase {

    constructor () {
        super('ready')
    }

    async eventCallback (_client) {
        _client.errHandler = new ErrorHandler(_client, bot.debug)

        _client.commands = new Collection()
        _client.commands = await _client.application.commands.fetch()

        _client.startTimestamp = Date.now()

        _client.ore = new OpenExchangeRate()
        await _client.ore.fetch()
        _client.ore.scheduler()

        _client.announcement = new Announcement(bot.announcement, _client)
        _client.announcement.scheduler()

        log.write('bot ready')
    }
}

module.exports = EvtReady
