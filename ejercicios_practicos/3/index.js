const axios = require("axios")
const urls = ["https://www.ejemplo1.es", "https://www.ejemplo2.com", "https://www.example.org"]
let countOk = 0
let countFailed = 0
const fetchAndPrintHTML = async (url) => {
    try {
        const response = await axios.get(url)
        console.log(`Contenido HTML de ${url}:`)
        console.log(response.data)
        console.log(`Fin del contenido HTML de ${url}\n\n`)
        countOk++
    } catch (error) {
        console.error(`Error al obtener ${url}: ${error.message}`)
        countFailed++
    }
}

// Promesa para mostrar el mensaje al acabar
const requestPromises = urls.map(url => fetchAndPrintHTML(url))
Promise.all(requestPromises)
    .then(() => {
        console.log(`Solicitudes exitosas: ${countOk}`)
        console.log(`Solicitudes fallidas: ${countFailed}`)
    })
    .catch(error => {
        console.error(`Error al procesar las solicitudes: ${error}`)
    })