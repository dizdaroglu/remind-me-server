const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    lists: [
        { type: mongoose.Schema.ObjectId, ref: 'List' }
    ]
}, { timestamps: true });

UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password'))
        return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err)
            return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err)
                return next(err);

            user.password = hash;
            next();
        })
    })
});

UserSchema.methods.comparePassword = function (candidatePassword) {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err)
                return reject(err);
            if (!isMatch)
                return reject(false);

            resolve(true);
        });
    })
}
UserSchema.statics.addList = async function (id, args) {
    const List = mongoose.model('List');
    const User = mongoose.model('User');

    const list = await new List({ ...args, list: id });

    const user = await User.findByIdAndUpdate(id, { $push: { lists: list.id } });
    console.log(list)
    return {
        list: await list.save(),
        user
    }
}

mongoose.model('User', UserSchema);