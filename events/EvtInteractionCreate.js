'use strict'

const EvtBase = require('events/EvtBase')

const { db } = require('config.json')
const { log } = require('utils/UtlLog.js')

class EvtInteractionCreate extends EvtBase {

    constructor () {
        super('interactionCreate')
    }

    async eventCallback (_client, _interaction) {
        log.write('get interaction from:', _interaction.user.username)

        let command = ''
        let reply = undefined
        if (_interaction.isChatInputCommand()) {
            command  = _interaction.commandName

            log.write('parsing command:', command)

            await _interaction.deferReply()

            reply = _client.cmdList.parseCmd(command, _interaction, _client)
        } else {
            log.write('unhandled interaction:', _interaction.type)
            return
        }

        await _interaction.editReply(reply)
        log.write('end of', command)
    }
}

module.exports = EvtInteractionCreate
