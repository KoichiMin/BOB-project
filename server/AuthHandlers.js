const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

// with the post method, this endpoint will receive the user who login's information and send it to the database if its a new user  
const  sendUserInfo = async (req, res) =>{
    const user = req.body;
    // console.log(user.data.email)
    try{
        await client.connect();
        const db = client.db("Companies");
        const checkIfUserExist = await db.collection("Users").find({"data.email": user.data.email}).toArray();
        // console.log(checkIfUserExist);
        if(checkIfUserExist.length > 0){
            res.status(400).json({status: 400, message: "user info is already in the database!"})
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

const  getValidation = async (req, res) =>{
    const { user } = req.params;
    //console.log(user)
    try{
        await client.connect();
        const db = client.db("Companies");
        const checkIfUserCompanyExist = await db.collection("CompaniesInfo").find({"email": user}).toArray();
        console.log(checkIfUserCompanyExist);
        if(checkIfUserCompanyExist.length > 0){
            res.status(400).json({status: 400, data: false})
        } else{
            res.status(200).json({status: 200, data: true})
        }
    }
    catch (err) {
        res.status(404).json({ status: 404, message: err.message })
        client.close()
    }
}



module.exports = {
    sendUserInfo,
    getValidation
};