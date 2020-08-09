//Sevidor
const express = require('express')
const server = express() //devolve o Objeto
//chamada das função
const { 
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
} = require('./pages')

//configurar arquivos estáticos (css, script, img)
server
.use(express.static("public"))
.use(express.urlencoded({ extended: true }))


// rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
//start do servidor
.listen(5500)

// configurar nunjucks
const nunjucks = require('nunjucks')

nunjucks.configure('src/views', { //pasta do arquivos que esta o HTML
    //Envia objeto com opções
    express: server, //precisar saber qual esta executando
    noCache: true // Guardar Cache
})

//Forma desorganizada
//.get("/", (req, res) => {return res.sendFile(__dirname + "/views/index.html")}) //mostra onde esta a pagina

//.get("/study", (req, res) => {return res.sendFile(__dirname + "/views/study.html")})

//.get("/give-classes", (req, res) => {return res.sendFile(__dirname + "/views/give-classes.html")})

//.listen(5500) /*Roda o servidor*/ 


