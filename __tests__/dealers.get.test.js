const { ObjectId } = require('mongodb');

jest.mock('../db/connect', () => ({
  getDb: jest.fn(),
}));

const mongodb = require('../db/connect');
const dealersController = require('../controllers/dealers');

describe('dealers controller GET endpoints', () => {
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

  test('getAllData should return all dealers', async () => {
    const dealerList = [
      { _id: new ObjectId(), name: 'North Motors' },
      { _id: new ObjectId(), name: 'West Auto' },
    ];

    mockCollection.find.mockReturnValue({
      toArray: jest.fn().mockResolvedValue(dealerList),
    });

    await dealersController.getAllData(req, res);

    expect(mongodb.getDb).toHaveBeenCalled();
    expect(mockDb.collection).toHaveBeenCalledWith('dealers');
    expect(mockCollection.find).toHaveBeenCalledWith();
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(dealerList);
  });

  test('getData should return one dealer for a valid id', async () => {
    const id = new ObjectId();
    req.params.id = id.toString();

    const foundDealer = { _id: id, name: 'City Auto Plaza' };

    mockCollection.find.mockReturnValue({
      toArray: jest.fn().mockResolvedValue([foundDealer]),
    });

    await dealersController.getData(req, res);

    expect(mockDb.collection).toHaveBeenCalledWith('dealers');
    expect(mockCollection.find).toHaveBeenCalledWith({ _id: expect.any(ObjectId) });
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(foundDealer);
  });
});