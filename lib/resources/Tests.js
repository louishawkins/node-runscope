
function Tests (client) {
    this.client = client;
    this.client.namespace += '/tests';
}

Tests.prototype.list = function () {
    return this.client.get();
}

/**
 * @param opts
 *      name: string: Name of the test
 *      description: string: human readable description of the new test
 */      
Tests.prototype.create = function (opts) {
    return this.client.post(opts);
}

Tests.prototype.detail = function (testId) {
    return this.client.get(testId);
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
Tests.prototype.update = function (testId, opts) {
    return this.client.put(testId, opts);
}

Tests.prototype.delete = function (testId) {
    return this.client.delete(testId);
}

module.exports = Tests;

