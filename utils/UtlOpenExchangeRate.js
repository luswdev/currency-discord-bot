'use strict'

const schedule = require('node-schedule')
const axios = require('axios')

const { log } = require('utils/UtlLog.js')

class OpenExchangeRate {

    constructor () {
        const { openexchangerates } = require('config.json')

        this.apiBase = 'https://openexchangerates.org/api/latest.json'
        this.apiKey = openexchangerates.key
    }

    async fetch () {
        const res = await axios.get(`${this.apiBase}?app_id=${this.apiKey}`)
        this.data = res.data
    }

    scheduler () {
        log.write('start fetch openexchangerates.org api every 6 am')
        schedule.scheduleJob('0 6 * * *', async () => {
            await this.fetch()
        })
    }

    getRate(_currency) {
        const base2USD = this.data.rates[_currency] // _currency / USD
        const USD2TWD = this.data.rates['TWD']      // TWD / USD

        return base2USD / USD2TWD                   // _currency / TWD
    }
}

module.exports = OpenExchangeRate
