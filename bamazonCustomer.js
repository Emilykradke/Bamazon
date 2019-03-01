var mysql = require("mysql");

var inquirer = require("inquirer");

var cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Chester1234!",
  database: "bamazon"
});

var itemID;
var itemQuantity;
var productName;
var totalStock;
var orderTotal; 


connection.connect(function(err) {
  if (err) throw err;
  displayItems();
});

function displayItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    console.table(res);

    promptUser();
  })
}

function promptUser() {
  inquirer
    .prompt([
      {
        name: "ID",
        type: "input",
        message: "Welcome to Bamazon! Please select the id for the item you would like to purchase",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
      },
      {
        name: "quantity",
        type: "input", 
        message: "How many would you like?",
        validate: function(value) {
          if (isNaN(value) === false) {
              return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
        itemID = parseInt(answer.ID);
        itemQuantity = parseInt(answer.quantity); 
        confirmOrder();
    });
}

function confirmOrder() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    
    for (var i = 0; i < res.length; i++) {
      if (res[i].id === itemID && res[i].stock_quantity >= itemQuantity) {
        orderCalc = res[i].price * itemQuantity;
        orderTotal = orderCalc.toFixed(2);
        totalStock = res[i].stock_quantity - itemQuantity;
        productName = res[i].product_name
        console.log(`Thank you for your purchase of $${orderTotal}`)
        updateStock();
      } else if (res[i].id === itemID && res[i].stock_quantity < itemQuantity) {
        console.log(`Insufficient quantity. There are only ${res[i].stock_quantity} ${res[i].product_name}s available.`)
      }
    }
  });
}

function updateStock() {
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: totalStock
      }, 
      {
        id: itemID
      }
    ],
    function (err, res) {
      if (err) throw err;
      connection.end();
    }
  )
}