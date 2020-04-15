"use strict";
var TokenLexico = /** @class */ (function () {
    function TokenLexico(id, tipo, idTipo, lexema, fila, columna) {
        this.id = id;
        this.tipo = tipo;
        this.idTipo = idTipo;
        this.lexema = lexema;
        this.fila = fila;
        this.columna = columna;
    }
    return TokenLexico;
}());
module.exports = TokenLexico;
