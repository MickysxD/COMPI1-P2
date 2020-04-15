"use strict";
var Lexico = /** @class */ (function () {
    function Lexico(t) {
        this.token = [];
        this.error = [];
        this.t = t;
    }
    Lexico.prototype.analisis = function (cadena) {
        var tokens = [];
        var errores = [];
        var posicion = 0;
        var idToken = 0;
        var idError = 0;
        var fila = 0;
        var columna = 0;
        var estado = 0;
        while (posicion < cadena.length) {
            var caracter = cadena[posicion];
            switch (estado) {
                case 0:
                    break;
            }
        }
    };
    return Lexico;
}());
module.exports = Lexico;
