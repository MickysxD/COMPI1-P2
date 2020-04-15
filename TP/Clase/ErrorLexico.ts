class ErrorLexico{
    
    id:number;
    tipo:string;
    lexema:string;
    fila:number;
    columna:number;

    constructor(id:number, tipo:string, lexema:string, fila:number, columna:number){
        this.id = id;
        this.tipo = tipo;
        this.lexema = lexema;
        this.fila = fila;
        this.columna = columna;
    }
    
}

export = ErrorLexico;