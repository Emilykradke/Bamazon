var mysql = require("mysql");
var Table = require('cli-table');

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

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

var dataArr = []; 

function createArr() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            dataArr = [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            
        }  
        var table = new Table({
            head: ["ID", "Product Name", "Department", "Price", "In Stock"],
        });
        
        table.push(dataArr);
        
        console.log(table.toString());
    })
    console.log(dataArr)
}

createArr();


