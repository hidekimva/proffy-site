const DataBase = require('./db')
const db = require('./db')
const creatProffy = require('./createProffs')

DataBase.then( async (db) => {

    proffyValue = {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "4432321932",
        bio: "Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
         
    }

    classValue = {
        subject: 1,
        cost: "20,00",
        //proffy_id vai pela bd
    }

    classScheduleValues = [
        {
            weekday: '1',
            time_from: '720',
            time_to: '1220'
        },
        {
            weekday: '0',
            time_from: '520',
            time_to: '1220'
        }
    ]

    await creatProffy(db, {proffyValue, classValue, classScheduleValues})


     //consulta de dados

     const selectedProffys = await db.all("SELECT * FROM proffs")
     //console.log(selectedProffys)
 
     //consulta dados mais classe
     const classesProffe = await db.all(`
         SELECT classes.*, proffs.*
         FROM proffs
         JOIN classes ON (classes.proffy_id = proffs.id)
         WHERE classes.proffy_id = 1;
     `)
 
    // console.log(classesProffe)
 
    const selectClassesSchedule = await db.all(`
         SELECT class_schedule.*
         FROM class_schedule
         WHERE class_schedule.class_id = "1"
         AND class_schedule.weekday = "0"
         AND class_schedule.time_from <= "1400"
         AND class_schedule.time_to > "1400"
    `) 
 
   //console.log(selectClassesSchedule)

})