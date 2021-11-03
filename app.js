const express = require("express");
const cors = require("cors");
const app = express();
const fs= require('fs')
const shortid = require('shortid'); //generates random id
// shortid.generate() --> usage
const homeUrl = 'http://localhost:8080';

app.use(cors());

app.use("/public", express.static(`./public`));

app.use(`/`, (req,res, next)=>{ //responsible for rerouting using the short url 
  if(req. _parsedUrl.path === "/"){next()}
    else{
      try{
        const longurl = JSON.parse(fs.readFileSync(`./DB/${req. _parsedUrl.path}.txt`));
        res.redirect(longurl); //send user to original long url
      }
      catch(error){
        next();
      }
    }
}) 

app.get("/", (req, res, next) => { //load home page
  res.sendFile(__dirname + "/views/index.html");
});

app.get('/makeUrl', (req,res, next)=>{ //responsible for creating short url and adding to DB
  const longUrl = JSON.stringify(req.headers.longurl);
  const shortUrl = shortid.generate();
  fs.writeFileSync(`./DB/${shortUrl}.txt`, longUrl);
  res.send(`${homeUrl}/${shortUrl}`)
})



module.exports = app;
