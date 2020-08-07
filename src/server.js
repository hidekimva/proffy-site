//Dados da aplicação
const proffys = [//lista de obj, cada prof é um objeto
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "0000000",
        bio: "Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20,00",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },
    {
        name: "Ana Ristau",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "0000000",
        bio: "Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20,00",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    }
]

const subjects = [    
    "Artes",
    "Biologia",
    "Ciencias",
    "Educação Fisica",
    "Física",
    "Geografia",
    "Historia",
    "Matemática",
    "Português",
    "Quimica",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sabado",
]


//funcionalidade interface

function getSubject (subjectNumber) {
    return subjects[subjectNumber - 1]
}

function getWeekday (weekdayNumber) {
    return weekdays[weekdayNumber]
}


//Funcionalidade server
 //forma organizada, uma function para a chamada da pagina, depois passa a function
function pageLanding(req, res){
    //return res.sendFile(__dirname + "/views/index.html") //sem nunjucks
    return res.render("index.html")   
}

function pageStudy (req, res) {
    //return res.sendFile(__dirname + "/views/study.html")//sem nunjucks
    const filter = req.query
    return res.render("study.html", {proffys, filter, subjects, weekdays})   
}

function pageGiveClasses (req, res) {
    //return res.sendFile(__dirname + "/views/give-classes.html")//sem nunjucks  
    const data = req.query
    //valida se a var data é vazia
    const isNotEmpty = Object.keys(data).length > 0 //Object.keys transforma o data em Array para verificar se esta vazio [] 
    if (isNotEmpty) {
        data.subject = getSubject(data.subject)
        //Adicionar ao Objeto Proffys
        proffys.push(data)
        return res.redirect("/study")
    }    

    return res.render("give-classes.html", {subjects, weekdays})  
}


//Sevidor
const express = require('express')
const server = express() //devolve o Objeto

//configurar arquivos estáticos (css, script, img)
server.use(express.static("public"))

// rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
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


