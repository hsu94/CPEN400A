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

/*var products = {
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
};*/

var products;

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
    //var total = 5;
   // alert("At least this works");
     //alert(productName);
    if(products[product].quantity < 1){
        alert("No quantities left in stock!!")
    }
    else{
      // alert("At least this works too");
        cart[product]++;
        products[product].quantity --;
        priceTotal = priceTotal + products[product].price;
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
         priceTotal = priceTotal - products[product].price;
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

function sendRequest(){

     var xhr = new XMLHttpRequest();


     xhr.onload = function() {
     			if (xhr.status==200) {
     			   // alert(xhr.responseText);
     			    products = JSON.parse(xhr.responseText);
     			    totalRequests = 0;
     			}
     			else{
     			    if(totalRequests < 5){
     			        sendRequest();
     			        totalRequests++;
     			    }
     			    else
     			        alert("giving up after 5 requests");
     			}
     }

     xhr.ontimeout = function() {
     			//alert("timed out");
                 if(totalRequests < 5){
                     sendRequest();
                     totalRequests++;
                 }
                 else
                     alert("giving up after 5 requests");
     		}
     xhr.onerror = function() {
     			//alert("error");
                 if(totalRequests < 5){
                     sendRequest();
                     totalRequests++;
                 }
                 else
                     alert("giving up after 5 requests");
     		};
     xhr.timeout = 2000;
     xhr.open("GET", "https://cpen400a.herokuapp.com/products", true);
     xhr.send();

 }



function checkout(){
   inactiveTime = 0;
   var i = 0;
   for(var product in products){
        previousPrice[i] = products[product].price;
        i++;
   }
   $.ajax({
   			url: 'https://cpen400a.herokuapp.com/products',
   			dataType: "json",
			tryCount : 0,
   			retryLimit : 5,
   			timeout: 1000,
   			success: function(server) {
                products = server;
                totalRequests = 0;
               // alert(products["Box1"].quantity);
                confirmCheckout();
            },
            error: function(x,t,m){
                if(t="timeout"){
                    //alert("timed out");

                        checkout();

                }
                else{

                        checkout();
                 }
            }

        });


   // alert(products);


}

function confirmCheckout(){
   //alert("Box 1 quantity is " + products["Clothes1"].quantity);
   //alert("price is " + products["Clothes1"].price);
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
        showButtons();
        calculateTotal();
        j++;
    }
    alert("Your total is $" + priceTotal);

}

function calculateTotal(){
    priceTotal = 0;
    for(var product in cart)
        priceTotal = priceTotal + (cart[product] * products[product].price);

}


window.onload = function() {
    sendRequest();
    // Add click event listeners to the cart buttons
    var addButtons = document.getElementsByClassName("add");
    var removeButtons = document.getElementsByClassName("remove");
    var addModalButtons = document.getElementsByClassName("addModal");
    var removeModalButtons = document.getElementsByClassName("removeModal");
    //removeButtons[0].style.visibility = 'hidden';
    registerAddClickEventListeners(addButtons);
    registerRemoveClickEventListeners(removeButtons);
    registerAddModalClickEventListeners(addModalButtons);
    registerRemoveModalClickEventListeners(removeModalButtons);
    openModal();

  //  sendRequest();





    // Initiate the cart counting
    setInterval(countInactive, 1000);
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        $("#myModal").modal('hide');
    }
};












