const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("cli-table");
const myDB = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "docker",
    database: "bamazon"
}

const connection = mysql.createConnection(myDB);

connection.connect(err => {
    if (err) throw new err;
    console.log("connected as id:" + connection.threadId)
});

const dasplayProducts = function () {
    const query = "Select * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        const displayTable = new table({
            head: ["Item ID", "Product Name", "Category", "Price", "Quantity"],
            colWidths: [8, 20, 20, 8, 10]
        });
        for (const i = 0; i < res.lenght; i++) {
            displayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        purchasePrompt();
    })



}