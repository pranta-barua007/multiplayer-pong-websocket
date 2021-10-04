const apiServer = require('./api');
const server = require('http').createServer(apiServer);
const io = require('socket.io')(server);

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});

let readyPlayerCount = 0;

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('ready', () => {
        console.log(`Player ready ${socket.id}`);

        readyPlayerCount += 1;

        if(readyPlayerCount === 2) {
            //Broadcast 'startGame'
            io.emit('startGame', socket.id);
        }
    });

    socket.on('paddleMove', (paddleData) => {
        socket.broadcast.emit('paddleMove', paddleData);
    });
});