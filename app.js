const DataBase = require("./DataBase");
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
const dataBaseUse = new DataBase;
const shortid = require('shortid'); //generates random id
const homeUrl = 'http://localhost:8080';

app.use(cors());

app.use("/public", express.static(`./public`));

app.use("/", (req,res, next)=>{ //responsible for rerouting using the short url 
  if(req. _parsedUrl.path === "/" || req. _parsedUrl.path === "/makeUrl"){next()}
  else{
    try {
      const requestEnd = (req. _parsedUrl.path);
      const longURL = dataBaseUse.getLongUrlFromStorage(requestEnd);
      res.redirect(longURL);
    } catch (error) {
      res.send(error);
    }
  }
})

app.get("/", (req, res, next) => { //load home page
  res.sendFile(__dirname + "/src/index.html");
});


app.get("/makeurl", function(req,res){ //responsible for creating short url and adding to DB
  try {
    const longUrl = JSON.stringify(req.headers.longurl);
    const shortUrl = shortid.generate();
    dataBaseUse.storeUrlRelation(longUrl, shortUrl);
    res.send(homeUrl + "/" + shortUrl);
  } catch (error) {
    res.send(error)
  }
})

module.exports = app;