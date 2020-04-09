const mongoose = require('mongoose');

const MONGO_URL = `mongodb://${process.env.MONGO_URI}`;

module.exports = () => {
    const connect = () => {
        mongoose.connect(
            MONGO_URL,
            {
                dbName: 'chat',
            },
            error => {
                if (error) {
                    console.log('몽고디비 연결에러', error);
                } else {
                    console.log('연결 성공');
                }
            }
        );
    };

    connect();

    mongoose.connection.on('error', error => {
        console.log('연결에러', error);
    });
    mongoose.connection.on('disconnected', () => {
        console.error('연결해제');
        connect();
    });

    require('./chat');
    require('./nickname');
    require('./room');
    require('./user');
};
