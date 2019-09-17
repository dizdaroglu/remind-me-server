const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');


module.exports = (req, res, next) => {
    const { token } = req.body;
    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {

        const { userId } = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();
    })
};
