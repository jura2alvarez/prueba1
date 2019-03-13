var juradoDex = {};
module.exports = dex;
var BASE_API_PATH = "/api/jurado";
var MongoClient = require('mongodb').MongoClient;


var initialDivorces  = [
    { "Nombre": "Ingeniería Informática - Tecnologías Informáticas", "Texto": "2012-Actualmente"}
    
]



app.get(BASE_API_PATH+"/dex", (req, res) => {
    var limit = Number(req.query.limit);
    var offset = Number(req.query.offset);
    if (limit > 0 & offset >= 0) {
        MongoClient.connect(urljurado, function(err, db) {
            if (err) throw err;
            var dbo = db.db("juradodex");
            if (err) throw err;
            dbo.collection("dex").find({}).skip(offset).limit(limit).toArray(function(err, result) {
                if (!err && !result.length) {
                    console.log("Not found 1");
                    res.sendStatus(200);
                }
                else {
                    res.send(result.map((c) => {
                        delete c._id;
                        return c;
                    }));
                }
                db.close();
            });
        });
    }
    else {
        MongoClient.connect(urljurado, function(err, db) {
            if (err) throw err;
            var dbo = db.db("juradodex");
            if (err) throw err;
            dbo.collection("dex").find({}).toArray(function(err, result) {
                if (!err && !result.length) {
                    console.log("Not found 2");
                   res.sendStatus(200);
                }
                else {
                    res.send(result.map((c) => {
                        delete c._id;
                        return c;
                    }));
                }
                 console.log(Date() + " - GET /juradodex")
                db.close();
            });
        });
    }
});