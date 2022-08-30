const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

// get all companies 
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

//get all Interior companies
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

// get all Exterior companies
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

// get all Interior trades
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

// get all Exterior trades
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

// get all companies within a certain trade
const getTradeCompanies = async (req, res) =>{
        const {trade} = req.params;
    try{     
        await client.connect();
        const db = client.db("Companies");
        const result = await db.collection("CompaniesInfo").find({trade: trade}).toArray();
        res.status(200).json({ message: "success", data: result})
        // client.close()
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ status: 404, message: err.message })
        client.close()
    }
}


// get specific description of trade
const getTradeDescription = async (req, res) =>{
    const { trade } = req.params;
    try{     
        await client.connect();
        const db = client.db("Companies");
        const result = await db.collection("TradeDescription").find({trade: trade}).toArray();
        res.status(200).json({ message: "success", data: result})
        // client.close();
    }
    catch (err) {
        res.status(404).json({ status: 404, message: err.message })
        client.close()
    }
} 

// get a specific company with the params
const getSpecificCompany = async (req, res) =>{
    const { company } = req.params;
    try{
        await client.connect();
        const db = client.db("Companies")
        const result = await db.collection("CompaniesInfo").find({ company: company}).toArray();
        res.status(200).json({message: "success!", data: result});
        client.close();
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
    getExtTrades,
    getTradeCompanies,
    getTradeDescription,
    getSpecificCompany
};