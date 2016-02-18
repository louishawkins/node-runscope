var _ = require('underscore'),
    resources = require('../index'),
    Promise = require('bluebird');

function Tests (client, testId) {
    this.client = _.clone(client);
    this.testId = testId;

    var namespace = '/tests';

    if (client.namespace && client.namespace.indexOf(namespace) === -1) {
        this.client.namespace += '/tests';
    }

    this.environments = new resources.environments(this.client, this.testId);
    this.results = new resources.results(this.client, this.testId);
    this.schedules = new resources.schedules(this.client, this.testId);
    this.steps = new resources.steps(this.client, this.testId);
}

Tests.prototype.list = function () {
    return this.client.get();
};

/**
 * @param opts
 *      name: string: Name of the test
 *      description: string: human readable description of the new test
 */
Tests.prototype.create = function (opts) {
    var self = this;
    var client = this.client;

    return client.post(opts).then(function (response) {
        var testId = response && response.data && response.data.id;

        if (!testId) {
            throw new Error('Response contained no data.id');
        }

        return _.extend(response, new Tests(client, testId));
    });
};

Tests.prototype.detail = function (testId) {
    return this.client.get(this.testId || testId);
};

Tests.prototype.trigger = function () {
    var client = this.client;
    return this.detail().then(function (testDetails) {
        var triggerUrl = testDetails && testDetails.data && testDetails.data.trigger_url;

        if (!triggerUrl) {
            throw new Error('No trigger URL');
        }

        return client.request('GET', triggerUrl);
    });
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
    return this.client.put(this.testId, opts);
};

Tests.prototype.delete = function () {
    return this.client.delete(this.testId);
};

module.exports = Tests;
