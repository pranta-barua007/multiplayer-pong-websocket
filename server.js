const http = require('http');
const io = require('socket.io');

const apiServer = require('./api');
const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer);

const sockets = require('./sockets');

const PORT = 3000 || process.env.PORT;
httpServer.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});

sockets.listen(socketServer);



