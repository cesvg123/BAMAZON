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
    if (err) throw err;
    console.log("connected as id:" + connection.threadId)
});

const displayProducts = function () {
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

function purchasePrompt() {
    inquirer.prompt([{
            name: "ID",
            type: "input",
            message: "Enter Item ID to be Purchase",
            filter: Number
        },
        {
            name: "Quantity",
            type: "input",
            message: "# of Items to be Purchase",
            filter: Number
        },
    ]).then(function (answers) {
        const quantityNeeded = answers.Quantity;
        const requestedID = answers.ID;
        pruchaseOrder(requestedID, quantityNeeded);
    });
};

function pruchaseOrder(ID, neededAmount) {
    connection.query("Select * FROM products WHERE item_id = " + ID, function (err, res) {
        if (err) {
            console.log(err)
        };
        if (neededAmount <= res[0].stock_quantity) {
            const totalCost = res[0].price * neededAmount;
            console.log("transaction completed successfully");
            console.log("Total cost" + neededAmount + " " + res[0].product_name + " is " + totalCost);
            connection.query("Updating products SET stock_quantity = stock_quantity - " + neededAmount + "where item_id=" + ID);
        } else {
            console.log(" unable to process your request, not enough items");
        }
        displayProducts();
    });
};
displayProducts();