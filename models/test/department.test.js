const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {
  it('should throw an error if no "name" arg', () => {
    const dep = new Department({}); // create new Department, but don't set `name` attr value
    dep.validate((err) => {
      expect(err.errors.name).to.exist;
    });
  });
  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
  });
  it('should throw an error if "name" is shorter than 5 and longer than 20', () => {
    const cases = ['Jo', 'KonstantynopolitaĆczykowianeczka'];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
  });
  it('should not throw an error if "name" is okay', () => {
    const name = 'Stagehands';
    const dep = new Department({ name });

    dep.validate((err) => {
      expect(err).to.not.exist;
    });
  });
  // clear model after each test
  //   after(() => {
  //     mongoose.models = {};
  //   });
});
