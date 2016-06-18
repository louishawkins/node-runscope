var _ = require('underscore'),
    resources = require('../index'),
    util = require('../../util');

function Steps (client, testId) {
    this.client = _.clone(client);
    this.client.namespace += '/' + testId + '/steps';
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

    var assertions = opts.assert || opts.assertions;
    
    if (opts.assert) {
        delete opts.assert;
    }

    if (_.isObject(assertions) && assertions instanceof Array === false) {
        opts.assertions = [assertions];
    } else if (assertions === 'status === 200') {
        opts.assertions = [{
            "source": "response_status",
            "comparison": "equal_number",
            "value": 200
        }];
    } else if (_.isArray(assertions)) {
        opts.assertions = assertions;
    } else {
        opts.assertions = [];
    }

    var createStep = this.create(opts);

    return util.chainablePromise.call(this, createStep);
};

Steps.prototype.addRequest = function (opts) {
    opts.step_type = 'request';
    return this.add(opts);
};

// opts.duration
Steps.prototype.addPause = function (opts) {
    opts.step_type = 'pause';
    return this.add(opts);
};

/**
 *  comparision, left_value, right_value, steps
 *  todo: use natural languge to build these parameters
 */
Steps.prototype.addCondition = function (opts) {
    opts.step_type = 'condition';
    return this.add(opts);
};

/**
 *  integration_id, suite_id, test_id, start_url, assertions, variables
 */ 
Steps.prototype.ghostInspector = function (opts) {
    opts.step_type = 'ghost-inspector';
    return this.add(opts);
};

Steps.prototype.changeOrder = function (opts) {
    return this.client.put(opts);
};

Steps.prototype.detail = function (stepId) {
    return this.client.get(stepId);
};

Steps.prototype.update = function (stepId, opts) {
    return this.client.put(stepId, opts);
};

Steps.prototype.delete = function (stepId) {
    return this.client.delete(stepId);
};

module.exports = Steps;

