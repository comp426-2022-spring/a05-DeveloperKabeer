const minimist = require('minimist')
const argv = minimist(process.argv.slice(2))
const help = (`
server.js [options]
--port	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535.
--debug	If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.
--log		If set to false, no log files are written. Defaults to true.
            Logs are always written to database.
--help	Return this message and exit.
`)

if (argv.help || argv.h) {
    console.log(help)
    process.exit(0)
}
const express = require("express")
const app = express()
const morgan = require("morgan")
const fs = require("fs")
const db = require("./src/services/database.js")
const port = argv["port"] || 5000

app.use(express.json())

if (argv.debug == "true" || argv.debug == true) {
    app.get("/app/log/access", (req, res) => {
        try {
            const stmt = db.prepare("SELECT * FROM accesslog").all()
            res.status(200).json(stmt)
        } catch (err) {
            console.error(err)
        }
    })
    app.get("/app/error", (req, res) => {
        throw new Error("Error test successful.")
    })
}

if (argv.log != "false" && argv.log != false) {
    const logDirectory = "./log/"
    if(!fs.existsSync(logDirectory)){
        fs.mkdirSync(logDirectory)
    }
    const accesslogstream = fs.createWriteStream(logDirectory + "access.log", { flags: "a" })
    app.use(morgan('combined', { stream: accesslogstream }))
}


app.use((req, res, next) => {
    let logdata = {
        remoteaddr: req.ip,
        remoteuser: req.user,
        time: Date.now(),
        method: req.method,
        url: req.url,
        protocol: req.protocol,
        httpversion: req.httpVersion,
        status: res.statusCode,
        referer: req.headers['referer'],
        useragent: req.headers['user-agent']
    }
    const stmt = db.prepare("INSERT INTO accesslog (remoteaddr, remoteuser, time, method, url, protocol, httpversion, status, referer, useragent) VALUES (?,?,?,?,?,?,?,?,?,?)")
    const info = stmt.run(logdata.remoteaddr, logdata.remoteuser, logdata.time, logdata.method, logdata.url, logdata.protocol, logdata.httpversion, logdata.status, logdata.referer, logdata.useragent)
    next()
})

function coinFlip() {
    var min = 1
    var max = 2
    var randomNumber = Math.floor(Math.random() * (max - min + 1) + min)
    if (randomNumber == 1) {
        return "heads"
    } else {
        return "tails"
    }
}

function coinFlips(flips) {
    var flipsArray = []
    for (var i = 0; i < flips; i++) {
        flipsArray.push(coinFlip())
    }
    return flipsArray;

}

function countFlips(array) {
    var flipCount = {}
    for (var i = 0; i < array.length; i++) {
        var flipResult = array[i]
        if (!flipCount[flipResult]) {
            flipCount[flipResult] = 0
        }
        flipCount[flipResult] += 1
    }
    return flipCount

}

function flipACoin(call) {
    var flipResult = coinFlip()
    if (flipResult != call) {
        return { call: call, flip: flipResult, result: "lose" }
    } else {
        return { call: call, flip: flipResult, result: "win" }
    }
}

const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

app.use(express.static("./public"))

app.get("/app/", (req, res) => {
    res.statusCode = 200
    res.statusMessage = "ok"
    res.writeHead(res.statusCode, { "Content-Type": "text/plain" })
    res.end(res.statusCode + " " + res.statusMessage)
})

app.get("/app/flip/", (req, res) => {
    var flip = coinFlip()
    return res.status(200).json({ "flip": flip })
})

app.get("/app/flips/:number", (req, res) => {
    var numFlips = req.params.number
    var flipResults = coinFlips(numFlips)
    var summary = countFlips(flipResults)
    return res.status(200).json({ "raw": flipResults, "summary": summary })
})

app.post("/app/flips/coins/", (req, res) => {
    var numFlips = req.body.number
    var flipResults = coinFlips(numFlips)
    var summary = countFlips(flipResults)
    return res.status(200).json({ "raw": flipResults, "summary": summary })
})

app.get("/app/flip/call/heads", (req, res) => {
    return res.status(200).json(flipACoin("heads"))
})

app.get("/app/flip/call/tails", (req, res) => {
    return res.status(200).json(flipACoin("tails"))
})

app.post("/app/flip/call/", (req, res) => {
    return res.status(200).json(flipACoin(req.body.guess))
})
app.use(function (req, res) {
    res.status(404).send("404 NOT FOUND")
})