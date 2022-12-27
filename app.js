const express = require("express");
const app = express();
const db = require("./connection");
const postModel = require("./postModel");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/", async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = await postModel.create({ title, content });
    res.json(newPost);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3001, () => {
  console.log("Listening to 3001");
});
