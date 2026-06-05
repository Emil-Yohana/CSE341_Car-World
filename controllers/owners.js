const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

/* ============================================================
   GET ALL OWNERS — Added by Emil
   ============================================================ */
const getAllData = async (req, res) => {
    try {
        const lists = await mongodb.getDb().db('cse341').collection('owners').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

/* ============================================================
   GET ONE OWNER — Added by Emil
   ============================================================ */
const getData = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid owner id to find an owner.');
    }
    const ownerId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDb().db('cse341').collection('owners').find({ _id: ownerId }).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

/* ============================================================
   POST OWNER — Added by Analina
   ============================================================ */
// In this section, I am adding the POST endpoint.
// This function creates a new owner using the data sent in the request body.
const createData = async (req, res) => {
    try {
        const owner = req.body;

        const response = await mongodb
            .getDb()
            .db('cse341')
            .collection('owners')
            .insertOne(owner);

        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({ message: 'Error creating owner.' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

/* ============================================================
   PUT OWNER — Added by Analina
   ============================================================ */
// In this section, I am adding the PUT endpoint.
// This function updates an existing owner by replacing it with the new data.
const updateData = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid owner id to update an owner.');
    }

    const ownerId = new ObjectId(req.params.id);
    const owner = req.body;

    try {
        const response = await mongodb
            .getDb()
            .db('cse341')
            .collection('owners')
            .replaceOne({ _id: ownerId }, owner);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Owner not found or no changes made.' });
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