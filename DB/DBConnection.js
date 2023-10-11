const mysql= require('mysql2');

//create a  new connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:"nodejs"
})

connection.connect((err)=>{
    if(err){
        console.log('error connecting');
        return
    }
    console.log('Connected to MySQL database');
})


module.exports =connection;