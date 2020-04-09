const express = require('express');
const router = express.Router();
const Chat = require('../schemas/chat');

router.post('/addchat', async (req, res) => {
    const { roomid, userid, content, userList } = req.body;

    const chat = new Chat({
        room: roomid,
        user: userid,
        content,
        checkedUserList: userList,
    });
    await chat.save();
    return res.status(200).json({ code: 200, data: '성공' });
});

router.get('/chatList/:id', async (req, res) => {
    const chatList = await Chat.find({ room: req.params.id });
    return res.status(200).json({ code: 200, data: chatList });
});
