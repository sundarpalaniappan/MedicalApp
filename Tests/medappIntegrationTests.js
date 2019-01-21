const should = require('should');
const request = require('supertest');
const httpStatus = require('http-status-codes');
const app = require('../app.js');
const MedApp = require('../models/medappModel');

const agent = request.agent(app);

describe('Medicine API test', () => {
	const medicineFields = {
		name: 'Combiflame',
		code: 'COMBI',
		quantity: 400,
	};
	it('Should allow a medicine to be posted and returns id', (done) => {
		agent.post('/api/medapps')
			.send(medicineFields)
			.expect(httpStatus.CREATED)
			.end((err, result) => {
				result.body.should.have.property('_id');
				done();
			});
	});
	it('Should get a medicine by id', (done) => {
		const medicine = new MedApp(medicineFields);
		medicine.save();
		agent.get(`/api/medapps/${medicine._id}`)
			.expect(httpStatus.OK)
			.end((err, result) => {
				result.body.should.have.property('_id');
				result.body.name.should.equal(medicineFields.name);
				result.body.quantity.should.equal(medicineFields.quantity);
				done();
			});
	});
	it('Should get multiple medicines', (done) => {
		let medicine = new MedApp(medicineFields);
		medicine.save();
		const medicineFields1 = {
			name: 'Coldact',
			quantity: '200',
		};
		medicine = new MedApp(medicineFields1);
		medicine.save();
		agent.get('/api/medapps')
			.expect(httpStatus.OK)
			.end((err, result) => {
				result.body.length.should.equal(2);
				result.body[1].name.should.equal(medicineFields1.name);
				done();
			});
	});
	it('Should get medicine by code', (done) => {
		let medicine = new MedApp(medicineFields);
		medicine.save();
		const medicineFields1 = {
			name: 'Combiflame',
			code: 'COMBI',
			quantity: '400',
		};
		medicine = new MedApp(medicineFields1);
		medicine.save();

		agent.get(`/api/medapps?code=${medicineFields1.code}`)
			.expect(httpStatus.OK)
			.end((err, result) => {
				result.body.length.should.equal(2);
				result.body[0].name.should.equal(medicineFields1.name);
				result.body[0].code.should.equal(medicineFields1.code);
				done();
			});
	});
	it('Should allow a medicine to be completely replaced', (done) => {
		const medicine = new MedApp(medicineFields);
		medicine.save();
		const medicineFields1 = {
			name: 'BComplex',
			quantity: 300,
		};
		agent.put(`/api/medapps/${medicine._id}`)
			.send(medicineFields1)
			.expect(httpStatus.OK)
			.end((err, result) => {
				result.body.name.should.equal(medicineFields1.name);
				result.body.quantity.should.equal(medicineFields1.quantity);
				done();
			});
	});
	it('Should allow an attribute of medicine to be updated', (done) => {
		const medicine = new MedApp(medicineFields);
		medicine.save();
		const medicineFields1 = {
			name: 'BComplex',
			quantity: 400,
		};
		agent.patch(`/api/medapps/${medicine._id}`)
			.send(medicineFields1)
			.expect(httpStatus.OK)
			.end((err, result) => {
				// console.log(result);
				result.body.name.should.equal(medicineFields1.name);
				result.body.quantity.should.equal(medicineFields1.quantity);
				done();
			});
	});
	it('Should allow a medicine to be deleted', (done) => {
		const medicine = new MedApp(medicineFields);
		medicine.save();
		agent.delete(`/api/medapps/${medicine._id}`)
			.expect(httpStatus.NO_CONTENT)
			.end(() => {
				// console.log(result);
				MedApp.findById(medicine._id, (err, medicineObject) => {
					should(medicineObject).be.empty;
					done();
				});
			});
	});
	afterEach((done) => {
		MedApp.remove().exec();
		done();
	});
});
