import { parameters } from './parameters.js'
import fetch from 'node-fetch'

function html_formatting(text, format, link){

    if(format)

    if(link){
        return `<a href='${link}'><${format}>${text}</${format}></a>`
    } else {
        return `<${format}>${text}</${format}>`
    }
}

function sendMess(url, message, format, link){
    try {
        fetch(`${url}${message}&parse_mode=HTML`)
            .then(res => res.text())
            //.then(text => console.log(text)) //console log of the message log from telegram 
    } catch (error) {
        sendMess(parameters.telegram_url, e)
    }
}
export const telegram = {
    html_formatting,
    sendMess
}
