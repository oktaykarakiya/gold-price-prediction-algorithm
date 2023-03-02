// Main
const delay = 3
const times_per_sec = 1

// Candle
let candle_duration_in_mins = 5

// Telegram
const API_key = "5872766947:AAHr-toAsvNoJ-QkAB_1ptqGlN_1ohjIy6s"
const channel = "thisisatestdamnit"
let telegram_url = `https://api.telegram.org/bot${API_key}/sendMessage?chat_id=@${channel}&text=`

// Api URL
const API_url= `https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAU/USD`


export const parameters = {
    //Main
    delay,
    times_per_sec,
    //Candle
    candle_duration_in_mins,
    //Telegram
    API_key,
    channel,
    telegram_url,
    // API URL
    API_url

}