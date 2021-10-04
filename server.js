const http = require('http');
const io = require('socket.io');
const apiServer = require('./api');

const server = http.createServer(apiServer);
const socketServer = io(server);

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});

socketServer.on('connection', (socket) => {
    console.log('a user connected')
});