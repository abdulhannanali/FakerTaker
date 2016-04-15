const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")

const app = express()

const ENV = process.env.NODE_ENV || "development"

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || "0.0.0.0"

app.set("views", __dirname + "/views")
app.set("view engine", "pug")

if (ENV == "development") {
    app.use(morgan("dev"))    
} else {
    app.use(morgan("combined"))
}

app.get("/", function (req, res, next) {
    res.render("index", {
        title: "FakerTaker: Takes client to the given url while faking it",
        metas: [
            {
                property: "og:title",
                content: "FakerTaker: Takes client to the given url while faking it using meta tags"
            },
            {
                property: "og:image",
                content: "http://i.imgur.com/dH6GW37.jpg"
            },
            {
                property: "og:url",
                content: "https://fakertaker.herokuapp.com"
            },
            {
                property: "og:type",
                content: "website"
            },
            {
                property: "og:description",
                content: "FakerTaker is a website that takes client to the url while faking the title, description and other stuff using the OpenGraph protocol meta tags! To create such a link go to the homepage!"
            }
        ]
    })
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