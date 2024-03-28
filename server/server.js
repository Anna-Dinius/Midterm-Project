const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api", (_, res) => {
  res.send("hi");
});

app.get("/api/:filename", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const content = fs.readFileSync(`./${filename}.json`, "utf8");
  res.end(content);
});

app.post("/api", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  console.log(req.body);
  res.write(req.body + "\n");
  fs.writeFileSync(`./${Date.now()}.json`, JSON.stringify(req.body));
  res.end(JSON.stringify(req.body, null, 2));
});

app.put("/api/:filename", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  console.log(req.body);
  res.write(req.body + "\n");
  fs.writeFileSync(`./${req.params.filename}.json`, JSON.stringify(req.body));
  res.end(JSON.stringify(req.body, null, 2));
});

app.delete("/api/:filename", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  fs.unlinkSync(`./${req.params.filename}.json`, "utf8");
  res.end("file deleted");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});