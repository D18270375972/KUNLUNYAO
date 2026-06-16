const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? 'scheme1-prototype-gesture.html' : req.url;
  filePath = path.join(__dirname, filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found: ' + filePath);
    } else {
      const ext = path.extname(filePath);
      const ct = ext === '.html' ? 'text/html' : ext === '.js' ? 'text/javascript' : 'text/plain';
      res.writeHead(200, { 'Content-Type': ct + ';charset=utf-8', 'Access-Control-Allow-Origin': '*' });
      res.end(data);
    }
  });
});

server.listen(8090, () => {
  console.log('Server running on http://localhost:8090');
});
