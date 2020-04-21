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

    to_string():string{
        return "Id:"+this.id+" Tipo:"+this.tipo+" IDTipo:"+this.idTipo+" Lexema:"+this.lexema+" Fila:"+this.fila+" Columna:"+this.columna
    }

}

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
    
    to_string():string{
        return "Id:"+this.id+" Tipo:\""+this.tipo+"\" Lexema:"+this.lexema+" Fila:"+this.fila+" Columna:"+this.columna
    }
}

var indiceTK = 0;
var tabulador = 0;
let tokens:TokenLexico[] = [];
let errores:ErrorLexico[] = [];
var salida = (document.getElementById('txtSalida')as HTMLInputElement);
var consola = (document.getElementById("txtConsola") as HTMLInputElement);


class Lexico{

    analisis(entrada:string){
        let cadena = (document.getElementById(entrada) as HTMLInputElement).value;
        
        if(cadena != null && cadena != ""){
            this.analisisTodo(cadena);
        }
    }

    analisisTodo(cadena:string){
        //let cadena = (document.getElementById(entrada) as HTMLInputElement).value;
        salida = (document.getElementById('txtSalida')as HTMLInputElement);
        consola = (document.getElementById("txtConsola") as HTMLInputElement);
        indiceTK = 0;
        tabulador = 0;
        tokens = [];
        errores = [];
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
                        columna = 0;
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
                        lexema += caracter;
                        estado = 8;
                        posicion++;
                    }else if(caracter == ">"){
                        lexema += caracter;
                        estado = 9;
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
                        lexema += caracter;
                        estado = 11;
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
                    }else if(caracter == "="){
                        lexema += caracter;
                        estado = 10;
                        posicion++;
                    }else if(caracter == "&"){
                        lexema += caracter;
                        estado = 12;
                        posicion++;
                    }else if(caracter == "|"){
                        lexema += caracter;
                        estado = 13;
                        posicion++;
                    }else if(this.tiene_numero(caracter)){
                        estado = 14;
                    }else{
                        estado = 100;
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
                    }
                    break;

                case 6:
                    if(caracter != "\""){
                        lexema += caracter;
                        estado = 6;
                        posicion++;
                    }else{
                        tokens.push(new TokenLexico(idToken, "Cadena", 20, lexema, fila, columna));
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
                        estado = 7;
                        posicion++;
                    }else{
                        if(lexema.length == 1){
                            tokens.push(new TokenLexico(idToken, "Caracter", 21, lexema, fila, columna));
                            idToken++;
                        }else{
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
                    if(caracter == "="){
                        lexema += caracter;
                        tokens.push(new TokenLexico(idToken, "Signo menor o igual que", 22, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }else{
                        tokens.push(new TokenLexico(idToken, "Signo menor que", 5, lexema, fila, columna))
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    break;

                case 9:
                    if(caracter == "="){
                        lexema += caracter;
                        tokens.push(new TokenLexico(idToken, "Signo mayor o igual que", 23, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }else{
                        tokens.push(new TokenLexico(idToken, "Signo mayor que", 6, lexema, fila, columna))
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    break;

                case 10:
                    if(caracter == "="){
                        lexema += caracter;
                        tokens.push(new TokenLexico(idToken, "Signo igual igual", 25, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }else{
                        tokens.push(new TokenLexico(idToken, "Signo igual", 24, lexema, fila, columna))
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    break;

                case 11:
                    if(caracter == "="){
                        lexema += caracter;
                        tokens.push(new TokenLexico(idToken, "Signo diferente de", 26, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }else{
                        tokens.push(new TokenLexico(idToken, "Signo not", 14, lexema, fila, columna))
                        estado = 0;
                        lexema = "";
                        idToken++;
                        columna++;
                        posicion++;
                    }
                    break;

                case 12:
                    if(caracter == "&"){
                        lexema += caracter;
                        tokens.push(new TokenLexico(idToken, "Signo and", 27, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }else{
                        posicion--;
                        estado = 100;
                    }
                    break;

                case 13:
                    if(caracter == "|"){
                        lexema += caracter;
                        tokens.push(new TokenLexico(idToken, "Signo or", 28, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                        posicion++;
                    }else{
                        posicion--;
                        estado = 100;
                    }
                    break;

                case 14:
                    if(this.tiene_numero(caracter)){
                        estado = 14;
                        lexema += caracter;
                        posicion++;
                    }else if(caracter == "."){
                        estado = 15;
                        lexema += caracter;
                        posicion++;
                    }else{
                        tokens.push(new TokenLexico(idToken, "Numero", 29, lexema, fila, columna));
                        idToken++;
                        estado = 0;
                        lexema = "";
                        columna++;
                    }
                    break;

                case 15:
                    if(this.tiene_numero(caracter)){
                        estado = 14;
                        lexema += caracter;
                        posicion++;
                    }else{
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

        salida.value = "";
        consola.value = "";
        consola.value += "                      Tokens\n";

        tokens.forEach(element => {
            consola.value += element.to_string()+"\n";
        });

        consola.value += "\n\n";

        if(errores.length > 0){
            consola.value += "                      Errores\n";
            errores.forEach(element => {
                consola.value += element.to_string()+"\n";
            });
        }

        consola.value += "\n\n";

        this.analisis_sin();
        
    }

    analisis_sin(){
        try{
            while(indiceTK < tokens.length){
                let val = this.comienzo();

                if(val == 1){//mode panic on
                    while(tokens[indiceTK].lexema != ";" && indiceTK <tokens.length){//vas a reccorer la lista hasta encontrar un ;
                        indiceTK++;
                    }
                    indiceTK++;//aqui te comes la coma
                }
            }
        }catch(error){

        }
       
    }

    comienzo():number{
        if(tokens[indiceTK].idTipo == 15 || tokens[indiceTK].idTipo == 16){
            return this.comentario();
        }else if(tokens[indiceTK].lexema == "class"){
            return this.clase();
        }

        return 1;

    }

    clase():number{
        indiceTK++;
        return 0;
    }

    comentario():number{
        /*for(var i = 0; i<tabulador; i++){
            salida.value +="\t";
        }*/

        if(tokens[indiceTK].idTipo == 15){
            salida.value += "#"+tokens[indiceTK].lexema+"\n";
        }else if( tokens[indiceTK].idTipo == 16){
            salida.value += "'''"+tokens[indiceTK].lexema+"'''\n";
        }

        indiceTK++;
        return 0;
    }

    consoleWrite():number{
        if(tokens[indiceTK].lexema == "Console"){
            indiceTK++;
        }else{
            this.errorSin();
            return 1;
        }
        if(tokens[indiceTK].lexema == "."){
            indiceTK++;
        }else{
            this.errorSin();
            return 1;
        }
        if(tokens[indiceTK].lexema == "Write"){
            indiceTK++;
        }else{
            this.errorSin();
            return 1;
        }
        if(tokens[indiceTK].lexema == "("){
            indiceTK++;
        }else{
            this.errorSin();
            return 1;
        }
        while(tokens[indiceTK].lexema != ")"){
            if(tokens[indiceTK].idTipo == 20 || tokens[indiceTK].idTipo == 29){
                indiceTK++;
            }else{
                this.errorSin();
                return 1;
            }
            if(tokens[indiceTK].lexema == "+"){
                indiceTK++;
            }else if(tokens[indiceTK].lexema != ")"){
                this.errorSin();
                return 1;
            }
        }
        if(tokens[indiceTK].lexema == ")"){
            indiceTK++;
        }else{
            this.errorSin();
            return 1;
        }
        if(tokens[indiceTK].lexema == ";"){
            indiceTK++;
        }else{
            this.errorSin();
            return 1;
        }
        return 0;
    }

    errorSin(){
        var consola = (document.getElementById("txtConsola") as HTMLInputElement);
        consola.value += "error Sintactico->" + tokens[indiceTK].lexema + "\n";
        indiceTK++;
    }

    es_reservada(texto:string){
        let letras = ["int","double","char","bool","string","void","main","if",
                      "else","switch","case","break","default","for","while","do",
                      "return","continue","Console","Write", "class", "true", "false","Main"];
        for(let i=0; i<letras.length; i++){
            if (letras[i] == texto){
                return true;
            }
        }
        return false;
    }

    tiene_minuscula(texto:string){
        let letras= "abcdefghijklmnñopqrstuvwxyz";
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


