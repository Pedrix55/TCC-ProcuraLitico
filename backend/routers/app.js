const express = require("express")
const app = express;
app.use(express.json());

app.listen(3500, ()=>{
    console.log("Server started");
})