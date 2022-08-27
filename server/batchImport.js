const { MongoClient } = require("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    
}

const companies = require("./data/company.json");

const importCompanies = async () =>{
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Companies");
    await db.collection("CompaniesInfo").insertMany(companies);
    client.close();
}

importCompanies();