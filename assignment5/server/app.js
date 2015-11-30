// Based on the code sample provided here: https://github.com/karthikp-ubc/CPEN400A-codesamples/blob/master/lecture8/ajaxserver.js

var http = require("http");
if (! http) process.exit(1);

var fs = require("fs");
if (! fs) process.exit(2);

// MongoDB code based on official guide: https://docs.mongodb.org/getting-started/node/client/
var MongoClient = require("mongodb").MongoClient;

/**
* Adds the order into the database
*/
function postOrder(cart, response) {

  MongoClient.connect("mongodb://localhost:27017/cpen400a", function(err, db) {
    if (err) throw err;

    // Insert the json data for the order into the orders collection
    var orders = db.collection("orders");
    orders.insert(cart);
    db.close();
    response.write(JSON.stringify(cart));
    response.statusCode = 200;
    response.end();
  });

}

function getProductsFromDb(products, response) {

  var products = products;
  MongoClient.connect("mongodb://localhost:27017/cpen400a", function(err, db) {
    if (err) throw err;
    // Iterate through each product, building up the products variable

    db.collection('products').find().each(function(err, item) {
      if (item) {
        var productName = item['name'];
        products[productName] = {
          "price" : item['price'],
          "quantity" : item['quantity'],
          "url" : item['image']
        };
      }else{
        db.close();
        response.write(JSON.stringify(products));
        response.statusCode = 200;
        response.end();
      } 
    });
  });
}

/**
* Retrieves all of the products
*/
function getProducts(response) {
  var products = {};
  products = getProductsFromDb(products, response);
}


var serveRequest = function(request, response) {
  // Set CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Request-Method', '*');
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  response.setHeader('Access-Control-Allow-Headers', '*');
  if ( response.method === 'OPTIONS' ) {
    response.writeHead(200);
    response.end();
    return;
  }

  if (request.url === "/products") {
    getProducts(response);
  } else if (request.url === "/checkout" && request.method === "POST") {

    var postData = '';

    // Get the POST data
    request.on("data", function(data) {
      console.log(data);
      postData += data;
    });

    // Add the order into the db
    request.on("end", function() {
      var cart = JSON.parse(postData);
      postOrder(cart, response);
    });

  } else {
    response.end();
  }
}

var port = 8080;
var server = http.createServer(serveRequest);
server.listen(port);
console.log("Starting server on port " + port);