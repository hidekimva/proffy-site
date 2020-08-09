const DataBase = require('sqlite-async')

function execute (db) {
    //Criando tabelas db
    return db.exec(`
        CREATE TABLE IF NOT EXISTS  proffs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            Whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS class_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        )


    `)

}


module.exports = DataBase.open(__dirname + '/database.sqlite').then(execute) //abrir o banco de dados