const express = require('express');
const router = express.Router();
const Chat = require('../schemas/chat');
const Room = require('../schemas/room');

router.post('/addchat', async (req, res) => {
    console.log('addchat');
    const { roomid, userid, content, nickname } = req.body;
    const joinedRoom = await Room.findById(roomid);
    const io = req.app.get('io').of('/chat');

    console.log('userList', joinedRoom.users);
    const chat = new Chat({
        room: roomid,
        nickname,
        user: userid,
        content,
        checkedUserList: joinedRoom.users,
    });
    await chat.save();

    io.to(roomid).emit('newChat', chat);

    return res.status(200).json({ code: 200, data: '성공' });
});

router.get('/chatList/:id', async (req, res) => {
    const chatList = await Chat.find({ room: req.params.id });
    return res.status(200).json({ code: 200, data: chatList });
});

module.exports = router;
