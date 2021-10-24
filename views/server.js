const express = require("express");
const app = express();
const http = require("http").createServer(app);
const mongoose = require('mongoose')
const morgan = require('morgan')
const Site = require('../models/site')

const mongodb = require("mongodb");

// let mongoClient = mongodb.MongoClient;
// let ObjectId = mongodb.ObjectId;

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

const formidableMiddleware = require('express-formidable');
app.use(formidableMiddleware());

let database = null;
const dbURI = 'mongodb+srv://webCrawler:Taekwondo2021@cluster0.jkwzw.mongodb.net/webCrawler?retryWrites=true&w=majority'


//middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use((req,res,next) => {
    res.locals.path = req.path
    next()
})

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => {
        app.listen(3000)
        console.log('CONNECTED')})
    .catch(err => {console.log(err)})

app.get('/',(req,res) => {
    console.log('home')
    Site.find()
    .then(result => {
        res.send(result)
    }).catch(err => {
    })
})


app.post('/',(req,res) => {
    console.log(req.body)
    const site = new Site(req.body)
    site.save()
        .then((result) => {
            res.redirect('/')
        })
        .catch((err) => {
            console.log(err)
        })
    })

app.get("/", async function (request, result){
    result.render("index");
});

// http.listen(3000, function () {
//     console.log("Server started running at port: 3000");
// }

// mongoClient.connect("mongodb://localhost:27017", {
//     useUnifiedTopology: true
// }, function (error, client){
//     if (error) {
//         throw error;
//     }
//     database = client.db("web_crawler");
//     console.log("Database connected");
//     });
// });