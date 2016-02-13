var _ = require('underscore');
var resources = require('../index');
var Promise = require('bluebird');

function Tests (client, testId) {
    this.client = client;

    var namespace = '/tests';

    if (client.namespace && client.namespace.indexOf(namespace) === -1) {
        this.client.namespace += '/tests';
    }

    this.testId = testId;

    this.environments = function (environmentId) {
        return new resources.environments(this.client, this.testId, environmentId);
    };

    this.results = function () {
        return new resources.results(this.client, this.testId);
    };

    this.schedules = function (scheduleId) {
        return new resources.schedules(this.client, this.testId, scheduleId);
    };

    this.steps = function (stepId) {
        return new resources.steps(this.client, this.testId, stepId);
    };

    //this.list();
}

Tests.prototype.list = function () {
    this.client.get();
};

/**
 * @param opts
 *      name: string: Name of the test
 *      description: string: human readable description of the new test
 */
Tests.prototype.create = function (opts) {
    var client = this.client;
    return new Promise(function (resolve, reject) {
        client.post(opts).then(function (response) {
            var testId = response && response.data && response.data.id;
            var newTest = new Tests(client, testId);
            resolve(_.extend(newTest, response));
        }).catch(reject);
    });
};

Tests.prototype.detail = function () {
    this.client.get(this.testId);
};


Tests.prototype.trigger = function () {
    var self = this;

    return new Promise(function (resolve, reject) {
        self.detail().then(function (testDetails) {
            var triggerUrl = testDetails.data && testDetails.data.trigger_url;
            if (triggerUrl) {
                self.client.request('GET', triggerUrl).then(resolve).catch(reject);
            } else {
                reject('No trigger url');
            }
        }).catch(reject);
    })
};

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
};

Tests.prototype.delete = function () {
    this.client.delete(this.testId);
};

module.exports = Tests;

