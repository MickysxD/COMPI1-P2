import Sintactico from "./Sintactico";
import TokenLexico from "../Clase/TokenLexico";
import ErrorLexico from "../Clase/ErrorLexico";

class Lexico{
    token:TokenLexico[] = [];
    error:ErrorLexico[] = [];
    t:Sintactico;

    constructor(t:Sintactico){
        this.t = t;

    }

    analisis(cadena:string){
        let tokens:TokenLexico[] = [];
        let errores:ErrorLexico[] = [];
        let posicion = 0;
        let idToken = 0;
        let idError = 0;
        let fila = 0;
        let columna = 0;
        let estado = 0;
        let lexema = "";

        while(posicion < cadena.length){
            let caracter = cadena[posicion];
            switch(estado){
                case 0:
                    if(caracter == "\n"){
                        estado = 0;
                        fila++;
                        posicion++;
                    }else if( caracter == "\t" || caracter == " "){
                        estado = 0;
                        posicion++;
                    }else if(caracter == "+"){
                        tokens.push(new TokenLexico(idToken, "Signo mas", 1, caracter, fila, columna))
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }else if(caracter == "-"){
                        tokens.push(new TokenLexico(idToken, "Signo menos", 2, caracter, fila, columna))
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }else if(caracter == "*"){
                        tokens.push(new TokenLexico(idToken, "Signo de multiplicacion", 4, caracter, fila, columna))
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }else if(caracter == "<"){
                        estado = 8;
                        posicion++;
                        tokens.push(new TokenLexico(idToken, "Signo menor que", 5, caracter, fila, columna))
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }else if(caracter == ">"){
                        tokens.push(new TokenLexico(idToken, "Signo mayor que", 6, caracter, fila, columna))
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }else if(caracter == ";"){
                        tokens.push(new TokenLexico(idToken, "Punto y coma", 7, caracter, fila, columna))
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }else if(caracter == ":"){
                        tokens.push(new TokenLexico(idToken, "Doble punto", 8, caracter, fila, columna))
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }else if(caracter == ","){
                        tokens.push(new TokenLexico(idToken, "Coma", 9, caracter, fila, columna))
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }else if(caracter == "("){
                        tokens.push(new TokenLexico(idToken, "Parentesis que habre", 10, caracter, fila, columna))
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }else if(caracter == ")"){
                        tokens.push(new TokenLexico(idToken, "Parentesis que cierra", 11, caracter, fila, columna))
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }else if(caracter == "{"){
                        tokens.push(new TokenLexico(idToken, "Corchete que habre", 12, caracter, fila, columna))
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }else if(caracter == "}"){
                        tokens.push(new TokenLexico(idToken, "Corchete que cierra", 13, caracter, fila, columna))
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }else if(caracter == "!"){
                        tokens.push(new TokenLexico(idToken, "Signo not", 14, caracter, fila, columna))
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }else if(caracter == "."){
                            tokens.push(new TokenLexico(idToken, "Punto", 19, caracter, fila, columna))
                            estado = 0;
                            idToken++;
                            columna++;
                            posicion++;
                    }else if(caracter == "/"){
                        estado = 1;
                        posicion++;
                    }else if(caracter == "_" || this.tiene_minuscula(caracter) || this.tiene_miyuscula(caracter)){
                        lexema += caracter;
                        estado = 5;
                        posicion++;
                    }else if(caracter == "\""){
                        estado = 6;
                        posicion++;
                    }else if(caracter == "'"){
                        estado = 7;
                        posicion++;
                    }
                    break;
                    
                case 1:
                    if(caracter == "/"){
                        estado = 2;
                        posicion++;
                    }else if(caracter == "*"){
                        estado = 3;
                        posicion++;
                    }else{
                        tokens.push(new TokenLexico(idToken, "signo de division", 3, caracter, fila, columna))
                        estado = 0;
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    break;

                case 2:
                    if(caracter != "\n"){
                        lexema += caracter;
                        posicion++;
                    }else{
                        tokens.push(new TokenLexico(idToken, "Comentario de linea", 15, lexema, fila, columna))
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    break;
    
                case 3:
                    if(caracter != "*"){
                        lexema += caracter;
                        posicion++;
                    }else{
                        estado = 4;
                        posicion++;
                    }
                    break;

                case 4:
                    if(caracter == "/"){
                        tokens.push(new TokenLexico(idToken, "Comentario multilinea", 16, lexema, fila, columna))
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                        posicion++;
                    }else{
                        estado = 3;
                        lexema += "*";
                        posicion++;
                    }
                    break;

                case 5:
                    if(caracter == "_" || this.tiene_minuscula(caracter) || this.tiene_miyuscula(caracter) || this.tiene_numero(caracter)){
                        lexema += caracter;
                        estado = 5;
                        posicion++;
                    }else{
                        if(this.es_reservada(lexema)){
                            tokens.push(new TokenLexico(idToken, "Palabra reservada", 17, lexema, fila, columna));
                        }else{
                            tokens.push(new TokenLexico(idToken, "Identificador", 18, lexema, fila, columna));
                        }
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    break;

                case 6:
                    if(caracter != "\""){
                        lexema += caracter;
                        estado = 6;
                        posicion++;
                    }else{
                        tokens.push(new TokenLexico(idToken, "Cadena", 18, caracter, fila, columna));
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    break;

                case 7:
                    if(caracter != "'"){
                        lexema += caracter;
                        estado = 6;
                        posicion++;
                    }else{
                        if(lexema.length == 1){
                            tokens.push(new TokenLexico(idToken, "Cadena", 18, caracter, fila, columna));
                            idToken++;
                        }else{
                            errores.push(new ErrorLexico(idToken, "Error lexico: no es cadena", caracter, fila, columna));
                            idError++;
                        }
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }
                    break;

                case 7:
                    if(caracter == "="){
                        lexema += caracter;
                        estado = 6;
                        posicion++;
                    }else{
                        
                        tokens.push(new TokenLexico(idToken, "Cadena", 18, caracter, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }
                    break;

            }

        }
        

    }

    
    es_reservada(texto:string){
        let letras = ["int","double","char","bool","string","void","main","if",
                      "else","switch","case","break","default","for","while","do",
                      "return","continue","Console","Write"];
        for(let i=0; i<letras.length; i++){
            if (letras[i] == texto){
                return true;
            }
        }
        return false;
    }

    tiene_minuscula(texto:string){
        let letras= "abcdefghyjklmnñopqrstuvwxyz";
        for(let i=0; i<letras.length; i++){
            if (letras[i] == texto){
                return true;
            }
        }
        return false;
    }

    tiene_miyuscula(texto:string){
        let letras= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for(let i=0; i<letras.length; i++){
            if (letras[i] == texto){
                return true;
            }
        }
        return false;
    }

    tiene_numero(texto:string){
        let letras= "0123456789";
        for(let i=0; i<letras.length; i++){
            if (letras[i] == texto){
                return true;
            }
        }
        return false;
    }

}

export = Lexico;