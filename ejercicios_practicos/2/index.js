const fs = require("fs")

const readFile = (file) => {
    fs.readFile(file, "utf8", (error, datos) => {
        if (error) {
            console.error(`Error al leer el archivo: ${error}`)
        } else {
            console.log(`Contenido del archivo: ${datos}`)
        }
    })
}

readFile("datos.txt")
