const SocketIO = require('socket.io');
const axios = require('axios');

module.exports = (server, app) => {
    const io = SocketIO(server, { path: '/socket.io' });
    app.set('io', io);
    const room = io.of('/room');
    const chat = io.of('/chat');
    room.on('connection', socket => {
        console.log('room 네임스페이스에 접속');

        socket.on('disconnect', () => {
            console.log('room 네임스페이스 접속 해제');
        });
    });

    chat.on('connection', socket => {
        console.log('chat 네임스페이스에 접속');
        const { roomid } = socket.handshake.query;
        //console.log(roomid);
        socket.join(roomid);
        socket.to(roomid).emit('test', {
            message: 'test',
        });

        /*    socket.on('disconnect', () => {
            console.log('chat 네임스페이스 접속 해제');
            socket.leave(roomId);
            const currentRoom = socket.adapter.rooms[roomId];
            const userCount = currentRoom ? currentRoom.length : 0;
            if (userCount === 0) {
                axios
                    .delete(`http://localhost:4000/room/${roomId}`)
                    .then(() => {
                        console.log('방 제거 요청 성공');
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                socket.to(roomId).emit('exit', {
                    user: 'system',
                    chat: `${req.session.color}님이 퇴장하셨습니다.`,
                });
            }
        }); */
    });
};
