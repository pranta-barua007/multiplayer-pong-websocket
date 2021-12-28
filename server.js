const http = require('http');
const io = require('socket.io');

const apiServer = require('./api');
const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer);

const sockets = require('./sockets');

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Running on ${PORT},,,`);
});

sockets.listen(socketServer);



