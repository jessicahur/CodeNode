var url = require('url');
var http = require('http');

http.createServer(function(request, response){
  var pathname = url.parse(request.url).pathname;
  console.log('path name is: '+ pathname);
}).listen(9000);//end of http.createServer
