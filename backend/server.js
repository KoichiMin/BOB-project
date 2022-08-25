const express = require("express");

app = express();

app.get('/hi', (res, req) =>{
    res.status(200).json({status:200, message: "hello World!"})
})

app.listen(5000, () =>{
    console.log('Server launched on port 5000')
});