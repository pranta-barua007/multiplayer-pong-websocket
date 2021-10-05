let readyPlayerCount = 0;

function listen(io) {
    const pongNamespace = io.of('/pong');
    
    pongNamespace.on('connection', (socket) => {
        console.log('a user connected', socket.id);
        let room;
        
        socket.on('ready', () => {
            room = 'room' + Math.floor(readyPlayerCount / 2);
            socket.join(room);
            console.log(`Player ready ${socket.id} in ${room}`);
    
            readyPlayerCount += 1;
    
            if(readyPlayerCount % 2 === 0) {
                //Broadcast 'startGame'
                pongNamespace.in(room).emit('startGame', socket.id);
            }
        });
    
        socket.on('paddleMove', (paddleData) => {
            socket.to(room).emit('paddleMove', paddleData);
        });
    
        socket.on('ballMove', (ballData) => {
            socket.to(room).emit('ballMove', ballData);
        });
    
        socket.on('disconnect', (reason) => {
            socket.leave(room);
            console.log(`Client ${socket.id} disconnected with: ${reason} in ${room}`);
        });
    });
};

module.exports = {
    listen
};