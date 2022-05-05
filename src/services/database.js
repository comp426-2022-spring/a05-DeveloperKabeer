const database = require("better-sqlite3")


const logdb = new database("log.db")


const stmt = logdb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`)
let row = stmt.get()

if (row == undefined){
    console.log("Log database appears to be empty")
    const sqlInit = `
        CREATE TABLE accesslog ( 
            id INTEGER PRIMARY KEY, 
            remoteaddr TEXT,
            remoteuser TEXT,
            time TEXT,
            method TEXT,
            url TEXT,
            protocol TEXT,
            httpversion TEXT,
            status TEXT, 
            referer TEXT,
            useragent TEXT
        );
    `
    logdb.exec(sqlInit)
    console.log("Initialized Log DB")
} else{
    console.log("Log DB already exists")
}


module.exports = logdb