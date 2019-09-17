const express = require('express');
const mongoose = require('mongoose');
const List = mongoose.model('List');
const User = mongoose.model('User');

const requireAuth = require('../middleware/requireAuth');
const tokenforlist = require('../middleware/tokenforlist');

const router = express.Router();


router.post('/list_add', tokenforlist, async (req, res) => {
    const { title, description, eventDate } = req.body;

    const user = req.user;
    const userId = user._id;
    console.log("eventDate:", eventDate);
    try {
        const list = new List({
            title,
            description,
            eventDate,
            _creater: userId
        });

        await list.save();

        user.lists.push(list);
        const data = await user.save();
        res.json({ data })

    } catch (error) {
        return res.status(422).send(error.message)
    }
});

router.post('/findList', tokenforlist, async (req, res) => {

    const lists = req.user.lists;

    try {
        const result = await List.find().where('_id').in(lists).exec();

        res.json({ result })
        console.log(myList)
    } catch (error) {
        return res.status(422).send(error.message)
    }

});

router.delete('/:listId/delete', async (req, res) => {
    const { listId } = req.params;
    try {
        const find = await List.findByIdAndDelete(listId);
        await find.save();
        console.log('ok!')
    } catch (error) {

    }

})
module.exports = router