const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const FILE = path.join(__dirname, "blobs", "recipes.json");

app.get("/api/recipes", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (!fs.existsSync(FILE)) {
    res.json({ success: -1, data: "Error reading file" });
    return;
  }
  const content = fs.readFileSync(FILE, "utf8");
  res.end({ success: 1, data: content });
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
