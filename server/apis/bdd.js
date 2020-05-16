'use strict';

var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: 'db',
    database: 'Todos',
    user: 'root',
    password: 'root'
});



module.exports = connection