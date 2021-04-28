const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');


//Ngo model
const Ngo = require('../../models/Ngo');

//@route POST api/ngo
//@desc Authenticate ngo
//@access Public
router.post('/', (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    //simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' }); //bad request

    }
    //check for existing user
    Ngo.findOne({ email })
        .then(ngo => {
            if (!ngo) {
                return res.status(400).json({ msg: 'Ngo does not exist' });
            }

            //validate password
            bcrypt.compare(password, ngo.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

                    jwt.sign(
                        { id: ngo.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: ngo.id,
                                    name: ngo.name,
                                    email: ngo.email
                                }
                            });
                        }
                    )

                })
        })
});


//@route GET api/ngo
//@desc  Get ngo data
//@access Public
router.get('/', (req, res) => {
    // Ngo.findById(req.user.id)
    //     .select('-password')
    //     .then(user => {
    //         res.json(user)
    //     }); 
    Ngo.find()
        .select('-password')
        .then(ngos => res.json(ngos))
});


module.exports = router;