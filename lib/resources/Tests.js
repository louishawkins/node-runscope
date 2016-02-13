var resources = require('../index');

function Tests (client, testId) {
    this.client = client;
    this.client.namespace += '/tests';
    this.testId = testId;

    this.environments = function (environmentId) {
        return new resources.environments(this.client, this.testId, environmentId);
    }

    this.results = function () {
        return new resources.results(this.client, this.testId);
    }

    this.schedules = function (scheduleId) {
        return new resources.schedules(this.client, this.testId, scheduleId);
    }

    this.steps = function (stepId) {
        return new resources.steps(this.client, this.testId, stepId);
    }
}

Tests.prototype.list = function () {
    this.client.get();
}

/**
 * @param opts
 *      name: string: Name of the test
 *      description: string: human readable description of the new test
 */      
Tests.prototype.create = function (opts) {
    this.client.post(opts);
}

Tests.prototype.detail = function () {
    this.client.get(this.testId);
}

/**
 * @param testId STRING testId
 * @param opts Object 
 *      {
 *          name
 *          description
 *          default_environment_id
 *          steps
 *      }
 */      
Tests.prototype.update = function (opts) {
    this.client.put(this.testId, opts);
}

Tests.prototype.delete = function () {
    this.client.delete(this.testId);
}

module.exports = Tests;

