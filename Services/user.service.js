const mongo = require("../mongo");
const {ObjectId} = require("mongodb");

const service = {
    async find (req, res){
            try{
            const data = await mongo.users.find().toArray();
                console.log(data)
                  res.json(data)
            console.log(req.query)
            } catch(err){
                console.log("Error Reading Data-", err)
                res.sendStatus(500);
            }
        },

        async update (req, res) {
            try{
                const data = await mongo.users.updateOne({_id:ObjectId(req.params.id)},{$set: {...req.body}});
            console.log(data);
            res.send({...req.body})
            } catch(err){
                console.log("Error Updating data-", err);
                res.sendStatus(500);
            }
        },

        async insert (req, res) {
            try{console.log(req.body);
            
            const data = await mongo.users.insertOne(req.body);
        
            res.send({...req.body, _id:data.insertedId})
            } catch(err){
                console.log("Error Querying-", err)
                res.sendStatus(500);
            }
        },

        async delete (req, res) {
            try{
            console.log("THIS DATA IS DELETED!");
            console.log(req.params);
            const data = await mongo.users.deleteOne({_id:ObjectId(req.params.id)});
            // res.send({...req.body, id:req.params.id})
            res.end()
            } catch (err){
                console.log("Error Deleting Data-", err);
                res.sendStatus(500);
            }
        }
}

module.exports = service;