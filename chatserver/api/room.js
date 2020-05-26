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
    const roomList = await Room.find()
        .nin('_id', res.user.rooms)
        .limit(20);
    return res.status(200).json({ code: 200, message: '성공', data: roomList });
});

router.post(
    '/joinUser',
    /* checklogin */ async (req, res) => {
        const { roomid, userid, nickname } = req.body;
        const room = await Room.findById(roomid);
        const issuccess = await room.joinUser(nickname, userid);
        if (!issuccess) {
            return res.status(401).json({
                code: 401,
                message: '중복된 닉네임!',
            });
        }
        const nicknameschema = new Nickname({
            roomid: roomid,
            userid: userid,
            nickname: nickname,
        });
        await nicknameschema.save();

        const chatList = await Chat.find()
            .where('room')
            .equals(roomid);

        const me = await User.findById(userid).populate('rooms');
        await me.addRoom(roomid);
        /* const myroomListIds = me.rooms;
        const myroomList = await Room.find()
            .where('_id')
            .in(myroomListIds); */

        const myroomList = me.rooms;
        //.populate('rooms', 'title joinedusers');

        //        const myroomListreal = await me.populate('rooms', 'title joinedusers');
        //        const myroomList = me.rooms;
        //        console.log(myroomList);
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

router.post('/joinMyRoom', async (req, res) => {
    const { roomid, userid } = req.body;
    const nickname = await Nickname.find()
        .where('roomid')
        .equals(roomid)
        .where('userid')
        .equals(userid);

    const chatList = await Chat.find()
        .where('room')
        .equals(roomid);

    const me = await User.findById(userid).populate('rooms');

    const myroomList = me.rooms;

    return res.status(200).json({
        code: 200,
        message: '성공',
        data: { chatList, myroomList, nickname },
    });
});
module.exports = router;
