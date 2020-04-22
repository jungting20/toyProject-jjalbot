const express = require('express');
const router = express.Router();
const Room = require('../schemas/room');
const Chat = require('../schemas/chat');
const User = require('../schemas/user');
const Nickname = require('../schemas/nickname');
const { checklogin } = require('../middleware/jwtmiddleware');

router.get('/Room/:id', async (req, res) => {
    console.log(req.params.id);
    const room = await Room.findById(req.params.id);
    console.log(room);
    res.status(200).json(room);
});
router.post('/Room', checklogin, async (req, res) => {
    const io = req.app.get('io').of('/room');
    const user = res.user;
    const body = req.body;
    const room = new Room({
        title: body.title,
        owner: user.email,
        users: [user._id],
    });
    await room.save();
    io.emit('newRoom', { room });
    res.status(200).json({ code: 200, message: '새로운방 생성' });
});

router.get('/openRoomList', async (req, res) => {
    console.log('openrRoomList');
    const roomList = await Room.find().limit(10);

    return res.status(200).json({ code: 200, message: '성공', data: roomList });
});

router.post(
    '/joinUser',
    /* checklogin */ async (req, res) => {
        const { roomid, userid, nickname } = req.body;
        const room = await Room.findById(roomid);
        const nicknameschema = new Nickname({
            room: roomid,
            user: userid,
            nickname: nickname,
        });
        await nicknameschema.save();
        await room.joinUser(userid);
        const chatList = await Chat.find()
            .where('room')
            .equals(roomid);

        const me = await User.findById(userid);

        const myroomList = await me.addRoom(roomid);

        //const users = await User.find();
        //console.log(users);
        //await room.joinUser(userid);
        /* 
    const chatio = req.app.get('io').of('/chat');
}
    chatio.to(roomid).emit('joinUser', {
        userid,
        nickname: 'system',
        roomid,
        content: `${nickname}님이 참가 하셨습니다`,
        createdtime: new Date(),
    }); */
        return res.status(200).json({
            code: 200,
            message: '성공',
            data: { chatList, myroomList, nickname },
        });
    }
);

module.exports = router;
