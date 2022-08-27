const express = require('express')
const app = express()
const port = 5000


const {
    getAllCompanies,
    getAllExterior,
    getAllInterior,
    getIntTrades,
    getExtTrades,
    getTradeCompanies
} = require("./CompanyHandlers")

const{
    sendUserInfo
} = require("./AuthHandlers")

app.get('/hi', (req, res) => {
    res.send('Hello World!')
})

  //*********************************************************
  // Endpoints for COMPANIES
  //*********************************************************

//get all the companies
app.get("/get-companies", getAllCompanies);

//get all Interior companies
app.get("/get-Interior", getAllInterior);

// get all Exterior companies
app.get("/get-Exterior", getAllExterior);


// get all Interior trades
app.get("/get-Interior/trades", getIntTrades);


// get all Exterior trades
app.get("/get-Exterior/trades", getExtTrades)

// get all companies within a certain trade
app.get("/get-companies/:trade", getTradeCompanies)

  //*********************************************************
  // Endpoints for Auth0
  //*********************************************************

app.post("/send-info", sendUserInfo)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})