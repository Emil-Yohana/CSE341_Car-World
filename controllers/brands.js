const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

/* ============================================================
   GET ALL BRANDS — Added by Emil
   ============================================================ */
const getAllData = async (req, res) => {
    try {
        const lists = await mongodb.getDb().db('CSE341').collection('brands').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

/* ============================================================
   GET ONE BRAND — Added by Emil
   ============================================================ */
const getData = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid brand id to find a brand.');
    }
    const brandId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDb().db('CSE341').collection('brands').find({ _id: brandId }).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

/* ============================================================
   POST BRAND — Added by Analina
   ============================================================ */
// In this section, I am adding the POST endpoint.
// This function creates a new brand using the data sent in the request body.
const createBrand = async (req, res) => {
    try {
        const brand = req.body;

        const response = await mongodb
            .getDb()
            .db('CSE341')
            .collection('brands')
            .insertOne(brand);

        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({ message: 'Error creating brand.' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

/* ============================================================
   PUT BRAND — Added by Analina
   ============================================================ */
// In this section, I am adding the PUT endpoint.
// This function updates an existing brand by replacing it with the new data.
const updateBrand = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid brand id to update a brand.');
    }

    const brandId = new ObjectId(req.params.id);
    const brand = req.body;

    try {
        const response = await mongodb
            .getDb()
            .db('CSE341')
            .collection('brands')
            .replaceOne({ _id: brandId }, brand);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Brand not found or no changes made.' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    getAllData,
    getData,
    createBrand,
    updateBrand
};