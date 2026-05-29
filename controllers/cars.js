const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllData = async (req, res) => {
    try {
        const lists = await mongodb.getDb().db('CSE341').collection('cars').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getData = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid car id to find a car.');
    }
    const carId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDb().db('CSE341').collection('cars').find({ _id: carId }).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    getAllData,
    getData
};