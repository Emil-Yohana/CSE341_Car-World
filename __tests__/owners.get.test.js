const { ObjectId } = require('mongodb');

jest.mock('../db/connect', () => ({
  getDb: jest.fn(),
}));

const mongodb = require('../db/connect');
const ownersController = require('../controllers/owners');

describe('owners controller GET endpoints', () => {
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

  test('getAllData should return all owners', async () => {
    const ownerList = [
      { _id: new ObjectId(), fullName: 'Alice Johnson' },
      { _id: new ObjectId(), fullName: 'Bob Smith' },
    ];

    mockCollection.find.mockReturnValue({
      toArray: jest.fn().mockResolvedValue(ownerList),
    });

    await ownersController.getAllData(req, res);

    expect(mongodb.getDb).toHaveBeenCalled();
    expect(mockDb.collection).toHaveBeenCalledWith('owners');
    expect(mockCollection.find).toHaveBeenCalledWith();
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(ownerList);
  });

  test('getData should return one owner for a valid id', async () => {
    const id = new ObjectId();
    req.params.id = id.toString();

    const foundOwner = { _id: id, fullName: 'Chris Evans' };

    mockCollection.find.mockReturnValue({
      toArray: jest.fn().mockResolvedValue([foundOwner]),
    });

    await ownersController.getData(req, res);

    expect(mockDb.collection).toHaveBeenCalledWith('owners');
    expect(mockCollection.find).toHaveBeenCalledWith({ _id: expect.any(ObjectId) });
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(foundOwner);
  });
});