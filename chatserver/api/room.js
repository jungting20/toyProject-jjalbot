const express = require('express');
const router = express.Router();
const Room = require('../schemas/room');
//const { checklogin } = require('../middleware/jwtmiddleware');

router.get('/Room/:id', async (req, res) => {
    console.log(req.params.id);
    const room = await Room.findById(req.params.id);
    console.log(room);
    res.status(200).json(room);
});
router.post('/Room', async (req, res) => {
    const io = req.app.get('io').of('/room');
    const user = res.user;
    console.log(user, '유저');
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

router.post('/addUser/:id', async (req, res) => {
    const room = await Room.findById(req.params.id);
    room.addUser(res.user);
    console.log('room', room);
    res.status(200).json({ code: 200, data: '성공' });
});

module.exports = router;
