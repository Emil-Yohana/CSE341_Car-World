const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

/* ============================================================
   GET ALL CARS — Added by Emil
   ============================================================ */
const getAllData = async (req, res) => {
//#swagger.tags = ['Cars']
    try {
        const lists = await mongodb.getDb().db('cse341').collection('cars').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

/* ============================================================
   GET ONE CAR — Added by Emil
   ============================================================ */
const getData = async (req, res) => {
//#swagger.tags = ['Cars']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid car id to find a car.');
    }
    const carId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDb().db('cse341').collection('cars').find({ _id: carId }).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

/* ============================================================
   POST CAR — Added by Analina
   ============================================================ */
// In this section, I am adding the POST endpoint.
// This function creates a new car using the data sent in the request body.
const createData = async (req, res) => {
//#swagger.tags = ['Cars']
    try {
        const car = req.body;

        const response = await mongodb
            .getDb()
            .db('cse341')
            .collection('cars')
            .insertOne(car);

        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({ message: 'Error creating car.' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

/* ============================================================
   PUT CAR — Added by Analina
   ============================================================ */
// In this section, I am adding the PUT endpoint.
// This function updates an existing car by replacing it with the new data.
const updateData = async (req, res) => {
//#swagger.tags = ['Cars']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid car id to update a car.');
    }

    const carId = new ObjectId(req.params.id);
    const car = req.body;

    try {
        const response = await mongodb
            .getDb()
            .db('cse341')
            .collection('cars')
            .replaceOne({ _id: carId }, car);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Car not found or no changes made.' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    getAllData,
    getData,
    createData,
    updateData
};