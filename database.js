const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'testing',
});

connection.connect(function(error){
    if(error)
    {
           console.log("The database connection has faileddd");
            throw error;
    }
    else
    {
           console.log ('MySQL Database is connected Successfully');
    }
});
module.exports = connection;