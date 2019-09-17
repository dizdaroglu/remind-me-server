const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
        minLength: [5, 'En az 5 karakter olması gerekir']
    },
    description: {
        type: String,
        require: true,
        minLength: [5, 'En az 5 karakter olması gerekir']
    },
    eventDate: {
        type: Date
    },
    _creator: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, { timestamps: true });


mongoose.model('List', ListSchema); 