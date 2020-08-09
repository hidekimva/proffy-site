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

function convertHoursToMinutes (time) {
    const [hour, minutes] = time.split(":")
    return Number((hour * 60) + minutes)
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}