/*
* Handles all logic for the shopping cart functionality
* 
*/


var priceTotal = 0;
var totalRequests = 0;
var previousPrice = new Array(12);

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
    'PC3' : 0,
    'Tent' : 0,

};

var products = {};

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

function registerAddModalClickEventListeners(elements) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', function() {
            var product = this.parentNode;
            resetCount();
            addToCart(product.id);
            showButtons();
        }, false);
    }
}

function registerRemoveModalClickEventListeners(elements) {

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', function() {
            var product = this.parentNode;
            resetCount();
            removeFromCart(product.id);
            showButtons();
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
function addToCart(product) {
    if(products[product].quantity < 1){
        alert("No quantities left in stock!!")
    }
    else{
        console.log(cart);
        cart[product]++;
        products[product].quantity --;
        priceTotal = priceTotal + parseInt(products[product].price);
        console.log(priceTotal);
        var element = document.getElementById("cartTotal");
        element.innerHTML = "CartTotal($"+priceTotal+")";
        showButtons();
    }
    // alert("At least this works three");

}

/*
* Removes an item from the cart
*/
function removeFromCart(product) {
     if(cart[product] == 0){
        alert("Product does not exist in cart");
     }
     else{
         cart[product]--;
         products[product].quantity ++;
         priceTotal = priceTotal - parseInt(products[product].price);
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
         var modalProd = document.getElementById("Box1");
         modalProd.style.display = "block";
         modalProd.getElementsByClassName("modalQuantity")[0].innerHTML = "Quantity: "+cart["Box1"];
         modalProd.getElementsByClassName("modalPrice")[0].innerHTML = "$"+products['Box1'].price * cart['Box1'];
        }
        else{
         var modalProd = document.getElementById("Box1");
         modalProd.style.display = "none";
         removeClick[0].style.visibility = 'hidden';
        }
        if(cart["Box2"] > 0){
         removeClick[1].style.visibility = 'visible';
         var modalProd = document.getElementById("Box2");
         modalProd.style.display = "block";
         modalProd.getElementsByClassName("modalQuantity")[0].innerHTML = "Quantity: "+cart["Box2"];
         modalProd.getElementsByClassName("modalPrice")[0].innerHTML = "$"+products['Box2'].price * cart['Box2'];
        }
        else{
         var modalProd = document.getElementById("Box2");
         modalProd.style.display = "none";
         removeClick[1].style.visibility = 'hidden';
        }
        if(cart["Clothes1"] > 0){
         removeClick[2].style.visibility = 'visible';
         var modalProd = document.getElementById("Clothes1");
         modalProd.style.display = "block";
         modalProd.getElementsByClassName("modalQuantity")[0].innerHTML = "Quantity: "+cart["Clothes1"];
         modalProd.getElementsByClassName("modalPrice")[0].innerHTML = "$"+products['Clothes1'].price * cart['Clothes1'];
        }
        else{
         var modalProd = document.getElementById("Clothes1");
         modalProd.style.display = "none";
         removeClick[2].style.visibility = 'hidden';
        }
        if(cart["Clothes2"] > 0){
         removeClick[3].style.visibility = 'visible';
         var modalProd = document.getElementById("Clothes2");
         modalProd.style.display = "block";
         modalProd.getElementsByClassName("modalQuantity")[0].innerHTML = "Quantity: "+cart["Clothes2"];
         modalProd.getElementsByClassName("modalPrice")[0].innerHTML = "$"+products['Clothes2'].price * cart['Clothes2'];
        }
        else{
         var modalProd = document.getElementById("Clothes2");
         modalProd.style.display = "none";
         removeClick[3].style.visibility = 'hidden';
        }
        if(cart["Jeans"] > 0){
         removeClick[4].style.visibility = 'visible';
         var modalProd = document.getElementById("Jeans");
         modalProd.style.display = "block";
         modalProd.getElementsByClassName("modalQuantity")[0].innerHTML = "Quantity: "+cart["Jeans"];
         modalProd.getElementsByClassName("modalPrice")[0].innerHTML = "$"+products['Jeans'].price * cart['Jeans'];
        }
        else{
         removeClick[4].style.visibility = 'hidden';
         var modalProd = document.getElementById("Jeans");
         modalProd.style.display = "none";
        }
        if(cart["Keyboard"] > 0){
         removeClick[5].style.visibility = 'visible';
         var modalProd = document.getElementById("Keyboard");
         modalProd.style.display = "block";
         modalProd.getElementsByClassName("modalQuantity")[0].innerHTML = "Quantity: "+cart["Keyboard"];
         modalProd.getElementsByClassName("modalPrice")[0].innerHTML = "$"+products['Keyboard'].price * cart['Keyboard'];
        }
        else{
         removeClick[5].style.visibility = 'hidden';
         var modalProd = document.getElementById("Keyboard");
         modalProd.style.display = "none";
        }
        if(cart["KeyboardCombo"] > 0){
         removeClick[6].style.visibility = 'visible';
         var modalProd = document.getElementById("KeyboardCombo");
         modalProd.style.display = "block";
         modalProd.getElementsByClassName("modalQuantity")[0].innerHTML = "Quantity: "+cart["KeyboardCombo"];
         modalProd.getElementsByClassName("modalPrice")[0].innerHTML = "$"+products['KeyboardCombo'].price * cart['KeyboardCombo'];
        }
        else{
         removeClick[6].style.visibility = 'hidden';
         var modalProd = document.getElementById("KeyboardCombo");
         modalProd.style.display = "none";
        }
        if(cart["Mice"] > 0){
         removeClick[7].style.visibility = 'visible';
         var modalProd = document.getElementById("Mice");
         modalProd.style.display = "block";
         modalProd.getElementsByClassName("modalQuantity")[0].innerHTML = "Quantity: "+cart["Mice"];
         modalProd.getElementsByClassName("modalPrice")[0].innerHTML = "$"+products['Mice'].price * cart['Mice'];
        }
        else{
         removeClick[7].style.visibility = 'hidden';
         var modalProd = document.getElementById("Mice");
         modalProd.style.display = "none";
        }
        if(cart["PC1"] > 0){
         removeClick[8].style.visibility = 'visible';
         var modalProd = document.getElementById("PC1");
         modalProd.style.display = "block";
         modalProd.getElementsByClassName("modalQuantity")[0].innerHTML = "Quantity: "+cart["PC1"];
         modalProd.getElementsByClassName("modalPrice")[0].innerHTML = "$"+products['PC1'].price * cart['PC1'];
        }
        else{
         removeClick[8].style.visibility = 'hidden';
         var modalProd = document.getElementById("PC1");
         modalProd.style.display = "none";
        }
        if(cart["PC2"] > 0){
         removeClick[9].style.visibility = 'visible';
         var modalProd = document.getElementById("PC2");
         modalProd.style.display = "block";
         modalProd.getElementsByClassName("modalQuantity")[0].innerHTML = "Quantity: "+cart["PC2"];
         modalProd.getElementsByClassName("modalPrice")[0].innerHTML = "$"+products['PC2'].price * cart['PC2'];
        }
        else{
         removeClick[9].style.visibility = 'hidden';
         var modalProd = document.getElementById("PC2");
         modalProd.style.display = "none";
        }
        if(cart["PC3"] > 0){
         removeClick[10].style.visibility = 'visible';
         var modalProd = document.getElementById("PC3");
         modalProd.style.display = "block";
         modalProd.getElementsByClassName("modalQuantity")[0].innerHTML = "Quantity: "+cart["PC3"];
         modalProd.getElementsByClassName("modalPrice")[0].innerHTML = "$"+products['PC3'].price * cart['PC3'];
        }
        else{
         removeClick[10].style.visibility = 'hidden';
         var modalProd = document.getElementById("PC3");
         modalProd.style.display = "none";
        }
        if(cart["Tent"] > 0){
         removeClick[11].style.visibility = 'visible';
         var modalProd = document.getElementById("Tent");
         modalProd.style.display = "block";
         modalProd.getElementsByClassName("modalQuantity")[0].innerHTML = "Quantity: "+cart["Tent"];
         modalProd.getElementsByClassName("modalPrice")[0].innerHTML = "$"+products['Tent'].price * cart['Tent'];
        }
        else{
         removeClick[11].style.visibility = 'hidden';
         var modalProd = document.getElementById("Tent");
         modalProd.style.display = "none";
        }
        if(priceTotal > 0){
           var modalTotal = document.getElementById('Total');
           modalTotal.getElementsByClassName('modalPrice')[0].innerHTML = '$'+priceTotal;
           modalTotal.style.display = 'block';
        }
        else{
           var modalTotal = document.getElementById('Total');
           modalTotal.style.display = 'none';
        }

}

function openModal(){
    $(document).ready(function(){
        $("#cartTotal").click(function(){
            $("#myModal").modal();
        });
    });
}


function checkout() {
    inactiveTime = 0;
    var order = {
        'cart' : cart,
        'total' : priceTotal
    };
    console.log(order);
    var orderData = JSON.stringify(order);

    $.ajax({
        url: 'http://localhost:8080/checkout',
        dataType: 'json',
        type: 'post',
        data: orderData,

        success: function(data) {
         for (var key in cart) {
            products[key].quantity -= cart[key];
            cart[key] = 0;
         }
            confirmCheckout();
        },

        error: function(data) {

        }
    });
}

function loadProducts() {

    $.ajax({
        url: 'http://localhost:8080/products',
        dataType: 'json',
        type: 'get',

        success: function(data) {
            console.log(data);
            productData = data;

            for (var datum in data) {
                console.log(data[datum]);
                products[datum] = {
                    "price" : data[datum].price,
                    "quantity" : data[datum].quantity,
                    "url"   : data[datum].image
                }
            }

        }
    });
}

function confirmCheckout(){
    var j = 0;
    for(var product in products){
        if (cart[product] > 0){
            if(cart[product] > products[product].quantity){
                alert("Sorry, there are only " + products[product].quantity + " " + product +"(s) left in stock");
                cart[product] = products[product].quantity;
            }
            if(products[product].price != previousPrice[j]){
                alert(product + " now costs $" + products[product].price + "each");
            }
        }

        calculateTotal();
        var element = document.getElementById("cartTotal");
        element.innerHTML = "CartTotal($"+priceTotal+")";
        showButtons();

        j++;
    }
    alert("Order placed successfully");

}



function calculateTotal(){
    priceTotal = 0;
    for(var product in cart)
        priceTotal = priceTotal + parseInt((cart[product] * products[product].price));

}


window.onload = function() {
    loadProducts();

    // Add click event listeners to the cart buttons
    var addButtons = document.getElementsByClassName("add");
    var removeButtons = document.getElementsByClassName("remove");
    var addModalButtons = document.getElementsByClassName("addModal");
    var removeModalButtons = document.getElementsByClassName("removeModal");
    registerAddClickEventListeners(addButtons);
    registerRemoveClickEventListeners(removeButtons);
    registerAddModalClickEventListeners(addModalButtons);
    registerRemoveModalClickEventListeners(removeModalButtons);
    openModal();






    // Initiate the cart counting
    setInterval(countInactive, 1000);
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        $("#myModal").modal('hide');
    }
};












