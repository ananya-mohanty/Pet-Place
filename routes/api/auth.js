const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');


//User model
const User = require('../../models/User');

//@route POST api/auth
//@desc Authenticate user
//@access Public
router.post('/', (req, res) => {
    console.log("aa gyaaaaa")
    // console.log(req.body.email)
    const { email, password } = req.body;
    // console.log(email)
    //simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' }); //bad request

    }
    //check for existing user
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ msg: 'User does not exist' });
            }

            //validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            console.log("validated")
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )

                })
        })
});


//@route GET api/auth/user
//@desc  Get user data
//@access Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => {
            global.gfs.files.find().toArray(function (err, files) {
                if (err) console.log(err);
                else {
                    items.sort(custom_sort)
                    res.json({ 'user': user, 'files': files })
                }
        })
})});

module.exports = router;