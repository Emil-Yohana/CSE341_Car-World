const validator = require('../helpers/validate');

describe('helpers/validate', () => {
  test('passes validation for valid data', (done) => {
    const body = { name: 'Test', age: 30 };
    const rules = { name: 'required|string', age: 'required|numeric' };
    validator(body, rules, {}, (err, status) => {
      try {
        expect(status).toBe(true);
        expect(err).toBeNull();
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  test('fails validation for invalid data', (done) => {
    const body = { name: '', age: 'thirty' };
    const rules = { name: 'required|string', age: 'required|numeric' };
    validator(body, rules, {}, (err, status) => {
      try {
        expect(status).toBe(false);
        expect(err).toBeTruthy();
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
