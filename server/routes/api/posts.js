const express = require("express");
const mongodb = require("mongodb");
require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await loadPostCollection();
  res.send(await posts.find({}).toArray());
});

router.post("/", async (req, res) => {
  const posts = await loadPostCollection();
  await posts.insertOne({
    text: req.body.text,
    createAt: new Date(),
  });
  console.log(req.body);
  res.status(201).send();
});

router.delete("/:id", async (req, res) => {
  const posts = await loadPostCollection();
  await posts.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  res.status(200).send();
});

async function loadPostCollection() {
  const client = await mongodb.MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.f3phq5z.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  );

  return client.db("cluster0").collection("posts");
}

module.exports = router;
