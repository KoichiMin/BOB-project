const { MongoClient } = require("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    
}

// const companies = require("./data/company.json");

const tradeDescription = require("./data/tradeDescription.json");

const importTradeDescription = async () =>{
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("Companies");
        await db.collection("TradeDescription").insertMany(tradeDescription);
        client.close();

    
}

// const importCompanies = async () =>{
//     const client = new MongoClient(MONGO_URI, options);
//     await client.connect();
//     const db = client.db("Companies");
//     await db.collection("CompaniesInfo").insertMany(companies);
//     client.close();
// }


importTradeDescription();
// importCompanies();


