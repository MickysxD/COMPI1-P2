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
    TokenLexico.prototype.to_string = function () {
        return "Id:" + this.id + " Tipo:" + this.tipo + " IDTipo:" + this.idTipo + " Lexema:" + this.lexema + " Fila:" + this.fila + " Columna:" + this.columna;
    };
    return TokenLexico;
}());
var ErrorLexico = /** @class */ (function () {
    function ErrorLexico(id, tipo, lexema, fila, columna) {
        this.id = id;
        this.tipo = tipo;
        this.lexema = lexema;
        this.fila = fila;
        this.columna = columna;
    }
    ErrorLexico.prototype.to_string = function () {
        return "Id:" + this.id + " Tipo:\"" + this.tipo + "\" Lexema:" + this.lexema + " Fila:" + this.fila + " Columna:" + this.columna;
    };
    return ErrorLexico;
}());
var indiceTK = 0;
var tokens = [];
var errores = [];
var Lexico = /** @class */ (function () {
    function Lexico() {
    }
    Lexico.prototype.analisis = function (entrada) {
        var cadena = document.getElementById(entrada).value;
        if (cadena != null && cadena != "") {
            this.analisisTodo(cadena);
        }
    };
    Lexico.prototype.analisisTodo = function (cadena) {
        //let cadena = (document.getElementById(entrada) as HTMLInputElement).value;
        tokens = [];
        errores = [];
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
                        columna = 0;
                        fila++;
                        posicion++;
                    }
                    else if (caracter == "\t" || caracter == " ") {
                        estado = 0;
                        posicion++;
                    }
                    else if (caracter == "+") {
                        tokens.push(new TokenLexico(idToken, "Signo mas", 1, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "-") {
                        tokens.push(new TokenLexico(idToken, "Signo menos", 2, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "*") {
                        tokens.push(new TokenLexico(idToken, "Signo de multiplicacion", 4, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "<") {
                        lexema += caracter;
                        estado = 8;
                        posicion++;
                    }
                    else if (caracter == ">") {
                        lexema += caracter;
                        estado = 9;
                        posicion++;
                    }
                    else if (caracter == ";") {
                        tokens.push(new TokenLexico(idToken, "Punto y coma", 7, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == ":") {
                        tokens.push(new TokenLexico(idToken, "Doble punto", 8, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == ",") {
                        tokens.push(new TokenLexico(idToken, "Coma", 9, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "(") {
                        tokens.push(new TokenLexico(idToken, "Parentesis que habre", 10, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == ")") {
                        tokens.push(new TokenLexico(idToken, "Parentesis que cierra", 11, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "{") {
                        tokens.push(new TokenLexico(idToken, "Corchete que habre", 12, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "}") {
                        tokens.push(new TokenLexico(idToken, "Corchete que cierra", 13, caracter, fila, columna));
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    else if (caracter == "!") {
                        lexema += caracter;
                        estado = 11;
                        posicion++;
                    }
                    else if (caracter == ".") {
                        tokens.push(new TokenLexico(idToken, "Punto", 19, caracter, fila, columna));
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
                    else if (caracter == "=") {
                        lexema += caracter;
                        estado = 10;
                        posicion++;
                    }
                    else if (caracter == "&") {
                        lexema += caracter;
                        estado = 12;
                        posicion++;
                    }
                    else if (caracter == "|") {
                        lexema += caracter;
                        estado = 13;
                        posicion++;
                    }
                    else if (this.tiene_numero(caracter)) {
                        estado = 14;
                    }
                    else {
                        estado = 100;
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
                        tokens.push(new TokenLexico(idToken, "signo de division", 3, caracter, fila, columna));
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
                        tokens.push(new TokenLexico(idToken, "Comentario de linea", 15, lexema, fila, columna));
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
                        tokens.push(new TokenLexico(idToken, "Comentario multilinea", 16, lexema, fila, columna));
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
                            tokens.push(new TokenLexico(idToken, "Palabra reservada", 17, lexema, fila, columna));
                        }
                        else {
                            tokens.push(new TokenLexico(idToken, "Identificador", 18, lexema, fila, columna));
                        }
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                    }
                    break;
                case 6:
                    if (caracter != "\"") {
                        lexema += caracter;
                        estado = 6;
                        posicion++;
                    }
                    else {
                        tokens.push(new TokenLexico(idToken, "Cadena", 20, lexema, fila, columna));
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
                        estado = 7;
                        posicion++;
                    }
                    else {
                        if (lexema.length == 1) {
                            tokens.push(new TokenLexico(idToken, "Caracter", 21, lexema, fila, columna));
                            idToken++;
                        }
                        else {
                            errores.push(new ErrorLexico(idError, "No es caracter", lexema, fila, columna));
                            idError++;
                        }
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }
                    break;
                case 8:
                    if (caracter == "=") {
                        lexema += caracter;
                        tokens.push(new TokenLexico(idToken, "Signo menor o igual que", 22, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }
                    else {
                        tokens.push(new TokenLexico(idToken, "Signo menor que", 5, lexema, fila, columna));
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    break;
                case 9:
                    if (caracter == "=") {
                        lexema += caracter;
                        tokens.push(new TokenLexico(idToken, "Signo mayor o igual que", 23, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }
                    else {
                        tokens.push(new TokenLexico(idToken, "Signo mayor que", 6, lexema, fila, columna));
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    break;
                case 10:
                    if (caracter == "=") {
                        lexema += caracter;
                        tokens.push(new TokenLexico(idToken, "Signo igual igual", 25, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }
                    else {
                        tokens.push(new TokenLexico(idToken, "Signo igual", 24, lexema, fila, columna));
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    break;
                case 11:
                    if (caracter == "=") {
                        lexema += caracter;
                        tokens.push(new TokenLexico(idToken, "Signo diferente de", 26, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }
                    else {
                        tokens.push(new TokenLexico(idToken, "Signo not", 14, lexema, fila, columna));
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    break;
                case 12:
                    if (caracter == "&") {
                        lexema += caracter;
                        tokens.push(new TokenLexico(idToken, "Signo and", 27, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }
                    else {
                        posicion--;
                        estado = 100;
                    }
                    break;
                case 13:
                    if (caracter == "|") {
                        lexema += caracter;
                        tokens.push(new TokenLexico(idToken, "Signo or", 28, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }
                    else {
                        posicion--;
                        estado = 100;
                    }
                    break;
                case 14:
                    if (this.tiene_numero(caracter)) {
                        estado = 14;
                        lexema += caracter;
                        posicion++;
                    }
                    else if (caracter == ".") {
                        estado = 15;
                        lexema += caracter;
                        posicion++;
                    }
                    else {
                        tokens.push(new TokenLexico(idToken, "Numero", 29, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                    }
                    break;
                case 15:
                    if (this.tiene_numero(caracter)) {
                        estado = 14;
                        lexema += caracter;
                        posicion++;
                    }
                    else {
                        tokens.push(new TokenLexico(idToken, "Numero", 29, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                    }
                    break;
                case 100:
                    errores.push(new ErrorLexico(idError, "No pertenece al lenguaje", caracter, fila, columna));
                    idError++;
                    estado = 0;
                    lexema = "";
                    columna++;
                    posicion++;
                    break;
            }
        }
        var salida = document.getElementById('txtSalida');
        var consola = document.getElementById("txtConsola");
        salida.value = "";
        consola.value = "";
        consola.value += "                      Tokens\n";
        tokens.forEach(function (element) {
            consola.value += element.to_string() + "\n";
        });
        consola.value += "\n\n";
        if (errores.length > 0) {
            consola.value += "                      Errores\n";
            errores.forEach(function (element) {
                consola.value += element.to_string() + "\n";
            });
        }
        consola.value += "\n\n";
        this.analisis_sin();
    };
    Lexico.prototype.analisis_sin = function () {
        try {
            while (indiceTK < tokens.length) {
                var val = this.consoleWrite();
                if (val == 1) { //mode panic on
                    while (tokens[indiceTK].lexema != ";" && indiceTK < tokens.length) { //vas a reccorer la lista hasta encontrar un ;
                        indiceTK++;
                    }
                    indiceTK++; //aqui te comes la coma
                }
            }
        }
        catch (error) {
        }
    };
    Lexico.prototype.consoleWrite = function () {
        if (tokens[indiceTK].lexema == "Console") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return 1;
        }
        if (tokens[indiceTK].lexema == ".") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return 1;
        }
        if (tokens[indiceTK].lexema == "Write") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return 1;
        }
        if (tokens[indiceTK].lexema == "(") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return 1;
        }
        while (tokens[indiceTK].lexema != ")") {
            if (tokens[indiceTK].idTipo == 20 || tokens[indiceTK].idTipo == 29) {
                indiceTK++;
            }
            else {
                this.errorSin();
                return 1;
            }
            if (tokens[indiceTK].lexema == "+") {
                indiceTK++;
            }
            else if (tokens[indiceTK].lexema != ")") {
                this.errorSin();
                return 1;
            }
        }
        if (tokens[indiceTK].lexema == ")") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return 1;
        }
        if (tokens[indiceTK].lexema == ";") {
            indiceTK++;
        }
        else {
            this.errorSin();
            return 1;
        }
        return 0;
    };
    Lexico.prototype.errorSin = function () {
        var consola = document.getElementById("txtConsola");
        consola.value += "error Sintactico->" + tokens[indiceTK].lexema + "\n";
        indiceTK++;
    };
    Lexico.prototype.es_reservada = function (texto) {
        var letras = ["int", "double", "char", "bool", "string", "void", "main", "if",
            "else", "switch", "case", "break", "default", "for", "while", "do",
            "return", "continue", "Console", "Write", "class", "true", "false", "Main"];
        for (var i = 0; i < letras.length; i++) {
            if (letras[i] == texto) {
                return true;
            }
        }
        return false;
    };
    Lexico.prototype.tiene_minuscula = function (texto) {
        var letras = "abcdefghijklmnñopqrstuvwxyz";
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
