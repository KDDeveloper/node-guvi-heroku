const mongo = require("../mongo");
const {ObjectId} = require("mongodb");
const bcyrpt = require("bcrypt");
const jwt  = require("jsonwebtoken")

const service = {
    async register (req, res){
            try{
                //check email exists
                const user = await mongo.users.findOne({ email: req.body.email });

                if(user){
                    return res.status(400).send({error:"User already exists"})
                }
                const salt = await bcyrpt.genSalt()
                req.body.password = await bcyrpt.hash(req.body.password, salt);
                // console.log(newPass)
            //insert
            await mongo.users.insertOne(req.body);
            res.send({Message: 'User Registered Successfully'})
            } catch(err){
                console.log("Error Registering User-", err)
                res.sendStatus(500);
            }
        },

        async login (req, res){
            try{
                const user = await mongo.users.findOne({ email: req.body.email });

                if(!user){
                    return res.status(400).send({error:"User does not exists. Please sign up!"})
                }

                //check password
                const isValid = await bcyrpt.compare(req.body.password,user.password);
                console.log(isValid);
                if(!isValid){
                    return res.status(403).send({Error:"The email or password is incorrect"})
                }

                const authToken= jwt.sign({userId:user._id, email: user.email},"gUV!",{expiresIn:"10d"})
                // console.log(token);
                res.send({authToken})
            } catch(err){
                console.log("Error Login User-", err);
                res.sendStatus(500);
            }
        },
    }

    module.exports = service;