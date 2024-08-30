let valor: number | string | boolean;

valor = 1; 
console.log("Valor numerico:", valor); 

valor = "Hola Mundo de Typescript";
console.log("Valor de string:", valor);

valor = true;
console.log("Valor booleano:", valor); 

// ---------------------------------------
let variable: any;

variable = 42;
console.log("Valor numérico:", variable); 

variable = "Hola mundo";
console.log("Valor de cadena:", variable); 
// ---------------------------------------// ---------------------------------------
enum Respuesta {
    No = 0,
    Si = "Si"
}

let respuestaUsuario: Respuesta = Respuesta.Si;
console.log("Respuesta del usuario:", respuestaUsuario);

respuestaUsuario = Respuesta.No;
console.log("Respuesta del usuario:", respuestaUsuario);
// ---------------------------------------
let identificador: string | number;

identificador = 123;
console.log("Identificador (número):", identificador); 
identificador = "ABC123";
console.log("Identificador (cadena):", identificador);
// ---------------------------------------
type err = "404" | "500" | "403";

function mostrarMensajeError(codigo: err) {
    switch (codigo) {
        case "404":
            console.log("Error 404: Página no encontrada");
            break;
        case "500":
            console.log("Error 500: Error interno del servidor");
            break;
        case "403":
            console.log("Error 403: Acceso denegado");
            break;
    }
}

mostrarMensajeError("404");
// ---------------------------------------