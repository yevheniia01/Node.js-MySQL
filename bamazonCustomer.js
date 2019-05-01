var mysql= require('mysql');
var Table = require('cli-table')
//var express = require('express')
var inquirer = require('inquirer');
//const prompts = require('prompts');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Ghzlata44',
  database : 'bamazon'
});
 
connection.connect();
 var displayProducts = function(){
connection.query('SELECT * FROM products', function (error, res, fields) {
  if (error) throw error;
    var table = new Table ({
        head: ['item_id', "product_name","Department Name", "price", "stock_quantity"],
        colWidths: [10, 25, 25, 10, 14]
    });
    for(var i = 0; i < res.length; i++){
        table.push(
            [res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
    }
    console.log(table.toString());
    askUserPrompt();
   
})
 }
function askUserPrompt(){
    inquirer.prompt([{
        name: "ID", 
        type: "input",
        message: "Please Enter Item ID",
        filter:Number
    },
    {
        name: 'Quantity',
        type: 'input',
        message: 'How many items you want to buy?',
        filter:Number
    },
]).then(function(answers){
    var choosenQuantity = answers.Quantity;
    var choosenId = answers.ID;
    userOrder(choosenId, choosenQuantity);
})
}
function userOrder(ID, quantityN){
    connection.query("SELECT*FROM products WHERE item_id = '" + ID+ "'", function(err, res){
        if(quantityN <=res[0].stock_quantity){
            var totalCost = res[0].price * quantityN;
            console.log("Item Available In Stock!");
            console.log("Your total for " + quantityN  + " " +res[0].product_name + " is " +totalCost + "$"+" Thank you!");
        
            connection.query("UPDATE products SET stock_quantity = stock_quantity - '"+ quantityN+ "'" + "WHERE item_id = '" + ID +"'");
        }else{
			console.log("Sorry, we dont have enough '" + res[0].product_name +"'" + "to complete your order.");
        };
        displayProducts();
    })
}
/*function displayItems(){
    connection.query("SELECT * FROM products", function(err, results){
if (err) throw err;
inquirer
.prompt([
    {
      name: "choice",
      type: "rawlist",
      choices: function() {
        var choiceArray = [];
        for (var i = 0; i < results.length; i++) {
          choiceArray.push(results[i].product_name);
        }
        return choiceArray;
      },
     // message: "What auction would you like to place a bid in?"
    },
]).then(function(answer) {
    // get the information of the chosen item
    var chosenItem;
    for (var i = 0; i < results.length; i++) {
      if (results[i].product_name === answer.choice) {
        chosenItem = results[i];
      }
    }

})
    })
}*/
//displayItems()
displayProducts();
 
//connection.end();


/*connection.query('SELECT * FROM products', function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    console.log(results.toString())
    // fields will contain information about the returned results fields (if any)
  });*/