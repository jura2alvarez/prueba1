var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");
var MongoClient = require("mongodb").MongoClient;
var path = require("path");
var cors = require("cors");
var request = require('request');
var juradomdbURL= "mongodb://jurado:<dbpassword>@ds137550.mlab.com:37550/juradodex"

var BASE_API_PATH = "/api/jurado";

console.log("Intentando conectar a dex");
MongoClient.connect(juradomdbURL, { native_parser: true }, (err, mlabs) => {
    if (err) {
        console.error("Error accesing DB" + err);
        process.exit(1)
    }
    else {
        console.log("Connected to DB");

        var database = mlabs.db("juradodex");
        var db = database.collection("dex");
    }

    divorcesAPI.register(app, db);

    app.listen(port, () => {
        console.log("Server ready on port " + port + "!");
    }).on("error", (e) => {
        console.log("Server NOT READY:" + e);
    });
});
