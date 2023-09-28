const http = require("http")
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" })
        res.end("!Hola, mundo!")
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" })
        res.end("Página no encontrada")
    }
})

const port = 3000
server.listen(port, () => {
    console.log(`Ruta: http://localhost:${port}`)
})