/*
* Handles all logic for the shopping cart functionality
* 
*/

cart = [];
products = [];
products["Box1"] = 1;
products["Box2"] = 1;
products["Clothes1"] = 1;
products["Clothes2"] = 1;
products["Jeans"] = 1;
products["Keyboard"] = 1;
products["KeyboardCombo"] = 1;
products["Mice"] = 1;
products["PC1"] = 1;
products["PC2_"] = 1;
products["PC3"] = 1;
products["Tent"] = 1;
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


    if (cart[productName] === undefined) {
        cart[productName] = 1;
    } else {
        cart[productName]++;
    }

    products[productName]--;
}

/*
* Removes an item from the cart
*/
function removeFromCart(productName) {

    if (cart[productName] === undefined) {
        alert('Product does not exist in the cart');
    } else if (cart[productName] > 1) {
        cart[productName]--;
    } else {
        delete cart[productName];
    }

    products[productName]++;

}

function showCart() {
    var i = 0;
    for (var product in cart) {
        alert(product);
        var test = setTimeout(function(item) {
            alert("Name: " + item + ": Quantity: " + cart[item]);
        }, i * 30000, product);

        i++;
    }

    if (i < 1) {
        alert("Your cart is empty!");
    }
}

function countInactive() {

    // This condition will prevent the user from being spammed with alerts
    if (inactiveTime < 30) {
        inactiveTime++;
        if (inactiveTime >= 30) {
            alert("Hey there! Are you still planning to buy something?");
            inactiveTime = 0;
        } 
    }
}

function resetCount() {
    inactiveTime = 0;
}

window.onload = function() {

    // Add click event listeners to the cart buttons
    var addButtons = document.getElementsByClassName("add");
    var removeButtons = document.getElementsByClassName("remove");
    registerAddClickEventListeners(addButtons);
    registerRemoveClickEventListeners(removeButtons);

    // Initiate the cart counting
    setInterval(countInactive, 1000);
}










