let http = require('http');
let fs = require('fs');
let path = require('path');

http.createServer(function (request, response) {
    console.log('request ', request.url);
    let filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './priroda_kartinki_foto_03.jpg';
    }

    let externalname = String(path.externalname(filePath)).toLowerCase();
    let mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
    };

    let contentType = mimeTypes[externalname] || 'application/octet-stream';

    fs.readFile(filePath, function (error, content) {
        if (error) {

            response.writeHead(500);
            response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');

        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(3000)
console.log("ok");
