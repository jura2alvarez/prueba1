var juradoDex = {};
module.exports = juradoDex;
var BASE_API_PATH = "/api/jurado";
var MongoClient = require('mongodb').MongoClient;

var urljurado = "mongodb://jurado:jurado910@ds137550.mlab.com:37550/juradodex"

juradoDex.register = function (app, db) {

    //----Variable para iniciar la BD en caso de DELETE total
    var initialDex = [{
            "tipo": "Estudios",
            "nombre": "Ingeniería Informática - Tecnologías Informáticas",
            "texto": "Universidad de Sevilla",
            "anyo": "2012-actualmente"
        },
        {
            "tipo": "Estudios",
            "nombre": "Ingeniería Informática - Ingeniería del Software",
            "texto": "Universidad de Sevilla",
            "Anyo": "Durante dos años, sin terminar"
        },
        {
            "tipo": "Idioma",
            "nombre": "Inglés",
            "texto": "Nivel medio",
            "Anyo": ""
        }

    ]


    //------Inicializador 

    app.get(BASE_API_PATH + "/dex/populate", (req, res) => {
        db.find({}, (err, divorces) => {
            if (err) {
                console.error(" Error accediendo a DB");
                process.exit(1);
                return;
            }
            db.find({}).toArray((err, dex) => {
                if (dex.length == 0) {
                    console.log("Empty DB");
                    db.insertMany(initialDex);
                    res.sendStatus(201);

                } else {
                    console.log("DB initialized with " + dex.length + " entry");
                    res.sendStatus(200);
                }

            });
        });
    });
    ////////////////////////////////
    //  PETICION GET (PAGINACION) //
    ////////////////////////////////
    app.get(BASE_API_PATH + "/dex", (req, res) => {
        var limit = Number(req.query.limit);
        var offset = Number(req.query.offset);
        if (limit > 0 & offset >= 0) {
            paginacion(urljurado, db, res, offset, limit)
        } else {
            sinPaginacion(urljurado, db, res)
        }


    });


    //  FUNCIONES AUXILIARES GET  

    function paginacion(urljurado, db, res, offset, limit) {
        MongoClient.connect(urljurado, function (err, db) {
            if (err) throw err;
            var dbo = db.db("juradodex");
            if (err) throw err;
            dbo.collection("Dex").find({}).skip(offset).limit(limit).toArray(function (err, result) {
                if (!err && !result.length) {
                    console.log("Not found - Pagination");
                    res.sendStatus(200);
                } else {
                    res.send(result.map((c) => {
                        delete c._id;
                        return c;
                    }));
                }
                db.close();
            });
        });
    }

    function sinPaginacion(urljurado, db, res) {
        MongoClient.connect(urljurado, {
            useNewUrlParser: true
        }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("juradodex");
            if (err) throw err;
            dbo.collection("Dex").find({}).toArray(function (err, result) {
                if (!err && !result.length) {
                    console.log("Not found - No pagination");
                    res.sendStatus(200);
                } else {
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


    ////////////////////////////////
    //    PETICION POST (VÁLIDO)  //
    ////////////////////////////////


    app.post(BASE_API_PATH + "/dex", (req, res) => {
        console.log(Date() + " - POST / dex");
        var dex = req.body;
        if (dex.Nombre == null || dex.Texto == null) {
            console.error("Campos no validos");
            res.sendStatus(400);
            return;
        }
        añadido = añadeAMongo(db, dex, res)
        //res.sendStatus(añadido ? 201 : 409)
    });

    //////////////////////////////////////
    //######Funciones Auxiliares POST
    function añadeAMongo(db, dex, res) {
        db.find({
            "Nombre": dex.Nombre
        }).toArray((err, existe) => {
            if (err) {
                console.error("Error accediendo a la BD mongo");
                process.exit(1);
            }

            if (existe.length == 0) {
                console.log("Itentando introducir" + dex);
                db.insertOne(dex);
                console.log(dex);
                console.log("Elemento insertado");
                res.sendStatus(201);
            } else {
                console.log("El elemento ya existe");
                res.sendStatus(409);
            }
        });
        //return res;

    }
    ////////////////////////////////

    ////////////////////////////////
    //   PETICION DELETE (TOTAL)  //
    ////////////////////////////////
    app.delete(BASE_API_PATH + "/dex", (req, res) => {
        console.log(Date() + " - DELETE /dex");

        db.deleteMany({});

        res.sendStatus(200);
    });
    ////////////////////////////////


    ////////////////////////////////
    //   PETICION GET (?tipo)     //  Busqueda por tipo
    ////////////////////////////////
    app.get(BASE_API_PATH + "/dex/:tipo?", (req, res) => {
        var tipo = req.params.tipo;
        var query = req.query;
        console.log(Date() + " - GET /dex/" + tipo);
        if (query.nombre == null && query.texto == null && query.anyo == null) {
            buscaTipo(db, query, res, tipo)
        }
    });
    //######Funciones Auxiliares GET?tipo
    function buscaTipo(db, query, res, tipo) {
        db.find({
            "Tipo": tipo
        }).toArray((err, results) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            res.send(results.map((c) => {

                delete c._id;
                return c;

            }));

        });
    }

    ////////////////////////////////
    //   PETICION DELETE (?tipo)  //  Delete por tipo
    ////////////////////////////////
    app.delete(BASE_API_PATH + "/dex/:tipo?", (req, res) => {
        var tipo = req.params.tipo;
        console.log(Date() + " - DELETE /dex/" + tipo);

        db.deleteMany({
            "tipo": tipo
        });

        res.sendStatus(200);
    });


} //--Fin de codigo