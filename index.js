import http from 'http';

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    const message = 'It works!\n';
    const version = 'NodeJS ' + process.versions.node + '\n';
    const response = [message, version].join('\n');
    res.end(response);
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

