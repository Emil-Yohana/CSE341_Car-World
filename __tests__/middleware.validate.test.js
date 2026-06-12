const { cars } = require('../middleware/validate');

describe('middleware/validate - cars', () => {
  test('calls next() for valid car data', (done) => {
    const req = { body: { make: 'Toyota', model: 'Corolla', year: 2020, price: 20000, mileage: 10000, color: 'Blue', brand: 'Toyota', dealer: 'Dealer Inc' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn(() => {
      try {
        expect(res.status).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        done();
      } catch (e) {
        done(e);
      }
    });

    cars(req, res, next);
  });

  test('responds 412 for invalid car data', (done) => {
    const req = { body: { make: '', model: 'Corolla' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn((payload) => {
        try {
          expect(res.status).toHaveBeenCalledWith(412);
          expect(payload).toMatchObject({ success: false, message: 'Validation failed' });
          done();
        } catch (e) {
          done(e);
        }
      })
    };
    const next = jest.fn();

    cars(req, res, next);
  });
});
