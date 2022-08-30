const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

// with the post method, this endpoint will receive the user who login's information and send it to the database if its a new user  
const  sendUserInfo = async (req, res) =>{
    try{
        const user = req.body;
        await client.connect();
        const db = client.db("Companies");
        // console.log(user)
        const checkIfUserExist = await db.collection("Users").findOne({email: user.data.email})
        console.log(checkIfUserExist);
        if(checkIfUserExist){
            res.status(200).json({status: 200, message: "user info is alredy in the database!"})
        } else{
            const result = await db.collection("Users").insertOne(user);
            res.status(200).json({status: 200, data: result, message: "user info is now in the database!"})
        }
        client.close();
    }
    catch (err) {
        res.status(404).json({ status: 404, message: err.message })
        client.close()
    }
}



module.exports = {
    sendUserInfo
};