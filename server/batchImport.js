const { MongoClient } = require("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {

}

const companies = require("./data/company.json");

const tradeDescription = require("./data/tradeDescription.json");

// you have to do "node '/Users/a/Desktop/BOB-project/server/batchImport.js' " inside the server to insert the data

// this is to import into the database all the description for every trade
const importTradeDescription = async () =>{
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("Companies");
        await db.collection("TradeDescription").insertMany(tradeDescription);
        client.close();

}

// this is to import into the database all the companies from every trade
const importCompanies = async () =>{
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("Companies");
        await db.collection("CompaniesInfo").insertMany(companies);
        client.close();
}


// importTradeDescription();
importCompanies();


