const http = require('http');
const fs = require('fs');
const path = require('path');

let reports = [];

const server = http.createServer((req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': 86400
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/reports') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const report = JSON.parse(body);
        report.id = Date.now();
        reports.push(report);
        res.writeHead(201, {...headers, 'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Report received', id: report.id}));
      } catch {
        res.writeHead(400, headers);
        res.end('Invalid JSON');
      }
    });
  } else if (req.method === 'GET' && req.url === '/api/reports') {
    res.writeHead(200, {...headers, 'Content-Type': 'application/json'});
    res.end(JSON.stringify(reports));
  } else {
    let filePath = path.join(__dirname, 'www', req.url === '/' ? 'index.html' : req.url);
    let extname = path.extname(filePath).toLowerCase();

    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.gif': 'image/gif',
      '.ico': 'image/x-icon'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404, headers);
          res.end('404 Not Found');
        } else {
          res.writeHead(500, headers);
          res.end('Server error');
        }
      } else {
        res.writeHead(200, {...headers, 'Content-Type': contentType});
        res.end(content, 'utf-8');
      }
    });
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
