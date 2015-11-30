// Removes documents from all collections, and initializes the products

var MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/cpen400a", function(err, db) {
    if (err) throw err;

    // Delete data from all collections

    var orders = db.collection("orders");
    orders.deleteMany({}, function(err, results) {
        console.log('Orders collection cleared');
    });

    var users = db.collection("users");
    users.deleteMany({}, function(err, results) {
        console.log('Users collection cleared');
    });

    var products = db.collection("products");
    products.deleteMany({}, function(err, results) {
        console.log('Products collection cleared');
    });

    // Populate the products table
    products.insert({name:"KeyboardCombo",price: "26", quantity: "1", image: "https://cpen400a.herokuapp.com/images/KeyboardCombo.png"});
    products.insert({name:"Mice",price: "5", quantity: "8", image: "https://cpen400a.herokuapp.com/images/Mice.png"});
    products.insert({name:"PC1",price: "313", quantity: "10", image: "https://cpen400a.herokuapp.com/images/PC1.png"});
    products.insert({name:"PC2",price: "375", quantity: "9", image: "https://cpen400a.herokuapp.com/images/PC2.png"});
    products.insert({name:"PC3",price: "380", quantity: "10", image: "https://cpen400a.herokuapp.com/images/PC3.png"});
    products.insert({name:"Tent",price: "37", quantity: "0", image: "https://cpen400a.herokuapp.com/images/Tent.png"});
    products.insert({name:"Box1",price: "6", quantity: "2", image: "https://cpen400a.herokuapp.com/images/Box1.png"});
    products.insert({name:"Box2",price: "5", quantity: "7", image: "https://cpen400a.herokuapp.com/images/Box2.png"});
    products.insert({name:"Clothes1",price: "26", quantity: "4", image: "https://cpen400a.herokuapp.com/images/Clothes1.png"});
    products.insert({name:"Clothes2",price: "23", quantity: "8", image: "https://cpen400a.herokuapp.com/images/Clothes2.png"});
    products.insert({name:"Jeans",price: "39", quantity: "8", image: "https://cpen400a.herokuapp.com/images/Jeans.png"});
    products.insert({name:"Keyboard",price: "22", quantity: "6", image: "https://cpen400a.herokuapp.com/images/Keyboard.png"});

    console.log('Products initialized');
    
    db.close();

});