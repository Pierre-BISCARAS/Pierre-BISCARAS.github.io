const userModel = require('./user.models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();



const userController = {
    addUser : (req, res) => {
        const passwordHash = bcrypt.hashSync(req.body.password, 10);
        const user = new userModel(
            {
                email : req.body.email,
                password : passwordHash,
                admin : req.body.admin
            }
        );
        user.save()
            .then(
                (user) => {
                    res.status(201).json(user);
                }
            )
            .catch(
                (error) => {
                    res.status(400).json(error);
                }
            );
    },
    login : (req, res) => {
        userModel.findOne({email: req.body.email})
            .then(
                (user) => {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        jwt.sign(
                            {userId:user._id, admin:user.admin},
                            process.env.SECRET_TOKEN,
                            {expiresIn:'24h'},(err, token) => { 
                                if (err) {
                                    res.status(500).json(err);
                                } else {
                                    res.status(200).json({token, user});

                                }
                            }
                          );
                    } else {
                        res.status(403).json({message: 'Unauthorized'});
                    }
                }
            )
            .catch(
                (error) => {
                    res.status(404).json(error);
                }
            );
            
    }
    
}

module.exports = userController;