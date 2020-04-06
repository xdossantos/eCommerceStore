/* Set values + misc */
let promoCode;
let promoPrice;
let fadeTime = 300; // This is for the animation, as required by the task


let storeInventory = [{
  name: "Black Label Beer",
  category: "Beverages",
  id: "blacklabelbeer",
  description: "An affordable and easy-to-drink beer for the working class man. Often referred to as the 'working class beer' because of its great taste at a even better price. ",
  price: 20,
  productImage: "static/images/undraw_Beer_celebration_cefj.png"
}, {
  name: "Espresso on the go",
  category: "Coffee",
  id: "espressoonthego",
  description: "Heading off to a meeting and need a quick shot of caffeine to make sure you are clear-headed? Our coffees will help. It its cold its free.",
  price: 25,
  productImage: "static/images/undraw_coffee_break_j3of.png"
}, {
  name: "Bacon Burger",
  category: "Burgers",
  id: "baconburger",
  description: "Avocado, bacon, Cheese, beef - a meet lovers delight Order our bacon burgers for date night if you are too tired to cook.",
  price: 65,
  productImage: "static/images/undraw_Hamburger_8ge6.png"
}];

let cartArray = []; // here we have an empty cart 

$(document).ready(function () {

 //Define tracking objects here and story them in memory 
 if (sessionStorage.getItem("hasCodeRunBefore") === null) {
  // If no users session has been run on this PC before, as reflected in the cookies 
  sessionStorage.setItem("cart", JSON.stringify(cartArray));
  sessionStorage.setItem("hasCodeRunBefore", true);
}else{
  let cartArray = JSON.parse(sessionStorage.getItem("cart"));
}
  updateQuantities();
});


$('.promo-code-cta').click(function () {

  promoCode = $('#promo-code').val();

  if (promoCode == 'COVID' || promoCode == 'LOVE') {
    //If promoPrice has no value, set it as 10 for the COVID promocode
    if (!promoPrice) {
      promoPrice = 10;
    } else if (promoCode) {
      promoPrice = promoPrice * 1;
    }
  } else if (promoCode != '') {
    alert("Invalid Promo Code");
    promoPrice = 0;
  }
  //There is a promoPrice that has been set as a global 
  if (promoPrice) {
    $('.summary-promo').removeClass('hide');
    $('.promo-value').text(promoPrice.toFixed(2));
    updateQuantities();
  }
});


function retrieveCart() {

  //If it is not the first time we are loading the page, then we can assume that we already have some information about track objects stored in SessionStorage. We use this information in sessionStorage to add information about the current users cart, retrieve those objects and display them on our HTML page.

  //Get track objects from sessionStorage and assign it to the array 'cartArray' 
  cartArray = JSON.parse(sessionStorage.getItem("cart"));


  document.getElementById("checkoutTable").innerHTML = "";

  let indexCartArray = 0; // The indexCartArray variable will be used as an index during the cartArray forEach method

  cartArray.forEach(function () {
    let tempDiv = document.createElement("div");


    // TODO: Make sure you customise the string below to template with the array of objects' items

    tempDiv.innerHTML = "<div id='checkoutRow" + indexCartArray + "' class='basket-product'><div class='item'>        <div class='product-image'>          <img src=' " + cartArray[indexCartArray].productImage + "' alt='" + cartArray[indexCartArray].name + "' class='product-frame'>        </div>        <div class='product-details'>          <h4><strong></strong>" + cartArray[indexCartArray].name + "</h4><p> " + cartArray[indexCartArray].description + "</p>          <p></p>        </div>      </div>      <div class='price'> " + cartArray[indexCartArray].price + "</div>      <div> " + cartArray[indexCartArray].category + " </div> <div class='remove'>        <button value='" + storeInventory[indexCartArray].id + "' onclick='removeItem(this.value)' >Remove</button></div>";

    document.getElementById("checkoutTable").appendChild(tempDiv);

    indexCartArray++;

  });
}

function updateQuantities() {
  
  retrieveCart();

  let subtotal = 0;

  /* Sum up our totals */
  indexCartArray = 0;
  cartArray.forEach(function () {
    subtotal += cartArray[indexCartArray].price;
    indexCartArray++;
  });

  /* Calculate totals */
  let total = subtotal;

  //If there is a valid promoCode, and subtotal < 10 subtract from total
  let promoPrice = parseFloat($('.promo-value').text());
  if (promoPrice) {
    if (subtotal >= 10) {
      total -= promoPrice;
    } else {
      alert('Order must be more than R10 for Promo code to apply.');
      $('.summary-promo').addClass('hide');
    }
  }

  // Check delivery mode and add fee if based on users selection

  if (document.getElementById('delivery-collection').value == "Delivery") {
    total += 50;
  }
//Here we calculate VAT 

vat = total*0.15; 

  /* Update summary display. */
  $('.final-value').fadeOut(fadeTime, function () {
    $('#basket-vat').html(vat);
    $('#basket-subtotal').html(subtotal);
    $('#basket-total').html(total);

  //Only show the Order button if the total exceeds 0 
    if (total == 0) {
      //Here is our chained effect as per the task requirement 
      $('.checkout-cta').fadeOut(fadeTime).css("color", "red"); 
    } else {
      $('.checkout-cta').fadeIn(fadeTime);
    }
    $('.final-value').fadeIn(fadeTime);
  });

  $('.total-items').text(cartArray.length);

}

/* Remove item from cart */
function removeItem(foodItem) {

  indexCartArray = 0;

  storeInventory.forEach(function () {

    if (storeInventory[indexCartArray].id == foodItem) {

      cartArray.splice(indexCartArray, 1);
      sessionStorage.setItem("cart", JSON.stringify(cartArray));
      alert(storeInventory[indexCartArray].name + " removed from cart");

    }
    indexCartArray++;
  });

  updateQuantities();

}

function addItem(foodItem) {

  //Search the storeInventory for the food product you want to add  and add that item to cart, commit changes to session storage

  indexCartArray = 0;
  storeInventory.forEach(function () {

    if (storeInventory[indexCartArray].id == foodItem) {

      cartArray.push(storeInventory[indexCartArray]);
      sessionStorage.setItem("cart", JSON.stringify(cartArray));

      alert(storeInventory[indexCartArray].name + " added to cart");

    }
    indexCartArray++;
  });
}


//Take note that the Confirm Order button will only be visible if the sum total is bigger than. 
function generateOrderCode() {
  alert("Thank you for your purchase. Your order number is " + "OrderNumber:" + Math.random());
}