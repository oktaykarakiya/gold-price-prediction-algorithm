class Sessione { // ancora da definire la funzione per questo 
    constructor(values){
        this.massimo = values.max,
        this.minimo = values.min
    }
}

let x = 0
function max(money){
    x = Math.max(x, money)
    return x
}

let y = 10000
function min(money){
    y = Math.min(y, money)
    return y
}

function resetAllValues(){
    x = 0
    y = 10000
}

export const session = {
    Sessione,
    max,
    min,
    resetAllValues
}
