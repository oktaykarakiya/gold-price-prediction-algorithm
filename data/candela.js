class Candela {
    constructor(valori){
        this.max = valori.max
        this.min = valori.min
        this.apertura = valori.apertura
        this.chiusura = valori.chiusura
        this.ombraSup = valori.max - (Math.max(valori.apertura, valori.chiusura))
        this.corpo = Math.sqrt((valori.apertura - valori.chiusura)**2)
        this.ombraInf = Math.abs(Math.min(valori.apertura, valori.chiusura) - valori.min)
        this.rapportoCorpoSup = this.ombraSup/this.corpo *100
        this.rapportoOmbraInf = this.ombraInf/this.corpo *100
        this.rapportoOmbre = this.ombraInf/this.ombraSup *100
    }
}

export const candela = {
    Candela
}