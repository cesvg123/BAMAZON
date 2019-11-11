const mysql = require("mysql");
// const inquirer = require("inquirer");
// const table = require("cli-table");
const myDB = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
}

const connection = mysql.createConnection(myDB);

connection.connect(err => {
    if (err) throw new err;
    console.log("connected as id:" + connection.threadId)
});