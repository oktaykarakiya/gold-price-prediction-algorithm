import fetch from 'node-fetch'
import { candela } from './data/candela.js'
import { criteria } from './data/criteria.js'
import { getMyCandle } from './data/get_candle.js'
import { parameters } from './data/parameters.js'
import { session } from './data/sessione.js'
import { telegram } from './data/telegram.js'
import { save } from './data/saveJSON.js'


let sessione = {massimo: 2000, minimo: 1000} // save it into json format so that in case of restart the program can start seamlessly

let beninging = false
let patience = 0

setInterval( async () => {
    let date = new Date()
    let hours = 1 + date.getHours()
    let mins = date.getMinutes()
    let secs = date.getSeconds()

    if(hours >= 9 && hours < 17){
        if(!beninging){
            telegram.sendMess(parameters.telegram_url, `Bot operativo fino alle 17:00 => sessione max - min: ${sessione.massimo} - ${sessione.minimo}`)
            beninging = true
            save.emptyAll()
        }
        try {
            const response = await fetch(parameters.API_url)
            const price = await response.json()
            console.log(price[1]['spreadProfilePrices'][0]['ask'])
            let money = price[1]['spreadProfilePrices'][0]['ask']
            let candle_info = getMyCandle.info(money)
            if(candle_info != undefined){
                let min5_candle = new candela.Candela({
                    max: candle_info.max,
                    apertura: candle_info.apertura,
                    chiusura: candle_info.chiusura,
                    min: candle_info.min
                })

                save.store({"Ora": `${hours}:${mins}:${secs}`,
                            "Apertura": min5_candle.apertura,
                            "Chiusura": min5_candle.chiusura,
                            "Massimo": min5_candle.max,
                            "Minimo": min5_candle.min})

                let cb = criteria.candela_buy(min5_candle, sessione)
                let cs = criteria.candela_sell(min5_candle, sessione)
                let ccb = criteria.conforme_candela_buy(min5_candle, sessione)
                let ccs = criteria.conforme_candela_sell(min5_candle, sessione)
                if(min5_candle.apertura < min5_candle.chiusura && cb && ccb){
                    patience = 0
                    telegram.sendMess(parameters.telegram_url, `${telegram.html_formatting("Congratulazioni: Candela Buy", "b", "www.google.com")}%0A%0A${telegram.html_formatting(`ombra superiore: ${min5_candle.ombraSup}%0Acorpo: ${min5_candle.corpo}%0Aombra inferiore: ${min5_candle.ombraInf}%0Arapporto ombra/corpo superiore: ${min5_candle.rapportoCorpoSup}%0Arapporto ombra corpo inferiore: ${min5_candle.rapportoOmbraInf}%0Arapporto ombre: ${min5_candle.rapportoOmbre}%0AIndicatori candela_buy: ${cb}%0AIndicatori candela_sell: ${cs}`, "i")}%0A%0A${telegram.html_formatting(`Indicatori conforme candela_buy: ${ccb}%0AIndicatori conforme candela_sell: ${ccs}`, "b")}`)
                } else if (min5_candle.apertura > min5_candle.chiusura && cs && ccs){
                    patience = 0
                    telegram.sendMess(parameters.telegram_url, `${telegram.html_formatting("Congratulazioni: Candela Sell", "b", "www.google.com")}%0A%0A${telegram.html_formatting(`ombra superiore: ${min5_candle.ombraSup}%0Acorpo: ${min5_candle.corpo}%0Aombra inferiore: ${min5_candle.ombraInf}%0Arapporto ombra/corpo superiore: ${min5_candle.rapportoCorpoSup}%0Arapporto ombra corpo inferiore: ${min5_candle.rapportoOmbraInf}%0Arapporto ombre: ${min5_candle.rapportoOmbre}%0AIndicatori candela_buy: ${cb}%0AIndicatori candela_sell: ${cs}`, "i")}%0A%0A${telegram.html_formatting(`Indicatori conforme candela_buy: ${ccb}%0AIndicatori conforme candela_sell: ${ccs}`, "b")}`)
                }
                if(patience > 34){
                    telegram.sendMess(parameters.telegram_url, "Mannaggia, sono tre ore che non trovo nulla, terro' i miei bit aperti fino alle 17:00")
                    patience = 0
                } else {
                    patience++
                }
            }
        } catch (e) {
            console.log(e)
        }   
    } else if(hours >= 1 && hours < 6){
        try {
            const response = await fetch(parameters.API_url)
            const price = await response.json()
            console.log(price[1]['spreadProfilePrices'][0]['ask'])
            let money = price[1]['spreadProfilePrices'][0]['ask']
            let maximum = session.max(money)
            let minimum = session.min(money)
            sessione = new session.Sessione({max: maximum, min: minimum})
            console.log(sessione)
        } catch (e) {
            console.log(e)
        }
    } else {
        console.log(`Waiting... It is ${hours}:${mins}:${secs} now.`)
        if(beninging){
            telegram.sendMess(parameters.telegram_url, `Bot in pausa fino alle 9:00`)
            session.resetAllValues()
            beninging = false   
        }

    }
}, (parameters.delay)*1000)
