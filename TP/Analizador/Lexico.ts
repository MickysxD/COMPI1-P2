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

        while(posicion < cadena.length){
            let caracter = cadena[posicion];
            switch(estado){
                case 0:
                    break;
    
                
    
            }

        }
        

    }

}

export = Lexico;