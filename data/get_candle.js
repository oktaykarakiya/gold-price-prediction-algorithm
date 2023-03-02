let counter = 0
let valoreMassimo = 0
let valoreApertura = 0
let valoreChiusura = 0
let valoreMinimo = 10000

function info(money){
    const date = new Date();
    let minutes = date.getMinutes();

    console.log(counter)

    function maxValue(){
        if(money > valoreMassimo){
            valoreMassimo = money
        }
        return valoreMassimo
    }

    function initialValue(){
        if(counter == 0){
            valoreApertura = money
        }
        return valoreApertura
    }

    function lastValue(){
        if(counter == 5){
            valoreChiusura = money
        }
        return valoreChiusura
    }

    function smallestValue(){
        if(money < valoreMinimo){
            valoreMinimo = money
        }
        return valoreMinimo
    }

    valoreMassimo = maxValue()
    valoreApertura = initialValue()
    valoreChiusura = lastValue()
    valoreMinimo = smallestValue()

    //console.log(`\nil valore massimo e': ${valoreMassimo}\nil valore di apertura e': ${valoreApertura}\nil valore di chiusura e': ${valoreChiusura}\nil valore minimo e' ${valoreMinimo}\n`)

    if(counter > 93 && minutes%5 == 0){
        let return_values = {
            max: valoreMassimo,
            apertura: valoreApertura,
            chiusura: valoreChiusura,
            min: valoreMinimo
        }
        counter = 0
        valoreMassimo = 0
        valoreApertura = 0
        valoreChiusura = 0
        valoreMinimo = 10000

        return return_values
        
    } else {
        counter++
    }
}

export const getMyCandle = {
    info
}