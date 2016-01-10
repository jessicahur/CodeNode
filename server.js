/*
var http = require('http'); //requires the http module that shipped with node.js and makes it accessible through the variable http
var url = require('url');
function start (route, handle){
  function onRequest(request, response){
    var pathname = url.parse(request.url).pathname;
    console.log('Request for '+pathname+' received.');
    route(handle, pathname, response);
  }//calls one of the functions the http module offers: createServer, which returns an obj with a method named listen that takes a numeric valie which indicate the port number your http server is going to listen on
  http.createServer(onRequest).listen(8888);
  console.log('server has started.');//What would be shown in terminal when we first run node server.js
}
exports.start = start;

*/

var http = require('http');
var url = require('url');

function start(route, handle) {

  function onRequest (request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('request for '+pathname+ ' received');


    response.writeHead(200, {'Content-Type': 'text/plain'});
    var content = route(handle, pathname);
    response.write(content);
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log('Server started. listening on port 8888');
}

exports.start = start;
