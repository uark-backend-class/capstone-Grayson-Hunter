var express = require("express");
var app = express();
var http = require("http").createServer(app);

var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectId;

var database = null;

http.listen(3000, function () {
    console.log("Server started running at port: 3000");

mongoClient.connect("mongodb://localhost:27017", {
    useUnifiedTopology: true
}, function (error, client){
    if (error) {
        throw error;
    }
    database = client.db("web_crawler");
    console.log("Database connected");
    });
});