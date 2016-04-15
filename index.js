var express = require("express")
var mongoose = require("mongoose")
var morgan = require("morgan")
var fs = require("fs")
var mkdirp = require("mkdirp")

var bodyParser = require("body-parser")

var app = express()

var mainMeta = JSON.parse(fs.readFileSync("./data/main-meta.json"))

var ENV = process.env.NODE_ENV || "development"

var PORT = process.env.PORT || 3000
var HOST = process.env.HOST || "0.0.0.0"
var MONGODB_CONNECTION_URI = process.env.MONGODB_CONNECTION_URI || "mongodb://localhost/fakertakerdb"

app.set("views", __dirname + "/views")
app.set("view engine", "pug")

app.use(bodyParser.urlencoded())

mkdirp.sync("./redirectData/")

if (ENV == "development") {
    app.use(morgan("dev"))    
} else {
    app.use(morgan("combined"))
}

app.get("/", function (req, res, next) {
    res.render("index", {
        title: "FakerTaker: Takes client to the given url while faking it",
        metas: mainMeta
    })
})

var data = []

app.post("/", function (req, res, next) {
    var data = {}
    
    var randomId = (Math.random() * 36).toString(36).substr(2, 10)
    var metaTags = req.body
    
    data.redirect_url = req.body["url"] || ""
    data.title = metaTags["og:title"] || ""
    
    data.metas = Object.keys(metaTags).map(function (value, index, array) {
        return {
            "property": value,
            "content": metaTags[value]
        }
    }).filter((value) => {return value || false})
    
    data.id = randomId
    
    fs.writeFile("./redirectData/" + randomId + ".json", JSON.stringify(data), function (error) {
        if (!error) {
            res.send(randomId)
        }
        else {
            next(error)
        }
    })
})


app.get("/demo", function (req, res, next) {
    var redirectorData = JSON.parse(fs.readFileSync("./data/redirector-meta.json"))
    
    res.render("redirector", {
        title: "Redirector Demo",
        metas: redirectorData,
        redirect_url: "https://github.com/abdulhannanali/FakerTaker"
    })
})

app.get("/about", function (req, res, next) {
    res.render("redirector", {
        title: "About Hannan Ali",
        metas: [],
        redirect_url: "https://facebook.com/abdulhannanali"
    })
})

app.get("/:id", function (req, res, next) {
    if (req.params.id && req.params.id.trim()) {
        var id = req.params.id
        
        fs.readFile("./redirectData/" + id + ".json", "utf-8", function (error, data) {
            if (error && (error.code == "ENOENT" || error.errno == -4058)) {
                next()
            }
            else {
                
                try {
                    var redirectData = JSON.parse(data)
                }
                catch (error) {
                    next(error)    
                }
                
                res.render("redirector", {
                    metas: redirectData.metas,
                    redirect_url: redirectData.redirect_url || "https://twitter.com/computistic",
                    title: redirectData.title || "Title"
                })
            }
        })
    }
    else {
        return next()
    }
})


app.get("/:id/thumb", function (req, res, next) {
})



app.listen(PORT, HOST, (error) => {
    if (!error) {
        console.log(`Server is listening on ${HOST}:${PORT}`)
    }
    else {
        console.error("Error occured while connecting to the server")
        console.error(error)
    }
})