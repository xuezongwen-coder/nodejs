// import {express} from 'express';

// import  {v4 as uuidv4} from 'uuid';

// import express from "express";

const express = require("express");
const mongoose = require("mongoose");
const Customer = require("./models/customer");
const cors = require('cors');
// const dotenv = require('dotenv')
mongoose.set("strictQuery", false);
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

const customers = [
  {
    name: "Bob",
    industry: "Music",
  },
  {
    name: "John",
    industry: "networking",
  },
  {
    name: "Bill",
    industry: "nurse",
  },
];

const customer = new Customer({
  name: "Aida",
  industry: "teaching",
});

//   customer.save();

app.get("/", (req, res) => {
  res.send("welcome");
});

app.get("/api/customers", async (req, res) => {
  console.log(await mongoose.connection.db.listCollections().toArray());
  try {
    const result = await Customer.find();
    res.json({ customers: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/customers/:id", async (req, res) => {
  console.log({
    requestParams: req.params,
    requestQuery: req.query,
  });
  try {
    const { id: customerId } = req.params;
    console.log(customerId);
    const customer = await Customer.findById(customerId);
    console.log(customer);
    if (!customer) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json({ customer });
    }
  } catch (e) {
    res.status(500).json({ error: "something went wrong" });
  }
});

app.put("/api/customers/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const result = await Customer.replaceOne({ _id: customerId }, req.body);
    console.log(result);
    res.json({ updatedCount: result.modifiedCount });
  } catch (e) {
    res.status(500).json({ error: "something went wrong" });
  }
});

app.delete("/api/customers/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const result = await Customer.deleteOne({ _id: customerId });
    res.json({ deletedCount: result.deletedCount });
  } catch (e) {
    res.status(500).json({ error: "something went wrong" });
  }
});

app.post("/api/customers", async (req, res) => {
  console.log(req.body);
  const customer = new Customer(req.body);
  try {
    await customer.save();
    res.status(201).json({ customer });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post("/", (req, res) => {
  res.send("This is a post request!");
});
app.listen(port, () => {
  console.log("App listening on port " + port);
});

const start = async () => {
  try {
    await mongoose.connect(CONNECTION);
    app.listen(port, () => {
      console.log("App listening on port " + port);
    });
    //Send a ping to confirm a successful connection
    // await client.db("Customers").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } catch (e) {
    console.log(e.message);
  }
};

start();
