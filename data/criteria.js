function candela_buy(candle){
    //ombra superiore piu piccola del corpo
    let a = 0;
    if(candle.ombraSup < candle.corpo){
        a = 1
    }

    //ombra superiore piu piccola del ombra inferiore
    let b = 0
    if(candle.ombraSup < candle.ombraInf)(
        b = 1
    )

    //Se rapporto ombre e maggior o uguale a 3
    let c = 0
    if(candle.rapportoOmbre/100 >= 3){
        c = 1
    }

    //se omnra superiore e piu piccolo di 0.75
    let d = 0
    if(candle.ombraSup < .1 || candle.ombraInf < .1){
        d = 1
    }
    
    if(a == 1 && b == 1 && c == 1 && d == 1){
        return 1
    } else {
        return 0
    }
}

function candela_sell(candle){
    //ombra inferiore piu piccola del corpo
    let a = 0;
    if(candle.ombraInf < candle.corpo){
        a = 1
    }

    // ombra inferiore piu piccola della superiore
    let b = 0;
    if(candle.ombraInf < candle.ombraSup){
        b = 1
    }

    // rapporto ombre minore di 0.4
    let c = 0;
    if(candle.rapportoOmbre/100 < 0.4){
        c = 1
    }

    // ombra inferiore minore di 0.75
    let d = 0;
    if(candle.ombraSup > .1 || candle.ombraInf > .1){
        d = 1
    }

    if(a == 1 && b == 1 && c == 1 && d == 1){
        return 1
    } else {
        return 0
    }
}

function conforme_candela_buy(candle, session){
    //ombra inferiore e' piu piccola del massimopa asitaico !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let a = 0
    if(candle.ombraInf < session.massimo){
        a = 1
    }

    // Minimo tra aperturea e chisura
    let b = 0
    if(candle.chiusura > session.massimo){
        b = 1
    }

    // Se la chiusura e maggiore del massimo della sessione asiatica
    let c = 0
    if(a == 1 && b == 1){
        c = 1
    }
    return c
}

function conforme_candela_sell(candle, session){
    // Se il massimoe piu grande del minmimo dell asitaica 
    let a = 0
    if(candle.max > session.minimo){
        a = 1
    }

    // Se la chiusura e minore del massimo della sessione asiatica
    let b = 0
    if(candle.chiusura < session.minimo){
        b = 1
    }

    // Se la chiusura e maggiore del massimo della sessione asiatica
    let c = 0
    if(a == 1 && b == 1){
        c = 1
    }
    return c
}

export const criteria = {
    candela_buy,
    candela_sell,
    conforme_candela_buy,
    conforme_candela_sell
}