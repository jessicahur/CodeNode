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
    fs = require('fs'),
    formidable = require('formidable');

function start(response) {
  console.log('Request handler "start" was called');

  var body = '<html>' +
    '<head>'+
'<meta http-equiv="Content-Type" '+ 'content="text/html; charset=UTF-8" />'+
'</head>'+
'<body>'+
'<form action="/upload" enctype="multipart/form-data" '+
'method="post">'+
'<input type="file" name="upload" multiple="multiple">'+
'<input type="submit" value="Upload file" />'+
'</form>'+
'</body>'+
'</html>';
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(body);
  response.end();
}

function upload(response, request) {
  console.log('Request handler "upload" was called');

  var form = new formidable.IncomingForm();
  console.log('about to parse');
  form.parse(request, function(error, fields, files) {
    console.log('parsing done');

    /*Posible error on Windows systems:
    tried to rename to an already existing file*/
    fs.rename(files.upload.path, '/Users/jessicahur/CodeFellows/CodeNode/test.png', function(error) {
      if(error) {
        fs.unlink('/Users/jessicahur/CodeFellows/CodeNode/test.png');
        fs.rename(files.upload.path, '/Users/jessicahur/CodeFellows/CodeNode/test.png');
      }
    });
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('received image: <br/>');
    response.write('<img src="/show" />');
    response.end();
  });
}

function show(response) {
  console.log('Request handler \'show\' was called.');
  response.writeHead(200, {'Content-Type': 'image/bmp'});
  fs.createReadStream('/Users/jessicahur/CodeFellows/CodeNode/test.png').pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
