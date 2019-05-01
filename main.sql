DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
use bamazon;
CREATE TABLE products(
item_id INTEGER (11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(30),
department_name VARCHAR(30),
price INTEGER (10) not null,
stock_quantity INTEGER (10) not null,
PRIMARY KEY(item_id)
);
use bamazon;
insert into products (item_id, product_name, department_name, price, stock_quantity)
values (1, "Tooth_Brush", "Household", 3, 100);
insert into products (item_id, product_name, department_name, price, stock_quantity)
values (2, "Lipstick", "MakeUp", 5, 100);
insert into products (item_id, product_name, department_name, price, stock_quantity)
values (3, "Broom", "Household", 10, 3);
insert into products (item_id, product_name, department_name, price, stock_quantity)
values (4, "Clorox", "Household", 4, 3);
insert into products (item_id, product_name, department_name, price, stock_quantity)
values (5, "Foundation", "MakeUp", 20, 100);
insert into products (item_id, product_name, department_name, price, stock_quantity)
values (6, "Windex", "Household", 3, 100);
insert into products (item_id, product_name, department_name, price, stock_quantity)
values (7, "Tooth_Paste", "Household", 4, 100);
insert into products (item_id, product_name, department_name, price, stock_quantity)
values (8, "AppleJuice", "Food", 2, 100);
insert into products (item_id, product_name, department_name, price, stock_quantity)
values (9, "Bananas", "Food", 1, 100);
insert into products (item_id, product_name, department_name, price, stock_quantity)
values (10, "Potatoes", "Food", 3, 100);
select * from products