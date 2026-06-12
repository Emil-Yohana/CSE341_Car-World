const { ObjectId } = require('mongodb');

jest.mock('../db/connect', () => ({
  getDb: jest.fn(),
}));

const mongodb = require('../db/connect');
const carsController = require('../controllers/cars');

describe('cars controller GET endpoints', () => {
  let req;
  let res;
  let mockDb;
  let mockCollection;

  beforeEach(() => {
    req = { params: {} };
    res = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockCollection = {
      find: jest.fn(),
    };

    mockDb = {
      collection: jest.fn().mockReturnValue(mockCollection),
    };

    mongodb.getDb.mockReturnValue({
      db: jest.fn().mockReturnValue(mockDb),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllData should return all cars', async () => {
    const carList = [
      { _id: new ObjectId(), make: 'Toyota', model: 'Corolla' },
      { _id: new ObjectId(), make: 'Honda', model: 'Civic' },
    ];

    mockCollection.find.mockReturnValue({
      toArray: jest.fn().mockResolvedValue(carList),
    });

    await carsController.getAllData(req, res);

    expect(mongodb.getDb).toHaveBeenCalled();
    expect(mockDb.collection).toHaveBeenCalledWith('cars');
    expect(mockCollection.find).toHaveBeenCalledWith();
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(carList);
  });

  test('getData should return one car for a valid id', async () => {
    const id = new ObjectId();
    req.params.id = id.toString();

    const foundCar = { _id: id, make: 'Mazda', model: 'CX-5' };

    mockCollection.find.mockReturnValue({
      toArray: jest.fn().mockResolvedValue([foundCar]),
    });

    await carsController.getData(req, res);

    expect(mockDb.collection).toHaveBeenCalledWith('cars');
    expect(mockCollection.find).toHaveBeenCalledWith({ _id: expect.any(ObjectId) });
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(foundCar);
  });
});