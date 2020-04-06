//Here have initialised an array "myInventory" that we will use to store all individual food Objects, updated and deleted. This can later be used to mage the storage and retrieval of objects in SessionStorage in later version of the app.  


let myInventory = [{
        item: "Burger",
        type: "food", // Type of food can either be food or drink 
        description: "Neque porro quisquam",
        price: 75
    },
    {
        item: "Pizza",
        type: "food",
        description: "Neque porro quisquam",
        price: 95
    }, {
        item: "Steak",
        type: "food",
        description: "Neque porro quisquam",
        price: 105
    }, {
        item: "Salad",
        type: "food",
        description: "Neque porro quisquam",
        price: 50
    }, {
        item: "Chips",
        type: "food",
        description: "Neque porro quisquam",
        price: 40
    }, {

        item: "Soda",
        type: "drink",
        description: "Neque porro quisquam",
        price: 20
    }, {
        item: "Coffee",
        type: "drink",
        description: "Neque porro quisquam",
        price: 25
    }, {
        item: "Beer",
        type: "drink",
        description: "Neque porro quisquam",
        price: 35
    }, {
        item: "Cocktail",
        type: "drink",
        description: "Neque porro quisquam",
        price: 50
    }, {
        item: "Tea",
        type: "drink",
        description: "Neque porro quisquam",
        price: 15
    }
];

// The totalBill variable wil be used to store the grant total ( a sum of the "price" of every item on the customers bill).

totalBill = 0;
indexInvoice = 0; 

// This function is triggered when  via an "onload()" event on the "body" tag. This main purpose of this function is to retrieve the various objects in the array declared above, and use the object "item" properties to populate the HTML dropdown on our pop-up modal. 

function myLoad() {

    let indexMyInventory = 0;

    myInventory.forEach(function () {

        let optItem = document.createElement("option");

        optItem.innerHTML = myInventory[indexMyInventory].item; // The value of the newly created dropdown option 
        optItem.value = indexMyInventory; // This correlated to the index value of the myInventory array. This will be useful when matching selected items with Inventory Items in myInventory array, in the addLineItem() function. 

        indexMyInventory++;
        document.getElementById("inputMenuOptions").appendChild(optItem);
    });

};


// This function is used to populate  the invoice lines/items on the table with id "metadataTable". 

function addLineItem(indexMyInventory) {

    indexInvoice++; 

    let tableRow = document.createElement("tr");

    tableRow.innerHTML = "<th scope='row'>" + indexInvoice + "</th>" + "<td>" + myInventory[indexMyInventory].item + "</td><td>" + myInventory[indexMyInventory].type + "</td><td>" + myInventory[indexMyInventory].description + "<td><td>" + myInventory[indexMyInventory].price + "</td>";

    document.getElementById("metadataTable").appendChild(tableRow);

    // The code below helps us keep track of the bill total and injects that figure into the relevent paragrph below our line items. 
    totalBill = totalBill + myInventory[indexMyInventory].price;
    document.getElementById("myTotalBill").innerHTML = totalBill;

}