const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const morgan = require('morgan');

const {
    getAllCompanies,
    getAllExterior,
    getAllInterior,
    getIntTrades,
    getExtTrades,
    getTradeCompanies,
    getTradeDescription,
    getSpecificCompany,
    getAllTrades,
    postCompany,
    postTradeDescription
} = require("./CompanyHandlers")

const{
    sendUserInfo,
    getValidation
} = require("./AuthHandlers")

// to get some more info like the type of request and endpoint in the terminal
app.use(morgan('tiny'));
// use to be able to read a form  post request from the frontend 
app.use(express.urlencoded({ extended: false }))

// used to be able to read a json object from the frontend
app.use(express.json());
app.use(bodyParser.json());


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

// get specific description of trade
app.get("/get-description/:trade", getTradeDescription)

// get a specific company
app.get("/get-specific-company/:company", getSpecificCompany)

// get all the trades
app.get("/get-all-trades", getAllTrades)

// post a companies inside the companies database
app.post("/add-company", postCompany)

// post a trade description inside the description database if its a new trade
app.post("/add-trade-description", postTradeDescription)

  //*********************************************************
  // Endpoints for Auth0
  //*********************************************************
// app.use(bodyParser.json());

// validate that the user has or hasn't got a company profile
app.get("/validate-info/:user", getValidation)


// receive the login info from the frontend and send it to the database
app.post("/send-info", sendUserInfo)



 // Catch all if nothing works
// app.get('*', (req, res) => {
//   res.status(404).json({
//     status: 404,
//     message: "This is not what you're looking for.",
//   });
// });


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})