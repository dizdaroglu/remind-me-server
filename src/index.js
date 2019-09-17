require('./models/User');
require('./models/List');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//routes
const userRoutes = require('./routes/userRoutes');
const listRoutes = require('./routes/listRoutes');

const requireAuth = require('./middleware/requireAuth');

const app = express();


app.use(bodyParser.json());
app.use(userRoutes);
app.use(listRoutes);

const mongoUri = "mongodb+srv://admin:passwordpassword@cluster0-gsuzg.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('mongoose baglandı');
});
mongoose.connection.on('error', (err) => {
    console.error('Error', err)
})

app.get('/', requireAuth, (req, res) => {
    res.send(req.user)
})

app.listen(3000, () => {
    console.log('baglandı');
})