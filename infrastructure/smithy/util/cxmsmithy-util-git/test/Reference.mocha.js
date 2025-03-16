'use strict';

const rewiremock = require('rewiremock/node');
const assert = require('assert');
const sinon = require('sinon');

let Reference, Task, reference;

describe('Reference', function () {
	before(function () {
		this.timeout(0);
		Task = {
			executeSync: sinon.stub()
		};
		Reference = rewiremock.proxy(() => require('../src/Reference'), {
			'@sapn/elsa-util-task': Task
		});
	});

	beforeEach(function () {
		Task.executeSync.reset();
		reference = new Reference('reference');
	});

	describe('#hash', function () {
		it('shall throw exception if code !== 0', function () {
			Task.executeSync.returns({ code: 1, stderr: 'HashError' });
			assert.strictEqual(reference.hash, undefined);
			sinon.assert.calledOnce(Task.executeSync);
			sinon.assert.calledWith(Task.executeSync, 'git rev-parse reference', [], { shell: true, stdio: 'pipe' });
		});

		it('shall return undefined if the validated ref is not valid', function () {
			reference = new (class MyRef extends Reference {
				validate() {
					return false;
				}
			})('reference');
			Task.executeSync.returns({ code: 0, stdout: 'someInvalidReference' });
			assert.strictEqual(reference.hash, undefined);
			sinon.assert.calledOnce(Task.executeSync);
			sinon.assert.calledWith(Task.executeSync, 'git rev-parse reference', [], { shell: true, stdio: 'pipe' });
		});

		it('shall return the valid reference hash', function () {
			Task.executeSync.returns({ code: 0, stdout: 'someReference' });
			assert.strictEqual(reference.hash, 'someReference');
			sinon.assert.calledOnce(Task.executeSync);
			sinon.assert.calledWith(Task.executeSync, 'git rev-parse reference', [], { shell: true, stdio: 'pipe' });
		});

		it('shall not set the reference if has is invalid', function () {
			reference = new (class MyRef extends Reference {
				validate() {
					return false;
				}
			})('reference');
			reference.hash = 'someInvalidReferenceHash';
			sinon.assert.notCalled(Task.executeSync);
		});

		it('shall throw exception if updating reference code !== 0', function () {
			Task.executeSync.returns({ code: 1, stderr: 'UpdateReferenceError' });
			assert.throws(() => (reference.hash = 'someInvalidReferenceHash'), /UpdateReferenceError/);
			sinon.assert.calledOnce(Task.executeSync);
			sinon.assert.calledWith(Task.executeSync, 'git update-ref reference someInvalidReferenceHash', [], {
				shell: true,
				stdio: 'pipe'
			});
		});

		it('shall update the reference', function () {
			Task.executeSync.returns({ code: 0 });
			reference.hash = 'someReferenceHash';
			sinon.assert.calledOnce(Task.executeSync);
			sinon.assert.calledWith(Task.executeSync, 'git update-ref reference someReferenceHash', [], {
				shell: true,
				stdio: 'pipe'
			});
		});
	});

	describe('#validate()', function () {
		it('shall return true', function () {
			assert.strictEqual(reference.validate(), true);
			assert.strictEqual(reference.validate(false), true);
		});
	});

	describe('#[Symbol.toPrimitive]()', function () {
		it('shall return the branch string', function () {
			assert.strictEqual(`${reference}`, 'reference');
			assert.strictEqual(reference[Symbol.toPrimitive](), 'reference');
		});
	});

	describe('create()', function () {
		it('shall return an instance of branch', function () {
			assert.strictEqual(Reference.create('someRefs') instanceof Reference, true);
		});

		it('shall always return the same instance for the provided branch', function () {
			assert.strictEqual(Reference.create('someRefs'), Reference.create('someRefs'));
		});
	});

	describe('Inheritance', function () {
		it('should not throw exception if static buffer is accessed in super class', function () {
			assert.doesNotThrow(() => class extends Reference {}.create('someRef'));
		});

		it('should return the buffered instance', function () {
			assert.strictEqual(class extends Reference {}.create('someRef'), class extends Reference {}.create('someRef'));
		});
	});
});
