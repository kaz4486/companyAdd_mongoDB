const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  it('should throw an error if no "firstName" arg', () => {
    const firstName = undefined;
    const lastName = 'Paprykowski';
    const department = 'IT';
    const emp = new Employee({ firstName, lastName, department });
    emp.validate((err) => {
      expect(err.errors.firstName).to.exist;
    });
  });
  it('should throw an error if no "lastName" arg', () => {
    const firstName = 'Krystian';
    const lastName = undefined;
    const department = 'IT';
    const emp = new Employee({ firstName, lastName, department });
    emp.validate((err) => {
      expect(err.errors.lastName).to.exist;
    });
  });
  it('should throw an error if "firstName" arg is not a string', () => {
    const cases = [{}, []];
    const lastName = 'Paprykowski';
    const department = 'IT';
    for (let firstName of cases) {
      const emp = new Employee({ firstName, lastName, department });

      emp.validate((err) => {
        expect(err.errors.firstName).to.exist;
      });
    }
  });
  it('should throw an error if "lastName" arg is not a string', () => {
    const cases = [{}, []];
    const firstName = 'Krystian';
    const department = 'IT';
    for (let lastName of cases) {
      const emp = new Employee({ firstName, lastName, department });

      emp.validate((err) => {
        expect(err.errors.lastName).to.exist;
      });
    }
  });
  it('should throw an error if "lastName" arg is not a string', () => {
    const cases = [{}, []];
    const firstName = 'Krystian';
    const lastName = 'Paprykowski';
    for (let department of cases) {
      const emp = new Employee({ firstName, lastName, department });

      emp.validate((err) => {
        expect(err.errors.department).to.exist;
      });
    }
  });
  it('should not throw an error if "arguments are okay"', () => {
    const firstNameCases = ['Krystian', 'J', 'abradab', 'Hiu-Son Min'];
    const lastNameCases = ['Paprykowski', 'T', 'kluska', 'Ja-Wam Dam'];
    const departmentCases = ['IT', 'Security', 'stagehands', 'Si-nge r'];
    for (let firstName of firstNameCases) {
      const lastName = 'Paprykowski';
      const department = 'IT';
      const emp = new Employee({ firstName, lastName, department });
      emp.validate((err) => {
        expect(err).to.not.exist;
      });
    }
    for (let lastName of lastNameCases) {
      const firstName = 'Krystian';
      const department = 'IT';
      const emp = new Employee({ firstName, lastName, department });
      emp.validate((err) => {
        expect(err).to.not.exist;
      });
    }
    for (let department of departmentCases) {
      const firstName = 'Krystian';
      const lastName = 'Paprykowski';
      const emp = new Employee({ firstName, lastName, department });
      emp.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });
  // clear model after each test
  after(() => {
    mongoose.models = {};
  });
});
