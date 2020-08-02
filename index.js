const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser')


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

var mysql = require('mysql');
const { query, response } = require('express');

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'rikivino'
});



//busca todos los gordos o el gordo que pases por query param
app.get('/gordos', function(req, res) {



    var sql = 'SELECT * FROM gordos';
    var nombre = req.query.id;
    var resp, error;
    if (nombre) {
        sql = 'SELECT * FROM gordos WHERE id =' + nombre;
        connection.query(sql, function(err, result, fields) {

            resp = result;
            error = err;

            res.send(resp);
            // console.log(chalk.red('esto es el id', query.query.id))
        });
    } else {
        connection.query(sql, function(err, result, fields) {
            resp = JSON.stringify(result)
            error = err;
            console.log(resp);
            // console.log(chalk.red('esto es el idddd', req.query.id))

            res.send(resp);
        });
    }

});

//insertar un asado
let gordo1 = {
    nombre: 'Matias',
    asistencia: true,
    sede: true,
    compras: true,
    bebida: true,
    asador: true,
    lavado: false,
    ensalada: false,
    vino: 0,
    fecha: "2020-07-31"
};

let gordo2 = {
    nombre: 'Barto',
    asistencia: true,
    sede: false,
    compras: false,
    bebida: false,
    asador: false,
    lavado: true,
    ensalada: true,
    vino: 2,
    fecha: "2020-07-31"
};

//insertar un asado

// {
//     "nombre": "Barto",
//     "asistencia": true,
//     "sede": false,
//     "compras": false,
//     "bebida": false,
//     "asador": false,
//     "lavado": true,
//     "ensalada": true,
//     "vino": 2,
//     "fecha": "2020-07-31"
// }

app.post('/insertarasado', (req, res) => {


    var postdata = gordo1;
    // console.log('estos es el body', req.body.asistencia)
    // console.log('hola', postdata)
    let verdadero = true;
    let falso = false;
    let gordoEnCuestion = gordo1;
    // let prueba2 = 'SELECT * FROM asado';
    let sql;
    sql = `INSERT INTO asado ( gordo, asistencia, sede, compras, bebida, asador, lavado, ensalada, vino, fecha) VALUES ( "${postdata.nombre}", ${postdata.asistencia}, ${postdata.sede},${postdata.compras},${postdata.bebida},${postdata.asador},${postdata.lavado},${postdata.ensalada}, ${postdata.vino}, "${postdata.fecha}" )`;
    connection.query(sql, function(error, results, fields) {
        // console.log(chalk.green(prueba));
        // console.log(results)
        if (error) throw error;

        res.end(JSON.stringify(results));
    });


});


//puntos por GORDO

//SELECT SUM(puntos) from total where gordo like 'Matias';
app.get('/puntos', function(req, res) {
    let sql = 'hola'
    let gordos;


    new Promise((resolve, reject) => {
        sql = 'SELECT * from gordos';
        connection.query(sql, (err, results, fields) => {
            if (err) reject(err);
            resolve(results);
        })
    }).then(response => {
        gordos = Object.values(JSON.parse(JSON.stringify(response)))
        console.log('esto son los gordos', gordos)

        //traigo todos los asados
        new Promise((resolve, reject) => {

            sql = 'SELECT * from asado';
            connection.query(sql, (err, results, fields) => {
                if (err) reject(err);
                // console.log(results);
                resolve(results);
            });

        }).then(response => {
            // console.log(response)
            // console.log(response, 'esto es la segunda respuesta')
            res.status(200).send(gordos);
        }).catch(e => {

        });





    }).catch(e => {

    });





});


//eliminar un asado
app.delete('/insertarasado', (req, res) => {

    var postdata = gordo1;

    // console.log(req.body)
    // console.log('hola',postdata)

    var prueba = `DELETE FROM asado WHERE gordo="${postdata.nombre}"`;
    connection.query(prueba, function(error, results, fields) {
        // console.log(chalk.green(prueba));
        // console.log(results)
        if (error) throw error;
        res.end(JSON.stringify(results));
    });



});


app.listen(3000, function() {
    console.log(chalk.blue('example app listening on port 3000!'));
});