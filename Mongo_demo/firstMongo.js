// Create a database and imports mongo module to manipulate mongo databases
var MongoClient = require('mongodb').MongoClient;
// Holds the connection url to the database 
var url = "mongodb://localhost:27017/mydb"

// Connects to db
// If db exists it connects, if it doesn't it creates a db and connects

    MongoClient.connect(url, function(err, db){
        if(err) console.error("connect " + err);
        console.log('Database created');

        // creates a var to hold the database object passed in the function
        var dbo = db.db("mydb");

        // Creates a collection called customers, using the database object
        /*
        dbo.createCollection("customers", function(err, res) {
            if(err) console.error(err);
            console.log("Collection created!");
        });

        dbo.createCollection("testt", function(err, res) {
            if(err) console.error(err);
            console.log("Collection created!");
        });
        */
        // Insert a single object into a document in the db
        var oneCustomer = {name : "John", address : "Frederiksborgvej 13"}
                
        dbo.collection("customers").insertOne(oneCustomer, function(err, res){
            if(err) console.error("insertOne " + err);
            console.log("1 document inserted");
        })


            // Insert an array of objects into a document in the db
        var manyCustomers = [
            {name : "Hanne", address : "Juni Alle 12"},
            {name : "Julian", address : "Kastanievej 109"},
            {name : "Kasper", address : "Promptevej 18"},
            // Give unique id instead og mongo generating one
            {_id: 13, name : "Børge", address : "Havarigade 12"},
            {_id: 324, name : "Susan", address : "Duemosepark 15"}
        ];

        dbo.collection("customers").insertMany(manyCustomers, function(err, res){
            if(err) console.error("insertMany " + err);
            console.log("Number of inserted documents: " + res.insertedCount);
            // res contains information about what's inserted into the db
            console.log(res);
        });

        db.close;
    })