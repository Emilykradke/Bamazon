# Bamazon

Bamazon is an Amazon-like storefront that takes in orders from customers and depletes stock from the store's inventory.

### Technologies Used: 
* MySQL
* NodeJS
* JavaScript
* NPM Packages: mysql, inquirer, mysql

### Getting Started
1. CLone repo
`https://github.com/Emilykradke/Bamazon.git`
2. Run 'npm install'

### How to use Bamazon
On load, Bamazon will display all of its inventory, and prompt the user for the id of the item they would like to purchase.

![userEx](images/products.PNG?raw=true "Example user Input"

After the user enters the id, they are prompted for how many they would like to purchase

![userEx](images/prompt.PNG?raw=true "Example user Input"

If the user's requested quantity is larger than the quantity that is in stock, they will be alerted that there is insufficient quantities in stock and they are redirected back to the selection prompt 

![userEx](images/insufficient.PNG?raw=true "Example user Input"

Otherwise, the transaction is complete and they are shown their total for their purchase

![userEx](images/total.PNG?raw=true "Example user Input"

### Author
* Emily Radke 