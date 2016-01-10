/*
var exec = require('child_process').exec;
function start(response){
  console.log('Request handler "start" was called.');
  exec('ls -lah', function(error, stdout, stderr){
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.write(stdout);
    response.end();
  });
}
function upload(response){
  console.log('Request handler upload was called.');
  response.writeHead(200,{'Content-Type':'text/plain'});
  response.write('Hello Upload');
  response.end();
}
exports.start = start;
exports.upload = upload;
*/
var querystring = require('querystring'),
    fs = require('fs');

function start(response, postData) {
  console.log('Request handler "start" was called');

  var body = '<html>' +
    '<head>' + '<meta http-equiv="Content-Type" content="text/html;'+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(body);
  response.end();
}

function upload(response, postData) {
  console.log('Request handler "upload" was called');
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('You\'ve sent:' + querystring.parse(postData).text);
  response.end();
}

function show(response) {
  console.log('Request handler \'show\' was called.');
  response.writeHead(200, {'Content-Type': 'image/png'});
  fs.createReadStream('/Users/jessicahur/CodeFellows/Code401/week2/bitmap2.bmp').pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
