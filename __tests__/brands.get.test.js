const { ObjectId } = require('mongodb');

jest.mock('../db/connect', () => ({
  getDb: jest.fn(),
}));

const mongodb = require('../db/connect');
const brandsController = require('../controllers/brands');

describe('brands controller GET endpoints', () => {
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

  test('getAllData should return all brands', async () => {
    const brandList = [
      { _id: new ObjectId(), name: 'Toyota' },
      { _id: new ObjectId(), name: 'Honda' },
    ];

    mockCollection.find.mockReturnValue({
      toArray: jest.fn().mockResolvedValue(brandList),
    });

    await brandsController.getAllData(req, res);

    expect(mongodb.getDb).toHaveBeenCalled();
    expect(mockDb.collection).toHaveBeenCalledWith('brands');
    expect(mockCollection.find).toHaveBeenCalledWith();
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(brandList);
  });

  test('getData should return one brand for a valid id', async () => {
    const id = new ObjectId();
    req.params.id = id.toString();

    const foundBrand = { _id: id, name: 'Mazda' };

    mockCollection.find.mockReturnValue({
      toArray: jest.fn().mockResolvedValue([foundBrand]),
    });

    await brandsController.getData(req, res);

    expect(mockDb.collection).toHaveBeenCalledWith('brands');
    expect(mockCollection.find).toHaveBeenCalledWith({ _id: expect.any(ObjectId) });
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(foundBrand);
  });
});