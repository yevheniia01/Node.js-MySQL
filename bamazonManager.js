var mysql= require('mysql');
var Table = require('cli-table3');
//var request = require("request");
//var Table = require('cli-table')
//var express = require('express')
var inquirer = require('inquirer');
//const prompts = require('prompts');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Ghzlata44',
  database : 'bamazon'
});

let command = process.argv[2];
let secondCommand = process.argv[3];

/*for (var i = 4; i < process.argv.length; i++) {
    secondCommand += '+' + process.argv[i];
}*/

/*switch(command){
    case("manager"):
    if(secondCommand){
        displayItems()
    }else{
        console.log("Something Went Wrong")
    }
    break;
}*/
 
connection.connect(function(){
    console.log("connected")
start()
});
function start(){
    inquirer
    .prompt({
        name: "manage",
        type: "list",
        message: "CHOOSE AN OPTION PLEASE",
        choices: ["VIEW PRODUCTS FOR SALE", "VIEW LOW INVENTORY", "ADD TO INVENTORY", "ADD NEW PRODUCT"]
    }).then(function(answer){
        if(answer.manage === "VIEW PRODUCTS FOR SALE"){
            console.log("---------PRODUCTS IN 'BAMAZON' DATABASE---------")
            displayProducts()
        }else if(answer.manage === "VIEW LOW INVENTORY"){
            lowProducts()
        }else if(answer.manage === "ADD TO INVENTORY"){
            addMore();
        }else if(answer.manage === "ADD NEW PRODUCT"){
            addNewItem();
        }
    })
}


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
        back()
       
    })
}
 function lowProducts(){
    connection.query('SELECT * FROM products WHERE stock_quantity <= 3', function (error, res, fields) {
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
          back()
         
      })
}
function addMore(){
    inquirer
    .prompt([{
        name: 'item',
        type: 'input',
        message: 'TO ADD MORE, PLEASE TYPE ITEM NAME',
        //filter:Number
    },
     {
         name: 'Quantity',
         type: 'input',
         message: 'ENTER QUANTITY YOU WANT TO ADD',
         filter:Number
     },
]).then(function(answer){
    var choosenItem = answer.item;
    var quantityToAdd = answer.Quantity;
    addQuantityToDataBase(choosenItem, quantityToAdd )
})
}
function addQuantityToDataBase(item, Quantity){
 connection.query("SELECT*FROM products WHERE item_id = '" + item+ "'", function(err, res){
   // var total = res[0].price + quantityToAdd;
    //console.log("")
    connection.query("UPDATE products SET stock_quantity = stock_quantity + '"+ Quantity+ "'" + "WHERE product_name = '" + item +"'");
    displayProducts();
  
})
}
function addNewItem(){
    inquirer
    .prompt([{
        name: 'item',
        type: 'input',
        message: 'TO ADD NEW ITEM, PLEASE TYPE ITEM NAME',
        //filter:Number
    },
     {
         name: 'Quantity',
         type: 'input',
         message: 'ENTER QUANTITY YOU WANT TO ADD',
         filter:Number
     },
     {
         name: 'Department',
         type: 'input',
         message: 'PLEASE ENTER DEPARTMENT FOR YOUR ITEM'
     }, 
     {
         name: 'Price',
         type: 'input',
         message: 'PLEASE ENTER PRICE FOR YOUR ITEM'
     },
     
]).then(function(answer){
    connection.query(
        "INSERT INTO products SET ?",
        {
            product_name: answer.item,
            department_name: answer.Department,
            price: answer.Price,
            stock_quantity: answer.Quantity
        },
        function(err){
            if(err)throw err;
            console.log("YOUR ITEM WAS ADDED TO 'PRODUCTS' DATABASE")
        }
    )
    var newItem = answer.item;
    var newItemQuantity = answer.Quantity;
    var newIttemDepartment = answer.Department;
    var newItemPrice = answer.Price;
    addQuantityToDataBase(newItem, newItemQuantity, newIttemDepartment, newItemPrice )
})
}
/*function addQuantityToDataBase(item, Quantity, Department,Price){
 connection.query("SELECT*FROM products WHERE item_id = '" + item+ "'", function(err, res){
   // var total = res[0].price + quantityToAdd;
    //console.log("")
    connection.query("UPDATE products SET stock_quantity = stock_quantity + '"+ Quantity+ "'" + "WHERE product_name = '" + item +"'");
    displayProducts();
  
})
}*/
function back(){
inquirer
.prompt({
    name: "goback",
    type: "list",
    message: "",
    choices: ["GO BACK"]
}).then(function(answer){
    if (answer.goback === "GO BACK"){
        start();
    }
})
}

/*function displayItems(){
    connection.query("SELECT * FROM products", function(err, results){
if (err) throw err;
inquirer
.prompt([
    {
      name: "choice",
      type: "list",
      choices: function() {
        var choiceArray = [];
        for (var i = 0; i < results.length; i++) {
          choiceArray.push(results[i].product_name);
        }
        return choiceArray;
      },
      message: "What auction would you like to place a bid in?"
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
