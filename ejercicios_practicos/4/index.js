const express = require("express")
const session = require("express-session")
const app = express()

app.use(session({
  secret: "secretKey",
  resave: false,
  saveUninitialized: true
}))

app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  if (req.session.username) {//Redirigir al dashboard si la sesión está iniciada
    console.log("El usuario ya esta logeado, redirigir a dashboard")
    res.redirect("/dashboard")
  } else {
    res.send(`<a href="/login">Inicia sesión</a>`)
  }
})

//Verificar sesión
const requireLogin = (req, res, next) => {
  if (!req.session.username) {
    console.log("No hay session")
    res.redirect("/login")
  } else {
    console.log("Hay session")
    next()
  }
}

app.get("/login", (req, res) => {
  if (req.session.username) {//Redirigir al dashboard si la sesión está iniciada
    console.log("El usuario ya esta logeado, redirigir a dashboard")
    res.redirect("/dashboard")
  } else {
    res.send(`
      <form method="POST" action="/login">
        <label for="username">Usuario:</label>
        <input type="text" id="username" name="username"><br>
        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password"><br>
        <button type="submit">Iniciar sesión</button>
      </form>
    `)
  }
})

//CREDENCIALES HARDCODEADAS
let userCredentials = {
  username: "user",
  password: "123"
}

app.post("/login", (req, res) => {
  const { username, password } = req.body
  if (username === userCredentials.username && password === userCredentials.password) {
    req.session.username = username
    console.log("Login OK")
    res.redirect("/dashboard")
  } else {
    res.send("Credenciales incorrectas. <a href='/login'>Inténtalo de nuevo</a>")
  }
})

app.get("/dashboard", requireLogin, (req, res) => {
  res.send(`Hola ${req.session.username.toUpperCase()}, <a href="/logout">Cerrar sesión</a>`)
})

app.get("/logout", requireLogin, (req, res) => {
  req.session.destroy()
  res.redirect("/login")
  console.log("Logout echo")
})

const port = 3000
app.listen(port, () => {
  console.log(`Ruta: http://localhost:${port}`)
})