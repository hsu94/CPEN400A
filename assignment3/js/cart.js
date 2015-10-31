/*
* Handles all logic for the shopping cart functionality
* 
*/
var priceTotal = 0;

var cart = {
    'Box1' : 0,
    'Box2' : 0,
    'Clothes1' : 0,
    'Clothes2' : 0,
    'Jeans' : 0,
    'Keyboard' : 0,
    'KeyboardCombo' : 0,
    'Mice' : 0,
    'PC1' : 0,
    'PC2' : 0,
    'PC31' : 0,
    'Tent' : 0,

};

var products = {
    'Box1':{
        'price' : 10,
        'quantity' : 10
    },
    'Box2':{
        'price': 5,
        'quantity' : 10
    },
    'Clothes1':{
        'price': 20,
        'quantity' : 10
    },
    'Clothes2':{
        'price': 30,
        'quantity' : 10
    },
    'Jeans':{
        'price': 50,
        'quantity' : 10
    },
    'Keyboard':{
        'price': 20,
        'quantity' : 10
    },
    'KeyboardCombo':{
        'price': 40,
        'quantity' : 10
    },
    'Mice':{
        'price': 20,
        'quantity' : 10
    },
    'PC1':{
        'price': 350,
        'quantity' : 10
    },
    'PC2':{
        'price': 400,
        'quantity' : 10
    },
    'PC3':{
        'price': 300,
        'quantity' : 10
    },
    'Tent':{
        'price': 100,
        'quantity' : 10
    },
};
inactiveTime = 0; // The amount of seconds that the user has been inactive


function registerAddClickEventListeners(elements) {

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', function() {
            var product = closestByClass(this, "name").innerText;
            resetCount();
            addToCart(product);
        }, false);
    }
}

function registerRemoveClickEventListeners(elements) {

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', function() {
            var product = closestByClass(this, "name").innerText;
            resetCount();
            removeFromCart(product);
        }, false);
    }
}

/**
* Traverses the siblings on the DOM tree to find the element with the given class
*/
function closestByClass(el, name) {

    while (el.className != name) {
        el = el.nextSibling;
        if (!el) {
            alert('An error has been encountered');
        }
    }

    return el;
}

/*
* Adds an item to the cart
*/
function addToCart(productName) {
    //var total = 5;
    if(cart[productName] == 10){
        alert("No quantities left in stock!!")
    }
    else{
        cart[productName]++;
        products[productName].quantity --;
        priceTotal = priceTotal + products[productName].price;
        var element = document.getElementById("cartTotal");
        element.innerHTML = "CartTotal($"+priceTotal+")";
        showButtons();
    }

}

/*
* Removes an item from the cart
*/
function removeFromCart(productName) {
     if(cart[productName] == 0){
        alert("Product does not exist in cart");
     }
     else{
         cart[productName]--;
         products[productName].quantity ++;
         priceTotal = priceTotal - products[productName].price;
         var element = document.getElementById("cartTotal");
         element.innerHTML = "CartTotal($"+priceTotal+")";
         showButtons();
      }

}

function showCart() {
    var i = 0;
    for (var product in cart) {
      if(cart[product] > 0){
            alert(product);
            var test = setTimeout(function(item) {
                alert("Name: " + item + ": Quantity: " + cart[item]);
            }, i * 30000, product);

            i++;
      }
    }

    if (i < 1) {
        alert("Your cart is empty!");
    }
}

function countInactive() {

    // This condition will prevent the user from being spammed with alerts
    if (inactiveTime < 300) {
        inactiveTime++;
         var countdownTime = 300-inactiveTime;
         var timerCount = document.getElementById("timeCount");
         timerCount.innerHTML = "time elapsed: "+countdownTime;
        if (inactiveTime >= 300) {
            alert("Hey there! Are you still planning to buy something?");
            inactiveTime = 0;
        } 
    }
}

function resetCount() {
    inactiveTime = 0;
}

function showButtons(){
         var removeClick = document.getElementsByClassName("remove");
        if(cart["Box1"] > 0){
         removeClick[0].style.visibility = 'visible';
        }
        else{
         removeClick[0].style.visibility = 'hidden';
        }
        if(cart["Box2"] > 0){
         removeClick[1].style.visibility = 'visible';
        }
        else{
         removeClick[1].style.visibility = 'hidden';
        }
        if(cart["Clothes1"] > 0){
         removeClick[2].style.visibility = 'visible';
        }
        else{
         removeClick[2].style.visibility = 'hidden';
        }
        if(cart["Clothes2"] > 0){
         removeClick[3].style.visibility = 'visible';
        }
        else{
         removeClick[3].style.visibility = 'hidden';
        }
        if(cart["Jeans"] > 0){
         removeClick[4].style.visibility = 'visible';
        }
        else{
         removeClick[4].style.visibility = 'hidden';
        }
        if(cart["Keyboard"] > 0){
         removeClick[5].style.visibility = 'visible';
        }
        else{
         removeClick[5].style.visibility = 'hidden';
        }
        if(cart["KeyboardCombo"] > 0){
         removeClick[6].style.visibility = 'visible';
        }
        else{
         removeClick[6].style.visibility = 'hidden';
        }
        if(cart["Mice"] > 0){
         removeClick[7].style.visibility = 'visible';
        }
        else{
         removeClick[7].style.visibility = 'hidden';
        }
        if(cart["PC1"] > 0){
         removeClick[8].style.visibility = 'visible';
        }
        else{
         removeClick[8].style.visibility = 'hidden';
        }
        if(cart["PC2"] > 0){
         removeClick[9].style.visibility = 'visible';
        }
        else{
         removeClick[9].style.visibility = 'hidden';
        }
        if(cart["PC3"] > 0){
         removeClick[10].style.visibility = 'visible';
        }
        else{
         removeClick[10].style.visibility = 'hidden';
        }
        if(cart["Tent"] > 0){
         removeClick[11].style.visibility = 'visible';
        }
        else{
         removeClick[11].style.visibility = 'hidden';
        }

}
window.onload = function() {

    // Add click event listeners to the cart buttons
    var addButtons = document.getElementsByClassName("add");
    var removeButtons = document.getElementsByClassName("remove");
    //removeButtons[0].style.visibility = 'hidden';
    registerAddClickEventListeners(addButtons);
    registerRemoveClickEventListeners(removeButtons);





    // Initiate the cart counting
    setInterval(countInactive, 1000);
}










