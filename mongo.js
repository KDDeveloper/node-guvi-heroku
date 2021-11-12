const {MongoClient} = require("mongodb");


const mongo_url = process.env.MONGO_URL;
//       "mongodb://localhost:27017";
const mongo_name = process.env.MONGO_NAME;
//       "guvi_post"
const client = new MongoClient(mongo_url);

const mongo = {
    db:null,
    posts: null,
    users: null,
    async connect (){
        //connecting  to database
        await client.connect();
            console.log("connected to mongobd:", mongo_url);
       //Selecting a database
        this.db = client.db(mongo_name);

       console.log("Selected Database:", mongo_name)

       this.posts = this.db.collection("posts");
       this.users = this.db.collection("users");
    }
} 

module.exports = mongo
