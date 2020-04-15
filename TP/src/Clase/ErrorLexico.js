"use strict";
var ErrorLexico = /** @class */ (function () {
    function ErrorLexico(id, tipo, lexema, fila, columna) {
        this.id = id;
        this.tipo = tipo;
        this.lexema = lexema;
        this.fila = fila;
        this.columna = columna;
    }
    return ErrorLexico;
}());
module.exports = ErrorLexico;
