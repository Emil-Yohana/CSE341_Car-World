const validator = require('../helpers/validate');

// Hi team, Analina here. I updated the validation rules so they match the actual
// fields in our database.

/* ---------------------- BRANDS COLLECTION ---------------------- */
const brand = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        country: 'required|string',
        foundedYear: 'required|numeric',
        headquarters: 'required|string',
        popularModels: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success:false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

/* ---------------------- CARS COLLECTION ---------------------- */
const cars = (req, res, next) => {
    const validationRule = {
        make: 'required|string',
        model: 'required|string',
        year: 'required|numeric',
        price: 'required|numeric',
        mileage: 'required|numeric',
        color: 'required|string',
        brand: 'required|string',
        dealer: 'required|string',
        owner: 'string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success:false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

/* ---------------------- DEALERS COLLECTION ---------------------- */
const dealers = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        location: 'required|string',
        email: 'required|email',
        phone: 'required|string',
        inventoryCount: 'required|numeric',
        brandsCarried: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success:false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

/* ---------------------- OWNERS COLLECTION ---------------------- */
const owners = (req, res, next) => {
    const validationRule = {
        fullName: 'required|string',
        email: 'required|email',
        phone: 'required|string',
        address: 'required|string',
        ownedCars: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success:false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = { brand, cars, dealers, owners };