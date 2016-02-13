var _ = require('underscore');
var resources = require('../index');
var Assertion = require('../Assertion');
var Promise = require('bluebird');

function Steps (client, testId, stepId) {
    this.client = _.clone(client);
    this.client.namespace += '/' + testId + '/steps';
    this.stepId = stepId;
}
/**
 *  step_type = 'request'
 *  url, method, note, auth (basic or oauth1), headers, form (object) body (string) assertions variables
 */ 
Steps.prototype.create = function (opts) {
    return this.client.post(opts);
};

// chainable
// step.add({}).add({}).catch(...)
Steps.prototype.add = function (opts) {
    if (!opts.step_type) opts.step_type = 'request';
    if (opts.method) opts.method = opts.method.toUpperCase();

    if (typeof opts.assert === 'string') {
        opts.assert = JSON.stringify(new Assertion(opts.assert)); //convert assertion string to a runscope assertion object
    }

    var createStep = this.create(opts);

    if (this instanceof Promise) {
        var fulfillPrevious = this;
    }

    var q = new Promise(function (resolve, reject) {
        if (fulfillPrevious) {
            return fulfillPrevious.then(createStep).then(resolve);
        } else {
            return createStep.then(resolve);
        }
    });

    return _.extend(q, this);
};

Steps.prototype.addRequest = function (opts) {
    opts.step_type = 'request';
    return this.add(opts);
}

// opts.duration
Steps.prototype.addPause = function (opts) {
    opts.step_type = 'pause';
    return this.add(opts);
}

/**
 *  comparision, left_value, right_value, steps
 *  todo: use natural languge to build these parameters
 */
Steps.prototype.addCondition = function (opts) {
    opts.step_type = 'condition';
    return this.add(opts);
}

/**
 *  integration_id, suite_id, test_id, start_url, assertions, variables
 */ 
Steps.prototype.ghostInspector = function (opts) {
    opts.step_type = 'ghost-inspector';
    return this.add(opts);
}

//todo: assertions object builder

Steps.prototype.changeOrder = function (opts) {
    this.client.put(opts);
}

Steps.prototype.detail = function () {
    this.client.get(this.stepId);
}

Steps.prototype.update = function () {
    this.client.put(this.stepId);
}

Steps.prototype.delete = function () {
    this.client.delete(this.stepId);
}

module.exports = Steps;

