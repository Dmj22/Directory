const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const mysql = require('mysql2');


const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'moneycan4u',
        database: 'directory'
    },
    console.log('Connected to directory')
);


connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;