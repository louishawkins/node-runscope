
function Steps (client, testId, stepId) {
    this.client = client;
    this.client.namespace += '/' + testId + '/steps';
    this.stepId = stepId;
}
/**
 *  step_type = 'request'
 *  url, method, note, auth (basic or oauth1), headers, form (object) body (string) assertions variables
 */ 
Steps.prototype.request = function (opts) {
    opts.step_type = 'request';
    this.client.post(opts);
}

// opts.duration
Steps.prototype.pause = function (opts) {
    opts.step_type = 'pause';
    this.client.post(opts);
}

/**
 *  comparision, left_value, right_value, steps
 *  todo: use natural languge to build these parameters
 */
Steps.prototype.condition = function (opts) {
    opts.step_type = 'condition';
    this.client.post(opts);
}

/**
 *  integration_id, suite_id, test_id, start_url, assertions, variables
 */ 
Steps.prototype.ghostInspector = function (opts) {
    opts.step_type = 'ghost-inspector';
    this.client.post(opts);
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

