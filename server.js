const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const HTML_FILE = path.join(__dirname, 'public', 'index.html');

const server = http.createServer((req, res) => {
  // Serve the HTML file for all routes
  fs.readFile(HTML_FILE, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading board');
      return;
    }
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🌳 Gumtree MVP Board running at http://localhost:${PORT}`);
  console.log(`Share with your team at: http://<your-ip>:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('Server shutting down gracefully');
  process.exit(0);
});
