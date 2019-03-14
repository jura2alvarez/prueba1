var juradoDex = {};
module.exports = juradoDex;
var BASE_API_PATH = "/api/jurado";
var MongoClient = require('mongodb').MongoClient;

var urljurado= "mongodb://jurado:jurado910@ds137550.mlab.com:37550/juradodex"

juradoDex.register = function(app,db) {
    var initialDex  = [
        { "Nombre": "Ingeniería Informática - Tecnologías Informáticas", "Texto": "2012-Actualmente"}
        
    ]


//------Petición GET (paginación)
    app.get(BASE_API_PATH+"/dex", (req, res) => {
        var limit = Number(req.query.limit);
        var offset = Number(req.query.offset);
        if (limit > 0 & offset >= 0) {
            MongoClient.connect(urljurado, function(err, db) {
                if (err) throw err;
                var dbo = db.db("juradodex");
                if (err) throw err;
                dbo.collection("Dex").find({}).skip(offset).limit(limit).toArray(function(err, result) {
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
                dbo.collection("Dex").find({}).toArray(function(err, result) {
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


    //------Petición POST (válido)

    app.post(BASE_API_PATH + "/dex", (req, res) => {
        console.log(Date() + " - POST / dex");
        var dex = req.body;
        if (dex.Nombre == null || dex.Texto == null) {
            console.error("Campos no validos");
            res.sendStatus(400);
            return;
        }
    
        db.find({ "Nombre": dex.Nombre, "Texto": dex.Texto}).toArray((err, existe) => {
            if (err) {
                console.error("Error accediendo a la BD mongo");
                process.exit(1);
            }
    
            if (existe) {
                console.log("Itentando introducir"+dex);
                db.insertOne(dex);
                console.log(dex);
                console.log("Elemento insertado");
                res.sendStatus(201);
            }
            else {
                console.log("El elemento ya existe");
                res.sendStatus(409);
            }
    
        });
    });

    
}







