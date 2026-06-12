const { MongoClient } = require('mongodb');

jest.mock('mongodb', () => ({
  MongoClient: {
    connect: jest.fn(),
  },
}));

describe('mongodb insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    const collections = new Map();

    const createCollection = () => {
      const documents = new Map();

      return {
        insertOne: jest.fn(async (document) => {
          documents.set(document._id, { ...document });
        }),
        findOne: jest.fn(async (query) => documents.get(query._id) || null),
      };
    };

    db = {
      collection: jest.fn((name) => {
        if (!collections.has(name)) {
          collections.set(name, createCollection());
        }

        return collections.get(name);
      }),
    };

    connection = {
      db: jest.fn(() => db),
      close: jest.fn(),
    };

    MongoClient.connect.mockResolvedValue(connection);
    connection = await MongoClient.connect('mongodb://localhost:27017');
    db = connection.db();
  });

  afterAll(async () => {
    if (connection) await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const cars = db.collection('cars');

    const mockCar = { _id: 'test-car-id', make: 'TestMake', model: 'T1' };
    await cars.insertOne(mockCar);

    const inserted = await cars.findOne({ _id: 'test-car-id' });
    expect(inserted).toEqual(mockCar);
  });
});
