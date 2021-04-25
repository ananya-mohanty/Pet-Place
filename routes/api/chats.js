const express = require('express');
const router = express.Router();

//message model
const {Message} = require('../../models/Message');
//user model
const User = require('../../models/User');

//@route  GET api/messages/:id/:id_user2
//@desc   Get all messages between this user and user2
//@access Private
router.get('/:id/:id2', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            // res.json(user)
            var msgs=[]
            if(user.messages.has(req.params.id2))
            {
                msgs = user.messages.get(req.params.id2);
            }
            
                    res.json(msgs)
        });
});

router.get('/:id', (req, res)=>{
    User.findById(req.params.id)
        .then(user => {
            var msgs = user.messages
            res.json(msgs)
        });
})
//@route  POST api/messages/:id/:id2
//@desc   add a message in chats of this user and user2
//@access Private
router.post('/:id/:id2', (req, res) => {
    const t=req.body.text
    const s = t.substring(0, Math.min(t.length, 10))

    User.findById(req.params.id)
        .then(user => {
            const { text, position } = req.body
            const newMessage = new Message({
                title: 'you',
                text: text,
                position: 'right',
                subtitle: s
            });
            newMessage.save()
            temp = []

            if (user.messages.has(req.params.id2)) {
                temp = user.messages.get(req.params.id2)
            }
            temp.push(newMessage)
            user.messages.set(req.params.id2, temp)
            console.log(user.messages)
            user.markModified('messages')
            user.save()
                .then(User.findById(req.params.id2)
                    .then(user2 => {
                        const { text, position } = req.body
                        const newMessage = new Message({
                            title: user.name,
                            text: text,
                            position: 'left',
                            subtitle: s
                        });
                        newMessage.save()
                        temp = []

                        if (user2.messages.has(req.params.id)) {
                            temp = user2.messages.get(req.params.id)
                        }
                        temp.push(newMessage)
                        user2.messages.set(req.params.id, temp)
                        console.log(user2.messages)
                        user2.markModified('messages')
                        user2.save()
                            .then(console.log(user2))
                            .catch(err => console.log(err))}))
                .catch(err => console.log(err))

        })

});

//@route  DELETE api/items/:id1/:id2
//@desc   Delete an item
//@access Private
// router.delete('/:id1/:id2', auth, (req, res) => {
//     User.findById(req.params.id1)
//         .then(user => {
//             Item.findOne({_id: req.params.id2})
//                 .then(item => {
//                     var index = user.cartItems.indexOf(item);
//                     console.log("haaaaa"+index);
//                     user.cartItems.splice(index, 1);
//                     user.save();
//                     res.json(user);
//                 })
//         })
// });

// function auth(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     } else {
//         return res.status(401).json('Please login to make changes to cart')
//     }
// }

module.exports = router;