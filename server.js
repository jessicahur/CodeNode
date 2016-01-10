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
    var postData = '';
    var pathname = url.parse(request.url).pathname;
    console.log('Request for '+pathname+ ' received');

    request.setEncoding('utf8');

    request.addListener('data', function(postDataChunk) {
      postData += postDataChunk;
    });

    request.addListener('end', function() {
      route(handle, pathname, response, postData);
    });
  }

  http.createServer(onRequest).listen(8888);
  console.log('Server started. listening on port 8888');
}

exports.start = start;
