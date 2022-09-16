const Employee = require('../employee.model');
const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  });
  describe('Reading data', () => {
    before(async () => {
      const testEmpOne = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT',
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: 'Jerzy',
        lastName: 'Brzęczyszczykiewicz',
        department: '631b0493159f8125e4b75220',
      });
      await testEmpTwo.save();
    });
    it('should return all the data with find method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });
    it('should return proper document by various params with "findOne" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' });
      const expectedFirstName = 'John';
      const expectedLastName = 'Doe';
      expect(employee.firstName).to.be.equal(expectedFirstName);
      expect(employee.lastName).to.be.equal(expectedLastName);
    });
    it('should return proper documents where departments arguments are references to objects', async () => {
      //   const employees = await Employee.find().populate('Department');
      //   expect(employees.some).to.be.include({});
    });
    after(async () => {
      await Employee.deleteMany();
    });
    describe('Creating data', () => {
      it('should insert new document with insertOne method', async () => {
        const employee = new Employee({
          firstName: 'Jakub',
          lastName: 'Wędrowycz',
          department: 'security',
        });
        await employee.save();
        expect(employee.isNew).to.be.false;
      });
    });
    describe('Updating data', () => {
      beforeEach(async () => {
        const testEmpOne = new Employee({
          firstName: 'John',
          lastName: 'Doe',
          department: 'IT',
        });
        await testEmpOne.save();

        const testEmpTwo = new Employee({
          firstName: 'Jerzy',
          lastName: 'Brzęczyszczykiewicz',
          department: 'Marketing',
        });
        await testEmpTwo.save();
      });
      it('should properly update one document with updateOne method', async () => {
        await Employee.updateOne(
          { firstName: 'John' },
          { $set: { firstName: 'Amanda' } }
        );
        const updatedEmployee = await Employee.findOne({
          firstName: 'Amanda',
        });
        expect(updatedEmployee).to.not.be.null;
      });
      it('should properly update one document with save method', async () => {
        const employee = await Employee.findOne({ firstName: 'John' });
        employee.firstName = 'Amanda';
        expect(employee.firstName).to.be.equal('Amanda');
      });
      it('should properly update multiple documents with updateMany method', async () => {
        await Employee.updateMany({}, { $set: { firstName: 'Updated!' } });
        const employees = await Employee.find({ firstName: 'Updated!' });
        expect(employees.length).to.be.equal(2);
      });
      afterEach(async () => {
        await Employee.deleteMany();
      });
    });
    describe('Removing data', () => {
      beforeEach(async () => {
        const testEmpOne = new Employee({
          firstName: 'John',
          lastName: 'Doe',
          department: 'IT',
        });
        await testEmpOne.save();

        const testEmpTwo = new Employee({
          firstName: 'Jerzy',
          lastName: 'Brzęczyszczykiewicz',
          department: 'Marketing',
        });
        await testEmpTwo.save();
      });
      it('should properly remove one document with deleteOne method', async () => {
        await Employee.deleteOne({ firstName: 'John' });
        const deletedEmployee = await Employee.findOne({ firstName: 'John' });
        expect(deletedEmployee).to.be.null;
      });
      it('should properly remove one document with remove method', async () => {
        const employee = await Employee.findOne({ firstName: 'John' });
        employee.remove();
        const deletedEmployee = await Employee.findOne({ firstName: 'John' });
        expect(deletedEmployee).to.be.null;
      });
      it('should properly remove multiple docuemtns with deleteMany method', async () => {
        await Employee.deleteMany();
        const deletedEmployees = await Employee.find();
        expect(deletedEmployees.length).to.be.equal(0);
      });
      afterEach(async () => {
        await Employee.deleteMany();
      });
    });
  });
});
