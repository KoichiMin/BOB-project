const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const  sendUserInfo = async (req, res) =>{
    try{
        const user = req.body;
        console.log(req.body)
        await client.connect();
        const db = client.db("Companies");
        const result = await db.collection("Users").insertOne(user);
        client.close();
        res.status(200).json({status: 200, data: result, message: "user info in the database!"})
    }
    catch (err) {
        res.status(404).json({ status: 404, message: err.message })
        client.close()
    }
}



module.exports = {
    sendUserInfo
};