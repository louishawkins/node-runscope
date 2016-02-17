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
    this.client.get();
};

/**
 * @param opts
 *      name: string: Name of the test
 *      description: string: human readable description of the new test
 */
Tests.prototype.create = function (opts) {
    var self = this;
    var client = this.client;
    return new Promise(function (resolve, reject) {
        client.post(opts).then(function (response) {
            var testId = response && response.data && response.data.id;
            resolve(_.extend(response, new Tests(client, testId)));
        }).catch(reject);
    });
};

Tests.prototype.detail = function () {
    return this.client.get(this.testId);
};

Tests.prototype.trigger = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.detail().then(function (testDetails) {
            var triggerUrl = testDetails && testDetails.data && testDetails.data.trigger_url;

            if (!triggerUrl) {
                return reject('No trigger URL');
            }

            return self.client.request('GET', triggerUrl).then(resolve, reject);
        });
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
    this.client.put(this.testId, opts);
};

Tests.prototype.delete = function () {
    this.client.delete(this.testId);
};

module.exports = Tests;

