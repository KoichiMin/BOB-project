const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const getAllCompanies = async (req, res) =>{
    try{
        await client.connect();
        const db = client.db("Companies");
        const result = await db.collection("CompaniesInfo").find().toArray();

        res.status(200).json({ status:200, data: result})
        client.close();
    }
    catch (err) {
        res.status(404).json({ status: 404, message: err.message })
        client.close()
    }
}

const getAllInterior = async (req, res) =>{
    try{
        await client.connect();
        const db = client.db("Companies");
        const result = await db.collection("CompaniesInfo").find({category: "Interior"}).toArray();
        client.close();
        res.status(200).json({ message: "success", data: result})
    }
    catch (err) {
        res.status(404).json({ status: 404, message: err.message })
        client.close()
    }
}

const getAllExterior = async (req, res) =>{
    try{
        await client.connect();
        const db = client.db("Companies");
        const result = await db.collection("CompaniesInfo").find({category: "Exterior"}).toArray();
        client.close();
        res.status(200).json({ message: "success", data: result})
    }
    catch (err) {
        res.status(404).json({ status: 404, message: err.message })
        client.close()
    }
}

const getIntTrades = async (req, res) =>{
    try{
        await client.connect();
        const db = client.db("Companies");
        const result = await db.collection("CompaniesInfo").find({category: "Interior"}).toArray();
        let trades = [];

        for(let i in result){
            if(trades.indexOf(result[i].trade) < 0){
                trades.push(result[i].trade)
            }
        }
        client.close();
        res.status(200).json({ message: "success", data: trades})
    }
    catch (err) {
        res.status(404).json({ status: 404, message: err.message })
        client.close()
    }
}


const getExtTrades = async (req, res) =>{
    try{
        await client.connect();
        const db = client.db("Companies");
        const result = await db.collection("CompaniesInfo").find({category: "Exterior"}).toArray();
        client.close();

        let trades = [];

        for(let i in result){
            if(trades.indexOf(result[i].trade) < 0){
                trades.push(result[i].trade)
            }
        }

        res.status(200).json({ message: "success", data: trades})
    }
    catch (err) {
        res.status(404).json({ status: 404, message: err.message })
        client.close()
    }
}

module.exports = {
    getAllCompanies,
    getAllExterior,
    getAllInterior,
    getIntTrades,
    getExtTrades
};