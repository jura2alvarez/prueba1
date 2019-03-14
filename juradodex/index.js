var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");
var MongoClient = require("mongodb").MongoClient;
var path = require("path");
var cors = require("cors");
var request = require('request');
var app = express();

var port = (process.env.PORT || 1607);
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname + "/public")));
app.use(cors());


var juradomdbURL= "mongodb://jurado:jurado910@ds137550.mlab.com:37550/juradodex"
var juradoDex = require("./juradoDex");


console.log("Intentando conectar a dex");
MongoClient.connect(juradomdbURL, { useNewUrlParser: true }, (err, mlabs) => {
    if (err) {
        console.error("Error accesing DB" + err);
        process.exit(1)
    }
    else {
        console.log("Connected to DB");

        var database = mlabs.db("juradodex");
        var db = database.collection("Dex");
    }

    juradoDex.register(app, db);

    app.listen(port, () => {
        console.log("Server ready on port " + port + "!");
    }).on("error", (e) => {
        console.log("Server NOT READY:" + e);
    });
});
