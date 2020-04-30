'use strict';

const express = require(`express`);
const path = require(`path`);
const fs = require(`fs-extra`);
const todosApi = express.Router();
var mysql = require('mysql2');
var connection = mysql.createConnection({
  host: '172.17.0.3',
  database: 'Todos',
  user: 'root',
  password: 'root'
});

todosApi.get('/', async (req, res) => {
    let sql = 'Select * from Task';
    connection.query(sql, function (err, result) {
        if (err) throw err;

        result.forEach(task => {
            task.isDone = (task.isDone == 1);
        });

        res.json(result);
    })
});

todosApi.post('/', async (req, res) => {
    let task = req.body;

    let sql = 'insert into Task(label,idList,isDone) values(?,?,?)';
    connection.query(sql, [task.label, task.idList, false], function (err, result) {
        if (err) throw err;

        task.id = result.insertId;
        task.isDone = false;
        res.json(task)
    })
});

todosApi.put('/:id', async (req, res) => {
    
    let idUpd = req.params.id;
    let task = req.body;


    let sql = 'update Task set label=?, isDone=?  where id=?';
    connection.query(sql, [ task.label,task.isDone,idUpd ], function (err, result) {
        if (err) throw err;
        console.log('Task '+idUpd+' is updated')
        res.json(task)
    })
});

todosApi.delete('/:id', async (req, res) => {

    let idDel = req.params.id;

    let sql = 'Delete from Task where id=?';
    connection.query(sql, idDel, function (err, result) {
        if (err) throw err;
        console.log('Task '+idDel+' is deleted')
        res.json(result)
    })
});


module.exports = todosApi;