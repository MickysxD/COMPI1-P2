class TokenLexico{
    id:number;
    tipo:string;
    idTipo:number;
    lexema:string;
    fila:number;
    columna:number;

    constructor(id:number, tipo:string, idTipo:number, lexema:string, fila:number, columna:number){
        this.id = id;
        this.tipo = tipo;
        this.idTipo = idTipo;
        this.lexema = lexema;
        this.fila = fila;
        this.columna = columna;
    }

}

export = TokenLexico;