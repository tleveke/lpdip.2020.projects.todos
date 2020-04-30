'use strict';

const express = require(`express`);
const path = require(`path`);
const fs = require(`fs-extra`);
const listsApi = express.Router();

var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: '172.17.0.3',
    database: 'Todos',
    user: 'root',
    password: 'root'
});

listsApi.get('/', async (req, res) => {
    let sql = 'Select * from List_Task';
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    })
});

listsApi.post('/', async (req, res) => {
    let list = req.body

    let sql = 'insert into List_Task(label,description) values(?,?)'
    connection.query(sql, [list.label, list.description], function (err, result) {
        if (err) throw err;

        list.id = result.insertId;
        res.json(list)
    })
});

listsApi.put('/:id', async (req, res) => {
    let id = req.params.id
    let list = req.body

    let sql = 'update List_Task set label=?, description=? where id=?'
    connection.query(sql, [list.label, list.description, id], function (err, result) {
        if (err) throw err;
        
        res.json(list)
    })
});

module.exports = listsApi;