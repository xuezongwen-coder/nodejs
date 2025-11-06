// const { uuidv4 } = require('uuid');
// import {express} from 'express';

// import  {v4 as uuidv4} from 'uuid';

// import express from "express";

const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customer');
// const dotenv = require('dotenv')

mongoose.set('strictQuery', false);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const port = process.env.PORT||3000;
const CONNECTION = process.env.CONNECTION;

const customers = [
    {
        "name": "Bob",
        "industry": "Music"
    },
    {
        "name": "John",
        "industry": "networking"
    },
    {
        "name": "Bill",
        "industry": "nurse"
    }
];

const customer = new Customer({
    name : 'xuezw',
    industry: 'marketing'
});
    
// customer.save();

app.get('/', (req, res) => {
    res.send(customer);
});


app.get('/api/customers', (req, res) => {
    res.send({"data": customers});
});

app.post('/api/customers', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});


app.post('/', (req, res) => {
    res.send('This is a post request!');
});
app.listen(port, ()=> {
    console.log('App listening on port ' + port );
});


const start = async() => {
    try{
        await mongoose.connect(CONNECTION);
        app.listen(port, ()=> {
            console.log('App listening on port ' + port );
        });
        // Send a ping to confirm a successful connection
        // await client.db("Customers").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }catch(e) {
        console.log(e.message)
    }
};

start();