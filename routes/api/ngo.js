const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//User model
const Ngo = require('../../models/Ngo');
//@desc Register new ngo
//@access Public
router.post('/', (req, res) => {
    console.log('hiiii')
    const { name, email, password, contact, address } = req.body;
    console.log(name, email, password, contact, address)

    //simple validation
    if (!name || !email || !password|| !contact||!address) {
        return res.status(400).json({ msg: 'Please enter all fields' }); //bad request

    }
    //check for existing ngo
    Ngo.findOne({ email })
        .then(ngo => {
            if (ngo) {
                return res.status(400).json({ msg: 'Ngo already exists' });
            }

            const newNgo = new Ngo({
                name,
                email,
                password, 
                contact, 
                address
            });

            //create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newNgo.password, salt, (err, hash) => {
                    if (err) throw err;
                    newNgo.password = hash;
                    newNgo.save()
                        .then(ngo => {

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


                        });
                })
            })
        })
});

module.exports = router;