const express = require('express');
const app = express();
const Path = require("path");

app.use(express.static('public'));

app.get('/', function (req, res) {
  const filePath = Path.join(__dirname, "canvas.html") 
  console.log(filePath)
  res.sendFile(filePath);
})

app.get('/Game', function (req, res) {
  const filePath = Path.join(__dirname, "Game.js")
  console.log(filePath);
  res.sendFile(filePath);
})

app.get('/Maps/:mapAsset', function (req, res) {
  console.log(req.params)
  const filePath = Path.join(__dirname, 'public', 'MapAssets', req.params.mapAsset)
  console.log(filePath);
  res.sendFile(filePath); 
})

app.get('/Items/:item', function (req, res) {
  const filePath = Path.join(__dirname, 'public', 'itemAssets', req.params.item)
  console.log(filePath);
  res.sendFile(filePath);
})

app.listen(3000, () =>{
  console.log("App listening on port 3000")
});