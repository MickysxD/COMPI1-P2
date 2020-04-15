"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var TokenLexico_1 = __importDefault(require("../Clase/TokenLexico"));
var ErrorLexico_1 = __importDefault(require("../Clase/ErrorLexico"));
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
        var lexema = "";
        while (posicion < cadena.length) {
            var caracter = cadena[posicion];
            switch (estado) {
                case 0:
                    if (caracter == "\n") {
                        estado = 0;
                        fila++;
                        posicion++;
                    }
                    else if (caracter == "\t" || caracter == " ") {
                        estado = 0;
                        posicion++;
                    }
                    else if (caracter == "+") {
                        tokens.push(new TokenLexico_1.default(idToken, "Signo mas", 1, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "-") {
                        tokens.push(new TokenLexico_1.default(idToken, "Signo menos", 2, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "*") {
                        tokens.push(new TokenLexico_1.default(idToken, "Signo de multiplicacion", 4, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "<") {
                        estado = 8;
                        posicion++;
                        tokens.push(new TokenLexico_1.default(idToken, "Signo menor que", 5, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == ">") {
                        tokens.push(new TokenLexico_1.default(idToken, "Signo mayor que", 6, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == ";") {
                        tokens.push(new TokenLexico_1.default(idToken, "Punto y coma", 7, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == ":") {
                        tokens.push(new TokenLexico_1.default(idToken, "Doble punto", 8, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == ",") {
                        tokens.push(new TokenLexico_1.default(idToken, "Coma", 9, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "(") {
                        tokens.push(new TokenLexico_1.default(idToken, "Parentesis que habre", 10, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == ")") {
                        tokens.push(new TokenLexico_1.default(idToken, "Parentesis que cierra", 11, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "{") {
                        tokens.push(new TokenLexico_1.default(idToken, "Corchete que habre", 12, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "}") {
                        tokens.push(new TokenLexico_1.default(idToken, "Corchete que cierra", 13, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "!") {
                        tokens.push(new TokenLexico_1.default(idToken, "Signo not", 14, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == ".") {
                        tokens.push(new TokenLexico_1.default(idToken, "Punto", 19, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "/") {
                        estado = 1;
                        posicion++;
                    }
                    else if (caracter == "_" || this.tiene_minuscula(caracter) || this.tiene_miyuscula(caracter)) {
                        lexema += caracter;
                        estado = 5;
                        posicion++;
                    }
                    else if (caracter == "\"") {
                        estado = 6;
                        posicion++;
                    }
                    else if (caracter == "'") {
                        estado = 7;
                        posicion++;
                    }
                    break;
                case 1:
                    if (caracter == "/") {
                        estado = 2;
                        posicion++;
                    }
                    else if (caracter == "*") {
                        estado = 3;
                        posicion++;
                    }
                    else {
                        tokens.push(new TokenLexico_1.default(idToken, "signo de division", 3, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    break;
                case 2:
                    if (caracter != "\n") {
                        lexema += caracter;
                        posicion++;
                    }
                    else {
                        tokens.push(new TokenLexico_1.default(idToken, "Comentario de linea", 15, lexema, fila, columna));
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    break;
                case 3:
                    if (caracter != "*") {
                        lexema += caracter;
                        posicion++;
                    }
                    else {
                        estado = 4;
                        posicion++;
                    }
                    break;
                case 4:
                    if (caracter == "/") {
                        tokens.push(new TokenLexico_1.default(idToken, "Comentario multilinea", 16, lexema, fila, columna));
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else {
                        estado = 3;
                        lexema += "*";
                        posicion++;
                    }
                    break;
                case 5:
                    if (caracter == "_" || this.tiene_minuscula(caracter) || this.tiene_miyuscula(caracter) || this.tiene_numero(caracter)) {
                        lexema += caracter;
                        estado = 5;
                        posicion++;
                    }
                    else {
                        if (this.es_reservada(lexema)) {
                            tokens.push(new TokenLexico_1.default(idToken, "Palabra reservada", 17, lexema, fila, columna));
                        }
                        else {
                            tokens.push(new TokenLexico_1.default(idToken, "Identificador", 18, lexema, fila, columna));
                        }
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    break;
                case 6:
                    if (caracter != "\"") {
                        lexema += caracter;
                        estado = 6;
                        posicion++;
                    }
                    else {
                        tokens.push(new TokenLexico_1.default(idToken, "Cadena", 18, caracter, fila, columna));
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    break;
                case 7:
                    if (caracter != "'") {
                        lexema += caracter;
                        estado = 6;
                        posicion++;
                    }
                    else {
                        if (lexema.length == 1) {
                            tokens.push(new TokenLexico_1.default(idToken, "Cadena", 18, caracter, fila, columna));
                            idToken++;
                        }
                        else {
                            errores.push(new ErrorLexico_1.default(idToken, "Error lexico: no es cadena", caracter, fila, columna));
                            idError++;
                        }
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }
                    break;
                case 7:
                    if (caracter == "=") {
                        lexema += caracter;
                        estado = 6;
                        posicion++;
                    }
                    else {
                        tokens.push(new TokenLexico_1.default(idToken, "Cadena", 18, caracter, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }
                    break;
            }
        }
    };
    Lexico.prototype.es_reservada = function (texto) {
        var letras = ["int", "double", "char", "bool", "string", "void", "main", "if",
            "else", "switch", "case", "break", "default", "for", "while", "do",
            "return", "continue", "Console", "Write"];
        for (var i = 0; i < letras.length; i++) {
            if (letras[i] == texto) {
                return true;
            }
        }
        return false;
    };
    Lexico.prototype.tiene_minuscula = function (texto) {
        var letras = "abcdefghyjklmnñopqrstuvwxyz";
        for (var i = 0; i < letras.length; i++) {
            if (letras[i] == texto) {
                return true;
            }
        }
        return false;
    };
    Lexico.prototype.tiene_miyuscula = function (texto) {
        var letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (var i = 0; i < letras.length; i++) {
            if (letras[i] == texto) {
                return true;
            }
        }
        return false;
    };
    Lexico.prototype.tiene_numero = function (texto) {
        var letras = "0123456789";
        for (var i = 0; i < letras.length; i++) {
            if (letras[i] == texto) {
                return true;
            }
        }
        return false;
    };
    return Lexico;
}());
module.exports = Lexico;
