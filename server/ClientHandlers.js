const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const postClient = async (req, res) =>{
    const userInput = req.body;
    console.log(userInput);
try{
    await client.connect();
    const db = client.db("Companies");
    await db.collection("ClientInfo").insertOne(userInput);
    res.status(200).json({status: "success", message : "it was added to the database!" });
    client.close();
}
catch (err) {
    res.status(404).json({ status: 404, message: err.message })
    client.close()
}
}

const postReservation = async (req, res) => {
    const userInput = req.body;
    console.log(userInput);
    try{
        await client.connect();
        const db =client.db("Companies");
        await db.collection("ClientReservation").insertOne(userInput);
        res.status(200).json({status: "success" , message: "reservation was added to the database"});
        client.close();
    }
    catch(err){
        res.status(404).json({status: 404, message: err.message})
        client.close();
    }
}

const getReservationsForClient = async (req, res) =>{
    const { clients } = req.params;
    console.log(clients)
    try{
        await client.connect();
        const db = client.db("Companies")
        const getReservation = await db.collection("ClientReservation").find({email: clients}).toArray();
        console.log(getReservation);
        res.status(400).json({status: 200, data: true,  user:getReservation})
        client.close();
    }
    catch (err){
        res.status(404).json({status: 404, message: err.message})
        client.close();
    }
}

const deleteSpecificCompany = async (req, res) =>{
    const { company } = req.params;
    try{
        await client.connect();
        const db = client.db("Companies");
        const result = await db.collection("ClientReservation").deleteOne({price: company})
        console.log(result);
        res.status(204).json({ status: 204, message: "it was deleted"})
        client.close();
    }
    catch(err){
        res.status(404).json({status: 404, message: err.message})
        client.close;
    }
}


module.exports = {
    postClient,
    postReservation,
    getReservationsForClient,
    deleteSpecificCompany
};