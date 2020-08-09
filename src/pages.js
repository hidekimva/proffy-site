//chamando o banco de dados
const DataBase = require('./database/db')

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')


//Funcionalidade server
 //forma organizada, uma function para a chamada da pagina, depois passa a function
function pageLanding(req, res){
    //return res.sendFile(__dirname + "/views/index.html") //sem nunjucks
    return res.render("index.html")   
}

async function pageStudy (req, res) {
    //return res.sendFile(__dirname + "/views/study.html")//sem nunjucks
    const filter = req.query

    if(!filter.subject || filter.weekdays || filter.time) {
        return res.render("study.html", {filter, subjects, weekdays})
    }

    const timeToMinutes = convertHoursToMinutes(filter.time)

    const query = `
        SELECT classes.*, proffs.*
        FROM proffs
        JOIN classes ON (classes.proffy_id = proffs.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = class_id
            AND class_schedule.weekday = ${filter.weekdays}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = ${filter.subject}
    `

    try {
        const db = await DataBase
        const proffys = await db.all(query)

        proffy.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render('study.html', {proffys, subjects, filter, weekdays})
        
    } catch (error) {
        console.log(error)
        
    }

}

function pageGiveClasses (req, res) {
    return res.render("give-classes.html", {subjects, weekdays})  
}  

async function saveClasses (req, res) {
    const createProffy = require("./database/createProffs") 
    
    const proffyValue = {
        neme: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map( (weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes( req.body.time_from[index]),
            time_to: convertHoursToMinutes( req.body.time_to[index])
        }
    })

    try{
        const db = await Database
        await createProffy(db, { proffyValue, classValue,classScheduleValues})

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday
        queryString += "&time=" + req.body.time_from[0]        

        return res.redirect("/study")
    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}