module.exports = async function(db, {proffyValue, classValue, classScheduleValues}) {
    //inserir dados na tabela de proffy
    const insertedProff = await db.run(`
        INSERT INTO proffs (
            name,
            avatar,
            whatsapp,
            bio

        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `) 
    const proffy_id = insertedProff.lastID

    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id

        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
            
        );
    `)

    const class_id = insertedClass.lastID


    const insertAllClassScheduleValues = classScheduleValues.map ( (classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)   

    })

    //await Promise.all(insertAllClassScheduleValues)

   
}