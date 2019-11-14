// Uses TypeScript to check for syntax errors
// @ts-check

// Prints 'Hello world!'

/*
// Uses http module
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // Prints whatever you put in the url on the page
    res.write(req.url);
    res.end('Hello World!');
}).listen(8070);
*/

/*
// Use Node as a file server - Reads an HTML file 
var http = require('http');
// Uses file system module
var fs = require('fs');
http.createServer(function (req, res) {
    fs.readFile('htmlfil.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
}).listen(8070);
*/


// Use Node as a file server - Reads a specified html file dependent on URL
var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
    // Creates object of the part of the url entered in browser after '/' 
    var urlObject = url.parse(req.url, true);

    console.log("q: " + urlObject.pathname)

    // Creates var to hold the filename, and adds a . so we know it's the source root and the .html extension
    var filename = "." + urlObject.pathname + ".html";

    // Uses filesystem module to read file
    fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");

        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}).listen(8070);