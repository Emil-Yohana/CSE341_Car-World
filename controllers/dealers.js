const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

/* ============================================================
   GET ALL DEALERS — Added by Emil
   ============================================================ */
const getAllData = async (req, res) => {
//#swagger.tags = ['Dealers']
    try {
        const lists = await mongodb.getDb().db('cse341').collection('dealers').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

/* ============================================================
   GET ONE DEALER — Added by Emil
   ============================================================ */
const getData = async (req, res) => {
//#swagger.tags = ['Dealers']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid dealer id to find a dealer.');
    }
    const dealerId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDb().db('cse341').collection('dealers').find({ _id: dealerId }).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

/* ============================================================
   POST DEALER — Added by Analina
   ============================================================ */
// In this section, I am adding the POST endpoint.
// This function creates a new dealer using the data sent in the request body.
const createData = async (req, res) => {
//#swagger.tags = ['Dealers']
    try {
        const dealer = req.body;

        const response = await mongodb
            .getDb()
            .db('cse341')
            .collection('dealers')
            .insertOne(dealer);

        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({ message: 'Error creating dealer.' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

/* ============================================================
   PUT DEALER — Added by Analina
   ============================================================ */
// In this section, I am adding the PUT endpoint.
// This function updates an existing dealer by replacing it with the new data.
const updateData = async (req, res) => {
//#swagger.tags = ['Dealers']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid dealer id to update a dealer.');
    }

    const dealerId = new ObjectId(req.params.id);
    const dealer = req.body;

    try {
        const response = await mongodb
            .getDb()
            .db('cse341')
            .collection('dealers')
            .replaceOne({ _id: dealerId }, dealer);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Dealer not found or no changes made.' });
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