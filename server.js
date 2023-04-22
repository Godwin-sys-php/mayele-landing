const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      const filePath = path.join(__dirname, 'index.html');
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end('Internal Server Error');
        }
        else {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(data);
        }
      });
    } else {
      const filePath = path.join(__dirname, req.url);
      const fileExt = path.extname(filePath);
      let contentType = 'text/html';
      switch (fileExt) {
        case '.css':
          contentType = 'text/css';
          break;
        case '.js':
          contentType = 'text/javascript';
          break;
        case '.json':
          contentType = 'application/json';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.jpg':
          contentType = 'image/jpg';
          break;
        default:
          contentType = 'text/html';
      }
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.end('Not Found');
        }
        else {
          res.writeHead(200, {'Content-Type': contentType});
          res.end(data);
        }
      });
    }
  }
});

server.listen(4200, () => {
  console.log('Server running on port 4200');
});