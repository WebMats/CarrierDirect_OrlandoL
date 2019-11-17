# Installation Instructions
This project requires an up-to-date version of NodeJS and npm or yarn.

Run `npm install`, to install packages. 
This will locally install webpack v4.41.2 and its accompanying plugins/loaders, as well as jest v24.9.0


# Development Server
This project uses webpack-dev-server v3.9.0
Run `npm start` for a dev server. The application should automatically open a new web tab, if it does not navigate to `http://localhost:8080/`. The app will automatically reload if you change any of the source files.

# Test
Run `npm test` or `npm run test` to run the full test suit.

# Technologies Used
For compiling next generation Javascript, webpack is using babel, with a browser support for `> 2%` and `last 2 versions`.

The styling for the application was written using SASS, which was compiled to CSS by a globably installed version of Dart SASS 1.23.3v using the `npm run sass` command
Prefixing for browser CSS properties was done automatically via the npm package autoprefixer.

Tests were written using jest.


# Project Requirements
The project has 3 main use cases:

Use Case 1: As a user, I would like to be able to find the price of a specific product.
This is done by pressing a button corresponding to the product; afterwards, details about the product are displayed to the user.
This is handled through an eventListener on a UI component, which when clicked will call `VendingMachine.buttonPress`. The function will retrieve the approriate product (the clicked product) and display its information of the output screen (square to right of products).

Use Case 2: As a user, I would like to be able to purchase a product.
This is done by adding approriate currency to the machine and then pressing a on the product the user is seeking to purchase.
Input an appropriate number in the input field underneath the output screen then click the 'ADD' button.
Through a 'click' EventListener, the button will call `VendingMachine.addUserMoney`. The function will update the 'balance' property on the machine object, and display user the new balance on the output screen.
Afterwards, if the balance is sufficient to purchase a particular product, the user can click on the product. This time `VendingMachine.buttonPress` will dispense the appropriate product and return the user change based on the balance and price of the product, this will be displayed on the output screen.

Use Case 3: As an admin, I would like to be able to add more product.
When an admin is ready to add more of a given product or to add a new product, the admin will click on the 'ADD PRODUCT' button, underneath the machine. A form will appear, and the admin can toggle a checkbox to add more of a given product or to add a new product. If a new product is being added, the admin will need to enter a price (currency cost of product) and a limit (max amount of a particular product that can be in the machine's inventory) in addition to name and amount (amount of a given product that the admin is looking to add). When 'SUBMIT' is clicked the form will submit. which through an EventListener will call `vendingMachine.adminAddProduct`. If a new product is being added, the function will build a new product based on the admin's specifications, add that product to the machine object, and update the UI to show that product. If more of a given product is being added, the function will look for that product in the machine inventory (by name) and add the appropriate amount of that product. If the name does not match any of the products in the inventory, an error message will be displayed.


# Build
Run `npm run prod` to build the project. The command will output all artifacts to the `/build` folder.

